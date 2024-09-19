const express= require('express')
const path=require('path')

const bodyParser=require('body-parser')
const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop')
const app =express()

app.use(express.static(path.join(__dirname,'public')))
/* app.use((req,res,next)=>{
    console.log('first middleware');
    next();
})
app.use((req,res,next)=>{
    console.log('second middleware');
    next()
}) */


/* app.use('/second',(req,res,next)=>{
    console.log('second middleware');
    res.send('<h2>hello second middle</h2>')
})

app.use('/third',(req,res,next)=>{
    console.log('third middleware');
    res.send('<h2>hello third middle</h2>')
})

app.use('/',(req,res,next)=>{
    console.log('always middleware');
    res.send('<h1>hello welcome</h1>')
    next()
}) */
app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})



app.use(bodyParser.urlencoded())

/* app.use('/',(req,res,next)=>{
        console.log('always middleware');
        res.send('<h1>hello welcome</h1>')
        next()
}) */

//const server=http.createServer(app)
//server.listen(3000);
app.listen(3000)