/**
 * Browser Image Compression
 * v1.0.14
 * by Donald <donaldcwl@gmail.com>
 * https://github.com/Donaldcwl/browser-image-compression
 */

function _defineProperty(e, r, t) {
  return (
    r in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  );
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    r &&
      (a = a.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, a);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
      : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
  }
  return e;
}
function _slicedToArray(e, r) {
  return (
    _arrayWithHoles(e) ||
    _iterableToArrayLimit(e, r) ||
    _unsupportedIterableToArray(e, r) ||
    _nonIterableRest()
  );
}
function _arrayWithHoles(e) {
  if (Array.isArray(e)) return e;
}
function _iterableToArrayLimit(e, r) {
  if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
    var t = [],
      a = !0,
      i = !1,
      f = void 0;
    try {
      for (
        var c, s = e[Symbol.iterator]();
        !(a = (c = s.next()).done) && (t.push(c.value), !r || t.length !== r);
        a = !0
      );
    } catch (e) {
      (i = !0), (f = e);
    } finally {
      try {
        a || null == s.return || s.return();
      } finally {
        if (i) throw f;
      }
    }
    return t;
  }
}
function _unsupportedIterableToArray(e, r) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, r);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    return (
      "Object" === t && e.constructor && (t = e.constructor.name),
      "Map" === t || "Set" === t
        ? Array.from(e)
        : "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        ? _arrayLikeToArray(e, r)
        : void 0
    );
  }
}
function _arrayLikeToArray(e, r) {
  (null == r || r > e.length) && (r = e.length);
  for (var t = 0, a = new Array(r); t < r; t++) a[t] = e[t];
  return a;
}
function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function createCommonjsModule(e) {
  var r = { exports: {} };
  return e(r, r.exports), r.exports;
}
var UZIP_1 = createCommonjsModule(function (e) {
    var r,
      t,
      UZIP = {};
    (e.exports = UZIP),
      (UZIP.parse = function (e, r) {
        for (
          var t = UZIP.bin.readUshort,
            a = UZIP.bin.readUint,
            i = 0,
            f = {},
            c = new Uint8Array(e),
            s = c.length - 4;
          101010256 != a(c, s);

        )
          s--;
        i = s;
        i += 4;
        var l = t(c, (i += 4)),
          u = (t(c, (i += 2)), a(c, (i += 2))),
          d = a(c, (i += 4));
        (i += 4), (i = d);
        for (var h = 0; h < l; h++) {
          a(c, i);
          (i += 4), (i += 4), (i += 4);
          a(c, (i += 4)), (u = a(c, (i += 4)));
          var A = a(c, (i += 4)),
            v = t(c, (i += 4)),
            p = t(c, i + 2),
            U = t(c, i + 4);
          i += 6;
          var g = a(c, (i += 8));
          (i += 4), (i += v + p + U), UZIP._readLocal(c, g, f, u, A, r);
        }
        return f;
      }),
      (UZIP._readLocal = function (e, r, t, a, i, f) {
        var c = UZIP.bin.readUshort,
          s = UZIP.bin.readUint,
          l = (s(e, r), c(e, (r += 4)), c(e, (r += 2)), c(e, (r += 2)));
        s(e, (r += 2)), s(e, (r += 4));
        r += 4;
        var u = c(e, (r += 8)),
          d = c(e, (r += 2));
        r += 2;
        var h = UZIP.bin.readUTF8(e, r, u);
        if (((r += u), (r += d), f)) t[h] = { size: i, csize: a };
        else {
          var A = new Uint8Array(e.buffer, r);
          if (0 == l) t[h] = new Uint8Array(A.buffer.slice(r, r + a));
          else {
            if (8 != l) throw "unknown compression method: " + l;
            var v = new Uint8Array(i);
            UZIP.inflateRaw(A, v), (t[h] = v);
          }
        }
      }),
      (UZIP.inflateRaw = function (e, r) {
        return UZIP.F.inflate(e, r);
      }),
      (UZIP.inflate = function (e, r) {
        e[0], e[1];
        return UZIP.inflateRaw(
          new Uint8Array(e.buffer, e.byteOffset + 2, e.length - 6),
          r
        );
      }),
      (UZIP.deflate = function (e, r) {
        null == r && (r = { level: 6 });
        var t = 0,
          a = new Uint8Array(50 + Math.floor(1.1 * e.length));
        (a[t] = 120),
          (a[t + 1] = 156),
          (t += 2),
          (t = UZIP.F.deflateRaw(e, a, t, r.level));
        var i = UZIP.adler(e, 0, e.length);
        return (
          (a[t + 0] = (i >>> 24) & 255),
          (a[t + 1] = (i >>> 16) & 255),
          (a[t + 2] = (i >>> 8) & 255),
          (a[t + 3] = (i >>> 0) & 255),
          new Uint8Array(a.buffer, 0, t + 4)
        );
      }),
      (UZIP.deflateRaw = function (e, r) {
        null == r && (r = { level: 6 });
        var t = new Uint8Array(50 + Math.floor(1.1 * e.length)),
          a = UZIP.F.deflateRaw(e, t, a, r.level);
        return new Uint8Array(t.buffer, 0, a);
      }),
      (UZIP.encode = function (e, r) {
        null == r && (r = !1);
        var t = 0,
          a = UZIP.bin.writeUint,
          i = UZIP.bin.writeUshort,
          f = {};
        for (var c in e) {
          var s = !UZIP._noNeed(c) && !r,
            l = e[c],
            u = UZIP.crc.crc(l, 0, l.length);
          f[c] = {
            cpr: s,
            usize: l.length,
            crc: u,
            file: s ? UZIP.deflateRaw(l) : l,
          };
        }
        for (var c in f)
          t += f[c].file.length + 30 + 46 + 2 * UZIP.bin.sizeUTF8(c);
        t += 22;
        var d = new Uint8Array(t),
          h = 0,
          A = [];
        for (var c in f) {
          var v = f[c];
          A.push(h), (h = UZIP._writeHeader(d, h, c, v, 0));
        }
        var p = 0,
          U = h;
        for (var c in f) {
          v = f[c];
          A.push(h), (h = UZIP._writeHeader(d, h, c, v, 1, A[p++]));
        }
        var g = h - U;
        return (
          a(d, h, 101010256),
          (h += 4),
          i(d, (h += 4), p),
          i(d, (h += 2), p),
          a(d, (h += 2), g),
          a(d, (h += 4), U),
          (h += 4),
          (h += 2),
          d.buffer
        );
      }),
      (UZIP._noNeed = function (e) {
        var r = e.split(".").pop().toLowerCase();
        return -1 != "png,jpg,jpeg,zip".indexOf(r);
      }),
      (UZIP._writeHeader = function (e, r, t, a, i, f) {
        var c = UZIP.bin.writeUint,
          s = UZIP.bin.writeUshort,
          l = a.file;
        return (
          c(e, r, 0 == i ? 67324752 : 33639248),
          (r += 4),
          1 == i && (r += 2),
          s(e, r, 20),
          s(e, (r += 2), 0),
          s(e, (r += 2), a.cpr ? 8 : 0),
          c(e, (r += 2), 0),
          c(e, (r += 4), a.crc),
          c(e, (r += 4), l.length),
          c(e, (r += 4), a.usize),
          s(e, (r += 4), UZIP.bin.sizeUTF8(t)),
          s(e, (r += 2), 0),
          (r += 2),
          1 == i && ((r += 2), (r += 2), c(e, (r += 6), f), (r += 4)),
          (r += UZIP.bin.writeUTF8(e, r, t)),
          0 == i && (e.set(l, r), (r += l.length)),
          r
        );
      }),
      (UZIP.crc = {
        table: (function () {
          for (var e = new Uint32Array(256), r = 0; r < 256; r++) {
            for (var t = r, a = 0; a < 8; a++)
              1 & t ? (t = 3988292384 ^ (t >>> 1)) : (t >>>= 1);
            e[r] = t;
          }
          return e;
        })(),
        update: function (e, r, t, a) {
          for (var i = 0; i < a; i++)
            e = UZIP.crc.table[255 & (e ^ r[t + i])] ^ (e >>> 8);
          return e;
        },
        crc: function (e, r, t) {
          return 4294967295 ^ UZIP.crc.update(4294967295, e, r, t);
        },
      }),
      (UZIP.adler = function (e, r, t) {
        for (var a = 1, i = 0, f = r, c = r + t; f < c; ) {
          for (var s = Math.min(f + 5552, c); f < s; ) i += a += e[f++];
          (a %= 65521), (i %= 65521);
        }
        return (i << 16) | a;
      }),
      (UZIP.bin = {
        readUshort: function (e, r) {
          return e[r] | (e[r + 1] << 8);
        },
        writeUshort: function (e, r, t) {
          (e[r] = 255 & t), (e[r + 1] = (t >> 8) & 255);
        },
        readUint: function (e, r) {
          return (
            16777216 * e[r + 3] + ((e[r + 2] << 16) | (e[r + 1] << 8) | e[r])
          );
        },
        writeUint: function (e, r, t) {
          (e[r] = 255 & t),
            (e[r + 1] = (t >> 8) & 255),
            (e[r + 2] = (t >> 16) & 255),
            (e[r + 3] = (t >> 24) & 255);
        },
        readASCII: function (e, r, t) {
          for (var a = "", i = 0; i < t; i++)
            a += String.fromCharCode(e[r + i]);
          return a;
        },
        writeASCII: function (e, r, t) {
          for (var a = 0; a < t.length; a++) e[r + a] = t.charCodeAt(a);
        },
        pad: function (e) {
          return e.length < 2 ? "0" + e : e;
        },
        readUTF8: function (e, r, t) {
          for (var a, i = "", f = 0; f < t; f++)
            i += "%" + UZIP.bin.pad(e[r + f].toString(16));
          try {
            a = decodeURIComponent(i);
          } catch (a) {
            return UZIP.bin.readASCII(e, r, t);
          }
          return a;
        },
        writeUTF8: function (e, r, t) {
          for (var a = t.length, i = 0, f = 0; f < a; f++) {
            var c = t.charCodeAt(f);
            if (0 == (4294967168 & c)) (e[r + i] = c), i++;
            else if (0 == (4294965248 & c))
              (e[r + i] = 192 | (c >> 6)),
                (e[r + i + 1] = 128 | ((c >> 0) & 63)),
                (i += 2);
            else if (0 == (4294901760 & c))
              (e[r + i] = 224 | (c >> 12)),
                (e[r + i + 1] = 128 | ((c >> 6) & 63)),
                (e[r + i + 2] = 128 | ((c >> 0) & 63)),
                (i += 3);
            else {
              if (0 != (4292870144 & c)) throw "e";
              (e[r + i] = 240 | (c >> 18)),
                (e[r + i + 1] = 128 | ((c >> 12) & 63)),
                (e[r + i + 2] = 128 | ((c >> 6) & 63)),
                (e[r + i + 3] = 128 | ((c >> 0) & 63)),
                (i += 4);
            }
          }
          return i;
        },
        sizeUTF8: function (e) {
          for (var r = e.length, t = 0, a = 0; a < r; a++) {
            var i = e.charCodeAt(a);
            if (0 == (4294967168 & i)) t++;
            else if (0 == (4294965248 & i)) t += 2;
            else if (0 == (4294901760 & i)) t += 3;
            else {
              if (0 != (4292870144 & i)) throw "e";
              t += 4;
            }
          }
          return t;
        },
      }),
      (UZIP.F = {}),
      (UZIP.F.deflateRaw = function (e, r, t, a) {
        var i = [
            [0, 0, 0, 0, 0],
            [4, 4, 8, 4, 0],
            [4, 5, 16, 8, 0],
            [4, 6, 16, 16, 0],
            [4, 10, 16, 32, 0],
            [8, 16, 32, 32, 0],
            [8, 16, 128, 128, 0],
            [8, 32, 128, 256, 0],
            [32, 128, 258, 1024, 1],
            [32, 258, 258, 4096, 1],
          ][a],
          f = UZIP.F.U,
          c = UZIP.F._goodIndex,
          s = (UZIP.F._hash, UZIP.F._putsE),
          l = 0,
          u = t << 3,
          d = 0,
          h = e.length;
        if (0 == a) {
          for (; l < h; ) {
            s(r, u, l + (I = Math.min(65535, h - l)) == h ? 1 : 0),
              (u = UZIP.F._copyExact(e, l, I, r, u + 8)),
              (l += I);
          }
          return u >>> 3;
        }
        var A = f.lits,
          v = f.strt,
          p = f.prev,
          U = 0,
          g = 0,
          m = 0,
          w = 0,
          P = 0,
          b = 0;
        for (h > 2 && (v[(b = UZIP.F._hash(e, 0))] = 0), l = 0; l < h; l++) {
          if (((P = b), l + 1 < h - 2)) {
            b = UZIP.F._hash(e, l + 1);
            var _ = (l + 1) & 32767;
            (p[_] = v[b]), (v[b] = _);
          }
          if (d <= l) {
            (U > 14e3 || g > 26697) &&
              h - l > 100 &&
              (d < l && ((A[U] = l - d), (U += 2), (d = l)),
              (u = UZIP.F._writeBlock(
                l == h - 1 || d == h ? 1 : 0,
                A,
                U,
                w,
                e,
                m,
                l - m,
                r,
                u
              )),
              (U = g = w = 0),
              (m = l));
            var y = 0;
            l < h - 2 &&
              (y = UZIP.F._bestMatch(e, l, p, P, Math.min(i[2], h - l), i[3]));
            var I = y >>> 16,
              F = 65535 & y;
            if (0 != y) {
              F = 65535 & y;
              var G = c((I = y >>> 16), f.of0);
              f.lhst[257 + G]++;
              var C = c(F, f.df0);
              f.dhst[C]++,
                (w += f.exb[G] + f.dxb[C]),
                (A[U] = (I << 23) | (l - d)),
                (A[U + 1] = (F << 16) | (G << 8) | C),
                (U += 2),
                (d = l + I);
            } else f.lhst[e[l]]++;
            g++;
          }
        }
        for (
          (m == l && 0 != e.length) ||
          (d < l && ((A[U] = l - d), (U += 2), (d = l)),
          (u = UZIP.F._writeBlock(1, A, U, w, e, m, l - m, r, u)),
          (U = 0),
          (g = 0),
          (U = g = w = 0),
          (m = l));
          0 != (7 & u);

        )
          u++;
        return u >>> 3;
      }),
      (UZIP.F._bestMatch = function (e, r, t, a, i, f) {
        var c = 32767 & r,
          s = t[c],
          l = (c - s + 32768) & 32767;
        if (s == c || a != UZIP.F._hash(e, r - l)) return 0;
        for (
          var u = 0, d = 0, h = Math.min(32767, r);
          l <= h && 0 != --f && s != c;

        ) {
          if (0 == u || e[r + u] == e[r + u - l]) {
            var A = UZIP.F._howLong(e, r, l);
            if (A > u) {
              if (((d = l), (u = A) >= i)) break;
              l + 2 < A && (A = l + 2);
              for (var v = 0, p = 0; p < A - 2; p++) {
                var U = (r - l + p + 32768) & 32767,
                  g = (U - t[U] + 32768) & 32767;
                g > v && ((v = g), (s = U));
              }
            }
          }
          l += ((c = s) - (s = t[c]) + 32768) & 32767;
        }
        return (u << 16) | d;
      }),
      (UZIP.F._howLong = function (e, r, t) {
        if (
          e[r] != e[r - t] ||
          e[r + 1] != e[r + 1 - t] ||
          e[r + 2] != e[r + 2 - t]
        )
          return 0;
        var a = r,
          i = Math.min(e.length, r + 258);
        for (r += 3; r < i && e[r] == e[r - t]; ) r++;
        return r - a;
      }),
      (UZIP.F._hash = function (e, r) {
        return (((e[r] << 8) | e[r + 1]) + (e[r + 2] << 4)) & 65535;
      }),
      (UZIP.saved = 0),
      (UZIP.F._writeBlock = function (e, r, t, a, i, f, c, s, l) {
        var u,
          d,
          h,
          A,
          v,
          p,
          U,
          g,
          m,
          w = UZIP.F.U,
          P = UZIP.F._putsF,
          b = UZIP.F._putsE;
        w.lhst[256]++,
          (d = (u = UZIP.F.getTrees())[0]),
          (h = u[1]),
          (A = u[2]),
          (v = u[3]),
          (p = u[4]),
          (U = u[5]),
          (g = u[6]),
          (m = u[7]);
        var _ = 32 + (0 == ((l + 3) & 7) ? 0 : 8 - ((l + 3) & 7)) + (c << 3),
          y =
            a +
            UZIP.F.contSize(w.fltree, w.lhst) +
            UZIP.F.contSize(w.fdtree, w.dhst),
          I =
            a +
            UZIP.F.contSize(w.ltree, w.lhst) +
            UZIP.F.contSize(w.dtree, w.dhst);
        I +=
          14 +
          3 * U +
          UZIP.F.contSize(w.itree, w.ihst) +
          (2 * w.ihst[16] + 3 * w.ihst[17] + 7 * w.ihst[18]);
        for (var F = 0; F < 286; F++) w.lhst[F] = 0;
        for (F = 0; F < 30; F++) w.dhst[F] = 0;
        for (F = 0; F < 19; F++) w.ihst[F] = 0;
        var G = _ < y && _ < I ? 0 : y < I ? 1 : 2;
        if ((P(s, l, e), P(s, l + 1, G), (l += 3), 0 == G)) {
          for (; 0 != (7 & l); ) l++;
          l = UZIP.F._copyExact(i, f, c, s, l);
        } else {
          var C, E;
          if ((1 == G && ((C = w.fltree), (E = w.fdtree)), 2 == G)) {
            UZIP.F.makeCodes(w.ltree, d),
              UZIP.F.revCodes(w.ltree, d),
              UZIP.F.makeCodes(w.dtree, h),
              UZIP.F.revCodes(w.dtree, h),
              UZIP.F.makeCodes(w.itree, A),
              UZIP.F.revCodes(w.itree, A),
              (C = w.ltree),
              (E = w.dtree),
              b(s, l, v - 257),
              b(s, (l += 5), p - 1),
              b(s, (l += 5), U - 4),
              (l += 4);
            for (var B = 0; B < U; B++)
              b(s, l + 3 * B, w.itree[1 + (w.ordr[B] << 1)]);
            (l += 3 * U),
              (l = UZIP.F._codeTiny(g, w.itree, s, l)),
              (l = UZIP.F._codeTiny(m, w.itree, s, l));
          }
          for (var Z = f, x = 0; x < t; x += 2) {
            for (var M = r[x], R = M >>> 23, Q = Z + (8388607 & M); Z < Q; )
              l = UZIP.F._writeLit(i[Z++], C, s, l);
            if (0 != R) {
              var T = r[x + 1],
                D = T >> 16,
                O = (T >> 8) & 255,
                V = 255 & T;
              b(s, (l = UZIP.F._writeLit(257 + O, C, s, l)), R - w.of0[O]),
                (l += w.exb[O]),
                P(s, (l = UZIP.F._writeLit(V, E, s, l)), D - w.df0[V]),
                (l += w.dxb[V]),
                (Z += R);
            }
          }
          l = UZIP.F._writeLit(256, C, s, l);
        }
        return l;
      }),
      (UZIP.F._copyExact = function (e, r, t, a, i) {
        var f = i >>> 3;
        return (
          (a[f] = t),
          (a[f + 1] = t >>> 8),
          (a[f + 2] = 255 - a[f]),
          (a[f + 3] = 255 - a[f + 1]),
          (f += 4),
          a.set(new Uint8Array(e.buffer, r, t), f),
          i + ((t + 4) << 3)
        );
      }),
      (UZIP.F.getTrees = function () {
        for (
          var e = UZIP.F.U,
            r = UZIP.F._hufTree(e.lhst, e.ltree, 15),
            t = UZIP.F._hufTree(e.dhst, e.dtree, 15),
            a = [],
            i = UZIP.F._lenCodes(e.ltree, a),
            f = [],
            c = UZIP.F._lenCodes(e.dtree, f),
            s = 0;
          s < a.length;
          s += 2
        )
          e.ihst[a[s]]++;
        for (s = 0; s < f.length; s += 2) e.ihst[f[s]]++;
        for (
          var l = UZIP.F._hufTree(e.ihst, e.itree, 7), u = 19;
          u > 4 && 0 == e.itree[1 + (e.ordr[u - 1] << 1)];

        )
          u--;
        return [r, t, l, i, c, u, a, f];
      }),
      (UZIP.F.getSecond = function (e) {
        for (var r = [], t = 0; t < e.length; t += 2) r.push(e[t + 1]);
        return r;
      }),
      (UZIP.F.nonZero = function (e) {
        for (var r = "", t = 0; t < e.length; t += 2)
          0 != e[t + 1] && (r += (t >> 1) + ",");
        return r;
      }),
      (UZIP.F.contSize = function (e, r) {
        for (var t = 0, a = 0; a < r.length; a++) t += r[a] * e[1 + (a << 1)];
        return t;
      }),
      (UZIP.F._codeTiny = function (e, r, t, a) {
        for (var i = 0; i < e.length; i += 2) {
          var f = e[i],
            c = e[i + 1];
          a = UZIP.F._writeLit(f, r, t, a);
          var s = 16 == f ? 2 : 17 == f ? 3 : 7;
          f > 15 && (UZIP.F._putsE(t, a, c, s), (a += s));
        }
        return a;
      }),
      (UZIP.F._lenCodes = function (e, r) {
        for (var t = e.length; 2 != t && 0 == e[t - 1]; ) t -= 2;
        for (var a = 0; a < t; a += 2) {
          var i = e[a + 1],
            f = a + 3 < t ? e[a + 3] : -1,
            c = a + 5 < t ? e[a + 5] : -1,
            s = 0 == a ? -1 : e[a - 1];
          if (0 == i && f == i && c == i) {
            for (var l = a + 5; l + 2 < t && e[l + 2] == i; ) l += 2;
            (u = Math.min((l + 1 - a) >>> 1, 138)) < 11
              ? r.push(17, u - 3)
              : r.push(18, u - 11),
              (a += 2 * u - 2);
          } else if (i == s && f == i && c == i) {
            for (l = a + 5; l + 2 < t && e[l + 2] == i; ) l += 2;
            var u = Math.min((l + 1 - a) >>> 1, 6);
            r.push(16, u - 3), (a += 2 * u - 2);
          } else r.push(i, 0);
        }
        return t >>> 1;
      }),
      (UZIP.F._hufTree = function (e, r, t) {
        var a = [],
          i = e.length,
          f = r.length,
          c = 0;
        for (c = 0; c < f; c += 2) (r[c] = 0), (r[c + 1] = 0);
        for (c = 0; c < i; c++) 0 != e[c] && a.push({ lit: c, f: e[c] });
        var s = a.length,
          l = a.slice(0);
        if (0 == s) return 0;
        if (1 == s) {
          var u = a[0].lit;
          l = 0 == u ? 1 : 0;
          return (r[1 + (u << 1)] = 1), (r[1 + (l << 1)] = 1), 1;
        }
        a.sort(function (e, r) {
          return e.f - r.f;
        });
        var d = a[0],
          h = a[1],
          A = 0,
          v = 1,
          p = 2;
        for (a[0] = { lit: -1, f: d.f + h.f, l: d, r: h, d: 0 }; v != s - 1; )
          (d = A != v && (p == s || a[A].f < a[p].f) ? a[A++] : a[p++]),
            (h = A != v && (p == s || a[A].f < a[p].f) ? a[A++] : a[p++]),
            (a[v++] = { lit: -1, f: d.f + h.f, l: d, r: h });
        var U = UZIP.F.setDepth(a[v - 1], 0);
        for (
          U > t && (UZIP.F.restrictDepth(l, t, U), (U = t)), c = 0;
          c < s;
          c++
        )
          r[1 + (l[c].lit << 1)] = l[c].d;
        return U;
      }),
      (UZIP.F.setDepth = function (e, r) {
        return -1 != e.lit
          ? ((e.d = r), r)
          : Math.max(UZIP.F.setDepth(e.l, r + 1), UZIP.F.setDepth(e.r, r + 1));
      }),
      (UZIP.F.restrictDepth = function (e, r, t) {
        var a = 0,
          i = 1 << (t - r),
          f = 0;
        for (
          e.sort(function (e, r) {
            return r.d == e.d ? e.f - r.f : r.d - e.d;
          }),
            a = 0;
          a < e.length && e[a].d > r;
          a++
        ) {
          var c = e[a].d;
          (e[a].d = r), (f += i - (1 << (t - c)));
        }
        for (f >>>= t - r; f > 0; ) {
          (c = e[a].d) < r ? (e[a].d++, (f -= 1 << (r - c - 1))) : a++;
        }
        for (; a >= 0; a--) e[a].d == r && f < 0 && (e[a].d--, f++);
        0 != f && console.log("debt left");
      }),
      (UZIP.F._goodIndex = function (e, r) {
        var t = 0;
        return (
          r[16 | t] <= e && (t |= 16),
          r[8 | t] <= e && (t |= 8),
          r[4 | t] <= e && (t |= 4),
          r[2 | t] <= e && (t |= 2),
          r[1 | t] <= e && (t |= 1),
          t
        );
      }),
      (UZIP.F._writeLit = function (e, r, t, a) {
        return UZIP.F._putsF(t, a, r[e << 1]), a + r[1 + (e << 1)];
      }),
      (UZIP.F.inflate = function (e, r) {
        var t = Uint8Array;
        if (3 == e[0] && 0 == e[1]) return r || new t(0);
        var a = UZIP.F,
          i = a._bitsF,
          f = a._bitsE,
          c = a._decodeTiny,
          s = a.makeCodes,
          l = a.codes2map,
          u = a._get17,
          d = a.U,
          h = null == r;
        h && (r = new t((e.length >>> 2) << 3));
        for (
          var A,
            v,
            p = 0,
            U = 0,
            g = 0,
            m = 0,
            w = 0,
            P = 0,
            b = 0,
            _ = 0,
            y = 0;
          0 == p;

        )
          if (((p = i(e, y, 1)), (U = i(e, y + 1, 2)), (y += 3), 0 != U)) {
            if (
              (h && (r = UZIP.F._check(r, _ + (1 << 17))),
              1 == U && ((A = d.flmap), (v = d.fdmap), (P = 511), (b = 31)),
              2 == U)
            ) {
              (g = f(e, y, 5) + 257),
                (m = f(e, y + 5, 5) + 1),
                (w = f(e, y + 10, 4) + 4),
                (y += 14);
              for (var I = 0; I < 38; I += 2)
                (d.itree[I] = 0), (d.itree[I + 1] = 0);
              var F = 1;
              for (I = 0; I < w; I++) {
                var G = f(e, y + 3 * I, 3);
                (d.itree[1 + (d.ordr[I] << 1)] = G), G > F && (F = G);
              }
              (y += 3 * w),
                s(d.itree, F),
                l(d.itree, F, d.imap),
                (A = d.lmap),
                (v = d.dmap),
                (y = c(d.imap, (1 << F) - 1, g + m, e, y, d.ttree));
              var C = a._copyOut(d.ttree, 0, g, d.ltree);
              P = (1 << C) - 1;
              var E = a._copyOut(d.ttree, g, m, d.dtree);
              (b = (1 << E) - 1),
                s(d.ltree, C),
                l(d.ltree, C, A),
                s(d.dtree, E),
                l(d.dtree, E, v);
            }
            for (;;) {
              var B = A[u(e, y) & P];
              y += 15 & B;
              var Z = B >>> 4;
              if (Z >>> 8 == 0) r[_++] = Z;
              else {
                if (256 == Z) break;
                var x = _ + Z - 254;
                if (Z > 264) {
                  var M = d.ldef[Z - 257];
                  (x = _ + (M >>> 3) + f(e, y, 7 & M)), (y += 7 & M);
                }
                var R = v[u(e, y) & b];
                y += 15 & R;
                var Q = R >>> 4,
                  T = d.ddef[Q],
                  D = (T >>> 4) + i(e, y, 15 & T);
                for (
                  y += 15 & T, h && (r = UZIP.F._check(r, _ + (1 << 17)));
                  _ < x;

                )
                  (r[_] = r[_++ - D]),
                    (r[_] = r[_++ - D]),
                    (r[_] = r[_++ - D]),
                    (r[_] = r[_++ - D]);
                _ = x;
              }
            }
          } else {
            0 != (7 & y) && (y += 8 - (7 & y));
            var O = 4 + (y >>> 3),
              V = e[O - 4] | (e[O - 3] << 8);
            h && (r = UZIP.F._check(r, _ + V)),
              r.set(new t(e.buffer, e.byteOffset + O, V), _),
              (y = (O + V) << 3),
              (_ += V);
          }
        return r.length == _ ? r : r.slice(0, _);
      }),
      (UZIP.F._check = function (e, r) {
        var t = e.length;
        if (r <= t) return e;
        var a = new Uint8Array(Math.max(t << 1, r));
        return a.set(e, 0), a;
      }),
      (UZIP.F._decodeTiny = function (e, r, t, a, i, f) {
        for (var c = UZIP.F._bitsE, s = UZIP.F._get17, l = 0; l < t; ) {
          var u = e[s(a, i) & r];
          i += 15 & u;
          var d = u >>> 4;
          if (d <= 15) (f[l] = d), l++;
          else {
            var h = 0,
              A = 0;
            16 == d
              ? ((A = 3 + c(a, i, 2)), (i += 2), (h = f[l - 1]))
              : 17 == d
              ? ((A = 3 + c(a, i, 3)), (i += 3))
              : 18 == d && ((A = 11 + c(a, i, 7)), (i += 7));
            for (var v = l + A; l < v; ) (f[l] = h), l++;
          }
        }
        return i;
      }),
      (UZIP.F._copyOut = function (e, r, t, a) {
        for (var i = 0, f = 0, c = a.length >>> 1; f < t; ) {
          var s = e[f + r];
          (a[f << 1] = 0), (a[1 + (f << 1)] = s), s > i && (i = s), f++;
        }
        for (; f < c; ) (a[f << 1] = 0), (a[1 + (f << 1)] = 0), f++;
        return i;
      }),
      (UZIP.F.makeCodes = function (e, r) {
        for (
          var t, a, i, f, c = UZIP.F.U, s = e.length, l = c.bl_count, u = 0;
          u <= r;
          u++
        )
          l[u] = 0;
        for (u = 1; u < s; u += 2) l[e[u]]++;
        var d = c.next_code;
        for (t = 0, l[0] = 0, a = 1; a <= r; a++)
          (t = (t + l[a - 1]) << 1), (d[a] = t);
        for (i = 0; i < s; i += 2)
          0 != (f = e[i + 1]) && ((e[i] = d[f]), d[f]++);
      }),
      (UZIP.F.codes2map = function (e, r, t) {
        for (var a = e.length, i = UZIP.F.U.rev15, f = 0; f < a; f += 2)
          if (0 != e[f + 1])
            for (
              var c = f >> 1,
                s = e[f + 1],
                l = (c << 4) | s,
                u = r - s,
                d = e[f] << u,
                h = d + (1 << u);
              d != h;

            ) {
              (t[i[d] >>> (15 - r)] = l), d++;
            }
      }),
      (UZIP.F.revCodes = function (e, r) {
        for (var t = UZIP.F.U.rev15, a = 15 - r, i = 0; i < e.length; i += 2) {
          var f = e[i] << (r - e[i + 1]);
          e[i] = t[f] >>> a;
        }
      }),
      (UZIP.F._putsE = function (e, r, t) {
        t <<= 7 & r;
        var a = r >>> 3;
        (e[a] |= t), (e[a + 1] |= t >>> 8);
      }),
      (UZIP.F._putsF = function (e, r, t) {
        t <<= 7 & r;
        var a = r >>> 3;
        (e[a] |= t), (e[a + 1] |= t >>> 8), (e[a + 2] |= t >>> 16);
      }),
      (UZIP.F._bitsE = function (e, r, t) {
        return (
          ((e[r >>> 3] | (e[1 + (r >>> 3)] << 8)) >>> (7 & r)) & ((1 << t) - 1)
        );
      }),
      (UZIP.F._bitsF = function (e, r, t) {
        return (
          ((e[r >>> 3] | (e[1 + (r >>> 3)] << 8) | (e[2 + (r >>> 3)] << 16)) >>>
            (7 & r)) &
          ((1 << t) - 1)
        );
      }),
      (UZIP.F._get17 = function (e, r) {
        return (
          (e[r >>> 3] | (e[1 + (r >>> 3)] << 8) | (e[2 + (r >>> 3)] << 16)) >>>
          (7 & r)
        );
      }),
      (UZIP.F._get25 = function (e, r) {
        return (
          (e[r >>> 3] |
            (e[1 + (r >>> 3)] << 8) |
            (e[2 + (r >>> 3)] << 16) |
            (e[3 + (r >>> 3)] << 24)) >>>
          (7 & r)
        );
      }),
      (UZIP.F.U =
        ((r = Uint16Array),
        (t = Uint32Array),
        {
          next_code: new r(16),
          bl_count: new r(16),
          ordr: [
            16,
            17,
            18,
            0,
            8,
            7,
            9,
            6,
            10,
            5,
            11,
            4,
            12,
            3,
            13,
            2,
            14,
            1,
            15,
          ],
          of0: [
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            13,
            15,
            17,
            19,
            23,
            27,
            31,
            35,
            43,
            51,
            59,
            67,
            83,
            99,
            115,
            131,
            163,
            195,
            227,
            258,
            999,
            999,
            999,
          ],
          exb: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            2,
            2,
            2,
            2,
            3,
            3,
            3,
            3,
            4,
            4,
            4,
            4,
            5,
            5,
            5,
            5,
            0,
            0,
            0,
            0,
          ],
          ldef: new r(32),
          df0: [
            1,
            2,
            3,
            4,
            5,
            7,
            9,
            13,
            17,
            25,
            33,
            49,
            65,
            97,
            129,
            193,
            257,
            385,
            513,
            769,
            1025,
            1537,
            2049,
            3073,
            4097,
            6145,
            8193,
            12289,
            16385,
            24577,
            65535,
            65535,
          ],
          dxb: [
            0,
            0,
            0,
            0,
            1,
            1,
            2,
            2,
            3,
            3,
            4,
            4,
            5,
            5,
            6,
            6,
            7,
            7,
            8,
            8,
            9,
            9,
            10,
            10,
            11,
            11,
            12,
            12,
            13,
            13,
            0,
            0,
          ],
          ddef: new t(32),
          flmap: new r(512),
          fltree: [],
          fdmap: new r(32),
          fdtree: [],
          lmap: new r(32768),
          ltree: [],
          ttree: [],
          dmap: new r(32768),
          dtree: [],
          imap: new r(512),
          itree: [],
          rev15: new r(32768),
          lhst: new t(286),
          dhst: new t(30),
          ihst: new t(19),
          lits: new t(15e3),
          strt: new r(65536),
          prev: new r(32768),
        })),
      (function () {
        for (var e = UZIP.F.U, r = 0; r < 32768; r++) {
          var t = r;
          (t =
            ((4278255360 &
              (t =
                ((4042322160 &
                  (t =
                    ((3435973836 &
                      (t =
                        ((2863311530 & t) >>> 1) | ((1431655765 & t) << 1))) >>>
                      2) |
                    ((858993459 & t) << 2))) >>>
                  4) |
                ((252645135 & t) << 4))) >>>
              8) |
            ((16711935 & t) << 8)),
            (e.rev15[r] = ((t >>> 16) | (t << 16)) >>> 17);
        }
        function pushV(e, r, t) {
          for (; 0 != r--; ) e.push(0, t);
        }
        for (r = 0; r < 32; r++)
          (e.ldef[r] = (e.of0[r] << 3) | e.exb[r]),
            (e.ddef[r] = (e.df0[r] << 4) | e.dxb[r]);
        pushV(e.fltree, 144, 8),
          pushV(e.fltree, 112, 9),
          pushV(e.fltree, 24, 7),
          pushV(e.fltree, 8, 8),
          UZIP.F.makeCodes(e.fltree, 9),
          UZIP.F.codes2map(e.fltree, 9, e.flmap),
          UZIP.F.revCodes(e.fltree, 9),
          pushV(e.fdtree, 32, 5),
          UZIP.F.makeCodes(e.fdtree, 5),
          UZIP.F.codes2map(e.fdtree, 5, e.fdmap),
          UZIP.F.revCodes(e.fdtree, 5),
          pushV(e.itree, 19, 0),
          pushV(e.ltree, 286, 0),
          pushV(e.dtree, 30, 0),
          pushV(e.ttree, 320, 0);
      })();
  }),
  UZIP = Object.freeze(
    Object.assign(Object.create(null), UZIP_1, { default: UZIP_1 })
  ),
  UPNG = {},
  N,
  W,
  H;
