$(document).ready(function() {
    initializeCalendar();
});

function initializeCalendar() {
    moment.locale(window.navigator.language);

    var lastYear = moment().year() - 1;
    var currentYear = moment().year();
    var currentMonth = moment.months(moment().months());
    var nextYear = moment().year() + 1;

    $(".year-before").append(lastYear);
    $(".year-current").append("<span>" + currentYear + "</span>");
    $(".year-current").append("<span>" + currentMonth + "</span>");
    $(".year-after").append(nextYear);
    
    var weekdays = moment.weekdaysShort(true);
    weekdays.forEach(function(day) {
        $("ul.weekdays").append("<li>" + day + "</li>");
    });

    var daysInMonth = moment().daysInMonth();

    var currentDay = new Date().getDate();

    var posOfFirstDate = moment().weekday(1).day();
    var emptyStart = posOfFirstDate - 2;
   
    var week = 1;
    for(i = 1; i <= daysInMonth; i++) {
        if(i == 1) {
            $("div.dates").append("<ul week=" + week + ">");
        }

        if(i < emptyStart) {
            $("ul[week=" + week + "]").append("<li class='filler'></li>");    
        } else {
            if(i == currentDay) {
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
    while(i % 7 != 0) {
        $("ul[week=" + week + "]").append("<li class='filler'></li>");
        i++;
    }

    $(".events-header").append("<p>" + moment().format('dddd Mo') + "</p>");
}