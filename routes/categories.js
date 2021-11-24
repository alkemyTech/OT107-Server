var express = require('express');
var router = express.Router();

const categoriesService =  require('../services/categories')



router.get('/', async function(req, res, next) {

      try {
        const categories = await categoriesService.getAll();  
        if(categories)res.status(200).json(categories); 
      }catch(e){
        console.log(e);
      };
  });
 


module.exports = router;