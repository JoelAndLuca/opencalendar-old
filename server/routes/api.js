const express = require('express');
const Event = require('../models/event');
const router = express.Router();

// Gets ALL events
// To get events from a specific calendar: '/:calendarId/events/'?
router.get('/events', function(req, res, next) {
    Event.find({}).then(function(events) {
        res.send(events);
    });
});

router.post('/events', function(req, res, next) {
    Event.create(req.body).then(function(event) {
        res.send(event);
    }).catch(next);
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