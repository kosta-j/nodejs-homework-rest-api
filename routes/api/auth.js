const express = require('express')

const router = express.Router()
const { validation } = require('../../middlevares')
const { usersJoiSchema } = require('../../validations')
const { signUp, login } = require('../../controllers/auth')

router.post('/signup', validation(usersJoiSchema), signUp)
router.post('/login', validation(usersJoiSchema), login)

module.exports = router
