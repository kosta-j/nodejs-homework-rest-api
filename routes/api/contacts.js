const express = require('express')
const { NotFound } = require('http-errors')
const router = express.Router()

const { Contact } = require('../../model')
const contactsOperations = require('../../model')
const validation = require('../../middlevares')
const contactsJoiSchema = require('../../validations')

router.get('/', async (_, res, next) => {
  try {
    const result = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      throw new NotFound('Not found')
    }
    res.json({
      status: 'success',
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', validation(contactsJoiSchema), async (req, res, next) => {
  try {
    const newContact = req.body
    const result = await Contact.create(newContact)
    res.status(201).json({
      status: 'success',
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      throw new NotFound('Not found')
    }
    res.status(200).json({
      status: 'success',
      message: 'contact deleted',
    })
  } catch (error) {
    next(error)
  }
})

router.put(
  '/:contactId',
  validation(contactsJoiSchema),
  async (req, res, next) => {
    try {
      const updatedContact = req.body
      const { contactId } = req.params
      const result = await contactsOperations.updateContact(
        contactId,
        updatedContact
      )
      if (!result) {
        throw new NotFound('Not found')
      }
      res.status(200).json({
        status: 'success',
        data: { result },
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
