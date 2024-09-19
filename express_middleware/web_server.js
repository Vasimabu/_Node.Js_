const express=require('express')
const app =express()
const path=require('path')
const cors=require('cors')
const {logger}=require('./middleware/logEvents')
const fs=require('fs')
const errorHandler=require('./middleware/errorHandler')

const PORT = process.env.PORT || 3500;

//custom middleware
app.use(logger)
//cros origin resource sharing
const whitelist= ['https://www.yourssite.com','http://127.0.0.1:5500','http://localhost:3500']
const corsOptions ={
    origin: (origin, callback) =>{
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else {
            callback(new Error('not allowed by cros'));
        }
    },
    optionsSuccessStatus : 200
}
//third party middleware
// app.use(cors())
app.use(cors(corsOptions))
//built in middleware
app.use(express.urlencoded({extended:false}))
//backend client data to handled in json
app.use(express.json())
//its handles static files
app.use(express.static(path.join(__dirname,'./public')))

app.get('^/$|/index(.html)?',(req, res)=> {
   // res.send('hi friends');
   res.sendFile(path.join(__dirname,'views','index.html'))

})

app.get('/new-page(.html)?',(req, res)=> {
    res.sendFile(path.join(__dirname,'views','new-page.html'))
 })

 //redirect for wrong page to crt page

 app.get('/old-page(.html)?',(req, res)=> {
    res.redirect(301,'new-page.html')
 })
app.get('/hello(.html)?',(req,res,next)=>{
    console.log('hello.html page load panna try pannom')
    next()
},  (req,res)=>{
    res.send('hi hello makle')
})

const one =(req,res,next)=> {
    console.log('one');
    next()
}
const two =(req,res,next)=> {
    console.log('two');
    next()
}
const three =(req,res)=> {
    console.log('three');
    res.send('finished')
}
app.get('/chain(.html)?',[one,two,three])

/*  app.get('/*',(req, res)=> {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
 }) */
//all method handles the error in post,get,put,update
app.all('*',(req,res) =>{
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }else if(req.accepts('json')){
        res.json({"error": "404 Not Found" });
    }else{
        res.type('txt').send("404 Not found")
    }
})
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));