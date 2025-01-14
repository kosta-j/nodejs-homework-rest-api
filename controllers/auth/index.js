const signUp = require('./signUp')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const sendVerificationEmail = require('./sendVerificationEmail')

module.exports = {
  signUp,
  login,
  logout,
  current,
  updateAvatar,
  verify,
  sendVerificationEmail,
}
