const getAll = async (res, req, next) => {
    try{
        const data = await "data"
        return data
    }catch(e){
        next(e)
    }
}

module.exports = {
    getAll
}