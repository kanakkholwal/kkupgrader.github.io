function GenesisTabs() {
    var GBindAll = function() {
        var GTabToggles = document.querySelectorAll('[data-g-tab]');
        for (var i = 0; i < GTabToggles.length; i++) {
            GTabToggles[i].addEventListener('click', GChange, false);
            if (!GTabToggles[i].classList.contains('active')) {
                GTabToggles[0].classList.add('active');
                var firstId = GTabToggles[0].getAttribute('data-g-tab');
                document.getElementById(firstId).classList.add('show');
            }
        }
    }

    var GClear = function() {
        var GTabToggles = document.querySelectorAll('[data-g-tab]');
        for (var i = 0; i < GTabToggles.length; i++) {
            GTabToggles[i].classList.remove('active');
            var id = GTabToggles[i].getAttribute('data-g-tab');
            document.getElementById(id).classList.remove('show');
        }
    }

    var GChange = function(e) {
        GClear();
        e.target.classList.add('active');
        var id = e.currentTarget.getAttribute('data-g-tab');
        document.getElementById(id).classList.add('show');
    }

    GBindAll();
}

var connectTabs = new GenesisTabs();