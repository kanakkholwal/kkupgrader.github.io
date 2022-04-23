const sidenav_toggler = document.querySelectorAll(".sidenav-toggler,.sidenav-close");
var sidenav = document.querySelector(".sidenav");

sidenav_toggler.forEach(toggler => {
    toggler.addEventListener('click', () => sidenav.classList.toggle("show"));

});
// On outside Click of sidenav close the menu
document.addEventListener('mouseup', function(e) {
    if (!sidenav.contains(e.target)) {
        sidenav.classList.remove("show");
    }
});