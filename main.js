
var title = document.title;
$(".title").html(title);
var description = $("meta[name='description']").attr("content");  
$(".description").html(description);

$("a.home,a.navbar-brand").attr("href", "/");
//var script = document.createElement("script");
/////script.src = "";

//script.onload = function () {
///
//};
//document.body.appendChild(script);
