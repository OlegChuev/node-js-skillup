// eslint-disable-next-line import/no-import-module-exports
import PaymentRequiredError from '../errors/paymentRequiredError'

const defaultTrialPeriodDays = 7

const verifySubscription = (req, _res, next) => {
    const currentUser = req.user
    if (currentUser.stripe_subscription_is_active) {
        return next()
    }

    const trialEndDate = req.user.createdAt
    trialEndDate.setDate(trialEndDate.getDate() + defaultTrialPeriodDays)
    const currentDate = new Date()

    if (
        !currentUser.stripe_subscription_is_active &&
        currentDate < trialEndDate
    ) {
        return next()
    }

    throw new PaymentRequiredError('Subscribe to continue using application')
}

module.exports = verifySubscription
