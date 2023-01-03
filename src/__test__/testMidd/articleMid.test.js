import request from "supertest";
import app from "../../app";


//Getting all tokens
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjNkNWQzNmQ4ZmVkYTFhMmJkY2JkZCIsImlhdCI6MTY3MjczMDA3NH0.FJEbcZhIj2Cs2JSGGQNLRzjdE4wObbInq0EGSRKGzJ8'
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjNkNTlmNmQ4ZmVkYTFhMmJkY2JkYSIsImlhdCI6MTY3MjczMDEyMX0.0G6ipqK5705YTylDBeuxOSy9SwBOx_N6mWO6DwPCUPA';

const getBlog = ()=>{
    return request(app).post('/blogs').set('Authorization',token).send({
        head: "Ip",
        image: "ji.jpg",
        bod: ""
    })
}

//adding blog
/* test('adding blog for middleware', async()=>{
    const result = await getBlog();
    expect(result.statusCode).toBe(400)
}) */

//update blog
/* test('update blog in middleware', async()=>{
    const result = await getBlog();
    const id = result.body._id;
    const response = await request(app).patch(`/blogs/${id}/update`).set('Authorization',token);
    expect(response.statusCode).toBe(400)
}) */