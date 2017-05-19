function getEvents(callback) {
    // Hack to always load json new
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
}

function saveEvent(callback, data) {
    // Save data
    callback();
}