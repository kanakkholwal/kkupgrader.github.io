const sidenav_toggler = document.querySelectorAll(".sidenav-toggler,.sidenav-close");
var sidenav = document.querySelector(".sidenav");

sidenav_toggler.forEach(toggler => {
    toggler.addEventListener('click', () => sidenav.classList.toggle("show"));
});
// On outside Click of sidenav close the menu
document.addEventListener('mouseup', function(e) {
    if (!sidenav.contains(e.target)) {
        sidenav.classList.remove("show");
    }
});


// Collapse List and Rotate Icon
let sidenav_collapse = document.querySelectorAll(".sidenavify-collapse");
sidenav_collapse.forEach(collapse => {
    const newLocal = 'active';
    collapse.addEventListener('click', () => collapse.classList.toggle(newLocal));
    collapse.addEventListener('click', () => collapse.querySelector('ul.collapse-list').classList.toggle("show"));
    collapse.addEventListener('click', () => collapse.querySelector('a:first-child .icon-status').classList.toggle("rotate"));
    collapse.querySelector('a:first-child').removeAttribute("class");
});

const darkToggle = document.querySelector('.darkmode-toggler');
var darkMode = false;
// default to system setting
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode = true;
}

// preference from localStorage should overwrite
if (localStorage.getItem('theme') === 'dark') {
    darkMode = true;
} else if (localStorage.getItem('theme') === 'light') {
    darkMode = false;
}

if (darkMode) {
    document.body.classList.toggle('dark');
    darkToggle.querySelector('.fa-moon').classList.toggle('fas');
}

document.addEventListener('DOMContentLoaded', () => {

    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        darkToggle.querySelector('.fa-moon').classList.toggle('fas');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

});
// Make Images UnDraggable
let draggable = true;
if (draggable) {
    const UnDraggables = document.querySelectorAll('img');
    UnDraggables.forEach(UnDraggable => {
        UnDraggable.setAttribute('draggable', 'false');
    });
}
// Genesis Collapse
function GCollapse(collapse) {
    if (!collapse.classList.contains('active')) {
        /** Show the collapse. */
        collapse.classList.add('active');
        collapse.style.height = "auto";

        var height = collapse.clientHeight + "px";


        collapse.style.height = "0px";


        setTimeout(() => {
            collapse.style.height = height;
        }, 0);

    } else {
        collapse.style.height = "0px";

        collapse.addEventListener('transitionend', () => {
            collapse.classList.remove('active');
        }, {
            once: true
        });
    }

}

// Genesis Component : Collapse

const collapseBtns = document.querySelectorAll('[data-g-collapse-target]');
collapseBtns.forEach(collapseBtn => {
    let collapseId = collapseBtn.getAttribute('data-g-collapse-target');
    let collapseArea = document.querySelector(collapseId);
    collapseBtn.addEventListener('click', () => GCollapse(collapseArea));
});


// Genesis Component : Accordion
const accordions = document.querySelectorAll('.g-accordion');
accordions.forEach(accordion => {
    let accordionItems = accordion.querySelectorAll(".g-accordion-item");
    accordionItems.forEach(accordionItem => {
        let accordionHeader = accordionItem.querySelector(".g-accordion-header");
        let accordionBody = accordionItem.querySelector(".g-accordion-body");

        accordionHeader.addEventListener("click", function() {
            let sibs = accordionItem.parentElement.children;
            let i;
            for (i = 0; i < sibs.length; i++) {
                sibs[i].classList.remove('expanded');
                sibs[i].querySelector('.g-accordion-header').classList.remove('expanded');
                GCollapse(sibs[i].querySelector('.g-accordion-body'));

            }
            //   accordionItem.classList.remove('expanded');
            //   accordionHeader.classList.remove('active');
            GCollapse(accordionBody);
            accordionHeader.parentElement.querySelector('.g-accordion-header').classList.add('active');
            accordionHeader.parentElement.classList.add('expanded');
            //  GCollapse(accordionHeader.parentElement.querySelector('.g-accordion-body'));

        });
    });
});

// Modal

const ModalToggles = document.querySelectorAll('[data-target-modal]');
ModalToggles.forEach(ModalToggle => {
    let ModalTarget = ModalToggle.getAttribute('data-target-modal');
    let ModalId = document.querySelector(ModalTarget);
    let ModalArea = ModalId.parentElement;
    let ModalClose = ModalId.querySelector('.modal-close');

    ModalToggle.addEventListener('click', () => ModalArea.classList.add('open'));
    ModalClose.addEventListener('click', () => ModalArea.classList.remove('open'));

    ModalArea.addEventListener('mouseup', function(e) {
        if (!ModalId.contains(e.target)) {
            ModalArea.classList.remove('open');
        }
    });
});

// Toasts


document.addEventListener('DOMContentLoaded', function() {
    var toastContainer = document.querySelector(".g-toast-container");
    if (toastContainer.length == 0) {
        var toastContainerContent = '<div class="g-toast-container"></div>'
        document.querySelector("body").innerHTML += toastContainerContent;
    }

});




