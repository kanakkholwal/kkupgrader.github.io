const sidenav_toggler = document.querySelectorAll(
  ".sidenav-toggler,.sidenav-close,.g-sidenav-toggler"
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
          if (sibling.classList.contains("expanded")) {
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
          }

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
              console.log("class removed : Body Closed");
            },
            { once: false }
          );
        }
        function slideDown(el) {
          el.classList.add("active");
          el.style.height = "auto";
          var height = el.clientHeight + "px";
          el.style.height = "0px";

          setTimeout(() => {
            el.style.height = height;
            console.log("class added : Body opened");
          }, 0);
        }

        if (currentBody.classList.contains("active")) {
          slideUp(currentBody);
        } else {
          slideDown(currentBody);
        }

        //  WHY IS THIS NOT WORKING 😭😭😭😭
        // GCollapse(currentBody);

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
// SnackBar
let SnackBarContainer = document.querySelector(".snackBar-container");
if (SnackBarContainer === null || SnackBarContainer === undefined) {

  document.querySelector("body").insertAdjacentHTML("beforeend", '<div class="snackBar-container"></div>');
  SnackBarContainer = document.querySelector(".snackBar-container");
}


function GenesisSnackBar(SnackBarBody, SnackBarDuration, actionButton = "") {
  let SnackBarStyle = document.querySelector("#forSnackBar");
  if (SnackBarStyle === null || SnackBarStyle === undefined) {
  
    document.head.insertAdjacentHTML("beforeend", `<style id='forSnackBar'>.snackBar-container{display: flex;flex-direction: column;align-content: flex-end;position:fixed;z-index:999;bottom:calc(3rem - 2px);right:calc(1.5rem - 1px);width:auto;height:auto;max-width:25rem}.snackBar-container>.snackBar{width:100%;max-width:300px;min-width:180px;border-radius:calc(0.75rem - 1px);margin-block:0.5rem;margin-inline-end:0.5rem;margin-inline-start:auto;padding:1rem;display:inline-flex;justify-content:space-between;align-items:center;font-weight:500;transition:all .5s cubic-bezier(0.175,0.885,0.22,1.775);background:#58afdf1a;color:#149ccac9;backdrop-filter:blur(0.3rem);box-shadow:1.7px 3.1px 9.9px -47px rgba(0,0,0,0.07),11.9px 21.3px 27.3px -47px rgba(0,0,0,0.057),15.4px 27.7px 65.7px -47px rgba(0,0,0,0.046),15px 27px 218px -47px rgba(0,0,0,0.04);transform:translateY(1rem);opacity:0;visibility:hidden}.snackBar-container>.snackBar.show{transform:translateY(0);opacity:1;visibility:visible}.snackBar-container>.snackBar>button{display:inline-block;outline:0;border:0;border-radius:0.5rem;text-transform:uppercase;font-weight:600;font-size:1.25rem;background:none;color:#149eca;margin-inline:auto 0.1rem}</style>`)

  }

  var SnackBar = document.createElement("div");
  SnackBar.classList.add("snackBar");
  SnackBar.innerText = SnackBarBody;
  if (actionButton !== "") {
    var snackBarCloseBtn = document.createElement("button");
    snackBarCloseBtn.type = "button";
    snackBarCloseBtn.innerText = actionButton;
    SnackBar.appendChild(snackBarCloseBtn);
    snackBarCloseBtn.onclick = function () {
      SnackBar.classList.remove("show");
      setTimeout(function () {
        SnackBar.remove();
      }, 350);
    }
  }


  SnackBarContainer.appendChild(SnackBar);
  // wait just a bit to add active class to the message to trigger animation
  setTimeout(function () {
    SnackBar.classList.add("show");
  }, 1);

  // Setting Up Durations
  if (SnackBarDuration > 0) {
    // it it's bigger then 0 add it
    setTimeout(function () {
      SnackBar.classList.remove("show");
      setTimeout(function () {
        SnackBar.remove();
      }, 350);
    }, SnackBarDuration);
  } else if (SnackBarDuration == null) {
    //  it there isn't any add default one (3000ms)
    setTimeout(function () {
      setTimeout(function () {
        SnackBar.classList.remove("show");
        SnackBar.remove();
      }, 350);
    }, 3000);
  }
}

