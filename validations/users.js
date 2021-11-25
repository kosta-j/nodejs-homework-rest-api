const Joi = require('joi')

const usersJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
  token: Joi.string(),
})

module.exports = usersJoiSchema
