$(document).on("click", ".dates ul li", function(e) {
    var date = moment();
    date.year($(".year-current span[year-val]").attr("year-val"));
    date.month($(".year-current span[month-val]").attr("month-val"));
    date.date($(this).attr("date"));
    
    // change popup to create new event or to display existing
});