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
                context: faker.location.city(),
                isDone: true,
                location: {
                    coordinates: [-92.66159, 47.90767]
                }
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

            const userPrivateTodo = new TodoFactory({
                userId: user.id,
                isPrivate: true
            })
            const todo1 = await userPrivateTodo.save()

            const sharedWithUserTodo = new TodoFactory({
                sharedWith: [user.id]
            })
            await sharedWithUserTodo.save()

            const otherUserTodo = new TodoFactory()
            await otherUserTodo.save()

            const sharedWithUserPrivateTodo = new TodoFactory({
                sharedWith: [user.id],
                isPrivate: true
            })
            await sharedWithUserPrivateTodo.save()

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

            const newTodo = new TodoFactory({
                userId: user.id,
                isPrivate: true
            })
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

        it("return error if todo doesn't belong to user", async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory()
            const todo = await newTodo.save()

            const response = await request(app)
                .get(`/api/todo/${todo.id}`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(404)
        })

        it('return error if shared todo is private', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({
                sharedWith: [user.id],
                isPrivate: true
            })
            const todo = await newTodo.save()

            const response = await request(app)
                .get(`/api/todo/${todo.id}`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)

            expect(response.status).toBe(404)
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

            expect(response.status).toBe(404)
            expect(await Todo.find()).toHaveLength(1)
        })
    })

    describe('PUT /', () => {
        it('update todo by id', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({
                userId: user.id,
                isPrivate: false,
                isDone: true
            })
            const todo = await newTodo.save()

            const newDescription = faker.internet.userName()

            const response = await request(app)
                .put(`/api/todo`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({
                    id: todo.id,
                    description: newDescription,
                    context: newDescription,
                    title: newDescription,
                    location: {
                        coordinates: [1, 1]
                    },
                    isDone: false,
                    isPrivate: true
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

        it("return error if todo doesn't belong to user", async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({ userId: todoOwner.id })
            const todo = await newTodo.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const newDescription = faker.internet.userName()

            const response = await request(app)
                .put(`/api/todo/`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({
                    id: todo.id,
                    description: newDescription
                })

            expect(response.status).toBe(404)
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

            expect(response.status).toBe(404)

            const todoAfterSharing = await Todo.findById(todo.id)
            expect(todoAfterSharing.sharedWith).toEqual([])
        })

        it('return error if user tries to share todo with his account', async () => {
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
                .send({ email: todoOwner.email })

            expect(response.status).toBe(403)
            const todoAfterSharing = await Todo.findById(todo.id)
            expect(todoAfterSharing.sharedWith).toEqual([])
        })

        it("return error if todo doesn't belong to user", async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({ userId: todoOwner.id })
            const todo = await newTodo.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/share`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({ email: faker.internet.email() })

            expect(response.status).toBe(404)
        })

        it('return error if todo is private', async () => {
            const newOwner = new UserFactory()
            const owner = await newOwner.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({
                userId: owner.id,
                isPrivate: true
            })
            const todo = await newTodo.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/share`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: owner })}`
                )
                .send({ email: user.email })

            expect(response.status).toBe(403)
        })

        it('return error if user is trying to share todo that is shared with him', async () => {
            const newOwner = new UserFactory()
            const owner = await newOwner.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({
                userId: owner.id,
                sharedWith: [user.id]
            })
            const todo = await newTodo.save()

            const newUser2 = new UserFactory()
            const user2 = await newUser2.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/share`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({ email: user2.email })

            expect(response.status).toBe(403)
        })
    })

    describe('POST /:id/change_ownership', () => {
        it('change ownership to another user', async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({ userId: todoOwner.id })
            const todo = await newTodo.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/change_ownership`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: todoOwner })}`
                )
                .send({ email: user.email })

            expect(response.status).toBe(200)

            const todoAfterSharing = await Todo.findById(todo.id)
            expect(todoAfterSharing.userId).toEqual(user.id)
        })

        it("return error if another user doesn't exist", async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({ userId: todoOwner.id })
            const todo = await newTodo.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/change_ownership`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: todoOwner })}`
                )
                .send({ email: faker.internet.email() })

            expect(response.status).toBe(404)

            const todoAfterSharing = await Todo.findById(todo.id)
            expect(todoAfterSharing.userId).toEqual(todoOwner.id)
        })

        it("return error if user tries to change todo's ownership with his account", async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({ userId: todoOwner.id })
            const todo = await newTodo.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/change_ownership`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: todoOwner })}`
                )
                .send({ email: todoOwner.email })

            expect(response.status).toBe(403)
            const todoAfterSharing = await Todo.findById(todo.id)
            expect(todoAfterSharing.userId).toEqual(todoOwner.id)
        })

        it("return error if todo doesn't belong to user", async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({ userId: todoOwner.id })
            const todo = await newTodo.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/change_ownership`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({ email: faker.internet.email() })

            expect(response.status).toBe(404)
        })

        it('return error if todo is private', async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo = new TodoFactory({
                userId: todoOwner.id,
                isPrivate: true
            })
            const todo = await newTodo.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/change_ownership`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({ email: user.email })

            expect(response.status).toBe(403)
        })

        it('return erorr if user is trying to share todo that is shared with him', async () => {
            const newOwner = new UserFactory()
            const owner = await newOwner.save()

            const newUser = new UserFactory()
            const user = await newUser.save()

            const newTodo = new TodoFactory({
                userId: owner.id,
                sharedWith: [user.id]
            })
            const todo = await newTodo.save()

            const newUser2 = new UserFactory()
            const user2 = await newUser2.save()

            const response = await request(app)
                .post(`/api/todo/${todo.id}/change_ownership`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({ email: user2.email })

            expect(response.status).toBe(403)
        })
    })

    describe('POST /search_by_text', () => {
        it('return founded todos', async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const searchQuery = 'test'

            const newTodo1 = new TodoFactory({
                title: 'test abc def',
                sharedWith: [todoOwner.id]
            })
            await newTodo1.save()

            const newTodo2 = new TodoFactory({
                context: 'abc test def',
                userId: todoOwner.id
            })
            await newTodo2.save()

            const newTodo3 = new TodoFactory({ sharedWith: [todoOwner.id] })
            await newTodo3.save()

            const newTodo4 = new TodoFactory()
            await newTodo4.save()

            const response = await request(app)
                .post(`/api/todo/search_by_text`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: todoOwner })}`
                )
                .send({ search_by: searchQuery })

            expect(response.status).toBe(200)
            expect(response.body.result).toHaveLength(2)
        })

        it('return empty array if no todos were founded', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const searchQuery = 'test'

            const response = await request(app)
                .post(`/api/todo/search_by_text`)
                .set('Authorization', `Bearer ${generateAccessToken({ user })}`)
                .send({ search_by: searchQuery })

            expect(response.status).toBe(200)
            expect(response.body.result).toHaveLength(0)
        })

        it('return if search string is empty', async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const searchQuery = ' '

            const newTodo1 = new TodoFactory({
                title: 'test abc def',
                sharedWith: [todoOwner.id]
            })
            await newTodo1.save()

            const newTodo2 = new TodoFactory({
                context: 'abc test def',
                userId: todoOwner.id
            })
            await newTodo2.save()

            const newTodo3 = new TodoFactory({ sharedWith: [todoOwner.id] })
            await newTodo3.save()

            const newTodo4 = new TodoFactory()
            await newTodo4.save()

            const response = await request(app)
                .post(`/api/todo/search_by_text`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: todoOwner })}`
                )
                .send({ search_by: searchQuery })

            expect(response.status).toBe(200)
            expect(response.body.result).toHaveLength(0)
        })
    })

    describe('POST /search_in_radius', () => {
        it('returns founded todos', async () => {
            const newOwner = new UserFactory()
            const todoOwner = await newOwner.save()

            const newTodo1 = new TodoFactory({
                sharedWith: [todoOwner.id],
                isPrivate: false,
                coordinates: [-92.661399, 47.907629]
            })
            await newTodo1.save()

            const newTodo2 = new TodoFactory({
                userId: todoOwner.id,
                isPrivate: true,
                coordinates: [-92.66159, 47.90767]
            })
            await newTodo2.save()

            const newTodo3 = new TodoFactory({
                sharedWith: [todoOwner.id],
                isPrivate: true,
                coordinates: [-101.412439, 45.983499]
            })
            await newTodo3.save()

            const newTodo4 = new TodoFactory()
            await newTodo4.save()

            const body = {
                radius: 10,
                coordinates: [-92.661329, 47.907629]
            }

            const response = await request(app)
                .post(`/api/todo/search_in_radius`)
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: todoOwner })}`
                )
                .send(body)

            expect(response.status).toBe(200)
            expect(response.body.result).toHaveLength(2)
        })

        it('returns error if values are out of range', async () => {})
    })
})
