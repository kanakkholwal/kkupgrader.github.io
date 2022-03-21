function doencrypt(a) { return null == javascript ? !1 : "" == a.code.value ? (alert("Enter the script you want to Encrypt"), !1) : (enctext = encrypt(a.code.value), a.ecode.value = codetocopy, a.sac.disabled = !1, !1) }

function sandc(a) { a.ecode.focus(), a.ecode.select(), copytext = a.ecode.createTextRange(), copytext.execCommand("Copy"), alert("Copied the Encrypted HTML Code to clipboard, you may now paste this into your website") }

function encrypt(a) { var c, b = ""; for (c = 0; c < a.length; c++) b += "%" + hexfromdec(a.charCodeAt(c)); return b }

function hexfromdec(a) { return a > 65535 ? "err!" : (first = Math.round(a / 4096 - .5), temp1 = a - 4096 * first, second = Math.round(temp1 / 256 - .5), temp2 = temp1 - 256 * second, third = Math.round(temp2 / 16 - .5), fourth = temp2 - 16 * third, "" + getletter(third) + getletter(fourth)) }

function getletter(a) { return a < 10 ? a : 10 == a ? "A" : 11 == a ? "B" : 12 == a ? "C" : 13 == a ? "D" : 14 == a ? "E" : 15 == a ? "F" : void 0 }
document.writeln("<style>#doencrypts{border: solid 10px #3CAA4E; padding-left: 4; padding-right: 4; padding-top: 1; padding: 5px; width: 100%;}#encrypted1 {width: 80px;height: 20px;position: absolute;left: 0px;}</style>");





function doencrypt(theform) {
    if (theform.code.value == "") { alert("NO CODES FOR ENCRYPTION!"); return false; } else {
        enctext = encrypt(theform.code.value);
        codetocopy = "<script type='text/javascript'>\n";
        codetocopy += "<!-- Fs-Themes.blogspot.com -->\n";
        codetocopy += "document.write(unescape('" + enctext + "'));\n";
        codetocopy += "</script\>";
        theform.ecode.value = codetocopy;
    }
    return false;
}

function encrypt(tx) { var codehex = ''; var i; for (i = 0; i < tx.length; i++) { codehex += '%' + hexfromdec(tx.charCodeAt(i)) } return codehex; }

function hexfromdec(num) {
    hex1 = Math.round(num / 16 - .5);
    hex2 = num - hex1 * 16;
    return ("" + getletter(hex1) + getletter(hex2));
}

function getletter(num) { if (num < 10) { return num; } else { if (num == 10) { return "A" } if (num == 11) { return "B" } if (num == 12) { return "C" } if (num == 13) { return "D" } if (num == 14) { return "E" } if (num == 15) { return "F" } } }

function code_check() { var focuscheck = document.getElementById('txtarea'); if (focuscheck.value.indexOf('Paste your code here...') > 0) focuscheck.value = ''; }

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