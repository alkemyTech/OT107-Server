const {Organization} = require('../models')

const getAll = async()=>{
    const data = await Organization.findAll({
        attributes: ['name', 'image', 'phone', 'address']
    })
    return data
}

module.exports = {
    getAll
}