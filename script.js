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
