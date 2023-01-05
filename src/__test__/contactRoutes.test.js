import request from "supertest";
import app from "../app";
import Contact from "../model/messageMod";

/* beforeEach(async()=>{
    await Contact.deleteMany()
})  */

// sending message
/* test('Testing for sending message', async()=>{
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
    const res = await request(app).get('/messages').set('Authorization',token);
    expect(res.statusCode).toBe(200)
})

//getting all messages for testing
test('getting all messages for authorized',async()=>{
    const res = await request(app).get('/messages').set('Authorization',userToken);
    expect(res.statusCode).toBe(401)
}) 


test('delete one message',async()=>{
    const result = await request(app).post('/messages').send({
        name: "Patrick",
        email: "patrick@gmail.com",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    })
    
    const blogId = result.body._id;
    const response = await request(app).delete(`/messages/${blogId}`).set('Authorization',token);
    expect(response.statusCode).toBe(200)
}) */

