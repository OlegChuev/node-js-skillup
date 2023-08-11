// eslint-disable-next-line import/prefer-default-export
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
