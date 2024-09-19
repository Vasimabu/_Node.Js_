const express= require('express')
const app =express()
const path=require('path')
const router =express.Router()

const bodyParser=require('body-parser')

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','pug')

router.get('/',(req,res)=>{
    const courses=[
        {name:'PHP'},
        {name:'Javascript'},
        {name:'Node.js'},
        {name:'React.Js'},
        {name:'Angular'}
    ]
    res.status(200).render('index',{
        docTitle: "welcome to Jvlcode",
        courses
    })
})
router.get('/about',(req,res,next)=>{
    res.status(200).render('about',{
        active: 'about'
    })
})

router.use((req,res,next)=>{
    res.status(200).render('404')
})

app.use(router)
//app.use(bodyParser.urlencoded())

app.listen(8000,()=>{
    console.log('Running on 8000');
})