// All Variables

var comment = true;
var review = false;
var rating = true;
var Widget = true;

var tocify = true;


// Constants for Dynamically Change Meta and Schema 
const PageTitle = document.title;


// Do change Schema and Meta
$('.title').text(PageTitle);
document.getElementById("img-alt").setAttribute("alt", PageTitle);
document.getElementById("img-alt").setAttribute("title", PageTitle);



// Global Share 
const $share = $(".m-share");
$share.click(function(e) {
    e.preventDefault();
    if (typeof navigator.share === 'undefined') {
        log("No share API available!");
    } else {
        navigator.share({
            url: document.baseURI,
            title: document.title,
            text: document.description
        })
    }
});




// Sidenav Table of Contents
if (tocify === true) {
    /* Table of Content, Credit: blustemy.io/creating-a-table-of-contents-in-javascript */

    class TableOfContents {
        constructor({ from, to }) {
            this.fromElement = from;
            this.toElement = to;
            this.headingElements = this.fromElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
            this.tocElement = document.createElement("div");
        };
        getMostImportantHeadingLevel() {
            let mostImportantHeadingLevel = 6;
            for (let i = 0; i < this.headingElements.length; i++) {
                let headingLevel = TableOfContents.getHeadingLevel(this.headingElements[i]);
                mostImportantHeadingLevel = (headingLevel < mostImportantHeadingLevel) ? headingLevel : mostImportantHeadingLevel;
            }
            return mostImportantHeadingLevel;
        };
        static generateId(headingElement) { return headingElement.textContent.replace(/\s+/g, "_"); };
        static getHeadingLevel(headingElement) {
            switch (headingElement.tagName.toLowerCase()) {
                case "h1":
                    return 1;
                case "h2":
                    return 2;
                case "h3":
                    return 3;
                case "h4":
                    return 4;
                case "h5":
                    return 5;
                case "h6":
                    return 6;
                default:
                    return 1;
            }
        };
        generateToc() {
            let currentLevel = this.getMostImportantHeadingLevel() - 1,
                currentElement = this.tocElement;
            for (let i = 0; i < this.headingElements.length; i++) {
                let headingElement = this.headingElements[i],
                    headingLevel = TableOfContents.getHeadingLevel(headingElement),
                    headingLevelDifference = headingLevel - currentLevel,
                    linkElement = document.createElement("a");
                if (!headingElement.id) { headingElement.id = TableOfContents.generateId(headingElement); }
                linkElement.href = `#${headingElement.id}`;
                linkElement.textContent = headingElement.textContent;
                if (headingLevelDifference > 0) {
                    for (let j = 0; j < headingLevelDifference; j++) {
                        let listElement = document.createElement("ol"),
                            listItemElement = document.createElement("li");
                        listElement.appendChild(listItemElement);
                        currentElement.appendChild(listElement);
                        currentElement = listItemElement;
                    }
                    currentElement.appendChild(linkElement);
                } else {
                    for (let j = 0; j < -headingLevelDifference; j++) { currentElement = currentElement.parentNode.parentNode; }
                    let listItemElement = document.createElement("li");
                    listItemElement.appendChild(linkElement);
                    currentElement.parentNode.appendChild(listItemElement);
                    currentElement = listItemElement;
                }
                currentLevel = headingLevel;
            }
            this.toElement.appendChild(this.tocElement.firstChild);
        }
    }
    /* Activation */
    document.addEventListener('DOMContentLoaded', () => new TableOfContents({ from: document.querySelector('.post-body'), to: document.querySelector('#tocify') }).generateToc());

    /* Prepend as ShortCode  */


    const $menu = $(".toc-bg");

    $(document).ready(function() {

        $('.toc-toggler').click(function() {
            $menu.toggleClass("show");

        });
        $(document).mouseup((e) => {
            $menu.is(e.target) ||
                0 !== $menu.has(e.target).length ||
                $menu.removeClass("show");

        });
    });
} else {
    $(".toc.bg,.toc-toggler").hide();
}

