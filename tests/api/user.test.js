import request from 'supertest'
import app from '../../src/api/index'
import { generateAccessToken } from '../../src/shared/jwtHelper'

describe('/api/user', () => {
    describe('GET /', () => {
        it('respond with valid HTTP status code and lists all users', async () => {
            const response = await request(app)
                .get('/api/users')
                .set(
                    'Authorization',
                    `Bearer ${generateAccessToken({ user: 'currentUser' })}`
                )

            expect(response.status).toBe(200)
        })
    })
})
