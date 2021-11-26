const Models = require("../models/index")


module.exports = { getAll: async(req,res, next)=> { 

const members = await Models.Members.findAll()
console.log(members)
 return members
 
}

}