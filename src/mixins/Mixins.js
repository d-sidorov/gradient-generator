export default {
  methods: {
    hsv_rgb(H, S, V) {

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
    },

    rgb_hsv(R, G, B) {
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
  }
}
