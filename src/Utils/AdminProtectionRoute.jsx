import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import UserService from '../services/UserService';
import LoginService from '../services/LoginService';

const AdminProtectionRoute = () => {
    if(LoginService.isLoggedin()) {
        if(UserService.getUserRole() === 'ADMIN') {
            return <Outlet />
        }
    }
    return <Navigate to={"/login"} />
}

export default AdminProtectionRoute