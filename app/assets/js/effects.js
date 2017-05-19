/*
    effects.js

    Handles all effects that affect the whole page.
*/

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
            closeModal();
            $(".dates ul li:not(.filler)").removeClass("current");
    }
});

$(document).on("click", ".cd-modal-content .close", function() {
    closeModal();
});

function closeModal() {
    section.removeClass('modal-is-visible');
    animateLayer(modalbg, 1, false, 500);
}

function showLoadingAnimation() {
    $("#cd-modal-content-action-save").empty();
    $("#cd-modal-content-action-save").addClass('loader');
    $("#cd-modal-content-action-save").append("<i class='fa fa-circle-o-notch fa-spin fa-5x fa-fw'></i>");
}

function scaleValue( topValue, leftValue, radiusValue, windowW, windowH) {
    var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
        maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
    return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
}

function retrieveScale(elem, offsetLeft, offsetTop) {
    var btnRadius = elem.width()/2,
        left = elem.offset().left + btnRadius,
        top = elem.offset().top + btnRadius - $(window).scrollTop(),
        scale = scaleValue(top, left, btnRadius, section.height(), section.width());

    elem.css('position', 'absolute').velocity({
        top: offsetTop,
        left: offsetLeft,
        translateX: 0
    }, 0);

    return scale;
}

function animateLayer(layer, scaleVal, bool, time) {
    var content = $('.cd-modal-content');
    layer.velocity({ scale: scaleVal }, time, function() {
        if(!bool) layer.removeClass('is-visible').removeAttr( 'style' );

    });


    if(bool) {
        section.addClass('modal-is-visible');

        content.css({opacity: 0, display: 'flex'}).animate({
            opacity: 1
        }, time);
    } else {
        content.fadeOut(time);

    }
}