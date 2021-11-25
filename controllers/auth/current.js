const { User } = require('../../model')

const current = async (req, res, next) => {
  try {
    const { _id } = req.user
    const user = await User.findById(_id)
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current
