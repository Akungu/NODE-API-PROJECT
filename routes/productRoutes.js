//include product routes in this file
const express=require('express');
const Product=require('../models/productModels')
const {getProducts,getProductById,createProduct, updateProduct, deleteProduct}=require('../controllers/productController')
const router=express.Router();


//define route
router.get('/',getProducts);
router.post('/',createProduct);
router.get('/:id',getProductById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports=router;
