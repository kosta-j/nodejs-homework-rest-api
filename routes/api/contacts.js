const express = require('express')
const { BadRequest } = require('http-errors')
const router = express.Router()

const { Contact } = require('../../model')
const validation = require('../../middlevares')
const contactsJoiSchema = require('../../validations')

router.get('/', async (_, res, next) => {
  try {
    const result = await Contact.find()
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
    const result = await Contact.findById(contactId)
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
    const result = await Contact.findByIdAndRemove(contactId)
    res.status(200).json({
      status: 'success',
      message: 'contact deleted',
      data: { result },
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
      const result = await Contact.findByIdAndUpdate(
        contactId,
        updatedContact,
        { new: true }
      )
      res.status(200).json({
        status: 'success',
        data: { result },
      })
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { favorite } = req.body
    if (!favorite) {
      return res.status(400).json({ message: 'missing field favorite' })
    }
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    )
    res.status(200).json({
      status: 'success',
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
