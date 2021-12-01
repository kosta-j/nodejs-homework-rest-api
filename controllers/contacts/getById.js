const { Contact } = require('../../model')

const getById = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { contactId } = req.params
    const result = await Contact.findOne({ _id: contactId, owner: _id })
    if (!result) {
      return res.status(404).json({
        message: 'Not found',
      })
    }
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
