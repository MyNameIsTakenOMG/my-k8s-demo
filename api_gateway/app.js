const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const mysql = require('mysql2/promise');
const amqp = require('amqplib')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false}))


// const local_constants = {
//     amqp: 'amqp://rabbitmq-service:5672',
//     database: 'my-k8s-demo-db',
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     auth_url:'http://localhost:5002'
// }

// connect to RabbitMQ server
const exchange = 'order_exchange'
let rabbitmqChannel
const rabbitmqSetup = async ()=>{
    try {
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.AMQP}`)
        // const connection = await amqp.connect(local_constants.amqp)
        rabbitmqChannel = await connection.createChannel()
        rabbitmqChannel.assertExchange(exchange,'direct',{durable:true})
        console.log('connected to RabbitMQ server');
    } catch (error) {
        console.log('failed to connect to RabbitMQ server');
    }
}
rabbitmqSetup();

// connect to the mysql server
let connection 
mysql.createConnection({
    database:process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD
    // database:local_constants.database,
    // host: local_constants.host,
    // user: local_constants.user,
    // password:local_constants.password
}).then(con=>{
    console.log('mysql connection established');
    connection = con
}).catch(err=>{
    console.log('error connecting to mysql server ',err);
})

app.get('/api/test',(req,res)=>{
    res.send('api gateway service route: api/test')
})


app.post('/api/login',async(req,res)=>{
    try {
        axios.post('/login',req.body,{
            // baseURL:local_constants.auth_url
            baseURL:process.env.AUTH_URL
        })
        .then(response=>{
            console.log('response from auth service: ',response.data);
            res.json(response.data);
        })
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).json('login failed: internal error')
    }
})
app.post('/api/register',async(req,res)=>{
    try {
        axios.post('/register',req.body,{
            // baseURL:local_constants.auth_url
            baseURL:process.env.AUTH_URL
        })
        .then(response=>{
            console.log('response from auth service: ',response.data);
            res.json(response.data);
        })
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).json('login failed: internal error')
    }
})

app.get('/api/orders',async(req,res)=>{
    try {
        console.log('hit api gateway ...');
        const authHeader = req.get('authorization')
        const jwt = authHeader.split(' ')[1]
        // first validate the jwt token calling auth service
        const response = await axios.post('/validate',{token:jwt},{
            // baseURL: local_constants.auth_url
            baseURL: process.env.AUTH_URL
        })
        console.log('validate response from auth server: ',response.data);

        // fetch orders of the user with the user id 
        const orderResponse = await connection.query('select `order_item`.`order_id` , sum(`order_item`.`quantity` * `product`.`price`) as `total_cost`\
        from `order_item` \
        join `orders` on `order_item`.`order_id` = `orders`.`id`\
        join `product` on `order_item`.`product_id` = `product`.`id`\
        where `order_item`.`order_id` in (select `id` from `orders` where `user_id` = ?)\
        group by `order_item`.`order_id`',[response.data.userId])
        console.log('order response: ',orderResponse);
        res.status(200).json(orderResponse)
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).json('login failed: internal error')
    }
})

app.post('/api/orders',async(req,res)=>{
    try {
        const authHeader = req.get('authorization')
        const jwt = authHeader.split(' ')[1]
        // first validate the jwt token calling auth service
        const response = await axios.post('/validate',{token:jwt},{
            // baseURL: local_constants.auth_url
            baseURL: process.env.AUTH_URL
        })

        // send the order info and user id and email to the queue
        let message = {
            userId: parseInt(response.data.userId),
            email: response.data.email,
            productId: parseInt(req.body.id),
            quantity: parseInt(req.body.quantity)
        }
        rabbitmqChannel.publish(exchange,'ordering',Buffer.from(JSON.stringify(message)))
        // return an instant response to the client
        res.status(200).json('order is being processed')
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).json('login failed: internal error')
    }
})



app.listen(5001, ()=>{
    console.log('api gateway listening on 5001');
})