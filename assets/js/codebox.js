function loadCopyButton() {

    function loadCSS(e, t, n) {
        "use strict";
        var i = window.document.createElement("link");
        var o = t || window.document.getElementsByTagName("script")[0];
        i.rel = "stylesheet";
        i.href = e;
        i.media = "only x";
        o.parentNode.insertBefore(i, o);
        setTimeout(function() {
            i.media = n || "all";
        });
    }
    loadCSS(
        "https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&display=swap"
    );

    var highlight_js = document.createElement("script");

    function addCopyButtons(t) {
        document.querySelectorAll("pre > code").forEach(function(n) {
            var e = document.createElement("button");
            (e.className = "copyify"),
            (e.type = "button"),
            (e.innerHTML = 'Copy <i class="far fa-copy text-warning"></i>'),
            e.addEventListener("click", function() {
                t.writeText(n.innerText).then(
                    function() {
                        e.blur(),
                            (e.innerHTML =
                                'Copied <i class="fas text-danger fa-check"></i>'),
                            setTimeout(function() {
                                e.innerHTML = 'Copy <i class="fas fa-copy text-warning"></i>';
                            }, 1e3);
                    },
                    function(t) {
                        e.innerText = "Error";
                    }
                );
            });
            var o = n.parentNode;
            if (o.parentNode.classList.contains("highlight")) {
                var i = o.parentNode;
                i.parentNode.insertBefore(e, i);
            } else o.parentNode.insertBefore(e, o);
        });
    }
    if (
        ((highlight_js.src =
                "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"),
            (highlight_js.onload = function() {
                hljs.highlightAll();
            }),
            document.body.appendChild(highlight_js),
            navigator && navigator.clipboard)
    )
        addCopyButtons(navigator.clipboard);
    else {
        var copy_btn = document.createElement("script");
        (copy_btn.src =
            "https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js"),
        (copy_btn.integrity =
            "sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94="),
        (copy_btn.crossOrigin = "anonymous"),
        (copy_btn.onload = function() {
            addCopyButtons(clipboard);
        }),
        document.body.appendChild(copy_btn);
    }

}