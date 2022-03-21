$(".card .card-body").hover(function() {

    $(this).find("a.btn").toggleClass("animated jello");
    $(this).find("div.bg-image").toggleClass("animated headShake");
    $(this).find("h5").toggleClass("animated headShake");
    $(this).find("p").toggleClass("animated pulse");

});
/* Smooth Sidenav V3 by kkupgrader.blogspot.com */
const $menu = $("#sidenavify");

$(".sidenav-btn").append('<i class="fas fa-angle-down endify rotate-icon"></i>'), $(document).ready(function() {
    $(".sidenav-toggler").click(function() {
        var e = 280 == $menu.width() ? "0" : "280px";
        $menu.animate({ width: e }, "200")
    })
}), $(document).mouseup(e => { $menu.is(e.target) || 0 !== $menu.has(e.target).length || $menu.animate({ width: "0px" }) }), $(document).ready(function() { $(".sidenav-item > a.sidenav-btn").on("click", function() { $(this).hasClass("active") ? ($(this).removeClass("active"), $(this).siblings(".sidenav-collapse").slideUp(200), $(".sidenav-item > a.sidenav-btn i.rotate-icon").removeClass("down").addClass("up")) : ($(".sidenav-item > a.sidenav-btn i.rotate-icon").removeClass("down").addClass("up"), $(this).find("i.rotate-icon").removeClass("up").addClass("down"), $(".sidenav-item > a.sidenav-btn").removeClass("active"), $(this).addClass("active"), $(".sidenav-collapse").slideUp(200), $(this).siblings(".sidenav-collapse").slideDown(200)) }) });
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
                    let listElement = document.createElement("ul"),
                        listItemElement = document.createElement("li");
                    listElement.classList.add("tocList");
                    listItemElement.classList.add("tocListElement");
                    listElement.appendChild(listItemElement);
                    currentElement.appendChild(listElement);
                    currentElement = listItemElement;
                }
                currentElement.appendChild(linkElement);
            } else {
                for (let j = 0; j < -headingLevelDifference; j++) { currentElement = currentElement.parentNode.parentNode; }
                let listItemElement = document.createElement("li");
                listItemElement.classList.add("tocListElement");

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
document.addEventListener('DOMContentLoaded', () => new TableOfContents({ from: document.querySelector('#app'), to: document.querySelector('#tocify') }).generateToc());