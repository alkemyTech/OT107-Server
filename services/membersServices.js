const {members} = require("../models/members")


module.exports = { getAll: async(req,res)=> { 

const members = await members.findAll()

 return members

}

}