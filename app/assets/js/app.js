function getEvents(callback) {
    $.ajax({url:"https://raw.githubusercontent.com/lucahuber/opencalendar/master/server/sample-data.json", 
        success: function(response) {
            callback(JSON.parse(response));
        },
        error: function(response) {
            console.log(response);
        }
    });
}