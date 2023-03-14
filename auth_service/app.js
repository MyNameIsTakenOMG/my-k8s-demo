const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false}))

// const local_constants = {
//     database: 'my-k8s-demo-db',
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     jwt_secret: 'your jwt secret'
// }

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


app.post('/login',async(req,res)=>{
    try {
        const {email, password} = req.body
        const [rows, fields] = await connection.query('select `id`, `email` from `user` where `email` = ? and `password` = ? limit 1',[email,password])
        if(rows.length === 0){
            res.status(400).json('bad request')
        }
        if(rows.length === 1){
            // create jwt token
            const token = jwt.sign({userId: rows[0].id, email: rows[0].email,exp:Math.floor(Date.now() / 1000)+60*60*24*7},process.env.JWT_SECRET)
            // const token = jwt.sign({userId: rows[0].id, email: rows[0].email,exp:Math.floor(Date.now() / 1000)+60*60*24*7},local_constants.jwt_secret)
            res.status(200).json(token)
        }
    } catch (error) {
        console.log('error: ',error);
        res.status(500).json('internal error')
    }
})
app.post('/register',async(req,res)=>{
    try {
        const {firstName, lastName, email, password} = req.body
        const [rows, fields] = await connection.query('insert into `user`(`first_name`, `last_name`, `email`, `password`,`role`) values (?,?,?,?,?)',[firstName,lastName,email,password,'regular'])
        // create jwt token
        const token = jwt.sign({userId: rows.insertId,email:email,exp:Math.floor(Date.now() / 1000)+60*60*24*7},process.env.JWT_SECRET)
        // const token = jwt.sign({userId: rows.insertId,email:email,exp:Math.floor(Date.now() / 1000)+60*60*24*7},local_constants.jwt_secret)
        res.status(200).json(token)
    } catch (error) {
        console.log('error: ',error);
        res.status(500).json('internal error')
    }
})

app.post('/validate', async(req,res)=>{
    try {
        console.log('hit auth service  validate...');
        const {token} = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // const decoded = jwt.verify(token, local_constants.jwt_secret)
        res.status(200).json(decoded)
    } catch (error) {
        console.log('invalid jwt token');
        res.status(401).json('unauthorized')
    }

})


app.listen(5002, ()=>{
    console.log('auth server listening on port 5002');
})