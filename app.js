const express = require('express');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageController')

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

//mongodb://0.0.0.0/userdb
mongoose
  .connect('mongodb+srv://ensar:Hxypneai4xDmOkzS@cluster0.xutep.mongodb.net/pcat-db?retryWrites=true&w=majority')
  .then(() => {
    console.log('DB CONNECTED')
  }).catch( (err) => {
    console.log(err)
  })

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
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id',photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto)

app.get('/about', pageController.getAboutPage)
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
