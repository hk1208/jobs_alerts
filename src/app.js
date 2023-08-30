require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
require("./db/conn")
const port = process.env.PORT || 7000;
const hbs = require('hbs');
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken")


// const createToken = async()=>{
//   const token = await jwt.sign({_id:"64de5868cdd62bd08d9372a3"},"")
// }


//bcrypt
// const securePassword=async (password) =>{
//    const passwordHash = await bcrypt.hash(password,10);
//    console.log(passwordHash);

//    const passwordmatch = await bcrypt.compare(password,passwordHash);
//    console.log(passwordmatch);
// }

// securePassword("123");


//middleware


// login
const Signup = require('./models/signup')
const Register = require('./models/registers');
const { userInfo } = require('os');
const { symlink } = require('fs');
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
const css_path = path.join(__dirname,"../public/css");


app.use(express.json());
app.use(express.urlencoded({extended:false }));
app.use(express.static(css_path))

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);



app.get('/',(req,res) => {
    res.render("login");
})





app.get('/index',(req,res) => {
    res.render("index");
})

app.get('/easeurstudies',(req,res) => {
    res.render("easeurstudies");
})

app.get('/contact',(req,res) => {
    res.render("contact");
})
app.get('/search',(req,res) => {
    res.render("search");
})

app.get('/login',(req,res) => {
    res.render("login");
})

app.get('/signup',(req,res) => {
    res.render("signup");
})


//login check


// create a new user in database

app.post('/register',async (req,res) => {
    try {


            const registerEmployee = new Register({
                name : req.body.firstname,
                email : req.body.email,
                phone : req.body.phone,
                query : req.body.query
            })

            // after getting the data and before saving the data we will encrypt the data 
            const Register = await registerEmployee.save();
            res.status(201).render("index")
        

    } catch (error) {
        res.status(400).send(error)
    }
})


// signup
app.post('/signup',async (req,res) => {
    try {

            const password=req.body.password;
            const cpassword=req.body.confirmpassword;

            if(password=== cpassword)
            {
            const signupEmployee = new Signup({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : password,
                confirmpassword : req.body.confirmpassword 
            })
             
            console.log("the success part"+signupEmployee);
            const token = await signupEmployee.generateAuthToken();
            console.log("the token part"+token);

            const registered = await signupEmployee.save();
            console.log("the page part"+token);
            res.status(201).render("login")
           }
           else
           {
            res.send("passowrd are not matching")
           }


            // after getting the data and before saving the data we will encrypt the data 

    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/login',async(req,res) => {
    try{
         const email=req.body.email;
         const password=req.body.password;

         //read the data

       const savedEmail = await Signup.findOne({email});
    //    res.send(savedEmail);
    //    console.log(savedEmail);

    const isMatch =await bcrypt.compare(password,savedEmail.password);

    const token = await savedEmail.generateAuthToken();
    console.log("the token part"+token);

       if(isMatch)
       {  
        res.status(201).render("index");
       }
       else{
        res.send("invalid login Details");
       }
    }
    catch (error){
        res.status(400).send("invalid login Details");
        
    }
})


// app.get('/',(req,res) => {
//     res.send("hello from server");
// })


app.listen(port,() => {
    console.log(`listening on port:  ${port}`)
})