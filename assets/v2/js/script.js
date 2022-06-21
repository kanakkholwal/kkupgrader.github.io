document.querySelectorAll(".ripple-effect").forEach((el) => {
  el.addEventListener("click", (e) => {
    // el.classList.add('ripple');
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

// PreBuilt Functions for Accordion
const getSiblings = (TargetNode) =>
  [...TargetNode.parentNode.children].filter(
    (siblings) => siblings !== TargetNode
  ); // Gives Object Output
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
  textarea.oninput = () => {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  };
});
let navbar = document.querySelector(".navbar"),
  navToggle = document.querySelector(".nav-toggler");
menu = document.querySelector("#menu");

// document.querySelector(".nav-toggler").onclick = () => {
//     document.querySelector(".nav-toggler").classList.toggle("active");
//     var targetId = document
//     .querySelector(".nav-toggler")
//     .getAttribute("data-nav-toggle");
//     document.getElementById(targetId).classList.toggle("open");
// };
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
window.addEventListener("scroll", function () {
  navbar.classList.toggle("scrolled", window.scrollY > 100);
});
// Section Highlight
const sections = document.querySelectorAll("main > section[id]");
const navHighlighter = () => {
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

var currentYear = new Date().getFullYear();
// console.log(currentYear);
document.getElementById("currentYear").innerText = currentYear;

// Contact Form
const SecureToken = "0e770f32-181f-4526-8dd2-3a570568eb2c";
const SendTo = "kkupgrader.fs@gmail.com";
const ContactForm = document.getElementById("contactForm"),
  email = ContactForm.querySelector("#email"),
  Subject = ContactForm.querySelector("#subject"),
  Body = ContactForm.querySelector("#body");

const SendContactForm = () => {};
ContactForm.onsubmit = (e) => {
  e.preventDefault();
  /* SmtpJS.com - v3.0.0 */
  var Email = {
    send: function (a) {
      return new Promise(function (n, e) {
        (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
        var t = JSON.stringify(a);
        Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
          n(e);
        });
      });
    },
    ajaxPost: function (e, n, t) {
      var a = Email.createCORSRequest("POST", e);
      a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        (a.onload = function () {
          var e = a.responseText;
          null != t && t(e);
        }),
        a.send(n);
    },
    ajax: function (e, n) {
      var t = Email.createCORSRequest("GET", e);
      (t.onload = function () {
        var e = t.responseText;
        null != n && n(e);
      }),
        t.send();
    },
    createCORSRequest: function (e, n) {
      var t = new XMLHttpRequest();
      return (
        "withCredentials" in t
          ? t.open(e, n, !0)
          : "undefined" != typeof XDomainRequest
          ? (t = new XDomainRequest()).open(e, n)
          : (t = null),
        t
      );
    },
  };
  Email.send({
    SecureToken: SecureToken,
    To: SendTo,
    From: email.value,
    Subject: Subject.innerHTML,
    Body: Body.innerHTML,
  }).then((message) => alert(message));
};
