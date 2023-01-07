import request from "supertest";
import app from "../../app";
import { Signup } from "../model/registerMod";
const SECONDS = 1000;
jest.setTimeout(70 * SECONDS)
beforeEach(async()=>{
    await Signup.deleteMany()
})

const getUser = ()=>{
    return request(app).post('/user/signup').send({
        name: "Samu",
        email: "ji.jpg",
        password: ""
    })
}
const getAdmin = ()=>{
    return request(app).post('/user/adminsignup').send({
        name: "Samu",
        email: "ji.jpg",
        password: ""
    })
}

//user admin validation
test('admin signup for middleware', async()=>{
    const result = await getAdmin();
    expect(result.statusCode).toBe(400)
})

//user signup validation
test('user signup for middleware', async()=>{
    const result = await getUser();
    expect(result.statusCode).toBe(400)
})
