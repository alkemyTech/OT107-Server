const category  = require('../models/index').categories; 


const getAll = async () => {
    const allCategories = await category.findAll({
        attributes: ['name']
    });
    return allCategories; 
}

module.exports = {
    getAll,
}