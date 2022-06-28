let output = document.getElementById('output');
let form = document.getElementById('form');

function create(form) {
  // if (confirm("kkupgrader.eu.org says ok for confirm")) {
    var OutputCode = "";
    OutputCode =
      `<!-- Meta Tag Generator Tool By kkupgrader.eu.org -->  
       \n`;
    if (form.input1.value != "") {
      OutputCode +=
        '<meta name="Title" content="' + form.input1.value + '"/>\n';
    }
    if (form.input2.value != "") {
      OutputCode +=
        '<meta name="Author" content="' + form.input2.value + '"/>\n';
    }
    if (form.input4.value != "") {
      OutputCode +=
        '<meta name="Description" content="' + form.input4.value + '"/>\n';
    }
    if (form.input5.value != "") {
      OutputCode +=
        `<meta name="Keywords" content="' + form.input5.value + '"/>\n`;
    }
    if (form.input14.value != "") {
      OutputCode +=
        '<meta name="Distribution" content="' +
        form.input14.options[form.input14.selectedIndex].value +
        '"/>\n';
    }
    if (form.input15.value != "") {
      OutputCode +=
        '<meta name="Robots" content="' +
        form.input15.options[form.input15.selectedIndex].value +
        '"/>\n';
    }
  // }
  output.innerText = OutputCode;
  Prism.highlightAll();

}
