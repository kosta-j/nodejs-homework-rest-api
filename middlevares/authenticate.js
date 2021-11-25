const jwt = require('jsonwebtoken')
const { User } = require('../model')
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: 'Not authorized',
      })
    }
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      return res.status(401).json({
        message: 'Email or password is wrong',
      })
    }
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user || !user.token) {
      return res.status(401).json({
        message: 'Not authorized',
      })
    }
    req.user = user
    next()
  } catch (error) {
    error.status = 401
    error.message = 'Not authorized'
    next(error)
  }
}

module.exports = authenticate
