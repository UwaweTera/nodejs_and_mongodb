import request from "supertest";
import app from "../../app";
import { Signup } from "../../model/registerMod";
import { adminToken } from "../ref.test.js";

beforeEach(async()=>{
    await Signup.deleteMany()
})

const getBlog = async()=>{
    const token = adminToken()
    const result = await request(app).post('/blogs').set('Authorization',token).send({
        head: "Ip",
        image: "ji.jpg",
        bod: ""
    })
    return result;    
}

//adding blog
test('adding blog for middleware', async()=>{
    const result = await getBlog();
    expect(result.statusCode).toBe(400)
})
 
//update blog
/* test('update blog in middleware', async()=>{
    const result = await getBlog();
    const id = result.body._id;
    const response = await request(app).patch(`/blogs/${id}/update`).set('Authorization',token);
    expect(response.statusCode).toBe(400)
}) */