function widget() {
    if (Widget === true) {
        wpac_init = window.wpac_init || [];
        (function() {
            if ('WIDGETPACK_LOADED' in window) return;
            WIDGETPACK_LOADED = true;
            var mc = document.createElement('script');
            mc.type = 'text/javascript';
            mc.async = true;
            mc.src = 'https://cdn.widgetpack.com/widget.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(mc, s.nextSibling);
        })();
        CheckWhatEnabled();
    }
}





function CheckWhatEnabled() {
    if (comment === true) {
        wpac_init.push({ widget: 'Comment', id: 34275 });
        //    document.querySelector(".wp-comment-mdata").innerHTML = " ";
        // or
        $(".wp-comment-mdata").html("");
    } else if (review === true) {
        wpac_init.push({ widget: 'Review', id: 34275 });
    } else if (rating === true) {
        wpac_init.push({ widget: 'Rating', id: 34275 });
    } else {
        document.body.removeChild(widget);

    }

}


function isIntoView(elem) {
    var documentViewTop = $(window).scrollTop();
    var documentViewBottom = documentViewTop + $(window).height();

    var elementTop = $(elem).offset().top;
    var elementBottom = elementTop + $(elem).height();

    return ((elementBottom <= documentViewBottom) && (elementTop >= documentViewTop));
}
// Add Comment 




$(window).scroll(function() {
        if (isIntoView($('#comments-section'))) {

            setTimeout(AddComment, 4000);


            function AddComment() {

                $('#loading-comment').remove();
                document.getElementById("comment-area").classList.remove("hide");
                widget();

            }
        }
        if (isIntoView($('#post-footer'))) {

            setTimeout(AddReaction, 2000);


            function AddReaction() {


                var reaction = document.createElement("script");
                reaction.src = "https://platform-api.sharethis.com/js/sharethis.js#property=623d523563052f001979041d&product=inline-reaction-buttons";

                reaction.onload = function() {
                    $('#loading-reaction').remove();
                    $('.sharethis-inline-reaction-buttons').removeClass("hide");
                };
                document.body.appendChild(reaction);

            }

        }
    })
    // Get its bounding client rectangle


// Bookmark
const AddToBookmarkBtn = document.getElementById("add-to-bookmark-btn");
const AddToBookmarkIcon = document.getElementById("bookmark-icon");
const BookmarkList = document.getElementById("bookmark-list");
var Keywords = document.querySelector('meta[name="keywords"]').getAttribute('content');
var Image = document.querySelector('meta[name="image"]').getAttribute('content');
var ListId = PageTitle.replace(/ /g, "_")
AddToBookmarkBtn.setAttribute("data-title", PageTitle);
AddToBookmarkBtn.setAttribute("data-keywords", Keywords);
AddToBookmarkBtn.setAttribute("data-image", Image);
AddToBookmarkBtn.setAttribute("data-list-id", ListId);
AddToBookmarkBtn.addEventListener('click', function() {
    // $('#bookmark-icon').toggleClass('far fas');
    AddToBookmarkIcon.classList.toggle('far');
    AddToBookmarkIcon.classList.toggle('fas');
});
//output += "<div class='d-flex justify-content-between'><div class='d-flex flex-row align-items-center'>" +
//   "<div><img src='imageUrl' class='img-fluid rounded-3' alt='' style='width: 120px;height: 80px;object-fit: cover;'></div>" +
//  "<div class='ms-3'><h5>Title</h5><p class='small mb-0'>KeyWords</p></div>" +
//  "</div>" +
//  "<div class='d-flex me-2 align-items-center'><a href=''><i class='fas fa-trash-alt text-danger'></i></a></div>" +
//  "</div>";

//function AddToBookmark() {}



//function testBookmark() {}
//testBookmark();