const express = require('express')
const router = express.Router()

const { Contact } = require('../../model')
const validation = require('../../middlevares')
const contactsJoiSchema = require('../../validations')
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

router.post('/', validation(contactsJoiSchema), addContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', validation(contactsJoiSchema), updateContact)

router.patch('/:contactId/favorite', updateStatusContact)

module.exports = router
