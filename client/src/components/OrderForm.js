import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';


const products = [
  {
    name:'item1',
    id:1
  },
  {
    name:'item2',
    id:2
  },
  {
    name:'item3',
    id:3
  }
]


export default function OrderForm() {

  const [order, setOrder] = useState({
    id: '',
    name: '',
    quantity: 0
  })

  const handleSelectChange = (e)=>{
    console.log('onchange value: ', e.target.value);
      const selectedItem = products.find(p => p.id === e.target.value)
      setOrder(pre=>{
        return {
          ...pre,
          id: e.target.value,
          name: selectedItem.name
        }
      })
  }

  const handleQuantityChange = (e) => {
    setOrder(pre=>{
      return{
        ...pre,
        quantity: e.target.value
      }
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log('submit');
    console.log('order: ',order);
    axios.post('/api/orders',order,{
      baseURL: process.env.REACT_APP_BASE_URL,
      // baseURL: 'http://localhost:5001',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('myJwt')
      }
    })
    .then(response =>{
      // instant response from api-gateway service
      console.log('your order is being processed');
    })
    .catch(err =>{
      console.log('err: ',err);
      console.log('failed to process your order');
    })
  }


  return (
    <Stack sx={{width:'50%', overflowY:'auto', borderRight:'1px solid grey'}}>
        <Typography variant='body1' sx={{mb:3}}>OrderForm</Typography>
        <form onSubmit={handleSubmit} style={{width:'60%',marginLeft:'auto',marginRight:'auto',display:'flex', flexFlow:'column nowrap',rowGap:'1rem'}}>
          <FormControl >
            <InputLabel id='selectLabel'>product</InputLabel>
            <Select
              labelId='selectLabel'
              id='select-product'
              label='product'
              value={order.id}
              onChange={handleSelectChange}
            >
              {products.map(product =>{
                return <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              })}
            </Select>
          </FormControl>
          <TextField
            id="quantity"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={order.quantity}
            onChange={handleQuantityChange}
          />
          <Button variant='contained' type='submit'>Order</Button>
        </form>
    </Stack>
  )
}
