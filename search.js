"use strict";
var _createClass = function() {
    function a(a, b) { for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c) }
    return function(b, c, d) { return c && a(b.prototype, c), d && a(b, d), b }
}();

function _toConsumableArray(a) { if (Array.isArray(a)) { for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b]; return c } return Array.from(a) }

function _classCallCheck(a, b) { if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function") }
var Search = function() {
    function a(b, c, d, e, f, g, h) { _classCallCheck(this, a), this.input = b, this.list = d, this.icon = c, this.form = e, this.dropdown = f, this.count = g, this.data = [], this.jsonFile = h, this.searchValue = "", this.keycodes = Object.freeze({ ARROW_UP: 38, ARROW_DOWN: 40, ENTER: 13, SLASH: 191, ESCAPE: 27 }) }
    return _createClass(a, [{
        key: "init",
        value: function b() {
            var a = this;
            fetch(this.jsonFile).then(function(a) { return a.json() }).then(function(b) { a.data = [].concat(_toConsumableArray(b)), new mdb.PerfectScrollbar(a.list), a.bindEvents() })
        }
    }, {
        key: "bindEvents",
        value: function b() {
            var a = this;
            this.input.addEventListener("input", function(b) { return a.search(b) }), this.input.addEventListener("focus", function(b) { a.icon.classList.add("text-primary"), 0 < b.target.value.length && a.search(b) }), this.input.addEventListener("blur", function() { a.icon.classList.remove("text-primary") }), this.input.addEventListener("keydown", function(b) { b.keyCode === a.keycodes.ARROW_DOWN && 0 < a.options.length && (b.preventDefault(), a.options[0].focus()) }), window.addEventListener("click", function(b) { a.visibleDropdown && a.isOutside(b.target) && a.toggleDropdown(!1) }), window.addEventListener("keydown", function(b) { b.keyCode === a.keycodes.SLASH && b.ctrlKey && b.target !== a.input ? (b.preventDefault(), a.input.focus()) : b.keyCode === a.keycodes.ESCAPE && a.visibleDropdown && a.toggleDropdown(!1) })
        }
    }, { key: "search", value: function b(a) { this.searchValue = this.normalizeString(this.getSearchValue(a.target.value)), this.toggleDropdown(0 < this.searchValue.length), this.renderResults(this.getResultsMarkup()), this.setupKeyboardNavigation() } }, { key: "normalizeString", value: function b(a) { return a.trim().toLowerCase() } }, { key: "getSearchValue", value: function b(a) { return 1 < a.length && "/" === a[0] ? a.slice(1) : a } }, {
        key: "toggleDropdown",
        value: function c(a) {
            var b = a ? "block" : "none";
            this.dropdown.style.display = b
        }
    }, { key: "renderResults", value: function b(a) { this.list.innerHTML = a, this.count.innerHTML = this.results.length } }, { key: "getResultsMarkup", value: function b() { var a = this; return this.results.map(function(b, c) { var d = b.keywords.filter(function(b) { return 0 < a.searchValue.length && b.match(a.searchValue) }); return "\n      <li>\n        <a class=\"pt-2 px-2 text-muted d-block\" href=\"" + b.href + "\">\n          <p class=\"text-uppercase mb-0\">" + a.highlightSearch(b.name, a.searchValue) + "</p>\n          <p class=\"small font-weight-bold mb-0 pb-2\">" + a.highlightSearch(b.category, a.searchValue) + "</p>\n          " + (0 < d.length ? "<p class=\"small mb-0 pb-2 mdb-5-search-keywords\">" + a.formatKeywords(d) + "</p>" : "") + "\n        </a>\n        " + (c === a.results.length - 1 ? "" : "<hr class=\"m-0 p-0\">") + "\n      </li>\n    " }).join("\n") } }, {
        key: "compare",
        value: function f(a) {
            var b = this,
                c = a.name,
                d = a.keywords,
                e = a.category;
            return "/" === this.searchValue || this.normalizeString(c).match(this.searchValue) || this.normalizeString(e).match(this.searchValue) || d.find(function(a) { return a.match(b.searchValue) })
        }
    }, { key: "sort", value: function d(a) { var c = this; return [].concat(_toConsumableArray(a.filter(function(a) { return a.priority && a.priority[c.searchValue] }).sort(function(d, a) { return d.priority[c.searchValue] > a.priority[c.searchValue] ? 1 : -1 })), _toConsumableArray(a.filter(function(a) { return !a.priority || !a.priority[c.searchValue] }))) } }, { key: "highlightSearch", value: function c(a) { var b = this.normalizeString(a).indexOf(this.searchValue); return -1 === b ? a : a.slice(0, b) + "<u class=\"text-primary\">" + a.slice(b, b + this.searchValue.length) + "</u>" + a.slice(b + this.searchValue.length) } }, { key: "formatKeywords", value: function c(a) { var b = this; return a.map(function(a) { return b.highlightSearch(a) }).join(", ") } }, {
        key: "setupKeyboardNavigation",
        value: function b() {
            var a = this;
            this.options.forEach(function(b, c) { b.addEventListener("keydown", function(b) { return a.focusNextOption(b, c) }) })
        }
    }, {
        key: "focusNextOption",
        value: function e(a, b) {
            var c;
            if (a.keyCode === this.keycodes.ARROW_DOWN) c = 1;
            else if (a.keyCode === this.keycodes.ARROW_UP) c = -1;
            else return;
            a.preventDefault();
            var d = b + c > this.options.length - 1 ? 0 : 0 > b + c ? this.options.length - 1 : b + c;
            this.options[d].focus()
        }
    }, { key: "isOutside", value: function b(a) { return a !== this.form && (a === document.body || this.isOutside(a.parentNode)) } }, { key: "visibleDropdown", get: function a() { return "block" === this.dropdown.style.display } }, { key: "options", get: function a() { return this.list.getElementsByTagName("a") } }, {
        key: "results",
        get: function c() {
            var a = this,
                b = this.data.filter(function(b) { return a.compare(b) });
            return this.sort(b)
        }
    }]), a
}();