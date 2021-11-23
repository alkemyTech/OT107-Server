const contactsService = require('../services/contacts.js')

const getAll = async (res, req, next) => {
    try{
        const data = await contactsService.getAll
        res.status(200).json({data: data})
    }catch(e){
        next(e)
    }
}

module.exports = {
    getAll
}