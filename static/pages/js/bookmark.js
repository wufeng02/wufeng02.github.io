$(function() {
    var GOOGLE_SCHOLAR_MIRROR = 's2.sci-hub.org.cn',
        ARXIV_ORG_MIRROR = 'arxiv.xilesou.top';

    function openMirror(self, patterns, mirror) {
        var text = $(self).find('input[type=text]').val();

        var url = null;
        patterns.forEach(function(pattern) {
            if (pattern.test(text)) {
                url = text.replace(pattern, mirror);
            }
        });
        if (url == null) {
            url = 'http://' + mirror;
        }
        window.open(url, '_blank');
    }

    $('#google_scholar').submit(function(e) {
        e.preventDefault();
        openMirror(this, [/scholar\.google\.[a-z]+/i], GOOGLE_SCHOLAR_MIRROR)
        return false;
    });

    $('#arxiv_org').submit(function(e) {
        e.preventDefault();
        openMirror(this, [/arxiv\.org/i], ARXIV_ORG_MIRROR);
        return false;
    });
});
