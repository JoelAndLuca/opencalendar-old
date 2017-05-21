/*
    app.js

    Code that handles communication between backend and frontend.
*/

var sampleData = [
    {
        "_id" : 1,
        "date" : "2017-05-25T00:00:00.000Z",
        "name" : "Auffahrt",
        "description" : "Hier haben wir frei.",
        "location" : "Schweizweit"
    },
    {
        "_id" : 2,
        "date" : "2017-05-29T00:00:00.000Z",
        "name" : "Pfingsten",
        "description" : "Hier haben wir auch frei.",
        "location" : "Schweizweit"
    },
    {
        "_id" : 3,
        "date" : "2017-05-23T11:15:00.000Z",
        "name" : "SPHAIR Aufnahmen",
        "description" : "Aufnahmen für SRF Doku",
        "location" : "Fliegerärztliches Institut (FAI), Dübendorf, Schweiz"
    },
    {
        "_id" : 4,
        "date" : "2017-05-25T15:00:00.000Z",
        "name" : "Dönerstag",
        "description" : "Der Dönerstag",
        "location" : "Coban Megadürüm"
    }
];

function getEvents(callback) {
    // Hack to always load json without cache.
    $.ajaxSetup({ cache: false });

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:4000/api/events",
        success: function(response) {
            sortAndReturnEvents(response, callback);
        }, error: function(response) {
            if(response.status == 0) {
                // The node server is not started
                // Use only for development and testing!
                console.log("Server not started\nCall 'npm start' or 'nodemon index' in server folder.\nSample data is served.");
                console.log(sampleData);
                sortAndReturnEvents(sampleData, callback);
            }
            console.log("Unknown error");
            console.log(response);
        }
    });
};

function sortAndReturnEvents(data, callback) {
    data.sort(function(a, b) {
        // If a is before b
        var momA = moment(a.date);
        var momB = moment(b.date);
        if(momA.isBefore(momB)) {
            return -1;
        }
        if(momA.isAfter(momB)) {
            return 1;
        }
        return 0;
    });
    callback(data);
}

function saveEvent(callback, reqdata) {
    var httpCallType = "POST";
    var reqUrl = "http://localhost:4000/api/events";
    if(reqdata._id != -1) {
        httpCallType = "PUT";
        reqUrl = reqUrl + "/" + reqdata._id;
    } else {
        delete reqdata["_id"];
    }
    $.ajax({
        type: httpCallType,
        dataType: "json",
        url: reqUrl,
        data: reqdata,
        success: function(response) {
            callback(true);
        }, error: function(response) {
            if(response.responseText != null) {
                callback(false, JSON.parse(response.responseText).error);
            } else {
                callback(false, response.statusText);
            }
        }
    });
};

function deleteEvent(callback, id) {
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "http://localhost:4000/api/events/" + id,
        success: function(response) {
            callback(true);
        }, error: function(response) {
            if(response.responseText != null) {
                callback(false, JSON.parse(response.responseText).error);
            } else {
                callback(false, response.statusText);
            }
        }
    });
};