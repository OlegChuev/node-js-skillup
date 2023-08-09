const userService = require('./userService')

const stripe = require('../../config/stripe')

export const handleWebhookEvent = async (event) => {
    switch (event.type) {
        case 'invoice.payment_failed': {
            const invoicePaymentFailed = event.data.object
            await userService.blockUser(invoicePaymentFailed.customer)

            break
        }
        case 'payment_intent.succeeded': {
            const paymentIntentSucceeded = event.data.object
            await userService.setSubscriptionActivity(
                paymentIntentSucceeded.customer
            )

            break
        }
        default:
    }
}

export const createSubscription = async (user, params) => {
    const { priceId } = params

    const subscriptionId = user.stripe_subscription_id
    let subscription

    if (subscriptionId) {
        subscription = await stripe.client.subscriptions.retrieve(
            subscriptionId,
            {
                expand: ['latest_invoice.payment_intent']
            }
        )
    } else {
        subscription = await stripe.client.subscriptions.create({
            customer: user.stripe_customer_id,
            items: [
                {
                    price: priceId
                }
            ],
            payment_behavior: 'default_incomplete',
            payment_settings: {
                save_default_payment_method: 'on_subscription'
            },
            expand: ['latest_invoice.payment_intent']
        })
    }

    if (!subscriptionId) await userService.setSubscriptionId(user, subscription)

    return {
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret
    }
}