(UPNG.toRGBA8 = function (e) {
  var r = e.width,
    t = e.height;
  if (null == e.tabs.acTL)
    return [UPNG.toRGBA8.decodeImage(e.data, r, t, e).buffer];
  var a = [];
  null == e.frames[0].data && (e.frames[0].data = e.data);
  for (
    var i = r * t * 4,
      f = new Uint8Array(i),
      c = new Uint8Array(i),
      s = new Uint8Array(i),
      l = 0;
    l < e.frames.length;
    l++
  ) {
    var u = e.frames[l],
      d = u.rect.x,
      h = u.rect.y,
      A = u.rect.width,
      v = u.rect.height,
      p = UPNG.toRGBA8.decodeImage(u.data, A, v, e);
    if (0 != l) for (var U = 0; U < i; U++) s[U] = f[U];
    if (
      (0 == u.blend
        ? UPNG._copyTile(p, A, v, f, r, t, d, h, 0)
        : 1 == u.blend && UPNG._copyTile(p, A, v, f, r, t, d, h, 1),
      a.push(f.buffer.slice(0)),
      0 == u.dispose)
    );
    else if (1 == u.dispose) UPNG._copyTile(c, A, v, f, r, t, d, h, 0);
    else if (2 == u.dispose) for (U = 0; U < i; U++) f[U] = s[U];
  }
  return a;
}),
  (UPNG.toRGBA8.decodeImage = function (e, r, t, a) {
    var i = r * t,
      f = UPNG.decode._getBPP(a),
      c = Math.ceil((r * f) / 8),
      s = new Uint8Array(4 * i),
      l = new Uint32Array(s.buffer),
      u = a.ctype,
      d = a.depth,
      h = UPNG._bin.readUshort;
    if (6 == u) {
      var A = i << 2;
      if (8 == d)
        for (var v = 0; v < A; v += 4)
          (s[v] = e[v]),
            (s[v + 1] = e[v + 1]),
            (s[v + 2] = e[v + 2]),
            (s[v + 3] = e[v + 3]);
      if (16 == d) for (v = 0; v < A; v++) s[v] = e[v << 1];
    } else if (2 == u) {
      var p = a.tabs.tRNS;
      if (null == p) {
        if (8 == d)
          for (v = 0; v < i; v++) {
            var U = 3 * v;
            l[v] = (255 << 24) | (e[U + 2] << 16) | (e[U + 1] << 8) | e[U];
          }
        if (16 == d)
          for (v = 0; v < i; v++) {
            U = 6 * v;
            l[v] = (255 << 24) | (e[U + 4] << 16) | (e[U + 2] << 8) | e[U];
          }
      } else {
        var g = p[0],
          m = p[1],
          w = p[2];
        if (8 == d)
          for (v = 0; v < i; v++) {
            var P = v << 2;
            U = 3 * v;
            (l[v] = (255 << 24) | (e[U + 2] << 16) | (e[U + 1] << 8) | e[U]),
              e[U] == g && e[U + 1] == m && e[U + 2] == w && (s[P + 3] = 0);
          }
        if (16 == d)
          for (v = 0; v < i; v++) {
            (P = v << 2), (U = 6 * v);
            (l[v] = (255 << 24) | (e[U + 4] << 16) | (e[U + 2] << 8) | e[U]),
              h(e, U) == g &&
                h(e, U + 2) == m &&
                h(e, U + 4) == w &&
                (s[P + 3] = 0);
          }
      }
    } else if (3 == u) {
      var b = a.tabs.PLTE,
        _ = a.tabs.tRNS,
        y = _ ? _.length : 0;
      if (1 == d)
        for (var I = 0; I < t; I++) {
          var F = I * c,
            G = I * r;
          for (v = 0; v < r; v++) {
            P = (G + v) << 2;
            var C = 3 * (E = (e[F + (v >> 3)] >> (7 - ((7 & v) << 0))) & 1);
            (s[P] = b[C]),
              (s[P + 1] = b[C + 1]),
              (s[P + 2] = b[C + 2]),
              (s[P + 3] = E < y ? _[E] : 255);
          }
        }
      if (2 == d)
        for (I = 0; I < t; I++)
          for (F = I * c, G = I * r, v = 0; v < r; v++) {
            (P = (G + v) << 2),
              (C = 3 * (E = (e[F + (v >> 2)] >> (6 - ((3 & v) << 1))) & 3));
            (s[P] = b[C]),
              (s[P + 1] = b[C + 1]),
              (s[P + 2] = b[C + 2]),
              (s[P + 3] = E < y ? _[E] : 255);
          }
      if (4 == d)
        for (I = 0; I < t; I++)
          for (F = I * c, G = I * r, v = 0; v < r; v++) {
            (P = (G + v) << 2),
              (C = 3 * (E = (e[F + (v >> 1)] >> (4 - ((1 & v) << 2))) & 15));
            (s[P] = b[C]),
              (s[P + 1] = b[C + 1]),
              (s[P + 2] = b[C + 2]),
              (s[P + 3] = E < y ? _[E] : 255);
          }
      if (8 == d)
        for (v = 0; v < i; v++) {
          var E;
          (P = v << 2), (C = 3 * (E = e[v]));
          (s[P] = b[C]),
            (s[P + 1] = b[C + 1]),
            (s[P + 2] = b[C + 2]),
            (s[P + 3] = E < y ? _[E] : 255);
        }
    } else if (4 == u) {
      if (8 == d)
        for (v = 0; v < i; v++) {
          P = v << 2;
          var B = e[(Z = v << 1)];
          (s[P] = B), (s[P + 1] = B), (s[P + 2] = B), (s[P + 3] = e[Z + 1]);
        }
      if (16 == d)
        for (v = 0; v < i; v++) {
          var Z;
          (P = v << 2), (B = e[(Z = v << 2)]);
          (s[P] = B), (s[P + 1] = B), (s[P + 2] = B), (s[P + 3] = e[Z + 2]);
        }
    } else if (0 == u)
      for (g = a.tabs.tRNS ? a.tabs.tRNS : -1, I = 0; I < t; I++) {
        var x = I * c,
          M = I * r;
        if (1 == d)
          for (var R = 0; R < r; R++) {
            var Q =
              (B = 255 * ((e[x + (R >>> 3)] >>> (7 - (7 & R))) & 1)) == 255 * g
                ? 0
                : 255;
            l[M + R] = (Q << 24) | (B << 16) | (B << 8) | B;
          }
        else if (2 == d)
          for (R = 0; R < r; R++) {
            Q =
              (B = 85 * ((e[x + (R >>> 2)] >>> (6 - ((3 & R) << 1))) & 3)) ==
              85 * g
                ? 0
                : 255;
            l[M + R] = (Q << 24) | (B << 16) | (B << 8) | B;
          }
        else if (4 == d)
          for (R = 0; R < r; R++) {
            Q =
              (B = 17 * ((e[x + (R >>> 1)] >>> (4 - ((1 & R) << 2))) & 15)) ==
              17 * g
                ? 0
                : 255;
            l[M + R] = (Q << 24) | (B << 16) | (B << 8) | B;
          }
        else if (8 == d)
          for (R = 0; R < r; R++) {
            Q = (B = e[x + R]) == g ? 0 : 255;
            l[M + R] = (Q << 24) | (B << 16) | (B << 8) | B;
          }
        else if (16 == d)
          for (R = 0; R < r; R++) {
            (B = e[x + (R << 1)]), (Q = h(e, x + (R << v)) == g ? 0 : 255);
            l[M + R] = (Q << 24) | (B << 16) | (B << 8) | B;
          }
      }
    return s;
  }),
  (UPNG.decode = function (e) {
    for (
      var r,
        t = new Uint8Array(e),
        a = 8,
        i = UPNG._bin,
        f = i.readUshort,
        c = i.readUint,
        s = { tabs: {}, frames: [] },
        l = new Uint8Array(t.length),
        u = 0,
        d = 0,
        h = [137, 80, 78, 71, 13, 10, 26, 10],
        A = 0;
      A < 8;
      A++
    )
      if (t[A] != h[A]) throw "The input is not a PNG file!";
    for (; a < t.length; ) {
      var v = i.readUint(t, a);
      a += 4;
      var p = i.readASCII(t, a, 4);
      if (((a += 4), "IHDR" == p)) UPNG.decode._IHDR(t, a, s);
      else if ("CgBI" == p) s.tabs[p] = t.slice(a, a + 4);
      else if ("IDAT" == p) {
        for (A = 0; A < v; A++) l[u + A] = t[a + A];
        u += v;
      } else if ("acTL" == p)
        (s.tabs[p] = { num_frames: c(t, a), num_plays: c(t, a + 4) }),
          (r = new Uint8Array(t.length));
      else if ("fcTL" == p) {
        var U;
        if (0 != d)
          ((U = s.frames[s.frames.length - 1]).data = UPNG.decode._decompress(
            s,
            r.slice(0, d),
            U.rect.width,
            U.rect.height
          )),
            (d = 0);
        var g = {
            x: c(t, a + 12),
            y: c(t, a + 16),
            width: c(t, a + 4),
            height: c(t, a + 8),
          },
          m = f(t, a + 22);
        m = f(t, a + 20) / (0 == m ? 100 : m);
        var w = {
          rect: g,
          delay: Math.round(1e3 * m),
          dispose: t[a + 24],
          blend: t[a + 25],
        };
        s.frames.push(w);
      } else if ("fdAT" == p) {
        for (A = 0; A < v - 4; A++) r[d + A] = t[a + A + 4];
        d += v - 4;
      } else if ("pHYs" == p)
        s.tabs[p] = [i.readUint(t, a), i.readUint(t, a + 4), t[a + 8]];
      else if ("cHRM" == p) {
        s.tabs[p] = [];
        for (A = 0; A < 8; A++) s.tabs[p].push(i.readUint(t, a + 4 * A));
      } else if ("tEXt" == p || "zTXt" == p) {
        null == s.tabs[p] && (s.tabs[p] = {});
        var P = i.nextZero(t, a),
          b = i.readASCII(t, a, P - a),
          _ = a + v - P - 1;
        if ("tEXt" == p) G = i.readASCII(t, P + 1, _);
        else {
          var y = UPNG.decode._inflate(t.slice(P + 2, P + 2 + _));
          G = i.readUTF8(y, 0, y.length);
        }
        s.tabs[p][b] = G;
      } else if ("iTXt" == p) {
        null == s.tabs[p] && (s.tabs[p] = {});
        P = 0;
        var I = a;
        P = i.nextZero(t, I);
        b = i.readASCII(t, I, P - I);
        var F = t[(I = P + 1)];
        (I += 2), (P = i.nextZero(t, I));
        i.readASCII(t, I, P - I);
        (I = P + 1), (P = i.nextZero(t, I));
        var G;
        i.readUTF8(t, I, P - I), (_ = v - ((I = P + 1) - a));
        if (0 == F) G = i.readUTF8(t, I, _);
        else {
          y = UPNG.decode._inflate(t.slice(I, I + _));
          G = i.readUTF8(y, 0, y.length);
        }
        s.tabs[p][b] = G;
      } else if ("PLTE" == p) s.tabs[p] = i.readBytes(t, a, v);
      else if ("hIST" == p) {
        var C = s.tabs.PLTE.length / 3;
        s.tabs[p] = [];
        for (A = 0; A < C; A++) s.tabs[p].push(f(t, a + 2 * A));
      } else if ("tRNS" == p)
        3 == s.ctype
          ? (s.tabs[p] = i.readBytes(t, a, v))
          : 0 == s.ctype
          ? (s.tabs[p] = f(t, a))
          : 2 == s.ctype && (s.tabs[p] = [f(t, a), f(t, a + 2), f(t, a + 4)]);
      else if ("gAMA" == p) s.tabs[p] = i.readUint(t, a) / 1e5;
      else if ("sRGB" == p) s.tabs[p] = t[a];
      else if ("bKGD" == p)
        0 == s.ctype || 4 == s.ctype
          ? (s.tabs[p] = [f(t, a)])
          : 2 == s.ctype || 6 == s.ctype
          ? (s.tabs[p] = [f(t, a), f(t, a + 2), f(t, a + 4)])
          : 3 == s.ctype && (s.tabs[p] = t[a]);
      else if ("IEND" == p) break;
      a += v;
      i.readUint(t, a);
      a += 4;
    }
    0 != d &&
      (((U = s.frames[s.frames.length - 1]).data = UPNG.decode._decompress(
        s,
        r.slice(0, d),
        U.rect.width,
        U.rect.height
      )),
      (d = 0));
    return (
      (s.data = UPNG.decode._decompress(s, l, s.width, s.height)),
      delete s.compress,
      delete s.interlace,
      delete s.filter,
      s
    );
  }),
  (UPNG.decode._decompress = function (e, r, t, a) {
    var i = UPNG.decode._getBPP(e),
      f = Math.ceil((t * i) / 8),
      c = new Uint8Array((f + 1 + e.interlace) * a);
    return (
      (r = e.tabs.CgBI ? UPNG.inflateRaw(r, c) : UPNG.decode._inflate(r, c)),
      0 == e.interlace
        ? (r = UPNG.decode._filterZero(r, e, 0, t, a))
        : 1 == e.interlace && (r = UPNG.decode._readInterlace(r, e)),
      r
    );
  }),
  (UPNG.decode._inflate = function (e, r) {
    return UPNG.inflateRaw(new Uint8Array(e.buffer, 2, e.length - 6), r);
  }),
  (UPNG.inflateRaw =
    ((H = {}),
    (H.H = {}),
    (H.H.N = function (e, r) {
      var t,
        a,
        i = Uint8Array,
        f = 0,
        c = 0,
        s = 0,
        l = 0,
        u = 0,
        d = 0,
        h = 0,
        A = 0,
        v = 0;
      if (3 == e[0] && 0 == e[1]) return r || new i(0);
      var p = H.H,
        U = p.b,
        g = p.e,
        m = p.R,
        w = p.n,
        P = p.A,
        b = p.Z,
        _ = p.m,
        y = null == r;
      for (y && (r = new i((e.length >>> 2) << 5)); 0 == f; )
        if (((f = U(e, v, 1)), (c = U(e, v + 1, 2)), (v += 3), 0 != c)) {
          if (
            (y && (r = H.H.W(r, A + (1 << 17))),
            1 == c && ((t = _.J), (a = _.h), (d = 511), (h = 31)),
            2 == c)
          ) {
            (s = g(e, v, 5) + 257),
              (l = g(e, v + 5, 5) + 1),
              (u = g(e, v + 10, 4) + 4),
              (v += 14);
            for (var I = 1, F = 0; F < 38; F += 2)
              (_.Q[F] = 0), (_.Q[F + 1] = 0);
            for (F = 0; F < u; F++) {
              var G = g(e, v + 3 * F, 3);
              (_.Q[1 + (_.X[F] << 1)] = G), G > I && (I = G);
            }
            (v += 3 * u),
              w(_.Q, I),
              P(_.Q, I, _.u),
              (t = _.w),
              (a = _.d),
              (v = m(_.u, (1 << I) - 1, s + l, e, v, _.v));
            var C = p.V(_.v, 0, s, _.C);
            d = (1 << C) - 1;
            var E = p.V(_.v, s, l, _.D);
            (h = (1 << E) - 1),
              w(_.C, C),
              P(_.C, C, t),
              w(_.D, E),
              P(_.D, E, a);
          }
          for (;;) {
            var B = t[b(e, v) & d];
            v += 15 & B;
            var Z = B >>> 4;
            if (Z >>> 8 == 0) r[A++] = Z;
            else {
              if (256 == Z) break;
              var x = A + Z - 254;
              if (Z > 264) {
                var M = _.q[Z - 257];
                (x = A + (M >>> 3) + g(e, v, 7 & M)), (v += 7 & M);
              }
              var R = a[b(e, v) & h];
              v += 15 & R;
              var Q = R >>> 4,
                T = _.c[Q],
                D = (T >>> 4) + U(e, v, 15 & T);
              for (v += 15 & T; A < x; )
                (r[A] = r[A++ - D]),
                  (r[A] = r[A++ - D]),
                  (r[A] = r[A++ - D]),
                  (r[A] = r[A++ - D]);
              A = x;
            }
          }
        } else {
          0 != (7 & v) && (v += 8 - (7 & v));
          var O = 4 + (v >>> 3),
            V = e[O - 4] | (e[O - 3] << 8);
          y && (r = H.H.W(r, A + V)),
            r.set(new i(e.buffer, e.byteOffset + O, V), A),
            (v = (O + V) << 3),
            (A += V);
        }
      return r.length == A ? r : r.slice(0, A);
    }),
    (H.H.W = function (e, r) {
      var t = e.length;
      if (r <= t) return e;
      var a = new Uint8Array(t << 1);
      return a.set(e, 0), a;
    }),
    (H.H.R = function (e, r, t, a, i, f) {
      for (var c = H.H.e, s = H.H.Z, l = 0; l < t; ) {
        var u = e[s(a, i) & r];
        i += 15 & u;
        var d = u >>> 4;
        if (d <= 15) (f[l] = d), l++;
        else {
          var h = 0,
            A = 0;
          16 == d
            ? ((A = 3 + c(a, i, 2)), (i += 2), (h = f[l - 1]))
            : 17 == d
            ? ((A = 3 + c(a, i, 3)), (i += 3))
            : 18 == d && ((A = 11 + c(a, i, 7)), (i += 7));
          for (var v = l + A; l < v; ) (f[l] = h), l++;
        }
      }
      return i;
    }),
    (H.H.V = function (e, r, t, a) {
      for (var i = 0, f = 0, c = a.length >>> 1; f < t; ) {
        var s = e[f + r];
        (a[f << 1] = 0), (a[1 + (f << 1)] = s), s > i && (i = s), f++;
      }
      for (; f < c; ) (a[f << 1] = 0), (a[1 + (f << 1)] = 0), f++;
      return i;
    }),
    (H.H.n = function (e, r) {
      for (var t, a, i, f, c = H.H.m, s = e.length, l = c.j, u = 0; u <= r; u++)
        l[u] = 0;
      for (u = 1; u < s; u += 2) l[e[u]]++;
      var d = c.K;
      for (t = 0, l[0] = 0, a = 1; a <= r; a++)
        (t = (t + l[a - 1]) << 1), (d[a] = t);
      for (i = 0; i < s; i += 2) 0 != (f = e[i + 1]) && ((e[i] = d[f]), d[f]++);
    }),
    (H.H.A = function (e, r, t) {
      for (var a = e.length, i = H.H.m.r, f = 0; f < a; f += 2)
        if (0 != e[f + 1])
          for (
            var c = f >> 1,
              s = e[f + 1],
              l = (c << 4) | s,
              u = r - s,
              d = e[f] << u,
              h = d + (1 << u);
            d != h;

          )
            (t[i[d] >>> (15 - r)] = l), d++;
    }),
    (H.H.l = function (e, r) {
      for (var t = H.H.m.r, a = 15 - r, i = 0; i < e.length; i += 2) {
        var f = e[i] << (r - e[i + 1]);
        e[i] = t[f] >>> a;
      }
    }),
    (H.H.M = function (e, r, t) {
      t <<= 7 & r;
      var a = r >>> 3;
      (e[a] |= t), (e[a + 1] |= t >>> 8);
    }),
    (H.H.I = function (e, r, t) {
      t <<= 7 & r;
      var a = r >>> 3;
      (e[a] |= t), (e[a + 1] |= t >>> 8), (e[a + 2] |= t >>> 16);
    }),
    (H.H.e = function (e, r, t) {
      return (
        ((e[r >>> 3] | (e[1 + (r >>> 3)] << 8)) >>> (7 & r)) & ((1 << t) - 1)
      );
    }),
    (H.H.b = function (e, r, t) {
      return (
        ((e[r >>> 3] | (e[1 + (r >>> 3)] << 8) | (e[2 + (r >>> 3)] << 16)) >>>
          (7 & r)) &
        ((1 << t) - 1)
      );
    }),
    (H.H.Z = function (e, r) {
      return (
        (e[r >>> 3] | (e[1 + (r >>> 3)] << 8) | (e[2 + (r >>> 3)] << 16)) >>>
        (7 & r)
      );
    }),
    (H.H.i = function (e, r) {
      return (
        (e[r >>> 3] |
          (e[1 + (r >>> 3)] << 8) |
          (e[2 + (r >>> 3)] << 16) |
          (e[3 + (r >>> 3)] << 24)) >>>
        (7 & r)
      );
    }),
    (H.H.m =
      ((N = Uint16Array),
      (W = Uint32Array),
      {
        K: new N(16),
        j: new N(16),
        X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        S: [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          13,
          15,
          17,
          19,
          23,
          27,
          31,
          35,
          43,
          51,
          59,
          67,
          83,
          99,
          115,
          131,
          163,
          195,
          227,
          258,
          999,
          999,
          999,
        ],
        T: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          2,
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          4,
          4,
          4,
          4,
          5,
          5,
          5,
          5,
          0,
          0,
          0,
          0,
        ],
        q: new N(32),
        p: [
          1,
          2,
          3,
          4,
          5,
          7,
          9,
          13,
          17,
          25,
          33,
          49,
          65,
          97,
          129,
          193,
          257,
          385,
          513,
          769,
          1025,
          1537,
          2049,
          3073,
          4097,
          6145,
          8193,
          12289,
          16385,
          24577,
          65535,
          65535,
        ],
        z: [
          0,
          0,
          0,
          0,
          1,
          1,
          2,
          2,
          3,
          3,
          4,
          4,
          5,
          5,
          6,
          6,
          7,
          7,
          8,
          8,
          9,
          9,
          10,
          10,
          11,
          11,
          12,
          12,
          13,
          13,
          0,
          0,
        ],
        c: new W(32),
        J: new N(512),
        _: [],
        h: new N(32),
        $: [],
        w: new N(32768),
        C: [],
        v: [],
        d: new N(32768),
        D: [],
        u: new N(512),
        Q: [],
        r: new N(32768),
        s: new W(286),
        Y: new W(30),
        a: new W(19),
        t: new W(15e3),
        k: new N(65536),
        g: new N(32768),
      })),
    (function () {
      for (var e = H.H.m, r = 0; r < 32768; r++) {
        var t = r;
        (t =
          ((4278255360 &
            (t =
              ((4042322160 &
                (t =
                  ((3435973836 &
                    (t =
                      ((2863311530 & t) >>> 1) | ((1431655765 & t) << 1))) >>>
                    2) |
                  ((858993459 & t) << 2))) >>>
                4) |
              ((252645135 & t) << 4))) >>>
            8) |
          ((16711935 & t) << 8)),
          (e.r[r] = ((t >>> 16) | (t << 16)) >>> 17);
      }
      function n(e, r, t) {
        for (; 0 != r--; ) e.push(0, t);
      }
      for (r = 0; r < 32; r++)
        (e.q[r] = (e.S[r] << 3) | e.T[r]), (e.c[r] = (e.p[r] << 4) | e.z[r]);
      n(e._, 144, 8),
        n(e._, 112, 9),
        n(e._, 24, 7),
        n(e._, 8, 8),
        H.H.n(e._, 9),
        H.H.A(e._, 9, e.J),
        H.H.l(e._, 9),
        n(e.$, 32, 5),
        H.H.n(e.$, 5),
        H.H.A(e.$, 5, e.h),
        H.H.l(e.$, 5),
        n(e.Q, 19, 0),
        n(e.C, 286, 0),
        n(e.D, 30, 0),
        n(e.v, 320, 0);
    })(),
    H.H.N)),
  (UPNG.decode._readInterlace = function (e, r) {
    for (
      var t = r.width,
        a = r.height,
        i = UPNG.decode._getBPP(r),
        f = i >> 3,
        c = Math.ceil((t * i) / 8),
        s = new Uint8Array(a * c),
        l = 0,
        u = [0, 0, 4, 0, 2, 0, 1],
        d = [0, 4, 0, 2, 0, 1, 0],
        h = [8, 8, 8, 4, 4, 2, 2],
        A = [8, 8, 4, 4, 2, 2, 1],
        v = 0;
      v < 7;

    ) {
      for (var p = h[v], U = A[v], g = 0, m = 0, w = u[v]; w < a; )
        (w += p), m++;
      for (var P = d[v]; P < t; ) (P += U), g++;
      var b = Math.ceil((g * i) / 8);
      UPNG.decode._filterZero(e, r, l, g, m);
      for (var _ = 0, y = u[v]; y < a; ) {
        for (var I = d[v], F = (l + _ * b) << 3; I < t; ) {
          var G;
          if (1 == i)
            (G = ((G = e[F >> 3]) >> (7 - (7 & F))) & 1),
              (s[y * c + (I >> 3)] |= G << (7 - ((7 & I) << 0)));
          if (2 == i)
            (G = ((G = e[F >> 3]) >> (6 - (7 & F))) & 3),
              (s[y * c + (I >> 2)] |= G << (6 - ((3 & I) << 1)));
          if (4 == i)
            (G = ((G = e[F >> 3]) >> (4 - (7 & F))) & 15),
              (s[y * c + (I >> 1)] |= G << (4 - ((1 & I) << 2)));
          if (i >= 8)
            for (var C = y * c + I * f, E = 0; E < f; E++)
              s[C + E] = e[(F >> 3) + E];
          (F += i), (I += U);
        }
        _++, (y += p);
      }
      g * m != 0 && (l += m * (1 + b)), (v += 1);
    }
    return s;
  }),
  (UPNG.decode._getBPP = function (e) {
    return [1, null, 3, 1, 2, null, 4][e.ctype] * e.depth;
  }),
  (UPNG.decode._filterZero = function (e, r, t, a, i) {
    var f = UPNG.decode._getBPP(r),
      c = Math.ceil((a * f) / 8),
      s = UPNG.decode._paeth;
    f = Math.ceil(f / 8);
    var l = 0,
      u = 1,
      d = e[t],
      h = 0;
    if ((d > 1 && (e[t] = [0, 0, 1][d - 2]), 3 == d))
      for (h = f; h < c; h++)
        e[h + 1] = (e[h + 1] + (e[h + 1 - f] >>> 1)) & 255;
    for (var A = 0; A < i; A++)
      if (((h = 0), 0 == (d = e[(u = (l = t + A * c) + A + 1) - 1])))
        for (; h < c; h++) e[l + h] = e[u + h];
      else if (1 == d) {
        for (; h < f; h++) e[l + h] = e[u + h];
        for (; h < c; h++) e[l + h] = e[u + h] + e[l + h - f];
      } else if (2 == d) for (; h < c; h++) e[l + h] = e[u + h] + e[l + h - c];
      else if (3 == d) {
        for (; h < f; h++) e[l + h] = e[u + h] + (e[l + h - c] >>> 1);
        for (; h < c; h++)
          e[l + h] = e[u + h] + ((e[l + h - c] + e[l + h - f]) >>> 1);
      } else {
        for (; h < f; h++) e[l + h] = e[u + h] + s(0, e[l + h - c], 0);
        for (; h < c; h++)
          e[l + h] = e[u + h] + s(e[l + h - f], e[l + h - c], e[l + h - f - c]);
      }
    return e;
  }),
  (UPNG.decode._paeth = function (e, r, t) {
    var a = e + r - t,
      i = a - e,
      f = a - r,
      c = a - t;
    return i * i <= f * f && i * i <= c * c ? e : f * f <= c * c ? r : t;
  }),
  (UPNG.decode._IHDR = function (e, r, t) {
    var a = UPNG._bin;
    (t.width = a.readUint(e, r)),
      (r += 4),
      (t.height = a.readUint(e, r)),
      (r += 4),
      (t.depth = e[r]),
      r++,
      (t.ctype = e[r]),
      r++,
      (t.compress = e[r]),
      r++,
      (t.filter = e[r]),
      r++,
      (t.interlace = e[r]),
      r++;
  }),
  (UPNG._bin = {
    nextZero: function nextZero(e, r) {
      for (; 0 != e[r]; ) r++;
      return r;
    },
    readUshort: function readUshort(e, r) {
      return (e[r] << 8) | e[r + 1];
    },
    writeUshort: function writeUshort(e, r, t) {
      (e[r] = (t >> 8) & 255), (e[r + 1] = 255 & t);
    },
    readUint: function readUint(e, r) {
      return 16777216 * e[r] + ((e[r + 1] << 16) | (e[r + 2] << 8) | e[r + 3]);
    },
    writeUint: function writeUint(e, r, t) {
      (e[r] = (t >> 24) & 255),
        (e[r + 1] = (t >> 16) & 255),
        (e[r + 2] = (t >> 8) & 255),
        (e[r + 3] = 255 & t);
    },
    readASCII: function readASCII(e, r, t) {
      for (var a = "", i = 0; i < t; i++) a += String.fromCharCode(e[r + i]);
      return a;
    },
    writeASCII: function writeASCII(e, r, t) {
      for (var a = 0; a < t.length; a++) e[r + a] = t.charCodeAt(a);
    },
    readBytes: function readBytes(e, r, t) {
      for (var a = [], i = 0; i < t; i++) a.push(e[r + i]);
      return a;
    },
    pad: function pad(e) {
      return e.length < 2 ? "0" + e : e;
    },
    readUTF8: function readUTF8(e, r, t) {
      for (var a, i = "", f = 0; f < t; f++)
        i += "%" + UPNG._bin.pad(e[r + f].toString(16));
      try {
        a = decodeURIComponent(i);
      } catch (a) {
        return UPNG._bin.readASCII(e, r, t);
      }
      return a;
    },
  }),
  (UPNG._copyTile = function (e, r, t, a, i, f, c, s, l) {
    for (
      var u = Math.min(r, i), d = Math.min(t, f), h = 0, A = 0, v = 0;
      v < d;
      v++
    )
      for (var p = 0; p < u; p++)
        if (
          (c >= 0 && s >= 0
            ? ((h = (v * r + p) << 2), (A = ((s + v) * i + c + p) << 2))
            : ((h = ((-s + v) * r - c + p) << 2), (A = (v * i + p) << 2)),
          0 == l)
        )
          (a[A] = e[h]),
            (a[A + 1] = e[h + 1]),
            (a[A + 2] = e[h + 2]),
            (a[A + 3] = e[h + 3]);
        else if (1 == l) {
          var U = e[h + 3] * (1 / 255),
            g = e[h] * U,
            m = e[h + 1] * U,
            w = e[h + 2] * U,
            P = a[A + 3] * (1 / 255),
            b = a[A] * P,
            _ = a[A + 1] * P,
            y = a[A + 2] * P,
            I = 1 - U,
            F = U + P * I,
            G = 0 == F ? 0 : 1 / F;
          (a[A + 3] = 255 * F),
            (a[A + 0] = (g + b * I) * G),
            (a[A + 1] = (m + _ * I) * G),
            (a[A + 2] = (w + y * I) * G);
        } else if (2 == l) {
          (U = e[h + 3]),
            (g = e[h]),
            (m = e[h + 1]),
            (w = e[h + 2]),
            (P = a[A + 3]),
            (b = a[A]),
            (_ = a[A + 1]),
            (y = a[A + 2]);
          U == P && g == b && m == _ && w == y
            ? ((a[A] = 0), (a[A + 1] = 0), (a[A + 2] = 0), (a[A + 3] = 0))
            : ((a[A] = g), (a[A + 1] = m), (a[A + 2] = w), (a[A + 3] = U));
        } else if (3 == l) {
          (U = e[h + 3]),
            (g = e[h]),
            (m = e[h + 1]),
            (w = e[h + 2]),
            (P = a[A + 3]),
            (b = a[A]),
            (_ = a[A + 1]),
            (y = a[A + 2]);
          if (U == P && g == b && m == _ && w == y) continue;
          if (U < 220 && P > 20) return !1;
        }
    return !0;
  }),
  (UPNG.encode = function (e, r, t, a, i, f, c) {
    null == a && (a = 0), null == c && (c = !1);
    var s = UPNG.encode.compress(e, r, t, a, [!1, !1, !1, 0, c]);
    return UPNG.encode.compressPNG(s, -1), UPNG.encode._main(s, r, t, i, f);
  }),
  (UPNG.encodeLL = function (e, r, t, a, i, f, c, s) {
    for (
      var l = {
          ctype: 0 + (1 == a ? 0 : 2) + (0 == i ? 0 : 4),
          depth: f,
          frames: [],
        },
        u = (a + i) * f,
        d = u * r,
        h = 0;
      h < e.length;
      h++
    )
      l.frames.push({
        rect: { x: 0, y: 0, width: r, height: t },
        img: new Uint8Array(e[h]),
        blend: 0,
        dispose: 1,
        bpp: Math.ceil(u / 8),
        bpl: Math.ceil(d / 8),
      });
    return UPNG.encode.compressPNG(l, 0, !0), UPNG.encode._main(l, r, t, c, s);
  }),
  (UPNG.encode._main = function (e, r, t, a, i) {
    null == i && (i = {});
    var f = UPNG.crc.crc,
      c = UPNG._bin.writeUint,
      s = UPNG._bin.writeUshort,
      l = UPNG._bin.writeASCII,
      u = 8,
      d = e.frames.length > 1,
      h = !1,
      A = 33 + (d ? 20 : 0);
    if (
      (null != i.sRGB && (A += 13), null != i.pHYs && (A += 21), 3 == e.ctype)
    ) {
      for (var v = e.plte.length, p = 0; p < v; p++)
        e.plte[p] >>> 24 != 255 && (h = !0);
      A += 8 + 3 * v + 4 + (h ? 8 + 1 * v + 4 : 0);
    }
    for (var U = 0; U < e.frames.length; U++) {
      d && (A += 38),
        (A += (F = e.frames[U]).cimg.length + 12),
        0 != U && (A += 4);
    }
    A += 12;
    var g = new Uint8Array(A),
      m = [137, 80, 78, 71, 13, 10, 26, 10];
    for (p = 0; p < 8; p++) g[p] = m[p];
    if (
      (c(g, u, 13),
      l(g, (u += 4), "IHDR"),
      c(g, (u += 4), r),
      c(g, (u += 4), t),
      (g[(u += 4)] = e.depth),
      (g[++u] = e.ctype),
      (g[++u] = 0),
      (g[++u] = 0),
      (g[++u] = 0),
      c(g, ++u, f(g, u - 17, 17)),
      (u += 4),
      null != i.sRGB &&
        (c(g, u, 1),
        l(g, (u += 4), "sRGB"),
        (g[(u += 4)] = i.sRGB),
        c(g, ++u, f(g, u - 5, 5)),
        (u += 4)),
      null != i.pHYs &&
        (c(g, u, 9),
        l(g, (u += 4), "pHYs"),
        c(g, (u += 4), i.pHYs[0]),
        c(g, (u += 4), i.pHYs[1]),
        (g[(u += 4)] = i.pHYs[2]),
        c(g, ++u, f(g, u - 13, 13)),
        (u += 4)),
      d &&
        (c(g, u, 8),
        l(g, (u += 4), "acTL"),
        c(g, (u += 4), e.frames.length),
        c(g, (u += 4), null != i.loop ? i.loop : 0),
        c(g, (u += 4), f(g, u - 12, 12)),
        (u += 4)),
      3 == e.ctype)
    ) {
      c(g, u, 3 * (v = e.plte.length)), l(g, (u += 4), "PLTE"), (u += 4);
      for (p = 0; p < v; p++) {
        var w = 3 * p,
          P = e.plte[p],
          b = 255 & P,
          _ = (P >>> 8) & 255,
          y = (P >>> 16) & 255;
        (g[u + w + 0] = b), (g[u + w + 1] = _), (g[u + w + 2] = y);
      }
      if ((c(g, (u += 3 * v), f(g, u - 3 * v - 4, 3 * v + 4)), (u += 4), h)) {
        c(g, u, v), l(g, (u += 4), "tRNS"), (u += 4);
        for (p = 0; p < v; p++) g[u + p] = (e.plte[p] >>> 24) & 255;
        c(g, (u += v), f(g, u - v - 4, v + 4)), (u += 4);
      }
    }
    var I = 0;
    for (U = 0; U < e.frames.length; U++) {
      var F = e.frames[U];
      d &&
        (c(g, u, 26),
        l(g, (u += 4), "fcTL"),
        c(g, (u += 4), I++),
        c(g, (u += 4), F.rect.width),
        c(g, (u += 4), F.rect.height),
        c(g, (u += 4), F.rect.x),
        c(g, (u += 4), F.rect.y),
        s(g, (u += 4), a[U]),
        s(g, (u += 2), 1e3),
        (g[(u += 2)] = F.dispose),
        (g[++u] = F.blend),
        c(g, ++u, f(g, u - 30, 30)),
        (u += 4));
      var G = F.cimg;
      c(g, u, (v = G.length) + (0 == U ? 0 : 4));
      var C = (u += 4);
      l(g, u, 0 == U ? "IDAT" : "fdAT"),
        (u += 4),
        0 != U && (c(g, u, I++), (u += 4)),
        g.set(G, u),
        c(g, (u += v), f(g, C, u - C)),
        (u += 4);
    }
    return (
      c(g, u, 0),
      l(g, (u += 4), "IEND"),
      c(g, (u += 4), f(g, u - 4, 4)),
      (u += 4),
      g.buffer
    );
  }),
  (UPNG.encode.compressPNG = function (e, r, t) {
    for (var a = 0; a < e.frames.length; a++) {
      var i = e.frames[a],
        f = (i.rect.width, i.rect.height),
        c = new Uint8Array(f * i.bpl + f);
      i.cimg = UPNG.encode._filterZero(i.img, f, i.bpp, i.bpl, c, r, t);
    }
  }),
  (UPNG.encode.compress = function (e, r, t, a, i) {
    for (
      var f = i[0],
        c = i[1],
        s = i[2],
        l = i[3],
        u = i[4],
        d = 6,
        h = 8,
        A = 255,
        v = 0;
      v < e.length;
      v++
    )
      for (var p = new Uint8Array(e[v]), U = p.length, g = 0; g < U; g += 4)
        A &= p[g + 3];
    var m = 255 != A,
      w = UPNG.encode.framize(e, r, t, f, c, s),
      P = {},
      b = [],
      _ = [];
    if (0 != a) {
      var y = [];
      for (g = 0; g < w.length; g++) y.push(w[g].img.buffer);
      var I = UPNG.encode.concatRGBA(y),
        F = UPNG.quantize(I, a),
        G = 0,
        C = new Uint8Array(F.abuf);
      for (g = 0; g < w.length; g++) {
        var E = (K = w[g].img).length;
        _.push(new Uint8Array(F.inds.buffer, G >> 2, E >> 2));
        for (v = 0; v < E; v += 4)
          (K[v] = C[G + v]),
            (K[v + 1] = C[G + v + 1]),
            (K[v + 2] = C[G + v + 2]),
            (K[v + 3] = C[G + v + 3]);
        G += E;
      }
      for (g = 0; g < F.plte.length; g++) b.push(F.plte[g].est.rgba);
    } else
      for (v = 0; v < w.length; v++) {
        var B = w[v],
          Z = new Uint32Array(B.img.buffer),
          x = B.rect.width,
          M = ((U = Z.length), new Uint8Array(U));
        _.push(M);
        for (g = 0; g < U; g++) {
          var R = Z[g];
          if (0 != g && R == Z[g - 1]) M[g] = M[g - 1];
          else if (g > x && R == Z[g - x]) M[g] = M[g - x];
          else {
            var Q = P[R];
            if (
              null == Q &&
              ((P[R] = Q = b.length), b.push(R), b.length >= 300)
            )
              break;
            M[g] = Q;
          }
        }
      }
    var T = b.length;
    T <= 256 &&
      0 == u &&
      ((h = T <= 2 ? 1 : T <= 4 ? 2 : T <= 16 ? 4 : 8), (h = Math.max(h, l)));
    for (v = 0; v < w.length; v++) {
      (B = w[v]).rect.x, B.rect.y, (x = B.rect.width);
      var D = B.rect.height,
        O = B.img,
        V = (new Uint32Array(O.buffer), 4 * x),
        z = 4;
      if (T <= 256 && 0 == u) {
        V = Math.ceil((h * x) / 8);
        for (var k = new Uint8Array(V * D), L = _[v], S = 0; S < D; S++) {
          g = S * V;
          var q = S * x;
          if (8 == h) for (var j = 0; j < x; j++) k[g + j] = L[q + j];
          else if (4 == h)
            for (j = 0; j < x; j++)
              k[g + (j >> 1)] |= L[q + j] << (4 - 4 * (1 & j));
          else if (2 == h)
            for (j = 0; j < x; j++)
              k[g + (j >> 2)] |= L[q + j] << (6 - 2 * (3 & j));
          else if (1 == h)
            for (j = 0; j < x; j++)
              k[g + (j >> 3)] |= L[q + j] << (7 - 1 * (7 & j));
        }
        (O = k), (d = 3), (z = 1);
      } else if (0 == m && 1 == w.length) {
        k = new Uint8Array(x * D * 3);
        var $ = x * D;
        for (g = 0; g < $; g++) {
          var K,
            J = 4 * g;
          (k[(K = 3 * g)] = O[J]), (k[K + 1] = O[J + 1]), (k[K + 2] = O[J + 2]);
        }
        (O = k), (d = 2), (z = 3), (V = 3 * x);
      }
      (B.img = O), (B.bpl = V), (B.bpp = z);
    }
    return { ctype: d, depth: h, plte: b, frames: w };
  }),
  (UPNG.encode.framize = function (e, r, t, a, i, f) {
    for (var c = [], s = 0; s < e.length; s++) {
      var l,
        u = new Uint8Array(e[s]),
        d = new Uint32Array(u.buffer),
        h = 0,
        A = 0,
        v = r,
        p = t,
        U = a ? 1 : 0;
      if (0 != s) {
        for (
          var g = f || a || 1 == s || 0 != c[s - 2].dispose ? 1 : 2,
            m = 0,
            w = 1e9,
            P = 0;
          P < g;
          P++
        ) {
          for (
            var b = new Uint8Array(e[s - 1 - P]),
              _ = new Uint32Array(e[s - 1 - P]),
              y = r,
              I = t,
              F = -1,
              G = -1,
              C = 0;
            C < t;
            C++
          )
            for (var E = 0; E < r; E++) {
              d[(T = C * r + E)] != _[T] &&
                (E < y && (y = E),
                E > F && (F = E),
                C < I && (I = C),
                C > G && (G = C));
            }
          -1 == F && (y = I = F = G = 0),
            i && (1 == (1 & y) && y--, 1 == (1 & I) && I--);
          var B = (F - y + 1) * (G - I + 1);
          B < w &&
            ((w = B),
            (m = P),
            (h = y),
            (A = I),
            (v = F - y + 1),
            (p = G - I + 1));
        }
        b = new Uint8Array(e[s - 1 - m]);
        1 == m && (c[s - 1].dispose = 2),
          (l = new Uint8Array(v * p * 4)),
          UPNG._copyTile(b, r, t, l, v, p, -h, -A, 0),
          1 == (U = UPNG._copyTile(u, r, t, l, v, p, -h, -A, 3) ? 1 : 0)
            ? UPNG.encode._prepareDiff(u, r, t, l, {
                x: h,
                y: A,
                width: v,
                height: p,
              })
            : UPNG._copyTile(u, r, t, l, v, p, -h, -A, 0);
      } else l = u.slice(0);
      c.push({
        rect: { x: h, y: A, width: v, height: p },
        img: l,
        blend: U,
        dispose: 0,
      });
    }
    if (a)
      for (s = 0; s < c.length; s++) {
        if (1 != (D = c[s]).blend) {
          var Z = D.rect,
            x = c[s - 1].rect,
            M = Math.min(Z.x, x.x),
            R = Math.min(Z.y, x.y),
            Q = {
              x: M,
              y: R,
              width: Math.max(Z.x + Z.width, x.x + x.width) - M,
              height: Math.max(Z.y + Z.height, x.y + x.height) - R,
            };
          (c[s - 1].dispose = 1),
            s - 1 != 0 && UPNG.encode._updateFrame(e, r, t, c, s - 1, Q, i),
            UPNG.encode._updateFrame(e, r, t, c, s, Q, i);
        }
      }
    if (1 != e.length)
      for (var T = 0; T < c.length; T++) {
        var D;
        (D = c[T]).rect.width * D.rect.height;
      }
    return c;
  }),
  (UPNG.encode._updateFrame = function (e, r, t, a, i, f, c) {
    for (
      var s = Uint8Array,
        l = Uint32Array,
        u = new s(e[i - 1]),
        d = new l(e[i - 1]),
        h = i + 1 < e.length ? new s(e[i + 1]) : null,
        A = new s(e[i]),
        v = new l(A.buffer),
        p = r,
        U = t,
        g = -1,
        m = -1,
        w = 0;
      w < f.height;
      w++
    )
      for (var P = 0; P < f.width; P++) {
        var b = f.x + P,
          _ = f.y + w,
          y = _ * r + b,
          I = v[y];
        0 == I ||
          (0 == a[i - 1].dispose &&
            d[y] == I &&
            (null == h || 0 != h[4 * y + 3])) ||
          (b < p && (p = b),
          b > g && (g = b),
          _ < U && (U = _),
          _ > m && (m = _));
      }
    -1 == g && (p = U = g = m = 0),
      c && (1 == (1 & p) && p--, 1 == (1 & U) && U--),
      (f = { x: p, y: U, width: g - p + 1, height: m - U + 1 });
    var F = a[i];
    (F.rect = f),
      (F.blend = 1),
      (F.img = new Uint8Array(f.width * f.height * 4)),
      0 == a[i - 1].dispose
        ? (UPNG._copyTile(u, r, t, F.img, f.width, f.height, -f.x, -f.y, 0),
          UPNG.encode._prepareDiff(A, r, t, F.img, f))
        : UPNG._copyTile(A, r, t, F.img, f.width, f.height, -f.x, -f.y, 0);
  }),
  (UPNG.encode._prepareDiff = function (e, r, t, a, i) {
    UPNG._copyTile(e, r, t, a, i.width, i.height, -i.x, -i.y, 2);
  }),
  (UPNG.encode._filterZero = function (e, r, t, a, i, f, c) {
    var s,
      l = [],
      u = [0, 1, 2, 3, 4];
    -1 != f ? (u = [f]) : (r * a > 5e5 || 1 == t) && (u = [0]),
      c && (s = { level: 0 });
    for (var d = UZIP, h = 0; h < u.length; h++) {
      for (var A = 0; A < r; A++) UPNG.encode._filterLine(i, e, A, a, t, u[h]);
      l.push(d.deflate(i, s));
    }
    var v,
      p = 1e9;
    for (h = 0; h < l.length; h++)
      l[h].length < p && ((v = h), (p = l[h].length));
    return l[v];
  }),
  (UPNG.encode._filterLine = function (e, r, t, a, i, f) {
    var c = t * a,
      s = c + t,
      l = UPNG.decode._paeth;
    if (((e[s] = f), s++, 0 == f))
      if (a < 500) for (var u = 0; u < a; u++) e[s + u] = r[c + u];
      else e.set(new Uint8Array(r.buffer, c, a), s);
    else if (1 == f) {
      for (u = 0; u < i; u++) e[s + u] = r[c + u];
      for (u = i; u < a; u++) e[s + u] = (r[c + u] - r[c + u - i] + 256) & 255;
    } else if (0 == t) {
      for (u = 0; u < i; u++) e[s + u] = r[c + u];
      if (2 == f) for (u = i; u < a; u++) e[s + u] = r[c + u];
      if (3 == f)
        for (u = i; u < a; u++)
          e[s + u] = (r[c + u] - (r[c + u - i] >> 1) + 256) & 255;
      if (4 == f)
        for (u = i; u < a; u++)
          e[s + u] = (r[c + u] - l(r[c + u - i], 0, 0) + 256) & 255;
    } else {
      if (2 == f)
        for (u = 0; u < a; u++)
          e[s + u] = (r[c + u] + 256 - r[c + u - a]) & 255;
      if (3 == f) {
        for (u = 0; u < i; u++)
          e[s + u] = (r[c + u] + 256 - (r[c + u - a] >> 1)) & 255;
        for (u = i; u < a; u++)
          e[s + u] =
            (r[c + u] + 256 - ((r[c + u - a] + r[c + u - i]) >> 1)) & 255;
      }
      if (4 == f) {
        for (u = 0; u < i; u++)
          e[s + u] = (r[c + u] + 256 - l(0, r[c + u - a], 0)) & 255;
        for (u = i; u < a; u++)
          e[s + u] =
            (r[c + u] + 256 - l(r[c + u - i], r[c + u - a], r[c + u - i - a])) &
            255;
      }
    }
  }),
  (UPNG.crc = {
    table: (function () {
      for (var e = new Uint32Array(256), r = 0; r < 256; r++) {
        for (var t = r, a = 0; a < 8; a++)
          1 & t ? (t = 3988292384 ^ (t >>> 1)) : (t >>>= 1);
        e[r] = t;
      }
      return e;
    })(),
    update: function update(e, r, t, a) {
      for (var i = 0; i < a; i++)
        e = UPNG.crc.table[255 & (e ^ r[t + i])] ^ (e >>> 8);
      return e;
    },
    crc: function crc(e, r, t) {
      return 4294967295 ^ UPNG.crc.update(4294967295, e, r, t);
    },
  }),
  (UPNG.quantize = function (e, r) {
    var t,
      a = new Uint8Array(e),
      i = a.slice(0),
      f = new Uint32Array(i.buffer),
      c = UPNG.quantize.getKDtree(i, r),
      s = c[0],
      l = c[1],
      u = UPNG.quantize.planeDst,
      d = a,
      h = f,
      A = d.length,
      v = new Uint8Array(a.length >> 2);
    if (a.length < 2e7)
      for (var p = 0; p < A; p += 4) {
        var U = d[p] * (1 / 255),
          g = d[p + 1] * (1 / 255),
          m = d[p + 2] * (1 / 255),
          w = d[p + 3] * (1 / 255);
        (t = UPNG.quantize.getNearest(s, U, g, m, w)),
          (v[p >> 2] = t.ind),
          (h[p >> 2] = t.est.rgba);
      }
    else
      for (p = 0; p < A; p += 4) {
        (U = d[p] * (1 / 255)),
          (g = d[p + 1] * (1 / 255)),
          (m = d[p + 2] * (1 / 255)),
          (w = d[p + 3] * (1 / 255));
        for (t = s; t.left; ) t = u(t.est, U, g, m, w) <= 0 ? t.left : t.right;
        (v[p >> 2] = t.ind), (h[p >> 2] = t.est.rgba);
      }
    return { abuf: i.buffer, inds: v, plte: l };
  }),
  (UPNG.quantize.getKDtree = function (e, r, t) {
    null == t && (t = 1e-4);
    var a = new Uint32Array(e.buffer),
      i = {
        i0: 0,
        i1: e.length,
        bst: null,
        est: null,
        tdst: 0,
        left: null,
        right: null,
      };
    (i.bst = UPNG.quantize.stats(e, i.i0, i.i1)),
      (i.est = UPNG.quantize.estats(i.bst));
    for (var f = [i]; f.length < r; ) {
      for (var c = 0, s = 0, l = 0; l < f.length; l++)
        f[l].est.L > c && ((c = f[l].est.L), (s = l));
      if (c < t) break;
      var u = f[s],
        d = UPNG.quantize.splitPixels(e, a, u.i0, u.i1, u.est.e, u.est.eMq255);
      if (u.i0 >= d || u.i1 <= d) u.est.L = 0;
      else {
        var h = {
          i0: u.i0,
          i1: d,
          bst: null,
          est: null,
          tdst: 0,
          left: null,
          right: null,
        };
        (h.bst = UPNG.quantize.stats(e, h.i0, h.i1)),
          (h.est = UPNG.quantize.estats(h.bst));
        var A = {
          i0: d,
          i1: u.i1,
          bst: null,
          est: null,
          tdst: 0,
          left: null,
          right: null,
        };
        A.bst = { R: [], m: [], N: u.bst.N - h.bst.N };
        for (l = 0; l < 16; l++) A.bst.R[l] = u.bst.R[l] - h.bst.R[l];
        for (l = 0; l < 4; l++) A.bst.m[l] = u.bst.m[l] - h.bst.m[l];
        (A.est = UPNG.quantize.estats(A.bst)),
          (u.left = h),
          (u.right = A),
          (f[s] = h),
          f.push(A);
      }
    }
    f.sort(function (e, r) {
      return r.bst.N - e.bst.N;
    });
    for (l = 0; l < f.length; l++) f[l].ind = l;
    return [i, f];
  }),
  (UPNG.quantize.getNearest = function (e, r, t, a, i) {
    if (null == e.left)
      return (e.tdst = UPNG.quantize.dist(e.est.q, r, t, a, i)), e;
    var f = UPNG.quantize.planeDst(e.est, r, t, a, i),
      c = e.left,
      s = e.right;
    f > 0 && ((c = e.right), (s = e.left));
    var l = UPNG.quantize.getNearest(c, r, t, a, i);
    if (l.tdst <= f * f) return l;
    var u = UPNG.quantize.getNearest(s, r, t, a, i);
    return u.tdst < l.tdst ? u : l;
  }),
  (UPNG.quantize.planeDst = function (e, r, t, a, i) {
    var f = e.e;
    return f[0] * r + f[1] * t + f[2] * a + f[3] * i - e.eMq;
  }),
  (UPNG.quantize.dist = function (e, r, t, a, i) {
    var f = r - e[0],
      c = t - e[1],
      s = a - e[2],
      l = i - e[3];
    return f * f + c * c + s * s + l * l;
  }),
  (UPNG.quantize.splitPixels = function (e, r, t, a, i, f) {
    var c = UPNG.quantize.vecDot;
    for (a -= 4; t < a; ) {
      for (; c(e, t, i) <= f; ) t += 4;
      for (; c(e, a, i) > f; ) a -= 4;
      if (t >= a) break;
      var s = r[t >> 2];
      (r[t >> 2] = r[a >> 2]), (r[a >> 2] = s), (t += 4), (a -= 4);
    }
    for (; c(e, t, i) > f; ) t -= 4;
    return t + 4;
  }),
  (UPNG.quantize.vecDot = function (e, r, t) {
    return e[r] * t[0] + e[r + 1] * t[1] + e[r + 2] * t[2] + e[r + 3] * t[3];
  }),
  (UPNG.quantize.stats = function (e, r, t) {
    for (
      var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        i = [0, 0, 0, 0],
        f = (t - r) >> 2,
        c = r;
      c < t;
      c += 4
    ) {
      var s = e[c] * (1 / 255),
        l = e[c + 1] * (1 / 255),
        u = e[c + 2] * (1 / 255),
        d = e[c + 3] * (1 / 255);
      (i[0] += s),
        (i[1] += l),
        (i[2] += u),
        (i[3] += d),
        (a[0] += s * s),
        (a[1] += s * l),
        (a[2] += s * u),
        (a[3] += s * d),
        (a[5] += l * l),
        (a[6] += l * u),
        (a[7] += l * d),
        (a[10] += u * u),
        (a[11] += u * d),
        (a[15] += d * d);
    }
    return (
      (a[4] = a[1]),
      (a[8] = a[2]),
      (a[9] = a[6]),
      (a[12] = a[3]),
      (a[13] = a[7]),
      (a[14] = a[11]),
      { R: a, m: i, N: f }
    );
  }),
  (UPNG.quantize.estats = function (e) {
    var r = e.R,
      t = e.m,
      a = e.N,
      i = t[0],
      f = t[1],
      c = t[2],
      s = t[3],
      l = 0 == a ? 0 : 1 / a,
      u = [
        r[0] - i * i * l,
        r[1] - i * f * l,
        r[2] - i * c * l,
        r[3] - i * s * l,
        r[4] - f * i * l,
        r[5] - f * f * l,
        r[6] - f * c * l,
        r[7] - f * s * l,
        r[8] - c * i * l,
        r[9] - c * f * l,
        r[10] - c * c * l,
        r[11] - c * s * l,
        r[12] - s * i * l,
        r[13] - s * f * l,
        r[14] - s * c * l,
        r[15] - s * s * l,
      ],
      d = u,
      h = UPNG.M4,
      A = [Math.random(), Math.random(), Math.random(), Math.random()],
      v = 0,
      p = 0;
    if (0 != a)
      for (
        var U = 0;
        U < 16 &&
        ((A = h.multVec(d, A)),
        (p = Math.sqrt(h.dot(A, A))),
        (A = h.sml(1 / p, A)),
        !(0 != U && Math.abs(p - v) < 1e-9));
        U++
      )
        v = p;
    var g = [i * l, f * l, c * l, s * l];
    return {
      Cov: u,
      q: g,
      e: A,
      L: v,
      eMq255: h.dot(h.sml(255, g), A),
      eMq: h.dot(A, g),
      rgba:
        ((Math.round(255 * g[3]) << 24) |
          (Math.round(255 * g[2]) << 16) |
          (Math.round(255 * g[1]) << 8) |
          (Math.round(255 * g[0]) << 0)) >>>
        0,
    };
  }),
  (UPNG.M4 = {
    multVec: function multVec(e, r) {
      return [
        e[0] * r[0] + e[1] * r[1] + e[2] * r[2] + e[3] * r[3],
        e[4] * r[0] + e[5] * r[1] + e[6] * r[2] + e[7] * r[3],
        e[8] * r[0] + e[9] * r[1] + e[10] * r[2] + e[11] * r[3],
        e[12] * r[0] + e[13] * r[1] + e[14] * r[2] + e[15] * r[3],
      ];
    },
    dot: function dot(e, r) {
      return e[0] * r[0] + e[1] * r[1] + e[2] * r[2] + e[3] * r[3];
    },
    sml: function sml(e, r) {
      return [e * r[0], e * r[1], e * r[2], e * r[3]];
    },
  }),
  (UPNG.encode.concatRGBA = function (e) {
    for (var r = 0, t = 0; t < e.length; t++) r += e[t].byteLength;
    var a = new Uint8Array(r),
      i = 0;
    for (t = 0; t < e.length; t++) {
      for (var f = new Uint8Array(e[t]), c = f.length, s = 0; s < c; s += 4) {
        var l = f[s],
          u = f[s + 1],
          d = f[s + 2],
          h = f[s + 3];
        0 == h && (l = u = d = 0),
          (a[i + s] = l),
          (a[i + s + 1] = u),
          (a[i + s + 2] = d),
          (a[i + s + 3] = h);
      }
      i += c;
    }
    return a.buffer;
  });
