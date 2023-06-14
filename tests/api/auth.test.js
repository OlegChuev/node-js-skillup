import request from 'supertest'
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker'
import app from '../../api/index'
import User from '../../models/User'
import { clearModelCollection } from '../helper/dbHelper'

const bcrypt = require('bcryptjs')

describe('POST sign in endpoint', () => {
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
            const user = new User({
                password: bcrypt.hashSync(
                    params.password,
                    bcrypt.genSaltSync(10)
                ),
                username: params.username
            })
            await user.save()

            const response = await request(app)
                .post('/auth/sign_in')
                .send(params)

            expect(response.status).toBe(200)
            expect(response.body.success).toEqual('Authenticated')
        })
    })

    describe("with invalid sign in params, user hasn't found", () => {
        const params = {
            username: faker.internet.userName(),
            password: faker.internet.password()
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
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        beforeEach(() => {
            new User({
                password: bcrypt.hashSync(
                    faker.internet.password(),
                    bcrypt.genSaltSync(10)
                ),
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
    beforeEach(async () => {
        await clearModelCollection(User)
    })

    afterAll(async () => {
        await clearModelCollection(User)
    })

    describe('with valid params', () => {
        const params = {
            username: faker.internet.userName(),
            password: faker.internet.password()
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
            password: 'a'
        }

        it('respond with invalid HTTP status code and returns validation error', async () => {
            const response = await request(app)
                .post('/auth/sign_up')
                .send(invalidSignUpParams)

            expect(response.status).toBe(400)
        })
    })
})
