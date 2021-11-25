const services = require("../services/membersServices")



module.exports = { getAll: async(req,res) => {

   try{
   const members =  services.getAll()

   res.status(202).json(members) } 
   catch(e) { console.log(e)
   res.send("error")
}

       }}