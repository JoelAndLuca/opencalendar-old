$(document).ready(function() {
    var now = moment();
    initializeCalendar(now);
});

$(".next").click(function() {
    var value = moment();
    var month = $(".year-current span[month-val]").attr("month-val");
    var year = $(".year-current span[year-val]").attr("year-val");
    value.year(year);
    month ++;
    value.month(month);
    value.date(1);
    initializeCalendar(value);
});

$(".previous").click(function() {
    var value = moment();
    var month = $(".year-current span[month-val]").attr("month-val");
    var year = $(".year-current span[year-val]").attr("year-val");
    value.year(year);
    month --;
    value.month(month);
    value.date(1);
    initializeCalendar(value);
});

function initializeCalendar(value) {
    clearCalendar();
    moment.locale(window.navigator.language);
    
    var today = moment();
    var displayCurrent = (today.month() == value.month()) && (today.year() == value.year());

    var lastYear = value.year() - 1;
    var nextYear = value.year() + 1;
    var weekdays = moment.weekdaysShort(true);
    var daysInMonth = value.daysInMonth();
    
    // Build calendar header
    $(".year-before").append(lastYear);
    $(".year-current").append("<span year-val='" + value.year() + "'>" + value.year() + "</span>");
    $(".year-current").append("<span month-val='" + value.month() + "'>" + moment.months()[value.month()] + "</span>");
    $(".year-after").append(nextYear);
    $(".events-header").append("<p>" + moment().format('dddd Mo') + "</p>");
    
    // Build weekdays.
    weekdays.forEach(function(day) {
        $("ul.weekdays").append("<li>" + day + "</li>");
    });

    // Build calendar
    var firstWeekDay = value.day();
    var week = 1;

    var liFiller = "<li class='filler'></li>";

    for(i = 1; i <= daysInMonth; i++) {
        if(i == 1) {
            $("div.dates").append("<ul week=" + week + ">");
        }

        if(firstWeekDay > i) {
            $("ul[week=" + week + "]").append(liFiller);    
        } else {
            if(i == value.date() && displayCurrent) {
                $("ul[week=" + week + "]").append("<li class='current'>" + i + "</li>");
            } else {
                $("ul[week=" + week + "]").append("<li>" + i + "</li>");
            }
        }
                
        if(i % 7 == 0) {
            week ++;
            $("div.dates").append("</ul>");
            if(i != 31)
            {
                $("div.dates").append("<ul week=" + week + ">");
            }
        }
    }
    i--;
    while(i % 7 != 0) {
        $("ul[week=" + week + "]").append(liFiller);
        i++;
    }
}

function clearCalendar() {
    $(".year-before").empty();
    $(".year-current").empty();
    $(".year-after").empty();
    $("ul.weekdays").empty();
    $("div.dates").empty();
    $(".events-header").empty();
}