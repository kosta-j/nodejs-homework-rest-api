const nodemailer = require('nodemailer')
const { GOOGLE_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secureConnection: true,
  auth: {
    user: 'kostetych.test@gmail.com',
    pass: GOOGLE_PASSWORD,
  },
  tls: {
    secureProtocol: 'TLSv1_method',
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async (data) => {
  const email = { ...data, from: 'kostetych.test@gmail.com' }
  await transporter.sendMail(email)
  return true
}

module.exports = sendMail
