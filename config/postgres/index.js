// eslint-disable-next-line import/no-extraneous-dependencies
const { PrismaClient } = require('@prisma/client')

// eslint-disable-next-line import/prefer-default-export
export const prisma = new PrismaClient({
    log: ['info', 'warn', 'error']
})
