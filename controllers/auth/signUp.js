const { User } = require('../../model')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { sendMail } = require('../../helpers')

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({ message: 'Email in use' })
    }

    const verificationToken = nanoid()
    const avatarURL = gravatar.url(email, { d: 'identicon' }, false)

    const newUser = new User({ email, avatarURL, verificationToken })
    newUser.setPassword(password)
    await newUser.save()

    // verification email sending:
    const mail = {
      to: email,
      subject: 'Signup confirmation',
      text: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm your registration</a>`,
    }
    await sendMail(mail)

    res.status(201).json({
      user: {
        email,
        subscription: 'starter',
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signUp
