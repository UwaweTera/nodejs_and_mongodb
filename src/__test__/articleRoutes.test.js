import request from "supertest";
import app from "../app";
import { Post } from "../model/articleMod";
import { Signup } from "../model/registerMod";
import { adminToken, userToken } from "./ref.test";

/* beforeEach(async()=>{
    await Signup.deleteMany()
}) */

//for good request
const getBlog = async()=>{
    const token = await adminToken();
    const result = await request(app).post('/blogs').set('Authorization',token).send({
        head: "Ipsum is simply dummy",
        image: "ji.jpg",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    })
    return result
}

//for bad request
const getBadBlog = async()=>{
    const result = await request(app).post('/blogs').set('Authorization','gf556h').send({
        head: "Ipsum is simply dummy",
        image: "ji.jpg",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
    })
    return result
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




//adding blog
test('Testing post blog', async()=>{
    const blog = await getBlog();
    expect(blog.statusCode).toBe(200);
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
    const token = await adminToken();
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
    const token = await adminToken();
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
    const token = await adminToken();
    const response = await request(app).delete(`/blogs/${id}`).set('Authorization',token);
    expect(response.statusCode).toBe(200)
})

//delete blog by not found
test('delete single blog for not found', async()=>{
    const result = await getBlog();
    const id = '1234';
    const token = await adminToken();
    const response = await request(app).delete(`/blogs/${id}`).set('Authorization',token);
    expect(response.statusCode).toBe(404)
})

// some blog middleware

const getBlogMid = async()=>{
    const token = await adminToken();
    const result = await request(app).post('/blogs').set('Authorization',token).send({
        head: "Ip",
        image: "ji.jpg",
        bod: ""
    })
    return result;    
}

//adding blog im middleware
test('adding blog for middleware', async()=>{
    const result = await getBlogMid();
    expect(result.statusCode).toBe(400)
})

test('update blog in middleware', async()=>{
    const token = await adminToken();
    const result = await getBlogMid();
    const id = result.body._id;
    const response = await request(app).patch(`/blogs/${id}/update`).set('Authorization',token);
    expect(response.statusCode).toBe(400)
})


//adding comment
test('add comment to blog', async()=>{
    const result = await getBlog();
    const id = result.body._id;
    const token = await userToken();
    const response = await request(app).post(`/blogs/${id}/comment`).set('Authorization',token).send({
        text: 'sjldlkfjalsjflasflsjfsdf'
    });
    expect(response.statusCode).toBe(200)
})


//adding comment for unauthorized
test('add comment to blog for unauthorized', async()=>{
    const result = await getBlog();
    const id = result.body._id;
    const token = '923dfsajkadf';
    const response = await request(app).post(`/blogs/${id}/comment`).set('Authorization',token).send({
        text: 'sjldlkfjalsjflasflsjfsdf'
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
    const token = await userToken();

    const comment = await request(app).post(`/blogs/${id}/comment`).set('Authorization',token).send({
        text: 'sjldlkfjalsjflasflsjfsdf'
    });
    const commId = comment.body._id;
    const admintoken = await adminToken();
    const response = await request(app).delete(`/blogs/${id}/comments/${commId}`).set('Authorization',admintoken);
    expect(response.statusCode).toBe(200)
})

//Adding like to blog by not found
    test('add like by not found',async()=>{
        const blogId = '1234';
        const token = await userToken();
        const response = await request(app).put(`/blogs/${blogId}/like`).set('Authorization',token);
        expect(response.statusCode).toEqual(404)
        expect(response.body).toEqual('not found')
    })


//getting like related to blog
describe('testing like relate to blog',()=>{
    test('for good request', async()=>{
        const blog = await getBlog();
        const blogId = blog.body._id;
        const response = await  request(app).get(`/blogs/${blogId}/likes`);
        expect(response.statusCode).toBe(200) 
    })

    test('for bad request', async()=>{
        const id = '1234';
        const response = await request(app).get(`/blogs/${id}/likes`);
        expect(response.statusCode).toBe(404)
    })
})


