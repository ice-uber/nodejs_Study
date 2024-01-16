module.exports = (req , res , next) =>{
    if (!req.session.username){
        res.render('login')
        return
    }
    next()
}