$(document).ready(function () {
    'use strict'; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
});

function sendContactForm(type) {
    $('#contact-success').hide();
    $('#contact-error').hide();

    var form = document.getElementById('contact-form');
    form.classList.add('was-validated');
    if (form.checkValidity() === true) {
        $.ajax({
            type: 'POST',
            url: 'https://prod-168.westeurope.logic.azure.com/workflows/2dd6d3e5e6704ed1afa801d769e4708b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=r26oUrw9V_-PToMEcu1HhY7w7-LQxyvK5H0M9U8knLc',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({ email: $('#contact-email').val(), text: type + '\n\n' + $('#contact-text').val(), source: 'rust' })
        }).done(function () {
            $('#contact-success').show();
        }).fail(function (error) {
            if (error.status === 202) {
                $('#contact-success').show();
            } else {
                $('#contact-error').show();
            }
        });
    }
}