import request from 'supertest'
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker'
import app from '../../src/api/index'

import Comment from '../../src/models/Comment'
import User from '../../src/models/User'

import { clearModelCollectionPsql, closeConnections } from '../helper/dbHelper'
import { generateAccessToken } from '../../src/shared/jwtHelper'

const UserFactory = require('../factories/user')
const CommentFactory = require('../factories/comment')

afterAll(async () => {
    await closeConnections()
})

describe('POST /', () => {
    beforeEach(async () => {
        await clearModelCollectionPsql(Comment)
        await clearModelCollectionPsql(User)
    })

    afterAll(async () => {
        await clearModelCollectionPsql(Comment)
        await clearModelCollectionPsql(User)
    })

    describe('with valid params', () => {
        const params = {
            todoId: faker.animal.bear(),
            text: faker.animal.bear()
        }

        it('creates new comment', async () => {
            const newUser = new UserFactory()
            const user = await newUser.save()

            const response = await request(app)
                .post('/api/comments')
                .set('Authorization', `Bearer ${generateAccessToken(user)}`)
                .send(params)

            expect(response.status).toBe(200)
            const comment = await Comment.findMany({})

            expect(comment).toHaveLength(1)
            expect(comment[0].user_id).toBe(user.id)
            expect(comment[0].todo_id).toBe(params.todoId)
            expect(comment[0].text).toBe(params.text)
        })
    })
})

describe('GET /:ID', () => {
    beforeEach(async () => {
        await clearModelCollectionPsql(Comment)
        await clearModelCollectionPsql(User)
    })

    afterAll(async () => {
        await clearModelCollectionPsql(Comment)
        await clearModelCollectionPsql(User)
    })

    describe('with valid params', () => {
        it('returns all related comments', async () => {
            const todoId = 'a12'

            const newUser = new UserFactory()
            const user = await newUser.save()

            const newComment1 = new CommentFactory()
            await newComment1.save()

            const newComment2 = new CommentFactory({ todoId })
            await newComment2.save()

            const response = await request(app)
                .get(`/api/comments/${todoId}`)
                .set('Authorization', `Bearer ${generateAccessToken(user)}`)

            expect(response.status).toBe(200)

            expect(response.body.result).toHaveLength(1)
        })
    })
})
