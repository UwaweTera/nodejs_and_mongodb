import request from "supertest";
import app from "../app";

import { Post } from "../model/articleMod";

//Getting all tokens
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQzOGI3NDc5NzBmNDg0MmJmY2E1NCIsImlhdCI6MTY3MjI5NjY0NX0.PbNXejxULJrsa7BdffphHoPbBZej7HDFRn6ghKal9iU'
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWQzYmNhYTkxZDZjMWYyMTY1ZmQwYyIsImlhdCI6MTY3MjI5NzQzMH0.39t1BxlTTqCQAQPRBELiUF6Y3Nl6E3-2DdwprbY_WQ0';

//for good request
const getBlog = ()=>{
    return request(app).post('/blogs').set('Authorization',token).send({
        head: "Ipsum is simply dummy",
        image: "ji.jpg",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    })
}
//for bad request
const getBadBlog = ()=>{
    return request(app).post('/blogs').set('Authorization',userToken).send({
        head: "Ipsum is simply dummy",
        image: "ji.jpg",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    })
}

//Getting all blogs
test('Getting all blogs', async()=>{
    const response = await request(app).get('/blogs');
    expect(response.statusCode).toBe(200)
})

//testing single blog based on id
test('Getting single blog', async()=>{
    const result = await getBlog();
    const id = result.body._id;
    const response = await request(app).get(`/blogs/${id}`);
    expect(response.statusCode).toBe(200)
})
//testing single blog based on id for bad requwe
test('Testing one blog for bad request', async()=>{
    const id = '123';
    const response = await request(app).get(`/blogs/${id}`);
    expect(response.statusCode).toBe(404)
})

//adding blog
test('Testing post blog', async()=>{
    const result = await getBlog();
    expect(result.statusCode).toBe(201)
})

//adding blog by unauthorized
test('Testing post blog while unauthorized', async()=>{
    const result = await getBadBlog();
    expect(result.statusCode).toBe(401)
})

//updating test
test('updating single blog', async()=>{
    //get function blog
    const result = await getBlog();
    const id = result.body._id;
    const response = await request(app).patch(`/blogs/${id}/update`).set('Authorization',token).send({
        head: "Ipsum is simply dummy",
        image: "ji.jpg",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    });
    expect(response.statusCode).toBe(200)
})

//updating test for not found
test('updating single blog for not found', async()=>{
    //get function blog
    const result = await getBlog();
    const id = '123';
    const response = await request(app).patch(`/blogs/${id}/update`).set('Authorization',token).send({
        head: "Ipsum is simply dummy",
        image: "ji.jpg",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    });
    expect(response.statusCode).toBe(404)
})

//delete blog
test('delete single blog', async()=>{
    const result = await getBlog();
    const id = result.body._id;
    const response = await request(app).delete(`/blogs/${id}`).set('Authorization',token);
    expect(response.statusCode).toBe(200)
})

//delete blog by not found
test('delete single blog for not found', async()=>{
    const result = await getBlog();
    const id = '1234';
    const response = await request(app).delete(`/blogs/${id}`).set('Authorization',token);
    expect(response.statusCode).toBe(404)
})



//adding comment
test('add comment to blog', async()=>{
    const result = await getBlog();
    const id = result.body._id;

    const response = await request(app).post(`/blogs/${id}/comment`).set('Authorization',userToken).send({
        text: 'sjldlkfjalsjflasflsjfsdf'
    });
    expect(response.statusCode).toBe(200)
})

//adding comment for unauthorized
test('add comment to blog for unauthorized', async()=>{
    const result = await getBlog();
    const id = result.body._id;

    const response = await request(app).post(`/blogs/${id}/comment`).set('Authorization',token).send({
        name: 'user',
        email: "user@gmail.com",
        text: 'sjldlkfjalsjflasflsjfsdf',
        blogId: id
    });
    expect(response.statusCode).toBe(401)
})

//testing single blog comments
test('Getting single blog comments', async()=>{
    const result = await getBlog();
    const id = result.body._id;
    const response = await request(app).get(`/blogs/${id}/comments`);
    expect(response.statusCode).toBe(200)
})

//testing single blog comments not found
test('Getting single blog comments', async()=>{
    const result = await getBlog();
    const id = '123';
    const response = await request(app).get(`/blogs/${id}/comments`);
    expect(response.statusCode).toBe(404)
})
    

//delete comment
test('delete single comment', async()=>{
    const result = await getBlog();

    const id = result.body._id;
    const response = await request(app).delete(`/blogs/${id}/comment`).set('Authorization',token);
    expect(response.statusCode).toBe(200)
})


//adding like