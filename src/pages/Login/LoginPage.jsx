import React from 'react'
import './LoginPage.css'
import NavBar from '../../components/NavBar'
import swal from 'sweetalert';
import LoginService from '../../services/LoginService';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const LoginPage = () => {

  const loginRef = useRef()
  const navigate = useNavigate();

  const generateToken = async (data) => {
    try {
        const tokenRes = await LoginService.userLogin(data);
        LoginService.setToken(tokenRes.data.token);

        const currentUserRes = await UserService.getCurrentUser();
        UserService.setUser(currentUserRes.data)

        const role = UserService.getUserRole()
        if(role === 'NORMAL') {
            navigate('/User');
        }
        else if(role === 'ADMIN') {
            navigate('/Admin');
        }
        else {
            LoginService.logout();
            navigate('/')
        }
    } catch(error) {
        swal("Something went wrong!!", `${error}`, "error");
    }
  }

  const submitLoginForm = (event) => {
    event.preventDefault();

    const loginData = {
        username:`${loginRef.current.username.value}`,
        password:`${loginRef.current.password.value}`
    }

    if(loginData.username === '' || loginData.password === '') {
        swal("Invalid Input!!", "Username or password can't be null", "error");
        return
    }
    generateToken(loginData);
  }

  return (
    <div className='fprm-grp'>
        <NavBar />
        <div className='frm-grp'>
            <div className='row frm-contain'>
                <form ref={loginRef} onSubmit={(event) => submitLoginForm(event)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="text" className="form-control" name="username" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" />
                    </div>
                    <div className="mb-3">
                        <a className='forgot' href='#!'>Forget Password</a>
                    </div>
                    <div className='bttn text-center'>
                        <button type="submit" className="btn btn-success">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
export default LoginPage