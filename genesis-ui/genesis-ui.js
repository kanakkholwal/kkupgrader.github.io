const RippleClass = ".ripple,.btn";
const RippleInterval = 600;
const CollapseAttribute = "data-collapse-toggle";
const SidenavAttribute = "data-sidenav-toggle";
const SidenavClass = "G_Sidenav";
const openClass = "isOpen";
const activeClass = "isActive";
const ArrowHTML = `<i class="fas fa-angle-up arrow"></i>`;
const SidenavCollapse = {
    Element: ".SidenavCollapse",
    Toggle: ".collapseToggle",
    List: ".collapseList"
};
function GCollapse(collapse) {
    if (!collapse.classList.contains(openClass)) {
        /** Show the collapse. */
        console.log("Opening the Collapse");

        collapse.classList.add(openClass);
        console.log(openClass + " class is added to collapse");
        collapse.style.height = "auto";
        console.log(" height set to auto");
        
        var height = collapse.clientHeight + "px";
        
        console.log(" height variable set to " + height);
        
        collapse.style.height = "0px";
        console.log(" height  set to 0");
        
        
        setTimeout(() => {
            collapse.style.height = height;
            console.log(" height variable set to " + height);
        }, 0);

    } else {
        console.log("Closing the Collapse");

        collapse.style.height = "0px";
        console.log(" height variable set to 0px");

        collapse.addEventListener('transitionend', () => {
            collapse.classList.remove(openClass);
            console.log(openClass + " class is removed");

        }, {
            once: true
        });
    }

}
document.querySelectorAll(RippleClass).forEach((el) => {
    if (!el.classList.contains("ripple")) el.classList.add("ripple");
    el.addEventListener("click", (e) => {
        var RippleElement = document.createElement("div");
        RippleElement.className = "ripple-effect";
        if (e.target.hasAttribute("data-ripple-color") && e.target.getAttribute("data-ripple-color").length > 0)
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
            RippleElement.remove();
        }, RippleInterval);
    });
});

document.querySelectorAll(`[${CollapseAttribute}]`).forEach((toggler) => {
    toggler.addEventListener("click", () => {
        console.log(document.querySelector(toggler.getAttribute(CollapseAttribute)));
        GCollapse(document.querySelector(toggler.getAttribute(CollapseAttribute)))
    });
    // toggler.addEventListener("click", () => GCollapse(document.querySelector(toggler.getAttribute(CollapseAttribute))));
});

document.querySelectorAll(`[${SidenavAttribute}]`).forEach((toggler) => {

    toggler.addEventListener("click", () => document.querySelector(toggler.getAttribute(SidenavAttribute)).classList.toggle(openClass));
});
Array.from(document.getElementsByClassName(SidenavClass)).forEach((sidenav) => {
    document.addEventListener('mouseup', function (e) {
        if (!sidenav.contains(e.target)) {
            sidenav.classList.remove(openClass);
        }
    });
});

document.querySelectorAll(SidenavCollapse.Element).forEach((Collapse) => {
    Collapse.querySelector(SidenavCollapse.Toggle).insertAdjacentHTML('beforeend', ArrowHTML);
    Collapse.querySelector(SidenavCollapse.Toggle).addEventListener("click", () => {

        Collapse.querySelector(SidenavCollapse.Toggle).classList.toggle(activeClass);
        GCollapse(Collapse.querySelector(SidenavCollapse.List))
        // Collapse.querySelector(SidenavCollapse.List).classList.toggle(openClass);

    });
});




