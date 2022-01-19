 /* Table of Content, Credit: blustemy.io/creating-a-table-of-contents-in-javascript */

class TableOfContents { constructor({ from, to }) { this.fromElement = from; this.toElement = to; this.headingElements = this.fromElement.querySelectorAll("h1, h2, h3, h4, h5, h6"); this.tocElement = document.createElement("div"); }; getMostImportantHeadingLevel() { let mostImportantHeadingLevel = 6; for (let i = 0; i < this.headingElements.length; i++) { let headingLevel = TableOfContents.getHeadingLevel(this.headingElements[i]); mostImportantHeadingLevel = (headingLevel < mostImportantHeadingLevel) ? headingLevel : mostImportantHeadingLevel; } return mostImportantHeadingLevel; }; static generateId(headingElement) { return headingElement.textContent.replace(/\s+/g, "_"); }; static getHeadingLevel(headingElement) { switch (headingElement.tagName.toLowerCase()) { case "h1": return 1; case "h2": return 2; case "h3": return 3; case "h4": return 4; case "h5": return 5; case "h6": return 6; default: return 1; } }; generateToc() { let currentLevel = this.getMostImportantHeadingLevel() - 1, currentElement = this.tocElement; for (let i = 0; i < this.headingElements.length; i++) { let headingElement = this.headingElements[i], headingLevel = TableOfContents.getHeadingLevel(headingElement), headingLevelDifference = headingLevel - currentLevel, linkElement = document.createElement("a"); if (!headingElement.id) { headingElement.id = TableOfContents.generateId(headingElement); } linkElement.href = `#${headingElement.id}`; linkElement.textContent = headingElement.textContent; if (headingLevelDifference > 0) { for (let j = 0; j < headingLevelDifference; j++) { let listElement = document.createElement("ol"), listItemElement = document.createElement("li"); listElement.appendChild(listItemElement); currentElement.appendChild(listElement); currentElement = listItemElement; } currentElement.appendChild(linkElement); } else { for (let j = 0; j < -headingLevelDifference; j++) { currentElement = currentElement.parentNode.parentNode; } let listItemElement = document.createElement("li"); listItemElement.appendChild(linkElement); currentElement.parentNode.appendChild(listItemElement); currentElement = listItemElement; } currentLevel = headingLevel; } this.toElement.appendChild(this.tocElement.firstChild); } }
/* Activation */
document.addEventListener('DOMContentLoaded', () => new TableOfContents({from: document.querySelector('.post-body'), to: document.querySelector('#tocify')}).generateToc() ); 

/* Prepend as ShortCode  */
$("<div class='tocify-wrap'><div class='tocify-inner'> <a class='tocify-title' href='javascript:;' role='button' title='Table of Content'><span class='tocify-title-text'>Table of Content</span></a> <div id='tocify'/></div></div>").appendTo("#toc");

/* Functionality As Widget */
$(".tocify-title").each(function(e) {
	(e = $(this)).on("click", function() {
		e.toggleClass("is-expanded"), $("#tocify").slideToggle(170);
	});
});
