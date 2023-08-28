import { userCanConnectToRoom } from '../services/wsService'

export const dispatchEvent = (wss, ws, message) => {
    const json = JSON.parse(message)

    switch (json.event) {
        case 'ping':
            wss.clients.forEach((client) => client.send(message))
            break
        default:
            ws.send(new Error('Invalid request').message)
            break
    }
}

export const roomHandler = async (ws, wsRooms, userId, room) => {
    const result = await userCanConnectToRoom(userId, room)

    if (result) {
        if (!wsRooms[room]) wsRooms[room] = []
        wsRooms[room].push(ws)

        ws.send(`Successfully connected to the ${room} room.`)
    } else {
        ws.send(new Error('You cannot access to this room.').message)
        ws.close()
    }
}
