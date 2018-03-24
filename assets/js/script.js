var images = [
    'a.jpg',
    'b.jpg',
    'd.jpg',
    'e.jpg',
    //'f.jpg', wrong aspect ratio
    'l.jpg',
    //'Picture 008.jpg',
    'Picture 013.jpg',
    //'Picture 023.jpg',
    //'Picture 028.jpg', tenant vacated
    'Picture 029.jpg',
    'Picture 030.jpg',
    'Picture 031.jpg',
    //'Picture 032.jpg',tenant vacated
    'Picture 033.jpg',
    'Picture 034.jpg',
    'Picture 035.jpg',
    'Picture 037.jpg',
    'Picture 038.jpg',
    'Picture 039.jpg',
    'Picture 040.jpg',
    'Picture 041.jpg',
    'Picture 043.jpg',
    'Picture 044.jpg',
    'Picture 045.jpg',
    'Picture 046.jpg',
    'Picture 047.jpg',
    //'Picture 048.jpg', wrong aspect ratio
    'Picture 051.jpg',
    'Picture 053.jpg',
    'Padstow finished 3 small.jpg'
];

filterStores = function (hash) {
    var anchor = hash;
    var $allStores = $('#content .stores h3');

    $('.stores p ').removeClass('showing');
    $allStores.removeClass('showing');
    $allStores.show();
    $allStores.nextAll('p').hide();
    $('.store-filter').removeClass('showing');

    if (anchor.length > 1) {
        var css = anchor.replace('#', '');
        var $a = $('.store-filter[href=\'' + anchor + '\']')
        var title = $a.text();
        $('h2').text(toSentenceCase(title));
        $a.addClass('showing');

        var $matchingStores = $('#content .stores h3.' + css);
        if ($matchingStores.length > 0) {
            $allStores.hide();
            $matchingStores.fadeIn(500);
        }
    }

}

responsiveLayout = function () {
    /*if the page is tall, make the content fill the width and so the h1 starts at the bottom of the bg photo*/

    var windowObj = $(window);
    var contentDiv = $('#content');
    var bgimg = $('#lo-res');
    var h1 = $('h1');

    if ($(windowObj).height() > $(windowObj).width()) {
        $('body').addClass('portrait');
        var offsetY = $(bgimg).height() - $(h1).outerHeight();
        $(contentDiv).css('margin-top', offsetY + 'px');

    } else {
        $('body').removeClass('portrait');
        $(contentDiv).css('margin-top', '0');

        /*set content to fill height so the darkened/blurred background extends to the bottom of the page*/
        var contentDiv = $('#content');
        var footerDiv = $('#footer');
        var windowObj = $(window);

        var winHeight = $(windowObj).height() - $(footerDiv).height();
        var contentHeight = $(contentDiv).height();
        if (winHeight > contentHeight) {
            $(contentDiv).height(winHeight);
        }
    }
}

function toSentenceCase(val) {
    return val.charAt(0).toUpperCase() + val.substr(1)
}

var img = '';
if (typeof defaultBg !== 'undefined') {
    img = defaultBg;
} else {
    var i = Math.floor((Math.random() * (images.length - 1)));
    img = images[i];
}

var src = 'assets/images/lo-res/' + img;
var imgLoRes = new Image();

imgLoRes.onload = function () {
    document.getElementById('lo-res').src = src;
    responsiveLayout();
    if (!isMobile) {
        document.getElementById('content').style.backgroundImage = 'url(\'' + src + '\')';
    }

    var src2 = 'assets/images/' + img;
    var imgHiRes = new Image();
    
    imgHiRes.onload = function () {
        document.getElementById('hi-res').onload = function () {
            $('#hi-res').fadeTo(0, 0.1).delay(1).fadeTo(400, 1); // the delay gives the high res image a moment to render before fading it all in
        }
        document.getElementById('hi-res').src = src2; //$('#hi-res').attr('src', src2);
        
    }
    imgHiRes.src = src2;
}
imgLoRes.src = src;





$(function () {

    //filter stores according to hash
    filterStores(window.location.hash);
    $(window).on('hashchange', function () {
        filterStores(window.location.hash);
    });

    if (isMobile) {
        $('div#content').addClass('mobile');
    }

    $(window).resize(function () {
        responsiveLayout();
    });

    $('#content .stores h3').nextAll('p,div').hide();

    $('#content .stores h3').click(function () {

        var $nextP = $(this).next('p');

        if (!$nextP.is(':visible')) {
            $('#content .stores h3, .stores p ').removeClass('showing');

            $(this).addClass('showing');
            $nextP.addClass('showing')

            $('#content .stores h3').nextAll('p').slideUp(300);
            $nextP.slideDown(300);
        }
    });

});
