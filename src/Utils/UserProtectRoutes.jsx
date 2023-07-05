import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import UserService from '../services/UserService';
import LoginService from '../services/LoginService';

const UserProtectRoutes = () => {
    if(LoginService.isLoggedin()) {
        if(UserService.getUserRole() === 'NORMAL') {
            return <Outlet />
        }
    }
    return <Navigate to={"/login"} />
}

export default UserProtectRoutes