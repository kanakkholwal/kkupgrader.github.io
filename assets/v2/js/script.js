// Ripple Effect
document.querySelectorAll(".ripple-effect").forEach((el) => {
  el.addEventListener("click", (e) => {
    var RippleElement = document.createElement("div");
    RippleElement.className = "ripple";
    e.target.appendChild(RippleElement);
    e = e.touches ? e.touches[0] : e;
    const r = el.getBoundingClientRect(),
      d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
    RippleElement.style.cssText = `--s: 0; --o: 1;`;
    RippleElement.offsetTop;
    RippleElement.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${
      e.clientX - r.left
    }; --y:${e.clientY - r.top};`;
    setTimeout(function () {
      RippleElement.remove("ripple");
    }, 600);
  });
});

// PreBuilt Functions
const getSiblings = (TargetNode) =>
  [...TargetNode.parentNode.children].filter(
    (siblings) => siblings !== TargetNode
  );
// Gives Object Output
// Check if element is visible
function getElementViewportInfo(el) {
  let result = {};

  let rect = el.getBoundingClientRect();
  let windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  let windowWidth = window.innerWidth || document.documentElement.clientWidth;

  let insideX = rect.left >= 0 && rect.left + rect.width <= windowWidth;
  let insideY = rect.top >= 0 && rect.top + rect.height <= windowHeight;

  result.isInsideViewport = insideX && insideY;

  let aroundX = rect.left < 0 && rect.left + rect.width > windowWidth;
  let aroundY = rect.top < 0 && rect.top + rect.height > windowHeight;

  result.isAroundViewport = aroundX && aroundY;

  let onTop = rect.top < 0 && rect.top + rect.height > 0;
  let onRight = rect.left < windowWidth && rect.left + rect.width > windowWidth;
  let onLeft = rect.left < 0 && rect.left + rect.width > 0;
  let onBottom =
    rect.top < windowHeight && rect.top + rect.height > windowHeight;

  let onY = insideY || aroundY || onTop || onBottom;
  let onX = insideX || aroundX || onLeft || onRight;

  result.isOnTopEdge = onTop && onX;
  result.isOnRightEdge = onRight && onY;
  result.isOnBottomEdge = onBottom && onX;
  result.isOnLeftEdge = onLeft && onY;

  result.isOnEdge =
    result.isOnLeftEdge ||
    result.isOnRightEdge ||
    result.isOnTopEdge ||
    result.isOnBottomEdge;

  let isInX = insideX || aroundX || result.isOnLeftEdge || result.isOnRightEdge;
  let isInY = insideY || aroundY || result.isOnTopEdge || result.isOnBottomEdge;

  result.isInViewport = isInX && isInY;

  result.isPartiallyInViewport = result.isInViewport && result.isOnEdge;

  return result;
}
function inViewport(element) {
  if (!element) return false;
  if (1 !== element.nodeType) return false;
  var html = document.documentElement;
  var rect = element.getBoundingClientRect();

  return (
    !!rect &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.left <= html.clientWidth &&
    rect.top <= html.clientHeight
  );
}
// LazyLoad
(function () {
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
      entry.target.classList.remove("lazyShimmer");
    });
  }
})();
// AutoResize TextAreaElement
document.querySelectorAll(".form-textarea").forEach((textarea) => {
  textarea.oninput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };
});
// NavMenu Toggle
let navbar = document.querySelector(".navbar"),
  navToggle = document.querySelector(".nav-toggler");
menu = document.querySelector("#menu");
document.addEventListener("mouseup", function (e) {
  if (!navToggle.contains(e.target) && !menu.contains(e.target)) {
    navToggle.classList.remove("active");
    menu.classList.remove("open");
  }
});
navToggle.addEventListener("click", function () {
  this.classList.toggle("active");
  menu.classList.toggle("open");
});

// OnScroll Navbar Fixed
var NavScroll = true;
if (NavScroll) {
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  });
}
// Section Highlight
var IsSectionHighlightNeeded = false;
if (IsSectionHighlightNeeded) {
  const Sections = document.querySelectorAll("main > section[id]");
  const navHighlighter = (sections) => {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      let sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector("a[href*=" + sectionId + "].nav-link")
          .parentElement.classList.add("active");
      } else {
        document
          .querySelector("a[href*=" + sectionId + "].nav-link")
          .parentElement.classList.remove("active");
      }
    });
  };
  window.addEventListener("scroll", navHighlighter);
}
var currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerText = currentYear;

// Contact Form
const ContactForm = document.getElementById("contactForm");
if (!ContactForm === null && !ContactForm === undefined) {
  ContactForm.onsubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(ContactForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        console.log("Form successfully submitted");
        alert("Form successfully submitted");
      })
      .catch((error) => alert(error));
  };
}

document
  .querySelectorAll("input[type=color].form-color")
  .forEach(function (picker) {
    var targetLabel = document.querySelector('label[for="' + picker.id + '"]'),
      codeArea = document.createElement("span");

    codeArea.innerHTML = picker.value;
    targetLabel.appendChild(codeArea);

    picker.addEventListener("input", function () {
      codeArea.innerHTML = picker.value;
      targetLabel.appendChild(codeArea);
    });
  });

document
  .querySelectorAll("input[type=range].form-range")
  .forEach(function (range) {
    var targetLabel = document.querySelector(
        'label[for="' + range.id + '"].form-range-label'
      ),
      RangeValue = document.createElement("span");
    RangeValue.innerHTML = range.value;
    targetLabel.appendChild(RangeValue);
    function updateValue() {
      RangeValue.innerHTML = range.value;
      targetLabel.appendChild(RangeValue);
    }
    range.addEventListener("input", updateValue);
  });

document.querySelectorAll("select.form-select").forEach((select) => {
  // Assign Id to select
  var SelectId = "";
  if (select.id != null || select.id === undefined || select.id === "") {
    var randomId = "form-select_" + Math.random().toString(16).slice(2);
    SelectId = randomId;
  } else {
    SelectId = select.id;
  }
  select.id = randomId;

  // Create Parent Wrapper
  let wrapper = `<div class="select-wrapper" id="form-select-wrapper_${
    SelectId.split("_")[1]
  }"></div>`;
  select.insertAdjacentHTML("beforebegin", wrapper);
  var Wrapper = document.getElementById(
    `form-select-wrapper_${SelectId.split("_")[1]}`
  );

  Wrapper.appendChild(select);
  Wrapper.style.minWidth = select.clientWidth + "px";
  select.className = "select-initialized";
  // Create a Input Toggle button
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "select-placeholder");
  input.setAttribute("id", `input-dropdown_${SelectId.split("_")[1]}`);
  input.setAttribute("role", "listbox");
  input.setAttribute("aria-popup", "false");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("readonly", "true");
  input.setAttribute("value", select.options[select.selectedIndex].value);

  Wrapper.insertAdjacentHTML("beforeend", input.outerHTML);
  Wrapper.insertAdjacentHTML(
    "beforeend",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
  <path
      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
</svg>`
  );
  // Add Icon to input element

  // Create DropDown
  var DropDown = document.createElement("div"),
    DropDownList = document.createElement("ul");
  DropDown.classList.add("select-dropdown");
  DropDown.id = `select-dropdown_${SelectId.split("_")[1]}`;

  DropDown.appendChild(DropDownList);
  Wrapper.appendChild(DropDown);

  for (var i = 0; i < select.options.length; i++) {
    var DropItem = document.createElement("li");
    DropItem.className = "select-drop-item";
    DropItem.innerText = select.options[i].innerText;
    DropItem.ariaSelected = "false";

    DropItem.setAttribute("value", select.options[i].value);
    if (
      select.options[i].value === select.options[select.selectedIndex].value
    ) {
      DropItem.ariaSelected = "true";
      DropItem.className += " active";
    }
    DropDownList.appendChild(DropItem);
  }

  // Toggle DropDown
  document.querySelectorAll(".select-placeholder").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.target.classList.add("active");
      e.target.setAttribute("aria-popup", "true");
      e.target.setAttribute("aria-expanded", "true");
      var TargetDropDownId = "select-dropdown_" + e.target.id.split("_")[1];
      var TargetDropDown = document.getElementById(TargetDropDownId);
      TargetDropDown.classList.add("show");
    });
    document.addEventListener("mouseup", function (e) {
      toggle.classList.remove("active");
      toggle.setAttribute("aria-popup", "false");
      toggle.setAttribute("aria-expanded", "false");
      document
        .getElementById("select-dropdown_" + toggle.id.split("_")[1])
        .classList.remove("show");
    });
  });

  // Inside DropDown
  DropDownList.querySelectorAll(".select-drop-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.classList.add("active");
      e.target.ariaSelected = "true";

      getSiblings(e.target).forEach((i) => {
        i.classList.remove("active");
        i.ariaSelected = "false";
      });

      var correspondingSelectId =
        "form-select_" + e.target.parentElement.parentElement.id.split("_")[1];
      var correspondingSelect = document.getElementById(correspondingSelectId);
      var correspondingInputId =
        "input-dropdown_" +
        e.target.parentElement.parentElement.id.split("_")[1];
      var correspondingInput = document.getElementById(correspondingInputId);

      for (var j = 0; j < correspondingSelect.options.length; j++) {
        if (
          correspondingSelect.options[j].getAttribute("selected") !==
            undefined ||
          correspondingSelect.options[j].getAttribute("selected") !== null
        ) {
          correspondingSelect.options[j].removeAttribute("selected");
        }
        if (
          correspondingSelect.options[j].value ===
          e.target.getAttribute("value")
        ) {
          correspondingSelect.options[j].toggleAttribute("selected");
          correspondingInput.setAttribute(
            "value",
            e.target.getAttribute("value")
          );
        }
      }
    });
  });
});

// toasts
const toastContainer = document.querySelector(".g-toast-container");
if (toastContainer == undefined || toastContainer == null) {
    document.addEventListener("DOMContentLoaded", function () {
    var toastContainerContent = '<div class="g-toast-container"></div>';
    document.querySelector("body").innerHTML += toastContainerContent;
  });
  }

function Toast(title, body, type, duration) {
  // Create Toast Element
  let ToastElement = document.createElement("div");
  ToastElement.classList.add("toast");
  // Add Class For Toast Type
  if (type !== undefined && type !== null) {
    ToastElement.classList.add(`toast-${type}`);
  } else {
    ToastElement.classList.add(`toast-default`);
  }
  // Adding Header
  var ToastHeader = document.createElement("div");
  ToastHeader.classList.add("toast-header");
  // Adding Title
  var ToastTitle = document.createElement("div");
  ToastTitle.classList.add("toast-title");
  // Adding Close Button
  var ToastClose = document.createElement("div");
  ToastClose.classList.add("toast-close");
  ToastClose.classList.add("icon-btn");
  ToastClose.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>';
  //  ToastHeader.innerHTML += ToastClose;
  // Adding Body
  var ToastBody = document.createElement("div");
  ToastBody.classList.add("toast-body");
  ToastBody.innerHTML += body;
  // Setting Icon types
  var iconType = "";
  switch (iconType) {
    case "info":
      iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg></span>`;
      break;
    case "success":
      iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg></span>`;
      break;
    case "warning":
      iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg></span>`;
      break;
    case "danger":
      iconType = `<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.936 2.5L21.5 8.067v7.87L15.936 21.5h-7.87L2.5 15.936v-7.87L8.066 2.5h7.87zm-.829 2H8.894L4.501 8.895v6.213l4.393 4.394h6.213l4.394-4.394V8.894l-4.394-4.393zM11 15h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg></span>`;
      break;
    default:
      iconType = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
      break;
  }

  // append icon to title element with title text
  ToastTitle.innerHTML += iconType + title + ToastClose;
  ToastHeader.appendChild(ToastTitle);
  // GToastHeader.appendChild(GToastClose);
  // Merging Toast HTML
  ToastElement.appendChild(ToastHeader);
  ToastElement.appendChild(ToastBody);
  //append toast message to it

  toastContainer.appendChild(ToastElement);
  // wait just a bit to add active class to the message to trigger animation
  setTimeout(function () {
    ToastElement.classList.add("active");
  }, 1);

  // Setting Up Durations
  if (duration > 0) {
    // it it's bigger then 0 add it
    setTimeout(function () {
      ToastElement.classList.remove("active");
      setTimeout(function () {
        ToastElement.remove();
      }, 350);
    }, duration);
  } else if (duration == null) {
    //  it there isn't any add default one (3000ms)
    setTimeout(function () {
      setTimeout(function () {
        ToastElement.classList.remove("active");
        ToastElement.remove();
      }, 350);
    }, 3000);
  }

  // Closing And Removing Toast
  // let CloseToastElements = document.querySelectorAll(".toast-close");
  // CloseToastElements.forEach((CloseToastElement) => {
  //   let ownToast = CloseToastElement.parentElement.parentElement;
  //   CloseToastElement.addEventListener("click", () =>
  //     ownToast.classList.remove("active")
  //   );
  //   CloseToastElement.addEventListener("click", () => ownToast.remove());
  // });
}
// document.addEventListener("click", function (e) {
  //check is the right element clicked
  // if (!e.target.matches(".toast-toggle")) return;
  // else {
  //   //create toast message with dataset attributes
  //   GenesisToast(
  //     e.target.dataset.gToastType,
  //     e.target.dataset.gToastTitle,
  //     e.target.dataset.gToastHtml,
  //     e.target.dataset.gToastDuration
  //   );
  // }
// });
Toast("title", "body", "info", "200");