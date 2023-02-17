$(document).ready(function() {
    $('#navbarSupportedContent').on('shown.bs.collapse', function() {
        $('body').addClass('lock-body');
    })
    $('#navbarSupportedContent').on('hidden.bs.collapse', function() {
        $('body').removeClass('lock-body');
    });
});