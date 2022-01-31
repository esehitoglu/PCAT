const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs')
const methodOverride = require('method-override')

// Connect Db

const myFunc = () => {
  /*
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
  ); */
};

mongoose
  .connect('mongodb://0.0.0.0/userdb')
  .then(myFunc(), (err) => console.log(`Error = ${err}`));

// template engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))

// routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos: photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id)
  //res.render('about')
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {

  console.log(req.files.image)
  const uploadDir = 'public/uploads'

  if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;
  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async(req, res) => {
  const photo = await Photo.findOne({_id: req.params.id})
  res.render('edit',{
    photo
  });
});

app.put('/photos/:id', async(req, res) => {
  const photo = await Photo.findOne({_id: req.params.id})
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()

  res.redirect(`/photos/${req.params.id}`)
});

app.delete('/photos/:id', async(req,res)=>{
  const photo = await Photo.findOne({_id:req.params.id})
  let deletedImage = __dirname + '/public' + photo.image
  fs.unlinkSync(deletedImage)
  await Photo.findByIdAndRemove(req.params.id)
  res.redirect('/')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
