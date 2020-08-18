const express =require("express");
const router = express.Router();
const userRoutes = require('./users')
const eventRoutes = require('./events')

router.get("/",(req,res)=>{
    res.send("back end route working")
})

router.use('/api/users',userRoutes);
router.use('/api/events',eventRoutes);

module.exports = router

