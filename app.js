const express = require('express')
const ejs = require('ejs')
const app = express()
const path = require('path')
const Photo = require('./models/Photo')
const mongoose = require('mongoose')

// Connect Db

const myFunc = () => {
  const userSchema = mongoose.Schema({
      name: String
  });

  const User = mongoose.model("User", userSchema);

  const userObject = new User({
      name: 'Abhishek'
  });

  userObject.save((err, data) => {
      if (err)
          console.log('Error in saving = ' + err);
      if (data)
          console.log('Saved to DB = ' + data)
  }
  );
};


mongoose
    .connect("mongodb://0.0.0.0/userdb")
    .then(myFunc(), err => console.log(`Error = ${err}`));

// template engine
app.set('view engine','ejs')

// middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// routes
app.get('/', async(req,res)=>{
  const photos = await Photo.find({})
  res.render('index',{
    photos:photos
  })
})
app.get('/about',(req,res)=>{
  res.render('about')
})
app.get('/add',(req,res)=>{
  res.render('add')
})

app.post('/photos',async (req,res)=>{
  await Photo.create(req.body)
  res.redirect('/')
})

const port = 3000
app.listen(port,()=>{
  console.log(`Sunucu ${port} portunda başlatıldı`)
})