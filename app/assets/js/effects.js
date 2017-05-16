$( document ).ready(function() {
    var modalbg = $('.cd-modal-bg'),
        content = $('.cd-modal-content'),
        section = $('.cd-section');

    function scaleValue( topValue, leftValue, radiusValue, windowW, windowH) {
        var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
            maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
        return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
    }

    $(document).keyup(function(e) {
        if (e.keyCode === 27) closeModal();
    });

    $('.cd-modal-content .close').on('click', function() {
        closeModal();
    });

    $('[data-type="modal-trigger"]').on('click', function(e){

        var action = $(this),
            posX = e.pageX - section.position().left - (modalbg.width() / 2),
            posY = e.pageY - section.position().top - (modalbg.height() / 2),
            scaleValue = retrieveScale(modalbg, posX, posY);

        provideData(action.data());
        modalbg.addClass('is-visible');
        animateLayer(modalbg, 20, true, 600);
    });

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

    function provideData(data) {
        content.find('#cd-modal-content-title').text(data['title']);
        content.find('#cd-modal-content-location span').text(data['location']);
        content.find('#cd-modal-content-time span').text(data['time']);
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

    function closeModal() {
        section.removeClass('modal-is-visible');
        animateLayer(modalbg, 1, false, 500);
    }

});