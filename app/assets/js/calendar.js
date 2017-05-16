$(document).ready(function() {
    initializeComponents();
});

function initializeComponents() {
    var now = moment();
    initializeCalendar(now);
    getEvents(initializeEvents);
}

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

    if(displayCurrent) {
        value.date(today.date());
    }

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
    $(".calendar-content").append("<ul class='weekdays'></ul>");
    weekdays.forEach(function(day) {
        $("ul.weekdays").append("<li>" + day + "</li>");
    });

    // Generate the calendar
    // Calculate dates
    var dates = [];
    var liFiller = "<li class='filler'></li>";
    var firstDayOfMonth = moment();
    firstDayOfMonth.day(1);
    firstDayOfMonth.month(value.month());
    firstDayOfMonth.year(value.year());
    var firstDate = firstDayOfMonth.day();
    var dateCount = 1;
    for(i = 1; i <= (6*7); i++) {
        var contentString = "";
        if(i < firstDate || dateCount > daysInMonth) {
            contentString = liFiller;
        } else {
            if(i == value.date() && displayCurrent) {
                contentString = "<li class='current'>" + dateCount + "</li>";
            } else {
                contentString = "<li>" + dateCount + "</li>";
            }
            dateCount  ++;
        }
        var date = {
            content: contentString
        };
        dates.push(date);
    }

    // Build rows
    $(".calendar-content").append("<div class='dates'></div>");
    for(i = 0; i < 6; i++) {
        $("div.dates").append("<ul week=" + i + "></ul>");
    }

    // Buld dates
    var week = 0;
    for(i = 0; i < (6*7); i++) {
        $(".dates ul[week=" + week + "]").append(dates[i].content);
        if((i+1) % 7 == 0 && i != 0) {
            week++;
        }
    }   
}

function clearCalendar() {
    $(".calendar-content").empty();
    $(".year-before").empty();
    $(".year-current").empty();
    $(".year-after").empty();
    $("ul.weekdays").empty();
    $("div.dates").empty();
    $(".events-header").empty();
}

function initializeEvents(data) {
    var i = 0;
    data.forEach(function(event) {
        $(".event-history").append("<div class='event' data-type='modal-trigger' data-title='" + event.title + "' data-location='" + event.location + "' data-time='" + event.time + "' data-event='" + i + "'></div>");
        var eventContainer = $(".event[data-event=" + i + "]");
        eventContainer.append("<h1></h1>");
        eventContainer.append("<p></p>");
        i++;
    });
}