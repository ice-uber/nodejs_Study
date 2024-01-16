const express = require('express')
const user = require('../models/userModel')
const router = express.Router()
const md5 = require('md5')
const session = require('express-session')

/**
 * 登录页
 */
router.get(('/login') , (req , res)=>{
    res.render('login')
})

/**
 * 登录验证
 */
router.post('/login' , (req, res)=>{

    user.findOne({username:req.body.username , password:md5(req.body.password)}).then( data =>{
        console.log(data)
        if (data){
            req.session.username = data.username
            req.session._id = data._id
            res.render('success' , {title:'登录成功！' , url:'/'})
            return
        }

        res.render('err' , {title:'登录失败！' , url:'/login'})
    }).catch( err =>{
        console.log(err)
        res.render('err' , {title:'登录失败！' , url:'/login'})
    })
})

/**
 * 注册页
 */
router.get(('/res') , (req , res)=>{
    res.render('res')
})

/**
 * 注册验证
 */
router.post('/res' , (req , res)=>{
    user.create({
        ...req.body,
        password:md5(req.body.password)
    }).then(data=>{
        console.log(data)
        res.render('success' , {title:'注册成功！' , url:'/login'})
    }).catch(err => {
        console.log(err)
        res.render('err' , {title:'注册失败！' , url:'/res'})

    })
})


router.get('/logout' , (req , res) =>{
    req.session.destroy()
    res.render('login')
})


module.exports = router