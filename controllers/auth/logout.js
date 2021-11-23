const { User } = require('../../model')
const logout = async (req, res, next) => {
  try {
    const { _id } = req.user
    if (!_id) {
      return res.status(401).json({
        message: 'Not authorized',
      })
    }
    await User.findByIdAndUpdate(_id, { token: null })
    res.status(204).json()
  } catch (error) {
    next(error)
  }
}
module.exports = logout
