const express=require('express')
const app =express()
const path=require('path')
const fs=require('fs')

const PORT = process.env.PORT || 3500;

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

 app.get('/*',(req, res)=> {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
 })
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));