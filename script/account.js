$(function() {
    var url = 'https://account.wandoujia.com/v4/api/profile';
    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        dataType: 'jsonp'
    }).done(function(data) {
        console.log(data);
    }).fail(function(e) {
        window.location.href = 'https://account.wandoujia.com/v1/user/?do=login&callback=http://www.wandoujia.com/wandoujia/marketing-oscar-follow/';
    });
});