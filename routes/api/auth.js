const express = require('express')

const router = express.Router()
const { validation, authenticate } = require('../../middlevares')
const { usersJoiSchema } = require('../../validations')
const { signUp, login, logout } = require('../../controllers/auth')

router.post('/signup', validation(usersJoiSchema), signUp)
router.post('/login', validation(usersJoiSchema), login)
router.post('/logout', authenticate, logout)

module.exports = router
