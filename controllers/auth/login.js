const jwt = require('jsonwebtoken')
const { User } = require('../../model')
const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      })
    }
    if (!user.verify) {
      return res.status(401).json({
        message: 'Not verified. Please check your email',
      })
    }

    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await User.findByIdAndUpdate(user._id, { token })
    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
