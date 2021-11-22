const jwt = require('jsonwebtoken')
const { User } = require('../model')
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      return res.status(401).json({
        message: 'Email or password is wrong',
      })
    }
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id, '_id email')
    if (!user) {
      return res.status(401).json({
        message: 'Not authorized',
      })
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
  //   next()
}

module.exports = authenticate
