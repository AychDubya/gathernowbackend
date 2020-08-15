const express =require("express");
const router = express.Router();
const userRoutes = require('./users')

router.get("/",(req,res)=>{
    res.send("back end route working")
})

router.use('/api/users',userRoutes);
module.exports =router

