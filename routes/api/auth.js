const express = require('express')

const router = express.Router()
const { validation, authenticate, upload } = require('../../middlevares')
const { usersJoiSchema } = require('../../validations')
const {
  signUp,
  login,
  logout,
  current,
  updateAvatar,
  verify,
} = require('../../controllers/auth')

router.post('/signup', validation(usersJoiSchema), signUp)
router.post('/login', validation(usersJoiSchema), login)
router.post('/logout', authenticate, logout)
router.get('/current', authenticate, current)
router.patch('/avatars', authenticate, upload.single('image'), updateAvatar)
router.get('/verify/:verificationToken', verify)

module.exports = router
