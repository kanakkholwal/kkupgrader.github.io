var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html_panel"), {
    lineNumbers: true,
    mode: 'htmlmixed',
    // theme: 'default',

});
var cssEditor = CodeMirror.fromTextArea(document.getElementById("css_panel"), {
    lineNumbers: false,
    mode: 'css',
    // theme: 'default',
});
var jsEditor = CodeMirror.fromTextArea(document.getElementById("js_panel"), {
    lineNumbers: false,
    mode: 'javascript',
    // theme: 'default',
});

function update() {
    $("iframe").contents().find("html").html("<html><head><style type='text/css'>" + $("#css_panel").val() + "</style></head><body>" + $(htmlpanel).val() + "</body></html>");

    // 				document.getElementById("outputpanel").contentWindow.eval($("#javascriptpanel").val());
}


$("iframe").contents().find("html").html($("#html_panel").val());



update();
$("textarea").on('change keyup paste', function() {
    update();
});