const express = require('express');
const router = express.Router();

// Gets all events
// To get events from a specific calendar: '/:calendarId/events/'?
router.get('/events', function(req, res) {
    var response = {
        "status" : "success",
        "data" :  [
                    {
                        "id" : 1,
                        "date" : "25.05.2017",
                        "title" : "Auffahrt",
                        "description" : "Hier haben wir frei.",
                        "location" : "Schweizweit",
                        "time" : ""
                    },
                    {
                        "id" : 2,
                        "date" : "29.05.2017",
                        "title" : "Pfingsten",
                        "description" : "Hier haben wir auch frei.",
                        "location" : "Schweizweit",
                        "time" : ""
                    },
                    {
                        "id" : 3,
                        "date" : "23.05.2017",
                        "title" : "SPHAIR Aufnahmen",
                        "description" : "Aufnahmen für SRF Doku",
                        "location" : "Fliegerärztliches Institut (FAI), Dübendorf, Schweiz",
                        "time" : "13:15"
                    },
                    {
                         "id" : 4,
                         "date" : "25.05.2017",
                         "title" : "Dönerstag",
                         "description" : "Der Dönerstag",
                         "location" : "Coban Megadürüm",
                         "time" : ""
                     }
                ] 
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(response);
});

router.post('/events', function(req, res) {
    res.send({type:'POST'});
});

router.put('/events/:id', function(req, res) {
    res.send({type:'PUT'});
});

router.delete('/events/:id', function(req, res) {
    res.send({type:'DELETE'});
});

module.exports = router;