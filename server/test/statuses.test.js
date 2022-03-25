const request = require('supertest');
const {sequelize} = require('../models');
const { app, redisClient } = require('../app.js');

const agent = request.agent(app)

beforeEach(async function(){
    await request(app).post('/users/register').send({
        username:'username',
        email:'test@test.com',
        password:'password'
    });

    await agent.post('/users/login').send({
        username:'username',
        password:'password'
    });
});

afterEach(async function(){
    await agent.post('/users/logout');
})

afterAll(async () => {
    await redisClient.disconnect()
    await sequelize.close()
    app.close();
});

describe('Get statuses /statuses', () => {
    it('should return an array of statuses',async ()=>{
        const response = await agent.get('/statuses');
        
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String)
                })
            ])
        );
    })
});

