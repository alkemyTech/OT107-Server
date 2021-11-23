const contactsRepositorie = require('../repositories/contacts');

const getAll = async() => {
        const contacts = await contactsRepositorie.getAll()
        return contacts
}

module.exports = {
    getAll
}