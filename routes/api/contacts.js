const express = require('express')
const router = express.Router()

const { validation, authenticate } = require('../../middlevares')
const { contactsJoiSchema } = require('../../validations')
const {
  addContact,
  getAll,
  getById,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts')

router.get('/', getAll)

router.get('/:contactId', getById)

router.post('/', authenticate, validation(contactsJoiSchema), addContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', validation(contactsJoiSchema), updateContact)

router.patch('/:contactId/favorite', updateStatusContact)

module.exports = router
