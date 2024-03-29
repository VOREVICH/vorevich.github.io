! function(e, t) {
   "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).scrollIntoView = t()
}(this, (function() {
   "use strict";

   function e(e) {
       return "object" == typeof e && null != e && 1 === e.nodeType
   }

   function t(e, t) {
       return (!t || "hidden" !== e) && "visible" !== e && "clip" !== e
   }

   function n(e, n) {
       if (e.clientHeight < e.scrollHeight || e.clientWidth < e.scrollWidth) {
           var r = getComputedStyle(e, null);
           return t(r.overflowY, n) || t(r.overflowX, n) || function(e) {
               var t = function(e) {
                   if (!e.ownerDocument || !e.ownerDocument.defaultView) return null;
                   try {
                       return e.ownerDocument.defaultView.frameElement
                   } catch (e) {
                       return null
                   }
               }(e);
               return !!t && (t.clientHeight < e.scrollHeight || t.clientWidth < e.scrollWidth)
           }(e)
       }
       return !1
   }

   function r(e, t, n, r, o, i, l, c) {
       return i < e && l > t || i > e && l < t ? 0 : i <= e && c <= n || l >= t && c >= n ? i - e - r : l > t && c < n || i < e && c > n ? l - t + o : 0
   }

   function o(t, o) {
       var i = window,
           l = o.scrollMode,
           c = o.block,
           u = o.inline,
           a = o.boundary,
           f = o.skipOverflowHiddenElements,
           s = "function" == typeof a ? a : function(e) {
               return e !== a
           };
       if (!e(t)) throw new TypeError("Invalid target");
       for (var d = document.scrollingElement || document.documentElement, h = [], m = t; e(m) && s(m);) {
           if ((m = m.parentElement) === d) {
               h.push(m);
               break
           }
           null != m && m === document.body && n(m) && !n(document.documentElement) || null != m && n(m, f) && h.push(m)
       }
       for (var p = i.visualViewport ? i.visualViewport.width : innerWidth, v = i.visualViewport ? i.visualViewport.height : innerHeight, b = window.scrollX || pageXOffset, w = window.scrollY || pageYOffset, g = t.getBoundingClientRect(), y = g.height, W = g.width, M = g.top, T = g.right, H = g.bottom, x = g.left, E = "start" === c || "nearest" === c ? M : "end" === c ? H : M + y / 2, k = "center" === u ? x + W / 2 : "end" === u ? T : x, V = [], I = 0; I < h.length; I++) {
           var L = h[I],
               X = L.getBoundingClientRect(),
               Y = X.height,
               D = X.width,
               O = X.top,
               j = X.right,
               B = X.bottom,
               C = X.left;
           if ("if-needed" === l && M >= 0 && x >= 0 && H <= v && T <= p && M >= O && H <= B && x >= C && T <= j) return V;
           var P = getComputedStyle(L),
               R = parseInt(P.borderLeftWidth, 10),
               S = parseInt(P.borderTopWidth, 10),
               q = parseInt(P.borderRightWidth, 10),
               A = parseInt(P.borderBottomWidth, 10),
               F = 0,
               z = 0,
               G = "offsetWidth" in L ? L.offsetWidth - L.clientWidth - R - q : 0,
               J = "offsetHeight" in L ? L.offsetHeight - L.clientHeight - S - A : 0;
           if (d === L) F = "start" === c ? E : "end" === c ? E - v : "nearest" === c ? r(w, w + v, v, S, A, w + E, w + E + y, y) : E - v / 2, z = "start" === u ? k : "center" === u ? k - p / 2 : "end" === u ? k - p : r(b, b + p, p, R, q, b + k, b + k + W, W), F = Math.max(0, F + w), z = Math.max(0, z + b);
           else {
               F = "start" === c ? E - O - S : "end" === c ? E - B + A + J : "nearest" === c ? r(O, B, Y, S, A + J, E, E + y, y) : E - (O + Y / 2) + J / 2, z = "start" === u ? k - C - R : "center" === u ? k - (C + D / 2) + G / 2 : "end" === u ? k - j + q + G : r(C, j, D, R, q + G, k, k + W, W);
               var K = L.scrollLeft,
                   N = L.scrollTop;
               E += N - (F = Math.max(0, Math.min(N + F, L.scrollHeight - Y + J))), k += K - (z = Math.max(0, Math.min(K + z, L.scrollWidth - D + G)))
           }
           V.push({
               el: L,
               top: F,
               left: z
           })
       }
       return V
   }

   function i(e) {
       return e === Object(e) && 0 !== Object.keys(e).length
   }

   function l(e, t) {
       var n = !e.ownerDocument.documentElement.contains(e);
       if (i(t) && "function" == typeof t.behavior) return t.behavior(n ? [] : o(e, t));
       if (!n) {
           var r = function(e) {
               return !1 === e ? {
                   block: "end",
                   inline: "nearest"
               } : i(e) ? e : {
                   block: "start",
                   inline: "nearest"
               }
           }(t);
           return function(e, t) {
               void 0 === t && (t = "auto");
               var n = "scrollBehavior" in document.body.style;
               e.forEach((function(e) {
                   var r = e.el,
                       o = e.top,
                       i = e.left;
                   r.scroll && n ? r.scroll({
                       top: o,
                       left: i,
                       behavior: t
                   }) : (r.scrollTop = o, r.scrollLeft = i)
               }))
           }(o(e, r), r.behavior)
       }
   }
   var c, u = function() {
       return c || (c = "performance" in window ? performance.now.bind(performance) : Date.now), c()
   };

   function a(e) {
       var t = u(),
           n = Math.min((t - e.startTime) / e.duration, 1),
           r = e.ease(n),
           o = e.startX + (e.x - e.startX) * r,
           i = e.startY + (e.y - e.startY) * r;
       e.method(o, i), o !== e.x || i !== e.y ? requestAnimationFrame((function() {
           return a(e)
       })) : e.cb()
   }

   function f(e, t, n, r, o, i) {
       var l, c, f;
       void 0 === r && (r = 600), void 0 === o && (o = function(e) {
           return 1 + --e * e * e * e * e
       }), l = e, c = e.scrollLeft, f = e.scrollTop, a({
           scrollable: l,
           method: function(t, n) {
               e.scrollLeft = Math.ceil(t), e.scrollTop = Math.ceil(n)
           },
           startTime: u(),
           startX: c,
           startY: f,
           x: t,
           y: n,
           duration: r,
           ease: o,
           cb: i
       })
   }
   return function(e, t) {
       var n = t || {};
       return function(e) {
           return e && !e.behavior || "smooth" === e.behavior
       }(n) ? l(e, {
           block: n.block,
           inline: n.inline,
           scrollMode: n.scrollMode,
           boundary: n.boundary,
           behavior: function(e) {
               return Promise.all(e.reduce((function(e, t) {
                   var r = t.el,
                       o = t.left,
                       i = t.top,
                       l = r.scrollLeft,
                       c = r.scrollTop;
                   return l === o && c === i ? e : [].concat(e, [new Promise((function(e) {
                       return f(r, o, i, n.duration, n.ease, (function() {
                           return e({
                               el: r,
                               left: [l, o],
                               top: [c, i]
                           })
                       }))
                   }))])
               }), []))
           }
       }) : Promise.resolve(l(e, t))
   }
}));