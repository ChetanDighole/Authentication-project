const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const keySecret = "chetanDighole"

const userScehma = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    token: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userScehma.pre('save' , async function(next){

    if(this.isModified('password')){

        this.password= await bcrypt.hash(this.password , 12)
        this.cpassword= await bcrypt.hash(this.cpassword , 12)
    }

    next()
});


userScehma.methods.generateAuthtoken = async function(){
    try {
        let token = jwt.sign({_id:this._id }, keySecret,{
            expiresIn:"1d"
        });
        this.token = this.token.concat({token:token})
        await this.save()
        return token;
    } catch (error) {
        resizeBy.status(422).json(error)
    }
}


const userdb = new mongoose.model('users' , userScehma)
module.exports = userdb