function GenesisToast(type, title, body, duration) {
    // Create Toast Element
    let GToastElement = document.createElement("div");
    GToastElement.classList.add('g-toast');
    // Add Class For Toast Type 
    if (type) { GToastElement.classList.add(`g-toast-${type}`); }
    // Adding Header 
    var GToastHeader = document.createElement("div");
    GToastHeader.classList.add('g-toast-header');
    // Adding Title
    var GToastTitle = document.createElement("div");
    GToastTitle.classList.add('g-toast-title');
    // Adding Close Button
    var GToastClose = document.createElement("div");
    GToastClose.classList.add('g-toast-close');
    GToastClose.classList.add('icon-btn');
    GToastClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>';
    //  GToastHeader.innerHTML = +GToastClose;
    // Adding Body 
    var GToastBody = document.createElement("div");
    GToastBody.classList.add('g-toast-body');
    GToastBody.innerHTML = body;
    // Setting Icon types
    var iconType = "";
    if (type == "info") { iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg></span>`; } else if (type == "success") { iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg></span>`; } else if (type == "warning") { iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg></span>`; } else if (type == "danger") { iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.936 2.5L21.5 8.067v7.87L15.936 21.5h-7.87L2.5 15.936v-7.87L8.066 2.5h7.87zm-.829 2H8.894L4.501 8.895v6.213l4.393 4.394h6.213l4.394-4.394V8.894l-4.394-4.393zM11 15h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg></span>`; }

    // append icon to title element with title text
    GToastTitle.innerHTML += iconType + title;
    GToastHeader.appendChild(GToastTitle);
    GToastHeader.appendChild(GToastClose);
    // Merging Toast HTML
    GToastElement.appendChild(GToastHeader);
    GToastElement.appendChild(GToastBody);
    //append toast message to it
    var toastContainer = document.querySelector(".g-toast-container");
    toastContainer.appendChild(GToastElement);

    // wait just a bit to add active class to the message to trigger animation
    setTimeout(function() {
        GToastElement.classList.add('active');
    }, 1);

    // Setting Up Durations
    if (duration > 0) {
        // it it's bigger then 0 add it
        setTimeout(function() {
            GToastElement.classList.remove('active');
            setTimeout(function() {
                GToastElement.remove();
            }, 350);
        }, duration);
    } else if (duration == null) {
        //  it there isn't any add default one (3000ms)
        setTimeout(function() {
            GToastElement.classList.remove('active');
            setTimeout(function() {
                GToastElement.remove();
            }, 350);
        }, 3000);
    }

    // Closing And Removing Toast
    let CloseToastElements = document.querySelectorAll('.g-toast-close');
    CloseToastElements.forEach(CloseToastElement => {
        let ownToast = CloseToastElement.parentElement.parentElement;
        CloseToastElement.addEventListener('click', () => ownToast.classList.remove('active'));
        CloseToastElement.addEventListener('click', () => ownToast.remove());

    });
}





document.addEventListener('click', function(e) {
    //check is the right element clicked
    if (!e.target.matches('.g-toast-toggle')) return;
    else {
        //create toast message with dataset attributes
        GenesisToast(e.target.dataset.gToastType, e.target.dataset.gToastTitle, e.target.dataset.gToastHtml, e.target.dataset.gToastDuration);
    }
});


// Genesis Component : Tooltip
// const GenesisTooltips=document.querySelectorAll("[data-g-tooltip-title]");GenesisTooltips.forEach(GenesisTooltip=>{let GenesisTooltipElement=document.createElement("div");GenesisTooltipElement.classList.add("g-tooltip"),GenesisTooltip.addEventListener("onmouseenter",(function(){let GenesisTooltipPlacement=GenesisTooltip.getAttribute("data-g-tooltip-placement"),GenesisTooltipTitle=GenesisTooltip.getAttribute("data-g-tooltip-title");GenesisTooltipElement.classList.add(`g-tooltip-`),GenesisTooltipElement.innerHTML=GenesisTooltipTitle,GenesisTooltip.appendChild(GenesisTooltipElement)})),GenesisTooltip.addEventListener("onmouseleave",(function(){GenesisTooltip.removeChild(GenesisTooltipElement)}))});

// Genesis Component : Tabs

function GenesisTabs() {


    var GClear = function() {
        var GTabAreas = document.querySelectorAll('[data-g-tab-target]');
        for (var t = 0; t < GTabAreas.length; t++) {
            var GTabToggles = GTabAreas[t].querySelectorAll('[data-g-tab]');
            for (var i = 0; i < GTabToggles.length; i++) {
                GTabToggles[i].classList.remove('active');
            }

            let targetId = GTabAreas[t].getAttribute('data-g-tab-target');
            let targetArea = document.getElementById(targetId);
            let targetAreaContent = targetArea.getElementsByClassName('g-tab-content');

            for (let n = 0; n < targetAreaContent.length; n++) {
                targetAreaContent[n].classList.remove('show');
            }
        }
    }

    var GChange = function(e) {
        GClear();
        e.target.classList.add('active');
        var id = e.currentTarget.getAttribute('data-g-tab');
        document.getElementById(id).classList.add('show');
    }
    var GBindAll = function() {
        var GTabAreas = document.querySelectorAll('[data-g-tab-target]');
        for (var t = 0; t < GTabAreas.length; t++) {
            var GTabToggles = GTabAreas[t].querySelectorAll('[data-g-tab]');
            for (var i = 0; i < GTabToggles.length; i++) {
                GTabToggles[i].addEventListener('click', GChange, false);
                if (!GTabToggles[i].classList.contains('active')) {
                    GTabToggles[0].classList.add('active');
                    var firstId = GTabToggles[0].getAttribute('data-g-tab');
                    document.getElementById(firstId).classList.add('show');
                }
            }
        }
    }
    GBindAll();
}

var connectTabs = new GenesisTabs();