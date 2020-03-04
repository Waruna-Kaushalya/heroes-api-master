const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/", async(req,res)=>{
    //craete user and saeve to db


let userTobeCreated = new User({
    username : req.body.username,
    email : req.body.email,
    password : req.body.password

})

await userTobeCreated.save();
return res.send({
    username : userTobeCreated.username,
    email : userTobeCreated.email
})


})


module.exports = router;
