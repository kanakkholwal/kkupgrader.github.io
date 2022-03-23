const PageTitle = document.title;
const $title = $('.title');
$title.text(PageTitle);
document.getElementById("img-alt").setAttribute("alt", PageTitle);
document.getElementById("img-alt").setAttribute("title", PageTitle);

const $share = $(".m-share");
$share.click(function(e) {
    e.preventDefault();
    if (typeof navigator.share === 'undefined') {
        log("No share API available!");
    } else {
        navigator.share({
            url: document.URL,
            title: document.title,
            text: document.description
        })
    }
});

var comment = true;
var review = false;
var rating = false;
var Widget = true;