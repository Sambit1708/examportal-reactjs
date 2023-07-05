import axios from "../Utils/axios";

const GENERATE_TOKEN = "/generate-token";

class LoginService {

    //TODO: genetate token
    userLogin(loginData) {
        return axios.post(`${GENERATE_TOKEN}`, loginData)
    }

    //TODO: getToken: To get the token from local storage.
    getToken() {
        return localStorage.getItem('token');
    }

    //TODO: Set token in local storage
    setToken(token) {
        localStorage.setItem('token', token);
        return true;
    }

    //TODO: isLogin: user is logged in or not.
    isLoggedin() {
        let tokenStr = localStorage.getItem('token');
        if(tokenStr === undefined || tokenStr === '' || tokenStr == null) {
            return false;
        } else {
            return true;
        }
    }

    //TODO: Logout : remove token from local storage
    logout() {
       if(localStorage.getItem('user') !== null && localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
       }

    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new LoginService()