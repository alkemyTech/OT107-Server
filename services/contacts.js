const contactsRepository = require('../repositories/contacts');

const getAll = async() => {
        const contacts = await contactsRepository.getAll()
        return contacts
}

module.exports = {
    getAll
}