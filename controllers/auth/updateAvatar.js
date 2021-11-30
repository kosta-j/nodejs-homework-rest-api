const fs = require('fs/promises')
const jimp = require('jimp')
const path = require('path')
const { User } = require('../../model')

const updateAvatar = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Not authorized',
    })
  }
  if (!req.file) {
    return res.status(404).json({
      message: 'Not found',
    })
  }

  const { _id } = req.user
  const { path: tempPath, originalname } = req.file

  try {
    // replacing original image name with _id:
    const newName = originalname.replace(
      originalname.substr(0, originalname.lastIndexOf('.')),
      _id
    )
    const avatarsPath = path.join(
      __dirname,
      '../../',
      'public/avatars',
      newName
    )
    // resize image:
    const initialImage = await jimp.read(tempPath)
    await initialImage.resize(250, 250).write(tempPath)
    // move image:
    await fs.rename(tempPath, avatarsPath)
    // update avatarURL in DB:
    const relatedPath = `/avatars/${newName}`
    await User.findByIdAndUpdate(_id, { avatarURL: relatedPath })

    res.status(200).json({
      avatarURL: relatedPath,
    })
  } catch (error) {
    await fs.unlink(tempPath)
    next(error)
  }
}

module.exports = updateAvatar
