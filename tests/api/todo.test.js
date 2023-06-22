import request from 'supertest'
import { faker } from '@faker-js/faker'
import app from '../../src/api/index'
import Todo from '../../src/models/Todo'
import { clearModelCollection } from '../helper/dbHelper'
import { generateAccessToken } from '../../src/shared/jwtHelper'

describe('api/todo', () => {
    beforeEach(async () => {
        await clearModelCollection(Todo)
    })

    afterAll(async () => {
        await clearModelCollection(Todo)
    })

    describe('POST', () => {
        it('respond with valid HTTP status code and create todo', async () => {
            const params = {
                title: faker.location.city(),
                description: faker.location.city(),
                username: faker.internet.userName(),
                isDone: true
            }

            const response = await request(app)
                .post('/api/todo')
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: 'currentUser' })}`
                )
                .send(params)

            expect(response.status).toBe(200)
            expect(await Todo.find()).toHaveLength(1)
        })
    })

    describe('GET all', () => {
        it('respond with valid HTTP status code and lists all todos', async () => {
            const starterTodos = [
                {
                    title: faker.location.city(),
                    description: faker.location.city(),
                    isDone: false,
                    username: faker.internet.userName()
                }
            ]

            await Todo.insertMany(starterTodos)

            const response = await request(app)
                .get('/api/todos')
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: 'currentUser' })}`
                )

            expect(response.status).toBe(200)
            expect(response.body).toHaveLength(1)
            expect(response.body[0].description).toBe(
                starterTodos[0].description
            )
        })
    })

    describe('GET /:ID', () => {
        it('respond with valid HTTP status code and return todo by id', async () => {
            const starterTodo = {
                title: faker.location.city(),
                description: faker.location.city(),
                isDone: false,
                username: faker.internet.userName()
            }
            const todo = new Todo(starterTodo)
            const savedTodo = await todo.save()

            const response = await request(app)
                .get(`/api/todo/${savedTodo.id}`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: 'currentUser' })}`
                )

            expect(response.status).toBe(200)
            expect(response.body.description).toBe(starterTodo.description)
        })
    })

    describe('DELETE', () => {
        it('respond with valid HTTP status code and destroy todo', async () => {
            const starterTodo = {
                title: faker.location.city(),
                description: faker.location.city(),
                isDone: false,
                username: faker.internet.userName()
            }
            const todo = new Todo(starterTodo)
            const savedTodo = await todo.save()

            expect(await Todo.find()).toHaveLength(1)

            const response = await request(app)
                .delete(`/api/todo/${savedTodo.id}`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: 'currentUser' })}`
                )

            expect(response.status).toBe(200)
            expect(await Todo.find()).toHaveLength(0)
        })
    })

    describe('PUT', () => {
        it('respond with valid HTTP status code and update todo', async () => {
            const starterTodo = {
                title: faker.location.city(),
                description: faker.location.city(),
                isDone: false,
                username: faker.internet.userName()
            }
            const todo = new Todo(starterTodo)
            const savedTodo = await todo.save()

            expect(await Todo.find()).toHaveLength(1)

            const newDescription = faker.internet.userName()

            const response = await request(app)
                .put(`/api/todo`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: 'currentUser' })}`
                )
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
