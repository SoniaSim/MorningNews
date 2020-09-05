const mongoose = require('mongoose')

const articleShema = mongoose.Schema({
    image : String,
    title : String,
    description : String,
    content : String,
    lang : String
})

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    salt: String, 
    articles : [articleShema],
    language: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel