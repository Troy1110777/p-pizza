const nodemailer = require('nodemailer')


var transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
    }
})

module.exports = transporter;