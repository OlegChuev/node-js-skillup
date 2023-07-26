const { AbilityBuilder, Ability } = require('@casl/ability')

function defineOwnerRules({ can }, user) {
    can(['read', 'delete', 'update'], 'Todo', {
        userId: user.id
    })

    can(['share', 'changeOwnership'], 'Todo', {
        userId: user.id,
        isPrivate: false
    })
}

function defineSharedRules({ can }, user) {
    can('read', 'Todo', {
        sharedWith: { $in: [user.id] },
        isPrivate: false
    })

    can(
        'update',
        'Todo',
        ['title', 'context', 'description', 'isDone', 'location'],
        {
            sharedWith: { $in: [user.id] },
            isPrivate: false
        }
    )
}

function defineRulesFor(user) {
    const builder = new AbilityBuilder(Ability)

    defineOwnerRules(builder, user)
    defineSharedRules(builder, user)

    return builder.rules
}

function defineAbilityFor(user) {
    return new Ability(defineRulesFor(user))
}

module.exports = {
    defineRulesFor,
    defineAbilityFor
}
