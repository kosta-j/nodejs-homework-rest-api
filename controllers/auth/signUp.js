const { User } = require('../../model')
const gravatar = require('gravatar')

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({ message: 'Email in use' })
    }
    const avatarURL = gravatar.url(email, { d: 'identicon' })
    const newUser = new User({ email, avatarURL })
    newUser.setPassword(password)
    await newUser.save()
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
