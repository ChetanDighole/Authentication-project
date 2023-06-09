
const jwt = require('jsonwebtoken')
const userdb = require('../models/userSchema')
const keySecret = "chetanDighole"

const authenticate = async(req,res,next) => {

    try {
        
        const token = req.headers.authorization
        
        const verifytoken = jwt.verify(token , keySecret)
        // console.log(verifytoken)

        const rootUser = await userdb.findOne({_id: verifytoken._id})
        // console.log(routUser)

        if(!rootUser){
            throw new Error("user not found")
        }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next()


    } catch (error) {
        res.status(401).json({status:401 , message:"Unauthorized no token provided"})
    }

}

module.exports = authenticate
