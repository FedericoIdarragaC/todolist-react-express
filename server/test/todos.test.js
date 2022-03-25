const request = require('supertest');
const {sequelize} = require('../models');
const { app, redisClient } = require('../app.js');

const agent = request.agent(app)

beforeEach(async function(){
    if (expect.getState().currentTestName === 'Create ToDo /todos Should response with an error when not user is logged') 
        return

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
    if(process.env.NODE_ENV === 'test'){
        await sequelize.query('DELETE FROM "ToDos"')
        await sequelize.query('DELETE FROM "Users"')
    } 

    if (expect.getState().currentTestName === 'Create ToDo /todos Should response with an error when not user is logged') 
        return

    await agent.post('/users/logout');
})

afterAll(async () => {
    await redisClient.disconnect()
    await sequelize.close()
    app.close();
});


describe('Create ToDo /todos', () => {
    it('Should response with status 200',async ()=>{
        const response = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });
        expect(response.statusCode).toBe(200);
    });

    it('Should response with todo data in body',async ()=>{
        const response = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            updatedAt: expect.any(String),
            createdAt: expect.any(String)
        }));
    });

    it('Should response with an error when data is not the required',async ()=>{
        const response = await agent.post('/todos').send({
            description:"Integration test",
            statusId:"3"
        });

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({
            status: expect.any(String),
            message: expect.any(String),
        }));
    });

    it('Should response with an error when not user is logged',async ()=>{
        const response = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            status: expect.any(String),
            message: expect.any(String),
        }));
    });
});

describe('Get ToDos /todos', () => {
    it('Should response with status 200',async ()=>{
        const response = await agent.get('/todos');

        expect(response.statusCode).toBe(200);
    });

    it('Should response with todo data in body',async ()=>{
        await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });

        const response = await agent.get('/todos');

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                    status:expect.any(Object),
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String)
                })
            ])
        );
    });
});

describe('Get ToDo by id /todos', () => {

    it('Should response with todo data in body',async ()=>{
        const {body} = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });

        const response = await agent.get(`/todos/${body.id}`);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                status:expect.any(Object),
                updatedAt: expect.any(String),
                createdAt: expect.any(String)
            })
        );
    });

    it('Should response with an error if todo do not exists',async ()=>{
        const {body} = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });

        const response = await agent.get(`/todos/${body.id+1}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(
            expect.objectContaining({
                status: expect.any(String),
                message: expect.any(String)
            })
        );
    });
});

describe('Update ToDo /todos', () => {
    it('Should response with status in body',async ()=>{
        const {body} = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });

        const response = await agent.put(`/todos/${body.id}`).send({
            name:"Test ToDo server (updated)",
            description:"Integration test",
            statusId:"2"
        });

        expect(response.body).toEqual(
            expect.objectContaining({
                status: expect.any(String)
            })
        );
    });

    it('Should response with an error if todo do not exists',async ()=>{
        const {body} = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });

        const response = await agent.put(`/todos/${body.id+1}`).send({
            name:"Test ToDo server (updated)",
            description:"Integration test",
            statusId:"2"
        });

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(
            expect.objectContaining({
                status: expect.any(String),
                message: expect.any(String)
            })
        );
    });
});

describe('Delete ToDo /todos', () => {
    it('Should response with status in body',async ()=>{
        const {body} = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });

        const response = await agent.delete(`/todos/${body.id}`)

        expect(response.body).toEqual(
            expect.objectContaining({
                status: expect.any(String)
            })
        );
    });

    it('Should response with an error if todo do not exists',async ()=>{
        const {body} = await agent.post('/todos').send({
            name:"Test ToDo server",
            description:"Integration test",
            statusId:"3"
        });
    
        const response = await agent.delete(`/todos/${body.id+1}`)

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(
            expect.objectContaining({
                status: expect.any(String),
                message: expect.any(String)
            })
        );
    })
})
