function getEvents(callback) {
    // Hack to always load json new
    $.ajaxSetup({ cache: false });
    $.ajax({url:"https://raw.githubusercontent.com/lucahuber/opencalendar/master/server/sample-data.json", 
        success: function(response) {
            callback(JSON.parse(response));
        },
        error: function(response) {
            console.log(response);
        }
    });
}