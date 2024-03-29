var mouse = {
  pageX: function (b) {
    var a, c, d;
    d = b || event;
    return null == d.pageX && null != d.clientX ? (a = document.body, c = document.documentElement, b = c.scrollLeft || a && a.scrollLeft || 0, b = d.clientX + b - (c.clientLeft || a.clientLeft || 0)) : d.pageX
  },
  pageY: function (b) {
    var a, c, d;
    d = b || event;
    return null == d.pageX && null != d.clientX ? (a = document.body, c = document.documentElement, b = c.scrollTop || a && a.scrollTop || 0, b = d.clientY + b - (c.clientTop || a.clientTop || 0)) : d.pageY
  }
};
var Obj = {
  positX: function (b) {
    var a, c;
    a = 0;
    c = b.getBoundingClientRect();
    b = document.body;
    a = document.documentElement;
    a = c.left + (a.scrollLeft || b && b.scrollLeft || 0) - (a.clientLeft || b.sclientLeft || 0);
    return Math.round(a)
  },
  positY: function (b) {
    var a, c;
    a = 0;
    c = b.getBoundingClientRect();
    b = document.body;
    a = document.documentElement;
    a = c.top + (a.scrollTop || b && b.scrollTop || 0) - (a.clientTop || b.sclientTop || 0);
    return Math.round(a)
  }
};
var querySelector = {
  All: function (b) {
    var a, c, d = [];
    a = document.querySelectorAll("[" + b + "]")
    if (a) return a;

    a = document.body.getElementsByTagName("*");
    for (var e = a.length; e--;) c = a[e], null !== c.getAttribute(b) &&
      d.push(c);
    return d
  }
};
var cls = {
  has: function (b, a) {
    var c, d;
    d = b.className.split(" ");
    for (c = d.length; c--;)
      if (d[c] === a) return !0;
    return !1
  },
  removeClass: function (b, a) {
    for (var c = b.className.split(" "), d = 0; d < c.length; d++) c[d] == a && c.splice(d--, 1);
    b.className = c.join(" ")
  },
  addClass: function (b, a) {
    for (var c = b.className.split(" "), d = 0; d < c.length; d++)
      if (c[d] == a) return;
    c.push(a);
    b.className = c.join(" ")
  }
};

export {
  mouse,
  Obj,
  querySelector,
  cls
}
