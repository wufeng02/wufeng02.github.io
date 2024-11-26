$(function() {
    $.fn.selectText = function (cls) {
        return $(this).each(function (index, el) {
            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText(el);
                range.select().createTextRange();
                document.execCommand('Copy');
                if (cls)
                    document.selection.empty();
            } else if (window.getSelection) {
                var range = document.createRange();
                range.selectNode(el);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('Copy');
                if (cls)
                    window.getSelection().removeAllRanges();
            }
        });
    };

    $('#short').click(function(e) {
        e.preventDefault();

        var $el = $('#citation');
        $el.find('.cite_a').each(function() {
            var name = $(this).text().trim(), res = '';
            var items = name.split(' ');
            for (var i = 0; i < items.length; ++i) {
                if (i != items.length - 1)
                    res += items[i][0]
                else
                    res += ' ' + items[i]
            }
            $(this).text(res);
        });
        $el.find('.cite_p').each(function() {
            var proc = $(this).text().trim(), str = proc;
            $.each({'Proceedings': "Proc.",
             'International': "Int'l",
             'Conference': "Conf."
            }, function(k, v) { str = str.replace(k, v); });
            $(this).text(str);
        });
        $el.find('.cite_s').each(function() {
            var pages = $(this).text().trim(), str = pages;
            str = str.replace('pages', 'pp.');
            $(this).text(str);
        });
        $el.find('.cite_l').hide();
        $el.find('.cite_m').hide();

        $(this).prop('disabled', true);
    });

    $('#citation > span').dblclick(function() { $(this).selectText(); });

    $('#bibtex pre').each(function(){
      //var $code = $(this), html = $code.html();
      //$code.html(html.replace(/^\s+<span class="na">/gm, '\t<span class="na">'));
      /*
      var text = $(this).text().replace(/^\s+/gm, '\t')
        .replace(/\t}/gm, '}').replace(/([^,])\n\t/gm, '$1 ');
      $(this).text(text);
      */
    }).dblclick(function(){ $(this).selectText(); });

    $('#copy').click(function(e) {
        $(this).parent().next().selectText();
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
    $('#save').click(function(e) {
        save('{{bib.ID}}.bib', $(this).parent().next().text());
    });
    */

    $('span[itemprop=author]').click(function(e) {
        var query = $(this).text().trim();
        window.open('{{ SITEURL }}/search.html?q=' + query, '_blank');
    });

    $('[data-toggle="tooltip"]').tooltip();
});
