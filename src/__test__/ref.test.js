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
    return 'Bearer ' + adminLogin.body.token;
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
    return 'Bearer ' + userLogin.body.token;
}
//testing single blog based on id for bad request
test('Testing one blog for bad request', async()=>{
    const id = '123';
    const response = await request(app).get(`/blogs/${id}`);
    expect(response.statusCode).toBe(404)
}) 

export {adminToken, userToken}