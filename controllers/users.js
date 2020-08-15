const express =require('express');
const router = express.Router();
const db = require("../models");

router.get('/',(req,res)=>{
    db.users.findAll().then(users=>{
        res.json(users)
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})

router.post("/",(req,res)=>{
    db.users.create({
       first_name:req.body.first_name,
       last_name:req.body.last_name,
       age:req.body.age,
       email:req.body.email,
       phoneNumber:req.body.phoneNumber 
    }).then(newUser => {
        res.json(newUser);
    }).catch(err=>{
        console.log(err);
        res.status(500).end();
    })
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
