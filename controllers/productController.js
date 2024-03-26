const product=require('../models/productModels')

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
  const getProduct=async(req,res)=>{
    try {
      const {id}=req.params;
      const product=await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

   //route for saving data to the database
   const createProducts=async(req, res)=>{
    try {
      const product=await Product.create(req.body)
      res.status(200).json(product);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
    }
  }
   //updating data
   const updateProducts=async(req,res)=>{
    try {
      const {id}=req.params;
      const product=await Product.findByIdAndUpdate(id,req.body);
      if(!product){
        return res.status(404).json({message: `cannot find product with id ${id}`})
      }
      const updatedProduct=await Product.findById(id)
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }
  //delete a product
  const deleteProducts=async(req,res)=>{
    try {
      const {id}=req.params;
      const product=await Product.findByIdAndDelete(id);
      if(!product){
        return res.status(404).json({message: `cannot find product with id ${id}`})
      }
      
      res.status(200).json(Product);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  module.exports={
    getProducts,
    getProduct,
    createProducts,
    updateProducts,
    deleteProducts
  }