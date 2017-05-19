var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var mongoOp = require("./models/mongo")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get("/events", function(req, res, next) {
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
                    }
                ] 
    }
    res.json(response);
});

app.use("/", router);

app.listen(3000);
console.log("Listening on port 3000");