var isBrowser = "undefined" != typeof window,
  moduleMapper =
    isBrowser &&
    window.cordova &&
    window.cordova.require &&
    window.cordova.require("cordova/modulemapper"),
  CustomFile =
    isBrowser &&
    ((moduleMapper && moduleMapper.getOriginalSymbol(window, "File")) || File),
  CustomFileReader =
    isBrowser &&
    ((moduleMapper && moduleMapper.getOriginalSymbol(window, "FileReader")) ||
      FileReader);
function isAutoOrientationInBrowser() {
  return new Promise(function (e, r) {
    var t, a, i, f;
    return void 0 !== isAutoOrientationInBrowser.result
      ? e(isAutoOrientationInBrowser.result)
      : ("data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==",
        getFilefromDataUrl(
          "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==",
          "test.jpg",
          Date.now()
        ).then(function (c) {
          try {
            return drawFileInCanvas((t = c)).then(function (c) {
              try {
                return canvasToFile(
                  (a = c[1]),
                  t.type,
                  t.name,
                  t.lastModified
                ).then(function (t) {
                  try {
                    return (
                      (i = t),
                      cleanupCanvasMemory(a),
                      drawFileInCanvas(i).then(function (t) {
                        try {
                          return (
                            (f = t[0]),
                            (isAutoOrientationInBrowser.result =
                              1 === f.width && 2 === f.height),
                            e(isAutoOrientationInBrowser.result)
                          );
                        } catch (e) {
                          return r(e);
                        }
                      }, r)
                    );
                  } catch (e) {
                    return r(e);
                  }
                }, r);
              } catch (e) {
                return r(e);
              }
            }, r);
          } catch (e) {
            return r(e);
          }
        }, r));
  });
}
function getDataUrlFromFile(e) {
  return new Promise(function (r, t) {
    var a = new CustomFileReader();
    (a.onload = function () {
      return r(a.result);
    }),
      (a.onerror = function (e) {
        return t(e);
      }),
      a.readAsDataURL(e);
  });
}
function getFilefromDataUrl(e, r) {
  var t =
    arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Date.now();
  return new Promise(function (a) {
    for (
      var i = e.split(","),
        f = i[0].match(/:(.*?);/)[1],
        c = globalThis.atob(i[1]),
        s = c.length,
        l = new Uint8Array(s);
      s--;

    )
      l[s] = c.charCodeAt(s);
    var u = new Blob([l], { type: f });
    (u.name = r), (u.lastModified = t), a(u);
  });
}
function loadImage(e) {
  return new Promise(function (r, t) {
    var a = new Image();
    (a.onload = function () {
      return r(a);
    }),
      (a.onerror = function (e) {
        return t(e);
      }),
      (a.src = e);
  });
}
function drawImageInCanvas(e) {
  var r = _slicedToArray(getNewCanvasAndCtx(e.width, e.height), 2),
    t = r[0];
  return r[1].drawImage(e, 0, 0, t.width, t.height), t;
}
function drawFileInCanvas(e) {
  return new Promise(function (r, t) {
    var a,
      i,
      f = function $Try_1_Post() {
        try {
          return (i = drawImageInCanvas(a)), r([a, i]);
        } catch (e) {
          return t(e);
        }
      },
      c = function $Try_1_Catch(r) {
        try {
          return getDataUrlFromFile(e).then(function (e) {
            try {
              return loadImage(e).then(function (e) {
                try {
                  return (a = e), f();
                } catch (e) {
                  return t(e);
                }
              }, t);
            } catch (e) {
              return t(e);
            }
          }, t);
        } catch (e) {
          return t(e);
        }
      };
    try {
      return createImageBitmap(e).then(function (e) {
        try {
          return (a = e), f();
        } catch (e) {
          return c();
        }
      }, c);
    } catch (e) {
      c();
    }
  });
}
function canvasToFile(e, r, t, a) {
  var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1;
  return new Promise(function (f, c) {
    var s, l, u;
    if ("image/png" === r)
      return (
        (l = e.getContext("2d").getImageData(0, 0, e.width, e.height).data),
        (u = UPNG.encode([l], e.width, e.height, 256 * i)),
        ((s = new Blob([u], { type: r })).name = t),
        (s.lastModified = a),
        $If_4.call(this)
      );
    {
      return "function" == typeof OffscreenCanvas &&
        e instanceof OffscreenCanvas
        ? e.convertToBlob({ type: r, quality: i }).then(
            function (e) {
              try {
                return (
                  ((s = e).name = t), (s.lastModified = a), $If_5.call(this)
                );
              } catch (e) {
                return c(e);
              }
            }.bind(this),
            c
          )
        : getFilefromDataUrl(e.toDataURL(r, i), t, a).then(
            function (e) {
              try {
                return (s = e), $If_5.call(this);
              } catch (e) {
                return c(e);
              }
            }.bind(this),
            c
          );
      function $If_5() {
        return $If_4.call(this);
      }
    }
    function $If_4() {
      return f(s);
    }
  });
}
function getExifOrientation(e) {
  return new Promise(function (r, t) {
    var a = new CustomFileReader();
    (a.onload = function (e) {
      var t = new DataView(e.target.result);
      if (65496 != t.getUint16(0, !1)) return r(-2);
      for (var a = t.byteLength, i = 2; i < a; ) {
        if (t.getUint16(i + 2, !1) <= 8) return r(-1);
        var f = t.getUint16(i, !1);
        if (((i += 2), 65505 == f)) {
          if (1165519206 != t.getUint32((i += 2), !1)) return r(-1);
          var c = 18761 == t.getUint16((i += 6), !1);
          i += t.getUint32(i + 4, c);
          var s = t.getUint16(i, c);
          i += 2;
          for (var l = 0; l < s; l++)
            if (274 == t.getUint16(i + 12 * l, c))
              return r(t.getUint16(i + 12 * l + 8, c));
        } else {
          if (65280 != (65280 & f)) break;
          i += t.getUint16(i, !1);
        }
      }
      return r(-1);
    }),
      (a.onerror = function (e) {
        return t(e);
      }),
      a.readAsArrayBuffer(e);
  });
}
function handleMaxWidthOrHeight(e, r) {
  var t,
    a = e.width,
    i = e.height,
    f = r.maxWidthOrHeight,
    c = e;
  if (isFinite(f) && (a > f || i > f)) {
    var s = _slicedToArray(getNewCanvasAndCtx(a, i), 2);
    (c = s[0]),
      (t = s[1]),
      a > i
        ? ((c.width = f), (c.height = (i / a) * f))
        : ((c.width = (a / i) * f), (c.height = f)),
      t.drawImage(e, 0, 0, c.width, c.height),
      cleanupCanvasMemory(e);
  }
  return c;
}
function followExifOrientation(e, r) {
  var t = e.width,
    a = e.height,
    i = _slicedToArray(getNewCanvasAndCtx(t, a), 2),
    f = i[0],
    c = i[1];
  switch (
    (4 < r && r < 9
      ? ((f.width = a), (f.height = t))
      : ((f.width = t), (f.height = a)),
    r)
  ) {
    case 2:
      c.transform(-1, 0, 0, 1, t, 0);
      break;
    case 3:
      c.transform(-1, 0, 0, -1, t, a);
      break;
    case 4:
      c.transform(1, 0, 0, -1, 0, a);
      break;
    case 5:
      c.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      c.transform(0, 1, -1, 0, a, 0);
      break;
    case 7:
      c.transform(0, -1, -1, 0, a, t);
      break;
    case 8:
      c.transform(0, -1, 1, 0, 0, t);
  }
  return c.drawImage(e, 0, 0, t, a), cleanupCanvasMemory(e), f;
}
function getNewCanvasAndCtx(e, r) {
  var t, a;
  try {
    if (null === (a = (t = new OffscreenCanvas(e, r)).getContext("2d")))
      throw new Error("getContext of OffscreenCanvas returns null");
  } catch (e) {
    a = (t = document.createElement("canvas")).getContext("2d");
  }
  return (t.width = e), (t.height = r), [t, a];
}
function cleanupCanvasMemory(e) {
  (e.width = 0), (e.height = 0);
}
function compress(e, r) {
  var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
  return new Promise(function (a, i) {
    var f, c, s, l, u, d, h, A, v, p, U, g, m, w, P, b, _, y;
    function incProgress() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5;
      (f += e), r.onProgress(Math.min(f, 100));
    }
    function setProgress(e) {
      (f = Math.min(Math.max(e, f), 100)), r.onProgress(f);
    }
    return (
      (f = t),
      (c = r.maxIteration || 10),
      (s = 1024 * r.maxSizeMB * 1024),
      incProgress(),
      drawFileInCanvas(e).then(
        function (t) {
          try {
            var f = _slicedToArray(t, 2);
            return (
              f[0],
              (l = f[1]),
              incProgress(),
              (u = handleMaxWidthOrHeight(l, r)),
              incProgress(),
              new Promise(function (t, a) {
                var i;
                if (!(i = r.exifOrientation))
                  return getExifOrientation(e).then(
                    function (e) {
                      try {
                        return (i = e), $If_2.call(this);
                      } catch (e) {
                        return a(e);
                      }
                    }.bind(this),
                    a
                  );
                function $If_2() {
                  return t(i);
                }
                return $If_2.call(this);
              }).then(
                function (t) {
                  try {
                    return (
                      (d = t),
                      incProgress(),
                      isAutoOrientationInBrowser().then(
                        function (t) {
                          try {
                            return (
                              (h = t ? u : followExifOrientation(u, d)),
                              incProgress(),
                              (A = r.initialQuality || 1),
                              (v = r.fileType || e.type),
                              canvasToFile(
                                h,
                                v,
                                e.name,
                                e.lastModified,
                                A
                              ).then(
                                function (r) {
                                  try {
                                    {
                                      if (
                                        ((p = r),
                                        incProgress(),
                                        (U = p.size > s),
                                        (g = p.size > e.size),
                                        !U && !g)
                                      )
                                        return setProgress(100), a(p);
                                      var t;
                                      function $Loop_3() {
                                        if (c-- && (P > s || P > m)) {
                                          var r,
                                            t,
                                            a = _slicedToArray(
                                              getNewCanvasAndCtx(
                                                (r = U
                                                  ? 0.95 * y.width
                                                  : y.width),
                                                (t = U
                                                  ? 0.95 * y.height
                                                  : y.height)
                                              ),
                                              2
                                            );
                                          return (
                                            (_ = a[0]),
                                            a[1].drawImage(y, 0, 0, r, t),
                                            (A *= 0.95),
                                            canvasToFile(
                                              _,
                                              v,
                                              e.name,
                                              e.lastModified,
                                              A
                                            ).then(function (e) {
                                              try {
                                                return (
                                                  (b = e),
                                                  cleanupCanvasMemory(y),
                                                  (y = _),
                                                  (P = b.size),
                                                  setProgress(
                                                    Math.min(
                                                      99,
                                                      Math.floor(
                                                        ((w - P) / (w - s)) *
                                                          100
                                                      )
                                                    )
                                                  ),
                                                  $Loop_3
                                                );
                                              } catch (e) {
                                                return i(e);
                                              }
                                            }, i)
                                          );
                                        }
                                        return [1];
                                      }
                                      return (
                                        (m = e.size),
                                        (w = p.size),
                                        (P = w),
                                        (y = h),
                                        (t = function (e) {
                                          for (; e; ) {
                                            if (e.then)
                                              return void e.then(t, i);
                                            try {
                                              if (e.pop) {
                                                if (e.length)
                                                  return e.pop()
                                                    ? $Loop_3_exit.call(this)
                                                    : e;
                                                e = $Loop_3;
                                              } else e = e.call(this);
                                            } catch (e) {
                                              return i(e);
                                            }
                                          }
                                        }.bind(this))($Loop_3)
                                      );
                                      function $Loop_3_exit() {
                                        return (
                                          cleanupCanvasMemory(y),
                                          cleanupCanvasMemory(_),
                                          cleanupCanvasMemory(u),
                                          cleanupCanvasMemory(h),
                                          cleanupCanvasMemory(l),
                                          setProgress(100),
                                          a(b)
                                        );
                                      }
                                    }
                                  } catch (e) {
                                    return i(e);
                                  }
                                }.bind(this),
                                i
                              )
                            );
                          } catch (e) {
                            return i(e);
                          }
                        }.bind(this),
                        i
                      )
                    );
                  } catch (e) {
                    return i(e);
                  }
                }.bind(this),
                i
              )
            );
          } catch (e) {
            return i(e);
          }
        }.bind(this),
        i
      )
    );
  });
}
isBrowser &&
  (Number.isInteger =
    Number.isInteger ||
    function (e) {
      return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
    });
