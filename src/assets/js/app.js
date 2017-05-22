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
    var calendarId = $("#calendar").attr("calendar-id");
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/api/calendar/" + calendarId + "/events",
        success: function(response) {
            sortAndReturnEvents(response, callback);
        }, error: function(jqXHR, exception) {
            if(jqXHR.status == 0) {
                Rollbar.debug("NodeJS server not started. Serving sample data.")
                console.log("Server not started\nCall 'npm start' or 'nodemon index' in server folder.\nSample data is served.");
                console.log(sampleData);
                sortAndReturnEvents(sampleData, callback);
            }
            Rollbar.error("An error calling GET /api/calendar occured.\nException:\t" + exception);
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
    var calendarId = $("#calendar").attr("calendar-id");
    var httpCallType = "POST";
    var reqUrl = "/api/events";
    if(reqdata._id != -1) {
        httpCallType = "PUT";
        reqUrl = reqUrl + "/" + reqdata._id;
    } else {
        delete reqdata["_id"];
    }
    reqdata.calendarId = calendarId;
    $.ajax({
        type: httpCallType,
        dataType: "json",
        url: reqUrl,
        data: reqdata,
        success: function(response) {
            callback(true);
        }, error: function(jqXHR, exception) {
            Rollbar.error("An error calling " + httpCallType + " " +  reqUrl + " occured.\nData:\t" + JSON.stringify(reqdata) + "\nException:\t" + exception);
            if(jqXHR.responseText != null) {
                callback(false, JSON.parse(jqXHR.responseText).error);
            } else {
                callback(false, jqXHR.statusText);
            }
        }
    });
};

function deleteEvent(callback, id) {
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "/api/events/" + id,
        success: function(response) {
            callback(true);
        }, error: function(jqXHR, exception) {
            Rollbar.error("An error calling DELETE /api/events/" + id + " occured.\nException:\t" + exception);
            if(jqXHR.responseText != null) {
                callback(false, JSON.parse(jqXHR.responseText).error);
            } else {
                callback(false, jqXHR.statusText);
            }
        }
    });
};