const { User } = require('../../model')
const logout = async (req, res, next) => {
  const { _id } = req.user
  if (!_id) {
    return res.this.status(401).json({
      message: 'Not authorized',
    })
  }
  try {
    await User.findByIdAndUpdate(_id, { token: null })
    res.status(204).json()
  } catch (error) {
    next(error)
  }
}
module.exports = logout
