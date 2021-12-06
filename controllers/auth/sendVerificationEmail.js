const { User } = require('../../model')
const { sendMail } = require('../../helpers')

const sendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({
        message: 'missing required field email',
      })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        message: 'Not found',
      })
    }
    if (user.verify) {
      return res.status(400).json({
        message: 'Verification has already been passed',
      })
    }

    // verification email sending:
    const mail = {
      to: email,
      subject: 'Signup confirmation',
      text: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to confirm your registration</a>`,
    }
    await sendMail(mail)

    res.status(200).json({
      message: 'Verification email sent',
    })
  } catch (error) {
    next(error)
  }
}
module.exports = sendVerificationEmail
