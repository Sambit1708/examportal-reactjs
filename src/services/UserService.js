import axios from "../Utils/axios";
import LoginService from "./LoginService";

const USER_PATH = "/user"
const USER_ADD_PATH = "/create-user";
const CURRENT_USER_PATH = "/current-user";
const UPDATE_USER = '/update-user'

class UserService {

    /**
     * * This function is used to create new User.
     * @param {*} user 
     * @returns 
     */
    createNewUser(user) {
        return axios.post(`${USER_PATH}${USER_ADD_PATH}`, user);
    }

    /**
     * * This method is used to get user from local storage.
     * @param {*} user 
     */
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    /**
     * * This method is used to get user from local storage
     * @param {*} user 
     * @returns {User}
     */
    getUsers() {
        let userStr = localStorage.getItem('user')
        if(userStr != null) {
            return JSON.parse(userStr)
        }
        else {
            LoginService.logout();
            return null;
        }
    }

    /**
     * * To get user role.
     * @returns {Authority}
     */
    getUserRole() {
        let user = this.getUsers();
        if(user == null) {
            return null;
        }
        return user.authorities[0].authority;
    }

    /**
     * * This method is used To get current loggined User
     * @returns {CurrentUser}
     */
    getCurrentUser() {
         return axios.get(`${CURRENT_USER_PATH}`)
    }

    /**
     * * To get all users
     * @returns {User}
     */
    getAllUsers() {
        let userStr = localStorage.getItem('user')
        if(userStr != null) {
            const data = JSON.parse(userStr)
            if(data.authorities[0].authority === 'ADMIN') {
                return axios.get(`${USER_PATH}/`);
            }
        }
        return null;
    }
    /**
     * ! To Update User
     */
    updateUser(user) {
        console.log(user)
        return axios.post(`${USER_PATH}${UPDATE_USER}`, user);
       
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService()