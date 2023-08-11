import express from 'express'
import http from 'http'
import WebSocket from 'ws'
import logger from '../../config/winston'
import { verifyAccessToken } from '../shared/jwtHelper/index'
import { dispatchEvent } from '../middleware/wsMessageHandler'
import { WS_PORT, HOST, ENV } from '../../config'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const wsClients = {}

wss.on('connection', (ws, req) => {
    const url = new URL(`${HOST}${req.url}`)
    const token = url.searchParams.get('token')

    verifyAccessToken(token, async (err, decoded) => {
        if (err) {
            ws.send('Error: Your token is no longer valid.')
            ws.close()
        } else {
            wsClients[decoded.id] = ws
        }
    })

    ws.on('message', (message) => {
        dispatchEvent(wss, ws, message)
    })

    ws.on('error', (error) => ws.send(error))

    ws.send('Hi there, I am a WebSocket server')
})

wss.broadcastToUser = async (userId, data) => {
    const ws = wsClients[userId]

    if (ws) ws.send(data)
}

if (ENV !== 'test') {
    server.listen(WS_PORT, () =>
        logger.info(`WebSocket Server started on port ${WS_PORT}`)
    )
}

export default wss
