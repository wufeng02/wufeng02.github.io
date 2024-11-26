$(function() {
    'use strict';

    var translate = function(lang) {
        var key = 'user::language';
        if (lang)
            $.storage.setItem(key, lang);
        else
            lang = $.storage.getItem(key);

        if (lang && lang.trim().toLowerCase().indexOf('zh') >= 0) {
            $(':lang(zh)').show();
            $(':lang(en)').hide();
        } else {
            $(':lang(zh)').hide();
            $(':lang(en)').show();
        }
    },

    play = function(url) {
        if (!this.audio) {
            this.audio = new Audio(url);
        } else {
            this.audio.pause();
        }
        this.audio.play();
    };

    var key = 'user::scroll', scroll;
    $(document).scroll(function(e) {
        $.storage.setItem(key, $(document).scrollTop());
    });
    if (scroll = $.storage.getItem(key)) {
        $(document).scrollTop(scroll);
    }

    $(window).scroll(function() {
        var st = $(this).scrollTop();
        if (st > 100) $('#scrollup').fadeIn(450);
        else $('#scrollup').fadeOut(450);
        return true;
    });
    $('#scrollup').on('inserted.bs.popover', function() {
        translate();
    });

    $('[data-toggle="popover"]').popover({html: true});

    $('[data-toggle="lightbox"]').click(function(e) {
        e.preventDefault();
        var $lb = $('#lightbox'), src = $(this).attr('href');

        var $el = (/\.(gif|jpg|jpeg|tiff|png|bmp)$/i).test(src) ?
            $('<img style="max-width: 100%; max-height: 75vh; cursor: pointer;"/>').click(function(e) {
                window.open(src, '_blank');
            }):$('<iframe frameborder="0" style="width: 100%; height: 75vh;" allowfullscreen />');
        $el.attr('src', src);

        $lb.find('.modal-dialog').attr('style', $(this).attr('data-style') || '');
        $lb.find('.modal-title').html($(this).attr('data-title'));
        $lb.find('.modal-body').empty().append($el);
        $lb.find('.close').show();

        var $mc = $lb.find('.modal-content')
            .css('width','').css('top', '').css('left', '');

        var $mb = $lb.find('.modal-body').css('width','').css('height','');
        $mb.mousedown(function() {
            $mb.on('mousemove.resize', function() {
                var ow = $mc.css('width'), nw = $mb.css('width');
                if (ow !== nw) { $mc.css('width', nw); }
            });
        });

        var $mh = $lb.find('.modal-header');
        $mh.mousedown(function(e1) {
            var initX = e1.clientX - parseInt($mc.css('left'), 10);
            var initY = e1.clientY - parseInt($mc.css('top'), 10);
            $mh.on('mousemove.move', function(e2) {
                var currX = e2.clientX - initX;
                var currY = e2.clientY - initY;
                $mc.css({'left': currX + 'px', 'top': currY + 'px'});
            });
        });
        $('body').mouseup(function() {
            $mh.off('mousemove.move');
            $mb.off('mousemove.resize');
        });

        $lb.modal('show').on('shown.bs.modal', function() { translate(); });

        return false;
    });

    $.translate = translate;
    $.play = play;
});
