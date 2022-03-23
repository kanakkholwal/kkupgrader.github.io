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