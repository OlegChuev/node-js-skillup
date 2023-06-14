import request from 'supertest'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import app from '../../api/index'
import User from '../../models/User'

describe('POST sign in endpoint', () => {
    beforeEach(() => {
        User.collection.drop()
    })

    describe('with valid sign in params', () => {
        const params = {
            username: faker.internet.userName,
            password: faker.internet.password
        }

        beforeEach(() => {
            new User({
                password: bcrypt.hash(params.password, 10),
                username: params.username
            }).save()
        })

        it('responds with valid HTTP status code and sign in user', async () => {
            const response = await request(app)
                .post('/auth/sign_in')
                .send(params)

            expect(response.status).toBe(200)
            expect(response.body).toEqual({ success: 'Authenticated' })
        })
    })

    describe("with invalid sign in params, user hasn't found", () => {
        const params = {
            username: faker.internet.userName,
            password: faker.internet.userName.password
        }

        it("responds with 401 error if user wasn't found", async () => {
            const response = await request(app)
                .post('/auth/sign_in')
                .send(params)

            expect(response.status).toBe(401)
            expect(response.body).toEqual({ error: 'Unauthenticated' })
        })
    })

    describe('with invalid password', () => {
        const params = {
            username: faker.internet.userName,
            password: faker.internet.userName.password
        }

        beforeEach(() => {
            new User({
                password: bcrypt.hash(faker.internet.userName.password, 10),
                username: params.username
            }).save()
        })

        it('responds with 401 error if user provided an incorrect password', async () => {
            const response = await request(app)
                .post('/auth/sign_in')
                .send(params)

            expect(response.status).toBe(401)
            expect(response.body).toEqual({ error: 'Unauthenticated' })
        })
    })
})

describe('POST sign up endpoint', () => {
    describe('with valid params', () => {
        const params = {
            username: faker.internet.userName,
            password: faker.internet.password
        }

        it('respond with valid HTTP status code and creates new user', async () => {
            const response = await request(app)
                .post('/auth/sign_up')
                .send(params)
            expect(response.status).toBe(200)

            expect(response.body).toEqual({ success: 'Account created' })
            expect(User.find()).toHaveLength(1)
        })
    })

    describe('with invalid params', () => {
        const invalidSignUpParams = {
            username: 'User',
            password: ''
        }

        it('respond with invalid HTTP status code and returns validation error', async () => {
            const response = await request(app)
                .post('/auth/sign_up')
                .send(invalidSignUpParams)
            expect(response.status).toBe(401)
        })
    })
})
