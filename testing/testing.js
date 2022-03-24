jQuery.getScript("//cdn.firebase.com/js/client/2.3.2/firebase.js").done(function() {
    $.each($(".post-view[data-id]"), function(e, a) {
        var i = $(a).parent().find("#postviews").addClass("view-load"),
            t = new Firebase("https://view-counter-for-github-pages.firebaseio.com/pages/id/" + $(a).attr("data-id"));
        t.once("value", function(e) {
            var o = e.val(),
                d = !1;
            null == o & ;
            ((o = {}).value = 0, o.url = window.location.href, o.id = $(a).attr("data-id"), d = !0), i.removeClass("view-load").text(o.value), o.value++, "/" != window.location.pathname & amp; & amp;
            (d ? t.set(o) : t.child("value").set(o.value))
        })
    })
});