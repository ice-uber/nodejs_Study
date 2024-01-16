const mongoose = require('mongoose')
const {url} = require('../config/mongodbConfig')

const database = {}



database.connect =  (result)=>{
    mongoose.connect(url);

    mongoose.connection.once('open' , ()=>{
        result('27017端口连接成功！')
    })

    mongoose.connection.once('error' , ()=>{
        result('27017端口连接失败！')
    })
}

module.exports = database