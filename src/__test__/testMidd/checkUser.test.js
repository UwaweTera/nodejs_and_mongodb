import request from "supertest";
import app from "../../app";


//Getting all tokens
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQzOGI3NDc5NzBmNDg0MmJmY2E1NCIsImlhdCI6MTY3MjI5NjY0NX0.PbNXejxULJrsa7BdffphHoPbBZej7HDFRn6ghKal9iU'
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQzYmNhYTkxZDZjMWYyMTY1ZmQwYyIsImlhdCI6MTY3MjI5NzQzMH0.39t1BxlTTqCQAQPRBELiUF6Y3Nl6E3-2DdwprbY_WQ0';

const getBog = ()=>{
    return request(app).post('/user/adminsignup').set('Authorization',token).send({
        name: "Samu",
        email: "ji.jpg",
        password: ""
    })
}

//testing blog for checking user

test('Testing user to add blog',async()=>{
    
})