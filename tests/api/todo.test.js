import request from 'supertest'
import { faker } from '@faker-js/faker'
import app from '../../src/api/index'
import Todo from '../../src/models/Todo'
import { clearModelCollection } from '../helper/dbHelper'
import { generateAccessToken } from '../../src/shared/jwtHelper'

const UserFactory = require('../factories/user')
const TodoFactory = require('../factories/todo')

describe('api/todo', () => {
    beforeEach(async () => {
        await clearModelCollection(Todo)
    })

    afterAll(async () => {
        await clearModelCollection(Todo)
    })

    describe('POST', () => {
        it('respond with valid HTTP status code and create todo', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const params = {
                title: faker.location.city(),
                description: faker.location.city(),
                username: faker.internet.userName(),
                isDone: true
            }

            const response = await request(app)
                .post('/api/todo')
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send(params)

            expect(response.status).toBe(200)

            const todo = await Todo.find()

            expect(todo).toHaveLength(1)
            expect(todo[0].userId).toBe(user.id)
        })
    })

    describe('GET all', () => {
        it('respond with valid HTTP status code and lists all todos', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo1 = new TodoFactory({ userId: user.id })
            const todo1 = await newTodo1.save()

            const newTodo2 = new TodoFactory({ sharedWith: [user.id] })
            await newTodo2.save()

            const newTodo3 = new TodoFactory()
            await newTodo3.save()

            const response = await request(app)
                .get('/api/todos')
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveLength(2)
            expect(response.body[0].description).toBe(todo1.description)
        })
    })

    describe('GET /:ID', () => {
        it('respond with valid HTTP status code and return todo by id', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({ userId: user.id })
            const todo = await newTodo.save()

            const response = await request(app)
                .get(`/api/todo/${todo.id}`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(200)
            expect(response.body.description).toBe(todo.description)
        })

        it('respond with valid HTTP status code and return shared todo', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({ sharedWith: [user.id] })
            const todo = await newTodo.save()

            const response = await request(app)
                .get(`/api/todo/${todo.id}`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(200)
            expect(response.body.description).toBe(todo.description)
        })
    })

    describe('DELETE', () => {
        it('respond with valid HTTP status code and destroy todo', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({ userId: user.id })
            const todo = await newTodo.save()

            const response = await request(app)
                .delete(`/api/todo/${todo.id}`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(200)
            expect(await Todo.find()).toHaveLength(0)
        })

        it('respond with invalid HTTP status code if user doesnt have access to todo', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory()
            const todo = await newTodo.save()

            const response = await request(app)
                .delete(`/api/todo/${todo.id}`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(200)
            expect(await Todo.find()).toHaveLength(1)
        })
    })

    describe('PUT', () => {
        it('respond with valid HTTP status code and update todo', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const starterTodo = {
                title: faker.location.city(),
                description: faker.location.city(),
                isDone: false,
                userId: user.id
            }
            const todo = new Todo(starterTodo)
            const savedTodo = await todo.save()

            expect(await Todo.find()).toHaveLength(1)

            const newDescription = faker.internet.userName()

            const response = await request(app)
                .put(`/api/todo`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

                .send({
                    id: savedTodo.id,
                    description: newDescription
                })

            expect(response.status).toBe(200)
            const todoAfterUpdate = await Todo.findById(savedTodo.id)
            expect(todoAfterUpdate.description).toBe(newDescription)
        })
    })
})
