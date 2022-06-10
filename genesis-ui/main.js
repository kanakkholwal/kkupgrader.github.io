const sidenav_toggler = document.querySelectorAll(
  ".sidenav-toggler,.sidenav-close"
);
var sidenav = document.querySelector(".sidenav");

sidenav_toggler.forEach((toggler) => {
  toggler.addEventListener("click", () => sidenav.classList.toggle("show"));
});
// On outside Click of sidenav close the menu
document.addEventListener("mouseup", function (e) {
  if (!sidenav.contains(e.target)) {
    sidenav.classList.remove("show");
  }
});

// Collapse List and Rotate Icon
let sidenav_collapse = document.querySelectorAll(".sidenavify-collapse");
sidenav_collapse.forEach((collapse) => {
  const newLocal = "active";
  collapse.addEventListener("click", () => collapse.classList.toggle(newLocal));
  collapse.addEventListener("click", () =>
    collapse.querySelector("ul.collapse-list").classList.toggle("show")
  );
  collapse.addEventListener("click", () =>
    collapse
      .querySelector("a:first-child .icon-status")
      .classList.toggle("rotate")
  );
  collapse.querySelector("a:first-child").removeAttribute("class");
});

const darkToggle = document.querySelector(".darkmode-toggler");
var darkMode = false;
// default to system setting
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  darkMode = true;
}

// preference from localStorage should overwrite
if (localStorage.getItem("theme") === "dark") {
  darkMode = true;
} else if (localStorage.getItem("theme") === "light") {
  darkMode = false;
}

if (darkMode) {
  document.body.classList.toggle("dark");
  darkToggle.querySelector(".fa-moon").classList.toggle("fas");
}

document.addEventListener("DOMContentLoaded", () => {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkToggle.querySelector(".fa-moon").classList.toggle("fas");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
});
// Make Images UnDraggable
let draggable = true;
if (draggable) {
  const UnDraggables = document.querySelectorAll("img");
  UnDraggables.forEach((UnDraggable) => {
    UnDraggable.setAttribute("draggable", "false");
  });
}
// Genesis Collapse
function GCollapse(collapse) {
  if (!collapse.classList.contains("active")) {
    /** Show the collapse. */
    collapse.classList.add("active");
    collapse.style.height = "auto";

    var height = collapse.clientHeight + "px";

    collapse.style.height = "0px";

    setTimeout(() => {
      collapse.style.height = height;
    }, 0);
  } else {
    collapse.style.height = "0px";

    collapse.addEventListener(
      "transitionend",
      () => {
        collapse.classList.remove("active");
      },
      {
        once: true,
      }
    );
  }
}
// PreBuilt Functions for Accordion
const getSiblings = (TargetNode) =>
  [...TargetNode.parentNode.children].filter(
    (siblings) => siblings !== TargetNode
  ); // Gives Object Output

const SlideUp = (item, ItemShowClass) => {
  item.style.height = "0px";
  item.addEventListener(
    "transitionend",
    () => {
      item.classList.remove(ItemShowClass);
    },
    {
      once: false,
    }
  );
};

const SlideDown = (item, ItemShowClass) => {
  item.classList.add(ItemShowClass);
  item.style.height = "auto";

  var height = item.clientHeight + "px";

  item.style.height = "0px";

  setTimeout(() => {
    item.style.height = height;
  }, 0);
};

// Genesis Component : Collapse

const collapseBtns = document.querySelectorAll("[data-g-collapse-target]");
collapseBtns.forEach((collapseBtn) => {
  let collapseId = collapseBtn.getAttribute("data-g-collapse-target");
  let collapseArea = document.querySelector(collapseId);
  collapseBtn.addEventListener("click", () => GCollapse(collapseArea));
});