var cnt = 0,
  imageCompressionLibUrl,
  worker;
function createWorker(e) {
  return (
    "function" == typeof e && (e = "(".concat(f, ")()")),
    new Worker(URL.createObjectURL(new Blob([e])))
  );
}
function createSourceObject(e) {
  return URL.createObjectURL(new Blob([e], { type: "application/javascript" }));
}
function stringify(e) {
  return JSON.stringify(e, function (e, r) {
    return "function" == typeof r
      ? "BIC_FN:::(() => ".concat(r.toString(), ")()")
      : r;
  });
}
function parse(o) {
  if ("string" == typeof o) return o;
  var result = {};
  return (
    Object.entries(o).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      if ("string" == typeof value && value.startsWith("BIC_FN:::"))
        try {
          result[key] = eval(value.replace(/^BIC_FN:::/, ""));
        } catch (e) {
          throw (console.log(key, e), e);
        }
      else result[key] = parse(value);
    }),
    result
  );
}
function generateLib() {
  return createSourceObject(
    "\n    // reconstruct library\n    function imageCompression (){return ("
      .concat(
        imageCompression,
        ").apply(null, arguments)}\n\n    imageCompression.getDataUrlFromFile = "
      )
      .concat(
        imageCompression.getDataUrlFromFile,
        "\n    imageCompression.getFilefromDataUrl = "
      )
      .concat(
        imageCompression.getFilefromDataUrl,
        "\n    imageCompression.loadImage = "
      )
      .concat(
        imageCompression.loadImage,
        "\n    imageCompression.drawImageInCanvas = "
      )
      .concat(
        imageCompression.drawImageInCanvas,
        "\n    imageCompression.drawFileInCanvas = "
      )
      .concat(
        imageCompression.drawFileInCanvas,
        "\n    imageCompression.canvasToFile = "
      )
      .concat(
        imageCompression.canvasToFile,
        "\n    imageCompression.getExifOrientation = "
      )
      .concat(
        imageCompression.getExifOrientation,
        "\n    imageCompression.handleMaxWidthOrHeight = "
      )
      .concat(
        imageCompression.handleMaxWidthOrHeight,
        "\n    imageCompression.followExifOrientation = "
      )
      .concat(
        imageCompression.followExifOrientation,
        "\n    imageCompression.cleanupCanvasMemory = "
      )
      .concat(
        imageCompression.cleanupCanvasMemory,
        "\n    imageCompression.isAutoOrientationInBrowser = "
      )
      .concat(
        imageCompression.isAutoOrientationInBrowser,
        "\n\n    // functions / objects\n    getDataUrlFromFile = imageCompression.getDataUrlFromFile\n    getFilefromDataUrl = imageCompression.getFilefromDataUrl\n    loadImage = imageCompression.loadImage\n    drawImageInCanvas = imageCompression.drawImageInCanvas\n    drawFileInCanvas = imageCompression.drawFileInCanvas\n    canvasToFile = imageCompression.canvasToFile\n    getExifOrientation = imageCompression.getExifOrientation\n    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight\n    followExifOrientation = imageCompression.followExifOrientation\n    cleanupCanvasMemory = imageCompression.cleanupCanvasMemory\n    isAutoOrientationInBrowser = imageCompression.isAutoOrientationInBrowser\n    \n    getNewCanvasAndCtx = "
      )
      .concat(
        getNewCanvasAndCtx,
        "\n    CustomFileReader = FileReader\n    CustomFile = File\n    function _slicedToArray(arr, n) { return arr }\n    function _typeof(a) { return typeof a }\n    function compress (){return ("
      )
      .concat(
        compress,
        ").apply(null, arguments)}\n\n    // Libraries\n    var parse = "
      )
      .concat(parse, "\n    var UPNG = {}\n    UPNG.toRGBA8 = ")
      .concat(UPNG.toRGBA8, "\n    UPNG.toRGBA8.decodeImage = ")
      .concat(UPNG.toRGBA8.decodeImage, "\n    UPNG.decode = ")
      .concat(UPNG.decode, "\n    UPNG.decode._decompress = ")
      .concat(UPNG.decode._decompress, "\n    UPNG.decode._inflate = ")
      .concat(UPNG.decode._inflate, "\n    UPNG.decode._readInterlace = ")
      .concat(UPNG.decode._readInterlace, "\n    UPNG.decode._getBPP = ")
      .concat(UPNG.decode._getBPP, " \n    UPNG.decode._filterZero = ")
      .concat(UPNG.decode._filterZero, "\n    UPNG.decode._paeth = ")
      .concat(UPNG.decode._paeth, "\n    UPNG.decode._IHDR = ")
      .concat(UPNG.decode._IHDR, "\n    UPNG._bin = parse(")
      .concat(stringify(UPNG._bin), ")\n    UPNG._copyTile = ")
      .concat(UPNG._copyTile, "\n    UPNG.encode = ")
      .concat(UPNG.encode, "\n    UPNG.encodeLL = ")
      .concat(UPNG.encodeLL, " \n    UPNG.encode._main = ")
      .concat(UPNG.encode._main, "\n    UPNG.encode.compressPNG = ")
      .concat(UPNG.encode.compressPNG, " \n    UPNG.encode.compress = ")
      .concat(UPNG.encode.compress, "\n    UPNG.encode.framize = ")
      .concat(UPNG.encode.framize, " \n    UPNG.encode._updateFrame = ")
      .concat(UPNG.encode._updateFrame, " \n    UPNG.encode._prepareDiff = ")
      .concat(UPNG.encode._prepareDiff, " \n    UPNG.encode._filterZero = ")
      .concat(UPNG.encode._filterZero, " \n    UPNG.encode._filterLine = ")
      .concat(UPNG.encode._filterLine, "\n    UPNG.encode.concatRGBA = ")
      .concat(UPNG.encode.concatRGBA, "\n    UPNG.crc = parse(")
      .concat(
        stringify(UPNG.crc),
        ")\n    UPNG.crc.table = ( function() {\n    var tab = new Uint32Array(256);\n    for (var n=0; n<256; n++) {\n      var c = n;\n      for (var k=0; k<8; k++) {\n        if (c & 1)  c = 0xedb88320 ^ (c >>> 1);\n        else        c = c >>> 1;\n      }\n      tab[n] = c;  }\n    return tab;  })()\n    UPNG.quantize = "
      )
      .concat(UPNG.quantize, " \n    UPNG.quantize.getKDtree = ")
      .concat(UPNG.quantize.getKDtree, " \n    UPNG.quantize.getNearest = ")
      .concat(UPNG.quantize.getNearest, " \n    UPNG.quantize.planeDst = ")
      .concat(UPNG.quantize.planeDst, " \n    UPNG.quantize.dist = ")
      .concat(UPNG.quantize.dist, "     \n    UPNG.quantize.splitPixels = ")
      .concat(UPNG.quantize.splitPixels, " \n    UPNG.quantize.vecDot = ")
      .concat(UPNG.quantize.vecDot, " \n    UPNG.quantize.stats = ")
      .concat(UPNG.quantize.stats, " \n    UPNG.quantize.estats = ")
      .concat(UPNG.quantize.estats, "\n    UPNG.M4 = parse(")
      .concat(stringify(UPNG.M4), ")\n    UPNG.encode.concatRGBA = ")
      .concat(
        UPNG.encode.concatRGBA,
        '\n    UPNG.inflateRaw=function(){\n    var H={};H.H={};H.H.N=function(N,W){var R=Uint8Array,i=0,m=0,J=0,h=0,Q=0,X=0,u=0,w=0,d=0,v,C;\n      if(N[0]==3&&N[1]==0)return W?W:new R(0);var V=H.H,n=V.b,A=V.e,l=V.R,M=V.n,I=V.A,e=V.Z,b=V.m,Z=W==null;\n      if(Z)W=new R(N.length>>>2<<5);while(i==0){i=n(N,d,1);m=n(N,d+1,2);d+=3;if(m==0){if((d&7)!=0)d+=8-(d&7);\n        var D=(d>>>3)+4,q=N[D-4]|N[D-3]<<8;if(Z)W=H.H.W(W,w+q);W.set(new R(N.buffer,N.byteOffset+D,q),w);d=D+q<<3;\n        w+=q;continue}if(Z)W=H.H.W(W,w+(1<<17));if(m==1){v=b.J;C=b.h;X=(1<<9)-1;u=(1<<5)-1}if(m==2){J=A(N,d,5)+257;\n        h=A(N,d+5,5)+1;Q=A(N,d+10,4)+4;d+=14;var E=d,j=1;for(var c=0;c<38;c+=2){b.Q[c]=0;b.Q[c+1]=0}for(var c=0;\n                                                                                                        c<Q;c++){var K=A(N,d+c*3,3);b.Q[(b.X[c]<<1)+1]=K;if(K>j)j=K}d+=3*Q;M(b.Q,j);I(b.Q,j,b.u);v=b.w;C=b.d;\n        d=l(b.u,(1<<j)-1,J+h,N,d,b.v);var r=V.V(b.v,0,J,b.C);X=(1<<r)-1;var S=V.V(b.v,J,h,b.D);u=(1<<S)-1;M(b.C,r);\n        I(b.C,r,v);M(b.D,S);I(b.D,S,C)}while(!0){var T=v[e(N,d)&X];d+=T&15;var p=T>>>4;if(p>>>8==0){W[w++]=p}else if(p==256){break}else{var z=w+p-254;\n        if(p>264){var _=b.q[p-257];z=w+(_>>>3)+A(N,d,_&7);d+=_&7}var $=C[e(N,d)&u];d+=$&15;var s=$>>>4,Y=b.c[s],a=(Y>>>4)+n(N,d,Y&15);\n        d+=Y&15;while(w<z){W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a]}w=z}}}return W.length==w?W:W.slice(0,w)};\n      H.H.W=function(N,W){var R=N.length;if(W<=R)return N;var V=new Uint8Array(R<<1);V.set(N,0);return V};\n      H.H.R=function(N,W,R,V,n,A){var l=H.H.e,M=H.H.Z,I=0;while(I<R){var e=N[M(V,n)&W];n+=e&15;var b=e>>>4;\n        if(b<=15){A[I]=b;I++}else{var Z=0,m=0;if(b==16){m=3+l(V,n,2);n+=2;Z=A[I-1]}else if(b==17){m=3+l(V,n,3);\n          n+=3}else if(b==18){m=11+l(V,n,7);n+=7}var J=I+m;while(I<J){A[I]=Z;I++}}}return n};H.H.V=function(N,W,R,V){var n=0,A=0,l=V.length>>>1;\n        while(A<R){var M=N[A+W];V[A<<1]=0;V[(A<<1)+1]=M;if(M>n)n=M;A++}while(A<l){V[A<<1]=0;V[(A<<1)+1]=0;A++}return n};\n      H.H.n=function(N,W){var R=H.H.m,V=N.length,n,A,l,M,I,e=R.j;for(var M=0;M<=W;M++)e[M]=0;for(M=1;M<V;M+=2)e[N[M]]++;\n        var b=R.K;n=0;e[0]=0;for(A=1;A<=W;A++){n=n+e[A-1]<<1;b[A]=n}for(l=0;l<V;l+=2){I=N[l+1];if(I!=0){N[l]=b[I];\n          b[I]++}}};H.H.A=function(N,W,R){var V=N.length,n=H.H.m,A=n.r;for(var l=0;l<V;l+=2)if(N[l+1]!=0){var M=l>>1,I=N[l+1],e=M<<4|I,b=W-I,Z=N[l]<<b,m=Z+(1<<b);\n        while(Z!=m){var J=A[Z]>>>15-W;R[J]=e;Z++}}};H.H.l=function(N,W){var R=H.H.m.r,V=15-W;for(var n=0;n<N.length;\n                                                                                                 n+=2){var A=N[n]<<W-N[n+1];N[n]=R[A]>>>V}};H.H.M=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8};\n      H.H.I=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8;N[V+2]|=R>>>16};H.H.e=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8)>>>(W&7)&(1<<R)-1};\n      H.H.b=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)&(1<<R)-1};H.H.Z=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)};\n      H.H.i=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16|N[(W>>>3)+3]<<24)>>>(W&7)};H.H.m=function(){var N=Uint16Array,W=Uint32Array;\n        return{K:new N(16),j:new N(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new N(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new W(32),J:new N(512),_:[],h:new N(32),$:[],w:new N(32768),C:[],v:[],d:new N(32768),D:[],u:new N(512),Q:[],r:new N(1<<15),s:new W(286),Y:new W(30),a:new W(19),t:new W(15e3),k:new N(1<<16),g:new N(1<<15)}}();\n      (function(){var N=H.H.m,W=1<<15;for(var R=0;R<W;R++){var V=R;V=(V&2863311530)>>>1|(V&1431655765)<<1;\n        V=(V&3435973836)>>>2|(V&858993459)<<2;V=(V&4042322160)>>>4|(V&252645135)<<4;V=(V&4278255360)>>>8|(V&16711935)<<8;\n        N.r[R]=(V>>>16|V<<16)>>>17}function n(A,l,M){while(l--!=0)A.push(0,M)}for(var R=0;R<32;R++){N.q[R]=N.S[R]<<3|N.T[R];\n        N.c[R]=N.p[R]<<4|N.z[R]}n(N._,144,8);n(N._,255-143,9);n(N._,279-255,7);n(N._,287-279,8);H.H.n(N._,9);\n        H.H.A(N._,9,N.J);H.H.l(N._,9);n(N.$,32,5);H.H.n(N.$,5);H.H.A(N.$,5,N.h);H.H.l(N.$,5);n(N.Q,19,0);n(N.C,286,0);\n        n(N.D,30,0);n(N.v,320,0)}());return H.H.N}()\n    \n    var UZIP = {}\n    UZIP["parse"] = '
      )
      .concat(UZIP_1.parse, "\n    UZIP._readLocal = ")
      .concat(UZIP_1._readLocal, "\n    UZIP.inflateRaw = ")
      .concat(UZIP_1.inflateRaw, "\n    UZIP.inflate = ")
      .concat(UZIP_1.inflate, "\n    UZIP.deflate = ")
      .concat(UZIP_1.deflate, "\n    UZIP.deflateRaw = ")
      .concat(UZIP_1.deflateRaw, "\n    UZIP.encode = ")
      .concat(UZIP_1.encode, "\n    UZIP._noNeed = ")
      .concat(UZIP_1._noNeed, "\n    UZIP._writeHeader = ")
      .concat(UZIP_1._writeHeader, "\n    UZIP.crc = parse(")
      .concat(
        stringify(UZIP_1.crc),
        ")\n    UZIP.crc.table = ( function() {\n      var tab = new Uint32Array(256);\n      for (var n=0; n<256; n++) {\n        var c = n;\n        for (var k=0; k<8; k++) {\n          if (c & 1)  c = 0xedb88320 ^ (c >>> 1);\n          else        c = c >>> 1;\n        }\n        tab[n] = c;  }\n      return tab;  })()\n    \n    UZIP.adler = "
      )
      .concat(UZIP_1.adler, "\n    UZIP.bin = parse(")
      .concat(
        stringify(UZIP_1.bin),
        ")\n    UZIP.F = {}\n    UZIP.F.deflateRaw = "
      )
      .concat(UZIP_1.F.deflateRaw, "\n    UZIP.F._bestMatch = ")
      .concat(UZIP_1.F._bestMatch, "\n    UZIP.F._howLong = ")
      .concat(UZIP_1.F._howLong, "\n    UZIP.F._hash = ")
      .concat(UZIP_1.F._hash, "\n    UZIP.saved = ")
      .concat(UZIP_1.saved, "\n    UZIP.F._writeBlock = ")
      .concat(UZIP_1.F._writeBlock, "\n    UZIP.F._copyExact = ")
      .concat(UZIP_1.F._copyExact, "\n    UZIP.F.getTrees = ")
      .concat(UZIP_1.F.getTrees, "\n    UZIP.F.getSecond = ")
      .concat(UZIP_1.F.getSecond, "\n    UZIP.F.nonZero = ")
      .concat(UZIP_1.F.nonZero, "\n    UZIP.F.contSize = ")
      .concat(UZIP_1.F.contSize, "\n    UZIP.F._codeTiny = ")
      .concat(UZIP_1.F._codeTiny, " \n    UZIP.F._lenCodes = ")
      .concat(UZIP_1.F._lenCodes, " \n    UZIP.F._hufTree = ")
      .concat(UZIP_1.F._hufTree, " \n    UZIP.F.setDepth = ")
      .concat(UZIP_1.F.setDepth, " \n    UZIP.F.restrictDepth = ")
      .concat(UZIP_1.F.restrictDepth, "\n    UZIP.F._goodIndex = ")
      .concat(UZIP_1.F._goodIndex, " \n    UZIP.F._writeLit = ")
      .concat(UZIP_1.F._writeLit, " \n    UZIP.F.inflate = ")
      .concat(UZIP_1.F.inflate, " \n    UZIP.F._check = ")
      .concat(UZIP_1.F._check, " \n    UZIP.F._decodeTiny = ")
      .concat(UZIP_1.F._decodeTiny, " \n    UZIP.F._copyOut = ")
      .concat(UZIP_1.F._copyOut, " \n    UZIP.F.makeCodes = ")
      .concat(UZIP_1.F.makeCodes, " \n    UZIP.F.codes2map = ")
      .concat(UZIP_1.F.codes2map, " \n    UZIP.F.revCodes = ")
      .concat(
        UZIP_1.F.revCodes,
        " \n\n    // used only in deflate\n    UZIP.F._putsE = "
      )
      .concat(UZIP_1.F._putsE, "\n    UZIP.F._putsF = ")
      .concat(UZIP_1.F._putsF, "\n  \n    UZIP.F._bitsE = ")
      .concat(UZIP_1.F._bitsE, "\n    UZIP.F._bitsF = ")
      .concat(UZIP_1.F._bitsF, "\n\n    UZIP.F._get17 = ")
      .concat(UZIP_1.F._get17, "\n    UZIP.F._get25 = ")
      .concat(
        UZIP_1.F._get25,
        "\n    UZIP.F.U = function(){\n      var u16=Uint16Array, u32=Uint32Array;\n      return {\n        next_code : new u16(16),\n        bl_count  : new u16(16),\n        ordr : [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ],\n        of0  : [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],\n        exb  : [0,0,0,0,0,0,0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,  4,  5,  5,  5,  5,  0,  0,  0,  0],\n        ldef : new u16(32),\n        df0  : [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577, 65535, 65535],\n        dxb  : [0,0,0,0,1,1,2, 2, 3, 3, 4, 4, 5, 5,  6,  6,  7,  7,  8,  8,   9,   9,  10,  10,  11,  11,  12,   12,   13,   13,     0,     0],\n        ddef : new u32(32),\n        flmap: new u16(  512),  fltree: [],\n        fdmap: new u16(   32),  fdtree: [],\n        lmap : new u16(32768),  ltree : [],  ttree:[],\n        dmap : new u16(32768),  dtree : [],\n        imap : new u16(  512),  itree : [],\n        //rev9 : new u16(  512)\n        rev15: new u16(1<<15),\n        lhst : new u32(286), dhst : new u32( 30), ihst : new u32(19),\n        lits : new u32(15000),\n        strt : new u16(1<<16),\n        prev : new u16(1<<15)\n      };\n    } ();\n\n    (function(){\n      var U = UZIP.F.U;\n      var len = 1<<15;\n      for(var i=0; i<len; i++) {\n        var x = i;\n        x = (((x & 0xaaaaaaaa) >>> 1) | ((x & 0x55555555) << 1));\n        x = (((x & 0xcccccccc) >>> 2) | ((x & 0x33333333) << 2));\n        x = (((x & 0xf0f0f0f0) >>> 4) | ((x & 0x0f0f0f0f) << 4));\n        x = (((x & 0xff00ff00) >>> 8) | ((x & 0x00ff00ff) << 8));\n        U.rev15[i] = (((x >>> 16) | (x << 16)))>>>17;\n      }\n  \n      function pushV(tgt, n, sv) {  while(n--!=0) tgt.push(0,sv);  }\n  \n      for(var i=0; i<32; i++) {  U.ldef[i]=(U.of0[i]<<3)|U.exb[i];  U.ddef[i]=(U.df0[i]<<4)|U.dxb[i];  }\n  \n      pushV(U.fltree, 144, 8);  pushV(U.fltree, 255-143, 9);  pushV(U.fltree, 279-255, 7);  pushV(U.fltree,287-279,8);\n      /*\n        var i = 0;\n        for(; i<=143; i++) U.fltree.push(0,8);\n        for(; i<=255; i++) U.fltree.push(0,9);\n        for(; i<=279; i++) U.fltree.push(0,7);\n        for(; i<=287; i++) U.fltree.push(0,8);\n        */\n      UZIP.F.makeCodes(U.fltree, 9);\n      UZIP.F.codes2map(U.fltree, 9, U.flmap);\n      UZIP.F.revCodes (U.fltree, 9)\n  \n      pushV(U.fdtree,32,5);\n      //for(i=0;i<32; i++) U.fdtree.push(0,5);\n      UZIP.F.makeCodes(U.fdtree, 5);\n      UZIP.F.codes2map(U.fdtree, 5, U.fdmap);\n      UZIP.F.revCodes (U.fdtree, 5)\n  \n      pushV(U.itree,19,0);  pushV(U.ltree,286,0);  pushV(U.dtree,30,0);  pushV(U.ttree,320,0);\n      /*\n        for(var i=0; i< 19; i++) U.itree.push(0,0);\n        for(var i=0; i<286; i++) U.ltree.push(0,0);\n        for(var i=0; i< 30; i++) U.dtree.push(0,0);\n        for(var i=0; i<320; i++) U.ttree.push(0,0);\n        */\n    })()\n    "
      )
  );
}
function generateWorkerScript() {
  return createWorker(
    "\n    let scriptImported = false\n    self.addEventListener('message', async (e) => {\n      const { file, id, imageCompressionLibUrl, options } = e.data\n      options.onProgress = (progress) => self.postMessage({ progress, id })\n      try {\n        if (!scriptImported) {\n          // console.log('[worker] importScripts', imageCompressionLibUrl)\n          self.importScripts(imageCompressionLibUrl)\n          scriptImported = true\n        }\n        // console.log('[worker] self', self)\n        const compressedFile = await imageCompression(file, options)\n        self.postMessage({ file: compressedFile, id })\n      } catch (e) {\n        // console.error('[worker] error', e)\n        self.postMessage({ error: e.message + '\\n' + e.stack, id })\n      }\n    })\n  "
  );
}
function compressOnWebWorker(e, r) {
  return new Promise(function (t, a) {
    return new Promise(function (i, f) {
      var c = cnt++;
      return (
        imageCompressionLibUrl || (imageCompressionLibUrl = generateLib()),
        worker || (worker = generateWorkerScript()),
        worker.addEventListener("message", function handler(e) {
          if (e.data.id === c) {
            if (void 0 !== e.data.progress)
              return void r.onProgress(e.data.progress);
            worker.removeEventListener("message", handler),
              e.data.error && a(new Error(e.data.error)),
              t(e.data.file);
          }
        }),
        worker.addEventListener("error", a),
        worker.postMessage({
          file: e,
          id: c,
          imageCompressionLibUrl: imageCompressionLibUrl,
          options: _objectSpread2(
            _objectSpread2({}, r),
            {},
            { onProgress: void 0 }
          ),
        }),
        i()
      );
    });
  });
}
function imageCompression(e, r) {
  return new Promise(function (t, a) {
    var i, f, c, s, l;
    if (
      ((f = 0),
      (r.maxSizeMB = r.maxSizeMB || Number.POSITIVE_INFINITY),
      (s = "boolean" != typeof r.useWebWorker || r.useWebWorker),
      delete r.useWebWorker,
      (c = r.onProgress),
      (r.onProgress = function (e) {
        (f = e), "function" == typeof c && c(f);
      }),
      !(e instanceof Blob || e instanceof CustomFile))
    )
      return a(new Error("The file given is not an instance of Blob or File"));
    if (!/^image/.test(e.type))
      return a(new Error("The file given is not an image"));
    if (
      ((l =
        "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope),
      !s || "function" != typeof Worker || l)
    )
      return compress(e, r).then(
        function (e) {
          try {
            return (i = e), $If_3.call(this);
          } catch (e) {
            return a(e);
          }
        }.bind(this),
        a
      );
    var u = function () {
        try {
          return $If_3.call(this);
        } catch (e) {
          return a(e);
        }
      }.bind(this),
      d = function $Try_1_Catch(t) {
        try {
          return compress(e, r).then(function (e) {
            try {
              return (i = e), u();
            } catch (e) {
              return a(e);
            }
          }, a);
        } catch (e) {
          return a(e);
        }
      };
    try {
      return compressOnWebWorker(e, r).then(function (e) {
        try {
          return (i = e), u();
        } catch (e) {
          return d();
        }
      }, d);
    } catch (e) {
      d();
    }
    function $If_3() {
      try {
        (i.name = e.name), (i.lastModified = e.lastModified);
      } catch (e) {}
      return t(i);
    }
  });
}
(imageCompression.getDataUrlFromFile = getDataUrlFromFile),
  (imageCompression.getFilefromDataUrl = getFilefromDataUrl),
  (imageCompression.loadImage = loadImage),
  (imageCompression.drawImageInCanvas = drawImageInCanvas),
  (imageCompression.drawFileInCanvas = drawFileInCanvas),
  (imageCompression.canvasToFile = canvasToFile),
  (imageCompression.getExifOrientation = getExifOrientation),
  (imageCompression.handleMaxWidthOrHeight = handleMaxWidthOrHeight),
  (imageCompression.followExifOrientation = followExifOrientation),
  (imageCompression.cleanupCanvasMemory = cleanupCanvasMemory),
  (imageCompression.isAutoOrientationInBrowser = isAutoOrientationInBrowser),
  (imageCompression.version = "1.0.14");
export default imageCompression;
//# sourceMappingURL=browser-image-compression.mjs.map
