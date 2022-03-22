//function update() {
//   $("iframe").contents().find("html").html("<html><head><style type='text/css'>" + $("#csspanel").val() + "</style></head><body>" + $(htmlpanel).val() + "</body></html>");

// 				document.getElementById("outputpanel").contentWindow.eval($("#javascriptpanel").val());
//}


//$("iframe").contents().find("html").html($("#htmlpanel").val());


var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), {
    lineNumbers: true,
    mode: 'htmlmixed',
    theme: 'material',
});

var cssEditor = CodeMirror.fromTextArea(document.getElementById("css"), {
    lineNumbers: true,
    mode: 'css',
    theme: 'material',
});

var jsEditor = CodeMirror.fromTextArea(document.getElementById('js'), {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'material',
});