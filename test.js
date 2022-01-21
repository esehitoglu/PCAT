const mongoose = require('mongoose')
const Schema  = mongoose.Schema

// Connect Db
mongoose.connect('mongodb://localhost:27017/example', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('db connected!')
}).catch((err) => {
    console.log(err)
});

// create schema şablon oluşturduk
const PhotoSchema = new Schema({
    title:String,
    description:String
})

const Photo = mongoose.model('Photo',PhotoSchema)

exports.createPhoto = async(req,res) => {
    // veri oluşturmak
    await Photo.insertOne({
        title: "Photo title 2",
        description:"ilk fotoğraf 2"
    })
}
