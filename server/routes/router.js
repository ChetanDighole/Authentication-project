const express = require('express')
const userdb = require("../models/userSchema")
const bcrypt = require('bcryptjs')
const authenticate = require("../middleware/authenticate")


const router = new express.Router()


router.post('/register', async (req, res) => {
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all details" })
    }

    try {
        const preuser = await userdb.findOne({ email: email })

        if (preuser) {
            res.status(422).json({ error: "this email already exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password and confirm password not match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            })

            const storeData = await finalUser.save()

            // console.log(storeData)
            res.status(201).json({ status: 201, storeData })


        }

    } catch (error) {
        res.status(422).json(error)
        console.log("catch block error")

    }

})

//user login
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all details" })
    }

    try {

        const userValid = await userdb.findOne({ email: email })

        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password)

            if (!isMatch) {
                res.status(422).json({ error: "invalid detail" })

            }else{

                const token = await userValid.generateAuthtoken()
                
                //cookie
                res.cookie('userCookie' , token , {
                    expires: new Date(Date.now()+9000000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201, result})

            }
        }

    } catch (error) {
        res.status(401).json(error)
        console.log("catch block")
    }

})


router.get("/validUser" , authenticate , async (req,res) => {
    try {
        const validUserOne = await userdb.findOne({_id:req.userId})
        res.status(201).json({status:201 , validUserOne})
    } catch (error) {
        res.status(401).json({status:401 , error})
    }
})

router.get("/logout" , authenticate , async(req,res)=>{
    try {
        req.rootUser.token = req.rootUser.token.filter((current)=>{
            return current.token !== req.token
        })

        res.clearCookie("usercookie",{path:"/"})

        req.rootUser.save()
        res.status(201).json({status:201})

    } catch (error) {
        res.status(201).json({status:401,error})
        
    }
})


module.exports = router