// setInterval(()=>{

  GenesisSnackBar("Pdhai krlo Buddy", 60000, "OK");
 
// },1000)



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
const AddExitToggle = (elem, target) => {
  var parentDiv = target;
  var firstLi = parentDiv.firstChild;



  var Text = elem.textContent;
  var newNode = document.createElement("li");
  newNode.className = "g-sliced-menu-item exit";
  newNode.innerText = Text;

  parentDiv.insertBefore(newNode, firstLi);
  // console.log(parentDiv);

}
const SlicedMenuLists = document.querySelectorAll(".g-sliced-menu");
SlicedMenuLists.forEach((SlicedMenuList) => {
  var OuterMenu = SlicedMenuList.querySelector(".g-sliced-outer-menu-list");
  var InnerMenu = SlicedMenuList.querySelector(".g-sliced-inner-menu-list");
  OuterMenu.style.width = OuterMenu.clientWidth + "px";
  InnerMenu.style.width = InnerMenu.clientWidth + "px";

  OuterMenu.querySelectorAll("[data-g-sliced-toggle]").forEach((toggle) => {

    var ToggleTargetsId = toggle.getAttribute("data-g-sliced-toggle");
    var targetElement = document.getElementById(ToggleTargetsId);
    AddExitToggle(toggle, targetElement);

    toggle.addEventListener("click", (e) => {
      // target menu get 
      var target = document.getElementById(e.target.getAttribute("data-g-sliced-toggle"));
      targetParent = target.parentElement;

      target.classList.add("show");
      getSiblings(target).forEach((s) => {
        s.classList.remove("show");
      });


      var parent = e.target.parentElement;



    });



  });
});

