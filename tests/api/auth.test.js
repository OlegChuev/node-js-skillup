const request = require('supertest')
const app = require('../../api/index')

describe('POST sign in endpoint', () => {
    describe('with valid sign in params', () => {
        const params = {
            username: 'User',
            password: 'Password'
        }

        it('responds with valid HTTP status code and sign in user', async () => {
            const response = await request(app)
                .post('/auth/sign_in')
                .send(params)

            expect(response.status).toBe(200)
            expect(response.body).toEqual({ success: 'Authenticated' })

            // expect(response.body).toEqual(["Mars", "Moon", "Earth", "Mercury", "Venus", "Jupiter"]);
        })
    })

    describe("with invalid sign in params, user hasn't found", () => {
        const params = {
            username: 'User',
            password: 'Password'
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
            username: 'User',
            password: 'Password'
        }

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
            username: 'User',
            password: 'Password'
        }

        it('respond with valid HTTP status code and creates new user', async () => {
            const response = await request(app)
                .post('/auth/sign_up')
                .send(params)
            expect(response.status).toBe(200)

            expect(response.body).toEqual({ success: 'Account created' })
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

            // expect(response.body).toEqual({ error: 'Account created' })
        })
    })
})

app.close()
