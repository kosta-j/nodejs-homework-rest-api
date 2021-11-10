const { Contact } = require('../../model')

const updateContact = async (req, res, next) => {
  try {
    const updatedContact = req.body
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, updatedContact, {
      new: true,
    })
    res.status(200).json({
      data: { result },
    })
  } catch (error) {
    error.status = 404
    error.message = 'Not found'
    next(error)
  }
}

module.exports = updateContact
