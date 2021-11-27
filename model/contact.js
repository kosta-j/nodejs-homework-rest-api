const { Schema, model } = require('mongoose')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  avatarURL: {
    type: String,
    default: '',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

const Contact = model('contact', contactSchema)

module.exports = Contact