// Genesis Component : Accordion
const accordions = document.querySelectorAll(".g-accordion");
accordions.forEach((accordion) => {
  var multiple = accordion.getAttribute("accordion-multiple");
  var accordionItems = accordion.querySelectorAll(".g-accordion-item");
  accordionItems.forEach((accordionItem) => {
    var accordionHeader = accordionItem.querySelector(".g-accordion-header");
    var accordionBody = accordionItem.querySelector(".g-accordion-body");

    accordionHeader.addEventListener("click", function (e) {
      if (multiple === "false") {
        // Close Sibling Accordions
        var siblingsOfTargetAccordion = getSiblings(e.target.parentElement);
        siblingsOfTargetAccordion.forEach((sibling) => {
          sibling.classList.remove("expanded");
          sibling
            .querySelector(".g-accordion-header")
            .classList.remove("active");
          sibling.querySelector(".g-accordion-body").style.height = "0px";
          sibling.querySelector(".g-accordion-body").addEventListener(
            "transitionend",
            () => {
              sibling
                .querySelector(".g-accordion-body")
                .classList.remove("active");
              sibling
                .querySelector(".g-accordion-body")
                .removeAttribute("style");
            },
            {
              once: true,
            }
          );

          // SlideUp(sibling.querySelector(".g-accordion-body"), "active");
        });

        // Toggle Target Accordion
        e.target.parentElement.classList.toggle("expanded");
        e.target.classList.toggle("active");
        var currentBody =
          e.target.parentElement.querySelector(".g-accordion-body");
        function slideUp(el) {
          el.style.height = "0px";
          el.addEventListener(
            "transitionend",
            () => {
              el.classList.remove("active");
              el.removeAttribute("style");
            },
            { once: true }
          );
        }
        function slideDown(el) {
          el.classList.add("active");
          el.style.height = "auto";
          var height = el.clientHeight + "px";
          el.style.height = "0px";

          setTimeout(() => {
            el.style.height = height;
          }, 0);
        }
        // e.target.parentElement.querySelector(".g-accordion-body").classList.contains("active") ? slideUp(e.target.parentElement.querySelector(".g-accordion-body")) : slideDown(e.target.parentElement.querySelector(".g-accordion-body"));
        // if (currentBody.classList.contains("active")) {
        //   slideUp(currentBody);
        // } else {
        //   slideDown(currentBody);
        // }

        //  WHY IS THIS NOT WORKING 😭😭😭😭
        GCollapse(currentBody);

        // console.log("Single Accordion Working");
        //
      } else {
        accordionItem.classList.toggle("expanded");
        accordionHeader.classList.toggle("active");
        GCollapse(accordionBody);
        console.log("Multiple Accordion Working");
      }
    });
  });
});

// Modal : Done !!!

const ModalToggles = document.querySelectorAll("[data-target-modal]");
ModalToggles.forEach((ModalToggle) => {
  let ModalTarget = ModalToggle.getAttribute("data-target-modal");
  let ModalId = document.querySelector(ModalTarget);
  let ModalArea = ModalId.parentElement;
  let ModalClose = ModalId.querySelector(".modal-close");

  ModalToggle.addEventListener("click", () => {
    ModalArea.classList.add("open");
    ModalId.classList.add("show");
  });
  ModalClose.addEventListener("click", () => {
    setTimeout(() => {
      ModalArea.classList.remove("open");
    }, 600);
    ModalId.classList.remove("show");
  });

  ModalArea.addEventListener("mouseup", function (e) {
    if (!ModalId.contains(e.target)) {
      setTimeout(() => {
        ModalArea.classList.remove("open");
      }, 600);
      ModalId.classList.remove("show");
    }
  });
});

// Toasts : Done !!!

document.addEventListener("DOMContentLoaded", function () {
  var toastContainer = document.querySelector(".g-toast-container");
  if (toastContainer.length == 0) {
    var toastContainerContent = '<div class="g-toast-container"></div>';
    document.querySelector("body").innerHTML += toastContainerContent;
  }
});

function GenesisToast(type, title, body, duration) {
  // Create Toast Element
  let GToastElement = document.createElement("div");
  GToastElement.classList.add("g-toast");
  // Add Class For Toast Type
  if (type) {
    GToastElement.classList.add(`g-toast-${type}`);
  }
  // Adding Header
  var GToastHeader = document.createElement("div");
  GToastHeader.classList.add("g-toast-header");
  // Adding Title
  var GToastTitle = document.createElement("div");
  GToastTitle.classList.add("g-toast-title");
  // Adding Close Button
  var GToastClose = document.createElement("div");
  GToastClose.classList.add("g-toast-close");
  GToastClose.classList.add("icon-btn");
  GToastClose.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>';
  //  GToastHeader.innerHTML = +GToastClose;
  // Adding Body
  var GToastBody = document.createElement("div");
  GToastBody.classList.add("g-toast-body");
  GToastBody.innerHTML = body;
  // Setting Icon types
  var iconType = "";
  if (type == "info") {
    iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg></span>`;
  } else if (type == "success") {
    iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg></span>`;
  } else if (type == "warning") {
    iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg></span>`;
  } else if (type == "danger") {
    iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.936 2.5L21.5 8.067v7.87L15.936 21.5h-7.87L2.5 15.936v-7.87L8.066 2.5h7.87zm-.829 2H8.894L4.501 8.895v6.213l4.393 4.394h6.213l4.394-4.394V8.894l-4.394-4.393zM11 15h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg></span>`;
  }

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
  setTimeout(function () {
    GToastElement.classList.add("active");
  }, 1);

  // Setting Up Durations
  if (duration > 0) {
    // it it's bigger then 0 add it
    setTimeout(function () {
      GToastElement.classList.remove("active");
      setTimeout(function () {
        GToastElement.remove();
      }, 350);
    }, duration);
  } else if (duration == null) {
    //  it there isn't any add default one (3000ms)
    setTimeout(function () {
      setTimeout(function () {
        GToastElement.classList.remove("active");
        GToastElement.remove();
      }, 350);
    }, 3000);
  }

  // Closing And Removing Toast
  let CloseToastElements = document.querySelectorAll(".g-toast-close");
  CloseToastElements.forEach((CloseToastElement) => {
    let ownToast = CloseToastElement.parentElement.parentElement;
    CloseToastElement.addEventListener("click", () =>
      ownToast.classList.remove("active")
    );
    CloseToastElement.addEventListener("click", () => ownToast.remove());
  });
}
document.addEventListener("click", function (e) {
  //check is the right element clicked
  if (!e.target.matches(".g-toast-toggle")) return;
  else {
    //create toast message with dataset attributes
    GenesisToast(
      e.target.dataset.gToastType,
      e.target.dataset.gToastTitle,
      e.target.dataset.gToastHtml,
      e.target.dataset.gToastDuration
    );
  }
});

