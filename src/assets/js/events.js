/*
    event.js

    All functions and events that have to do with CRUD of events.
*/

var modalbg = $('.cd-modal-bg'),
    content = $('.cd-modal-content'),
    section = $('.cd-section');

$(document).on("click", ".dates ul li:not(.filler)", function(e) {  
    closeModal();
    // Set classes
    $(".dates ul li").removeClass("current");
    $(this).addClass("current");

    // Show list of events on this date
    $(".event-history").empty();
    $(".event-history").append("<i class='fa fa-circle-o-notch fa-spin fa-5x fa-fw'></i>");
    getEvents(updateHistory);
});

$(document).on('click', '[data-type="modal-trigger"]', function(e) {
    var action = $(this),
        posX = e.pageX - section.position().left - (modalbg.width() / 2),
        posY = e.pageY - section.position().top - (modalbg.height() / 2),
        scaleValue = retrieveScale(modalbg, posX, posY);

    createModalContent(action.data(), false);
    modalbg.addClass('is-visible');
    animateLayer(modalbg, 20, true, 600);
});

$(document).on("click", ".event-controls", function(e) {
    var action = $(this),
        posX = e.pageX - section.position().left - (modalbg.width() / 2),
        posY = e.pageY - section.position().top - (modalbg.height() / 2),
        scaleValue = retrieveScale(modalbg, posX, posY);

    // Default date value for new event.
    var date = moment();
    date.date($(".dates ul li.current").attr("date"));
    date.month($(".year-current span[month-val]").attr("month-val"));
    date.year($(".year-current span[year-val]").attr("year-val"));
    date.hour(12);
    date.minute(00);

    var newEventData = {
        "date" : date.format("DD.MM.YYYY hh:mm")
    }
    createModalContent(newEventData, true);
    modalbg.addClass('is-visible');
    animateLayer(modalbg, 20, true, 600);
});

$(document).on("click", ".edit", function(e) {
    var data = {
        "id" : $(".cd-modal-content").attr("data-id"),
        "name" : $("#cd-modal-content-title").text(),
        "description": $("#cd-modal-content-description").text(),
        "location" : $("#cd-modal-content-location").text(),
        "date" : $("#cd-modal-content-date").val() + " " + $("#cd-modal-content-time").text()
    };
    createModalContent(data, true);
});

$(document).on("click", "#cd-modal-content-action .save", function() {
    var date = moment($("#cd-modal-content-date").val() + " " + $("#cd-modal-content-time input").val(), "DD.MM.YYYY hh:mm");
    var event = {
        "_id" : $(".cd-modal-content").attr("data-id"),
        "name" : $("#cd-modal-content-title input").val(),
        "description": $("#cd-modal-content-description textarea").val(),
        "location" : $("#cd-modal-content-location input").val(),
        "date" : date.toJSON(),
        "calendarId" : 1
    };
    // Set loading-animation
    showLoadingAnimation();
    saveEvent(onSaveFinish, event);
});

$(document).on("click", ".cd-modal-content .delete", function() {
    var eventId = content.attr('data-id');
    showLoadingAnimation();
    deleteEvent(onSaveFinish, eventId);
});

function onSaveFinish(success, message) {
    if(success) {
        closeModal();
        var currentSelectedDate = moment($("#cd-modal-content-date").val() + " " + $("#cd-modal-content-time input").val(), "DD.MM.YYYY hh:mm");
        initializeComponents(moment(), 0);
        $(".dates ul li[date='" + currentSelectedDate.date() + "']")[0].click();
    } else {
        showError(message);
    }
}

function createModalContent(data, isEdit) {
    content.empty();

    var _id = -1;
    var nameVal = "";
    var descriptionVal = "";
    var locationVal = "";
    var dateVal = data['date'];

    if(data != null && data['id'] != null) {
        _id = data['id'];
        nameVal = data['name'];
        descriptionVal = data['description'];
        locationVal = data['location'];
    }

    var tempDate = moment(dateVal);
    if(!tempDate.isValid()) {
        tempDate = moment(dateVal, "DD.MM.YYYY hh:mm");
    }
    dateVal = tempDate;

    content.attr('data-id', _id);

    var nameContent = nameVal;
    var descriptionContent = descriptionVal;
    var locationContent = locationVal;
    var dateContent = dateVal.format("hh:mm");
    var actionContent = "";

    if(isEdit) {
        nameContent = "<input id='cd-modal-content-title' type='text' placeholder='Title' value='" + nameVal + "'></input>";
        descriptionContent = "<textarea id='cd-modal-content-description' placeholder='Description'>" + descriptionVal + "</textarea>";
        locationContent = "<input id='cd-modal-content-location' type='text' placeholder='Location' value='" + locationVal + "'></input>";
        dateContent = "<input id='cd-modal-content-time' type='time' placeholder='Date' value='" + dateVal.format("hh:mm") + "'></input>";
        actionContent = "<div id='cd-modal-content-action'><div class='save'><i class='fa fa-check fa-5x' aria-hidden='true'></i></div></div>";
    }

    content.append("<i class='fa fa-times close' aria-hidden='true'></i>");
    if(data != null && !isEdit) {
        content.append("<i class='fa fa-pencil edit' aria-hidden='true'></i>");
    }
    if(data != null && isEdit && _id != -1) {
        content.append("<i class='fa fa-trash-o delete' aria-hidden='true'></i>");
    }
    content.append("<h1 id='cd-modal-content-title'>" + nameContent + "</h1>");
    content.append("<h2 id='cd-modal-content-description'>" + descriptionContent + "</h2>");
    content.append("<div id='cd-modal-content-location'><i class='fa fa-map-marker' aria-hidden='true'></i><span>" + locationContent + "</span>");
    content.append("<div id='cd-modal-content-time'><i class='fa fa-clock-o' aria-hidden='true'></i><span>" + dateContent + "</span></div>");
    content.append("<input id='cd-modal-content-date' type='hidden' value='" + dateVal.format("DD.MM.YYYY") + "'></input>");
    content.append(actionContent);
}

function provideData(data) {
    content.find('#cd-modal-content-title').text(data['name']);
    content.find('#cd-modal-content-description').text(data['description']);
    content.find('#cd-modal-content-location span').text(data['location']);
    content.find('#cd-modal-content-time span').text(data['date']);
}

function updateHistory(data) {
    var date = moment();
    date.year($(".year-current span[year-val]").attr("year-val"));
    date.month($(".year-current span[month-val]").attr("month-val"));
    date.date($(".dates ul li.current").attr("date"));
    setEventHistory(data, date);
}