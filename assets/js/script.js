// Predefined Function
// Collapse Function
function GCollapse(collapse) {
  if (!collapse.classList.contains("show")) {
    /** Show the collapse. */
    collapse.classList.add("show");
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
        collapse.classList.remove("show");
      },
      {
        once: true,
      }
    );
  }
}

const SlideUp = (item) => {
  item.style.height = "0px";
  item.addEventListener(
    "transitionend",
    () => {
      item.classList.remove("show");
    },
    {
      once: false,
    }
  );
};

const SlideDown = (item) => {
  item.classList.add("show");
  item.style.height = "auto";

  var height = item.clientHeight + "px";

  item.style.height = "0px";

  setTimeout(() => {
    item.style.height = height;
  }, 0);
};
const HorizontallyBound = (parentDiv, childDiv) => {
  var parentRect = parentDiv.getBoundingClientRect();
  var childRect = childDiv.getBoundingClientRect();

  return (
    parentRect.left >= childRect.right || parentRect.right <= childRect.left
  );
};

// Ripple Effects
const RippleElement = document.querySelectorAll(".g-btn,.g-ripple");
RippleElement.forEach((element) => {
  element.onclick = (e) => {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let ripple = document.createElement("span");
    ripple.classList.add("g-ripple-surface");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600); // 1second = 1000ms
  };
});
// Navbar Collapse
const GNavbarCollapse = document.querySelectorAll("[data-g-nav-collapse]");
GNavbarCollapse.forEach((NavCollapse) => {
  NavCollapse.addEventListener("click", (e) => {
    var targetId = e.target.getAttribute("data-g-nav-collapse");
    var targetMenu = document.getElementById(targetId);
    console.log(targetMenu);
    targetMenu.classList.toggle("show");
    // targetMenu.classList.contains("show") ? SlideDown(targetMenu) : SlideUp(targetMenu);
  });
});

const dropDownToggles = document.querySelectorAll(".g-dropdown-toggle");
dropDownToggles.forEach((dropDownToggle) => {
  // For Click events
  const GDropdownToggle = (e) => {
    var DropDownTarget = e.target.getAttribute("g-dropdown-target");
    e.target.classList.toggle("active");
    document.getElementById(DropDownTarget).classList.toggle("is-dropped");
    // var outClick = document.getElementById(DropDownTarget).parentNode.childNodes;
    // console.log(outClick);
    // document.addEventListener("mouseup", function (event) {
    //   if (!outClick.contains(event.target)) {
    //     e.target.classList.remove("active");
    //     document.getElementById(DropDownTarget).classList.remove("is-dropped");
    //     }
    //     else{
    //       return false;
    //     }
    // });
  };
  dropDownToggle.addEventListener("click", GDropdownToggle);
});

// Sidenav toggle
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

// Genesis Component : Collapse

const collapseBtns = document.querySelectorAll("[data-g-collapse-target]");
collapseBtns.forEach((collapseBtn) => {
  let collapseId = collapseBtn.getAttribute("data-g-collapse-target");
  let collapseArea = document.querySelector(collapseId);
  collapseBtn.addEventListener("click", () => GCollapse(collapseArea));
});
