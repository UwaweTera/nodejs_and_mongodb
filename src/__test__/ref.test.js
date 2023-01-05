import { Signup } from "../model/registerMod";
import request from "supertest";
import app from "../app";

//getting admin token
let adminToken = async()=>{
    const user = await request(app).post('/user/adminsignup').send({
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin13535'
    })
    const adminLogin = await request(app).post('/user/login').send({
        email: 'admin@gmail.com',
        password: 'admin13535'
    })
    return 'Bearer ' + adminLogin.body;
}

//getting user token
let userToken = async()=>{
    const user = await request(app).post('/user/signup').send({
        name: 'user',
        email: 'user@gmail.com',
        password: 'user3535'
    })
    const userLogin = await request(app).post('/user/login').send({
        email: 'user@gmail.com',
        password: 'user3535'
    })
    return 'Bearer ' + userLogin.body;
}

export {adminToken, userToken}