const {contacts} = require('../models')

const getAll = async() => {
        const data = await contacts.findAll()
        return data 
}

module.exports = {
    getAll
}