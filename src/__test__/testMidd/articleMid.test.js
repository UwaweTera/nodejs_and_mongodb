import request from "supertest";
import app from "../../app";


/* const getBlog = ()=>{
    return request(app).post('/blogs').set('Authorization',token).send({
        head: "Ip",
        image: "ji.jpg",
        bod: ""
    })
} */

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