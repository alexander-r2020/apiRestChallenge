const sgMail = require('@sendgrid/mail')

const API_KEY_SEND= process.env.API_KEY_SEND

sgMail.setApiKey(API_KEY_SEND)

module.exports = sgMail