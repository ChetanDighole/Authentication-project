const mongoose = require('mongoose')

const DB = "mongodb+srv://chetan:chetan123@cluster0.kmsb9dg.mongodb.net/Authuser?retryWrites=true&w=majority"

mongoose.connect(DB , {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("database connected")).catch((error)=>{
    console.log(error)
})
