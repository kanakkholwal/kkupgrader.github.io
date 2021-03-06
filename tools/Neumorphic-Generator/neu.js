var subject = document.getElementById("subject-div"),
    shadow = "drop",
    dark = {
        color: "#1a1a1a",
        colordark: "#00000080",
        colorlight: "#3a3a3a60"
    },
    dark2 = {
        color: "#1A1B1E",
        colordark: "#151518",
        colorlight: "#242529"
    },
    light = {
        color: "#e0e5ec",
        colordark: "#a3b1c680",
        colorlight: "#ffffff"
    },
    light2 = {
        color: "#DEEAF6",
        colordark: "#BECBD8",
        colorlight: "#F3F9FF"
    },
    red = {
        color: "#d12e2e",
        colordark: "#b22727",
        colorlight: "#f03535"
    },
    blue = {
        color: "#55b9f3",
        colordark: "#489dcf",
        colorlight: "#62d5ff"
    },
    green = {
        color: "#2ead5b",
        colordark: "#27934d",
        colorlight: "#35c769"
    },
    yellow = {
        color: "#eade39",
        colordark: "#c7bd30",
        colorlight: "#ffff42"
    },
    ink = {
        color: "#2d08b5",
        colordark: "#220688",
        colorlight: "#380ae2"
    },
    purple = {
        color: "#8d75e6",
        colordark: "#7863c4",
        colorlight: "#a287ff"
    };
init();

function init() {
    changeSubjectSize();
    changeSubjectRadius();
    changeSubjectDistance();
    topLeft();
    drop()
}

function changeSubjectSize() {
    var a = document.getElementById("sub-width").value;
    subject.style.width = a + "px";
    subject.style.height = a + "px"
}

function changeSubjectRadius() {
    var a = document.getElementById("sub-radius").value;
    document.documentElement.style.setProperty("--border-radius", a + "px")
}

function changeSubjectDistance() {
    var a = document.getElementById("sub-distance").value;
    document.documentElement.style.setProperty("--offset", a + "px")
}

function drop() {
    shadow = "drop";
    document.getElementById("drop-btn").classList.add("active");
    document.getElementById("inset-btn").classList.remove("active");
    topLeft()
}

function inset() {
    shadow = "inset";
    document.getElementById("drop-btn").classList.remove("active");
    document.getElementById("inset-btn").classList.add("active");
    topLeft()
}

function topLeft() {
    subject.className = "";
    "inset" == shadow ? subject.classList.add("top-left-inset") : subject.classList.add("top-left");
    removeActive("top-left-btn")
}

function topRight() {
    subject.className = "";
    "inset" == shadow ? subject.classList.add("top-right-inset") : subject.classList.add("top-right");
    removeActive("top-right-btn")
}

function bottomLeft() {
    subject.className = "";
    "inset" == shadow ? subject.classList.add("bottom-left-inset") : subject.classList.add("bottom-left");
    removeActive("bottom-left-btn")
}

function bottomRight() {
    subject.className = "";
    "inset" == shadow ? subject.classList.add("bottom-right-inset") : subject.classList.add("bottom-right");
    removeActive("bottom-right-btn")
}

function removeActive(a) {
    var b = document.querySelector(".box.btn");
    Array.from(b).forEach(function(c) {
        c.classList.remove("active")
    });
    document.getElementById(a).classList.add("active")
}
$(".box.btn").on("click", function() {
    $(".box.btn").siblings().removeClass("active");
    $(this).addClass("active");

});
$(".rect.btn").on("click", function() {

    $(".rect.btn").siblings().removeClass("active");
    $(this).addClass("active");

});

function color(a) {
    switch (a) {
        case "light":
            changeColor(light);
            break;
        case "light2":
            changeColor(light2);
            break;
        case "dark":
            changeColor(dark);
            break;
        case "dark2":
            changeColor(dark2);
            break;
        case "red":
            changeColor(red);
            break;
        case "green":
            changeColor(green);
            break;
        case "blue":
            changeColor(blue);
            break;
        case "yellow":
            changeColor(yellow);
            break;
        case "ink":
            changeColor(ink);
            break;
        case "purple":
            changeColor(purple)
    }
}

function changeColor(a) {
    document.documentElement.style.setProperty("--color", a.color);
    document.documentElement.style.setProperty("--color-dark", a.colordark);
    document.documentElement.style.setProperty("--color-light", a.colorlight);
}
let compStyles = window.getComputedStyle(subject);
let output = document.getElementById("css-code");

const beautified = js_beautify(output).css;

function generateCSS() {

    output.innerHTML = '\n .neu{\n background-color: ' +
        compStyles.getPropertyValue('background-color') +
        ';\n box-shadow:' +
        compStyles.getPropertyValue('box-shadow') +
        '; \n border-radius: ' +
        compStyles.getPropertyValue('border-radius') +
        '; \n -webkit-box-shadow:' +
        compStyles.getPropertyValue('box-shadow') +
        '; \n } ';
    Prism.highlightAll();


}