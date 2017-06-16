/*
    calendar.js

    Initializes, updates and handles all calendar related things.
*/

$(document).ready(function() {
    var now = moment();
    initializeComponents(now, 0);
});

function initializeComponents(value, animationDirection) {
    closeModal();
    initializeCalendar(value, animationDirection);
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
    initializeComponents(value, 1);
});

$(".previous").click(function() {
    var value = moment();
    var month = $(".year-current span[month-val]").attr("month-val");
    var year = $(".year-current span[year-val]").attr("year-val");
    value.year(year);
    month --;
    value.month(month);
    value.date(1);
    initializeComponents(value, -1);
});

$(".back-to-today").click(function() {
    var value = moment();
    var month = $(".year-current span[month-val]").attr("month-val");
    var year = $(".year-current span[year-val]").attr("year-val");
    var currentVal = moment();
    currentVal.date(1);
    currentVal.month(month);
    currentVal.year(year);
    var animationDirection = 1;
    if(value.isBefore(currentVal)) {
        animationDirection = -1;
    }
    initializeComponents(value, animationDirection);
});

$(document).on("click", ".year-after", function() {
    var value = moment();
    value.month(0);
    value.date(1);
    var year = $(".year-current span[year-val]").attr("year-val");
    year++;
    value.year(year);
    initializeComponents(value, 1);
});

$(document).on("click", ".year-before", function() {
    var value = moment();
    value.month(0);
    value.date(1);
    var year = $(".year-current span[year-val]").attr("year-val");
    year--;
    value.year(year);
    console.log(value);
    initializeComponents(value, -1);
});

function showAdditionalInformation() {
    $(".back-to-today").slideDown();
}

function hideAdditionalInformation() {
    $(".back-to-today").slideUp();
}

function initializeCalendar(value, animationDirection) {
    clearCalendar(animationDirection);
    moment.locale(window.navigator.language);
    
    var today = moment();
    var displayCurrent = (today.month() == value.month()) && (today.year() == value.year());

    if(displayCurrent) {
        value.date(today.date());
        hideAdditionalInformation();
    } else {
        showAdditionalInformation();
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
        
    // Build weekdays.
    $(".slide").append("<div class='calendar-content'></div>");
    $(".calendar-content").append("<ul class='weekdays'></ul>");
    weekdays.forEach(function(day) {
        $("ul.weekdays").append("<li>" + day + "</li>");
    });

    // Generate the calendar
    // Calculate dates
    var dates = [];
    var liFiller = "<li class='filler'></li>";
    var firstDayOfMonth = moment();
    firstDayOfMonth.date(1);
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
                contentString = "<li class='current today' date='" + dateCount + "'>" + dateCount + "</li>";
            } else {
                contentString = "<li date='" + dateCount + "'>" + dateCount + "</li>";
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

    if(animationDirection == -1) {
        $(".slide").show("slide", { direction: "left" }, 300);
    } else if(animationDirection == 1) {
        $(".slide").show("slide", { direction: "right" }, 300);
    }
}

function clearCalendar(animationDirection) {
    if(animationDirection == -1) {
        $(".slide").hide("slide", { direction: "right" }, 300);
    } else if(animationDirection == 1) {
        $(".slide").hide("slide", { direction: "left" }, 300);
    }
    $(".slide").empty();
    $(".year-before").empty();
    $(".year-current").empty();
    $(".year-after").empty();
}

function initializeEvents(data) {
    // Add all events to event-list.
    setEventHistory(data, moment());

    // Add all events to calendar.
    setEventsInCalendar(data);
}

function setEventHistory(data, selectedDate) {
    if(selectedDate == null) {
        selectedDate = moment();
        selectedDate.date($(".dates ul li.current").attr("date"));
        selectedDate.month($(".year-current span[month-val]").attr("month-val"));
        selectedDate.year($(".year-current span[year-val]").attr("year-val"));
    }

    $(".events-header").empty();
    var events = data;
    // Set events for selected day
    $(".events-header").append("<h1>Events</h1>");
    $(".events-header").append("<h2>" + selectedDate.format("DD.MM.YYYY") + "</h2>");
    var originalData = events;
    events = originalData.filter(function(event) {
        var parsedDate = moment(event.date);
        var day = parsedDate.date();
        var month = parsedDate.month();
        var year = parsedDate.year();
        return (selectedDate.date() == day) && (selectedDate.month() == month) && (selectedDate.year() == year);
    });
    
    // Set the history content
    var i = 0;
    $(".event-history").empty();
    events.forEach(function(event) {
        var dateMoment = moment(event.date);
        $(".event-history").append("<div class='event' data-type='modal-trigger' data-id='" + event._id + "' data-name='" + event.name + "' data-location='" + event.location + "' data-date='" + dateMoment + "' data-description='" + event.description + "'></div>");
        var eventContainer = $(".event[data-id=" + event._id + "]");
        eventContainer.append("<h1>" + event.name + "</h1>");
        eventContainer.append("<p>" + moment().to(dateMoment) + "</p>");
        $(".event-history").append("<hr/>");
        i++;
    });

    // Set the actions
    $(".event-history").append("<div class='event-controls'></div>")
    $(".event-controls").append("<i class='fa fa-plus' aria-hidden='true'></i> New Event");
}

function setEventsInCalendar(data) {
    // Set dates in calendar.
    data.forEach(function(event) {
        var date = moment(event.date);
        if((date.month() == $(".year-current span[month-val]").attr("month-val")) && (date.year() == $(".year-current span[year-val]").attr("year-val"))) {
            // In this calendar-scope - display!
            var day = date.date();
            $(".dates ul li[date=" + day + "]").addClass("has-event");
        }
    });
}