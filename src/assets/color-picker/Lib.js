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

function rgb_hsv(R, G, B) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = R / 255;
  gabs = G / 255;
  babs = B / 255;
  v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
  diffc = c => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = num => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = (1 / 3) + rr - bb;
    } else if (babs === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    H: Math.round(h * 360),
    S: percentRoundFn(s * 100),
    V: percentRoundFn(v * 100)
  };
}

function hsv_rgb(H, S, V) {

  let f, p = 1,
    q, t = 1,
    lH;
  let R, G, B;

  S /= 100;
  V /= 100;

  lH = Math.floor(H / 60);

  f = H / 60 - lH;
  p = V * (1 - S);
  q = V * (1 - S * f);
  t = V * (1 - (1 - f) * S);

  switch (lH) {

    case 0:
      R = V;
      G = t;
      B = p;
      break;
    case 1:
      R = q;
      G = V;
      B = p;
      break;
    case 2:
      R = p;
      G = V;
      B = t;
      break;
    case 3:
      R = p;
      G = q;
      B = V;
      break;
    case 4:
      R = t;
      G = p;
      B = V;
      break;
    case 5:
      R = V;
      G = p;
      B = q;
      break;
  }

  return [parseInt(R * 255), parseInt(G * 255), parseInt(B * 255)];
}

export {
  mouse,
  Obj,
  querySelector,
  cls,
  rgb_hsv,
  hsv_rgb
}
