import request from "supertest";
import app from "../app";
import { Signup } from "../model/registerMod";

const user = {
    name: "user",
    email: "user@gmail.com",
    password: "user35353"
}

beforeEach(async()=>{
    await Signup(user).save();
})

//signup to user
test('user signup',async()=>{
    const user = await request(app).post('/user/signup').send({
        name: 'user1',
        email: 'user1@gmail.com',
        password: 'user13535'
    })
    expect(user.statusCode).toBe(200);
})

//login to both user and admin

test('login to both user and admin', async()=>{
    const login = await request(app).post('/user/login').send({
        email: user.email,
        password: user.password
    })
    expect(login.statusCode).toBe(200)
})


