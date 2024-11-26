$(function() {
    'use strict';

    $.fn.selectText = function () {
        return $(this).each(function (index, el) {
            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText(el);
                range.select().createTextRange();
                document.execCommand('Copy');
                //document.selection.empty();
            } else if (window.getSelection) {
                var range = document.createRange();
                range.selectNode(el);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('Copy');
                //window.getSelection().removeAllRanges();
            }
        });
    };

    $.expr[':'].containsIgnoreCase = function (n, i, m) {
        //return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        return new RegExp(m[3], 'i').test(jQuery(n).text());
    };

    $('.close').css('padding', '0px 10px').click(function(e) {
        $(e.target.parentNode).hide();
    });

    $('.bibtex pre').each(function() {
        //var $code = $(this), html = $code.html();
        //$code.html(html.replace(/^\s+<span class="na">/gm, '\t<span class="na">'));
        /*
        var $code = $(this).find('code'),
            html = $code.html().replace(/^\s+/gm, '\t')
                .replace(/\t}/gm, '}').replace(/([^,])\n\t/gm, '$1 ');
        $code.html(html);
        */
    }).dblclick(function(e) {
        $(this).selectText();
    });

    $(document).on('click', '.copy', function() {
        $(this).parent().prev().selectText();
    });

    /*
    function save(filename, content) {
        var file = new Blob([content], {type: 'text/plain'});
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            var url = URL.createObjectURL(file);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
        }
    };
    $('.save').click(function() {
        var $pre = $(this).parent().prev();
        save($pre.parent().attr('id').replace('-', '.'), $pre.find('pre').text());
    });
    */

    $('#tipue_search_input').on('change paste keyup', function(e) {
        var query = $(this).val().trim().replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        query === '' ? $(this).removeClass('hovered') : $(this).addClass('hovered');

        var $pub = $('ul.publication'); $pub.find('li').hide().parent().prev().hide();
        $pub.find('li:containsIgnoreCase(' + query + ')').show().parent().prev().show();

        var count = 0;
        $pub.find('li').each(function() {
            if ($(this).is(':visible')) ++count;
        });
        $('#total').html(count);
    }).mouseenter(function(e) { $(this).select(); });

    $('span[itemprop=author], i[itemprop=name]>b, i.glyphicon-li').click(function(e) {
        var query = $(this).text();
        if ($(this).hasClass('glyphicon-li')) {
            query = $(this).hasClass('glyphicon-book') ? '@article' : '@inproceeding';
        }

        var $el = $('#tipue_search_input');
        if ($el.val() === query) {
            $el.val('');
            window.location.hash = '';
        } else {
            $el.val(query);
            window.location.hash = '##' + encodeURIComponent(query);
        }
        $el.trigger('change');
    });

    $.loadAbstract = function(id) {
        if (!$.paperAbstract) $.paperAbstract = {};
        if (!$.paperAbstract[id]) {
            var loading = 'Please wait for loading ...<br/>Click <a href="doc/htm/'+id+'.html" target="_blank">HERE</a> if not loaded.';
            var $abs = $('#'+id+'-abs').find('span[itemprop="description"]').html(loading);
            $.get('doc/htm/'+id+'.abs', function(data) {
                $abs.html(data);
            });
            $.paperAbstract[id] = true;
        }
        $('#' + id + '-abs').toggle();
    };

    $.loadBibtex = function(id) {
        if (!$.paperBibtex) $.paperBibtex = {};
        if (!$.paperBibtex[id]) {
            var loading = 'Please wait for loading ...<br/>Click <a href="doc/htm/'+id+'.html" target="_blank">HERE</a> if not loaded.';
            var $bib = $('#'+id+'-bib').find('div[itemprop="highlight"]').html(loading);
            var $helper = $('#bib-helper');
            $.get('doc/htm/'+id+'.hls', function(data) {
                $bib.html(data);
                $($helper.html().replace(/ID/g, id)).insertAfter($bib);
            });
            $.paperBibtex[id] = true;
        }
        $('#' + id + '-bib').toggle();
    };

    var hash = window.location.hash;
    if (hash && hash.startsWith('##')) {
        var query = decodeURIComponent(hash.substring(2));

        var $el = $('#tipue_search_input');
        $el.val($el.val() === query ? '' : query).trigger('change');
    }
});
