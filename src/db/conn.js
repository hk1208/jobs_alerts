const mongoose = require('mongoose');


// mongoose.connect("mongodb://127.0.0.1:27017/contact-himanshu",
mongoose.connect("mongodb://127.0.0.1:27017/contact-himanshu",
{
    useNewUrlParser : true,
    useUnifiedTopology: true
}
).then(() =>{
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
})