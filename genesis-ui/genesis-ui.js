const RippleClass = ".ripple,.btn,.G_Accordion_Header";
const RippleInterval = 700; // in ms
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
const AccordionSettings = {
    className: ".G_Accordion",
    item: ".G_Accordion_Item",
    header: ".G_Accordion_Header",
    body: ".G_Accordion_Body"
};
const ModalSettings = {
    className: ".G_Modal",
    toggle: "data-modal-toggle",
    close: "data-modal-close",
};
const ToastSettings = {
    container: ".G_Toast_Container",
    selector: 'data-toast-toggle',
    interval: 'data-toast-interval',
    DefaultTime: 3000,
    type: 'data-toast-type',
    position: 'data-toast-position',
    html: 'data-toast-content',
};
const TabsSettings = {
    tabBar: "data-g-tab-target",
    toggle: 'data-g-tab',
};

// PreBuilt Functions
const getSiblings = (TargetNode) =>
    [...TargetNode.parentNode.children].filter(
        (siblings) => siblings !== TargetNode
    );
function GCollapse(collapse) {
    if (!collapse.classList.contains(openClass)) {
        /** Show the collapse. */
        collapse.classList.add(openClass);
        collapse.style.height = "auto";
        var height = collapse.clientHeight + "px";
        collapse.style.height = "0px";
        setTimeout(() => {
            collapse.style.height = height;
        }, 0);

    } else {
        collapse.style.height = "0px";
        collapse.addEventListener('transitionend', () => {
            collapse.classList.remove(openClass);
            collapse.removeAttribute("style");
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
        GCollapse(document.querySelector(toggler.getAttribute(CollapseAttribute)))
    });
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

    });
});


document.querySelectorAll(AccordionSettings.className).forEach((Accordion) => {
    Accordion.querySelectorAll(AccordionSettings.item).forEach((item) => {
        item.querySelector(AccordionSettings.header).addEventListener("click", () => {
            if (Accordion.hasAttribute("accordion-multiple") && Accordion.getAttribute("accordion-multiple") === "true") {
                item.classList.toggle(openClass);
                item.querySelector(AccordionSettings.header).classList.toggle(activeClass);
                GCollapse(item.querySelector(AccordionSettings.body));
            }
            else {
                item.classList.toggle(openClass);
                item.querySelector(AccordionSettings.header).classList.toggle(activeClass);
                GCollapse(item.querySelector(AccordionSettings.body));
                getSiblings(item).filter(sibling => sibling.classList.contains(openClass)).forEach((sibling) => {
                    sibling.classList.remove(openClass);
                    sibling.querySelector(AccordionSettings.header).classList.remove(activeClass);
                    sibling.querySelector(AccordionSettings.body).style.height = "0px";
                    sibling.querySelector(AccordionSettings.body).addEventListener('transitionend', () => {
                        sibling.querySelector(AccordionSettings.body).classList.remove(openClass);
                        sibling.querySelector(AccordionSettings.body).removeAttribute("style");
                    }, {
                        once: true
                    });
                });
            }
        });
    });

});


document.querySelectorAll(`[${ModalSettings.toggle}]`).forEach((ModalToggle) => {
    let modalId = ModalToggle.getAttribute(ModalSettings.toggle);
    let modal = document.querySelector(modalId);
    let modalBackDrop = modal.parentElement;
    let modalClose = modal.querySelectorAll(`[${ModalSettings.close}]`);

    ModalToggle.addEventListener("click", () => {
        modalBackDrop.classList.toggle(openClass);
        setTimeout(() => {

            modal.classList.toggle(openClass);
        }, 100);
    });
    modalClose.forEach((close) => {
        close.addEventListener("click", () => {
            modal.classList.remove(openClass);
            setTimeout(() => {

                modalBackDrop.classList.remove(openClass);
            }, 800);
        });
    });

    modalBackDrop.addEventListener("mouseup", function (e) {
        if (!modal.contains(e.target)) {
            modal.classList.remove(openClass);
            setTimeout(() => {

                modalBackDrop.classList.remove(openClass);
            }, 800);
        }
    });
});

document.querySelectorAll(`[${ToastSettings.selector}]`).forEach((ToastToggle) => {

    ToastToggle.addEventListener("click", () => {
        if (ToastToggle.getAttribute(ToastSettings.position) === null)
            ToastToggle.setAttribute(ToastSettings.position, "topRight");

        const TargetContainerSelector = `.${ToastSettings.container.slice(1)}.${ToastToggle.getAttribute(ToastSettings.position)}`;
        if (!document.querySelector(TargetContainerSelector)) {
            const container = document.createElement("div");
            container.className = TargetContainerSelector.split(".").join(" ");
            document.body.appendChild(container);
        }
        const ToastContainer = document.querySelector(TargetContainerSelector);

        const Toast = document.createElement("div");
        Toast.classList.add("G_Toast");
        Toast.innerHTML = ToastToggle.getAttribute(ToastSettings.html);
        ToastContainer.appendChild(Toast);
        setTimeout(() => {
            Toast.classList.add(activeClass);
        }, 50);
        if (ToastToggle.getAttribute(ToastSettings.interval)) {
            setTimeout(() => {
                Toast.classList.remove(activeClass);
                setTimeout(() => {
                    Toast.remove();
                    if (ToastContainer.innerHTML.length === 0)
                        ToastContainer.remove();
                }, 1000);
            }, ToastToggle.getAttribute(ToastSettings.interval) + 50);
        }
        else {
            setTimeout(() => {
                Toast.classList.remove(activeClass);
                setTimeout(() => {
                    Toast.remove();
                    if (ToastContainer.innerHTML.length === 0)
                        ToastContainer.remove();

                }, 1000);
            }, ToastSettings.DefaultTime + 50);
        }
    });
});




document.querySelectorAll(`[${TabsSettings.tabBar}]`).forEach((tabBar) => {
    tabBar.querySelectorAll(`[${TabsSettings.toggle}]`).forEach((toggle) => {
        toggle.addEventListener("click", () => {

            toggle.classList.add(activeClass);
            getSiblings(toggle).filter(sibling => sibling.classList.contains(activeClass)).forEach((sibling) => {
                sibling.classList.remove(activeClass);
            });
            const TargetContainer = document.querySelector(tabBar.getAttribute(TabsSettings.tabBar));
            const TargetTab = TargetContainer.querySelector('#' + toggle.getAttribute(TabsSettings.toggle));
            TargetTab.classList.add(openClass);
            getSiblings(TargetTab).filter(sibling => sibling.classList.contains(openClass)).forEach((sibling) => {
                sibling.classList.remove(openClass);
            });


        });
    });

});
