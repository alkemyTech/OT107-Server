// const { Op, Sequelize } = require("sequelize");
const {News} = require('../models/index')


const getAll = async (req, res, next) => {
    try {
        const news = await News.findAll()
        
        return news

    } catch (e) {
        throw new Error('bad request')
    }

}

const create = async (req, res, next) => {
    
}

const getById = async (req, res, next) => {

}

const update = async (req, res, next) => {

}

const remove = async (req, res, next) => {

}



module.exports = {
    getAll, 
    getById, 
    create,
    update,
    remove
}
