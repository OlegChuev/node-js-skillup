import { StatusCodes } from 'http-status-codes'

const stripe = require('../../config/stripe')
const paymentService = require('../services/paymentService')

export const webhook = async (req, res, _next) => {
    let event

    try {
        const stripeSignature = req.headers['stripe-signature']

        event = stripe.client.webhooks.constructEvent(
            req.body,
            stripeSignature,
            stripe.cliKey
        )
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send({
            error: `Webhook Error: ${error.message}`
        })

        return
    }

    await paymentService.handleWebhookEvent(event)

    res.send()
}

export const createSubscription = async (req, res, next) => {
    try {
        const result = await paymentService.createSubscription(
            req.user,
            req.body
        )

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
