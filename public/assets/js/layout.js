! function () {
    "use strict";
    var t, a, e;
    localStorage.getItem("defaultAttribute") && (t = document.documentElement.attributes, a = {}, Object.entries(t).forEach(function (t) {
        var e;
        t[1] && t[1].nodeName && "undefined" != t[1].nodeName && (e = t[1].nodeName, a[e] = t[1].nodeValue)
    }), localStorage.getItem("defaultAttribute") !== JSON.stringify(a) ? (localStorage.clear(), window.location.reload()) : ((e = {})["data-layout"] = localStorage.getItem("data-layout"), e["data-sidebar-size"] = localStorage.getItem("data-sidebar-size"), e["data-layout-mode"] = localStorage.getItem("data-layout-mode"), e["data-layout-width"] = localStorage.getItem("data-layout-width"), e["data-sidebar"] = localStorage.getItem("data-sidebar"), e["data-sidebar-image"] = localStorage.getItem("data-sidebar-image"), e["data-layout-direction"] = localStorage.getItem("data-layout-direction"), e["data-layout-position"] = localStorage.getItem("data-layout-position"), e["data-layout-style"] = localStorage.getItem("data-layout-style"), e["data-topbar"] = localStorage.getItem("data-topbar"), e["data-preloader"] = localStorage.getItem("data-preloader"), e["data-body-image"] = localStorage.getItem("data-body-image"), Object.keys(e).forEach(function (t) {
        e[t] && document.documentElement.setAttribute(t, e[t])
    })))
}();
