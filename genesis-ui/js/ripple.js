  function RippleElement(element = ".ripple") {

    document.querySelectorAll(element).forEach((el) => {
        if(!el.classList.contains("ripple")) el.classList.add("ripple");
        el.addEventListener("click", (e) => {
            var RippleElement = document.createElement("div");
            RippleElement.className = "ripple-effect";
            if (e.target.getAttribute("data-ripple-color").length > 0)
                RippleElement.style.setProperty("--ripple-background", e.target.getAttribute("data-ripple-color"));

            e.target.appendChild(RippleElement);
            e = e.touches ? e.touches[0] : e;
            const r = el.getBoundingClientRect(),
                d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
            RippleElement.style.cssText = `--s: 0; --o: 1;`;
            RippleElement.offsetTop;
            RippleElement.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left
                }; --y:${e.clientY - r.top};`;
            setTimeout(function () {
                RippleElement.remove("ripple");
            }, 600);
        });
    });


}

