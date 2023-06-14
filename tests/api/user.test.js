import request from 'supertest'
import app from '../../api/index'
import { generateAccessToken } from '../../modules/jwt/index'

describe("GET user's endpoint", () => {
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
