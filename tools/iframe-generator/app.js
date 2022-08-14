var nam = document.getElementById("name"),
    url = document.getElementById("url"),
    width = document.getElementById("width"),
    height = document.getElementById("height"),
    borsize = document.getElementById("borsize"),
    border = document.getElementById("border"),
    borsize = document.getElementById("borsize"),
    bortype = document.getElementsByName("bortype"),
    borcolor = document.getElementById("borcolor"),
    margin_height = document.getElementById("margin_height"),
    margin_width = document.getElementById("margin_width"),
    sizetype = document.getElementsByName("sizetype"),
    scroll = document.getElementById("scroll");
const code = document.getElementById("output");
// const previewBtn = document.getElementById("previewBtn");
const preview = document.getElementById("prev");

function output() {
    return html_beautify(
        `<iframe src="${url.value}" \n
         name="${nam.value}" \n
         width="${width.value}${sizetype.options[sizetype.selectedIndex].value}" \n
          height="${height.value}${sizetype.options[sizetype.selectedIndex].value}"  \n
           scrolling="${scroll.value}" \n
            marginheight="${margin_height.value}${sizetype.options[sizetype.selectedIndex].value}" marginwidth="${margin_width.value}${sizetype.options[sizetype.selectedIndex].value}"
            \n     frameborder="${border.value}"  \n
             style="border:${borsize.value}${sizetype.options[sizetype.selectedIndex].value} ${borcolor.value} ${bortype.options[bortype.selectedIndex].value}" 
            \n  allowfullscreen>
             </iframe>
          `, {
            indent_size: "2",
        }
    )
};

function ExecuteCommand() {
    code.innerHTML = "";
    code.innerText = output();
    Prism.highlightAll();

}
document.querySelectorAll("select").forEach(function(select) {
    select.addEventListener("change", function() {
        ExecuteCommand();
    });
    
});
document.querySelectorAll("input").forEach(function(input) {
    input.addEventListener("input", function() {
        ExecuteCommand();
    });
    
})

window.onload = function() {
    ExecuteCommand();

}


// previewBtn.addEventListener('click', function() {

//     preview.innerHTML = code.innerText + '<button class="close-button btn-close p-2 active bg-light shadow-4-strong" id="closeBtn"></button>';


//     document.getElementById("closeBtn").addEventListener('click', function() {

//         preview.innerHTML = "";

//     });
// });