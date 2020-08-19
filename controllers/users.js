const express =require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const session = require("express-session");
// const {createRequireFromPath}=require ("module")


router.get('/',(req,res)=>{
    db.users.findAll().then(users=>{
        res.json(users)
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})

router.post("/createAccount",(req,res)=>{
    db.users.create({
       first_name:req.body.first_name,
       last_name:req.body.last_name,
       age:req.body.age,
       email:req.body.email,
       phoneNumber:req.body.phoneNumber,
       password:req.body.password 
    }).then(newUser => {
        res.json(newUser);
    }).catch(err=>{
        console.log(err);
        res.status(500).end();
    })
})

router.post("/login", (req, res) => {
    console.log(req.body.email)
    db.users.findOne({
    
        where:{
            email:req.body.email
        }
    }).then(users => {
       if(!users){
           res.status(404).send("This user does not exist!");
       }else{
           if(bcrypt.compareSync(req.body.password,users.password)){
               req.session.user ={
                first_name:users.first_name,
                email:users.email,
                id:users.id
               }
               res.send(req.session.user);
           }else{
               res.status(401).send("wrong password ")
        }
       } 
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.get('/readsessions',(req,res)=>{
    console.log(req.session)
    res.json(req.session);
})


router.put("/update/:id", function (req, res) {

    db.users.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            email: req.body.email,
            phoneNumber:req.body.phoneNumber
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(function (dbusers) {
        res.json(dbusers);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

router.delete("/delete/:id", function (req, res) {
    db.Users.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbUsers) {
        res.json(`destroyed the user account with id of ${req.params.id}`);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});



module.exports =router 
