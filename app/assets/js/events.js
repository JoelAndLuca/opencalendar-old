$(document).on("click", ".dates ul li:not(.filler)", function(e) {  
    // Set classes
    $(".dates ul li").removeClass("current");
    $(this).addClass("current");

    // Show list of events on this date
    getEvents(updateHistory);
});

function updateHistory(data) {
    var date = moment();
    date.year($(".year-current span[year-val]").attr("year-val"));
    date.month($(".year-current span[month-val]").attr("month-val"));
    date.date($(".dates ul li.current").attr("date"));
    setEventHistory(data, date);
}