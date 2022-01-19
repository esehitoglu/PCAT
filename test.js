const mongoose = require('mongoose')
const Schema = mongoose.Schema
// veri tabanınıa bağlanma

mongoose.connect('mongodb://localhost:27017/deneme',{
    userNewUrlPaser: true,
    useUnifiedTopology: true
    //useCreateIndex: true,
})


// create schema şablon oluşturduk
const PhotoSchema = new Schema({
    title:String,
    description:String
})

const Photo = mongoose.model('Photo',PhotoSchema)

// veri oluşturmak
Photo.create({
    title: "Photo title 2",
    description:"ilk fotoğraf 2"
})






