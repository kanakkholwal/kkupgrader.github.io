// All Variables

var comment = true;
var review = false;
var rating = false;
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
            url: document.URL,
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

// Add Comment 
function addComment() {





}
// testing bookmark