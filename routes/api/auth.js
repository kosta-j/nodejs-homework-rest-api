const express = require('express')

const router = express.Router()
const { validation, authenticate } = require('../../middlevares')
const { usersJoiSchema } = require('../../validations')
const { signUp, login, logout, current } = require('../../controllers/auth')

router.post('/signup', validation(usersJoiSchema), signUp)
router.post('/login', validation(usersJoiSchema), login)
router.post('/logout', authenticate, logout)
router.get('/current', authenticate, current)

module.exports = router
