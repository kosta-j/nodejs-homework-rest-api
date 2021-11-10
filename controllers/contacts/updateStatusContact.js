const { Contact } = require('../../model')

const updateStatusContact = async (req, res, next) => {
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
      data: { result },
    })
  } catch (error) {
    error.status = 404
    error.message = 'Not found'
    next(error)
  }
}

module.exports = updateStatusContact
