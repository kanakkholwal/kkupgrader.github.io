$.each($("a[name]"), function(i, e) {
    var elem = $(e).parent().find('#postviews');
    var blogStats = new Firebase("https://view-counter-for-github-pages.firebaseio.com/pages/id/" + $(e).attr('name'));
    blogStats.once('value', function(snapshot) {
        var data = snapshot.val();
        var isnew = false;
        if (data == null) {
            data = {};
            data.value = 0;
            data.url = window.location.href;
            data.id = $(e).attr('name');
            isnew = true;
        }
        elem.text(data.value);
        data.value++;
        if (window.location.pathname != '/') {
            if (isnew)
                blogStats.set(data);
            else
                blogStats.child('value').set(data.value);
        }
    });
});