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

router.get('/', authenticate, getAll)

router.get('/:contactId', authenticate, getById)

router.post('/', authenticate, validation(contactsJoiSchema), addContact)

router.delete('/:contactId', authenticate, deleteContact)

router.put(
  '/:contactId',
  authenticate,
  validation(contactsJoiSchema),
  updateContact
)

router.patch('/:contactId/favorite', authenticate, updateStatusContact)

module.exports = router
