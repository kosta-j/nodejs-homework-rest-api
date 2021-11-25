const { Contact } = require('../../model')

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user
    const result = await Contact.find({ owner: _id }).populate(
      'owner',
      '_id email'
    )
    res.json({
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
