const serviceNews  = require('../services/news')

const getAll = async (req, res, next) => {
    try {
        const news = await serviceNews.getAll()

        if (news){
            res.status(200).json(news)
        } else {
            throw new Error('bad request')
        }

    } catch (e) {
        next(e)
    }
}

const create = async (req, res, next) => {
    
    
    try {
        const data = req.body
        const news = await serviceNews.create(data)

        if (news){
            res.sendStatus(204)
        } else {
            throw new Error('bad request')
        }

    } catch (e) {
        next(e)
    }
}

const getById = async (req, res, next) => {

    try {

        const id = req.params.id

        const news = id ? await serviceNews.getById(id) : null

        if (news){
            res.status(200).json(news)
        } else {
            throw new Error('bad request')
        }

    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {

    try {
        const data = req.body
        const id = req.params.id

        const news = id ? await serviceNews.update(id, data) : null

        if (news){
            res.sendStatus(204)
        } else {
            throw new Error('bad request')
        }

    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {

    try {
        const id = req.params.id

        const news = id ? await serviceNews.remove(id) : null

        if (news){
            res.sendStatus(204)
        } else {
            throw new Error('bad request')
        }

    } catch (e) {
        next(e)
    }
}



module.exports = {
    getAll, 
    getById, 
    create,
    update,
    remove
}