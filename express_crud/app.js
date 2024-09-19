const express =require("express");
const bodyParser= require("body-parser")
var fs =require("fs")
const path=require('path')
const app = express()
//const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post("/adduser",function(req,res){
    var username= req.body.username;
    var dob=req.body.dob;
    var profession =req.body.profession
    var obj={};
    var key =req.body.userid;
    var newuser ={
        "name":username,
        "dob":dob,
        "profession":profession
    }
    obj[key] = newuser;

    fs.readFile("user.json","utf8",function(err,data){
        data =JSON.parse(data);
        data[key]=obj[key]
        console.log(data);
        var updateuser =JSON.stringify(data)
        fs.writeFile("user.json",updateuser,function(err){
            res.send(JSON.stringify(data))
        })
    })
})

app.listen(3500, () => {
    console.log('Server is running on http://localhost:');
})