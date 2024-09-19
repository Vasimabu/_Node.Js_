const express=require('express')
const exphbs=require('express-handlebars')
//json format data
const bodyParser=require('body-parser')
//sql server
//const sql=require('mssql')
const mysql=require('mysql')

//database connection
require('dotenv').config();

const app= express()
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//static files
app.use(express.static('public'))

//template engine(use html ,css file renduring)
const handlebars = exphbs.create({extname:".hbs"})
app.engine('hbs',handlebars.engine)
app.set("view engine","hbs")

/* //mysql connection
const con=mysql.createPool({
    connectionLimit:10,
    host     :process.env.DB_HOST,
    user     :process.env.DB_USER,
    password :process.env.DB_PASS,
    database :process.env.DB_NAME
})
//check database connection
con.getConnection((err,connection)=>{
    if(err) throw err
    console.log("Connection Success");
}) */
//router
app.get('/',(req,res)=>{
    res.render("home")
})

//listen port
app.listen(PORT,()=>{
    console.log("listening port :",PORT);
})
