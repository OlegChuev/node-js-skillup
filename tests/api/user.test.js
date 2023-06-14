const request = require('supertest')
const app = require('../../api/index')

describe("GET user's endpoint", () => {
    it('respond with valid HTTP status code and lists all users', async () => {
        const response = await request(app).get('/api/users')
        expect(response.status).toBe(200)
    })
})
