/*
    app.js

    Code that handles communication between backend and frontend.
*/

var sampleData = [
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
];

function getEvents(callback) {
    // Hack to always load json without cache.
    $.ajaxSetup({ cache: false });

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:4000/api/events",
        success: function(response) {
            var parsedData = response.data;
            sortAndReturnEvents(parsedData, callback);
        }, error: function(response) {
            if(response.status == 0) {
                // The node server is not started
                // Use only for development and testing!
                console.log("Server not started\nCall 'npm start' in server folder.\nSample data is served.");
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
        var momA = moment(a.date, "DD.MM.YYYY");
        var momB = moment(b.date, "DD.MM.YYYY");
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

async function saveEvent(callback, data) {
    // Save data
    await sleep(2000);
    callback();
};

async function deleteEvent(callback, id) {
    // Delete event by id
    await sleep(2000);
    callback();
}

// Only to test
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};