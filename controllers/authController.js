import User from '../models/User'

const bcrypt = require('bcryptjs')

export const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(401).json({ error: 'Unauthenticated' })

        const compareResult = bcrypt.compareSync(
            req.body.password,
            user.password || ''
        )

        if (compareResult) {
            res.status(200).json({ success: 'Authenticated' })
        } else {
            res.status(401).json({ error: 'Unauthenticated' })
        }
    } catch (error) {
        res.status(401).json({ error: error.message })
    }

    // Callback Hell ?
    //
    // User.findOne({ username: req.body.username })
    //     .then((user) => {
    //         bcrypt.compare(req.body.password, user?.password || '').then((compareRes) => {
    //           if (compareRes) {
    //             res.status(200).json({ success: 'Authenticated' })
    //           }
    //           else {
    //             res.status(401).json({ error: 'Unauthenticated' })
    //           }
    //         }).catch((error) => {
    //           res.status(404).json({ error: error.message })
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(404).json({ error: error.message })
    //     })
}

export const signUp = async (req, res) => {
    try {
        const passwordHash = bcrypt.hashSync(
            req.body.password,
            bcrypt.genSaltSync(10)
        )

        const newUser = new User({
            password: passwordHash,
            username: req.body.username
        })

        await newUser.save()

        res.status(200).json({ success: 'Account created' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

    // bcrypt.genSalt(10, function (err, salt) {
    //     bcrypt.hash(req.body.password, salt, function (err, hash) {
    //         const newUser = new User({
    //             password: passwordHash,
    //             username: req.body.username
    //         })
    //         newUser
    //             .save()
    //             .then(() => {
    //                 res.status(200).json({ success: 'Account created' })
    //             })
    //             .catch((error) => {
    //                 res.status(404).json({ error: error.message })
    //             })
    //     })
    // })
}

export const signOut = (req, res) => {}
