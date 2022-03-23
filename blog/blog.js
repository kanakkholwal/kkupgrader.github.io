const PageTitle = document.title;
document.getElementById("title").innerText = PageTitle;
document.querySelector('#m-share').addEventListener('click', function() {
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
widgetComments();