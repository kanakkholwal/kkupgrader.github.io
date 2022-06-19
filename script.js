
document.querySelectorAll(".ripple-effect,.btn").forEach(el => {
  el.addEventListener('click', e => {
    // el.classList.add('ripple');
    var RippleElement = document.createElement('div');
    RippleElement.className = 'ripple';
    e.target.appendChild(RippleElement);
      e = e.touches ? e.touches[0] : e;
      const r = el.getBoundingClientRect(),
            d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
            RippleElement.style.cssText = `--s: 0; --o: 1;`;
            RippleElement.offsetTop;
            RippleElement.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`;
      setTimeout(function() {
        RippleElement.remove('ripple');
      },600);
  });
});



  
  const buttons = document.getElementsByClassName("ripple");
  for (const button of buttons) {
    button.addEventListener("click", createRipple);
  }
  
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
window.addEventListener("scroll", navHighlighter);
function navHighlighter() {
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
}

var currentYear = new Date().getFullYear();
// console.log(currentYear);
document.getElementById("currentYear").innerText = currentYear;
