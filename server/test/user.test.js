const request = require('supertest');
const {sequelize} = require('../models');
const { app, redisClient } = require('../app.js');

afterAll(async () => {
    await redisClient.disconnect()
    await sequelize.close()
    app.close();
});

afterEach(async ()=>{
    if(process.env.NODE_ENV === 'test'){
        await sequelize.query('DELETE FROM "Users"')
    }    
});

describe('Register User /users/register',()=>{
    it('Should response with status code 200',async ()=>{
        const response = await request(app).post('/users/register').send({
            username:'username',
            email:'test@test.com',
            password:'password'
        });
        expect(response.statusCode).toBe(200);
    });

    it('Should response with user data in body',async ()=>{
        const response = await request(app).post('/users/register').send({
            username:'username',
            email:'test@test.com',
            password:'password'
        });
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            updatedAt: expect.any(String),
            createdAt: expect.any(String)
        }));
    });

    it('Should response with an error when data is not the required',async ()=>{
        const response = await request(app).post('/users/register').send({
            username:'username',
            email:'test@test.com',
        });
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({
            status: expect.any(String),
            message: expect.any(String),
        }));
    });

});

describe('Login User /users/login',()=>{
    beforeEach(async ()=>{
        await request(app).post('/users/register').send({
            username:'username',
            email:'test@test.com',
            password:'password'
        });
    })
    it('Should response with status code 200',async ()=>{
        const response = await request(app).post('/users/login').send({
            username:'username',
            password:'password'
        });
        expect(response.statusCode).toBe(200);
    });

    it('Should response with status code 401 if the password is not correct',async ()=>{
        const response = await request(app).post('/users/login').send({
            username:'username',
            password:'passwo_'
        });
        expect(response.statusCode).toBe(401);
    });

    it('Should response with a cookie',async ()=>{
        const response = await request(app).post('/users/login').send({
            username:'username',
            password:'password'
        });
        expect(response.headers).toHaveProperty('set-cookie')
    });
})