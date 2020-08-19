const express = require('express');
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const session = require("express-session");
// const {createRequireFromPath}=require ("module")


router.get('/', (req, res) => {
    db.events.findAll().then(events => {
        res.json(events)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    });
});

router.post("/CreateEvent", (req, res) => {

    console.log(req.body);
    db.events.create({
        time: req.body.time,
        event_category: req.body.event_category,
        event_name: req.body.event_name,
        event_location: req.body.event_location,
        meeting_spot: req.body.meeting_spot,
        num_of_attendees: parseInt(req.body.num_of_attendees),
        min_age: parseInt(req.body.min_age),
        additional_info: req.body.additional_info
    }).then(newEvent => {
        res.json(newEvent);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    });
});

router.get('/readsessions', (req, res) => {
    res.json(req.session);
});

router.put("/update/:id", function (req, res) {
    db.events.update({
        time: req.body.time,
        event_category: req.body.event_category,
        event_name: req.body.event_name,
        event_location: req.body.event_location,
        meeting_spot: req.body.meeting_spot,
        num_of_attendees: parseInt(req.body.num_of_attendees),
        min_age: parseInt(req.body.min_age),
        additional_info: req.body.additional_info
    },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(function (dbEvents) {
        res.json(dbEvents);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});

router.delete("/delete/:id", function (req, res) {
    db.events.destroy({
        time: req.body.time,
        event_category: req.body.event_category,
        event_name: req.body.event_name,
        event_location: req.body.event_location,
        meeting_spot: req.body.meeting_spot,
        num_of_attendees: parseInt(req.body.num_of_attendees),
        min_age: parseInt(req.body.min_age),
        additional_info: req.body.additional_info
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (dbEvents) {
        res.json(dbEvents);
    }).catch(function (err) {
        res.status(500).json(err);
    });
});



module.exports = router 
