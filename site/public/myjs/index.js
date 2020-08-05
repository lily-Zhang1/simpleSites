// Seamless scrolling
$(function() {
    var listPanel = $('.activity ul');
    var nubcers = 0;
    function up() {
        listPanel.animate({
            'top': (nubcers - 35) + 'px'
        }, 1500, 'linear', function() {
            listPanel.css({
                'top': '0px'
            })
                .find("li:first").appendTo(listPanel);
            up();
        });
    }
    up();
});