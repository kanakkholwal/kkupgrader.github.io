const PageTitle = document.title;
document.getElementById('title').innerText = PageTitle;




var prism_js = document.createElement("script");

function addCopyButtons(t) {
    document.querySelectorAll("pre > code").forEach(function(n) {
        var e = document.createElement("button");
        (e.className = "copyify"),
        (e.classList.add("btn")),
        (e.type = "button"),
        (e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 4V2h10v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.994.994 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4H7zm0 2H5v14h14V6h-2v2H7V6zm2-2v2h6V4H9z" fill="rgba(0,143,229,1)"/></svg>'),
        e.addEventListener("click", function() {
            t.writeText(n.innerText).then(
                function() {
                    e.blur(),
                        (e.innerHTML =
                            ' <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><style>@keyframes check{to{stroke-dashoffset: 0;}}</style><path stroke="#0A0A30" stroke-linecap="round" stroke-width="1.5" d="M5.387 12.68l3.955 3.956 9.271-9.272" style="animation:check 2s infinite cubic-bezier(.99,-.1,.01,1.02)" stroke-dashoffset="100" stroke-dasharray="100"/></svg>'),
                        setTimeout(function() {
                            e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 4V2h10v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.994.994 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4H7zm0 2H5v14h14V6h-2v2H7V6zm2-2v2h6V4H9z" fill="rgba(0,143,229,1)"/></svg>';
                        }, 2000);
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
    ((prism_js.src =
            "https://kkupgrader.eu.org/plugins/prism/prism.js"),
        (prism_js.onload = function() {
            Prism.highlightAll();

        }),
        document.body.appendChild(prism_js),
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