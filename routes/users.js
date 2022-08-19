// const express = require('express');
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
// const router=express.Router()

// const User = require("../models/user");

// router.post('/login', (req, res) => {
//     let fetchedUser
//     User.findOne({email:req.body.email})
//     .then(user=>{
//         if(!user){
//             return res.status(401).json({
//                 message:"user has not signed up yet"
//             })
//         }
//         fetchedUser=user
//         return bcrypt.compare(req.body.password,user.password)
//     })
//     .then(result=>{
//         if(!result){
//             return res.status(401).json({
//                 message:"Invalid password"
//             })
//         }
//         const token=jwt.sign({email:fetchedUser.email,userId:fetchedUser._id}, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
        
//         res.status(200).json({
//             token:token,
//             expiresIn: 3600,
//             userId:fetchedUser._id
//         })
//     })
//    .catch(err=>{
//         res.status(403).json({
//             error:err
//         })
//     })
// });

// router.post('/signup', (req, res) => {
//     bcrypt.hash(req.body.password,10)
//     .then(hash=>{
//         const user=new User({
//             email:req.body.email,
//             password:hash
//         })
//         user.save()
//         .then(data=>{
//             res.status(201).json({
//                 message:"user signed up successfully"
//             })
//         })
//         .catch(err=>{
//             console.log(err);
//             res.status(500).json({
//                 error:err
//             })
//         })
//     })
// });

// module.exports = router;