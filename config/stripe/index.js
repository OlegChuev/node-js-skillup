const Stripe = require('stripe')

const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_KEY } = process.env

const stripe = Stripe(STRIPE_SECRET_KEY)

export const client = stripe

export const cliKey = STRIPE_WEBHOOK_KEY
