const { accessibleBy } = require('@casl/mongoose')
const { defineAbilityFor } = require('../shared/abilityHelper/abilities')

const todoRepository = require('../repository/todoRepository')
const userRepository = require('../repository/userRepository')

// eslint-disable-next-line import/prefer-default-export
export const userCanConnectToRoom = async (userId, todoRoom) => {
    const user = await userRepository.get({ id: userId })
    const ability = defineAbilityFor(user)
    const todoId = todoRoom?.split('todo-')[1]

    const todo = await todoRepository.get({
        $and: [
          accessibleBy(ability).Todo,
          { _id: todoId }
        ]
    })

    return !!todo
}
