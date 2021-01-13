const moment = require('moment-timezone')

const generateMessage = (username, text) => {
    return {
        text,
        username,
        createdAt: moment().tz("America/Sao_Paulo").format('kk:mm')
    }
}

module.exports = {
    generateMessage
}