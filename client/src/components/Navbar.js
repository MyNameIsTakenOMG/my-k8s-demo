import React, { useContext, useState } from 'react'
import Stack from '@mui/material/Stack'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import {userContext} from '../context/UserContextProvider'
import axios from 'axios'

export default function Navbar() {

  const context = useContext(userContext)

  const handleLogout = ()=>{
    localStorage.removeItem('myJwt')
    context.logout()
  }

  // open dialog
  const [openDialog, setOpenDialog] = useState(false)
  const handleLogin = ()=>{
    setOpenDialog(true)
  }
  const handleClose = ()=>{
    setOpenDialog(false)
    setSignInfo({
      firstName:'',
      lastName:'',
      email:'',
      password:''
    })
  }
  // switch between login form and register form
  const [loginOrRegister, setLoginOrRegister] = useState('login')
  const handleSwitch = (e)=>{
    setLoginOrRegister(e.target.value)
  }
  // signin  form
  const [signInfo, setSignInfo] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:''
  })
  const handleChange = (e)=>{
    setSignInfo(pre=>{
      return {
        ...pre,
        [e.target.id]:e.target.value
      }
    })
  }

  const handleSubmit = async(e)=>{
    try {
      e.preventDefault()
      // if the user tries to login
      if(loginOrRegister === 'login'){
        let response = await axios.post('/api/login',{email:signInfo.email,password:signInfo.password},{
            baseURL: process.env.REACT_APP_BASE_URL
            // baseURL: 'http://localhost:5001'
        })
        localStorage.setItem('myJwt',response.data)
        context.login(signInfo.email, signInfo.password)
      }
      // if the user tries to register
      if(loginOrRegister === 'register'){
        let response = await axios.post('/api/register',{firstName: signInfo.firstName, lastName: signInfo.lastName, email: signInfo.email, password: signInfo.password},{
          baseURL: process.env.REACT_APP_BASE_URL
          // baseURL: 'http://localhost:5001'
        })
        localStorage.setItem('myJwt',response.data)
        context.register(signInfo.email, signInfo.password)
      }
      setOpenDialog(false)
      console.log('signed in sucessfully');
    } catch (error) {
      console.log('error: ' + error)
      setOpenDialog(false)
    }
  }

  return (
    <Stack direction={'row'} justifyContent={'space-between'} sx={{width:'inherit',p:2,bgcolor:teal[500],color:'white'}}>
        <Typography variant='h5'>LOGO</Typography>
        {context.userInfo.userId
        ?
          <Stack direction={'row'} rowGap={1}>
            <Typography variant='body1' sx={{alignSelf:'center'}}>
              Welcome, {context.userInfo.email}
            </Typography>
            <Button variant='outline' sx={{color:'white'}} onClick={handleLogout}>Log out</Button>
          </Stack>
        :
          <Button variant='outlined' sx={{color:'white', borderColor:'transparent','&:hover':{borderColor:'transparent'}}} onClick={handleLogin}>Login/Register</Button>
        }

        {/* Login/Register Form */}
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogContent>
            <FormControl>
              <FormLabel>{loginOrRegister==='login'?'Login':'Register'}</FormLabel>
              <RadioGroup
                row
                name='sign-form-group'
                value={loginOrRegister}
                onChange={handleSwitch}
              >
                <FormControlLabel value="login" control={<Radio/>} label='login'/>
                <FormControlLabel value="register" control={<Radio/>} label='register' />
              </RadioGroup>
            </FormControl>
            <form style={{display:'flex',flexFlow:'column nowrap',rowGap:'1rem'}}>
              {
                loginOrRegister === 'register' &&
                <>
                  <TextField id='firstName' value={signInfo.firstName} label='first name' onChange={handleChange}/>
                  <TextField id='lastName' value={signInfo.lastName} label='last name' onChange={handleChange}/>
                </>
              }
              <TextField id='email' value={signInfo.email} label='email' onChange={handleChange}/>
              <TextField id='password' value={signInfo.password} type='password' label='password' onChange={handleChange}/>
              <Button type='submit' variant='contained' onClick={handleSubmit}>submit</Button>
            </form>
          </DialogContent>
        </Dialog>
    </Stack>
  )
}
