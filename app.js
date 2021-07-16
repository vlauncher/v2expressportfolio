let express = require('express')
let expressLayouts = require('express-ejs-layouts')
let path = require('path')
let mongoose = require('mongoose')
let multer = require('multer')
let helmet = require('helmet')
let session = require('express-session')
let app = express()
//Routes
let IndexRouter = require('./routes/index')

//ejs setup
app.use(expressLayouts)
app.set('view engine', 'ejs');

//express session
app.set('trust-proxy',1)
app.use(session({
  saveUninitialized:true,
  resave:false,
  secret:'lifesucks3',
  name:'v2dents',
  cookie:{
    httpOnly:true,
    secure:true
  }
}))
//helmet setup
app.use(helmet())
//database setup
mongoose.connect('mongodb://localhost/Portfoliodb',{useNewUrlParser:true,useUnifiedTopology:true},(err) =>{
  if(err){
    console.log('Error Connecting to the databse')
  }else{
    console.log('Datbase connected successfully')
  }
})

//setup bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//public folder
app.use(express.static(path.join(__dirname, 'public')));
//Use Routes
app.use('/',IndexRouter)
//app port
app.listen(process.env.PORT || 3000,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('Server Running on Port 3000')
  }
})