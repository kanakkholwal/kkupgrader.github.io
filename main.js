
var PageTitle = document.title;
$(".title").html(PageTitle);
var PageDescription = $("meta[name='description']").attr("content");  
$(".description").html(PageDescription);

$("a.home,a.navbar-brand").attr("href", "/");
//var script = document.createElement("script");
/////script.src = "";

//script.onload = function () {
///
//};
//document.body.appendChild(script);
