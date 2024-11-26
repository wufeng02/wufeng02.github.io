(function() {
    $.each({
        'google': 'https://scholar.go'+'og'+'le.com/citations?user=8CEHlu4AAAAJ',
        'facebook': 'https://www.fa'+'ceb'+'ook.com/fengw',
        'twitter': 'https://tw'+'it'+'ter.com/wufeng02',
        'linkedin': 'https://www.li'+'nke'+'din.com/pub/feng-wu/62/438/2a2'
    }, function(key, val) {
        $('.icon-'+key).parent().attr('href', val);
    });
})();
