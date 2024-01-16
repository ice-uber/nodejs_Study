const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type: String,
        require: true
    }
})


const userModel = mongoose.model('user' ,UserSchema)

module.exports = userModel