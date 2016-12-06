var messenger = (function($){
    var self = {};
    config = {
        htmlContainer: 'body'
    };
    self.init = function(settings) {
        $.extend( config, settings );
        $(config.htmlContainer).on('click touchstart', '.messenger .close', function(e){
            e.preventDefault();
            close($(this).parents('.messenger'));
        });
    };
    self.send = function(message, type, autoclose) {
        if(typeof type == 'undefined' || type === '')
            var type = 'info';

        var html = '<div class="messenger bg-' + type + '">'
                    +  '<div class="media">'
                    +    '<div class="media-body">'
                    +       message
                    +    '</div>'
                    +    '<div class="media-right media-middle">'
                    +      '<a class="close pull-right" href="#">'
                    +        '<img src="assets/icn-close@3x.png" />'
                    +      '</a>'
                    +    '</div>'
                    +  '</div>'
                    +'</div>';

        // Append html to container
        var messengerBox = $(html);
        $(config.htmlContainer).append(messengerBox);
        messengerBox.animate({ top: ( calculateHeight() ) + 'px' }, 10);
        messengerBox.addClass('open');

        // Auto close
        var _this = this;
        if(autoclose) {
            setTimeout(function(){
                close(messengerBox);
            }, 5000);
        }
    };
    calculateHeight = function() {
        var height = 0;
        $('.messenger.open').each(function( index ) {
            height += $(this).outerHeight();
        });
        return height;
    };
    close = function(elt) {
        elt.removeClass('open');
        elt.animate({ top: '-200px' }, 10, function(){
            setTimeout(function() {
              elt.remove();
            }, 1200);
        });
        resetBoxPosition();
    };
    resetBoxPosition = function() {
        if( $('.messenger.open').length > 0 ) {
            $('.messenger.open').each(function( index ) {
                $(this).animate({ top: ( index * $(this).outerHeight() ) + 'px' }, 10);
            });
        }
    };
    return self;
})(jQuery);
