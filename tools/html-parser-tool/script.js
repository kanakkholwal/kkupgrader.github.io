function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var somehow = document.getElementById("somehow");

function parseHtml() {
    somehow.innerHTML = '<button class="close-button btn-close p-2 active bg-light shadow-4-strong" id="closeBtn"></button>';

    var html_code = $.trim($("#html_code").val());
    $("#parsed_code").text(htmlEntities(html_code));
    Prism.highlightAll();
    var closeBtn = document.getElementById("closeBtn");


    closeBtn.addEventListener('click', function() {

        $("#html_code").val("");
        somehow.innerHTML = "";
        $("#parsed_code").text("Parsed Code Here");


    });
}

$("#parsed_code").on("click", function() {
    $(this).select();
});