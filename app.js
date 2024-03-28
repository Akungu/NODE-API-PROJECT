require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose');
const productRoute=require('./routes/productRoutes');
const errorMiddleware=require('./middleware/errorMiddleware');
const cors = require('cors')

const bodyParser=require('body-parser');
const app=express();


const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT ||3000
const FRONTEND=process.env.FRONTEND

var corsOptions = {
  origin:FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//json middleware
app.use(express.json(corsOptions))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//error middleware
app.use(errorMiddleware);

//routes
app.use('/api/products', productRoute);

app.get('/',(req,res)=>{
  res.send("Hello you")
})

//database connection
mongoose.connect(MONGO_URL)
.then(()=>{
  console.log('connected to mongoDB')
  app.listen(PORT,()=>{
    console.log(`NODE API PROJECT is listening on port ${PORT}`)
});
  
})
.catch((err)=>{
  console.log('error')
});
module.exports=app;
