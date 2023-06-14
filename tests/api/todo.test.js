import request from 'supertest'
import { faker } from '@faker-js/faker'
import app from '../../api/index'
import Todo from '../../models/Todo'
import { clearModelCollection } from '../helper/dbHelper'
import { generateAccessToken } from '../../modules/jwt/index'

describe("GET todo's endpoint", () => {
    beforeEach(() => {
        clearModelCollection(Todo)
    })

    afterAll(() => {
        clearModelCollection(Todo)
    })

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
        expect(response.body[0].description).toBe(starterTodos[0].description)
    })

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

    // it('respond with valid HTTP status code and update todo', async () => {})
})
