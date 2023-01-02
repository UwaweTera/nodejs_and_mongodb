import request from "supertest";
import app from "../app";
import axios from "axios";
import { Signup } from "../model/registerMod";

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQzOGI3NDc5NzBmNDg0MmJmY2E1NCIsImlhdCI6MTY3MjI5NjY0NX0.PbNXejxULJrsa7BdffphHoPbBZej7HDFRn6ghKal9iU'
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQzYmNhYTkxZDZjMWYyMTY1ZmQwYyIsImlhdCI6MTY3MjI5NzQzMH0.39t1BxlTTqCQAQPRBELiUF6Y3Nl6E3-2DdwprbY_WQ0';

const newUser = {
    name:"Kalisa1",
    email:"kalisa1@gmailcom",
    password:"kalisa13535"
}
beforeEach(async()=>{
    // await Signup.deleteMany();
    await Signup(newUser).save();
})

//user registration
test('Testing user registration', async()=>{
    const response = await request(app).post('/user/signup').send({
        name:"Kalimu",
        email:"kalimu22@gmail.com",
        password:"kalimu3535"
    })
    
    expect(response.statusCode).toBe(200)
    const id = response.body._id;
    const del = await request(app).delete(`/user/${id}`).set('Authorization',token);
    expect(del.statusCode).toBe(200);
})

//admin  registration
/* test('Testing user registration', async()=>{
    const response = await request(app).post('/user/adminsignup').send({
        name:"Kalisa",
        email:"kalisa@gmailcom",
        password:"kalisa3535"
    })
    expect(response.statusCode).toBe(400)
}) */

//Testing all registered

/* test('getting all user registered', async()=>{
    const result = await request(app).get('user/signup').set('Authorization',token);
    expect(result.statusCode).toBe(200);
}) */

//for login

test('user login',async()=>{
    await request(app).post('/user/login').send({
        email: newUser.email,
        password: newUser.password
    })
})