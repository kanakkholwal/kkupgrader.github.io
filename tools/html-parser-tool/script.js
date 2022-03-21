function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function parseHtml() {
    var html_code = $.trim(jQuery("#html_code").val());
    $("#parsed_code").text(htmlEntities(html_code));
    Prism.highlightAll();

}

$("#parsed_code").on("click", function() {
    $(this).select();
});