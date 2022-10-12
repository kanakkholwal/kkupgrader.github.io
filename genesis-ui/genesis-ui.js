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
const ToolTipSettings = {
    selector: 'data-tooltip-toggle',
    position: 'data-tooltip-position',
    html: 'data-tooltip-content',
};
const SlicedMenuSetting = {
    container: '.G_Sliced-menu',
    outer: '.G_Sliced-Outer-menuList',
    inner: '.G_Sliced-Inner-menuList',
    item: '.G_Sliced-menuItem',
    selector: 'data-G-Sliced-toggle',
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

document.querySelectorAll(`[${ToolTipSettings.selector}]`).forEach((ToolTipToggle) => {

    ToolTipToggle.addEventListener("click", () => {
        if (ToolTipToggle.getAttribute(ToolTipSettings.position) === null)
            ToolTipToggle.setAttribute(ToolTipSettings.position, "Top");


    });
});

document.querySelectorAll(SlicedMenuSetting.container).forEach((SlicedMenu) => {
    const inner = SlicedMenu.querySelector(SlicedMenuSetting.inner);
    const outer = SlicedMenu.querySelector(SlicedMenuSetting.outer);
    const outerHeight = outer.clientHeight + 'px'
    SlicedMenu.style.height = outerHeight;

    Array.from(outer.querySelectorAll(SlicedMenuSetting.item))
        .filter(toggle => toggle.hasAttribute(SlicedMenuSetting.selector) && toggle.getAttribute(SlicedMenuSetting.selector) !== null)
        .forEach((toggle) => {
            const target = inner.querySelector('#' + toggle.getAttribute(SlicedMenuSetting.selector));

            toggle.insertAdjacentHTML("beforeend", `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`)
            toggle.addEventListener("click", () => {
                SlicedMenu.style.height = "auto";

                SlicedMenu.classList.add(openClass);
                target.classList.add(activeClass);

                SlicedMenu.style.height = "auto";
                SlicedMenu.addEventListener('transitionstart', () => {
                    SlicedMenu.style.height = "auto";
                }, {
                    once: true
                });
                SlicedMenu.addEventListener('transitionend', () => {
                    SlicedMenu.style.height = target.clientHeight + 'px';
                }, {
                    once: true
                });
                getSiblings(target).filter(sibling => sibling.classList.contains(activeClass)).forEach((sibling) => {
                    sibling.classList.remove(activeClass);
                });
            });
            const exitBtn = target.firstElementChild.cloneNode(true);
            exitBtn.innerText = toggle.textContent;
            exitBtn.classList.add("exitBtn");
            exitBtn.insertAdjacentHTML("afterbegin", `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`);
            target.insertAdjacentElement("afterbegin", exitBtn);
            exitBtn.addEventListener("click", () => {
                SlicedMenu.classList.remove(openClass);
                SlicedMenu.style.height = "auto";
                SlicedMenu.addEventListener('transitionend', () => {
                    SlicedMenu.style.height = outerHeight;
                }, {
                    once: true
                });
            })
            Array.from(target.parentElement.children).filter(sibling => !sibling.classList.contains(activeClass)).forEach((sibling) => {
                sibling.classList.add(activeClass);
            });
        });

    document.addEventListener('mouseup', function (e) {
        if (!SlicedMenu.contains(e.target)) {
            SlicedMenu.classList.remove(openClass);
            SlicedMenu.style.height = "auto";
            SlicedMenu.addEventListener('transitionend', () => {
                SlicedMenu.style.height = outerHeight;
            }, {
                once: true
            });
        }
    });
})


