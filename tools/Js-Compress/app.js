$(document).ready(function () {
  $("li.tab-nav-item").on("click", function () {
    $(this).siblings("li.tab-nav-item").removeClass("active");
    $(this).addClass("active");
  });
});
$("#done").hide();
$("#notDone").hide();
$("#clear").click(function () {
  $("#copyPaste textarea").val("");
});
$("#copy").click(function () {
  $("textarea.output-code").focus();
  $("textarea.output-code").select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
    $("#done").show().delay(1000).fadeOut();
  } catch (err) {
    console.log("Oops, unable to copy");
    alert("Oops, unable to copy");
    $("#notDone").show().delay(1000).fadeOut();
  }
});
