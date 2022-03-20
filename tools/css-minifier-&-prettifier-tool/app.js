  function get(e) { return document.getElementById(e) }

  function highlightCode(e) { if (hc.checked) { var a = e.innerHTML;
          a = (a = (a = (a = a.replace(/\{([\s\S]+?)\}/g, function(e) { return e.replace(/\'(.*?)\'/g, "<span class='st'>'$1'</span>").replace(/\"(.*?)\"/g, "<span class='st'>\"$1\"</span>").replace(/(\{|\n|;)?(.[^\{]*?):(.[^\{]*?)(;|\})/g, "$1<span class='pr'>$2</span>:<span class='vl'>$3</span>$4").replace(/<span class='pr'>\{/g, "{<span class='pr'>") })).replace(/&lt;(.*?)('|")(.*?)('|")&gt;/g, function(e) { return e.replace(/'(.*?)'/g, "<span class='vl'>'$1'</span>").replace(/"(.*?)"/g, "<span class='vl'>\"$1\"</span>") })).replace(/\{([\s\S]+?)\}/g, function(e) { return e.replace(/([\(\)\{\}\[\]\:\;\,]+)/g, "<span class='pn'>$1</span>").replace(/\!important/gi, "<span class='im'>!important</span>") })).replace(/\/\*([\w\W]+?)\*\//gm, "<span class='cm'>/*$1*/</span>"), e.innerHTML = "<code>" + a + "</code>", hr.style.display = "block", rt.style.display = "block" } else hr.style.display = "none", rt.style.display = "none" }

  function compressCSS(e) { var a = get(e),
          n = /@(media|-w|-m|-o|keyframes|page)(.*?)\{([\s\S]+?)?\}\}/gi,
          c = a.value,
          t = c.length;
      c = (c = sa.checked || sc.checked ? c.replace(/\/\*[\w\W]*?\*\//gm, "") : c.replace(/(\n+)?(\/\*[\w\W]*?\*\/)(\n+)?/gm, "\n$2\n")).replace(/([\n\r\t\s ]+)?([\,\:\;\{\}]+?)([\n\r\t\s ]+)?/g, "$2"), c = sc.checked ? c : c.replace(/\}(?!\})/g, "}\n"), c = bi.checked ? c.replace(n, function(e) { return e.replace(/\n+/g, "\n  ") }) : c.replace(n, function(e) { return e.replace(/\n+/g, "") }), c = bi.checked && !sc.checked ? c.replace(/\}\}/g, "}\n}") : c, c = bi.checked && !sc.checked ? c.replace(/@(media|-w|-m|-o|keyframes)(.*?)\{/g, "@$1$2{\n  ") : c, c = (c = (c = (c = (c = cm.checked ? c.replace(/;\}/g, "}") : c.replace(/\}/g, ";}").replace(/;+\}/g, ";}").replace(/\};\}/g, "}}")).replace(/\:0(px|em|pt)/gi, ":0")).replace(/ 0(px|em|pt)/gi, " 0")).replace(/\s+\!important/gi, "!important")).replace(/(^\n+|\n+$)/, ""), a.value = c, hr.innerHTML = "/* " + (t - c.length) + " of " + t + " unused characters has been removed. */\n" + c.replace(/</g, "&lt;").replace(/>/g, "&gt;"), highlightCode(hr) }

  function beautifyCss(e) { var a = $(e).val(),
          n = cssbeautify(a, { indent: "    ", openbrace: "end-of-line", autosemicolon: !0 });
      $(e).val(n) }

  function clearField(e) { var a = get(e);
      a.value = "", a.focus() }

  function selectAll(e) { get(e).focus(), get(e).select() }
  var hc = get("highlightCode"),
      sa = get("stripAllComment"),
      sc = get("superCompact"),
      cm = get("keepLastComma"),
      bi = get("betterIndentation"),
      bs = get("breakSelector"),
      tt = get("toTab"),
      to = get("tabOpt").getElementsByTagName("input"),
      sb = get("spaceBetween"),
      ip = get("inlineSingleProp"),
      rs = get("removeLastSemicolon"),
      il = get("inlineLayout"),
      si = get("singleBreak"),
      hr = get("highlightedResult"),
      rt = document.getElementsByTagName("h2")[1]; //]]>