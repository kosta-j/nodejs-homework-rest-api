const { Contact } = require('../../model')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(contactId)
    res.status(200).json({
      message: 'contact deleted',
      data: { result },
    })
  } catch (error) {
    error.status = 404
    error.message = 'Not found'
    next(error)
  }
}

module.exports = deleteContact
