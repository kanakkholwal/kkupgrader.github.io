function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

$(document).ready(function () {
  $("#circle").click(function () {
    $("#input").val(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">\r\n  <circle cx="20" cy="20" r="20" fill="none" stroke="#aaa" stroke-width="2" />\r\n</svg>'
    );
  });

  $("#use").click(function () {
    $("#input").val(
      '<svg viewBox="0 0 96 64" width="96" height="64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\r\n  <defs>\r\n    <symbol id="c">\r\n      <path fill="inherit" d="M0 0v32h32V0H0zm24 9.6c1 0 2 1.4 1 2.4L15 22c-.6.5-1.4.5-2 0l-4-4c-1.2-1.3.7-3.2 2-2l3 3 9-9c.4-.3.7-.4 1-.4z"/>\r\n    </symbol>\r\n  </defs>\r\n  <use x="0" y="0" xlink:href="#c" fill="olive" />\r\n  <use x="32" y="0" xlink:href="#c" fill="green" />\r\n  <use x="64" y="0" xlink:href="#c" fill="forestgreen" />\r\n  <use x="0" y="32" xlink:href="#c" fill="seagreen" />\r\n  <use x="32" y="32" xlink:href="#c" fill="darkolivegreen" />\r\n  <use x="64" y="32" xlink:href="#c" fill="olivedrab" />\r\n</svg>'
    );
  });

  $("#animate").click(function () {
    $("#input").val(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">\r\n<style type="text/css">\r\n  #c {animation: x 5s alternate infinite;}\r\n  @keyframes x { from { fill: gold; } to { fill: purple} }\r\n</style>\r\n<circle id="c" cx="20" cy="20" r="20" fill="gold"/>\r\n<!-- works in chrome ... not in IE and others -->\r\n</svg>'
    );
  });

  $("#trans").click(function () {
    $("#input").val(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">\r\n    <path fill="#ddd" d="m0 0h16v32h16V16H0z" />\r\n</svg>'
    );
  });

  // hat tip https://stackoverflow.com/a/55252641/581414
  $("#marker").click(function () {
    $("#input").val(
      '<svg viewBox="0 0 22 41" width="22" height="41" xmlns="http://www.w3.org/2000/svg">\r\n  <path d="M11 41 c-2-20-10-22-10-30 a10 10 0 1 1 20 0c0 8-8 10-10 30z" fill="tomato" stroke="#000" stroke-width="1.5"/>\r\n  <circle cx="11" cy="11" r="3"/>\r\n</svg>'
    );
  });

  $("#fenders").click(function () {
    $("#input").val(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="58" viewBox="0 0 200 58">\r\n  <defs>\r\n	  <linearGradient id="fl-tr" y2="1">\r\n		<stop offset="0" stop-color="#f47e5c"/>\r\n		<stop offset="1" stop-color="#f16281"/>\r\n	  </linearGradient>\r\n	  <linearGradient id="fl-bl" y2="1">\r\n		<stop offset="0" stop-color="#45bb8b"/>\r\n		<stop offset="1" stop-color="#26c4f4"/>\r\n	  </linearGradient>\r\n	  <linearGradient id="fl-tl" y2="1">\r\n		<stop offset=".3" stop-color="#f9bd27"/>\r\n		<stop offset=".7" stop-color="#f47e5c"/>\r\n	  </linearGradient>\r\n	  <linearGradient id="fl-br" y2="1">\r\n		<stop offset=".3" stop-color="#7650a0"/>\r\n		<stop offset=".7" stop-color="#6b3895"/>\r\n	  </linearGradient>\r\n  </defs>\r\n  <path fill="url(#fl-tr)" d="M170.1 20c-2.7-2.7-2.7-7 0-9.6 2.7-2.7 7-2.7 9.6 0l17.7 17.7c2.7 2.7 2.7 7 0 9.6-2.7 2.7-7 2.7-9.6 0L170.1 20z"/>\r\n  <path fill="url(#fl-bl)" d="M29.9 38c2.7 2.7 2.7 7 0 9.6-2.7 2.7-7 2.7-9.6 0L2.6 29.9c-2.7-2.7-2.7-7 0-9.6 2.7-2.7 7-2.7 9.6 0L29.9 38z"/>\r\n  <path fill="black" d="M48.3 20.2c-7.6 0-12.8 6.2-12.8 13.6v.1c0 8 5.8 13.5 13.6 13.5 3.8 0 6.7-1.2 9-3.2.5-.5 1-1.2 1-2.2 0-1.7-1.2-2.9-2.9-2.9-.8 0-1.3.2-1.8.6-1.5 1.1-3.2 1.8-5.2 1.8-3.3 0-5.6-1.8-6.3-5.1h14.6c1.9 0 3.4-1.4 3.4-3.6-.1-5.4-3.9-12.6-12.6-12.6zm-5.6 11.5c.6-3.4 2.6-5.6 5.6-5.6 3.1 0 5 2.2 5.5 5.6H42.7zM79 20.2c-3.7 0-5.9 2-7.6 4.2v-.3c0-2.1-1.6-3.7-3.7-3.7-2 0-3.7 1.7-3.7 3.7v19.4c0 2.1 1.6 3.7 3.7 3.7 2 0 3.7-1.7 3.7-3.7V32.3c0-3.5 1.8-5.3 4.6-5.3s4.5 1.8 4.5 5.3v11.2c0 2.1 1.6 3.7 3.7 3.7 2 0 3.7-1.7 3.7-3.7V29.9c-.1-6-3.4-9.7-8.9-9.7zm55.5 0c-7.6 0-12.8 6.2-12.8 13.6v.1c0 8 5.8 13.5 13.6 13.5 3.8 0 6.7-1.2 9-3.2.5-.5 1-1.2 1-2.2 0-1.7-1.2-2.9-2.9-2.9-.8 0-1.3.2-1.8.6-1.5 1.1-3.2 1.8-5.2 1.8-3.3 0-5.6-1.8-6.3-5.1h14.6c1.9 0 3.4-1.4 3.4-3.6-.1-5.4-3.9-12.6-12.6-12.6zm-5.6 11.5c.6-3.4 2.6-5.6 5.6-5.6 3.1 0 5 2.2 5.5 5.6h-11.1zM31.4 17.1h.6c1.6 0 3-1.4 3-3.1 0-1.7-1.3-2.8-2.5-3-.8-.1-1.8-.2-3-.2-2.6 0-4.6.7-6 2.1-1.4 1.4-2.1 3.5-2.1 6.4V21h-.3c-1.7 0-3.1 1.4-3.1 3.1s1.4 3 3.1 3h.3v16.4c0 2.1 1.6 3.7 3.7 3.7 2 0 3.7-1.7 3.7-3.7V27h3.1c1.7 0 3.1-1.3 3.1-3s-1.4-3-3.1-3h-3.2v-1c0-2 1-2.9 2.7-2.9zM179.2 31c-2.8-1-5.3-1.7-5.3-3.1v-.1c0-1 .9-1.8 2.7-1.8 1.5 0 3.5.6 5.6 1.7.5.2.8.3 1.4.3 1.6 0 3-1.3 3-2.9 0-1.3-.7-2.2-1.7-2.8-2.5-1.3-5.3-2-8-2-5.2 0-9.5 3-9.5 8.3v.1c0 5.1 4.1 6.8 7.7 7.9 2.9.9 5.4 1.4 5.4 3v.1c0 1.2-1 2-3.1 2s-4.6-.8-7-2.3c-.4-.2-.9-.4-1.5-.4-1.6 0-2.9 1.3-2.9 2.9 0 1.2.6 2.1 1.4 2.5 3.1 2.1 6.6 3 9.8 3 5.6 0 9.9-2.6 9.9-8.5v-.1c0-4.8-4.2-6.5-7.9-7.8zm-17.1-10.6c-2.2 0-3.9 2.3-5 4.9v-1.2c0-2.1-1.6-3.7-3.7-3.7-2 0-3.7 1.7-3.7 3.7v19.4c0 2.1 1.6 3.7 3.7 3.7 2 0 3.7-1.7 3.7-3.7v-6.9c0-5.3 2.1-8.2 5.8-9 1.5-.3 2.8-1.5 2.8-3.5 0-2.2-1.3-3.7-3.6-3.7zm-47.5-9.5c-2 0-3.7 1.7-3.7 3.7v9.5c-1.7-2.1-4.2-3.9-8.1-3.9C96.7 20.2 91 25 91 33.7v.1c0 8.7 5.8 13.5 11.8 13.5 3.8 0 6.3-1.8 8.1-4.3v.3c0 2.1 1.6 3.7 3.7 3.7 2 0 3.7-1.7 3.7-3.7V14.6c0-2-1.6-3.7-3.7-3.7zm-3.5 22.9c0 4.3-2.9 7.2-6.3 7.2s-6.3-2.9-6.3-7.2v-.1c0-4.4 2.9-7.2 6.3-7.2s6.3 2.9 6.3 7.3z"/>\r\n  <path fill="url(#fl-tl)" d="M29.5 2.4c2.6 2.7 2.6 7 0 9.7L12.1 29.7c-1.2 1.2-3.6 4.6-1.5 8.1 0 0-6.6-6.6-8-8.1C0 27 0 22.7 2.6 20L19.9 2.4c2.6-2.7 6.9-2.7 9.6 0z"/>\r\n  <path fill="url(#fl-br)" d="M170.5 55.6c-2.6-2.7-2.6-7 0-9.7l17.4-17.6c1.2-1.2 3.6-4.6 1.5-8.1 0 0 6.6 6.6 8 8.1 2.6 2.7 2.6 7 0 9.7L180 55.6c-2.5 2.7-6.8 2.7-9.5 0z"/>\r\n</svg>'
    );
  });

  $("#copy").click(function () {
    $("#output").focus();
    $("#output").select();
    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Copying text command was " + msg);
    } catch (err) {
      console.log("Oops, unable to copy");
    }
  });

  // URIs as defined by RFC 3986 (see Section 2: Characters)
  // may contain any of the following characters:
  // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=`.

  $("#convert").click(function () {
    var raw = $("#input").val();
    var encoded = raw.replace(/\s+/g, " ");

    // According to Taylor Hunt, lowercase gzips better ... my tiny test confirms this
    encoded = replaceAll(encoded, "%", "%25");
    encoded = replaceAll(encoded, "> <", "><"); // normalise spaces elements
    encoded = replaceAll(encoded, "; }", ";}"); // normalise spaces css
    encoded = replaceAll(encoded, "<", "%3c");
    encoded = replaceAll(encoded, ">", "%3e");
    encoded = replaceAll(encoded, '"', "'");
    encoded = replaceAll(encoded, "#", "%23"); // needed for ie and firefox
    encoded = replaceAll(encoded, "{", "%7b");
    encoded = replaceAll(encoded, "}", "%7d");
    encoded = replaceAll(encoded, "|", "%7c");
    encoded = replaceAll(encoded, "^", "%5e");
    encoded = replaceAll(encoded, "`", "%60");
    encoded = replaceAll(encoded, "@", "%40");

    // charset reportedly not needed ... I need to test before implementing
    var uri = 'url("data:image/svg+xml;charset=UTF-8,' + encoded + '")';
    var style = "background-image: " + uri + ";";

    $("#output").val(style);
    $("#bg").css({ "background-image": uri });

    // TODO some positionining (preserveAspectRatio)
    $("#bg").css({ "background-color": $("#background-colour").val() });
  });

  $("#background-colour").change(function () {
    $("#bg").css({ "background-color": $("#background-colour").val() });
  });
});
$("#clear").on("click", function () {
  $("textarea").val("");
});
