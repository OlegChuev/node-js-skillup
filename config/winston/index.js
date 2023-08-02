const winston = require('winston')

const { LOG_LEVEL, NODE_ENV } = process.env

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const transports = [
    new winston.transports.File({
        filename: 'log/error.log',
        level: 'error'
    }),
    new winston.transports.File({ filename: 'log/all.log' })
]

const logger = winston.createLogger({
    level: LOG_LEVEL || 'debug',
    format,
    transports
})

if (NODE_ENV !== 'test') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    )
}

export default logger
