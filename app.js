const express = require('express');
const bodyparser = require('body-parser');
const nodemailer =require('nodemailer');
// const port=80;
const app = express();
app.use(express.static("style"));
app.use(bodyparser.urlencoded({extended:true}));

app.post("/submit",function(req,res)
{
    const comm =req.body.message;
    console.log(comm);
})
app.get("/",function(req,res)
{
    res.sendFile(__dirname+ "/contact.html");
    console.log(__dirname);
})
// app.get("/",function(req,res)
// {
//     res.sendFile(__dirname+ "/index.html");
//     console.log(__dirname);
// })

// app.get("/",function(req,res)
// {
//     res.sendFile(__dirname+ "/contact.html");
//     console.log(__dirname);
// })

app.listen(3000,function(){
    console.log("server at 3000");
})