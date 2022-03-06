(function() {
    var observer = new IntersectionObserver(onIntersect);
    document.querySelectorAll("[data-src]").forEach((img) => {
        observer.observe(img);
    });

    function onIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.target.getAttribute("data-processed") || !entry.isIntersecting)
                return true;
            entry.target.setAttribute("src", entry.target.getAttribute("data-src"));
            entry.target.setAttribute("data-processed", true);
            entry.target.classList.remove("lazy");
        });
    }
})();

document.querySelector(".date").innerHTML = creditsyear.getFullYear();

//var script = document.createElement("script");
/////script.src = "";

//script.onload = function () {
///
//};
//document.body.appendChild(script);