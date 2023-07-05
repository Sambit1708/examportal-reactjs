import React, { useState } from 'react'
import './SignUpPage.css'
import { Grid, TextField } from '@mui/material'
import UserService from '../../services/UserService'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const SignUpPage = () => {

  const [data, setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    phone:'',
    userName:'',
  })
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login')
  }

  const handleData = (event) => {
    const newData = {...data}
    newData[event.target.id]=event.target.value
    setData(newData)
  }

  const submitForm = (event) => {
    event.preventDefault();
    UserService.createNewUser(data).then((res) => {
      swal("Good job!", "User Saved Successfully!", "success");
    }).catch((error) => {
      swal("Something went wrong!!", ''+error, "error");
    })
  }
  
  return (
    <div className='signup-contaier'>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <div className='signup-form'>
            <Grid container>
              <Grid className='form-grid grid-if' item xs={8}>
                <form onSubmit={(event) => submitForm(event)}>
                  <h2 className="font-monospace">Registration Form</h2>
                  <div className='form-div-input'>
                    <div className="row g-3 input-column">
                      <div className="col">
                        <input type="text" id="firstName" onChange={(event) => handleData(event)} className="form-control" placeholder="First name" aria-label="First name" />
                      </div>
                      <div className="col">
                        <input type="text" id="lastName" onChange={(event) => handleData(event)} className="form-control" placeholder="Last name" aria-label="Last name" />
                      </div>
                    </div>
                    <div className='input-column'>
                      <TextField
                        helperText="Please enter your email"
                        type='email'
                        onChange={(event) => handleData(event)}
                        id="email"
                        label="Email"
                      />
                      <TextField
                        helperText="Please enter your password"
                        type='password'
                        onChange={(event) => handleData(event)}
                        id="password"
                        label="Password"
                      />
                    </div>
                    <div className='input-column'>
                      <TextField
                        id="userName"
                        onChange={(event) => handleData(event)}
                        label="Username"
                      />
                      <TextField
                        id="phone"
                        onChange={(event) => handleData(event)}
                        label="Phone"
                      />
                    </div>
                    <input className="form-control file-upload" type="file" id="formFile" />
                  </div>
                  <div className='form-btn'>
                    <button className='btn btn-success' type='submit'>Submit</button>
                    <button className='btn btn-warning' type='reset'>Reset</button>
                  </div>
                </form>
              </Grid>
              <Grid className='image-grid grid-if' item xs={4}>
                <div className='image-container'>
                  <div className='image-conatiner-text'>
                    <h3>One of us?</h3>
                    <p>If you have already have an account please sign in.</p>
                  </div>
                  <div className='image-conatiner-btn'>
                    <button onClick={navigateToLogin}>Login</button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid> 
    </div>
  )
}
export default SignUpPage