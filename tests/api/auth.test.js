import request from 'supertest'
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker'
import app from '../../src/api/index'
import User from '../../src/models/User'
import { clearModelCollection } from '../helper/dbHelper'

const UserFactory = require('../factories/user')

describe('POST auth/sign_in', () => {
    beforeEach(async () => {
        await clearModelCollection(User)
    })

    afterAll(async () => {
        await clearModelCollection(User)
    })

    describe('with valid sign in params', () => {
        const params = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        it('responds with valid HTTP status code and sign in user', async () => {
            const newUser = new UserFactory({
                username: params.username,
                password: params.password
            })

            await newUser.save()

            const response = await request(app)
                .post('/auth/sign_in')
                .send(params)

            expect(response.status).toBe(200)
            expect(response.body.success).toEqual('Authenticated')
        })
    })

    describe("when user hasn't found", () => {
        const params = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        it("responds with 401 error if user wasn't found", async () => {
            const response = await request(app)
                .post('/auth/sign_in')
                .send(params)

            expect(response.status).toBe(401)
            expect(response.body.message).toEqual('Unauthorized')
        })
    })

    describe('with invalid password', () => {
        const params = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        it('responds with 401 error', async () => {
            const newUser = new UserFactory({ username: params.username })
            await newUser.save()

            const response = await request(app)
                .post('/auth/sign_in')
                .send(params)

            expect(response.status).toBe(401)
            expect(response.body.message).toEqual('Unauthorized')
        })
    })
})

describe('POST auth/sign_up', () => {
    beforeEach(async () => {
        await clearModelCollection(User)
    })

    afterAll(async () => {
        await clearModelCollection(User)
    })

    describe('with valid params', () => {
        const params = {
            username: faker.internet.userName(),
            password: faker.internet.password(),
            email: faker.internet.email()
        }

        it('respond with valid HTTP status code and creates new user', async () => {
            const response = await request(app)
                .post('/auth/sign_up')
                .send(params)

            expect(response.status).toBe(200)
            expect(response.body).toEqual({ success: 'Account created' })
            expect(await User.find()).toHaveLength(1)
        })
    })

    describe('with invalid params', () => {
        const invalidSignUpParams = {
            username: faker.internet.userName(),
            password: 'a',
            email: 'asd'
        }

        it('respond with invalid HTTP status code and returns validation error', async () => {
            const response = await request(app)
                .post('/auth/sign_up')
                .send(invalidSignUpParams)

            expect(response.status).toBe(422)
        })
    })
})