// DropDown Menu
const dropDownToggles = document.querySelectorAll(".g-dropdown-toggle");
dropDownToggles.forEach((dropDownToggle) => {
  // For Hover In and Focus In
  const GDropdownActive = (e) => {
    var DropDownTarget = e.target.getAttribute("g-dropdown-target");
    e.target.classList.add("is-active");
    document.getElementById(DropDownTarget).classList.add("is-dropped");
  };
  // For Hover Out and Focus Out
  const GDropdownNotActive = (e) => {
    setTimeout(() => {
      var DropDownTarget = e.target.getAttribute("g-dropdown-target");
      e.target.classList.remove("is-active");
      document.getElementById(DropDownTarget).classList.remove("is-dropped");
      // inToggle = true;
      // console.log("GDropdownNotActive = true");
    }, 225);
  };
  const GDropOutFocus = (inputDropDownTarget) => {
    var DropDownTarget = inputDropDownTarget.getAttribute("g-dropdown-target");
    let outer = false;

    document.addEventListener("mouseup", function (e) {
      if (
        !inputDropDownTarget.parentElement
          .querySelector(".g-dropdown-menu")
          .contains(e.target)
      ) {
      }
    });
    if (inputDropDownTarget.value === "" || outer) {
      inputDropDownTarget.classList.remove("is-active");
      document.getElementById(DropDownTarget).classList.remove("is-dropped");
    }
  };
  // For Click events
  const GDropdownToggle = (e) => {
    var DropDownTarget = e.target.getAttribute("g-dropdown-target");
    e.target.classList.toggle("is-active");
    document.getElementById(DropDownTarget).classList.toggle("is-dropped");
  };

  if (
    dropDownToggle.getAttribute("g-dropdown-type") == "focus" &&
    dropDownToggle.tagName.toLowerCase() === "input"
  ) {
    dropDownToggle.addEventListener("focus", GDropdownActive);
    dropDownToggle.addEventListener("focusout", GDropdownNotActive);

    // GDropOutFocus(dropDownToggle);
  } else if (dropDownToggle.getAttribute("g-dropdown-type") == "hover") {
    dropDownToggle.addEventListener("mouseenter", GDropdownActive);
    dropDownToggle.addEventListener("mouseleave", GDropdownNotActive);
  } else if (dropDownToggle.getAttribute("g-dropdown-type") == "click") {
    dropDownToggle.addEventListener("click", GDropdownToggle);
  }
});
// clipboard
const copyToClipboard = (id) => {
  var r = document.createRange();
  r.selectNode(document.getElementById(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
};

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const copyIOS = (id) => {
  const text = document.getElementById(id).innerHTML;

  if (!navigator.clipboard) {
    const textarea = document.createElement("textarea");

    textarea.value = text;
    textarea.style.fontSize = "20px";
    document.body.appendChild(textarea);

    const range = document.createRange();
    range.selectNodeContents(textarea);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textarea.setSelectionRange(0, 999999);

    document.execCommand("copy");

    document.body.removeChild(textarea);
  }

  navigator.clipboard.writeText(text);
};

const copyTextById = (id) => {
  if (isIOS) {
    return copyIOS(id);
  }
  copyToClipboard(id);
  console.log("Content Copied from Non-form elements");
};

window.copyTextById = copyTextById;
const GClipboard = document.querySelectorAll("[data-g-clipboard-target]");
GClipboard.forEach((clipboardToggle) => {
  clipboardToggle.addEventListener("click", (e) => {
    var target = e.target.getAttribute("data-g-clipboard-target");
    var targetElement = document.getElementById(target);
    if (
      targetElement.tagName.toLowerCase() === "input" ||
      targetElement.tagName.toLowerCase() === "textarea"
    ) {
      targetElement.select();
      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successfully" : "unsuccessfully";
        console.log("Content Copied " + msg);
      } catch (err) {
        console.log("Oops, unable to copy");
      }
    } else {
      copyTextById(target);
    }
  });
});
// auto Resize TExtarea

document.querySelectorAll("textarea").forEach((element) => {
  element.style.boxSizing = "border-box";
  var offset = element.offsetHeight - element.clientHeight;
  element.addEventListener("input", function (event) {
    event.target.style.maxHeight = "auto";
    event.target.style.height = event.target.scrollHeight + offset + "px";
  });
  // element.removeAttribute('data-autoresize');
});
// document.querySelector("[data-kkfs-clipboard]").click(function () {
//   var copy_id = document
//     .querySelector("[data-kkfs-clipboard]")
//     .attr("data-kkfs-clipboard");
//   var target_id = document.querySelector("#" + copy_id);

//   target_id.each(function () {
//     var $this = document.querySelector(this);
//     if ($this.is("input")) {
//       $this.focus();
//       $this.select();
//       try {
//         var successful = document.execCommand("copy");
//         var msg = successful ? "successful" : "unsuccessful";
//         console.log("Copying text command was " + msg);
//       } catch (err) {
//         console.log("Oops, unable to copy");
//       }
//     } else if ($this.is("select")) {
//       alert("Function can't be done");
//     } else if ($this.is("textarea")) {
//       $this.focus();
//       $this.select();
//       try {
//         var successful = document.execCommand("copy");
//         var msg = successful ? "successful" : "unsuccessful";
//         console.log("Copying text command was " + msg);
//       } catch (err) {
//         console.log("Oops, unable to copy");
//       }
//     } else {
//       alert("working for div like elements");
//     }
//   });
// });

// document.getElementById("navbar-search").addEventListener("keyup", filterSearch);
function filterSearch() {
  var value, name, profile, i;
  value = document.getElementById("value").value.toUpperCase();
  profile = document.getElementsByClassName("col-sm-6");
  for (i = 0; profile.length; i++) {
    name = profile[i].getElementsByTagName("h4");
    if (name[0].innerHTML.toUpperCase().indexOf(value) > -1) {
      profile[i].style.display = "flex";
    } else {
      profile[i].style.display = "none";
    }
  }
}
