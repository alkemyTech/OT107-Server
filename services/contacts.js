const contactsRepositorie = require('../repositories/contacts');

const getAll = async (res, req, next) => {
    try{
        const data = await contactsRepositorie.getAll
        return data
    }catch(e){
        next(e)
    }
}

module.exports = {
    getAll
}