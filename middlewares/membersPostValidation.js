const { check, validationResult } = require('express-validator');

 const membersValidation = [check("name").not().isEmpty().withMessage("A name is required").bail(),
  
(req,res,next) => { 

    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpt()) { res.status(400).send(validationErrors)}

    next()



}

]

module.exports = membersValidation