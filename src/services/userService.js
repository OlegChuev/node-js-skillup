import ForbiddenError from '../errors/forbiddenError'
import NotAuthorizedError from '../errors/notAuthorizedError'

const bcrypt = require('bcryptjs')
const stripe = require('../../config/stripe')
const jwt = require('../shared/jwtHelper/index')
const userRepository = require('../repository/userRepository')

const { ENV } = require('../../config')

export const listAllUsers = async () => {
    const users = await userRepository.list(
        {},
        {
            id: true,
            email: true,
            username: true
        }
    )

    return users
}

export const signUpUser = async (params) => {
    const { username, password, email } = params

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await userRepository.create({
        username,
        password: hash,
        email
    })

    const stripeCustomer =
        ENV === 'test'
            ? { id: null }
            : await stripe.client.customers.create({
                  email,
                  name: newUser.username
              })

    await userRepository.update(
        { id: newUser.id },
        { stripe_customer_id: stripeCustomer.id }
    )

    return newUser
}

export const signInUser = async (params) => {
    const { username, password } = params

    const user = await userRepository.get({ username })

    if (!user) throw new NotAuthorizedError('Username or password is incorrect')

    const compareResult = bcrypt.compareSync(password, user.password)

    if (!compareResult)
        throw new NotAuthorizedError('Username or password is incorrect')

    if (user.is_blocked) throw new ForbiddenError('Your account was blocked')

    return {
        success: 'Authenticated',
        accessToken: jwt.generateAccessToken(user)
    }
}

export const getProfile = async (user) => {
    const userData = await userRepository.get(
        { id: user.id },
        {
            id: true,
            email: true,
            username: true,
            stripe_subscription_is_active: true
        }
    )

    return userData
}

export const blockUser = async (customerId) => {
    await userRepository.update(
        { stripe_customer_id: customerId },
        { is_blocked: true }
    )
}

export const setSubscriptionActivity = async (customerId) => {
    await userRepository.update(
        { stripe_customer_id: customerId },
        { stripe_subscription_is_active: true }
    )
}

export const setSubscriptionId = async (user, subscription) => {
    await userRepository.update(
        { id: user.id },
        { stripe_subscription_id: subscription.id }
    )
}
