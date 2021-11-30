const membersRepository = require('../repositories/members');

const getAll = async() => {
        const members = await membersRepository.getAll()
        return members
}

module.exports = {
    getAll
}