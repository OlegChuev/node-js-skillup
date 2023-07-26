const { defineAbilityFor } = require('../shared/abilityHelper/abilities')

const verifyAbility = (req, _res, next) => {
    req.ability = defineAbilityFor(req.user)

    next()
}

module.exports = verifyAbility
