var input = document.getElementById("tumbnail-form"),
    namaBlog = document.getElementById("nama-blog"),
    judul = document.getElementById("judul"),
    author = document.getElementById("author"),
    label = document.getElementById("label"),
    bgColor = document.getElementById("bg-color");
input.onkeyup = function() {
    document.getElementById("output-label").innerHTML = label.value, document.getElementById("output-judul").innerHTML = judul.value, document.getElementById("output-nama").innerHTML = namaBlog.value, document.getElementById("output-author").innerHTML = "@" + author.value
}, document.getElementById("bg-color").addEventListener("change", function() {
    var e = "#fff #d32f2f #c2185b #7b1fa2 #512da8 #303f9f #1976d2 #0288d1 #0097a7 #00796b #388e3c #689f38 #afb42b #fbc02d #ffa000 #f57c00 #e64a19 #5d4037 #616161 #455a64".split(" ")[bgColor.selectedIndex];
    document.getElementById("content-container").style.backgroundColor = e, document.getElementById("background").style.display = "block", document.querySelector(".tombol-convert").style.display = "block"
}), document.getElementById("upload").onchange = function(e) {
    var t = document.getElementById("output-image");
    t.style = 'background:url("' + URL.createObjectURL(e.target.files[0]) + '")', t.onload = function() {
        URL.revokeObjectURL(t.style)
    }
}, document.getElementById("convert-image").onclick = function() {
    html2canvas(document.querySelector(".content-container")).then(e => {
        document.getElementById("canvas").appendChild(e)
    }), document.querySelector(".tombol-download").style.display = "block"
}, document.getElementById("reset-image").onclick = function() {
    document.getElementById("canvas").innerHTML = "", document.querySelector(".tombol-download").style.display = "none"
}, document.getElementById("download-image").onclick = function() {
    var e = document.getElementById("judul").value.split(" ").join("-");
    console.log(e);
    var t = document.createElement("a");
    t.download = e + ".png", t.href = document.querySelector("canvas").toDataURL(), t.click()
};