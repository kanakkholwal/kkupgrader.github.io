const select = document.querySelector('#select');



let ids = select.options[select.selectedIndex].value;



select.addEventListener('change', () => {

    let current = document.querySelector('div.divs div');
    let nextSibling = current.nextElementSibling;
    let prevSibling = current.previousElementSibling;
    while (prevSibling) {
        prevSibling = prevSibling.previousElementSibling;
    }
    while (nextSibling) {
        nextSibling = nextSibling.nextElementSibling;
    }

    let demovalue = select.value;

    prevSibling.style.display = "none";
    nextSibling.style.display = "none";
    document.querySelector("#" + demovalue).style.display = "block";

});
// document.ready(function() {
// 	document.getElementById("downloader").addEventListener('change', () => {
// 		let demovalue = this.value;
// 		document.querySelector("div.output").style.display = "none";
// 		document.querySelector("#server-" + demovalue).style.display = "";
// 	});
// });