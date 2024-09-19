const express =require('express');
const app=express();
const{ engine }=require('express-handlebars')
const { loginPage, dashboardpage, loginProcess}=require('./controller/userController')
const path=require('path')

app.engine('hbs',engine({extname: 'hbs',defaultLayout:false}))
app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded())

app.get('/',loginPage)
app.get('/dashboardpage',dashboardpage)
app.post('/login',loginProcess)

app.listen(8000,function(){
    console.log('serevr is running');
})