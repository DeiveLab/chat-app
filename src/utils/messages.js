const moment = require('moment')

const generateMessage = (username, text) => {
    return {
        text,
        username,
        createdAt: moment().format('kk:mm')
    }
}

module.exports = {
    generateMessage
}