import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './type'

export function loginUser(dataSubmit){

    const request = axios.post('http://localhost:5000/api/users/login', dataSubmit)
    .then(res => res.data)

    return {
        type : LOGIN_USER,
        payload : request

    }
}

export function registerUser(dataSubmit){

    const request = axios.post('http://localhost:5000/api/register', dataSubmit)
    .then(res => res.data)

    return {
        type : REGISTER_USER,
        payload : request

    }
}