const { User } = require('../../model')

const verify = async (req, res, next) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    return res.status(404).json({
      message: 'verify: Not found',
    })
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  })
  res.status(200).json({
    message: 'Verification successful',
  })
}

module.exports = verify
