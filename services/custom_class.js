// Practice of code inheritance

const EventEmitter = require('events')
const util = require('util')

class CustomClass {
    constructor() {}
}

util.inherits(CustomClass, EventEmitter)

CustomClass.prototype.notifyAbout = function (action) {
    this.emit('dbInteraction', action)
}

export default CustomClass
