const Contact = require('./contact')

// const fs = require('fs/promises')
// const path = require('path')
// const crypto = require('crypto')

// const contactsPath = path.join(__dirname, './contacts.json')

// const readData = async () => {
//   const result = await fs.readFile(contactsPath, 'utf8')
//   return JSON.parse(result)
// }

// const writeData = async (data) => {
//   const stringifiedData = JSON.stringify(data)
//   await fs.writeFile(contactsPath, stringifiedData)
// }

// const listContacts = async () => {
//   return await readData()
// }

// const getContactById = async (contactId) => {
//   const contacts = await readData()
//   const [filteredContact] = contacts.filter((item) => item.id === contactId)
//   return filteredContact
// }

// const removeContact = async (contactId) => {
//   const contacts = await readData()
//   const contactToDeleteIdx = contacts.findIndex((item) => item.id === contactId)
//   const removed = contacts.splice(contactToDeleteIdx, 1)
//   await writeData(contacts)

//   return removed
// }

// const addContact = async (body) => {
//   const contacts = await readData()
//   const newContact = { id: crypto.randomUUID(), ...body }
//   contacts.push(newContact)
//   await writeData(contacts)
//   return newContact
// }

// const updateContact = async (contactId, body) => {
//   const contacts = await readData()
//   const index = contacts.findIndex((item) => item.id === contactId)
//   if (index === -1) {
//     return null
//   }
//   contacts[index] = { id: contactId, ...body }
//   await writeData(contacts)
//   return contacts[index]
// }

module.exports = {
  Contact,
  // listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
}
