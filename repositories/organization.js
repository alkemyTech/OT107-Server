const Models = require('../models')

const getAll = async()=>{
    const data = await Models.Organization.findAll({
        attributes: ['name', 'image', 'phone', 'address']
    })
    return data
}

module.exports = {
    getAll
}