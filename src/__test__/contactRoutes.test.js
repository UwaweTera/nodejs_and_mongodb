import request from "supertest";
import app from "../app";
import { adminToken, userToken } from "./ref.test";
import { Signup } from "../model/registerMod";
import { Post } from "../model/articleMod";
/* beforeAll(async()=>{
    await Signup.deleteMany()
}) */

// sending message
 test('Testing for sending message', async()=>{
    const result = await request(app).post('/messages').send({
        name: "JohnDoe",
        email: "john@gmail.com",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    })
    expect(result.statusCode).toBe(200)
})

//sending message by bad request
test('Testing for sending message with bad request', async()=>{
    const result = await request(app).post('/messages').send({
        name: "",
        email: "john@gmaicom",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    })
    expect(result.statusCode).toBe(400)
})

//getting all messages
test('getting all messages',async()=>{
    const token = await adminToken();
    const res = await request(app).get('/messages').set('Authorization',token);
    expect(res.statusCode).toBe(200)
})


//getting all messages for testing
test('getting all messages for unauthorized',async()=>{
    const token = await userToken();
    const res = await request(app).get('/messages').set('Authorization',token);
    expect(res.statusCode).toBe(401)
}) 

/* describe('delete',()=>{
    test('delete one message',async()=>{
   
        const result = await request(app).post('/messages').send({
            name: "Patrick",
            email: "patrick@gmail.com",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        })
        const blogId = result.body._id;
        const token = await adminToken();
        console.log(token)
        const response = await request(app).delete(`/messages/${blogId}`).set('Authorization',token);
        expect(response.statusCode).toBe(200)
    }) 
}) */


