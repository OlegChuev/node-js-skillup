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

    describe('POST /', () => {
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

    describe('GET /', () => {
        it('return all todos', async () => {
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
        it('return todo by id', async () => {
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

        it('return shared todo by id', async () => {
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

    describe('DELETE /:ID', () => {
        it('destroy todo by id', async () => {
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

        it('destroy shared todo by id', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({ sharedWith: [user.id] })
            const todo = await newTodo.save()

            const response = await request(app)
                .delete(`/api/todo/${todo.id}`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(200)
            expect(await Todo.find()).toHaveLength(0)
        })

        it("return error and doesn't destroy todo since user doesn't have access", async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory()
            const todo = await newTodo.save()

            const response = await request(app)
                .delete(`/api/todo/${todo.id}`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(401)
            expect(await Todo.find()).toHaveLength(1)
        })
    })

    describe('PUT /', () => {
        it('update todo by id', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({ userId: user.id })
            const todo = await newTodo.save()

            const newDescription = faker.internet.userName()

            const response = await request(app)
                .put(`/api/todo`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({
                    id: todo.id,
                    description: newDescription
                })

            expect(response.status).toBe(200)
            const todoAfterUpdate = await Todo.findById(todo.id)
            expect(todoAfterUpdate.description).toBe(newDescription)
        })

        it('update shared todo by id', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({ sharedWith: [user.id] })
            const todo = await newTodo.save()

            const newDescription = faker.internet.userName()

            const response = await request(app)
                .put(`/api/todo`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({
                    id: todo.id,
                    description: newDescription
                })

            expect(response.status).toBe(200)
            const todoAfterUpdate = await Todo.findById(todo.id)
            expect(todoAfterUpdate.description).toBe(newDescription)
        })
    })

    describe('POST /:id/share', () => {
        it('share todo to another user', async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({ userId: todoOwner.id })
            const todo = await newTodo.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/share`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: todoOwner })}`
                )
                .send({ email: user.email })

            expect(response.status).toBe(200)

            const todoAfterSharing = await Todo.findById(todo.id)
            expect(todoAfterSharing.sharedWith).toEqual([user.id])
        })

        it("return error if another user doesn't exist", async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({ userId: todoOwner.id })
            const todo = await newTodo.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/share`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: todoOwner })}`
                )
                .send({ email: faker.internet.email() })

            expect(response.status).toBe(401)

            const todoAfterSharing = await Todo.findById(todo.id)
            expect(todoAfterSharing.sharedWith).toEqual([])
        })
    })
})
