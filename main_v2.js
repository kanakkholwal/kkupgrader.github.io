const sidenav_toggler = document.querySelectorAll(".sidenav-toggler,.sidenav-close");
var sidenav = document.querySelector(".sidenav");

sidenav_toggler.forEach(toggler => {
    toggler.addEventListener('click', () => sidenav.classList.toggle("show"));
});
document.addEventListener('mouseup', function(e) {
    if (!sidenav.contains(e.target)) {
        sidenav.classList.remove("show");
    }
});
let sidenav_collapse = document.querySelectorAll(".sidenavify-collapse");
sidenav_collapse.forEach(collapse => {
    collapse.addEventListener('click', () => collapse.querySelector('ul.collapse-list').classList.toggle("show"));
});
const darkToggle = document.querySelector('.darkmode-toggler');
darkToggle.addEventListener('click', function() {
    darkToggle.querySelector('.fa-moon').classList.toggle("far"),
        darkToggle.querySelector('.fa-moon').classList.toggle("fas");


});