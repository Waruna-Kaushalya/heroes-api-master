const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")


const User = require("../models/user")
const SECRET_KEY = "12345678"

router.post("/", async(req,res)=>{
    // compare password and see if person is ayhentication
   let user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send("invalied login credintials");
    } 


    let token = jwt.sign({
        id: user._id,
        email: user.email
    },SECRET_KEY);

   let isPwValid =  user.password === req.body.password;
    
   if (!isPwValid){
    return res.status(400).send("Invalied login credintiols");
   }
   
   res.send({
       token: token
   });


});
   

module.exports = router;
