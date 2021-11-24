const organizationRepo = require('../repositories/organizations')

const getAll = async(req, res)=>{
    const data = await organizationRepo.getAll()
    return data
}

module.exports = {
    getAll
}