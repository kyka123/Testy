const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3',
    },
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
})
exports.transporter = transporter
