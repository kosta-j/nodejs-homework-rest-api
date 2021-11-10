const { Contact } = require('../../model')

const addContact = async (req, res, next) => {
  try {
    const newContact = req.body
    const result = await Contact.create(newContact)
    res.status(201).json({
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
