require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose');
const productRoute=require('./routes/productRoutes');
const app=express();


const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT ||3000




//json middleware
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.get('/blog', (req, res) => {
    res.send('Hello You!')
  })



mongoose.connect(MONGO_URL)
.then(()=>{
  console.log('connected to mongoDB')
  app.listen(PORT,()=>{
    console.log(`NODE API PROJECT is listening on port ${PORT}`)
});
  
}).catch(()=>{
  console.log('error')
})
