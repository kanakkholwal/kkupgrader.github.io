$(document).ready(
    function() {
        code = $("#input");




        $("#minify").click(function(e) {
            e.preventDefault();


            code.css('white-space', 'normal').show_code(code.minify());
        });



        $("#prettify").click(function(e) {
            e.preventDefault();


            val = $.replace_tag(code.minify());
            el = $("<div></div>").html(val);
            $.prettify_code(el);
            code.css('white-space', 'pre').show_code($.undo_tag(el.html()));

        });
        $("#closeBtn").click(function(e) {
            e.preventDefault();

            code.val("");

        });
    }
);
$(document).ready(function() {
    $("[data-kkfs-clipboard]").click(function() {
        var copy_id = $("[data-kkfs-clipboard]").attr("data-kkfs-clipboard");
        var target_id = $("#" + copy_id);

        target_id.each(function() {
            var $this = $(this);
            if ($this.is("input")) {
                $this.focus();
                $this.select();
                try {
                    var successful = document.execCommand("copy");
                    var msg = successful ? "successful" : "unsuccessful";
                    console.log("Copying text command was " + msg);
                } catch (err) {
                    console.log("Oops, unable to copy");
                }
            } else if ($this.is("select")) {
                alert("Function can't be done");
            } else if ($this.is("textarea")) {
                $this.focus();
                $this.select();
                try {
                    var successful = document.execCommand("copy");
                    var msg = successful ? "successful" : "unsuccessful";
                    console.log("Copying text command was " + msg);
                } catch (err) {
                    console.log("Oops, unable to copy");
                }
            } else {
                alert("working for div like elements");
            }
        });
    });
});

function CopyToClipboard(target_id) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        alert("Text has been copied, now paste in the text-area");
    }
}