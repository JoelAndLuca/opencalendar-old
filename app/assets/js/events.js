var modalbg = $('.cd-modal-bg'),
    content = $('.cd-modal-content'),
    section = $('.cd-section');

$(document).on("click", ".dates ul li:not(.filler)", function(e) {  
    // Set classes
    $(".dates ul li").removeClass("current");
    $(this).addClass("current");

    // Show list of events on this date
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
        "title" : $("#cd-modal-content-title").text(),
        "description": $("#cd-modal-content-description").text(),
        "location" : $("#cd-modal-content-location").text(),
        "time" : $("#cd-modal-content-time").text()
    };
    createModalContent(data, true);
});

function createModalContent(data, isEdit) {
    content.empty();

    var titleVal = "";
    var descriptionVal = "";
    var locationVal = "";
    var timeVal = "";

    if(data != null) {
        titleVal = data['title'];
        descriptionVal = data['description'];
        locationVal = data['location'];
        timeVal = data['time'];
    }

    var titleContent = titleVal;
    var descriptionContent = descriptionVal;
    var locationContent = locationVal;
    var timeContent = timeVal;

    if(data == null || isEdit) {
        titleContent = "<input type='text' placeholder='Title' value='" + titleVal + "'></input>";
        descriptionContent = "<input type='text' placeholder='Description' value='" + descriptionVal + "'></input>";
        locationContent = "<input type='text' placeholder='Location' value='" + locationVal + "'></input>";
        timeContent = "<input type='time' placeholder='Time' value='" + timeVal + "'></input>";
    }

    content.append("<i class='fa fa-times close' aria-hidden='true'></i>");
    if(data != null && !isEdit) {
        content.append("<i class='fa fa-pencil edit' aria-hidden='true'></i>");
    }
    content.append("<h1 id='cd-modal-content-title'>" + titleContent + "</h1>");
    content.append("<h2 id='cd-modal-content-description'>" + descriptionContent + "</h2>");
    content.append("<div id='cd-modal-content-location'><i class='fa fa-map-marker' aria-hidden='true'></i><span>" + locationContent + "</span>");
    content.append("<div id='cd-modal-content-time'><i class='fa fa-clock-o' aria-hidden='true'></i><span>" + timeContent + "</span></div>");
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