// Genesis Component : Tooltip
const GenesisTooltips = document.querySelectorAll("[data-g-tooltip-title]");
GenesisTooltips.forEach((GenesisTooltip) => {
  let HTML = GenesisTooltip.innerHTML;
  GenesisTooltip.addEventListener("mouseenter", function (e) {
    var GenesisTooltipElement = document.createElement("span");
    GenesisTooltipElement.classList.add("g-tooltip");
    var GenesisTooltipPlacement = e.target.getAttribute(
      "data-g-tooltip-placement"
    );
    var GenesisTooltipTitle = e.target.getAttribute("data-g-tooltip-title");
    GenesisTooltipElement.classList.add(`g-tooltip-${GenesisTooltipPlacement}`);
    GenesisTooltipElement.innerHTML += GenesisTooltipTitle;

    e.target.appendChild(GenesisTooltipElement);
    console.log("tooltip added");
  });
  GenesisTooltip.addEventListener("mouseleave", function () {
    GenesisTooltip.innerHTML = HTML;
    console.log("tooltip removed");
  });
});

// Genesis Component : Tabs

function initGTabs() {
  let GTabToggleAreas = document.querySelectorAll("[data-g-tab-target]");
  GTabToggleAreas.forEach((GTabToggleArea) => {
    var TargetArea = document.querySelector(
      GTabToggleArea.getAttribute("data-g-tab-target")
    );
    var GToggles = GTabToggleArea.querySelectorAll("[data-g-tab]");

    GToggles.forEach((GToggle) => {
      GToggle.addEventListener("click", function (e) {
        e.target.classList.add("active");
        document
          .getElementById(e.target.getAttribute("data-g-tab"))
          .classList.add("show");

        getSiblings(e.target).forEach((sibling) => {
          sibling.classList.remove("active");
          document
            .getElementById(sibling.getAttribute("data-g-tab"))
            .classList.remove("show");
        });
      });
    });
  });
}
var GTabs = new initGTabs();

// Sliced Menu List
const SlicedMenuLists = document.querySelectorAll(".g-sliced-menu");
SlicedMenuLists.forEach((SlicedMenuList) => {
  var OuterMenu = SlicedMenuList.querySelector(".g-sliced-outer-menu-list");
  var InnerMenu = SlicedMenuList.querySelector(".g-sliced-inner-menu-list");

  // Toggle Menu
  OuterMenu.querySelectorAll("[data-g-sliced-toggle]").forEach((OuterMenuItem) => {
    OuterMenuItem.addEventListener("click", (e) => {
      OuterMenu.classList.add("hide");
      InnerMenu.classList.add("show");
      getSiblings(InnerMenu.querySelector(e.target.getAttribute("data-g-sliced-toggle"))).forEach((sibling) => {
        sibling.classList.remove("show");
      })
      InnerMenu.querySelector(e.target.getAttribute("data-g-sliced-toggle")).classList.add("show");
        var exitText = e.target.textContent;
        console.log(exitText);
        var ExitNode = document.createElement("li");
        
        ExitNode.classList.add("g-sliced-menu-item")
        ExitNode.innerText = ExitNode;
        // InnerMenu.querySelector(e.target.getAttribute("data-g-sliced-toggle")).insertBefore(
        //   ExitNode,
        //   InnerMenu.querySelector(e.target.getAttribute("data-g-sliced-toggle").children[0])
        // );

    });
  });
  InnerMenu.querySelectorAll(".g-sliced-menu-item:first-child").forEach(
    (innerMenuExit) => {
      innerMenuExit.addEventListener("click", () => {
        OuterMenu.classList.remove("hide");
        InnerMenu.classList.remove("show");
      });
    }
  );


});


