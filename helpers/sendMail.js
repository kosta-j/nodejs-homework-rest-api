const nodemailer = require('nodemailer')
const { GOOGLE_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: 'kostetych.test@gmail.com',
    pass: GOOGLE_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const email = {
  to: 'zhukov.konst.sl@gmail.com',
  from: 'kostetych.test@gmail.com',
  subject: 'Test - nodejs mailer',
  text: '<p>Test email message from nodejs mailer</p>',
}

const sendMail = async (data) => {
  const email = { ...data, from: 'kostetych.test@gmail.com' }
  await transporter.sendMail(email)
  return true
}

module.exports = sendMail
