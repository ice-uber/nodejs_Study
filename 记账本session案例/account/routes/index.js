const express = require('express');
const router = express.Router();
const accountModel = require('../models/accountModel')
const moment = require('moment')
const loginProtect = require('../middleWare/loginProtect')


/* GET home page. */
router.get('/', loginProtect ,function(req, res, next) {

   accountModel.find().sort({time:-1}).then((data)=>{
     res.render('index' , {accountList : data , moment});
   }).catch((err)=>{
     console.log(err)
   })
});


router.get('/account',loginProtect , function(req, res, next) {
  res.render('create');
});


router.post('/account/create', loginProtect ,function(req, res, next) {

  accountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then((data)=>{
    accountModel.find().sort({time:-1}).then((data)=>{
      res.render('index' , {accountList : data , moment});
    }).catch((err)=>{
      console.log(err)
    })
  }).catch((err)=>{
    console.log(err)
    res.send('添加失败！')
    return
  })


});

router.get('/account/delete/:id', loginProtect ,function(req, res, next) {
  const id = req.params.id;
 accountModel.findByIdAndDelete(id ).then((data)=>{

   accountModel.find().sort({time:-1}).then((data)=>{
     res.render('index' , {accountList : data , moment});
   }).catch((err)=>{
     console.log(err)
   })

 }).catch((err)=>{
  res.send('删除失败')
 })

});





module.exports = router;
