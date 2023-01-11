
import request from "supertest";
import app from "../app";
import { Signup } from "../model/registerMod";
import { adminToken } from "./ref.test";

/* beforeEach(async()=>{
    await Signup.deleteMany()
}) */

const newUser = {
    name: 'John',
    email: 'john@gmail.com',
    password: 'john3535'
}



const getUser = async()=>{
    const result =  await request(app).post('/user/adminsignup').send(newUser);
    return result
}


//signup to user
test('user signup',async()=>{
    const user = await request(app).post('/user/signup').send({
        name: 'user1',
        email: 'user1@gmail.com',
        password: 'user13535'
    })
    expect(user.statusCode).toBe(200);
})

//signup to admin
test('admin signup',async()=>{
    const user = await request(app).post('/user/adminsignup').send({
        name: 'new admin',
        email: 'newadmin@gmail.com',
        password: 'admin3535'
    })
    expect(user.statusCode).toBe(200);
})



//login to both user and admin

/* test('login to both user and admin', async()=>{
    const login = await request(app).post('/user/login').send({
        email: newUser.email,
        password: newUser.password
    })
    expect(login.statusCode).toBe(200)
})
 */


// get all admin
/* test('get all admin registered', async()=>{
    const token = await adminToken();
    const result = await request(app).get('/user').set('Authorization',token);
    expect(result.statusCode).toBe(200)
}) */

// delete user
test('delete user', async()=>{
    const user = await getUser();
    const id = user.body._id;
    const token = await adminToken();
    const result = await request(app).delete(`/user/${id}`).set('Authorization',token);
    expect(result.statusCode).toBe(200)
})