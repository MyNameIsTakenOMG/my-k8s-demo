import { Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function OrderHistory() {

  const [orderList, setOrderList] = useState([])

  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    axios.get('/api/orders',{
      baseURL: process.env.REACT_APP_BASE_URL,
      // baseURL: 'http://localhost:5001',
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('myJwt'),
      }
    })
    .then(response=>{
      console.log('response: ', response.data);
      setOrderList(response.data[0])
      setIsFetching(false)
    })
    .catch(error=>{
      console.log('error: ', error);
      setIsFetching(false)
    })
  
    return () => {
    }
  }, [])
  

  return (
    <Stack sx={{width:'50%',overflowY:'auto'}}>
      <Typography variant='body1' sx={{mb:3}}>Order History</Typography>
      {isFetching
      ?<Typography variant='body1'>Fetching...</Typography>
      : orderList.length <= 0
        ? <Typography variant='body1'>no record found</Typography>
        : orderList.map((order,index)=>{
          return  <Paper elevation={2} sx={{mx:1, p:1}} key={index}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='body1'>OrderId: {order.order_id}</Typography>
                    {/* <Typography variant='body1' sx={{flexGrow:1}}>Order time</Typography> */}
                    <Typography variant='body1'>Cost: {order.total_cost}</Typography>
                  </Stack>
              </Paper>
        })
      }  
      
    </Stack>
  )
}
