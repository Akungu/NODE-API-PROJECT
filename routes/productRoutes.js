//include product routes in this file
const express=require('express');
const product=require('../models/productModels')
const {getProducts,getProduct,createProducts, updateProducts, deleteProducts}=require('../controllers/productController')
const router=express.Router();



router.get('/',getProducts);
   router.post('/',createProducts);
   router.get('/:id',getProduct);
  
 
  router.put('/:id',updateProducts);

  
  router.delete('/:id',deleteProducts);

  module.exports=router;