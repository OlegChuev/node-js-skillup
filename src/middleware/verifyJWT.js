const jwtHelper = require('../shared/jwtHelper/index')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: jwtHelper.UNAUTHENTICATED })

    const token = authHeader.split(' ')[1];

    jwtHelper.verifyAccessToken(token, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: jwtHelper.FORBIDDEN })

        req.userId = decoded.user._id;
        next()
  })
}

module.exports = verifyJWT