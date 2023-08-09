import request from 'supertest'
import app from '../../src/api/index'
import User from '../../src/models/User'

import { generateAccessToken } from '../../src/shared/jwtHelper'
import { clearModelCollectionPsql, closeConnections } from '../helper/dbHelper'

const UserFactory = require('../factories/user')

afterAll(async () => {
    await clearModelCollectionPsql(User)
    await closeConnections()
})

describe('/api/user', () => {
    describe('GET /', () => {
        it('respond with valid HTTP status code and lists all users', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const response = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${generateAccessToken(user)}`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveLength(1)
        })
    })
})
