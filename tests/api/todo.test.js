const request = require('supertest')
const app = require('../../api/index')

describe("GET todo's endpoint", () => {
    it('respond with valid HTTP status code and lists all todos', async () => {
        const response = await request(app).get('/api/todo')
        expect(response.status).toBe(200)

        // expect(response.body).toEqual(["Mars", "Moon", "Earth", "Mercury", "Venus", "Jupiter"]);
    })
})
