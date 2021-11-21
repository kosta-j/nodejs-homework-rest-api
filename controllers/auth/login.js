const { User } = require('../../model')

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
}

module.exports = login
