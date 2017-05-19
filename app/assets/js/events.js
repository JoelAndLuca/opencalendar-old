/*
    event.js

    All functions and events that have to do with CRUD of events.
*/

var modalbg = $('.cd-modal-bg'),
    content = $('.cd-modal-content'),
    section = $('.cd-section');

$(document).on("click", ".dates ul li:not(.filler)", function(e) {  
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

    createModalContent(null, false);
    modalbg.addClass('is-visible');
    animateLayer(modalbg, 20, true, 600);
});

$(document).on("click", ".edit", function(e) {
    var data = {
        "id" : 1,
        "title" : $("#cd-modal-content-title").text(),
        "description": $("#cd-modal-content-description").text(),
        "location" : $("#cd-modal-content-location").text(),
        "time" : $("#cd-modal-content-time").text()
    };
    createModalContent(data, true);
});

$(document).on("click", "#cd-modal-content-action-save", function() {
    var event = {
        "id" : 1,
        "title" : $("#cd-modal-content-title input").val(),
        "description": $("#cd-modal-content-description textarea").val(),
        "location" : $("#cd-modal-content-location input").val(),
        "time" : $("#cd-modal-content-time input").val()
    };
    // Set loading-animation
    showLoadingAnimation();
    saveEvent(onSaveFinish, event);
});

$(document).on("click", ".cd-modal-content .delete", function() {
    var eventId = content.attr('event-id');
    showLoadingAnimation();
    deleteEvent(onSaveFinish, eventId);
});

function onSaveFinish() {
    closeModal();
    getEvents(setEventHistory);
}

function createModalContent(data, isEdit) {
    content.empty();

    var id = -1;
    var titleVal = "";
    var descriptionVal = "";
    var locationVal = "";
    var timeVal = "";

    if(data != null) {
        id = data["id"];
        titleVal = data['title'];
        descriptionVal = data['description'];
        locationVal = data['location'];
        timeVal = data['time'];
    }

    content.attr('event-id', id);

    var titleContent = titleVal;
    var descriptionContent = descriptionVal;
    var locationContent = locationVal;
    var timeContent = timeVal;
    var actionContent = "";

    if(data == null || isEdit) {
        titleContent = "<input id='cd-modal-content-title' type='text' placeholder='Title' value='" + titleVal + "'></input>";
        descriptionContent = "<textarea id='cd-modal-content-description' placeholder='Description'>" + descriptionVal + "</textarea>";
        locationContent = "<input id='cd-modal-content-location' type='text' placeholder='Location' value='" + locationVal + "'></input>";
        timeContent = "<input id='cd-modal-content-time' type='time' placeholder='Time' value='" + timeVal + "'></input>";
        actionContent = "<div id='cd-modal-content-action-save'><i class='fa fa-check fa-5x' aria-hidden='true'></i></div>";
    }

    content.append("<i class='fa fa-times close' aria-hidden='true'></i>");
    if(data != null && !isEdit) {
        content.append("<i class='fa fa-pencil edit' aria-hidden='true'></i>");
    }
    if(data != null && isEdit) {
        content.append("<i class='fa fa-trash-o delete' aria-hidden='true'></i>");
    }
    content.append("<h1 id='cd-modal-content-title'>" + titleContent + "</h1>");
    content.append("<h2 id='cd-modal-content-description'>" + descriptionContent + "</h2>");
    content.append("<div id='cd-modal-content-location'><i class='fa fa-map-marker' aria-hidden='true'></i><span>" + locationContent + "</span>");
    content.append("<div id='cd-modal-content-time'><i class='fa fa-clock-o' aria-hidden='true'></i><span>" + timeContent + "</span></div>");
    content.append(actionContent);
}

function provideData(data) {
    content.find('#cd-modal-content-title').text(data['title']);
    content.find('#cd-modal-content-description').text(data['description']);
    content.find('#cd-modal-content-location span').text(data['location']);
    content.find('#cd-modal-content-time span').text(data['time']);
}

function updateHistory(data) {
    var date = moment();
    date.year($(".year-current span[year-val]").attr("year-val"));
    date.month($(".year-current span[month-val]").attr("month-val"));
    date.date($(".dates ul li.current").attr("date"));
    setEventHistory(data, date);
}