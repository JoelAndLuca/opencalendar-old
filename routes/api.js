const express = require('express');
const Event = require('../models/event');
const Calendar = require('../models/calendar');
const router = express.Router();

router.get('/calendar/:calId/events', function(req, res, next) {
    Event.find({calendarId: req.params.calId}).then(function(events) {
        res.send(events);
    });
});

router.get('/calendars', function(req, res, next) {
    Calendar.find({}).then(function(calendars) {
        res.send(calendars);
    });
});

router.get('/events', function(req, res, next) {
    Event.find({}).then(function(event) {
        res.send(event);
    });
});

router.post('/events', function(req, res, next) {
    /*Event.create(req.body).then(function(event) {
        res.send(event);
    }).catch(next);*/
});

router.put('/events/:id', function(req, res, next) {
    Event.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        Event.findOne({_id: req.params.id}).then(function(event) {
            res.send(event);
        });
    });
});

router.delete('/events/:id', function(req, res, next) {
    Event.findByIdAndRemove({_id: req.params.id}).then(function(event) {
        res.send(event);
    }).catch(next);
});

module.exports = router;