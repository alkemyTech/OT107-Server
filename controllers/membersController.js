const serviceMember = require("../services/membersServices")

module.exports = { 


getAll: async (req,res,next) => { 

    const allMembers = await serviceMember.getAll();

    res.status(200).json(allMembers)
  }

}