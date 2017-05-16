$(document).ready(function() {
    $.ajax({url:"../server/sample-data.json", success: function(data) {
        console.log(data);
    }, error: function(error) {
        console.log(error);
    }});
});