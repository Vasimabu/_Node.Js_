const{ getUser }=require("../models/userModel")

exports.loginPage =(req,res,next)=>{
    res.render('login')
}

exports.dashboardpage=(req,res,next)=>{
    res.render('dashboard')
}

exports.loginProcess =(req,res,next)=>{
    //get user data
   const user = getUser(req.body.email)
   if(user !==null && user.password === req.body.password){
        res.redirect('/dashboard')
   }else if(user === null){
        res.render('error',{
            message:"mo user exists with this email"
        })
   }else{
        res.render('error',{
            message:'Invalid credentials'
        })
   }
}
