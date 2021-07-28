const express = require('express')
let router = express.Router()
const contactModel = require('../models/contactmodel')
let fs = require('fs')
let path = require('path')

//Setup Multer
let multer = require('multer')
var storage = multer.diskStorage({
  destination : (req,file,cb) =>{
    cb(null,'public/uploads')
  },
  filename : (req,file,cb)=>{
    cb(null,file.fieldname + '-' +Date.now())
  }
})

var upload = multer({storage:storage})

//Get homepage
router.get('/',(req,res)=>{
    res.render('index')
})

//Get About
router.get('/about',(req,res)=>{
    res.render('about')
})

//Get Contact
router.get('/contact',(req,res)=>{
    contactModel.find({},(err,items)=>{
        if(err){
            console.log(err)
            res.status(500).send('An error has occured'+err)
        }else{
            res.render('contact',{items:items})
        }
    })
})

//Contact Post
router.post('/contact',upload.single('image'),(req,res)=>{
   let newpost = new contactModel()
   newpost.name = req.body.name;
   newpost.message = req.body.message;
   newpost.email = req.body.email;
   newpost.subject = req.body.subject;
   newpost.img ={
       data: fs.readFileSync(path.join(__dirname+'public/uploads/'+req.file.filename)),
       contentType : 'image/png' 
   }
   newpost.save((err)=>{
       if(err){
           console.log(err)
           return
       }else{
           console.log(newpost)
           res.redirect('/')
       }
   })
})

//Get About
router.get('/resume',(req,res)=>{
    res.render('resume')
})

//Get About
router.get('/services',(req,res)=>{
    res.render('services')
})

//Get About
router.get('/portfolio',(req,res)=>{
    res.render('portfolio')
})

module.exports = router;