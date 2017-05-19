/*
    app.js

    Code that handles communication between backend and frontend.
*/

function getEvents(callback) {
    // Hack to always load json without cache.
    $.ajaxSetup({ cache: false });

    $.ajax({url:"https://raw.githubusercontent.com/lucahuber/opencalendar/master/server/sample-data.json", 
        success: function(response) {
            var parsedData = JSON.parse(response);
            parsedData.sort(function(a, b) {
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
            })
            callback(parsedData);
        },
        error: function(response) {
            console.log(response);
        }
    });
};

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