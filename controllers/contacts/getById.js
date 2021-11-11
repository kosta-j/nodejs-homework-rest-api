const { Contact } = require('../../model')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)
    res.json({
      data: { result },
    })
  } catch (error) {
    error.status = 404
    error.message = 'Not found'
    next(error)
  }
}

module.exports = getById
