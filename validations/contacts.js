const Joi = require('joi')
const customJoi = Joi.extend(require('joi-phone-number'))

const contactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: customJoi.string().phoneNumber().required(),
  favorite: Joi.boolean(),
  avatarURL: Joi.string(),
})

module.exports = contactsJoiSchema
