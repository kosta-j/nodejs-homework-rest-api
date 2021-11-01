const express = require('express')
const router = express.Router()

const contactsOperations = require('../../model')

const Joi = require('joi')
const customJoi = Joi.extend(require('joi-phone-number'))
const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: customJoi.string().phoneNumber(),
})

router.get('/', async (_, res, next) => {
  try {
    const result = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
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
      const error = new Error('Not found')
      error.status = 404
      throw error
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newContact = req.body
    const { error } = joiSchema.validate(newContact)
    if (error) {
      const addingContactError = new Error(error.message)
      addingContactError.status = 400
      throw addingContactError
    }
    const result = await contactsOperations.addContact(newContact)
    res.status(201).json({
      status: 'success',
      code: 201,
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
      const error = new Error('Not found')
      error.status = 404
      throw error
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const updatedContact = req.body
    const { error } = joiSchema.validate(updatedContact)
    if (error) {
      const updatingContactError = new Error(error.message)
      updatingContactError.status = 400
      throw updatingContactError
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContact(
      contactId,
      updatedContact
    )
    if (!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
