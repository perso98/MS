import { TextField } from '@mui/material'
import React from 'react'
import './style.css'
export default function Login() {
  return (
    <div className='auth-container'><h1>Login</h1>
    <TextField label="Login:" variant='outlined'/>
    </div>
  )
}
