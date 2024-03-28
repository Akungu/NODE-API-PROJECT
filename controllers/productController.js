const Product=require('../models/productModels')
const asyncHandler=require('express-async-handler');

//route for getting products from the database

const getProducts=async(req, res)=>{
    try {
      const product=await Product.find({})
      res.status(200).json(product);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
    }
  }
  
  //getting single product by id
  const getProductById=asyncHandler(async(req,res)=>{
    try {
      const {id}=req.params;
      const product=await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  })

   //route for saving data to the database
   const createProduct=asyncHandler(async(req, res)=>{
    try {
      const product=await Product.create(req.body)
      res.status(200).json(product);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  })
   //updating data
   const updateProduct=asyncHandler(async(req,res)=>{
    try {
      const {id}=req.params;
      const product=await Product.findByIdAndUpdate(id,req.body);
      if(!product){
        res.status(404);
        throw new Error(`cannot find product with id ${id}`);
      }
      const updatedProduct=await Product.findById(id)
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  })
  //delete a product
  const deleteProduct=asyncHandler(async(req,res)=>{
    try {
      const {id}=req.params;
      const product=await Product.findByIdAndDelete(id);
      if(!product){
        res.status(404);
      throw new Error(`cannot find product with id ${id}`);
      
      }
      
      res.status(200).json(Product);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  })

  module.exports={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }