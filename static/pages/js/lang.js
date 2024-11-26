function langHide(l) {
    document.write('<style type="text/css">:lang('+l+') { display: none; }</style>');
};
try {
    var storage = (sessionStorage || localStorage || {
        setItem: function(key, val) {},
        getItem: function(key) {}
    }),
    queries = (function(query) {
      var results = {};
      if (!query || (query = query.trim()) === '') {
        return results;
      }
      var parts = query.split('&');
      for (var i = 0; i < parts.length; ++i) {
        var pair = parts[i].split('=');
        var key = pair[0].toLowerCase().trim();
        if (key === '') continue;
        var value = pair.length > 1 ? pair[1].trim() : '';
        results[decodeURIComponent(key)] = decodeURIComponent(value);
      }
      return results;
    })(window.location.search.substring(1));

    var lang = queries['l'] || queries['lang'], key = 'user::language';
    if (!lang) lang = storage.getItem(key);
    else storage.setItem(key, lang);
    if (!lang) {
        lang = navigator.languages? navigator.languages[0] :
            (navigator.language || navigator.userLanguage
            || navigator.browserLanguage || navigator.systemLanguage);
        if (lang) storage.setItem(key, lang);
    }
    if (lang && lang.trim().toLowerCase().indexOf('zh') >= 0)
        langHide('en');
    else langHide('zh');

    if ($) {
        $.storage = storage;
        $.queries = queries;
    }
} catch(e) { langHide('zh'); }
