const express = require('express');
const router = express.Router();
const db = require("../models");

const bcrypt = require("bcrypt");
const session = require("express-session");
const io = require('../config/socket');


router.post('/createChat', (req, res) => {
    db.chat.create({
        user1: req.user1,
        user2: req.user2,

    }).then(newChat => {
        res.json(newChat);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })

});

router.post('/sendMessage', (req, res) => {

    db.message.create({
        chatid: req.body.chatid,
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,

    })
        .then((newMessage) => {
            io.getIO().emit(req.body.receiver, { action: 'New Message', message: newMessage })

            res.json(newMessage);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })

})

router.get('/getMessages/:id', (req, res) => {

    db.message.findAll({
        where: {
            chatid: req.params.id
        },
        order: [
            ['id', 'ASC'] // for getting messages in ascending order
            // ['id', 'DESC'] // for getting messages in descending order

        ]
    })
        .then((messages) => {
            res.json(messages);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
})

module.exports = router 
