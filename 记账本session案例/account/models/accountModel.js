const mongoose = require('mongoose')
const {model} = require("mongoose");

const accountSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    time:{
        type: Date,
        default:new Date()
    },
    type:{
        type:Number,
        require: true
    },
    number:{
        type:Number,
        require:true
    },
    tips:{
        type:String
    }

})

const account = mongoose.model('account' ,accountSchema)

module.exports = account