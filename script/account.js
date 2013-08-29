$(function() {
    var url = 'https://account.wandoujia.com/v4/api/profile';
    var timeout = 5000;
    var timer = setTimeout(function() {
        window.location.href = 'https://account.wandoujia.com/v1/user/?do=login&callback=http://www.wandoujia.com/wandoujia/marketing-oscar-follow/';
    }, timeout);
    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        dataType: 'jsonp',
        timeout: timeout
    }).done(function(data) {
        clearTimeout(timer);
    }).fail(function(e) {
        window.location.href = 'https://account.wandoujia.com/v1/user/?do=login&callback=http://www.wandoujia.com/wandoujia/marketing-oscar-follow/';
    });
});