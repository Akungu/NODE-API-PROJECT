const express=require('express');
const mongoose=require('mongoose');
const Product=require('./models/productModels')
const app=express();

//json middlare
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.get('/blog', (req, res) => {
    res.send('Hello You!')
  })
//route for getting products from the database
app.get('/product',async(req, res)=>{
  try {
    const product=await Product.find({})
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//route for saving data to the database
app.post('/product',async(req, res)=>{
  try {
    const product=await Product.create(req.body)
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//getting single product by id
app.get('/product/:id', async(req,res)=>{
  try {
    const {id}=req.params;
    const product=await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//updating data
app.put('/product/:id' ,async(req,res)=>{
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
})

//delete a product
app.delete('/product/:id' ,async(req,res)=>{
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
})


mongoose.connect('mongodb+srv://akungudorcas:good123bad@nodeapi.lvbykja.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=NodeAPI')
.then(()=>{
  console.log('connected to mongoDB')
  app.listen(3000,()=>{
    console.log(`NODE API PROJECT is listening on port 3000`)
});
  
}).catch(()=>{
  console.log('error')
})
