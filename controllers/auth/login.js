const jwt = require('jsonwebtoken')
const { User } = require('../../model')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(401).json({
      message: 'Email or password is wrong',
    })
  }
  if (!user || !user.comparePassword(password)) {
    res.status(401).json({
      message: 'Email or password is wrong',
    })
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  res.status(200).json({
    token,
    user: {
      email,
      // subscription: 'starter',
    },
  })
}

module.exports = login