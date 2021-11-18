const express = require('express')

const router = express.Router()
const validation = require('../../middlevares')
const contactsJoiSchema = require('../../validations')
const { register } = require('../../controllers/auth')

// router.post('/register', register)

module.exports = router
