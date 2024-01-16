const database = require('../db/mongodbUtil')
const accountModel = require('../models/accountModel')

database.connect((result) =>{
    console.log(result)
})

const result = accountModel.create({
    title:'买彩票',
    time:new Date(),
    type:1,
    number:99999,
    tips:'爽!'
}).then((err , data)=>{
    if (err){
        console.log(err)
        return
    }
    console.log(data)
})
