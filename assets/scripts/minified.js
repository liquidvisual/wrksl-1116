var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function init() {
  Vue.component("jobs-table", { template: '\n            <div class="table-responsive">\n                <table class="table table-bordered">\n                    \x3c!-- <caption>Job Vacancies</caption> --\x3e\n                    <thead>\n                        <tr>\n                            <th\n                                v-for="item in data[0]"\n                                :key="\'th-\'+item"\n                                scope="col"\n                            >\n                                <h4 class="mb-0">\n                                    {{ item }}\n                                </h4>\n                            </th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr\n                            v-for="item in data.slice(1)"\n                            :key="\'tr-\'+item"\n                        >\n                            <td\n                                v-for="item_n in item"\n                                :key="\'td-\'+item_n"\n                            >\n                                {{ item_n }}\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        ', props: { data: { type: Array, required: !0 } } }), Vue.component("select-filter", { template: '\n            <select\n                class="custom-select mb-3"\n                :name="id"\n                :filter-order="filterOrder"\n                v-model="filterOrder"\n                @change="$emit(\'input\', filterOrder)"\n            >\n                <option\n                    v-for="item in filters"\n                    :value="item.value"\n                    v-text="item.name"\n                >\n                </option>\n            </select>\n        ', props: { filters: { type: Array, required: !0 }, id: { type: String, required: !0 } }, data: function data() {
      return { filterOrder: "All" };
    } }), Vue.component("keyword-search", { template: '\n            <input\n                type="text"\n                class="form-control"\n                placeholder="Keywords"\n                :name="id"\n                :value="value"\n                @input="$emit(\'input\', $event.target.value)"\n            >\n        ', props: { id: { type: String, required: !0 }, value: { type: String, required: !0 } } }), new Vue({ el: "#vue-jobs-listing-app", data: function data() {
      return { csvPath: null, jobsData: null, filterLocation: "All", filterVacancyType: "All", filterKeywords: "", locations: [{ name: "All Locations", value: "All" }, { name: "Western Australia", value: "WA" }, { name: "South Australia", value: "SA" }, { name: "New South Wales", value: "NSW" }, { name: "Victoria", value: "VIC" }], vacancyTypes: [{ name: "All Types", value: "All" }, { name: "Full-time", value: "Full-time" }, { name: "Part-time", value: "Part-time" }, { name: "Casual", value: "Casual" }] };
    }, computed: {
      jobsDataFiltered: function jobsDataFiltered() {
        var _this = this;

        var t = this.jobsData;return "All" !== this.filterLocation && (t = t.filter(function (t, e) {
          if (0 === e || t[1] && -1 !== t[1].indexOf(_this.filterLocation)) return t;
        })), "All" !== this.filterVacancyType && (t = t.filter(function (t, e) {
          if (0 === e || t[2] && -1 !== t[2].indexOf(_this.filterVacancyType) || "Part-time" === _this.filterVacancyType && t[2] && -1 !== t[2].toLowerCase().indexOf("p/t") || "Full-time" === _this.filterVacancyType && t[2] && -1 !== t[2].toLowerCase().indexOf("f/t")) return t;
        })), this.filterKeywords && (t = t.filter(function (t, e) {
          if (0 === e || _this.filterKeywords.toLowerCase().split(" ").every(function (e) {
            return -1 !== t[0].toLowerCase().indexOf(e);
          })) return t;
        })), t = t.filter(function (t) {
          return t[0].length;
        });
      }
    }, mounted: function mounted() {
      this.csvPath = this.$el.getAttribute("data-csv-path"), this.csvPath && this.parseCSV(this.csvPath);
    },
    methods: {
      parseCSV: function parseCSV(t) {
        var _this2 = this;

        Papa.parse(t, { download: !0, before: function before(t, e) {}, error: function error(t, e, n, i) {}, complete: function complete(t) {
            _this2.jobsData = t.data;
          } });
      }
    } });
}!function (t, e) {
  "use strict";
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = t.document ? e(t, !0) : function (t) {
    if (!t.document) throw new Error("jQuery requires a window with a document");return e(t);
  } : e(t);
}("undefined" != typeof window ? window : this, function (t, e) {
  "use strict";
  var n = [],
      i = t.document,
      o = Object.getPrototypeOf,
      r = n.slice,
      s = n.concat,
      a = n.push,
      l = n.indexOf,
      c = {},
      u = c.toString,
      h = c.hasOwnProperty,
      d = h.toString,
      f = d.call(Object),
      p = {},
      g = function g(t) {
    return "function" == typeof t && "number" != typeof t.nodeType;
  },
      m = function m(t) {
    return null != t && t === t.window;
  },
      v = { type: !0, src: !0, nonce: !0, noModule: !0 };function y(t, e, n) {
    var o,
        r,
        s = (n = n || i).createElement("script");if (s.text = t, e) for (o in v) {
      (r = e[o] || e.getAttribute && e.getAttribute(o)) && s.setAttribute(o, r);
    }n.head.appendChild(s).parentNode.removeChild(s);
  }function _(t) {
    return null == t ? t + "" : "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) || "function" == typeof t ? c[u.call(t)] || "object" : typeof t === "undefined" ? "undefined" : _typeof(t);
  }var b = function b(t, e) {
    return new b.fn.init(t, e);
  },
      E = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function w(t) {
    var e = !!t && "length" in t && t.length,
        n = _(t);return !g(t) && !m(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t);
  }b.fn = b.prototype = { jquery: "3.4.1", constructor: b, length: 0, toArray: function toArray() {
      return r.call(this);
    }, get: function get(t) {
      return null == t ? r.call(this) : t < 0 ? this[t + this.length] : this[t];
    }, pushStack: function pushStack(t) {
      var e = b.merge(this.constructor(), t);return e.prevObject = this, e;
    }, each: function each(t) {
      return b.each(this, t);
    }, map: function map(t) {
      return this.pushStack(b.map(this, function (e, n) {
        return t.call(e, n, e);
      }));
    }, slice: function slice() {
      return this.pushStack(r.apply(this, arguments));
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, eq: function eq(t) {
      var e = this.length,
          n = +t + (t < 0 ? e : 0);return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
    }, end: function end() {
      return this.prevObject || this.constructor();
    }, push: a, sort: n.sort, splice: n.splice }, b.extend = b.fn.extend = function () {
    var t,
        e,
        n,
        i,
        o,
        r,
        s = arguments[0] || {},
        a = 1,
        l = arguments.length,
        c = !1;for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == (typeof s === "undefined" ? "undefined" : _typeof(s)) || g(s) || (s = {}), a === l && (s = this, a--); a < l; a++) {
      if (null != (t = arguments[a])) for (e in t) {
        i = t[e], "__proto__" !== e && s !== i && (c && i && (b.isPlainObject(i) || (o = Array.isArray(i))) ? (n = s[e], r = o && !Array.isArray(n) ? [] : o || b.isPlainObject(n) ? n : {}, o = !1, s[e] = b.extend(c, r, i)) : void 0 !== i && (s[e] = i));
      }
    }return s;
  }, b.extend({ expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(t) {
      throw new Error(t);
    }, noop: function noop() {}, isPlainObject: function isPlainObject(t) {
      var e, n;return !(!t || "[object Object]" !== u.call(t)) && (!(e = o(t)) || "function" == typeof (n = h.call(e, "constructor") && e.constructor) && d.call(n) === f);
    }, isEmptyObject: function isEmptyObject(t) {
      var e;for (e in t) {
        return !1;
      }return !0;
    }, globalEval: function globalEval(t, e) {
      y(t, { nonce: e && e.nonce });
    }, each: function each(t, e) {
      var n,
          i = 0;if (w(t)) for (n = t.length; i < n && !1 !== e.call(t[i], i, t[i]); i++) {} else for (i in t) {
        if (!1 === e.call(t[i], i, t[i])) break;
      }return t;
    }, trim: function trim(t) {
      return null == t ? "" : (t + "").replace(E, "");
    }, makeArray: function makeArray(t, e) {
      var n = e || [];return null != t && (w(Object(t)) ? b.merge(n, "string" == typeof t ? [t] : t) : a.call(n, t)), n;
    }, inArray: function inArray(t, e, n) {
      return null == e ? -1 : l.call(e, t, n);
    }, merge: function merge(t, e) {
      for (var n = +e.length, i = 0, o = t.length; i < n; i++) {
        t[o++] = e[i];
      }return t.length = o, t;
    }, grep: function grep(t, e, n) {
      for (var i = [], o = 0, r = t.length, s = !n; o < r; o++) {
        !e(t[o], o) !== s && i.push(t[o]);
      }return i;
    }, map: function map(t, e, n) {
      var i,
          o,
          r = 0,
          a = [];if (w(t)) for (i = t.length; r < i; r++) {
        null != (o = e(t[r], r, n)) && a.push(o);
      } else for (r in t) {
        null != (o = e(t[r], r, n)) && a.push(o);
      }return s.apply([], a);
    }, guid: 1, support: p }), "function" == typeof Symbol && (b.fn[Symbol.iterator] = n[Symbol.iterator]), b.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
    c["[object " + e + "]"] = e.toLowerCase();
  });var C = function (t) {
    var e,
        n,
        i,
        o,
        r,
        s,
        a,
        l,
        c,
        u,
        h,
        d,
        f,
        p,
        g,
        m,
        v,
        y,
        _,
        b = "sizzle" + 1 * new Date(),
        E = t.document,
        w = 0,
        C = 0,
        x = lt(),
        S = lt(),
        T = lt(),
        D = lt(),
        k = function k(t, e) {
      return t === e && (h = !0), 0;
    },
        A = {}.hasOwnProperty,
        I = [],
        N = I.pop,
        L = I.push,
        O = I.push,
        P = I.slice,
        j = function j(t, e) {
      for (var n = 0, i = t.length; n < i; n++) {
        if (t[n] === e) return n;
      }return -1;
    },
        R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        q = "[\\x20\\t\\r\\n\\f]",
        M = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        H = "\\[" + q + "*(" + M + ")(?:" + q + "*([*^$|!~]?=)" + q + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + q + "*\\]",
        F = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + H + ")*)|.*)\\)|)",
        z = new RegExp(q + "+", "g"),
        W = new RegExp("^" + q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + q + "+$", "g"),
        U = new RegExp("^" + q + "*," + q + "*"),
        B = new RegExp("^" + q + "*([>+~]|" + q + ")" + q + "*"),
        $ = new RegExp(q + "|>"),
        V = new RegExp(F),
        Q = new RegExp("^" + M + "$"),
        K = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), TAG: new RegExp("^(" + M + "|[*])"), ATTR: new RegExp("^" + H), PSEUDO: new RegExp("^" + F), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + q + "*(even|odd|(([+-]|)(\\d*)n|)" + q + "*(?:([+-]|)" + q + "*(\\d+)|))" + q + "*\\)|)", "i"), bool: new RegExp("^(?:" + R + ")$", "i"), needsContext: new RegExp("^" + q + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + q + "*((?:-\\d)?\\d*)" + q + "*\\)|)(?=[^-]|$)", "i") },
        X = /HTML$/i,
        Y = /^(?:input|select|textarea|button)$/i,
        G = /^h\d$/i,
        J = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        tt = /[+~]/,
        et = new RegExp("\\\\([\\da-f]{1,6}" + q + "?|(" + q + ")|.)", "ig"),
        nt = function nt(t, e, n) {
      var i = "0x" + e - 65536;return i != i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
    },
        it = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ot = function ot(t, e) {
      return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t;
    },
        rt = function rt() {
      d();
    },
        st = bt(function (t) {
      return !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase();
    }, { dir: "parentNode", next: "legend" });try {
      O.apply(I = P.call(E.childNodes), E.childNodes), I[E.childNodes.length].nodeType;
    } catch (t) {
      O = { apply: I.length ? function (t, e) {
          L.apply(t, P.call(e));
        } : function (t, e) {
          for (var n = t.length, i = 0; t[n++] = e[i++];) {}t.length = n - 1;
        } };
    }function at(t, e, i, o) {
      var r,
          a,
          c,
          u,
          h,
          p,
          v,
          y = e && e.ownerDocument,
          w = e ? e.nodeType : 9;if (i = i || [], "string" != typeof t || !t || 1 !== w && 9 !== w && 11 !== w) return i;if (!o && ((e ? e.ownerDocument || e : E) !== f && d(e), e = e || f, g)) {
        if (11 !== w && (h = Z.exec(t))) if (r = h[1]) {
          if (9 === w) {
            if (!(c = e.getElementById(r))) return i;if (c.id === r) return i.push(c), i;
          } else if (y && (c = y.getElementById(r)) && _(e, c) && c.id === r) return i.push(c), i;
        } else {
          if (h[2]) return O.apply(i, e.getElementsByTagName(t)), i;if ((r = h[3]) && n.getElementsByClassName && e.getElementsByClassName) return O.apply(i, e.getElementsByClassName(r)), i;
        }if (n.qsa && !D[t + " "] && (!m || !m.test(t)) && (1 !== w || "object" !== e.nodeName.toLowerCase())) {
          if (v = t, y = e, 1 === w && $.test(t)) {
            for ((u = e.getAttribute("id")) ? u = u.replace(it, ot) : e.setAttribute("id", u = b), a = (p = s(t)).length; a--;) {
              p[a] = "#" + u + " " + _t(p[a]);
            }v = p.join(","), y = tt.test(t) && vt(e.parentNode) || e;
          }try {
            return O.apply(i, y.querySelectorAll(v)), i;
          } catch (e) {
            D(t, !0);
          } finally {
            u === b && e.removeAttribute("id");
          }
        }
      }return l(t.replace(W, "$1"), e, i, o);
    }function lt() {
      var t = [];return function e(n, o) {
        return t.push(n + " ") > i.cacheLength && delete e[t.shift()], e[n + " "] = o;
      };
    }function ct(t) {
      return t[b] = !0, t;
    }function ut(t) {
      var e = f.createElement("fieldset");try {
        return !!t(e);
      } catch (t) {
        return !1;
      } finally {
        e.parentNode && e.parentNode.removeChild(e), e = null;
      }
    }function ht(t, e) {
      for (var n = t.split("|"), o = n.length; o--;) {
        i.attrHandle[n[o]] = e;
      }
    }function dt(t, e) {
      var n = e && t,
          i = n && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;if (i) return i;if (n) for (; n = n.nextSibling;) {
        if (n === e) return -1;
      }return t ? 1 : -1;
    }function ft(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }function pt(t) {
      return function (e) {
        var n = e.nodeName.toLowerCase();return ("input" === n || "button" === n) && e.type === t;
      };
    }function gt(t) {
      return function (e) {
        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && st(e) === t : e.disabled === t : "label" in e && e.disabled === t;
      };
    }function mt(t) {
      return ct(function (e) {
        return e = +e, ct(function (n, i) {
          for (var o, r = t([], n.length, e), s = r.length; s--;) {
            n[o = r[s]] && (n[o] = !(i[o] = n[o]));
          }
        });
      });
    }function vt(t) {
      return t && void 0 !== t.getElementsByTagName && t;
    }for (e in n = at.support = {}, r = at.isXML = function (t) {
      var e = t.namespaceURI,
          n = (t.ownerDocument || t).documentElement;return !X.test(e || n && n.nodeName || "HTML");
    }, d = at.setDocument = function (t) {
      var e,
          o,
          s = t ? t.ownerDocument || t : E;return s !== f && 9 === s.nodeType && s.documentElement ? (p = (f = s).documentElement, g = !r(f), E !== f && (o = f.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", rt, !1) : o.attachEvent && o.attachEvent("onunload", rt)), n.attributes = ut(function (t) {
        return t.className = "i", !t.getAttribute("className");
      }), n.getElementsByTagName = ut(function (t) {
        return t.appendChild(f.createComment("")), !t.getElementsByTagName("*").length;
      }), n.getElementsByClassName = J.test(f.getElementsByClassName), n.getById = ut(function (t) {
        return p.appendChild(t).id = b, !f.getElementsByName || !f.getElementsByName(b).length;
      }), n.getById ? (i.filter.ID = function (t) {
        var e = t.replace(et, nt);return function (t) {
          return t.getAttribute("id") === e;
        };
      }, i.find.ID = function (t, e) {
        if (void 0 !== e.getElementById && g) {
          var n = e.getElementById(t);return n ? [n] : [];
        }
      }) : (i.filter.ID = function (t) {
        var e = t.replace(et, nt);return function (t) {
          var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");return n && n.value === e;
        };
      }, i.find.ID = function (t, e) {
        if (void 0 !== e.getElementById && g) {
          var n,
              i,
              o,
              r = e.getElementById(t);if (r) {
            if ((n = r.getAttributeNode("id")) && n.value === t) return [r];for (o = e.getElementsByName(t), i = 0; r = o[i++];) {
              if ((n = r.getAttributeNode("id")) && n.value === t) return [r];
            }
          }return [];
        }
      }), i.find.TAG = n.getElementsByTagName ? function (t, e) {
        return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : n.qsa ? e.querySelectorAll(t) : void 0;
      } : function (t, e) {
        var n,
            i = [],
            o = 0,
            r = e.getElementsByTagName(t);if ("*" === t) {
          for (; n = r[o++];) {
            1 === n.nodeType && i.push(n);
          }return i;
        }return r;
      }, i.find.CLASS = n.getElementsByClassName && function (t, e) {
        if (void 0 !== e.getElementsByClassName && g) return e.getElementsByClassName(t);
      }, v = [], m = [], (n.qsa = J.test(f.querySelectorAll)) && (ut(function (t) {
        p.appendChild(t).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + q + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || m.push("\\[" + q + "*(?:value|" + R + ")"), t.querySelectorAll("[id~=" + b + "-]").length || m.push("~="), t.querySelectorAll(":checked").length || m.push(":checked"), t.querySelectorAll("a#" + b + "+*").length || m.push(".#.+[+~]");
      }), ut(function (t) {
        t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var e = f.createElement("input");e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && m.push("name" + q + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), p.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), m.push(",.*:");
      })), (n.matchesSelector = J.test(y = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && ut(function (t) {
        n.disconnectedMatch = y.call(t, "*"), y.call(t, "[s!='']:x"), v.push("!=", F);
      }), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), e = J.test(p.compareDocumentPosition), _ = e || J.test(p.contains) ? function (t, e) {
        var n = 9 === t.nodeType ? t.documentElement : t,
            i = e && e.parentNode;return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)));
      } : function (t, e) {
        if (e) for (; e = e.parentNode;) {
          if (e === t) return !0;
        }return !1;
      }, k = e ? function (t, e) {
        if (t === e) return h = !0, 0;var i = !t.compareDocumentPosition - !e.compareDocumentPosition;return i || (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !n.sortDetached && e.compareDocumentPosition(t) === i ? t === f || t.ownerDocument === E && _(E, t) ? -1 : e === f || e.ownerDocument === E && _(E, e) ? 1 : u ? j(u, t) - j(u, e) : 0 : 4 & i ? -1 : 1);
      } : function (t, e) {
        if (t === e) return h = !0, 0;var n,
            i = 0,
            o = t.parentNode,
            r = e.parentNode,
            s = [t],
            a = [e];if (!o || !r) return t === f ? -1 : e === f ? 1 : o ? -1 : r ? 1 : u ? j(u, t) - j(u, e) : 0;if (o === r) return dt(t, e);for (n = t; n = n.parentNode;) {
          s.unshift(n);
        }for (n = e; n = n.parentNode;) {
          a.unshift(n);
        }for (; s[i] === a[i];) {
          i++;
        }return i ? dt(s[i], a[i]) : s[i] === E ? -1 : a[i] === E ? 1 : 0;
      }, f) : f;
    }, at.matches = function (t, e) {
      return at(t, null, null, e);
    }, at.matchesSelector = function (t, e) {
      if ((t.ownerDocument || t) !== f && d(t), n.matchesSelector && g && !D[e + " "] && (!v || !v.test(e)) && (!m || !m.test(e))) try {
        var i = y.call(t, e);if (i || n.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i;
      } catch (t) {
        D(e, !0);
      }return at(e, f, null, [t]).length > 0;
    }, at.contains = function (t, e) {
      return (t.ownerDocument || t) !== f && d(t), _(t, e);
    }, at.attr = function (t, e) {
      (t.ownerDocument || t) !== f && d(t);var o = i.attrHandle[e.toLowerCase()],
          r = o && A.call(i.attrHandle, e.toLowerCase()) ? o(t, e, !g) : void 0;return void 0 !== r ? r : n.attributes || !g ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null;
    }, at.escape = function (t) {
      return (t + "").replace(it, ot);
    }, at.error = function (t) {
      throw new Error("Syntax error, unrecognized expression: " + t);
    }, at.uniqueSort = function (t) {
      var e,
          i = [],
          o = 0,
          r = 0;if (h = !n.detectDuplicates, u = !n.sortStable && t.slice(0), t.sort(k), h) {
        for (; e = t[r++];) {
          e === t[r] && (o = i.push(r));
        }for (; o--;) {
          t.splice(i[o], 1);
        }
      }return u = null, t;
    }, o = at.getText = function (t) {
      var e,
          n = "",
          i = 0,
          r = t.nodeType;if (r) {
        if (1 === r || 9 === r || 11 === r) {
          if ("string" == typeof t.textContent) return t.textContent;for (t = t.firstChild; t; t = t.nextSibling) {
            n += o(t);
          }
        } else if (3 === r || 4 === r) return t.nodeValue;
      } else for (; e = t[i++];) {
        n += o(e);
      }return n;
    }, (i = at.selectors = { cacheLength: 50, createPseudo: ct, match: K, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(t) {
          return t[1] = t[1].replace(et, nt), t[3] = (t[3] || t[4] || t[5] || "").replace(et, nt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4);
        }, CHILD: function CHILD(t) {
          return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || at.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && at.error(t[0]), t;
        }, PSEUDO: function PSEUDO(t) {
          var e,
              n = !t[6] && t[2];return K.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && V.test(n) && (e = s(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3));
        } }, filter: { TAG: function TAG(t) {
          var e = t.replace(et, nt).toLowerCase();return "*" === t ? function () {
            return !0;
          } : function (t) {
            return t.nodeName && t.nodeName.toLowerCase() === e;
          };
        }, CLASS: function CLASS(t) {
          var e = x[t + " "];return e || (e = new RegExp("(^|" + q + ")" + t + "(" + q + "|$)")) && x(t, function (t) {
            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "");
          });
        }, ATTR: function ATTR(t, e, n) {
          return function (i) {
            var o = at.attr(i, t);return null == o ? "!=" === e : !e || (o += "", "=" === e ? o === n : "!=" === e ? o !== n : "^=" === e ? n && 0 === o.indexOf(n) : "*=" === e ? n && o.indexOf(n) > -1 : "$=" === e ? n && o.slice(-n.length) === n : "~=" === e ? (" " + o.replace(z, " ") + " ").indexOf(n) > -1 : "|=" === e && (o === n || o.slice(0, n.length + 1) === n + "-"));
          };
        }, CHILD: function CHILD(t, e, n, i, o) {
          var r = "nth" !== t.slice(0, 3),
              s = "last" !== t.slice(-4),
              a = "of-type" === e;return 1 === i && 0 === o ? function (t) {
            return !!t.parentNode;
          } : function (e, n, l) {
            var c,
                u,
                h,
                d,
                f,
                p,
                g = r !== s ? "nextSibling" : "previousSibling",
                m = e.parentNode,
                v = a && e.nodeName.toLowerCase(),
                y = !l && !a,
                _ = !1;if (m) {
              if (r) {
                for (; g;) {
                  for (d = e; d = d[g];) {
                    if (a ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                  }p = g = "only" === t && !p && "nextSibling";
                }return !0;
              }if (p = [s ? m.firstChild : m.lastChild], s && y) {
                for (_ = (f = (c = (u = (h = (d = m)[b] || (d[b] = {}))[d.uniqueID] || (h[d.uniqueID] = {}))[t] || [])[0] === w && c[1]) && c[2], d = f && m.childNodes[f]; d = ++f && d && d[g] || (_ = f = 0) || p.pop();) {
                  if (1 === d.nodeType && ++_ && d === e) {
                    u[t] = [w, f, _];break;
                  }
                }
              } else if (y && (_ = f = (c = (u = (h = (d = e)[b] || (d[b] = {}))[d.uniqueID] || (h[d.uniqueID] = {}))[t] || [])[0] === w && c[1]), !1 === _) for (; (d = ++f && d && d[g] || (_ = f = 0) || p.pop()) && ((a ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++_ || (y && ((u = (h = d[b] || (d[b] = {}))[d.uniqueID] || (h[d.uniqueID] = {}))[t] = [w, _]), d !== e));) {}return (_ -= o) === i || _ % i == 0 && _ / i >= 0;
            }
          };
        }, PSEUDO: function PSEUDO(t, e) {
          var n,
              o = i.pseudos[t] || i.setFilters[t.toLowerCase()] || at.error("unsupported pseudo: " + t);return o[b] ? o(e) : o.length > 1 ? (n = [t, t, "", e], i.setFilters.hasOwnProperty(t.toLowerCase()) ? ct(function (t, n) {
            for (var i, r = o(t, e), s = r.length; s--;) {
              t[i = j(t, r[s])] = !(n[i] = r[s]);
            }
          }) : function (t) {
            return o(t, 0, n);
          }) : o;
        } }, pseudos: { not: ct(function (t) {
          var e = [],
              n = [],
              i = a(t.replace(W, "$1"));return i[b] ? ct(function (t, e, n, o) {
            for (var r, s = i(t, null, o, []), a = t.length; a--;) {
              (r = s[a]) && (t[a] = !(e[a] = r));
            }
          }) : function (t, o, r) {
            return e[0] = t, i(e, null, r, n), e[0] = null, !n.pop();
          };
        }), has: ct(function (t) {
          return function (e) {
            return at(t, e).length > 0;
          };
        }), contains: ct(function (t) {
          return t = t.replace(et, nt), function (e) {
            return (e.textContent || o(e)).indexOf(t) > -1;
          };
        }), lang: ct(function (t) {
          return Q.test(t || "") || at.error("unsupported lang: " + t), t = t.replace(et, nt).toLowerCase(), function (e) {
            var n;do {
              if (n = g ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-");
            } while ((e = e.parentNode) && 1 === e.nodeType);return !1;
          };
        }), target: function target(e) {
          var n = t.location && t.location.hash;return n && n.slice(1) === e.id;
        }, root: function root(t) {
          return t === p;
        }, focus: function focus(t) {
          return t === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
        }, enabled: gt(!1), disabled: gt(!0), checked: function checked(t) {
          var e = t.nodeName.toLowerCase();return "input" === e && !!t.checked || "option" === e && !!t.selected;
        }, selected: function selected(t) {
          return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
        }, empty: function empty(t) {
          for (t = t.firstChild; t; t = t.nextSibling) {
            if (t.nodeType < 6) return !1;
          }return !0;
        }, parent: function parent(t) {
          return !i.pseudos.empty(t);
        }, header: function header(t) {
          return G.test(t.nodeName);
        }, input: function input(t) {
          return Y.test(t.nodeName);
        }, button: function button(t) {
          var e = t.nodeName.toLowerCase();return "input" === e && "button" === t.type || "button" === e;
        }, text: function text(t) {
          var e;return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase());
        }, first: mt(function () {
          return [0];
        }), last: mt(function (t, e) {
          return [e - 1];
        }), eq: mt(function (t, e, n) {
          return [n < 0 ? n + e : n];
        }), even: mt(function (t, e) {
          for (var n = 0; n < e; n += 2) {
            t.push(n);
          }return t;
        }), odd: mt(function (t, e) {
          for (var n = 1; n < e; n += 2) {
            t.push(n);
          }return t;
        }), lt: mt(function (t, e, n) {
          for (var i = n < 0 ? n + e : n > e ? e : n; --i >= 0;) {
            t.push(i);
          }return t;
        }), gt: mt(function (t, e, n) {
          for (var i = n < 0 ? n + e : n; ++i < e;) {
            t.push(i);
          }return t;
        }) } }).pseudos.nth = i.pseudos.eq, { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      i.pseudos[e] = ft(e);
    }for (e in { submit: !0, reset: !0 }) {
      i.pseudos[e] = pt(e);
    }function yt() {}function _t(t) {
      for (var e = 0, n = t.length, i = ""; e < n; e++) {
        i += t[e].value;
      }return i;
    }function bt(t, e, n) {
      var i = e.dir,
          o = e.next,
          r = o || i,
          s = n && "parentNode" === r,
          a = C++;return e.first ? function (e, n, o) {
        for (; e = e[i];) {
          if (1 === e.nodeType || s) return t(e, n, o);
        }return !1;
      } : function (e, n, l) {
        var c,
            u,
            h,
            d = [w, a];if (l) {
          for (; e = e[i];) {
            if ((1 === e.nodeType || s) && t(e, n, l)) return !0;
          }
        } else for (; e = e[i];) {
          if (1 === e.nodeType || s) if (u = (h = e[b] || (e[b] = {}))[e.uniqueID] || (h[e.uniqueID] = {}), o && o === e.nodeName.toLowerCase()) e = e[i] || e;else {
            if ((c = u[r]) && c[0] === w && c[1] === a) return d[2] = c[2];if (u[r] = d, d[2] = t(e, n, l)) return !0;
          }
        }return !1;
      };
    }function Et(t) {
      return t.length > 1 ? function (e, n, i) {
        for (var o = t.length; o--;) {
          if (!t[o](e, n, i)) return !1;
        }return !0;
      } : t[0];
    }function wt(t, e, n, i, o) {
      for (var r, s = [], a = 0, l = t.length, c = null != e; a < l; a++) {
        (r = t[a]) && (n && !n(r, i, o) || (s.push(r), c && e.push(a)));
      }return s;
    }function Ct(t, e, n, i, o, r) {
      return i && !i[b] && (i = Ct(i)), o && !o[b] && (o = Ct(o, r)), ct(function (r, s, a, l) {
        var c,
            u,
            h,
            d = [],
            f = [],
            p = s.length,
            g = r || function (t, e, n) {
          for (var i = 0, o = e.length; i < o; i++) {
            at(t, e[i], n);
          }return n;
        }(e || "*", a.nodeType ? [a] : a, []),
            m = !t || !r && e ? g : wt(g, d, t, a, l),
            v = n ? o || (r ? t : p || i) ? [] : s : m;if (n && n(m, v, a, l), i) for (c = wt(v, f), i(c, [], a, l), u = c.length; u--;) {
          (h = c[u]) && (v[f[u]] = !(m[f[u]] = h));
        }if (r) {
          if (o || t) {
            if (o) {
              for (c = [], u = v.length; u--;) {
                (h = v[u]) && c.push(m[u] = h);
              }o(null, v = [], c, l);
            }for (u = v.length; u--;) {
              (h = v[u]) && (c = o ? j(r, h) : d[u]) > -1 && (r[c] = !(s[c] = h));
            }
          }
        } else v = wt(v === s ? v.splice(p, v.length) : v), o ? o(null, s, v, l) : O.apply(s, v);
      });
    }function xt(t) {
      for (var e, n, o, r = t.length, s = i.relative[t[0].type], a = s || i.relative[" "], l = s ? 1 : 0, u = bt(function (t) {
        return t === e;
      }, a, !0), h = bt(function (t) {
        return j(e, t) > -1;
      }, a, !0), d = [function (t, n, i) {
        var o = !s && (i || n !== c) || ((e = n).nodeType ? u(t, n, i) : h(t, n, i));return e = null, o;
      }]; l < r; l++) {
        if (n = i.relative[t[l].type]) d = [bt(Et(d), n)];else {
          if ((n = i.filter[t[l].type].apply(null, t[l].matches))[b]) {
            for (o = ++l; o < r && !i.relative[t[o].type]; o++) {}return Ct(l > 1 && Et(d), l > 1 && _t(t.slice(0, l - 1).concat({ value: " " === t[l - 2].type ? "*" : "" })).replace(W, "$1"), n, l < o && xt(t.slice(l, o)), o < r && xt(t = t.slice(o)), o < r && _t(t));
          }d.push(n);
        }
      }return Et(d);
    }return yt.prototype = i.filters = i.pseudos, i.setFilters = new yt(), s = at.tokenize = function (t, e) {
      var n,
          o,
          r,
          s,
          a,
          l,
          c,
          u = S[t + " "];if (u) return e ? 0 : u.slice(0);for (a = t, l = [], c = i.preFilter; a;) {
        for (s in n && !(o = U.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), n = !1, (o = B.exec(a)) && (n = o.shift(), r.push({ value: n, type: o[0].replace(W, " ") }), a = a.slice(n.length)), i.filter) {
          !(o = K[s].exec(a)) || c[s] && !(o = c[s](o)) || (n = o.shift(), r.push({ value: n, type: s, matches: o }), a = a.slice(n.length));
        }if (!n) break;
      }return e ? a.length : a ? at.error(t) : S(t, l).slice(0);
    }, a = at.compile = function (t, e) {
      var n,
          o = [],
          r = [],
          a = T[t + " "];if (!a) {
        for (e || (e = s(t)), n = e.length; n--;) {
          (a = xt(e[n]))[b] ? o.push(a) : r.push(a);
        }(a = T(t, function (t, e) {
          var n = e.length > 0,
              o = t.length > 0,
              r = function r(_r, s, a, l, u) {
            var h,
                p,
                m,
                v = 0,
                y = "0",
                _ = _r && [],
                b = [],
                E = c,
                C = _r || o && i.find.TAG("*", u),
                x = w += null == E ? 1 : Math.random() || .1,
                S = C.length;for (u && (c = s === f || s || u); y !== S && null != (h = C[y]); y++) {
              if (o && h) {
                for (p = 0, s || h.ownerDocument === f || (d(h), a = !g); m = t[p++];) {
                  if (m(h, s || f, a)) {
                    l.push(h);break;
                  }
                }u && (w = x);
              }n && ((h = !m && h) && v--, _r && _.push(h));
            }if (v += y, n && y !== v) {
              for (p = 0; m = e[p++];) {
                m(_, b, s, a);
              }if (_r) {
                if (v > 0) for (; y--;) {
                  _[y] || b[y] || (b[y] = N.call(l));
                }b = wt(b);
              }O.apply(l, b), u && !_r && b.length > 0 && v + e.length > 1 && at.uniqueSort(l);
            }return u && (w = x, c = E), _;
          };return n ? ct(r) : r;
        }(r, o))).selector = t;
      }return a;
    }, l = at.select = function (t, e, n, o) {
      var r,
          l,
          c,
          u,
          h,
          d = "function" == typeof t && t,
          f = !o && s(t = d.selector || t);if (n = n || [], 1 === f.length) {
        if ((l = f[0] = f[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && 9 === e.nodeType && g && i.relative[l[1].type]) {
          if (!(e = (i.find.ID(c.matches[0].replace(et, nt), e) || [])[0])) return n;d && (e = e.parentNode), t = t.slice(l.shift().value.length);
        }for (r = K.needsContext.test(t) ? 0 : l.length; r-- && (c = l[r], !i.relative[u = c.type]);) {
          if ((h = i.find[u]) && (o = h(c.matches[0].replace(et, nt), tt.test(l[0].type) && vt(e.parentNode) || e))) {
            if (l.splice(r, 1), !(t = o.length && _t(l))) return O.apply(n, o), n;break;
          }
        }
      }return (d || a(t, f))(o, e, !g, n, !e || tt.test(t) && vt(e.parentNode) || e), n;
    }, n.sortStable = b.split("").sort(k).join("") === b, n.detectDuplicates = !!h, d(), n.sortDetached = ut(function (t) {
      return 1 & t.compareDocumentPosition(f.createElement("fieldset"));
    }), ut(function (t) {
      return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href");
    }) || ht("type|href|height|width", function (t, e, n) {
      if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
    }), n.attributes && ut(function (t) {
      return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value");
    }) || ht("value", function (t, e, n) {
      if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue;
    }), ut(function (t) {
      return null == t.getAttribute("disabled");
    }) || ht(R, function (t, e, n) {
      var i;if (!n) return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null;
    }), at;
  }(t);b.find = C, b.expr = C.selectors, b.expr[":"] = b.expr.pseudos, b.uniqueSort = b.unique = C.uniqueSort, b.text = C.getText, b.isXMLDoc = C.isXML, b.contains = C.contains, b.escapeSelector = C.escape;var x = function x(t, e, n) {
    for (var i = [], o = void 0 !== n; (t = t[e]) && 9 !== t.nodeType;) {
      if (1 === t.nodeType) {
        if (o && b(t).is(n)) break;i.push(t);
      }
    }return i;
  },
      S = function S(t, e) {
    for (var n = []; t; t = t.nextSibling) {
      1 === t.nodeType && t !== e && n.push(t);
    }return n;
  },
      T = b.expr.match.needsContext;function D(t, e) {
    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
  }var k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function A(t, e, n) {
    return g(e) ? b.grep(t, function (t, i) {
      return !!e.call(t, i, t) !== n;
    }) : e.nodeType ? b.grep(t, function (t) {
      return t === e !== n;
    }) : "string" != typeof e ? b.grep(t, function (t) {
      return l.call(e, t) > -1 !== n;
    }) : b.filter(e, t, n);
  }b.filter = function (t, e, n) {
    var i = e[0];return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? b.find.matchesSelector(i, t) ? [i] : [] : b.find.matches(t, b.grep(e, function (t) {
      return 1 === t.nodeType;
    }));
  }, b.fn.extend({ find: function find(t) {
      var e,
          n,
          i = this.length,
          o = this;if ("string" != typeof t) return this.pushStack(b(t).filter(function () {
        for (e = 0; e < i; e++) {
          if (b.contains(o[e], this)) return !0;
        }
      }));for (n = this.pushStack([]), e = 0; e < i; e++) {
        b.find(t, o[e], n);
      }return i > 1 ? b.uniqueSort(n) : n;
    }, filter: function filter(t) {
      return this.pushStack(A(this, t || [], !1));
    }, not: function not(t) {
      return this.pushStack(A(this, t || [], !0));
    }, is: function is(t) {
      return !!A(this, "string" == typeof t && T.test(t) ? b(t) : t || [], !1).length;
    } });var I,
      N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(b.fn.init = function (t, e, n) {
    var o, r;if (!t) return this;if (n = n || I, "string" == typeof t) {
      if (!(o = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : N.exec(t)) || !o[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);if (o[1]) {
        if (e = e instanceof b ? e[0] : e, b.merge(this, b.parseHTML(o[1], e && e.nodeType ? e.ownerDocument || e : i, !0)), k.test(o[1]) && b.isPlainObject(e)) for (o in e) {
          g(this[o]) ? this[o](e[o]) : this.attr(o, e[o]);
        }return this;
      }return (r = i.getElementById(o[2])) && (this[0] = r, this.length = 1), this;
    }return t.nodeType ? (this[0] = t, this.length = 1, this) : g(t) ? void 0 !== n.ready ? n.ready(t) : t(b) : b.makeArray(t, this);
  }).prototype = b.fn, I = b(i);var L = /^(?:parents|prev(?:Until|All))/,
      O = { children: !0, contents: !0, next: !0, prev: !0 };function P(t, e) {
    for (; (t = t[e]) && 1 !== t.nodeType;) {}return t;
  }b.fn.extend({ has: function has(t) {
      var e = b(t, this),
          n = e.length;return this.filter(function () {
        for (var t = 0; t < n; t++) {
          if (b.contains(this, e[t])) return !0;
        }
      });
    }, closest: function closest(t, e) {
      var n,
          i = 0,
          o = this.length,
          r = [],
          s = "string" != typeof t && b(t);if (!T.test(t)) for (; i < o; i++) {
        for (n = this[i]; n && n !== e; n = n.parentNode) {
          if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && b.find.matchesSelector(n, t))) {
            r.push(n);break;
          }
        }
      }return this.pushStack(r.length > 1 ? b.uniqueSort(r) : r);
    }, index: function index(t) {
      return t ? "string" == typeof t ? l.call(b(t), this[0]) : l.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function add(t, e) {
      return this.pushStack(b.uniqueSort(b.merge(this.get(), b(t, e))));
    }, addBack: function addBack(t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    } }), b.each({ parent: function parent(t) {
      var e = t.parentNode;return e && 11 !== e.nodeType ? e : null;
    }, parents: function parents(t) {
      return x(t, "parentNode");
    }, parentsUntil: function parentsUntil(t, e, n) {
      return x(t, "parentNode", n);
    }, next: function next(t) {
      return P(t, "nextSibling");
    }, prev: function prev(t) {
      return P(t, "previousSibling");
    }, nextAll: function nextAll(t) {
      return x(t, "nextSibling");
    }, prevAll: function prevAll(t) {
      return x(t, "previousSibling");
    }, nextUntil: function nextUntil(t, e, n) {
      return x(t, "nextSibling", n);
    }, prevUntil: function prevUntil(t, e, n) {
      return x(t, "previousSibling", n);
    }, siblings: function siblings(t) {
      return S((t.parentNode || {}).firstChild, t);
    }, children: function children(t) {
      return S(t.firstChild);
    }, contents: function contents(t) {
      return void 0 !== t.contentDocument ? t.contentDocument : (D(t, "template") && (t = t.content || t), b.merge([], t.childNodes));
    } }, function (t, e) {
    b.fn[t] = function (n, i) {
      var o = b.map(this, e, n);return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (o = b.filter(i, o)), this.length > 1 && (O[t] || b.uniqueSort(o), L.test(t) && o.reverse()), this.pushStack(o);
    };
  });var j = /[^\x20\t\r\n\f]+/g;function R(t) {
    return t;
  }function q(t) {
    throw t;
  }function M(t, e, n, i) {
    var o;try {
      t && g(o = t.promise) ? o.call(t).done(e).fail(n) : t && g(o = t.then) ? o.call(t, e, n) : e.apply(void 0, [t].slice(i));
    } catch (t) {
      n.apply(void 0, [t]);
    }
  }b.Callbacks = function (t) {
    t = "string" == typeof t ? function (t) {
      var e = {};return b.each(t.match(j) || [], function (t, n) {
        e[n] = !0;
      }), e;
    }(t) : b.extend({}, t);var e,
        n,
        i,
        o,
        r = [],
        s = [],
        a = -1,
        l = function l() {
      for (o = o || t.once, i = e = !0; s.length; a = -1) {
        for (n = s.shift(); ++a < r.length;) {
          !1 === r[a].apply(n[0], n[1]) && t.stopOnFalse && (a = r.length, n = !1);
        }
      }t.memory || (n = !1), e = !1, o && (r = n ? [] : "");
    },
        c = { add: function add() {
        return r && (n && !e && (a = r.length - 1, s.push(n)), function e(n) {
          b.each(n, function (n, i) {
            g(i) ? t.unique && c.has(i) || r.push(i) : i && i.length && "string" !== _(i) && e(i);
          });
        }(arguments), n && !e && l()), this;
      }, remove: function remove() {
        return b.each(arguments, function (t, e) {
          for (var n; (n = b.inArray(e, r, n)) > -1;) {
            r.splice(n, 1), n <= a && a--;
          }
        }), this;
      }, has: function has(t) {
        return t ? b.inArray(t, r) > -1 : r.length > 0;
      }, empty: function empty() {
        return r && (r = []), this;
      }, disable: function disable() {
        return o = s = [], r = n = "", this;
      }, disabled: function disabled() {
        return !r;
      }, lock: function lock() {
        return o = s = [], n || e || (r = n = ""), this;
      }, locked: function locked() {
        return !!o;
      }, fireWith: function fireWith(t, n) {
        return o || (n = [t, (n = n || []).slice ? n.slice() : n], s.push(n), e || l()), this;
      }, fire: function fire() {
        return c.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!i;
      } };return c;
  }, b.extend({ Deferred: function Deferred(e) {
      var n = [["notify", "progress", b.Callbacks("memory"), b.Callbacks("memory"), 2], ["resolve", "done", b.Callbacks("once memory"), b.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", b.Callbacks("once memory"), b.Callbacks("once memory"), 1, "rejected"]],
          i = "pending",
          o = { state: function state() {
          return i;
        }, always: function always() {
          return r.done(arguments).fail(arguments), this;
        }, catch: function _catch(t) {
          return o.then(null, t);
        }, pipe: function pipe() {
          var t = arguments;return b.Deferred(function (e) {
            b.each(n, function (n, i) {
              var o = g(t[i[4]]) && t[i[4]];r[i[1]](function () {
                var t = o && o.apply(this, arguments);t && g(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[i[0] + "With"](this, o ? [t] : arguments);
              });
            }), t = null;
          }).promise();
        }, then: function then(e, i, o) {
          var r = 0;function s(e, n, i, o) {
            return function () {
              var a = this,
                  l = arguments,
                  c = function c() {
                var t, c;if (!(e < r)) {
                  if ((t = i.apply(a, l)) === n.promise()) throw new TypeError("Thenable self-resolution");c = t && ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) || "function" == typeof t) && t.then, g(c) ? o ? c.call(t, s(r, n, R, o), s(r, n, q, o)) : (r++, c.call(t, s(r, n, R, o), s(r, n, q, o), s(r, n, R, n.notifyWith))) : (i !== R && (a = void 0, l = [t]), (o || n.resolveWith)(a, l));
                }
              },
                  u = o ? c : function () {
                try {
                  c();
                } catch (t) {
                  b.Deferred.exceptionHook && b.Deferred.exceptionHook(t, u.stackTrace), e + 1 >= r && (i !== q && (a = void 0, l = [t]), n.rejectWith(a, l));
                }
              };e ? u() : (b.Deferred.getStackHook && (u.stackTrace = b.Deferred.getStackHook()), t.setTimeout(u));
            };
          }return b.Deferred(function (t) {
            n[0][3].add(s(0, t, g(o) ? o : R, t.notifyWith)), n[1][3].add(s(0, t, g(e) ? e : R)), n[2][3].add(s(0, t, g(i) ? i : q));
          }).promise();
        }, promise: function promise(t) {
          return null != t ? b.extend(t, o) : o;
        } },
          r = {};return b.each(n, function (t, e) {
        var s = e[2],
            a = e[5];o[e[1]] = s.add, a && s.add(function () {
          i = a;
        }, n[3 - t][2].disable, n[3 - t][3].disable, n[0][2].lock, n[0][3].lock), s.add(e[3].fire), r[e[0]] = function () {
          return r[e[0] + "With"](this === r ? void 0 : this, arguments), this;
        }, r[e[0] + "With"] = s.fireWith;
      }), o.promise(r), e && e.call(r, r), r;
    }, when: function when(t) {
      var e = arguments.length,
          n = e,
          i = Array(n),
          o = r.call(arguments),
          s = b.Deferred(),
          a = function a(t) {
        return function (n) {
          i[t] = this, o[t] = arguments.length > 1 ? r.call(arguments) : n, --e || s.resolveWith(i, o);
        };
      };if (e <= 1 && (M(t, s.done(a(n)).resolve, s.reject, !e), "pending" === s.state() || g(o[n] && o[n].then))) return s.then();for (; n--;) {
        M(o[n], a(n), s.reject);
      }return s.promise();
    } });var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;b.Deferred.exceptionHook = function (e, n) {
    t.console && t.console.warn && e && H.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n);
  }, b.readyException = function (e) {
    t.setTimeout(function () {
      throw e;
    });
  };var F = b.Deferred();function z() {
    i.removeEventListener("DOMContentLoaded", z), t.removeEventListener("load", z), b.ready();
  }b.fn.ready = function (t) {
    return F.then(t).catch(function (t) {
      b.readyException(t);
    }), this;
  }, b.extend({ isReady: !1, readyWait: 1, ready: function ready(t) {
      (!0 === t ? --b.readyWait : b.isReady) || (b.isReady = !0, !0 !== t && --b.readyWait > 0 || F.resolveWith(i, [b]));
    } }), b.ready.then = F.then, "complete" === i.readyState || "loading" !== i.readyState && !i.documentElement.doScroll ? t.setTimeout(b.ready) : (i.addEventListener("DOMContentLoaded", z), t.addEventListener("load", z));var W = function W(t, e, n, i, o, r, s) {
    var a = 0,
        l = t.length,
        c = null == n;if ("object" === _(n)) for (a in o = !0, n) {
      W(t, e, a, n[a], !0, r, s);
    } else if (void 0 !== i && (o = !0, g(i) || (s = !0), c && (s ? (e.call(t, i), e = null) : (c = e, e = function e(t, _e2, n) {
      return c.call(b(t), n);
    })), e)) for (; a < l; a++) {
      e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
    }return o ? t : c ? e.call(t) : l ? e(t[0], n) : r;
  },
      U = /^-ms-/,
      B = /-([a-z])/g;function $(t, e) {
    return e.toUpperCase();
  }function V(t) {
    return t.replace(U, "ms-").replace(B, $);
  }var Q = function Q(t) {
    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
  };function K() {
    this.expando = b.expando + K.uid++;
  }K.uid = 1, K.prototype = { cache: function cache(t) {
      var e = t[this.expando];return e || (e = {}, Q(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, { value: e, configurable: !0 }))), e;
    }, set: function set(t, e, n) {
      var i,
          o = this.cache(t);if ("string" == typeof e) o[V(e)] = n;else for (i in e) {
        o[V(i)] = e[i];
      }return o;
    }, get: function get(t, e) {
      return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][V(e)];
    }, access: function access(t, e, n) {
      return void 0 === e || e && "string" == typeof e && void 0 === n ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e);
    }, remove: function remove(t, e) {
      var n,
          i = t[this.expando];if (void 0 !== i) {
        if (void 0 !== e) {
          n = (e = Array.isArray(e) ? e.map(V) : (e = V(e)) in i ? [e] : e.match(j) || []).length;for (; n--;) {
            delete i[e[n]];
          }
        }(void 0 === e || b.isEmptyObject(i)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando]);
      }
    }, hasData: function hasData(t) {
      var e = t[this.expando];return void 0 !== e && !b.isEmptyObject(e);
    } };var X = new K(),
      Y = new K(),
      G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      J = /[A-Z]/g;function Z(t, e, n) {
    var i;if (void 0 === n && 1 === t.nodeType) if (i = "data-" + e.replace(J, "-$&").toLowerCase(), "string" == typeof (n = t.getAttribute(i))) {
      try {
        n = function (t) {
          return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : G.test(t) ? JSON.parse(t) : t);
        }(n);
      } catch (t) {}Y.set(t, e, n);
    } else n = void 0;return n;
  }b.extend({ hasData: function hasData(t) {
      return Y.hasData(t) || X.hasData(t);
    }, data: function data(t, e, n) {
      return Y.access(t, e, n);
    }, removeData: function removeData(t, e) {
      Y.remove(t, e);
    }, _data: function _data(t, e, n) {
      return X.access(t, e, n);
    }, _removeData: function _removeData(t, e) {
      X.remove(t, e);
    } }), b.fn.extend({ data: function data(t, e) {
      var n,
          i,
          o,
          r = this[0],
          s = r && r.attributes;if (void 0 === t) {
        if (this.length && (o = Y.get(r), 1 === r.nodeType && !X.get(r, "hasDataAttrs"))) {
          for (n = s.length; n--;) {
            s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = V(i.slice(5)), Z(r, i, o[i]));
          }X.set(r, "hasDataAttrs", !0);
        }return o;
      }return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? this.each(function () {
        Y.set(this, t);
      }) : W(this, function (e) {
        var n;if (r && void 0 === e) return void 0 !== (n = Y.get(r, t)) ? n : void 0 !== (n = Z(r, t)) ? n : void 0;this.each(function () {
          Y.set(this, t, e);
        });
      }, null, e, arguments.length > 1, null, !0);
    }, removeData: function removeData(t) {
      return this.each(function () {
        Y.remove(this, t);
      });
    } }), b.extend({ queue: function queue(t, e, n) {
      var i;if (t) return e = (e || "fx") + "queue", i = X.get(t, e), n && (!i || Array.isArray(n) ? i = X.access(t, e, b.makeArray(n)) : i.push(n)), i || [];
    }, dequeue: function dequeue(t, e) {
      e = e || "fx";var n = b.queue(t, e),
          i = n.length,
          o = n.shift(),
          r = b._queueHooks(t, e);"inprogress" === o && (o = n.shift(), i--), o && ("fx" === e && n.unshift("inprogress"), delete r.stop, o.call(t, function () {
        b.dequeue(t, e);
      }, r)), !i && r && r.empty.fire();
    }, _queueHooks: function _queueHooks(t, e) {
      var n = e + "queueHooks";return X.get(t, n) || X.access(t, n, { empty: b.Callbacks("once memory").add(function () {
          X.remove(t, [e + "queue", n]);
        }) });
    } }), b.fn.extend({ queue: function queue(t, e) {
      var n = 2;return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? b.queue(this[0], t) : void 0 === e ? this : this.each(function () {
        var n = b.queue(this, t, e);b._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && b.dequeue(this, t);
      });
    }, dequeue: function dequeue(t) {
      return this.each(function () {
        b.dequeue(this, t);
      });
    }, clearQueue: function clearQueue(t) {
      return this.queue(t || "fx", []);
    }, promise: function promise(t, e) {
      var n,
          i = 1,
          o = b.Deferred(),
          r = this,
          s = this.length,
          a = function a() {
        --i || o.resolveWith(r, [r]);
      };for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;) {
        (n = X.get(r[s], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
      }return a(), o.promise(e);
    } });var tt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      et = new RegExp("^(?:([+-])=|)(" + tt + ")([a-z%]*)$", "i"),
      nt = ["Top", "Right", "Bottom", "Left"],
      it = i.documentElement,
      ot = function ot(t) {
    return b.contains(t.ownerDocument, t);
  },
      rt = { composed: !0 };it.getRootNode && (ot = function ot(t) {
    return b.contains(t.ownerDocument, t) || t.getRootNode(rt) === t.ownerDocument;
  });var st = function st(t, e) {
    return "none" === (t = e || t).style.display || "" === t.style.display && ot(t) && "none" === b.css(t, "display");
  },
      at = function at(t, e, n, i) {
    var o,
        r,
        s = {};for (r in e) {
      s[r] = t.style[r], t.style[r] = e[r];
    }for (r in o = n.apply(t, i || []), e) {
      t.style[r] = s[r];
    }return o;
  };function lt(t, e, n, i) {
    var o,
        r,
        s = 20,
        a = i ? function () {
      return i.cur();
    } : function () {
      return b.css(t, e, "");
    },
        l = a(),
        c = n && n[3] || (b.cssNumber[e] ? "" : "px"),
        u = t.nodeType && (b.cssNumber[e] || "px" !== c && +l) && et.exec(b.css(t, e));if (u && u[3] !== c) {
      for (l /= 2, c = c || u[3], u = +l || 1; s--;) {
        b.style(t, e, u + c), (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0), u /= r;
      }u *= 2, b.style(t, e, u + c), n = n || [];
    }return n && (u = +u || +l || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = o)), o;
  }var ct = {};function ut(t) {
    var e,
        n = t.ownerDocument,
        i = t.nodeName,
        o = ct[i];return o || (e = n.body.appendChild(n.createElement(i)), o = b.css(e, "display"), e.parentNode.removeChild(e), "none" === o && (o = "block"), ct[i] = o, o);
  }function ht(t, e) {
    for (var n, i, o = [], r = 0, s = t.length; r < s; r++) {
      (i = t[r]).style && (n = i.style.display, e ? ("none" === n && (o[r] = X.get(i, "display") || null, o[r] || (i.style.display = "")), "" === i.style.display && st(i) && (o[r] = ut(i))) : "none" !== n && (o[r] = "none", X.set(i, "display", n)));
    }for (r = 0; r < s; r++) {
      null != o[r] && (t[r].style.display = o[r]);
    }return t;
  }b.fn.extend({ show: function show() {
      return ht(this, !0);
    }, hide: function hide() {
      return ht(this);
    }, toggle: function toggle(t) {
      return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
        st(this) ? b(this).show() : b(this).hide();
      });
    } });var dt = /^(?:checkbox|radio)$/i,
      ft = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      pt = /^$|^module$|\/(?:java|ecma)script/i,
      gt = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };function mt(t, e) {
    var n;return n = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && D(t, e) ? b.merge([t], n) : n;
  }function vt(t, e) {
    for (var n = 0, i = t.length; n < i; n++) {
      X.set(t[n], "globalEval", !e || X.get(e[n], "globalEval"));
    }
  }gt.optgroup = gt.option, gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead, gt.th = gt.td;var yt,
      _t,
      bt = /<|&#?\w+;/;function Et(t, e, n, i, o) {
    for (var r, s, a, l, c, u, h = e.createDocumentFragment(), d = [], f = 0, p = t.length; f < p; f++) {
      if ((r = t[f]) || 0 === r) if ("object" === _(r)) b.merge(d, r.nodeType ? [r] : r);else if (bt.test(r)) {
        for (s = s || h.appendChild(e.createElement("div")), a = (ft.exec(r) || ["", ""])[1].toLowerCase(), l = gt[a] || gt._default, s.innerHTML = l[1] + b.htmlPrefilter(r) + l[2], u = l[0]; u--;) {
          s = s.lastChild;
        }b.merge(d, s.childNodes), (s = h.firstChild).textContent = "";
      } else d.push(e.createTextNode(r));
    }for (h.textContent = "", f = 0; r = d[f++];) {
      if (i && b.inArray(r, i) > -1) o && o.push(r);else if (c = ot(r), s = mt(h.appendChild(r), "script"), c && vt(s), n) for (u = 0; r = s[u++];) {
        pt.test(r.type || "") && n.push(r);
      }
    }return h;
  }yt = i.createDocumentFragment().appendChild(i.createElement("div")), (_t = i.createElement("input")).setAttribute("type", "radio"), _t.setAttribute("checked", "checked"), _t.setAttribute("name", "t"), yt.appendChild(_t), p.checkClone = yt.cloneNode(!0).cloneNode(!0).lastChild.checked, yt.innerHTML = "<textarea>x</textarea>", p.noCloneChecked = !!yt.cloneNode(!0).lastChild.defaultValue;var wt = /^key/,
      Ct = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      xt = /^([^.]*)(?:\.(.+)|)/;function St() {
    return !0;
  }function Tt() {
    return !1;
  }function Dt(t, e) {
    return t === function () {
      try {
        return i.activeElement;
      } catch (t) {}
    }() == ("focus" === e);
  }function kt(t, e, n, i, o, r) {
    var s, a;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
      for (a in "string" != typeof n && (i = i || n, n = void 0), e) {
        kt(t, a, n, i, e[a], r);
      }return t;
    }if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = Tt;else if (!o) return t;return 1 === r && (s = o, (o = function o(t) {
      return b().off(t), s.apply(this, arguments);
    }).guid = s.guid || (s.guid = b.guid++)), t.each(function () {
      b.event.add(this, e, o, i, n);
    });
  }function At(t, e, n) {
    n ? (X.set(t, e, !1), b.event.add(t, e, { namespace: !1, handler: function handler(t) {
        var i,
            o,
            s = X.get(this, e);if (1 & t.isTrigger && this[e]) {
          if (s.length) (b.event.special[e] || {}).delegateType && t.stopPropagation();else if (s = r.call(arguments), X.set(this, e, s), i = n(this, e), this[e](), s !== (o = X.get(this, e)) || i ? X.set(this, e, !1) : o = {}, s !== o) return t.stopImmediatePropagation(), t.preventDefault(), o.value;
        } else s.length && (X.set(this, e, { value: b.event.trigger(b.extend(s[0], b.Event.prototype), s.slice(1), this) }), t.stopImmediatePropagation());
      } })) : void 0 === X.get(t, e) && b.event.add(t, e, St);
  }b.event = { global: {}, add: function add(t, e, n, i, o) {
      var r,
          s,
          a,
          l,
          c,
          u,
          h,
          d,
          f,
          p,
          g,
          m = X.get(t);if (m) for (n.handler && (n = (r = n).handler, o = r.selector), o && b.find.matchesSelector(it, o), n.guid || (n.guid = b.guid++), (l = m.events) || (l = m.events = {}), (s = m.handle) || (s = m.handle = function (e) {
        return void 0 !== b && b.event.triggered !== e.type ? b.event.dispatch.apply(t, arguments) : void 0;
      }), c = (e = (e || "").match(j) || [""]).length; c--;) {
        f = g = (a = xt.exec(e[c]) || [])[1], p = (a[2] || "").split(".").sort(), f && (h = b.event.special[f] || {}, f = (o ? h.delegateType : h.bindType) || f, h = b.event.special[f] || {}, u = b.extend({ type: f, origType: g, data: i, handler: n, guid: n.guid, selector: o, needsContext: o && b.expr.match.needsContext.test(o), namespace: p.join(".") }, r), (d = l[f]) || ((d = l[f] = []).delegateCount = 0, h.setup && !1 !== h.setup.call(t, i, p, s) || t.addEventListener && t.addEventListener(f, s)), h.add && (h.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)), o ? d.splice(d.delegateCount++, 0, u) : d.push(u), b.event.global[f] = !0);
      }
    }, remove: function remove(t, e, n, i, o) {
      var r,
          s,
          a,
          l,
          c,
          u,
          h,
          d,
          f,
          p,
          g,
          m = X.hasData(t) && X.get(t);if (m && (l = m.events)) {
        for (c = (e = (e || "").match(j) || [""]).length; c--;) {
          if (f = g = (a = xt.exec(e[c]) || [])[1], p = (a[2] || "").split(".").sort(), f) {
            for (h = b.event.special[f] || {}, d = l[f = (i ? h.delegateType : h.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = d.length; r--;) {
              u = d[r], !o && g !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (d.splice(r, 1), u.selector && d.delegateCount--, h.remove && h.remove.call(t, u));
            }s && !d.length && (h.teardown && !1 !== h.teardown.call(t, p, m.handle) || b.removeEvent(t, f, m.handle), delete l[f]);
          } else for (f in l) {
            b.event.remove(t, f + e[c], n, i, !0);
          }
        }b.isEmptyObject(l) && X.remove(t, "handle events");
      }
    }, dispatch: function dispatch(t) {
      var e,
          n,
          i,
          o,
          r,
          s,
          a = b.event.fix(t),
          l = new Array(arguments.length),
          c = (X.get(this, "events") || {})[a.type] || [],
          u = b.event.special[a.type] || {};for (l[0] = a, e = 1; e < arguments.length; e++) {
        l[e] = arguments[e];
      }if (a.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
        for (s = b.event.handlers.call(this, a, c), e = 0; (o = s[e++]) && !a.isPropagationStopped();) {
          for (a.currentTarget = o.elem, n = 0; (r = o.handlers[n++]) && !a.isImmediatePropagationStopped();) {
            a.rnamespace && !1 !== r.namespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r, a.data = r.data, void 0 !== (i = ((b.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = i) && (a.preventDefault(), a.stopPropagation()));
          }
        }return u.postDispatch && u.postDispatch.call(this, a), a.result;
      }
    }, handlers: function handlers(t, e) {
      var n,
          i,
          o,
          r,
          s,
          a = [],
          l = e.delegateCount,
          c = t.target;if (l && c.nodeType && !("click" === t.type && t.button >= 1)) for (; c !== this; c = c.parentNode || this) {
        if (1 === c.nodeType && ("click" !== t.type || !0 !== c.disabled)) {
          for (r = [], s = {}, n = 0; n < l; n++) {
            void 0 === s[o = (i = e[n]).selector + " "] && (s[o] = i.needsContext ? b(o, this).index(c) > -1 : b.find(o, this, null, [c]).length), s[o] && r.push(i);
          }r.length && a.push({ elem: c, handlers: r });
        }
      }return c = this, l < e.length && a.push({ elem: c, handlers: e.slice(l) }), a;
    }, addProp: function addProp(t, e) {
      Object.defineProperty(b.Event.prototype, t, { enumerable: !0, configurable: !0, get: g(e) ? function () {
          if (this.originalEvent) return e(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[t];
        }, set: function set(e) {
          Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e });
        } });
    }, fix: function fix(t) {
      return t[b.expando] ? t : new b.Event(t);
    }, special: { load: { noBubble: !0 }, click: { setup: function setup(t) {
          var e = this || t;return dt.test(e.type) && e.click && D(e, "input") && At(e, "click", St), !1;
        }, trigger: function trigger(t) {
          var e = this || t;return dt.test(e.type) && e.click && D(e, "input") && At(e, "click"), !0;
        }, _default: function _default(t) {
          var e = t.target;return dt.test(e.type) && e.click && D(e, "input") && X.get(e, "click") || D(e, "a");
        } }, beforeunload: { postDispatch: function postDispatch(t) {
          void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
        } } } }, b.removeEvent = function (t, e, n) {
    t.removeEventListener && t.removeEventListener(e, n);
  }, b.Event = function (t, e) {
    if (!(this instanceof b.Event)) return new b.Event(t, e);t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? St : Tt, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && b.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[b.expando] = !0;
  }, b.Event.prototype = { constructor: b.Event, isDefaultPrevented: Tt, isPropagationStopped: Tt, isImmediatePropagationStopped: Tt, isSimulated: !1, preventDefault: function preventDefault() {
      var t = this.originalEvent;this.isDefaultPrevented = St, t && !this.isSimulated && t.preventDefault();
    }, stopPropagation: function stopPropagation() {
      var t = this.originalEvent;this.isPropagationStopped = St, t && !this.isSimulated && t.stopPropagation();
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      var t = this.originalEvent;this.isImmediatePropagationStopped = St, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation();
    } }, b.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, char: !0, code: !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(t) {
      var e = t.button;return null == t.which && wt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && Ct.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which;
    } }, b.event.addProp), b.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
    b.event.special[t] = { setup: function setup() {
        return At(this, t, Dt), !1;
      }, trigger: function trigger() {
        return At(this, t), !0;
      }, delegateType: e };
  }), b.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (t, e) {
    b.event.special[t] = { delegateType: e, bindType: e, handle: function handle(t) {
        var n,
            i = t.relatedTarget,
            o = t.handleObj;return i && (i === this || b.contains(this, i)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n;
      } };
  }), b.fn.extend({ on: function on(t, e, n, i) {
      return kt(this, t, e, n, i);
    }, one: function one(t, e, n, i) {
      return kt(this, t, e, n, i, 1);
    }, off: function off(t, e, n) {
      var i, o;if (t && t.preventDefault && t.handleObj) return i = t.handleObj, b(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
        for (o in t) {
          this.off(o, e, t[o]);
        }return this;
      }return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = Tt), this.each(function () {
        b.event.remove(this, t, n, e);
      });
    } });var It = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Nt = /<script|<style|<link/i,
      Lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ot = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Pt(t, e) {
    return D(t, "table") && D(11 !== e.nodeType ? e : e.firstChild, "tr") && b(t).children("tbody")[0] || t;
  }function jt(t) {
    return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t;
  }function Rt(t) {
    return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t;
  }function qt(t, e) {
    var n, i, o, r, s, a, l, c;if (1 === e.nodeType) {
      if (X.hasData(t) && (r = X.access(t), s = X.set(e, r), c = r.events)) for (o in delete s.handle, s.events = {}, c) {
        for (n = 0, i = c[o].length; n < i; n++) {
          b.event.add(e, o, c[o][n]);
        }
      }Y.hasData(t) && (a = Y.access(t), l = b.extend({}, a), Y.set(e, l));
    }
  }function Mt(t, e, n, i) {
    e = s.apply([], e);var o,
        r,
        a,
        l,
        c,
        u,
        h = 0,
        d = t.length,
        f = d - 1,
        m = e[0],
        v = g(m);if (v || d > 1 && "string" == typeof m && !p.checkClone && Lt.test(m)) return t.each(function (o) {
      var r = t.eq(o);v && (e[0] = m.call(this, o, r.html())), Mt(r, e, n, i);
    });if (d && (r = (o = Et(e, t[0].ownerDocument, !1, t, i)).firstChild, 1 === o.childNodes.length && (o = r), r || i)) {
      for (l = (a = b.map(mt(o, "script"), jt)).length; h < d; h++) {
        c = o, h !== f && (c = b.clone(c, !0, !0), l && b.merge(a, mt(c, "script"))), n.call(t[h], c, h);
      }if (l) for (u = a[a.length - 1].ownerDocument, b.map(a, Rt), h = 0; h < l; h++) {
        c = a[h], pt.test(c.type || "") && !X.access(c, "globalEval") && b.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? b._evalUrl && !c.noModule && b._evalUrl(c.src, { nonce: c.nonce || c.getAttribute("nonce") }) : y(c.textContent.replace(Ot, ""), c, u));
      }
    }return t;
  }function Ht(t, e, n) {
    for (var i, o = e ? b.filter(e, t) : t, r = 0; null != (i = o[r]); r++) {
      n || 1 !== i.nodeType || b.cleanData(mt(i)), i.parentNode && (n && ot(i) && vt(mt(i, "script")), i.parentNode.removeChild(i));
    }return t;
  }b.extend({ htmlPrefilter: function htmlPrefilter(t) {
      return t.replace(It, "<$1></$2>");
    }, clone: function clone(t, e, n) {
      var i,
          o,
          r,
          s,
          a,
          l,
          c,
          u = t.cloneNode(!0),
          h = ot(t);if (!(p.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || b.isXMLDoc(t))) for (s = mt(u), i = 0, o = (r = mt(t)).length; i < o; i++) {
        a = r[i], l = s[i], void 0, "input" === (c = l.nodeName.toLowerCase()) && dt.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
      }if (e) if (n) for (r = r || mt(t), s = s || mt(u), i = 0, o = r.length; i < o; i++) {
        qt(r[i], s[i]);
      } else qt(t, u);return (s = mt(u, "script")).length > 0 && vt(s, !h && mt(t, "script")), u;
    }, cleanData: function cleanData(t) {
      for (var e, n, i, o = b.event.special, r = 0; void 0 !== (n = t[r]); r++) {
        if (Q(n)) {
          if (e = n[X.expando]) {
            if (e.events) for (i in e.events) {
              o[i] ? b.event.remove(n, i) : b.removeEvent(n, i, e.handle);
            }n[X.expando] = void 0;
          }n[Y.expando] && (n[Y.expando] = void 0);
        }
      }
    } }), b.fn.extend({ detach: function detach(t) {
      return Ht(this, t, !0);
    }, remove: function remove(t) {
      return Ht(this, t);
    }, text: function text(t) {
      return W(this, function (t) {
        return void 0 === t ? b.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t);
        });
      }, null, t, arguments.length);
    }, append: function append() {
      return Mt(this, arguments, function (t) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Pt(this, t).appendChild(t);
      });
    }, prepend: function prepend() {
      return Mt(this, arguments, function (t) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var e = Pt(this, t);e.insertBefore(t, e.firstChild);
        }
      });
    }, before: function before() {
      return Mt(this, arguments, function (t) {
        this.parentNode && this.parentNode.insertBefore(t, this);
      });
    }, after: function after() {
      return Mt(this, arguments, function (t) {
        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
      });
    }, empty: function empty() {
      for (var t, e = 0; null != (t = this[e]); e++) {
        1 === t.nodeType && (b.cleanData(mt(t, !1)), t.textContent = "");
      }return this;
    }, clone: function clone(t, e) {
      return t = null != t && t, e = null == e ? t : e, this.map(function () {
        return b.clone(this, t, e);
      });
    }, html: function html(t) {
      return W(this, function (t) {
        var e = this[0] || {},
            n = 0,
            i = this.length;if (void 0 === t && 1 === e.nodeType) return e.innerHTML;if ("string" == typeof t && !Nt.test(t) && !gt[(ft.exec(t) || ["", ""])[1].toLowerCase()]) {
          t = b.htmlPrefilter(t);try {
            for (; n < i; n++) {
              1 === (e = this[n] || {}).nodeType && (b.cleanData(mt(e, !1)), e.innerHTML = t);
            }e = 0;
          } catch (t) {}
        }e && this.empty().append(t);
      }, null, t, arguments.length);
    }, replaceWith: function replaceWith() {
      var t = [];return Mt(this, arguments, function (e) {
        var n = this.parentNode;b.inArray(this, t) < 0 && (b.cleanData(mt(this)), n && n.replaceChild(e, this));
      }, t);
    } }), b.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (t, e) {
    b.fn[t] = function (t) {
      for (var n, i = [], o = b(t), r = o.length - 1, s = 0; s <= r; s++) {
        n = s === r ? this : this.clone(!0), b(o[s])[e](n), a.apply(i, n.get());
      }return this.pushStack(i);
    };
  });var Ft = new RegExp("^(" + tt + ")(?!px)[a-z%]+$", "i"),
      zt = function zt(e) {
    var n = e.ownerDocument.defaultView;return n && n.opener || (n = t), n.getComputedStyle(e);
  },
      Wt = new RegExp(nt.join("|"), "i");function Ut(t, e, n) {
    var i,
        o,
        r,
        s,
        a = t.style;return (n = n || zt(t)) && ("" !== (s = n.getPropertyValue(e) || n[e]) || ot(t) || (s = b.style(t, e)), !p.pixelBoxStyles() && Ft.test(s) && Wt.test(e) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s;
  }function Bt(t, e) {
    return { get: function get() {
        if (!t()) return (this.get = e).apply(this, arguments);delete this.get;
      } };
  }!function () {
    function e() {
      if (u) {
        c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", it.appendChild(c).appendChild(u);var e = t.getComputedStyle(u);o = "1%" !== e.top, l = 12 === n(e.marginLeft), u.style.right = "60%", a = 36 === n(e.right), r = 36 === n(e.width), u.style.position = "absolute", s = 12 === n(u.offsetWidth / 3), it.removeChild(c), u = null;
      }
    }function n(t) {
      return Math.round(parseFloat(t));
    }var o,
        r,
        s,
        a,
        l,
        c = i.createElement("div"),
        u = i.createElement("div");u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", p.clearCloneStyle = "content-box" === u.style.backgroundClip, b.extend(p, { boxSizingReliable: function boxSizingReliable() {
        return e(), r;
      }, pixelBoxStyles: function pixelBoxStyles() {
        return e(), a;
      }, pixelPosition: function pixelPosition() {
        return e(), o;
      }, reliableMarginLeft: function reliableMarginLeft() {
        return e(), l;
      }, scrollboxSize: function scrollboxSize() {
        return e(), s;
      } }));
  }();var $t = ["Webkit", "Moz", "ms"],
      Vt = i.createElement("div").style,
      Qt = {};function Kt(t) {
    var e = b.cssProps[t] || Qt[t];return e || (t in Vt ? t : Qt[t] = function (t) {
      for (var e = t[0].toUpperCase() + t.slice(1), n = $t.length; n--;) {
        if ((t = $t[n] + e) in Vt) return t;
      }
    }(t) || t);
  }var Xt = /^(none|table(?!-c[ea]).+)/,
      Yt = /^--/,
      Gt = { position: "absolute", visibility: "hidden", display: "block" },
      Jt = { letterSpacing: "0", fontWeight: "400" };function Zt(t, e, n) {
    var i = et.exec(e);return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e;
  }function te(t, e, n, i, o, r) {
    var s = "width" === e ? 1 : 0,
        a = 0,
        l = 0;if (n === (i ? "border" : "content")) return 0;for (; s < 4; s += 2) {
      "margin" === n && (l += b.css(t, n + nt[s], !0, o)), i ? ("content" === n && (l -= b.css(t, "padding" + nt[s], !0, o)), "margin" !== n && (l -= b.css(t, "border" + nt[s] + "Width", !0, o))) : (l += b.css(t, "padding" + nt[s], !0, o), "padding" !== n ? l += b.css(t, "border" + nt[s] + "Width", !0, o) : a += b.css(t, "border" + nt[s] + "Width", !0, o));
    }return !i && r >= 0 && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - r - l - a - .5)) || 0), l;
  }function ee(t, e, n) {
    var i = zt(t),
        o = (!p.boxSizingReliable() || n) && "border-box" === b.css(t, "boxSizing", !1, i),
        r = o,
        s = Ut(t, e, i),
        a = "offset" + e[0].toUpperCase() + e.slice(1);if (Ft.test(s)) {
      if (!n) return s;s = "auto";
    }return (!p.boxSizingReliable() && o || "auto" === s || !parseFloat(s) && "inline" === b.css(t, "display", !1, i)) && t.getClientRects().length && (o = "border-box" === b.css(t, "boxSizing", !1, i), (r = a in t) && (s = t[a])), (s = parseFloat(s) || 0) + te(t, e, n || (o ? "border" : "content"), r, i, s) + "px";
  }function ne(t, e, n, i, o) {
    return new ne.prototype.init(t, e, n, i, o);
  }b.extend({ cssHooks: { opacity: { get: function get(t, e) {
          if (e) {
            var n = Ut(t, "opacity");return "" === n ? "1" : n;
          }
        } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, gridArea: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnStart: !0, gridRow: !0, gridRowEnd: !0, gridRowStart: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function style(t, e, n, i) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var o,
            r,
            s,
            a = V(e),
            l = Yt.test(e),
            c = t.style;if (l || (e = Kt(a)), s = b.cssHooks[e] || b.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(t, !1, i)) ? o : c[e];"string" === (r = typeof n === "undefined" ? "undefined" : _typeof(n)) && (o = et.exec(n)) && o[1] && (n = lt(t, e, o), r = "number"), null != n && n == n && ("number" !== r || l || (n += o && o[3] || (b.cssNumber[a] ? "" : "px")), p.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (c[e] = "inherit"), s && "set" in s && void 0 === (n = s.set(t, n, i)) || (l ? c.setProperty(e, n) : c[e] = n));
      }
    }, css: function css(t, e, n, i) {
      var o,
          r,
          s,
          a = V(e);return Yt.test(e) || (e = Kt(a)), (s = b.cssHooks[e] || b.cssHooks[a]) && "get" in s && (o = s.get(t, !0, n)), void 0 === o && (o = Ut(t, e, i)), "normal" === o && e in Jt && (o = Jt[e]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o;
    } }), b.each(["height", "width"], function (t, e) {
    b.cssHooks[e] = { get: function get(t, n, i) {
        if (n) return !Xt.test(b.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? ee(t, e, i) : at(t, Gt, function () {
          return ee(t, e, i);
        });
      }, set: function set(t, n, i) {
        var o,
            r = zt(t),
            s = !p.scrollboxSize() && "absolute" === r.position,
            a = (s || i) && "border-box" === b.css(t, "boxSizing", !1, r),
            l = i ? te(t, e, i, a, r) : 0;return a && s && (l -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(r[e]) - te(t, e, "border", !1, r) - .5)), l && (o = et.exec(n)) && "px" !== (o[3] || "px") && (t.style[e] = n, n = b.css(t, e)), Zt(0, n, l);
      } };
  }), b.cssHooks.marginLeft = Bt(p.reliableMarginLeft, function (t, e) {
    if (e) return (parseFloat(Ut(t, "marginLeft")) || t.getBoundingClientRect().left - at(t, { marginLeft: 0 }, function () {
      return t.getBoundingClientRect().left;
    })) + "px";
  }), b.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
    b.cssHooks[t + e] = { expand: function expand(n) {
        for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) {
          o[t + nt[i] + e] = r[i] || r[i - 2] || r[0];
        }return o;
      } }, "margin" !== t && (b.cssHooks[t + e].set = Zt);
  }), b.fn.extend({ css: function css(t, e) {
      return W(this, function (t, e, n) {
        var i,
            o,
            r = {},
            s = 0;if (Array.isArray(e)) {
          for (i = zt(t), o = e.length; s < o; s++) {
            r[e[s]] = b.css(t, e[s], !1, i);
          }return r;
        }return void 0 !== n ? b.style(t, e, n) : b.css(t, e);
      }, t, e, arguments.length > 1);
    } }), b.Tween = ne, ne.prototype = { constructor: ne, init: function init(t, e, n, i, o, r) {
      this.elem = t, this.prop = n, this.easing = o || b.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = r || (b.cssNumber[n] ? "" : "px");
    }, cur: function cur() {
      var t = ne.propHooks[this.prop];return t && t.get ? t.get(this) : ne.propHooks._default.get(this);
    }, run: function run(t) {
      var e,
          n = ne.propHooks[this.prop];return this.options.duration ? this.pos = e = b.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : ne.propHooks._default.set(this), this;
    } }, ne.prototype.init.prototype = ne.prototype, ne.propHooks = { _default: { get: function get(t) {
        var e;return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = b.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0;
      }, set: function set(t) {
        b.fx.step[t.prop] ? b.fx.step[t.prop](t) : 1 !== t.elem.nodeType || !b.cssHooks[t.prop] && null == t.elem.style[Kt(t.prop)] ? t.elem[t.prop] = t.now : b.style(t.elem, t.prop, t.now + t.unit);
      } } }, ne.propHooks.scrollTop = ne.propHooks.scrollLeft = { set: function set(t) {
      t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
    } }, b.easing = { linear: function linear(t) {
      return t;
    }, swing: function swing(t) {
      return .5 - Math.cos(t * Math.PI) / 2;
    }, _default: "swing" }, b.fx = ne.prototype.init, b.fx.step = {};var ie,
      oe,
      re = /^(?:toggle|show|hide)$/,
      se = /queueHooks$/;function ae() {
    oe && (!1 === i.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(ae) : t.setTimeout(ae, b.fx.interval), b.fx.tick());
  }function le() {
    return t.setTimeout(function () {
      ie = void 0;
    }), ie = Date.now();
  }function ce(t, e) {
    var n,
        i = 0,
        o = { height: t };for (e = e ? 1 : 0; i < 4; i += 2 - e) {
      o["margin" + (n = nt[i])] = o["padding" + n] = t;
    }return e && (o.opacity = o.width = t), o;
  }function ue(t, e, n) {
    for (var i, o = (he.tweeners[e] || []).concat(he.tweeners["*"]), r = 0, s = o.length; r < s; r++) {
      if (i = o[r].call(n, e, t)) return i;
    }
  }function he(t, e, n) {
    var i,
        o,
        r = 0,
        s = he.prefilters.length,
        a = b.Deferred().always(function () {
      delete l.elem;
    }),
        l = function l() {
      if (o) return !1;for (var e = ie || le(), n = Math.max(0, c.startTime + c.duration - e), i = 1 - (n / c.duration || 0), r = 0, s = c.tweens.length; r < s; r++) {
        c.tweens[r].run(i);
      }return a.notifyWith(t, [c, i, n]), i < 1 && s ? n : (s || a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c]), !1);
    },
        c = a.promise({ elem: t, props: b.extend({}, e), opts: b.extend(!0, { specialEasing: {}, easing: b.easing._default }, n), originalProperties: e, originalOptions: n, startTime: ie || le(), duration: n.duration, tweens: [], createTween: function createTween(e, n) {
        var i = b.Tween(t, c.opts, e, n, c.opts.specialEasing[e] || c.opts.easing);return c.tweens.push(i), i;
      }, stop: function stop(e) {
        var n = 0,
            i = e ? c.tweens.length : 0;if (o) return this;for (o = !0; n < i; n++) {
          c.tweens[n].run(1);
        }return e ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e])) : a.rejectWith(t, [c, e]), this;
      } }),
        u = c.props;for (!function (t, e) {
      var n, i, o, r, s;for (n in t) {
        if (o = e[i = V(n)], r = t[n], Array.isArray(r) && (o = r[1], r = t[n] = r[0]), n !== i && (t[i] = r, delete t[n]), (s = b.cssHooks[i]) && ("expand" in s)) for (n in r = s.expand(r), delete t[i], r) {
          (n in t) || (t[n] = r[n], e[n] = o);
        } else e[i] = o;
      }
    }(u, c.opts.specialEasing); r < s; r++) {
      if (i = he.prefilters[r].call(c, t, u, c.opts)) return g(i.stop) && (b._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
    }return b.map(u, ue, c), g(c.opts.start) && c.opts.start.call(t, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), b.fx.timer(b.extend(l, { elem: t, anim: c, queue: c.opts.queue })), c;
  }b.Animation = b.extend(he, { tweeners: { "*": [function (t, e) {
        var n = this.createTween(t, e);return lt(n.elem, t, et.exec(e), n), n;
      }] }, tweener: function tweener(t, e) {
      g(t) ? (e = t, t = ["*"]) : t = t.match(j);for (var n, i = 0, o = t.length; i < o; i++) {
        n = t[i], he.tweeners[n] = he.tweeners[n] || [], he.tweeners[n].unshift(e);
      }
    }, prefilters: [function (t, e, n) {
      var i,
          o,
          r,
          s,
          a,
          l,
          c,
          u,
          h = "width" in e || "height" in e,
          d = this,
          f = {},
          p = t.style,
          g = t.nodeType && st(t),
          m = X.get(t, "fxshow");for (i in n.queue || (null == (s = b._queueHooks(t, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function () {
        s.unqueued || a();
      }), s.unqueued++, d.always(function () {
        d.always(function () {
          s.unqueued--, b.queue(t, "fx").length || s.empty.fire();
        });
      })), e) {
        if (o = e[i], re.test(o)) {
          if (delete e[i], r = r || "toggle" === o, o === (g ? "hide" : "show")) {
            if ("show" !== o || !m || void 0 === m[i]) continue;g = !0;
          }f[i] = m && m[i] || b.style(t, i);
        }
      }if ((l = !b.isEmptyObject(e)) || !b.isEmptyObject(f)) for (i in h && 1 === t.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], null == (c = m && m.display) && (c = X.get(t, "display")), "none" === (u = b.css(t, "display")) && (c ? u = c : (ht([t], !0), c = t.style.display || c, u = b.css(t, "display"), ht([t]))), ("inline" === u || "inline-block" === u && null != c) && "none" === b.css(t, "float") && (l || (d.done(function () {
        p.display = c;
      }), null == c && (u = p.display, c = "none" === u ? "" : u)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", d.always(function () {
        p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
      })), l = !1, f) {
        l || (m ? "hidden" in m && (g = m.hidden) : m = X.access(t, "fxshow", { display: c }), r && (m.hidden = !g), g && ht([t], !0), d.done(function () {
          for (i in g || ht([t]), X.remove(t, "fxshow"), f) {
            b.style(t, i, f[i]);
          }
        })), l = ue(g ? m[i] : 0, i, d), i in m || (m[i] = l.start, g && (l.end = l.start, l.start = 0));
      }
    }], prefilter: function prefilter(t, e) {
      e ? he.prefilters.unshift(t) : he.prefilters.push(t);
    } }), b.speed = function (t, e, n) {
    var i = t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? b.extend({}, t) : { complete: n || !n && e || g(t) && t, duration: t, easing: n && e || e && !g(e) && e };return b.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in b.fx.speeds ? i.duration = b.fx.speeds[i.duration] : i.duration = b.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
      g(i.old) && i.old.call(this), i.queue && b.dequeue(this, i.queue);
    }, i;
  }, b.fn.extend({ fadeTo: function fadeTo(t, e, n, i) {
      return this.filter(st).css("opacity", 0).show().end().animate({ opacity: e }, t, n, i);
    }, animate: function animate(t, e, n, i) {
      var o = b.isEmptyObject(t),
          r = b.speed(e, n, i),
          s = function s() {
        var e = he(this, b.extend({}, t), r);(o || X.get(this, "finish")) && e.stop(!0);
      };return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s);
    }, stop: function stop(t, e, n) {
      var i = function i(t) {
        var e = t.stop;delete t.stop, e(n);
      };return "string" != typeof t && (n = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function () {
        var e = !0,
            o = null != t && t + "queueHooks",
            r = b.timers,
            s = X.get(this);if (o) s[o] && s[o].stop && i(s[o]);else for (o in s) {
          s[o] && s[o].stop && se.test(o) && i(s[o]);
        }for (o = r.length; o--;) {
          r[o].elem !== this || null != t && r[o].queue !== t || (r[o].anim.stop(n), e = !1, r.splice(o, 1));
        }!e && n || b.dequeue(this, t);
      });
    }, finish: function finish(t) {
      return !1 !== t && (t = t || "fx"), this.each(function () {
        var e,
            n = X.get(this),
            i = n[t + "queue"],
            o = n[t + "queueHooks"],
            r = b.timers,
            s = i ? i.length : 0;for (n.finish = !0, b.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = r.length; e--;) {
          r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1));
        }for (e = 0; e < s; e++) {
          i[e] && i[e].finish && i[e].finish.call(this);
        }delete n.finish;
      });
    } }), b.each(["toggle", "show", "hide"], function (t, e) {
    var n = b.fn[e];b.fn[e] = function (t, i, o) {
      return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(ce(e, !0), t, i, o);
    };
  }), b.each({ slideDown: ce("show"), slideUp: ce("hide"), slideToggle: ce("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (t, e) {
    b.fn[t] = function (t, n, i) {
      return this.animate(e, t, n, i);
    };
  }), b.timers = [], b.fx.tick = function () {
    var t,
        e = 0,
        n = b.timers;for (ie = Date.now(); e < n.length; e++) {
      (t = n[e])() || n[e] !== t || n.splice(e--, 1);
    }n.length || b.fx.stop(), ie = void 0;
  }, b.fx.timer = function (t) {
    b.timers.push(t), b.fx.start();
  }, b.fx.interval = 13, b.fx.start = function () {
    oe || (oe = !0, ae());
  }, b.fx.stop = function () {
    oe = null;
  }, b.fx.speeds = { slow: 600, fast: 200, _default: 400 }, b.fn.delay = function (e, n) {
    return e = b.fx && b.fx.speeds[e] || e, n = n || "fx", this.queue(n, function (n, i) {
      var o = t.setTimeout(n, e);i.stop = function () {
        t.clearTimeout(o);
      };
    });
  }, function () {
    var t = i.createElement("input"),
        e = i.createElement("select").appendChild(i.createElement("option"));t.type = "checkbox", p.checkOn = "" !== t.value, p.optSelected = e.selected, (t = i.createElement("input")).value = "t", t.type = "radio", p.radioValue = "t" === t.value;
  }();var de,
      fe = b.expr.attrHandle;b.fn.extend({ attr: function attr(t, e) {
      return W(this, b.attr, t, e, arguments.length > 1);
    }, removeAttr: function removeAttr(t) {
      return this.each(function () {
        b.removeAttr(this, t);
      });
    } }), b.extend({ attr: function attr(t, e, n) {
      var i,
          o,
          r = t.nodeType;if (3 !== r && 8 !== r && 2 !== r) return void 0 === t.getAttribute ? b.prop(t, e, n) : (1 === r && b.isXMLDoc(t) || (o = b.attrHooks[e.toLowerCase()] || (b.expr.match.bool.test(e) ? de : void 0)), void 0 !== n ? null === n ? void b.removeAttr(t, e) : o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : o && "get" in o && null !== (i = o.get(t, e)) ? i : null == (i = b.find.attr(t, e)) ? void 0 : i);
    }, attrHooks: { type: { set: function set(t, e) {
          if (!p.radioValue && "radio" === e && D(t, "input")) {
            var n = t.value;return t.setAttribute("type", e), n && (t.value = n), e;
          }
        } } }, removeAttr: function removeAttr(t, e) {
      var n,
          i = 0,
          o = e && e.match(j);if (o && 1 === t.nodeType) for (; n = o[i++];) {
        t.removeAttribute(n);
      }
    } }), de = { set: function set(t, e, n) {
      return !1 === e ? b.removeAttr(t, n) : t.setAttribute(n, n), n;
    } }, b.each(b.expr.match.bool.source.match(/\w+/g), function (t, e) {
    var n = fe[e] || b.find.attr;fe[e] = function (t, e, i) {
      var o,
          r,
          s = e.toLowerCase();return i || (r = fe[s], fe[s] = o, o = null != n(t, e, i) ? s : null, fe[s] = r), o;
    };
  });var pe = /^(?:input|select|textarea|button)$/i,
      ge = /^(?:a|area)$/i;function me(t) {
    return (t.match(j) || []).join(" ");
  }function ve(t) {
    return t.getAttribute && t.getAttribute("class") || "";
  }function ye(t) {
    return Array.isArray(t) ? t : "string" == typeof t && t.match(j) || [];
  }b.fn.extend({ prop: function prop(t, e) {
      return W(this, b.prop, t, e, arguments.length > 1);
    }, removeProp: function removeProp(t) {
      return this.each(function () {
        delete this[b.propFix[t] || t];
      });
    } }), b.extend({ prop: function prop(t, e, n) {
      var i,
          o,
          r = t.nodeType;if (3 !== r && 8 !== r && 2 !== r) return 1 === r && b.isXMLDoc(t) || (e = b.propFix[e] || e, o = b.propHooks[e]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : t[e] = n : o && "get" in o && null !== (i = o.get(t, e)) ? i : t[e];
    }, propHooks: { tabIndex: { get: function get(t) {
          var e = b.find.attr(t, "tabindex");return e ? parseInt(e, 10) : pe.test(t.nodeName) || ge.test(t.nodeName) && t.href ? 0 : -1;
        } } }, propFix: { for: "htmlFor", class: "className" } }), p.optSelected || (b.propHooks.selected = { get: function get(t) {
      var e = t.parentNode;return e && e.parentNode && e.parentNode.selectedIndex, null;
    }, set: function set(t) {
      var e = t.parentNode;e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
    } }), b.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    b.propFix[this.toLowerCase()] = this;
  }), b.fn.extend({ addClass: function addClass(t) {
      var e,
          n,
          i,
          o,
          r,
          s,
          a,
          l = 0;if (g(t)) return this.each(function (e) {
        b(this).addClass(t.call(this, e, ve(this)));
      });if ((e = ye(t)).length) for (; n = this[l++];) {
        if (o = ve(n), i = 1 === n.nodeType && " " + me(o) + " ") {
          for (s = 0; r = e[s++];) {
            i.indexOf(" " + r + " ") < 0 && (i += r + " ");
          }o !== (a = me(i)) && n.setAttribute("class", a);
        }
      }return this;
    }, removeClass: function removeClass(t) {
      var e,
          n,
          i,
          o,
          r,
          s,
          a,
          l = 0;if (g(t)) return this.each(function (e) {
        b(this).removeClass(t.call(this, e, ve(this)));
      });if (!arguments.length) return this.attr("class", "");if ((e = ye(t)).length) for (; n = this[l++];) {
        if (o = ve(n), i = 1 === n.nodeType && " " + me(o) + " ") {
          for (s = 0; r = e[s++];) {
            for (; i.indexOf(" " + r + " ") > -1;) {
              i = i.replace(" " + r + " ", " ");
            }
          }o !== (a = me(i)) && n.setAttribute("class", a);
        }
      }return this;
    }, toggleClass: function toggleClass(t, e) {
      var n = typeof t === "undefined" ? "undefined" : _typeof(t),
          i = "string" === n || Array.isArray(t);return "boolean" == typeof e && i ? e ? this.addClass(t) : this.removeClass(t) : g(t) ? this.each(function (n) {
        b(this).toggleClass(t.call(this, n, ve(this), e), e);
      }) : this.each(function () {
        var e, o, r, s;if (i) for (o = 0, r = b(this), s = ye(t); e = s[o++];) {
          r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
        } else void 0 !== t && "boolean" !== n || ((e = ve(this)) && X.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : X.get(this, "__className__") || ""));
      });
    }, hasClass: function hasClass(t) {
      var e,
          n,
          i = 0;for (e = " " + t + " "; n = this[i++];) {
        if (1 === n.nodeType && (" " + me(ve(n)) + " ").indexOf(e) > -1) return !0;
      }return !1;
    } });var _e = /\r/g;b.fn.extend({ val: function val(t) {
      var e,
          n,
          i,
          o = this[0];return arguments.length ? (i = g(t), this.each(function (n) {
        var o;1 === this.nodeType && (null == (o = i ? t.call(this, n, b(this).val()) : t) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = b.map(o, function (t) {
          return null == t ? "" : t + "";
        })), (e = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o));
      })) : o ? (e = b.valHooks[o.type] || b.valHooks[o.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(o, "value")) ? n : "string" == typeof (n = o.value) ? n.replace(_e, "") : null == n ? "" : n : void 0;
    } }), b.extend({ valHooks: { option: { get: function get(t) {
          var e = b.find.attr(t, "value");return null != e ? e : me(b.text(t));
        } }, select: { get: function get(t) {
          var e,
              n,
              i,
              o = t.options,
              r = t.selectedIndex,
              s = "select-one" === t.type,
              a = s ? null : [],
              l = s ? r + 1 : o.length;for (i = r < 0 ? l : s ? r : 0; i < l; i++) {
            if (((n = o[i]).selected || i === r) && !n.disabled && (!n.parentNode.disabled || !D(n.parentNode, "optgroup"))) {
              if (e = b(n).val(), s) return e;a.push(e);
            }
          }return a;
        }, set: function set(t, e) {
          for (var n, i, o = t.options, r = b.makeArray(e), s = o.length; s--;) {
            ((i = o[s]).selected = b.inArray(b.valHooks.option.get(i), r) > -1) && (n = !0);
          }return n || (t.selectedIndex = -1), r;
        } } } }), b.each(["radio", "checkbox"], function () {
    b.valHooks[this] = { set: function set(t, e) {
        if (Array.isArray(e)) return t.checked = b.inArray(b(t).val(), e) > -1;
      } }, p.checkOn || (b.valHooks[this].get = function (t) {
      return null === t.getAttribute("value") ? "on" : t.value;
    });
  }), p.focusin = "onfocusin" in t;var be = /^(?:focusinfocus|focusoutblur)$/,
      Ee = function Ee(t) {
    t.stopPropagation();
  };b.extend(b.event, { trigger: function trigger(e, n, o, r) {
      var s,
          a,
          l,
          c,
          u,
          d,
          f,
          p,
          v = [o || i],
          y = h.call(e, "type") ? e.type : e,
          _ = h.call(e, "namespace") ? e.namespace.split(".") : [];if (a = p = l = o = o || i, 3 !== o.nodeType && 8 !== o.nodeType && !be.test(y + b.event.triggered) && (y.indexOf(".") > -1 && (y = (_ = y.split(".")).shift(), _.sort()), u = y.indexOf(":") < 0 && "on" + y, (e = e[b.expando] ? e : new b.Event(y, "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e)).isTrigger = r ? 2 : 3, e.namespace = _.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + _.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = o), n = null == n ? [e] : b.makeArray(n, [e]), f = b.event.special[y] || {}, r || !f.trigger || !1 !== f.trigger.apply(o, n))) {
        if (!r && !f.noBubble && !m(o)) {
          for (c = f.delegateType || y, be.test(c + y) || (a = a.parentNode); a; a = a.parentNode) {
            v.push(a), l = a;
          }l === (o.ownerDocument || i) && v.push(l.defaultView || l.parentWindow || t);
        }for (s = 0; (a = v[s++]) && !e.isPropagationStopped();) {
          p = a, e.type = s > 1 ? c : f.bindType || y, (d = (X.get(a, "events") || {})[e.type] && X.get(a, "handle")) && d.apply(a, n), (d = u && a[u]) && d.apply && Q(a) && (e.result = d.apply(a, n), !1 === e.result && e.preventDefault());
        }return e.type = y, r || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(v.pop(), n) || !Q(o) || u && g(o[y]) && !m(o) && ((l = o[u]) && (o[u] = null), b.event.triggered = y, e.isPropagationStopped() && p.addEventListener(y, Ee), o[y](), e.isPropagationStopped() && p.removeEventListener(y, Ee), b.event.triggered = void 0, l && (o[u] = l)), e.result;
      }
    }, simulate: function simulate(t, e, n) {
      var i = b.extend(new b.Event(), n, { type: t, isSimulated: !0 });b.event.trigger(i, null, e);
    } }), b.fn.extend({ trigger: function trigger(t, e) {
      return this.each(function () {
        b.event.trigger(t, e, this);
      });
    }, triggerHandler: function triggerHandler(t, e) {
      var n = this[0];if (n) return b.event.trigger(t, e, n, !0);
    } }), p.focusin || b.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
    var n = function n(t) {
      b.event.simulate(e, t.target, b.event.fix(t));
    };b.event.special[e] = { setup: function setup() {
        var i = this.ownerDocument || this,
            o = X.access(i, e);o || i.addEventListener(t, n, !0), X.access(i, e, (o || 0) + 1);
      }, teardown: function teardown() {
        var i = this.ownerDocument || this,
            o = X.access(i, e) - 1;o ? X.access(i, e, o) : (i.removeEventListener(t, n, !0), X.remove(i, e));
      } };
  });var we = t.location,
      Ce = Date.now(),
      xe = /\?/;b.parseXML = function (e) {
    var n;if (!e || "string" != typeof e) return null;try {
      n = new t.DOMParser().parseFromString(e, "text/xml");
    } catch (t) {
      n = void 0;
    }return n && !n.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + e), n;
  };var Se = /\[\]$/,
      Te = /\r?\n/g,
      De = /^(?:submit|button|image|reset|file)$/i,
      ke = /^(?:input|select|textarea|keygen)/i;function Ae(t, e, n, i) {
    var o;if (Array.isArray(e)) b.each(e, function (e, o) {
      n || Se.test(t) ? i(t, o) : Ae(t + "[" + ("object" == (typeof o === "undefined" ? "undefined" : _typeof(o)) && null != o ? e : "") + "]", o, n, i);
    });else if (n || "object" !== _(e)) i(t, e);else for (o in e) {
      Ae(t + "[" + o + "]", e[o], n, i);
    }
  }b.param = function (t, e) {
    var n,
        i = [],
        o = function o(t, e) {
      var n = g(e) ? e() : e;i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n);
    };if (null == t) return "";if (Array.isArray(t) || t.jquery && !b.isPlainObject(t)) b.each(t, function () {
      o(this.name, this.value);
    });else for (n in t) {
      Ae(n, t[n], e, o);
    }return i.join("&");
  }, b.fn.extend({ serialize: function serialize() {
      return b.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        var t = b.prop(this, "elements");return t ? b.makeArray(t) : this;
      }).filter(function () {
        var t = this.type;return this.name && !b(this).is(":disabled") && ke.test(this.nodeName) && !De.test(t) && (this.checked || !dt.test(t));
      }).map(function (t, e) {
        var n = b(this).val();return null == n ? null : Array.isArray(n) ? b.map(n, function (t) {
          return { name: e.name, value: t.replace(Te, "\r\n") };
        }) : { name: e.name, value: n.replace(Te, "\r\n") };
      }).get();
    } });var Ie = /%20/g,
      Ne = /#.*$/,
      Le = /([?&])_=[^&]*/,
      Oe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Pe = /^(?:GET|HEAD)$/,
      je = /^\/\//,
      Re = {},
      qe = {},
      Me = "*/".concat("*"),
      He = i.createElement("a");function Fe(t) {
    return function (e, n) {
      "string" != typeof e && (n = e, e = "*");var i,
          o = 0,
          r = e.toLowerCase().match(j) || [];if (g(n)) for (; i = r[o++];) {
        "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n);
      }
    };
  }function ze(t, e, n, i) {
    var o = {},
        r = t === qe;function s(a) {
      var l;return o[a] = !0, b.each(t[a] || [], function (t, a) {
        var c = a(e, n, i);return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1);
      }), l;
    }return s(e.dataTypes[0]) || !o["*"] && s("*");
  }function We(t, e) {
    var n,
        i,
        o = b.ajaxSettings.flatOptions || {};for (n in e) {
      void 0 !== e[n] && ((o[n] ? t : i || (i = {}))[n] = e[n]);
    }return i && b.extend(!0, t, i), t;
  }He.href = we.href, b.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: we.href, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(we.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Me, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": b.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(t, e) {
      return e ? We(We(t, b.ajaxSettings), e) : We(b.ajaxSettings, t);
    }, ajaxPrefilter: Fe(Re), ajaxTransport: Fe(qe), ajax: function ajax(e, n) {
      "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (n = e, e = void 0), n = n || {};var o,
          r,
          s,
          a,
          l,
          c,
          u,
          h,
          d,
          f,
          p = b.ajaxSetup({}, n),
          g = p.context || p,
          m = p.context && (g.nodeType || g.jquery) ? b(g) : b.event,
          v = b.Deferred(),
          y = b.Callbacks("once memory"),
          _ = p.statusCode || {},
          E = {},
          w = {},
          C = "canceled",
          x = { readyState: 0, getResponseHeader: function getResponseHeader(t) {
          var e;if (u) {
            if (!a) for (a = {}; e = Oe.exec(s);) {
              a[e[1].toLowerCase() + " "] = (a[e[1].toLowerCase() + " "] || []).concat(e[2]);
            }e = a[t.toLowerCase() + " "];
          }return null == e ? null : e.join(", ");
        }, getAllResponseHeaders: function getAllResponseHeaders() {
          return u ? s : null;
        }, setRequestHeader: function setRequestHeader(t, e) {
          return null == u && (t = w[t.toLowerCase()] = w[t.toLowerCase()] || t, E[t] = e), this;
        }, overrideMimeType: function overrideMimeType(t) {
          return null == u && (p.mimeType = t), this;
        }, statusCode: function statusCode(t) {
          var e;if (t) if (u) x.always(t[x.status]);else for (e in t) {
            _[e] = [_[e], t[e]];
          }return this;
        }, abort: function abort(t) {
          var e = t || C;return o && o.abort(e), S(0, e), this;
        } };if (v.promise(x), p.url = ((e || p.url || we.href) + "").replace(je, we.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(j) || [""], null == p.crossDomain) {
        c = i.createElement("a");try {
          c.href = p.url, c.href = c.href, p.crossDomain = He.protocol + "//" + He.host != c.protocol + "//" + c.host;
        } catch (t) {
          p.crossDomain = !0;
        }
      }if (p.data && p.processData && "string" != typeof p.data && (p.data = b.param(p.data, p.traditional)), ze(Re, p, n, x), u) return x;for (d in (h = b.event && p.global) && 0 == b.active++ && b.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Pe.test(p.type), r = p.url.replace(Ne, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Ie, "+")) : (f = p.url.slice(r.length), p.data && (p.processData || "string" == typeof p.data) && (r += (xe.test(r) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (r = r.replace(Le, "$1"), f = (xe.test(r) ? "&" : "?") + "_=" + Ce++ + f), p.url = r + f), p.ifModified && (b.lastModified[r] && x.setRequestHeader("If-Modified-Since", b.lastModified[r]), b.etag[r] && x.setRequestHeader("If-None-Match", b.etag[r])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && x.setRequestHeader("Content-Type", p.contentType), x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Me + "; q=0.01" : "") : p.accepts["*"]), p.headers) {
        x.setRequestHeader(d, p.headers[d]);
      }if (p.beforeSend && (!1 === p.beforeSend.call(g, x, p) || u)) return x.abort();if (C = "abort", y.add(p.complete), x.done(p.success), x.fail(p.error), o = ze(qe, p, n, x)) {
        if (x.readyState = 1, h && m.trigger("ajaxSend", [x, p]), u) return x;p.async && p.timeout > 0 && (l = t.setTimeout(function () {
          x.abort("timeout");
        }, p.timeout));try {
          u = !1, o.send(E, S);
        } catch (t) {
          if (u) throw t;S(-1, t);
        }
      } else S(-1, "No Transport");function S(e, n, i, a) {
        var c,
            d,
            f,
            E,
            w,
            C = n;u || (u = !0, l && t.clearTimeout(l), o = void 0, s = a || "", x.readyState = e > 0 ? 4 : 0, c = e >= 200 && e < 300 || 304 === e, i && (E = function (t, e, n) {
          for (var i, o, r, s, a = t.contents, l = t.dataTypes; "*" === l[0];) {
            l.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
          }if (i) for (o in a) {
            if (a[o] && a[o].test(i)) {
              l.unshift(o);break;
            }
          }if (l[0] in n) r = l[0];else {
            for (o in n) {
              if (!l[0] || t.converters[o + " " + l[0]]) {
                r = o;break;
              }s || (s = o);
            }r = r || s;
          }if (r) return r !== l[0] && l.unshift(r), n[r];
        }(p, x, i)), E = function (t, e, n, i) {
          var o,
              r,
              s,
              a,
              l,
              c = {},
              u = t.dataTypes.slice();if (u[1]) for (s in t.converters) {
            c[s.toLowerCase()] = t.converters[s];
          }for (r = u.shift(); r;) {
            if (t.responseFields[r] && (n[t.responseFields[r]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = u.shift()) if ("*" === r) r = l;else if ("*" !== l && l !== r) {
              if (!(s = c[l + " " + r] || c["* " + r])) for (o in c) {
                if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                  !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], u.unshift(a[1]));break;
                }
              }if (!0 !== s) if (s && t.throws) e = s(e);else try {
                e = s(e);
              } catch (t) {
                return { state: "parsererror", error: s ? t : "No conversion from " + l + " to " + r };
              }
            }
          }return { state: "success", data: e };
        }(p, E, x, c), c ? (p.ifModified && ((w = x.getResponseHeader("Last-Modified")) && (b.lastModified[r] = w), (w = x.getResponseHeader("etag")) && (b.etag[r] = w)), 204 === e || "HEAD" === p.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = E.state, d = E.data, c = !(f = E.error))) : (f = C, !e && C || (C = "error", e < 0 && (e = 0))), x.status = e, x.statusText = (n || C) + "", c ? v.resolveWith(g, [d, C, x]) : v.rejectWith(g, [x, C, f]), x.statusCode(_), _ = void 0, h && m.trigger(c ? "ajaxSuccess" : "ajaxError", [x, p, c ? d : f]), y.fireWith(g, [x, C]), h && (m.trigger("ajaxComplete", [x, p]), --b.active || b.event.trigger("ajaxStop")));
      }return x;
    }, getJSON: function getJSON(t, e, n) {
      return b.get(t, e, n, "json");
    }, getScript: function getScript(t, e) {
      return b.get(t, void 0, e, "script");
    } }), b.each(["get", "post"], function (t, e) {
    b[e] = function (t, n, i, o) {
      return g(n) && (o = o || i, i = n, n = void 0), b.ajax(b.extend({ url: t, type: e, dataType: o, data: n, success: i }, b.isPlainObject(t) && t));
    };
  }), b._evalUrl = function (t, e) {
    return b.ajax({ url: t, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, converters: { "text script": function textScript() {} }, dataFilter: function dataFilter(t) {
        b.globalEval(t, e);
      } });
  }, b.fn.extend({ wrapAll: function wrapAll(t) {
      var e;return this[0] && (g(t) && (t = t.call(this[0])), e = b(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
        for (var t = this; t.firstElementChild;) {
          t = t.firstElementChild;
        }return t;
      }).append(this)), this;
    }, wrapInner: function wrapInner(t) {
      return g(t) ? this.each(function (e) {
        b(this).wrapInner(t.call(this, e));
      }) : this.each(function () {
        var e = b(this),
            n = e.contents();n.length ? n.wrapAll(t) : e.append(t);
      });
    }, wrap: function wrap(t) {
      var e = g(t);return this.each(function (n) {
        b(this).wrapAll(e ? t.call(this, n) : t);
      });
    }, unwrap: function unwrap(t) {
      return this.parent(t).not("body").each(function () {
        b(this).replaceWith(this.childNodes);
      }), this;
    } }), b.expr.pseudos.hidden = function (t) {
    return !b.expr.pseudos.visible(t);
  }, b.expr.pseudos.visible = function (t) {
    return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
  }, b.ajaxSettings.xhr = function () {
    try {
      return new t.XMLHttpRequest();
    } catch (t) {}
  };var Ue = { 0: 200, 1223: 204 },
      Be = b.ajaxSettings.xhr();p.cors = !!Be && "withCredentials" in Be, p.ajax = Be = !!Be, b.ajaxTransport(function (e) {
    var _n, i;if (p.cors || Be && !e.crossDomain) return { send: function send(o, r) {
        var s,
            a = e.xhr();if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (s in e.xhrFields) {
          a[s] = e.xhrFields[s];
        }for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) {
          a.setRequestHeader(s, o[s]);
        }_n = function n(t) {
          return function () {
            _n && (_n = i = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r(Ue[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? { binary: a.response } : { text: a.responseText }, a.getAllResponseHeaders()));
          };
        }, a.onload = _n(), i = a.onerror = a.ontimeout = _n("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function () {
          4 === a.readyState && t.setTimeout(function () {
            _n && i();
          });
        }, _n = _n("abort");try {
          a.send(e.hasContent && e.data || null);
        } catch (t) {
          if (_n) throw t;
        }
      }, abort: function abort() {
        _n && _n();
      } };
  }), b.ajaxPrefilter(function (t) {
    t.crossDomain && (t.contents.script = !1);
  }), b.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(t) {
        return b.globalEval(t), t;
      } } }), b.ajaxPrefilter("script", function (t) {
    void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
  }), b.ajaxTransport("script", function (t) {
    var e, _n2;if (t.crossDomain || t.scriptAttrs) return { send: function send(o, r) {
        e = b("<script>").attr(t.scriptAttrs || {}).prop({ charset: t.scriptCharset, src: t.url }).on("load error", _n2 = function n(t) {
          e.remove(), _n2 = null, t && r("error" === t.type ? 404 : 200, t.type);
        }), i.head.appendChild(e[0]);
      }, abort: function abort() {
        _n2 && _n2();
      } };
  });var $e,
      Ve = [],
      Qe = /(=)\?(?=&|$)|\?\?/;b.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
      var t = Ve.pop() || b.expando + "_" + Ce++;return this[t] = !0, t;
    } }), b.ajaxPrefilter("json jsonp", function (e, n, i) {
    var o,
        r,
        s,
        a = !1 !== e.jsonp && (Qe.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Qe.test(e.data) && "data");if (a || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = g(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Qe, "$1" + o) : !1 !== e.jsonp && (e.url += (xe.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function () {
      return s || b.error(o + " was not called"), s[0];
    }, e.dataTypes[0] = "json", r = t[o], t[o] = function () {
      s = arguments;
    }, i.always(function () {
      void 0 === r ? b(t).removeProp(o) : t[o] = r, e[o] && (e.jsonpCallback = n.jsonpCallback, Ve.push(o)), s && g(r) && r(s[0]), s = r = void 0;
    }), "script";
  }), p.createHTMLDocument = (($e = i.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === $e.childNodes.length), b.parseHTML = function (t, e, n) {
    return "string" != typeof t ? [] : ("boolean" == typeof e && (n = e, e = !1), e || (p.createHTMLDocument ? ((o = (e = i.implementation.createHTMLDocument("")).createElement("base")).href = i.location.href, e.head.appendChild(o)) : e = i), r = k.exec(t), s = !n && [], r ? [e.createElement(r[1])] : (r = Et([t], e, s), s && s.length && b(s).remove(), b.merge([], r.childNodes)));var o, r, s;
  }, b.fn.load = function (t, e, n) {
    var i,
        o,
        r,
        s = this,
        a = t.indexOf(" ");return a > -1 && (i = me(t.slice(a)), t = t.slice(0, a)), g(e) ? (n = e, e = void 0) : e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (o = "POST"), s.length > 0 && b.ajax({ url: t, type: o || "GET", dataType: "html", data: e }).done(function (t) {
      r = arguments, s.html(i ? b("<div>").append(b.parseHTML(t)).find(i) : t);
    }).always(n && function (t, e) {
      s.each(function () {
        n.apply(this, r || [t.responseText, e, t]);
      });
    }), this;
  }, b.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
    b.fn[e] = function (t) {
      return this.on(e, t);
    };
  }), b.expr.pseudos.animated = function (t) {
    return b.grep(b.timers, function (e) {
      return t === e.elem;
    }).length;
  }, b.offset = { setOffset: function setOffset(t, e, n) {
      var i,
          o,
          r,
          s,
          a,
          l,
          c = b.css(t, "position"),
          u = b(t),
          h = {};"static" === c && (t.style.position = "relative"), a = u.offset(), r = b.css(t, "top"), l = b.css(t, "left"), ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1 ? (s = (i = u.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), g(e) && (e = e.call(t, n, b.extend({}, a))), null != e.top && (h.top = e.top - a.top + s), null != e.left && (h.left = e.left - a.left + o), "using" in e ? e.using.call(t, h) : u.css(h);
    } }, b.fn.extend({ offset: function offset(t) {
      if (arguments.length) return void 0 === t ? this : this.each(function (e) {
        b.offset.setOffset(this, t, e);
      });var e,
          n,
          i = this[0];return i ? i.getClientRects().length ? (e = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset }) : { top: 0, left: 0 } : void 0;
    }, position: function position() {
      if (this[0]) {
        var t,
            e,
            n,
            i = this[0],
            o = { top: 0, left: 0 };if ("fixed" === b.css(i, "position")) e = i.getBoundingClientRect();else {
          for (e = this.offset(), n = i.ownerDocument, t = i.offsetParent || n.documentElement; t && (t === n.body || t === n.documentElement) && "static" === b.css(t, "position");) {
            t = t.parentNode;
          }t && t !== i && 1 === t.nodeType && ((o = b(t).offset()).top += b.css(t, "borderTopWidth", !0), o.left += b.css(t, "borderLeftWidth", !0));
        }return { top: e.top - o.top - b.css(i, "marginTop", !0), left: e.left - o.left - b.css(i, "marginLeft", !0) };
      }
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        for (var t = this.offsetParent; t && "static" === b.css(t, "position");) {
          t = t.offsetParent;
        }return t || it;
      });
    } }), b.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, e) {
    var n = "pageYOffset" === e;b.fn[t] = function (i) {
      return W(this, function (t, i, o) {
        var r;if (m(t) ? r = t : 9 === t.nodeType && (r = t.defaultView), void 0 === o) return r ? r[e] : t[i];r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : t[i] = o;
      }, t, i, arguments.length);
    };
  }), b.each(["top", "left"], function (t, e) {
    b.cssHooks[e] = Bt(p.pixelPosition, function (t, n) {
      if (n) return n = Ut(t, e), Ft.test(n) ? b(t).position()[e] + "px" : n;
    });
  }), b.each({ Height: "height", Width: "width" }, function (t, e) {
    b.each({ padding: "inner" + t, content: e, "": "outer" + t }, function (n, i) {
      b.fn[i] = function (o, r) {
        var s = arguments.length && (n || "boolean" != typeof o),
            a = n || (!0 === o || !0 === r ? "margin" : "border");return W(this, function (e, n, o) {
          var r;return m(e) ? 0 === i.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === o ? b.css(e, n, a) : b.style(e, n, o, a);
        }, e, s ? o : void 0, s);
      };
    });
  }), b.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (t, e) {
    b.fn[e] = function (t, n) {
      return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e);
    };
  }), b.fn.extend({ hover: function hover(t, e) {
      return this.mouseenter(t).mouseleave(e || t);
    } }), b.fn.extend({ bind: function bind(t, e, n) {
      return this.on(t, null, e, n);
    }, unbind: function unbind(t, e) {
      return this.off(t, null, e);
    }, delegate: function delegate(t, e, n, i) {
      return this.on(e, t, n, i);
    }, undelegate: function undelegate(t, e, n) {
      return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n);
    } }), b.proxy = function (t, e) {
    var n, i, o;if ("string" == typeof e && (n = t[e], e = t, t = n), g(t)) return i = r.call(arguments, 2), (o = function o() {
      return t.apply(e || this, i.concat(r.call(arguments)));
    }).guid = t.guid = t.guid || b.guid++, o;
  }, b.holdReady = function (t) {
    t ? b.readyWait++ : b.ready(!0);
  }, b.isArray = Array.isArray, b.parseJSON = JSON.parse, b.nodeName = D, b.isFunction = g, b.isWindow = m, b.camelCase = V, b.type = _, b.now = Date.now, b.isNumeric = function (t) {
    var e = b.type(t);return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
  }, "function" == typeof define && define.amd && define("jquery", [], function () {
    return b;
  });var Ke = t.jQuery,
      Xe = t.$;return b.noConflict = function (e) {
    return t.$ === b && (t.$ = Xe), e && t.jQuery === b && (t.jQuery = Ke), b;
  }, e || (t.jQuery = t.$ = b), b;
}), function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper);
}(this, function (t, e, n) {
  "use strict";
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }function o(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }function r(t, e, n) {
    return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
  }function s(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {},
          i = Object.keys(n);"function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (t) {
        return Object.getOwnPropertyDescriptor(n, t).enumerable;
      }))), i.forEach(function (e) {
        r(t, e, n[e]);
      });
    }return t;
  }e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;var a = "transitionend";function l(t) {
    var n = this,
        i = !1;return e(this).one(c.TRANSITION_END, function () {
      i = !0;
    }), setTimeout(function () {
      i || c.triggerTransitionEnd(n);
    }, t), this;
  }var c = { TRANSITION_END: "bsTransitionEnd", getUID: function getUID(t) {
      do {
        t += ~~(1e6 * Math.random());
      } while (document.getElementById(t));return t;
    }, getSelectorFromElement: function getSelectorFromElement(t) {
      var e = t.getAttribute("data-target");if (!e || "#" === e) {
        var n = t.getAttribute("href");e = n && "#" !== n ? n.trim() : "";
      }try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    }, getTransitionDurationFromElement: function getTransitionDurationFromElement(t) {
      if (!t) return 0;var n = e(t).css("transition-duration"),
          i = e(t).css("transition-delay"),
          o = parseFloat(n),
          r = parseFloat(i);return o || r ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0;
    }, reflow: function reflow(t) {
      return t.offsetHeight;
    }, triggerTransitionEnd: function triggerTransitionEnd(t) {
      e(t).trigger(a);
    }, supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(a);
    }, isElement: function isElement(t) {
      return (t[0] || t).nodeType;
    }, typeCheckConfig: function typeCheckConfig(t, e, n) {
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          var o = n[i],
              r = e[i],
              s = r && c.isElement(r) ? "element" : (a = r, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".');
        }
      }var a;
    }, findShadowRoot: function findShadowRoot(t) {
      if (!document.documentElement.attachShadow) return null;if ("function" == typeof t.getRootNode) {
        var e = t.getRootNode();return e instanceof ShadowRoot ? e : null;
      }return t instanceof ShadowRoot ? t : t.parentNode ? c.findShadowRoot(t.parentNode) : null;
    } };e.fn.emulateTransitionEnd = l, e.event.special[c.TRANSITION_END] = { bindType: a, delegateType: a, handle: function handle(t) {
      if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
    } };var u = e.fn.alert,
      h = { CLOSE: "close.bs.alert", CLOSED: "closed.bs.alert", CLICK_DATA_API: "click.bs.alert.data-api" },
      d = "alert",
      f = "fade",
      p = "show",
      g = function () {
    function t(t) {
      this._element = t;
    }var n = t.prototype;return n.close = function (t) {
      var e = this._element;t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
    }, n.dispose = function () {
      e.removeData(this._element, "bs.alert"), this._element = null;
    }, n._getRootElement = function (t) {
      var n = c.getSelectorFromElement(t),
          i = !1;return n && (i = document.querySelector(n)), i || (i = e(t).closest("." + d)[0]), i;
    }, n._triggerCloseEvent = function (t) {
      var n = e.Event(h.CLOSE);return e(t).trigger(n), n;
    }, n._removeElement = function (t) {
      var n = this;if (e(t).removeClass(p), e(t).hasClass(f)) {
        var i = c.getTransitionDurationFromElement(t);e(t).one(c.TRANSITION_END, function (e) {
          return n._destroyElement(t, e);
        }).emulateTransitionEnd(i);
      } else this._destroyElement(t);
    }, n._destroyElement = function (t) {
      e(t).detach().trigger(h.CLOSED).remove();
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this),
            o = i.data("bs.alert");o || (o = new t(this), i.data("bs.alert", o)), "close" === n && o[n](this);
      });
    }, t._handleDismiss = function (t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }]), t;
  }();e(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g())), e.fn.alert = g._jQueryInterface, e.fn.alert.Constructor = g, e.fn.alert.noConflict = function () {
    return e.fn.alert = u, g._jQueryInterface;
  };var m = e.fn.button,
      v = "active",
      y = "btn",
      _ = "focus",
      b = '[data-toggle^="button"]',
      E = '[data-toggle="buttons"]',
      w = 'input:not([type="hidden"])',
      C = ".active",
      x = ".btn",
      S = { CLICK_DATA_API: "click.bs.button.data-api", FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api" },
      T = function () {
    function t(t) {
      this._element = t;
    }var n = t.prototype;return n.toggle = function () {
      var t = !0,
          n = !0,
          i = e(this._element).closest(E)[0];if (i) {
        var o = this._element.querySelector(w);if (o) {
          if ("radio" === o.type) if (o.checked && this._element.classList.contains(v)) t = !1;else {
            var r = i.querySelector(C);r && e(r).removeClass(v);
          }if (t) {
            if (o.hasAttribute("disabled") || i.hasAttribute("disabled") || o.classList.contains("disabled") || i.classList.contains("disabled")) return;o.checked = !this._element.classList.contains(v), e(o).trigger("change");
          }o.focus(), n = !1;
        }
      }n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(v)), t && e(this._element).toggleClass(v);
    }, n.dispose = function () {
      e.removeData(this._element, "bs.button"), this._element = null;
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.button");i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]();
      });
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }]), t;
  }();e(document).on(S.CLICK_DATA_API, b, function (t) {
    t.preventDefault();var n = t.target;e(n).hasClass(y) || (n = e(n).closest(x)), T._jQueryInterface.call(e(n), "toggle");
  }).on(S.FOCUS_BLUR_DATA_API, b, function (t) {
    var n = e(t.target).closest(x)[0];e(n).toggleClass(_, /^focus(in)?$/.test(t.type));
  }), e.fn.button = T._jQueryInterface, e.fn.button.Constructor = T, e.fn.button.noConflict = function () {
    return e.fn.button = m, T._jQueryInterface;
  };var D = "carousel",
      k = ".bs.carousel",
      A = e.fn[D],
      I = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
      N = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
      L = "next",
      O = "prev",
      P = "left",
      j = "right",
      R = { SLIDE: "slide.bs.carousel", SLID: "slid.bs.carousel", KEYDOWN: "keydown.bs.carousel", MOUSEENTER: "mouseenter.bs.carousel", MOUSELEAVE: "mouseleave.bs.carousel", TOUCHSTART: "touchstart.bs.carousel", TOUCHMOVE: "touchmove.bs.carousel", TOUCHEND: "touchend.bs.carousel", POINTERDOWN: "pointerdown.bs.carousel", POINTERUP: "pointerup.bs.carousel", DRAG_START: "dragstart.bs.carousel", LOAD_DATA_API: "load.bs.carousel.data-api", CLICK_DATA_API: "click.bs.carousel.data-api" },
      q = "carousel",
      M = "active",
      H = "slide",
      F = "carousel-item-right",
      z = "carousel-item-left",
      W = "carousel-item-next",
      U = "carousel-item-prev",
      B = "pointer-event",
      $ = { ACTIVE: ".active", ACTIVE_ITEM: ".active.carousel-item", ITEM: ".carousel-item", ITEM_IMG: ".carousel-item img", NEXT_PREV: ".carousel-item-next, .carousel-item-prev", INDICATORS: ".carousel-indicators", DATA_SLIDE: "[data-slide], [data-slide-to]", DATA_RIDE: '[data-ride="carousel"]' },
      V = { TOUCH: "touch", PEN: "pen" },
      Q = function () {
    function t(t, e) {
      this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector($.INDICATORS), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners();
    }var n = t.prototype;return n.next = function () {
      this._isSliding || this._slide(L);
    }, n.nextWhenVisible = function () {
      !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next();
    }, n.prev = function () {
      this._isSliding || this._slide(O);
    }, n.pause = function (t) {
      t || (this._isPaused = !0), this._element.querySelector($.NEXT_PREV) && (c.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
    }, n.cycle = function (t) {
      t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
    }, n.to = function (t) {
      var n = this;this._activeElement = this._element.querySelector($.ACTIVE_ITEM);var i = this._getItemIndex(this._activeElement);if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) e(this._element).one(R.SLID, function () {
        return n.to(t);
      });else {
        if (i === t) return this.pause(), void this.cycle();var o = t > i ? L : O;this._slide(o, this._items[t]);
      }
    }, n.dispose = function () {
      e(this._element).off(k), e.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
    }, n._getConfig = function (t) {
      return t = s({}, I, t), c.typeCheckConfig(D, t, N), t;
    }, n._handleSwipe = function () {
      var t = Math.abs(this.touchDeltaX);if (!(t <= 40)) {
        var e = t / this.touchDeltaX;e > 0 && this.prev(), e < 0 && this.next();
      }
    }, n._addEventListeners = function () {
      var t = this;this._config.keyboard && e(this._element).on(R.KEYDOWN, function (e) {
        return t._keydown(e);
      }), "hover" === this._config.pause && e(this._element).on(R.MOUSEENTER, function (e) {
        return t.pause(e);
      }).on(R.MOUSELEAVE, function (e) {
        return t.cycle(e);
      }), this._config.touch && this._addTouchEventListeners();
    }, n._addTouchEventListeners = function () {
      var t = this;if (this._touchSupported) {
        var n = function n(e) {
          t._pointerEvent && V[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX);
        },
            i = function i(e) {
          t._pointerEvent && V[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
            return t.cycle(e);
          }, 500 + t._config.interval));
        };e(this._element.querySelectorAll($.ITEM_IMG)).on(R.DRAG_START, function (t) {
          return t.preventDefault();
        }), this._pointerEvent ? (e(this._element).on(R.POINTERDOWN, function (t) {
          return n(t);
        }), e(this._element).on(R.POINTERUP, function (t) {
          return i(t);
        }), this._element.classList.add(B)) : (e(this._element).on(R.TOUCHSTART, function (t) {
          return n(t);
        }), e(this._element).on(R.TOUCHMOVE, function (e) {
          return function (e) {
            e.originalEvent.touches && e.originalEvent.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX;
          }(e);
        }), e(this._element).on(R.TOUCHEND, function (t) {
          return i(t);
        }));
      }
    }, n._keydown = function (t) {
      if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {case 37:
          t.preventDefault(), this.prev();break;case 39:
          t.preventDefault(), this.next();}
    }, n._getItemIndex = function (t) {
      return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll($.ITEM)) : [], this._items.indexOf(t);
    }, n._getItemByDirection = function (t, e) {
      var n = t === L,
          i = t === O,
          o = this._getItemIndex(e),
          r = this._items.length - 1;if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;var s = (o + (t === O ? -1 : 1)) % this._items.length;return -1 === s ? this._items[this._items.length - 1] : this._items[s];
    }, n._triggerSlideEvent = function (t, n) {
      var i = this._getItemIndex(t),
          o = this._getItemIndex(this._element.querySelector($.ACTIVE_ITEM)),
          r = e.Event(R.SLIDE, { relatedTarget: t, direction: n, from: o, to: i });return e(this._element).trigger(r), r;
    }, n._setActiveIndicatorElement = function (t) {
      if (this._indicatorsElement) {
        var n = [].slice.call(this._indicatorsElement.querySelectorAll($.ACTIVE));e(n).removeClass(M);var i = this._indicatorsElement.children[this._getItemIndex(t)];i && e(i).addClass(M);
      }
    }, n._slide = function (t, n) {
      var i,
          o,
          r,
          s = this,
          a = this._element.querySelector($.ACTIVE_ITEM),
          l = this._getItemIndex(a),
          u = n || a && this._getItemByDirection(t, a),
          h = this._getItemIndex(u),
          d = Boolean(this._interval);if (t === L ? (i = z, o = W, r = P) : (i = F, o = U, r = j), u && e(u).hasClass(M)) this._isSliding = !1;else if (!this._triggerSlideEvent(u, r).isDefaultPrevented() && a && u) {
        this._isSliding = !0, d && this.pause(), this._setActiveIndicatorElement(u);var f = e.Event(R.SLID, { relatedTarget: u, direction: r, from: l, to: h });if (e(this._element).hasClass(H)) {
          e(u).addClass(o), c.reflow(u), e(a).addClass(i), e(u).addClass(i);var p = parseInt(u.getAttribute("data-interval"), 10);p ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = p) : this._config.interval = this._config.defaultInterval || this._config.interval;var g = c.getTransitionDurationFromElement(a);e(a).one(c.TRANSITION_END, function () {
            e(u).removeClass(i + " " + o).addClass(M), e(a).removeClass(M + " " + o + " " + i), s._isSliding = !1, setTimeout(function () {
              return e(s._element).trigger(f);
            }, 0);
          }).emulateTransitionEnd(g);
        } else e(a).removeClass(M), e(u).addClass(M), this._isSliding = !1, e(this._element).trigger(f);d && this.cycle();
      }
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.carousel"),
            o = s({}, I, e(this).data());"object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && (o = s({}, o, n));var r = "string" == typeof n ? n : o.slide;if (i || (i = new t(this, o), e(this).data("bs.carousel", i)), "number" == typeof n) i.to(n);else if ("string" == typeof r) {
          if (void 0 === i[r]) throw new TypeError('No method named "' + r + '"');i[r]();
        } else o.interval && o.ride && (i.pause(), i.cycle());
      });
    }, t._dataApiClickHandler = function (n) {
      var i = c.getSelectorFromElement(this);if (i) {
        var o = e(i)[0];if (o && e(o).hasClass(q)) {
          var r = s({}, e(o).data(), e(this).data()),
              a = this.getAttribute("data-slide-to");a && (r.interval = !1), t._jQueryInterface.call(e(o), r), a && e(o).data("bs.carousel").to(a), n.preventDefault();
        }
      }
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }, { key: "Default", get: function get() {
        return I;
      } }]), t;
  }();e(document).on(R.CLICK_DATA_API, $.DATA_SLIDE, Q._dataApiClickHandler), e(window).on(R.LOAD_DATA_API, function () {
    for (var t = [].slice.call(document.querySelectorAll($.DATA_RIDE)), n = 0, i = t.length; n < i; n++) {
      var o = e(t[n]);Q._jQueryInterface.call(o, o.data());
    }
  }), e.fn[D] = Q._jQueryInterface, e.fn[D].Constructor = Q, e.fn[D].noConflict = function () {
    return e.fn[D] = A, Q._jQueryInterface;
  };var K = "collapse",
      X = e.fn[K],
      Y = { toggle: !0, parent: "" },
      G = { toggle: "boolean", parent: "(string|element)" },
      J = { SHOW: "show.bs.collapse", SHOWN: "shown.bs.collapse", HIDE: "hide.bs.collapse", HIDDEN: "hidden.bs.collapse", CLICK_DATA_API: "click.bs.collapse.data-api" },
      Z = "show",
      tt = "collapse",
      et = "collapsing",
      nt = "collapsed",
      it = "width",
      ot = "height",
      rt = { ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]' },
      st = function () {
    function t(t, e) {
      this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));for (var n = [].slice.call(document.querySelectorAll(rt.DATA_TOGGLE)), i = 0, o = n.length; i < o; i++) {
        var r = n[i],
            s = c.getSelectorFromElement(r),
            a = [].slice.call(document.querySelectorAll(s)).filter(function (e) {
          return e === t;
        });null !== s && a.length > 0 && (this._selector = s, this._triggerArray.push(r));
      }this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
    }var n = t.prototype;return n.toggle = function () {
      e(this._element).hasClass(Z) ? this.hide() : this.show();
    }, n.show = function () {
      var n,
          i,
          o = this;if (!this._isTransitioning && !e(this._element).hasClass(Z) && (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(rt.ACTIVES)).filter(function (t) {
        return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains(tt);
      })).length && (n = null), !(n && (i = e(n).not(this._selector).data("bs.collapse")) && i._isTransitioning))) {
        var r = e.Event(J.SHOW);if (e(this._element).trigger(r), !r.isDefaultPrevented()) {
          n && (t._jQueryInterface.call(e(n).not(this._selector), "hide"), i || e(n).data("bs.collapse", null));var s = this._getDimension();e(this._element).removeClass(tt).addClass(et), this._element.style[s] = 0, this._triggerArray.length && e(this._triggerArray).removeClass(nt).attr("aria-expanded", !0), this.setTransitioning(!0);var a = "scroll" + (s[0].toUpperCase() + s.slice(1)),
              l = c.getTransitionDurationFromElement(this._element);e(this._element).one(c.TRANSITION_END, function () {
            e(o._element).removeClass(et).addClass(tt).addClass(Z), o._element.style[s] = "", o.setTransitioning(!1), e(o._element).trigger(J.SHOWN);
          }).emulateTransitionEnd(l), this._element.style[s] = this._element[a] + "px";
        }
      }
    }, n.hide = function () {
      var t = this;if (!this._isTransitioning && e(this._element).hasClass(Z)) {
        var n = e.Event(J.HIDE);if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
          var i = this._getDimension();this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", c.reflow(this._element), e(this._element).addClass(et).removeClass(tt).removeClass(Z);var o = this._triggerArray.length;if (o > 0) for (var r = 0; r < o; r++) {
            var s = this._triggerArray[r],
                a = c.getSelectorFromElement(s);if (null !== a) e([].slice.call(document.querySelectorAll(a))).hasClass(Z) || e(s).addClass(nt).attr("aria-expanded", !1);
          }this.setTransitioning(!0);this._element.style[i] = "";var l = c.getTransitionDurationFromElement(this._element);e(this._element).one(c.TRANSITION_END, function () {
            t.setTransitioning(!1), e(t._element).removeClass(et).addClass(tt).trigger(J.HIDDEN);
          }).emulateTransitionEnd(l);
        }
      }
    }, n.setTransitioning = function (t) {
      this._isTransitioning = t;
    }, n.dispose = function () {
      e.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
    }, n._getConfig = function (t) {
      return (t = s({}, Y, t)).toggle = Boolean(t.toggle), c.typeCheckConfig(K, t, G), t;
    }, n._getDimension = function () {
      return e(this._element).hasClass(it) ? it : ot;
    }, n._getParent = function () {
      var n,
          i = this;c.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
          r = [].slice.call(n.querySelectorAll(o));return e(r).each(function (e, n) {
        i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n]);
      }), n;
    }, n._addAriaAndCollapsedClass = function (t, n) {
      var i = e(t).hasClass(Z);n.length && e(n).toggleClass(nt, !i).attr("aria-expanded", i);
    }, t._getTargetFromElement = function (t) {
      var e = c.getSelectorFromElement(t);return e ? document.querySelector(e) : null;
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this),
            o = i.data("bs.collapse"),
            r = s({}, Y, i.data(), "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n ? n : {});if (!o && r.toggle && /show|hide/.test(n) && (r.toggle = !1), o || (o = new t(this, r), i.data("bs.collapse", o)), "string" == typeof n) {
          if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');o[n]();
        }
      });
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }, { key: "Default", get: function get() {
        return Y;
      } }]), t;
  }();e(document).on(J.CLICK_DATA_API, rt.DATA_TOGGLE, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();var n = e(this),
        i = c.getSelectorFromElement(this),
        o = [].slice.call(document.querySelectorAll(i));e(o).each(function () {
      var t = e(this),
          i = t.data("bs.collapse") ? "toggle" : n.data();st._jQueryInterface.call(t, i);
    });
  }), e.fn[K] = st._jQueryInterface, e.fn[K].Constructor = st, e.fn[K].noConflict = function () {
    return e.fn[K] = X, st._jQueryInterface;
  };var at = "dropdown",
      lt = e.fn[at],
      ct = new RegExp("38|40|27"),
      ut = { HIDE: "hide.bs.dropdown", HIDDEN: "hidden.bs.dropdown", SHOW: "show.bs.dropdown", SHOWN: "shown.bs.dropdown", CLICK: "click.bs.dropdown", CLICK_DATA_API: "click.bs.dropdown.data-api", KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api", KEYUP_DATA_API: "keyup.bs.dropdown.data-api" },
      ht = "disabled",
      dt = "show",
      ft = "dropup",
      pt = "dropright",
      gt = "dropleft",
      mt = "dropdown-menu-right",
      vt = "position-static",
      yt = '[data-toggle="dropdown"]',
      _t = ".dropdown form",
      bt = ".dropdown-menu",
      Et = ".navbar-nav",
      wt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
      Ct = "top-start",
      xt = "top-end",
      St = "bottom-start",
      Tt = "bottom-end",
      Dt = "right-start",
      kt = "left-start",
      At = { offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic" },
      It = { offset: "(number|string|function)", flip: "boolean", boundary: "(string|element)", reference: "(string|element)", display: "string" },
      Nt = function () {
    function t(t, e) {
      this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
    }var i = t.prototype;return i.toggle = function () {
      if (!this._element.disabled && !e(this._element).hasClass(ht)) {
        var i = t._getParentFromElement(this._element),
            o = e(this._menu).hasClass(dt);if (t._clearMenus(), !o) {
          var r = { relatedTarget: this._element },
              s = e.Event(ut.SHOW, r);if (e(i).trigger(s), !s.isDefaultPrevented()) {
            if (!this._inNavbar) {
              if (void 0 === n) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var a = this._element;"parent" === this._config.reference ? a = i : c.isElement(this._config.reference) && (a = this._config.reference, void 0 !== this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(i).addClass(vt), this._popper = new n(a, this._menu, this._getPopperConfig());
            }"ontouchstart" in document.documentElement && 0 === e(i).closest(Et).length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(dt), e(i).toggleClass(dt).trigger(e.Event(ut.SHOWN, r));
          }
        }
      }
    }, i.show = function () {
      if (!(this._element.disabled || e(this._element).hasClass(ht) || e(this._menu).hasClass(dt))) {
        var n = { relatedTarget: this._element },
            i = e.Event(ut.SHOW, n),
            o = t._getParentFromElement(this._element);e(o).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(dt), e(o).toggleClass(dt).trigger(e.Event(ut.SHOWN, n)));
      }
    }, i.hide = function () {
      if (!this._element.disabled && !e(this._element).hasClass(ht) && e(this._menu).hasClass(dt)) {
        var n = { relatedTarget: this._element },
            i = e.Event(ut.HIDE, n),
            o = t._getParentFromElement(this._element);e(o).trigger(i), i.isDefaultPrevented() || (e(this._menu).toggleClass(dt), e(o).toggleClass(dt).trigger(e.Event(ut.HIDDEN, n)));
      }
    }, i.dispose = function () {
      e.removeData(this._element, "bs.dropdown"), e(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null);
    }, i.update = function () {
      this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
    }, i._addEventListeners = function () {
      var t = this;e(this._element).on(ut.CLICK, function (e) {
        e.preventDefault(), e.stopPropagation(), t.toggle();
      });
    }, i._getConfig = function (t) {
      return t = s({}, this.constructor.Default, e(this._element).data(), t), c.typeCheckConfig(at, t, this.constructor.DefaultType), t;
    }, i._getMenuElement = function () {
      if (!this._menu) {
        var e = t._getParentFromElement(this._element);e && (this._menu = e.querySelector(bt));
      }return this._menu;
    }, i._getPlacement = function () {
      var t = e(this._element.parentNode),
          n = St;return t.hasClass(ft) ? (n = Ct, e(this._menu).hasClass(mt) && (n = xt)) : t.hasClass(pt) ? n = Dt : t.hasClass(gt) ? n = kt : e(this._menu).hasClass(mt) && (n = Tt), n;
    }, i._detectNavbar = function () {
      return e(this._element).closest(".navbar").length > 0;
    }, i._getOffset = function () {
      var t = this,
          e = {};return "function" == typeof this._config.offset ? e.fn = function (e) {
        return e.offsets = s({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e;
      } : e.offset = this._config.offset, e;
    }, i._getPopperConfig = function () {
      var t = { placement: this._getPlacement(), modifiers: { offset: this._getOffset(), flip: { enabled: this._config.flip }, preventOverflow: { boundariesElement: this._config.boundary } } };return "static" === this._config.display && (t.modifiers.applyStyle = { enabled: !1 }), t;
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.dropdown");if (i || (i = new t(this, "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? n : null), e(this).data("bs.dropdown", i)), "string" == typeof n) {
          if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');i[n]();
        }
      });
    }, t._clearMenus = function (n) {
      if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which)) for (var i = [].slice.call(document.querySelectorAll(yt)), o = 0, r = i.length; o < r; o++) {
        var s = t._getParentFromElement(i[o]),
            a = e(i[o]).data("bs.dropdown"),
            l = { relatedTarget: i[o] };if (n && "click" === n.type && (l.clickEvent = n), a) {
          var c = a._menu;if (e(s).hasClass(dt) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(s, n.target))) {
            var u = e.Event(ut.HIDE, l);e(s).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[o].setAttribute("aria-expanded", "false"), e(c).removeClass(dt), e(s).removeClass(dt).trigger(e.Event(ut.HIDDEN, l)));
          }
        }
      }
    }, t._getParentFromElement = function (t) {
      var e,
          n = c.getSelectorFromElement(t);return n && (e = document.querySelector(n)), e || t.parentNode;
    }, t._dataApiKeydownHandler = function (n) {
      if ((/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(bt).length)) : ct.test(n.which)) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !e(this).hasClass(ht))) {
        var i = t._getParentFromElement(this),
            o = e(i).hasClass(dt);if (o && (!o || 27 !== n.which && 32 !== n.which)) {
          var r = [].slice.call(i.querySelectorAll(wt));if (0 !== r.length) {
            var s = r.indexOf(n.target);38 === n.which && s > 0 && s--, 40 === n.which && s < r.length - 1 && s++, s < 0 && (s = 0), r[s].focus();
          }
        } else {
          if (27 === n.which) {
            var a = i.querySelector(yt);e(a).trigger("focus");
          }e(this).trigger("click");
        }
      }
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }, { key: "Default", get: function get() {
        return At;
      } }, { key: "DefaultType", get: function get() {
        return It;
      } }]), t;
  }();e(document).on(ut.KEYDOWN_DATA_API, yt, Nt._dataApiKeydownHandler).on(ut.KEYDOWN_DATA_API, bt, Nt._dataApiKeydownHandler).on(ut.CLICK_DATA_API + " " + ut.KEYUP_DATA_API, Nt._clearMenus).on(ut.CLICK_DATA_API, yt, function (t) {
    t.preventDefault(), t.stopPropagation(), Nt._jQueryInterface.call(e(this), "toggle");
  }).on(ut.CLICK_DATA_API, _t, function (t) {
    t.stopPropagation();
  }), e.fn[at] = Nt._jQueryInterface, e.fn[at].Constructor = Nt, e.fn[at].noConflict = function () {
    return e.fn[at] = lt, Nt._jQueryInterface;
  };var Lt = e.fn.modal,
      Ot = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
      Pt = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
      jt = { HIDE: "hide.bs.modal", HIDDEN: "hidden.bs.modal", SHOW: "show.bs.modal", SHOWN: "shown.bs.modal", FOCUSIN: "focusin.bs.modal", RESIZE: "resize.bs.modal", CLICK_DISMISS: "click.dismiss.bs.modal", KEYDOWN_DISMISS: "keydown.dismiss.bs.modal", MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal", MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal", CLICK_DATA_API: "click.bs.modal.data-api" },
      Rt = "modal-dialog-scrollable",
      qt = "modal-scrollbar-measure",
      Mt = "modal-backdrop",
      Ht = "modal-open",
      Ft = "fade",
      zt = "show",
      Wt = { DIALOG: ".modal-dialog", MODAL_BODY: ".modal-body", DATA_TOGGLE: '[data-toggle="modal"]', DATA_DISMISS: '[data-dismiss="modal"]', FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", STICKY_CONTENT: ".sticky-top" },
      Ut = function () {
    function t(t, e) {
      this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(Wt.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0;
    }var n = t.prototype;return n.toggle = function (t) {
      return this._isShown ? this.hide() : this.show(t);
    }, n.show = function (t) {
      var n = this;if (!this._isShown && !this._isTransitioning) {
        e(this._element).hasClass(Ft) && (this._isTransitioning = !0);var i = e.Event(jt.SHOW, { relatedTarget: t });e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(jt.CLICK_DISMISS, Wt.DATA_DISMISS, function (t) {
          return n.hide(t);
        }), e(this._dialog).on(jt.MOUSEDOWN_DISMISS, function () {
          e(n._element).one(jt.MOUSEUP_DISMISS, function (t) {
            e(t.target).is(n._element) && (n._ignoreBackdropClick = !0);
          });
        }), this._showBackdrop(function () {
          return n._showElement(t);
        }));
      }
    }, n.hide = function (t) {
      var n = this;if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
        var i = e.Event(jt.HIDE);if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
          this._isShown = !1;var o = e(this._element).hasClass(Ft);if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(jt.FOCUSIN), e(this._element).removeClass(zt), e(this._element).off(jt.CLICK_DISMISS), e(this._dialog).off(jt.MOUSEDOWN_DISMISS), o) {
            var r = c.getTransitionDurationFromElement(this._element);e(this._element).one(c.TRANSITION_END, function (t) {
              return n._hideModal(t);
            }).emulateTransitionEnd(r);
          } else this._hideModal();
        }
      }
    }, n.dispose = function () {
      [window, this._element, this._dialog].forEach(function (t) {
        return e(t).off(".bs.modal");
      }), e(document).off(jt.FOCUSIN), e.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
    }, n.handleUpdate = function () {
      this._adjustDialog();
    }, n._getConfig = function (t) {
      return t = s({}, Ot, t), c.typeCheckConfig("modal", t, Pt), t;
    }, n._showElement = function (t) {
      var n = this,
          i = e(this._element).hasClass(Ft);this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass(Rt) ? this._dialog.querySelector(Wt.MODAL_BODY).scrollTop = 0 : this._element.scrollTop = 0, i && c.reflow(this._element), e(this._element).addClass(zt), this._config.focus && this._enforceFocus();var o = e.Event(jt.SHOWN, { relatedTarget: t }),
          r = function r() {
        n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(o);
      };if (i) {
        var s = c.getTransitionDurationFromElement(this._dialog);e(this._dialog).one(c.TRANSITION_END, r).emulateTransitionEnd(s);
      } else r();
    }, n._enforceFocus = function () {
      var t = this;e(document).off(jt.FOCUSIN).on(jt.FOCUSIN, function (n) {
        document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus();
      });
    }, n._setEscapeEvent = function () {
      var t = this;this._isShown && this._config.keyboard ? e(this._element).on(jt.KEYDOWN_DISMISS, function (e) {
        27 === e.which && (e.preventDefault(), t.hide());
      }) : this._isShown || e(this._element).off(jt.KEYDOWN_DISMISS);
    }, n._setResizeEvent = function () {
      var t = this;this._isShown ? e(window).on(jt.RESIZE, function (e) {
        return t.handleUpdate(e);
      }) : e(window).off(jt.RESIZE);
    }, n._hideModal = function () {
      var t = this;this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
        e(document.body).removeClass(Ht), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(jt.HIDDEN);
      });
    }, n._removeBackdrop = function () {
      this._backdrop && (e(this._backdrop).remove(), this._backdrop = null);
    }, n._showBackdrop = function (t) {
      var n = this,
          i = e(this._element).hasClass(Ft) ? Ft : "";if (this._isShown && this._config.backdrop) {
        if (this._backdrop = document.createElement("div"), this._backdrop.className = Mt, i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on(jt.CLICK_DISMISS, function (t) {
          n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide());
        }), i && c.reflow(this._backdrop), e(this._backdrop).addClass(zt), !t) return;if (!i) return void t();var o = c.getTransitionDurationFromElement(this._backdrop);e(this._backdrop).one(c.TRANSITION_END, t).emulateTransitionEnd(o);
      } else if (!this._isShown && this._backdrop) {
        e(this._backdrop).removeClass(zt);var r = function r() {
          n._removeBackdrop(), t && t();
        };if (e(this._element).hasClass(Ft)) {
          var s = c.getTransitionDurationFromElement(this._backdrop);e(this._backdrop).one(c.TRANSITION_END, r).emulateTransitionEnd(s);
        } else r();
      } else t && t();
    }, n._adjustDialog = function () {
      var t = this._element.scrollHeight > document.documentElement.clientHeight;!this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
    }, n._resetAdjustments = function () {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }, n._checkScrollbar = function () {
      var t = document.body.getBoundingClientRect();this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
    }, n._setScrollbar = function () {
      var t = this;if (this._isBodyOverflowing) {
        var n = [].slice.call(document.querySelectorAll(Wt.FIXED_CONTENT)),
            i = [].slice.call(document.querySelectorAll(Wt.STICKY_CONTENT));e(n).each(function (n, i) {
          var o = i.style.paddingRight,
              r = e(i).css("padding-right");e(i).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px");
        }), e(i).each(function (n, i) {
          var o = i.style.marginRight,
              r = e(i).css("margin-right");e(i).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px");
        });var o = document.body.style.paddingRight,
            r = e(document.body).css("padding-right");e(document.body).data("padding-right", o).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px");
      }e(document.body).addClass(Ht);
    }, n._resetScrollbar = function () {
      var t = [].slice.call(document.querySelectorAll(Wt.FIXED_CONTENT));e(t).each(function (t, n) {
        var i = e(n).data("padding-right");e(n).removeData("padding-right"), n.style.paddingRight = i || "";
      });var n = [].slice.call(document.querySelectorAll("" + Wt.STICKY_CONTENT));e(n).each(function (t, n) {
        var i = e(n).data("margin-right");void 0 !== i && e(n).css("margin-right", i).removeData("margin-right");
      });var i = e(document.body).data("padding-right");e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || "";
    }, n._getScrollbarWidth = function () {
      var t = document.createElement("div");t.className = qt, document.body.appendChild(t);var e = t.getBoundingClientRect().width - t.clientWidth;return document.body.removeChild(t), e;
    }, t._jQueryInterface = function (n, i) {
      return this.each(function () {
        var o = e(this).data("bs.modal"),
            r = s({}, Ot, e(this).data(), "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n ? n : {});if (o || (o = new t(this, r), e(this).data("bs.modal", o)), "string" == typeof n) {
          if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');o[n](i);
        } else r.show && o.show(i);
      });
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }, { key: "Default", get: function get() {
        return Ot;
      } }]), t;
  }();e(document).on(jt.CLICK_DATA_API, Wt.DATA_TOGGLE, function (t) {
    var n,
        i = this,
        o = c.getSelectorFromElement(this);o && (n = document.querySelector(o));var r = e(n).data("bs.modal") ? "toggle" : s({}, e(n).data(), e(this).data());"A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();var a = e(n).one(jt.SHOW, function (t) {
      t.isDefaultPrevented() || a.one(jt.HIDDEN, function () {
        e(i).is(":visible") && i.focus();
      });
    });Ut._jQueryInterface.call(e(n), r, this);
  }), e.fn.modal = Ut._jQueryInterface, e.fn.modal.Constructor = Ut, e.fn.modal.noConflict = function () {
    return e.fn.modal = Lt, Ut._jQueryInterface;
  };var Bt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
      $t = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] },
      Vt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
      Qt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function Kt(t, e, n) {
    if (0 === t.length) return t;if (n && "function" == typeof n) return n(t);for (var i = new window.DOMParser().parseFromString(t, "text/html"), o = Object.keys(e), r = [].slice.call(i.body.querySelectorAll("*")), s = function s(t, n) {
      var i = r[t],
          s = i.nodeName.toLowerCase();if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";var a = [].slice.call(i.attributes),
          l = [].concat(e["*"] || [], e[s] || []);a.forEach(function (t) {
        (function (t, e) {
          var n = t.nodeName.toLowerCase();if (-1 !== e.indexOf(n)) return -1 === Bt.indexOf(n) || Boolean(t.nodeValue.match(Vt) || t.nodeValue.match(Qt));for (var i = e.filter(function (t) {
            return t instanceof RegExp;
          }), o = 0, r = i.length; o < r; o++) {
            if (n.match(i[o])) return !0;
          }return !1;
        })(t, l) || i.removeAttribute(t.nodeName);
      });
    }, a = 0, l = r.length; a < l; a++) {
      s(a);
    }return i.body.innerHTML;
  }var Xt = "tooltip",
      Yt = e.fn.tooltip,
      Gt = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
      Jt = ["sanitize", "whiteList", "sanitizeFn"],
      Zt = { animation: "boolean", template: "string", title: "(string|element|function)", trigger: "string", delay: "(number|object)", html: "boolean", selector: "(string|boolean)", placement: "(string|function)", offset: "(number|string|function)", container: "(string|element|boolean)", fallbackPlacement: "(string|array)", boundary: "(string|element)", sanitize: "boolean", sanitizeFn: "(null|function)", whiteList: "object" },
      te = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
      ee = { animation: !0, template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, selector: !1, placement: "top", offset: 0, container: !1, fallbackPlacement: "flip", boundary: "scrollParent", sanitize: !0, sanitizeFn: null, whiteList: $t },
      ne = "show",
      ie = "out",
      oe = { HIDE: "hide.bs.tooltip", HIDDEN: "hidden.bs.tooltip", SHOW: "show.bs.tooltip", SHOWN: "shown.bs.tooltip", INSERTED: "inserted.bs.tooltip", CLICK: "click.bs.tooltip", FOCUSIN: "focusin.bs.tooltip", FOCUSOUT: "focusout.bs.tooltip", MOUSEENTER: "mouseenter.bs.tooltip", MOUSELEAVE: "mouseleave.bs.tooltip" },
      re = "fade",
      se = "show",
      ae = ".tooltip-inner",
      le = ".arrow",
      ce = "hover",
      ue = "focus",
      he = "click",
      de = "manual",
      fe = function () {
    function t(t, e) {
      if (void 0 === n) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners();
    }var i = t.prototype;return i.enable = function () {
      this._isEnabled = !0;
    }, i.disable = function () {
      this._isEnabled = !1;
    }, i.toggleEnabled = function () {
      this._isEnabled = !this._isEnabled;
    }, i.toggle = function (t) {
      if (this._isEnabled) if (t) {
        var n = this.constructor.DATA_KEY,
            i = e(t.currentTarget).data(n);i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i);
      } else {
        if (e(this.getTipElement()).hasClass(se)) return void this._leave(null, this);this._enter(null, this);
      }
    }, i.dispose = function () {
      clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal"), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
    }, i.show = function () {
      var t = this;if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");var i = e.Event(this.constructor.Event.SHOW);if (this.isWithContent() && this._isEnabled) {
        e(this.element).trigger(i);var o = c.findShadowRoot(this.element),
            r = e.contains(null !== o ? o : this.element.ownerDocument.documentElement, this.element);if (i.isDefaultPrevented() || !r) return;var s = this.getTipElement(),
            a = c.getUID(this.constructor.NAME);s.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(s).addClass(re);var l = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
            u = this._getAttachment(l);this.addAttachmentClass(u);var h = this._getContainer();e(s).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(s).appendTo(h), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, s, { placement: u, modifiers: { offset: this._getOffset(), flip: { behavior: this.config.fallbackPlacement }, arrow: { element: le }, preventOverflow: { boundariesElement: this.config.boundary } }, onCreate: function onCreate(e) {
            e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e);
          }, onUpdate: function onUpdate(e) {
            return t._handlePopperPlacementChange(e);
          } }), e(s).addClass(se), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);var d = function d() {
          t.config.animation && t._fixTransition();var n = t._hoverState;t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), n === ie && t._leave(null, t);
        };if (e(this.tip).hasClass(re)) {
          var f = c.getTransitionDurationFromElement(this.tip);e(this.tip).one(c.TRANSITION_END, d).emulateTransitionEnd(f);
        } else d();
      }
    }, i.hide = function (t) {
      var n = this,
          i = this.getTipElement(),
          o = e.Event(this.constructor.Event.HIDE),
          r = function r() {
        n._hoverState !== ne && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t();
      };if (e(this.element).trigger(o), !o.isDefaultPrevented()) {
        if (e(i).removeClass(se), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger[he] = !1, this._activeTrigger[ue] = !1, this._activeTrigger[ce] = !1, e(this.tip).hasClass(re)) {
          var s = c.getTransitionDurationFromElement(i);e(i).one(c.TRANSITION_END, r).emulateTransitionEnd(s);
        } else r();this._hoverState = "";
      }
    }, i.update = function () {
      null !== this._popper && this._popper.scheduleUpdate();
    }, i.isWithContent = function () {
      return Boolean(this.getTitle());
    }, i.addAttachmentClass = function (t) {
      e(this.getTipElement()).addClass("bs-tooltip-" + t);
    }, i.getTipElement = function () {
      return this.tip = this.tip || e(this.config.template)[0], this.tip;
    }, i.setContent = function () {
      var t = this.getTipElement();this.setElementContent(e(t.querySelectorAll(ae)), this.getTitle()), e(t).removeClass(re + " " + se);
    }, i.setElementContent = function (t, n) {
      "object" != (typeof n === "undefined" ? "undefined" : _typeof(n)) || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = Kt(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text());
    }, i.getTitle = function () {
      var t = this.element.getAttribute("data-original-title");return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
    }, i._getOffset = function () {
      var t = this,
          e = {};return "function" == typeof this.config.offset ? e.fn = function (e) {
        return e.offsets = s({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e;
      } : e.offset = this.config.offset, e;
    }, i._getContainer = function () {
      return !1 === this.config.container ? document.body : c.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container);
    }, i._getAttachment = function (t) {
      return te[t.toUpperCase()];
    }, i._setListeners = function () {
      var t = this;this.config.trigger.split(" ").forEach(function (n) {
        if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
          return t.toggle(e);
        });else if (n !== de) {
          var i = n === ce ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
              o = n === ce ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;e(t.element).on(i, t.config.selector, function (e) {
            return t._enter(e);
          }).on(o, t.config.selector, function (e) {
            return t._leave(e);
          });
        }
      }), e(this.element).closest(".modal").on("hide.bs.modal", function () {
        t.element && t.hide();
      }), this.config.selector ? this.config = s({}, this.config, { trigger: "manual", selector: "" }) : this._fixTitle();
    }, i._fixTitle = function () {
      var t = _typeof(this.element.getAttribute("data-original-title"));(this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
    }, i._enter = function (t, n) {
      var i = this.constructor.DATA_KEY;(n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? ue : ce] = !0), e(n.getTipElement()).hasClass(se) || n._hoverState === ne ? n._hoverState = ne : (clearTimeout(n._timeout), n._hoverState = ne, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
        n._hoverState === ne && n.show();
      }, n.config.delay.show) : n.show());
    }, i._leave = function (t, n) {
      var i = this.constructor.DATA_KEY;(n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? ue : ce] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = ie, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
        n._hoverState === ie && n.hide();
      }, n.config.delay.hide) : n.hide());
    }, i._isWithActiveTrigger = function () {
      for (var t in this._activeTrigger) {
        if (this._activeTrigger[t]) return !0;
      }return !1;
    }, i._getConfig = function (t) {
      var n = e(this.element).data();return Object.keys(n).forEach(function (t) {
        -1 !== Jt.indexOf(t) && delete n[t];
      }), "number" == typeof (t = s({}, this.constructor.Default, n, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t ? t : {})).delay && (t.delay = { show: t.delay, hide: t.delay }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), c.typeCheckConfig(Xt, t, this.constructor.DefaultType), t.sanitize && (t.template = Kt(t.template, t.whiteList, t.sanitizeFn)), t;
    }, i._getDelegateConfig = function () {
      var t = {};if (this.config) for (var e in this.config) {
        this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
      }return t;
    }, i._cleanTipClass = function () {
      var t = e(this.getTipElement()),
          n = t.attr("class").match(Gt);null !== n && n.length && t.removeClass(n.join(""));
    }, i._handlePopperPlacementChange = function (t) {
      var e = t.instance;this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
    }, i._fixTransition = function () {
      var t = this.getTipElement(),
          n = this.config.animation;null === t.getAttribute("x-placement") && (e(t).removeClass(re), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n);
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.tooltip"),
            o = "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n;if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, o), e(this).data("bs.tooltip", i)), "string" == typeof n)) {
          if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');i[n]();
        }
      });
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }, { key: "Default", get: function get() {
        return ee;
      } }, { key: "NAME", get: function get() {
        return Xt;
      } }, { key: "DATA_KEY", get: function get() {
        return "bs.tooltip";
      } }, { key: "Event", get: function get() {
        return oe;
      } }, { key: "EVENT_KEY", get: function get() {
        return ".bs.tooltip";
      } }, { key: "DefaultType", get: function get() {
        return Zt;
      } }]), t;
  }();e.fn.tooltip = fe._jQueryInterface, e.fn.tooltip.Constructor = fe, e.fn.tooltip.noConflict = function () {
    return e.fn.tooltip = Yt, fe._jQueryInterface;
  };var pe = "popover",
      ge = e.fn.popover,
      me = new RegExp("(^|\\s)bs-popover\\S+", "g"),
      ve = s({}, fe.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' }),
      ye = s({}, fe.DefaultType, { content: "(string|element|function)" }),
      _e = "fade",
      be = "show",
      Ee = ".popover-header",
      we = ".popover-body",
      Ce = { HIDE: "hide.bs.popover", HIDDEN: "hidden.bs.popover", SHOW: "show.bs.popover", SHOWN: "shown.bs.popover", INSERTED: "inserted.bs.popover", CLICK: "click.bs.popover", FOCUSIN: "focusin.bs.popover", FOCUSOUT: "focusout.bs.popover", MOUSEENTER: "mouseenter.bs.popover", MOUSELEAVE: "mouseleave.bs.popover" },
      xe = function (t) {
    var n, i;function r() {
      return t.apply(this, arguments) || this;
    }i = t, (n = r).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;var s = r.prototype;return s.isWithContent = function () {
      return this.getTitle() || this._getContent();
    }, s.addAttachmentClass = function (t) {
      e(this.getTipElement()).addClass("bs-popover-" + t);
    }, s.getTipElement = function () {
      return this.tip = this.tip || e(this.config.template)[0], this.tip;
    }, s.setContent = function () {
      var t = e(this.getTipElement());this.setElementContent(t.find(Ee), this.getTitle());var n = this._getContent();"function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(we), n), t.removeClass(_e + " " + be);
    }, s._getContent = function () {
      return this.element.getAttribute("data-content") || this.config.content;
    }, s._cleanTipClass = function () {
      var t = e(this.getTipElement()),
          n = t.attr("class").match(me);null !== n && n.length > 0 && t.removeClass(n.join(""));
    }, r._jQueryInterface = function (t) {
      return this.each(function () {
        var n = e(this).data("bs.popover"),
            i = "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : null;if ((n || !/dispose|hide/.test(t)) && (n || (n = new r(this, i), e(this).data("bs.popover", n)), "string" == typeof t)) {
          if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');n[t]();
        }
      });
    }, o(r, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }, { key: "Default", get: function get() {
        return ve;
      } }, { key: "NAME", get: function get() {
        return pe;
      } }, { key: "DATA_KEY", get: function get() {
        return "bs.popover";
      } }, { key: "Event", get: function get() {
        return Ce;
      } }, { key: "EVENT_KEY", get: function get() {
        return ".bs.popover";
      } }, { key: "DefaultType", get: function get() {
        return ye;
      } }]), r;
  }(fe);e.fn.popover = xe._jQueryInterface, e.fn.popover.Constructor = xe, e.fn.popover.noConflict = function () {
    return e.fn.popover = ge, xe._jQueryInterface;
  };var Se = "scrollspy",
      Te = e.fn[Se],
      De = { offset: 10, method: "auto", target: "" },
      ke = { offset: "number", method: "string", target: "(string|element)" },
      Ae = { ACTIVATE: "activate.bs.scrollspy", SCROLL: "scroll.bs.scrollspy", LOAD_DATA_API: "load.bs.scrollspy.data-api" },
      Ie = "dropdown-item",
      Ne = "active",
      Le = { DATA_SPY: '[data-spy="scroll"]', ACTIVE: ".active", NAV_LIST_GROUP: ".nav, .list-group", NAV_LINKS: ".nav-link", NAV_ITEMS: ".nav-item", LIST_ITEMS: ".list-group-item", DROPDOWN: ".dropdown", DROPDOWN_ITEMS: ".dropdown-item", DROPDOWN_TOGGLE: ".dropdown-toggle" },
      Oe = "offset",
      Pe = "position",
      je = function () {
    function t(t, n) {
      var i = this;this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + Le.NAV_LINKS + "," + this._config.target + " " + Le.LIST_ITEMS + "," + this._config.target + " " + Le.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(Ae.SCROLL, function (t) {
        return i._process(t);
      }), this.refresh(), this._process();
    }var n = t.prototype;return n.refresh = function () {
      var t = this,
          n = this._scrollElement === this._scrollElement.window ? Oe : Pe,
          i = "auto" === this._config.method ? n : this._config.method,
          o = i === Pe ? this._getScrollTop() : 0;this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
        var n,
            r = c.getSelectorFromElement(t);if (r && (n = document.querySelector(r)), n) {
          var s = n.getBoundingClientRect();if (s.width || s.height) return [e(n)[i]().top + o, r];
        }return null;
      }).filter(function (t) {
        return t;
      }).sort(function (t, e) {
        return t[0] - e[0];
      }).forEach(function (e) {
        t._offsets.push(e[0]), t._targets.push(e[1]);
      });
    }, n.dispose = function () {
      e.removeData(this._element, "bs.scrollspy"), e(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
    }, n._getConfig = function (t) {
      if ("string" != typeof (t = s({}, De, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t ? t : {})).target) {
        var n = e(t.target).attr("id");n || (n = c.getUID(Se), e(t.target).attr("id", n)), t.target = "#" + n;
      }return c.typeCheckConfig(Se, t, ke), t;
    }, n._getScrollTop = function () {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }, n._getScrollHeight = function () {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }, n._getOffsetHeight = function () {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }, n._process = function () {
      var t = this._getScrollTop() + this._config.offset,
          e = this._getScrollHeight(),
          n = this._config.offset + e - this._getOffsetHeight();if (this._scrollHeight !== e && this.refresh(), t >= n) {
        var i = this._targets[this._targets.length - 1];this._activeTarget !== i && this._activate(i);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();for (var o = this._offsets.length; o--;) {
          this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
        }
      }
    }, n._activate = function (t) {
      this._activeTarget = t, this._clear();var n = this._selector.split(",").map(function (e) {
        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
      }),
          i = e([].slice.call(document.querySelectorAll(n.join(","))));i.hasClass(Ie) ? (i.closest(Le.DROPDOWN).find(Le.DROPDOWN_TOGGLE).addClass(Ne), i.addClass(Ne)) : (i.addClass(Ne), i.parents(Le.NAV_LIST_GROUP).prev(Le.NAV_LINKS + ", " + Le.LIST_ITEMS).addClass(Ne), i.parents(Le.NAV_LIST_GROUP).prev(Le.NAV_ITEMS).children(Le.NAV_LINKS).addClass(Ne)), e(this._scrollElement).trigger(Ae.ACTIVATE, { relatedTarget: t });
    }, n._clear = function () {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
        return t.classList.contains(Ne);
      }).forEach(function (t) {
        return t.classList.remove(Ne);
      });
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this).data("bs.scrollspy");if (i || (i = new t(this, "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n), e(this).data("bs.scrollspy", i)), "string" == typeof n) {
          if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');i[n]();
        }
      });
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }, { key: "Default", get: function get() {
        return De;
      } }]), t;
  }();e(window).on(Ae.LOAD_DATA_API, function () {
    for (var t = [].slice.call(document.querySelectorAll(Le.DATA_SPY)), n = t.length; n--;) {
      var i = e(t[n]);je._jQueryInterface.call(i, i.data());
    }
  }), e.fn[Se] = je._jQueryInterface, e.fn[Se].Constructor = je, e.fn[Se].noConflict = function () {
    return e.fn[Se] = Te, je._jQueryInterface;
  };var Re = e.fn.tab,
      qe = { HIDE: "hide.bs.tab", HIDDEN: "hidden.bs.tab", SHOW: "show.bs.tab", SHOWN: "shown.bs.tab", CLICK_DATA_API: "click.bs.tab.data-api" },
      Me = "dropdown-menu",
      He = "active",
      Fe = "disabled",
      ze = "fade",
      We = "show",
      Ue = ".dropdown",
      Be = ".nav, .list-group",
      $e = ".active",
      Ve = "> li > .active",
      Qe = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      Ke = ".dropdown-toggle",
      Xe = "> .dropdown-menu .active",
      Ye = function () {
    function t(t) {
      this._element = t;
    }var n = t.prototype;return n.show = function () {
      var t = this;if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(He) || e(this._element).hasClass(Fe))) {
        var n,
            i,
            o = e(this._element).closest(Be)[0],
            r = c.getSelectorFromElement(this._element);if (o) {
          var s = "UL" === o.nodeName || "OL" === o.nodeName ? Ve : $e;i = (i = e.makeArray(e(o).find(s)))[i.length - 1];
        }var a = e.Event(qe.HIDE, { relatedTarget: this._element }),
            l = e.Event(qe.SHOW, { relatedTarget: i });if (i && e(i).trigger(a), e(this._element).trigger(l), !l.isDefaultPrevented() && !a.isDefaultPrevented()) {
          r && (n = document.querySelector(r)), this._activate(this._element, o);var u = function u() {
            var n = e.Event(qe.HIDDEN, { relatedTarget: t._element }),
                o = e.Event(qe.SHOWN, { relatedTarget: i });e(i).trigger(n), e(t._element).trigger(o);
          };n ? this._activate(n, n.parentNode, u) : u();
        }
      }
    }, n.dispose = function () {
      e.removeData(this._element, "bs.tab"), this._element = null;
    }, n._activate = function (t, n, i) {
      var o = this,
          r = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children($e) : e(n).find(Ve))[0],
          s = i && r && e(r).hasClass(ze),
          a = function a() {
        return o._transitionComplete(t, r, i);
      };if (r && s) {
        var l = c.getTransitionDurationFromElement(r);e(r).removeClass(We).one(c.TRANSITION_END, a).emulateTransitionEnd(l);
      } else a();
    }, n._transitionComplete = function (t, n, i) {
      if (n) {
        e(n).removeClass(He);var o = e(n.parentNode).find(Xe)[0];o && e(o).removeClass(He), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1);
      }if (e(t).addClass(He), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), c.reflow(t), t.classList.contains(ze) && t.classList.add(We), t.parentNode && e(t.parentNode).hasClass(Me)) {
        var r = e(t).closest(Ue)[0];if (r) {
          var s = [].slice.call(r.querySelectorAll(Ke));e(s).addClass(He);
        }t.setAttribute("aria-expanded", !0);
      }i && i();
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this),
            o = i.data("bs.tab");if (o || (o = new t(this), i.data("bs.tab", o)), "string" == typeof n) {
          if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');o[n]();
        }
      });
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }]), t;
  }();e(document).on(qe.CLICK_DATA_API, Qe, function (t) {
    t.preventDefault(), Ye._jQueryInterface.call(e(this), "show");
  }), e.fn.tab = Ye._jQueryInterface, e.fn.tab.Constructor = Ye, e.fn.tab.noConflict = function () {
    return e.fn.tab = Re, Ye._jQueryInterface;
  };var Ge = e.fn.toast,
      Je = { CLICK_DISMISS: "click.dismiss.bs.toast", HIDE: "hide.bs.toast", HIDDEN: "hidden.bs.toast", SHOW: "show.bs.toast", SHOWN: "shown.bs.toast" },
      Ze = "fade",
      tn = "hide",
      en = "show",
      nn = "showing",
      on = { animation: "boolean", autohide: "boolean", delay: "number" },
      rn = { animation: !0, autohide: !0, delay: 500 },
      sn = '[data-dismiss="toast"]',
      an = function () {
    function t(t, e) {
      this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners();
    }var n = t.prototype;return n.show = function () {
      var t = this;e(this._element).trigger(Je.SHOW), this._config.animation && this._element.classList.add(Ze);var n = function n() {
        t._element.classList.remove(nn), t._element.classList.add(en), e(t._element).trigger(Je.SHOWN), t._config.autohide && t.hide();
      };if (this._element.classList.remove(tn), this._element.classList.add(nn), this._config.animation) {
        var i = c.getTransitionDurationFromElement(this._element);e(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(i);
      } else n();
    }, n.hide = function (t) {
      var n = this;this._element.classList.contains(en) && (e(this._element).trigger(Je.HIDE), t ? this._close() : this._timeout = setTimeout(function () {
        n._close();
      }, this._config.delay));
    }, n.dispose = function () {
      clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(en) && this._element.classList.remove(en), e(this._element).off(Je.CLICK_DISMISS), e.removeData(this._element, "bs.toast"), this._element = null, this._config = null;
    }, n._getConfig = function (t) {
      return t = s({}, rn, e(this._element).data(), "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t ? t : {}), c.typeCheckConfig("toast", t, this.constructor.DefaultType), t;
    }, n._setListeners = function () {
      var t = this;e(this._element).on(Je.CLICK_DISMISS, sn, function () {
        return t.hide(!0);
      });
    }, n._close = function () {
      var t = this,
          n = function n() {
        t._element.classList.add(tn), e(t._element).trigger(Je.HIDDEN);
      };if (this._element.classList.remove(en), this._config.animation) {
        var i = c.getTransitionDurationFromElement(this._element);e(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(i);
      } else n();
    }, t._jQueryInterface = function (n) {
      return this.each(function () {
        var i = e(this),
            o = i.data("bs.toast");if (o || (o = new t(this, "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n), i.data("bs.toast", o)), "string" == typeof n) {
          if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');o[n](this);
        }
      });
    }, o(t, null, [{ key: "VERSION", get: function get() {
        return "4.3.1";
      } }, { key: "DefaultType", get: function get() {
        return on;
      } }, { key: "Default", get: function get() {
        return rn;
      } }]), t;
  }();e.fn.toast = an._jQueryInterface, e.fn.toast.Constructor = an, e.fn.toast.noConflict = function () {
    return e.fn.toast = Ge, an._jQueryInterface;
  }, function () {
    if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t = e.fn.jquery.split(" ")[0].split(".");if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
  }(), t.Util = c, t.Alert = g, t.Button = T, t.Carousel = Q, t.Collapse = st, t.Dropdown = Nt, t.Modal = Ut, t.Popover = xe, t.Scrollspy = je, t.Tab = Ye, t.Toast = an, t.Tooltip = fe, Object.defineProperty(t, "__esModule", { value: !0 });
}), function (t) {
  "use strict";
  function e(e) {
    return e.is('[type="checkbox"]') ? e.prop("checked") : e.is('[type="radio"]') ? !!t('[name="' + e.attr("name") + '"]:checked').length : t.trim(e.val());
  }var n = function n(i, o) {
    for (var r in this.options = o, this.$element = t(i), this.$inputs = this.$element.find(n.INPUT_SELECTOR), this.$btn = t('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]')), o.errors = t.extend({}, n.DEFAULTS.errors, o.errors), o.custom) {
      if (!o.errors[r]) throw new Error("Missing default error message for custom validator: " + r);
    }t.extend(n.VALIDATORS, o.custom), this.$element.attr("novalidate", !0), this.toggleSubmit(), this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", n.INPUT_SELECTOR, t.proxy(this.onInput, this)), this.$element.on("submit.bs.validator", t.proxy(this.onSubmit, this)), this.$element.find("[data-match]").each(function () {
      var n = t(this),
          i = n.data("match");t(i).on("input.bs.validator", function (t) {
        e(n) && n.trigger("input.bs.validator");
      });
    });
  };function i(e) {
    return this.each(function () {
      var i = t(this),
          o = t.extend({}, n.DEFAULTS, i.data(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e),
          r = i.data("bs.validator");(r || "destroy" != e) && (r || i.data("bs.validator", r = new n(this, o)), "string" == typeof e && r[e]());
    });
  }n.INPUT_SELECTOR = ':input:not([type="submit"], button):enabled:visible', n.FOCUS_OFFSET = 20, n.DEFAULTS = { delay: 500, html: !1, disable: !0, focus: !0, custom: {}, errors: { match: "Does not match", minlength: "Not long enough" }, feedback: { success: "glyphicon-ok", error: "glyphicon-remove" } }, n.VALIDATORS = { native: function native(t) {
      var e = t[0];return !e.checkValidity || e.checkValidity();
    }, match: function match(e) {
      var n = e.data("match");return !e.val() || e.val() === t(n).val();
    }, minlength: function minlength(t) {
      var e = t.data("minlength");return !t.val() || t.val().length >= e;
    } }, n.prototype.onInput = function (e) {
    var n = this,
        i = t(e.target),
        o = "focusout" !== e.type;this.validateInput(i, o).done(function () {
      n.toggleSubmit();
    });
  }, n.prototype.validateInput = function (n, i) {
    var o = e(n),
        r = n.data("bs.validator.previous"),
        s = n.data("bs.validator.errors");if (r === o) return t.Deferred().resolve();n.data("bs.validator.previous", o), n.is('[type="radio"]') && (n = this.$element.find('input[name="' + n.attr("name") + '"]'));var a = t.Event("validate.bs.validator", { relatedTarget: n[0] });if (this.$element.trigger(a), !a.isDefaultPrevented()) {
      var l = this;return this.runValidators(n).done(function (e) {
        n.data("bs.validator.errors", e), e.length ? i ? l.defer(n, l.showErrors) : l.showErrors(n) : l.clearErrors(n), s && e.toString() === s.toString() || (a = e.length ? t.Event("invalid.bs.validator", { relatedTarget: n[0], detail: e }) : t.Event("valid.bs.validator", { relatedTarget: n[0], detail: s }), l.$element.trigger(a)), l.toggleSubmit(), l.$element.trigger(t.Event("validated.bs.validator", { relatedTarget: n[0] }));
      });
    }
  }, n.prototype.runValidators = function (i) {
    var o = [],
        r = t.Deferred(),
        s = this.options;function a(t) {
      return i.data(t + "-error") || i.data("error") || "native" == t && i[0].validationMessage || s.errors[t];
    }return i.data("bs.validator.deferred") && i.data("bs.validator.deferred").reject(), i.data("bs.validator.deferred", r), t.each(n.VALIDATORS, t.proxy(function (t, n) {
      if ((e(i) || i.attr("required")) && (i.data(t) || "native" == t) && !n.call(this, i)) {
        var r = a(t);!~o.indexOf(r) && o.push(r);
      }
    }, this)), !o.length && e(i) && i.data("remote") ? this.defer(i, function () {
      var n = {};n[i.attr("name")] = e(i), t.get(i.data("remote"), n).fail(function (t, e, n) {
        o.push(a("remote") || n);
      }).always(function () {
        r.resolve(o);
      });
    }) : r.resolve(o), r.promise();
  }, n.prototype.validate = function () {
    var e = this;return t.when(this.$inputs.map(function (n) {
      return e.validateInput(t(this), !1);
    })).then(function () {
      e.toggleSubmit(), e.focusError();
    }), this;
  }, n.prototype.focusError = function () {
    if (this.options.focus) {
      var e = t(".has-error:first :input");0 !== e.length && (t(document.body).animate({ scrollTop: e.offset().top - n.FOCUS_OFFSET }, 250), e.focus());
    }
  }, n.prototype.showErrors = function (e) {
    var n = this.options.html ? "html" : "text",
        i = e.data("bs.validator.errors"),
        o = e.closest(".form-group"),
        r = o.find(".help-block.with-errors"),
        s = o.find(".form-control-feedback");i.length && (i = t("<ul/>").addClass("list-unstyled").append(t.map(i, function (e) {
      return t("<li/>")[n](e);
    })), void 0 === r.data("bs.validator.originalContent") && r.data("bs.validator.originalContent", r.html()), r.empty().append(i), o.addClass("has-error has-danger"), o.hasClass("has-feedback") && s.removeClass(this.options.feedback.success) && s.addClass(this.options.feedback.error) && o.removeClass("has-success"));
  }, n.prototype.clearErrors = function (t) {
    var n = t.closest(".form-group"),
        i = n.find(".help-block.with-errors"),
        o = n.find(".form-control-feedback");i.html(i.data("bs.validator.originalContent")), n.removeClass("has-error has-danger"), n.hasClass("has-feedback") && o.removeClass(this.options.feedback.error) && e(t) && o.addClass(this.options.feedback.success) && n.addClass("has-success");
  }, n.prototype.hasErrors = function () {
    return !!this.$inputs.filter(function () {
      return !!(t(this).data("bs.validator.errors") || []).length;
    }).length;
  }, n.prototype.isIncomplete = function () {
    return !!this.$inputs.filter("[required]").filter(function () {
      return !e(t(this));
    }).length;
  }, n.prototype.onSubmit = function (t) {
    this.validate(), (this.isIncomplete() || this.hasErrors()) && t.preventDefault();
  }, n.prototype.toggleSubmit = function () {
    this.options.disable && this.$btn.toggleClass("disabled", this.isIncomplete() || this.hasErrors());
  }, n.prototype.defer = function (e, n) {
    if (n = t.proxy(n, this, e), !this.options.delay) return n();window.clearTimeout(e.data("bs.validator.timeout")), e.data("bs.validator.timeout", window.setTimeout(n, this.options.delay));
  }, n.prototype.destroy = function () {
    return this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator").find(".form-control-feedback").removeClass([this.options.feedback.error, this.options.feedback.success].join(" ")), this.$inputs.off(".bs.validator").removeData(["bs.validator.errors", "bs.validator.deferred", "bs.validator.previous"]).each(function () {
      var e = t(this),
          n = e.data("bs.validator.timeout");window.clearTimeout(n) && e.removeData("bs.validator.timeout");
    }), this.$element.find(".help-block.with-errors").each(function () {
      var e = t(this),
          n = e.data("bs.validator.originalContent");e.removeData("bs.validator.originalContent").html(n);
    }), this.$element.find('input[type="submit"], button[type="submit"]').removeClass("disabled"), this.$element.find(".has-error, .has-danger").removeClass("has-error has-danger"), this;
  };var o = t.fn.validator;t.fn.validator = i, t.fn.validator.Constructor = n, t.fn.validator.noConflict = function () {
    return t.fn.validator = o, this;
  }, t(window).on("load", function () {
    t('form[data-toggle="validator"]').each(function () {
      var e = t(this);i.call(e, e.data());
    });
  });
}(jQuery), function (t, e) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (n) {
    return e(t, n);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function (t, e) {
  "use strict";
  var n = Array.prototype.slice,
      i = t.console,
      o = void 0 === i ? function () {} : function (t) {
    i.error(t);
  };function r(i, r, a) {
    (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function (t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
    }), a.fn[i] = function (t) {
      var e;return "string" == typeof t ? function (t, e, n) {
        var r,
            s = "$()." + i + '("' + e + '")';return t.each(function (t, l) {
          var c = a.data(l, i);if (c) {
            var u = c[e];if (u && "_" != e.charAt(0)) {
              var h = u.apply(c, n);r = void 0 === r ? h : r;
            } else o(s + " is not a valid method");
          } else o(i + " not initialized. Cannot call methods, i.e. " + s);
        }), void 0 !== r ? r : t;
      }(this, t, n.call(arguments, 1)) : (e = t, this.each(function (t, n) {
        var o = a.data(n, i);o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o));
      }), this);
    }, s(a));
  }function s(t) {
    !t || t && t.bridget || (t.bridget = r);
  }return s(e || t.jQuery), r;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function () {
  function t() {}var e = t.prototype;return e.on = function (t, e) {
    if (t && e) {
      var n = this._events = this._events || {},
          i = n[t] = n[t] || [];return -1 == i.indexOf(e) && i.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);var n = this._onceEvents = this._onceEvents || {};return (n[t] = n[t] || {})[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var n = this._events && this._events[t];if (n && n.length) {
      var i = n.indexOf(e);return -1 != i && n.splice(i, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var n = this._events && this._events[t];if (n && n.length) {
      n = n.slice(0), e = e || [];for (var i = this._onceEvents && this._onceEvents[t], o = 0; o < n.length; o++) {
        var r = n[o];i && i[r] && (this.off(t, r), delete i[r]), r.apply(this, e);
      }return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.getSize = e();
}(window, function () {
  "use strict";
  function t(t) {
    var e = parseFloat(t);return -1 == t.indexOf("%") && !isNaN(e) && e;
  }var e = "undefined" == typeof console ? function () {} : function (t) {
    console.error(t);
  },
      n = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      i = n.length;function o(t) {
    var n = getComputedStyle(t);return n || e("Style returned " + n + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), n;
  }var r,
      s = !1;function a(e) {
    if (function () {
      if (!s) {
        s = !0;var e = document.createElement("div");e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";var n = document.body || document.documentElement;n.appendChild(e);var i = o(e);r = 200 == Math.round(t(i.width)), a.isBoxSizeOuter = r, n.removeChild(e);
      }
    }(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.nodeType) {
      var l = o(e);if ("none" == l.display) return function () {
        for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; e < i; e++) {
          t[n[e]] = 0;
        }return t;
      }();var c = {};c.width = e.offsetWidth, c.height = e.offsetHeight;for (var u = c.isBorderBox = "border-box" == l.boxSizing, h = 0; h < i; h++) {
        var d = n[h],
            f = l[d],
            p = parseFloat(f);c[d] = isNaN(p) ? 0 : p;
      }var g = c.paddingLeft + c.paddingRight,
          m = c.paddingTop + c.paddingBottom,
          v = c.marginLeft + c.marginRight,
          y = c.marginTop + c.marginBottom,
          _ = c.borderLeftWidth + c.borderRightWidth,
          b = c.borderTopWidth + c.borderBottomWidth,
          E = u && r,
          w = t(l.width);!1 !== w && (c.width = w + (E ? 0 : g + _));var C = t(l.height);return !1 !== C && (c.height = C + (E ? 0 : m + b)), c.innerWidth = c.width - (g + _), c.innerHeight = c.height - (m + b), c.outerWidth = c.width + v, c.outerHeight = c.height + y, c;
    }
  }return a;
}), function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
  "use strict";
  var t = function () {
    var t = window.Element.prototype;if (t.matches) return "matches";if (t.matchesSelector) return "matchesSelector";for (var e = ["webkit", "moz", "ms", "o"], n = 0; n < e.length; n++) {
      var i = e[n] + "MatchesSelector";if (t[i]) return i;
    }
  }();return function (e, n) {
    return e[t](n);
  };
}), function (t, e) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (n) {
    return e(t, n);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function (t, e) {
  var n = { extend: function extend(t, e) {
      for (var n in e) {
        t[n] = e[n];
      }return t;
    }, modulo: function modulo(t, e) {
      return (t % e + e) % e;
    } },
      i = Array.prototype.slice;n.makeArray = function (t) {
    return Array.isArray(t) ? t : null === t || void 0 === t ? [] : "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && "number" == typeof t.length ? i.call(t) : [t];
  }, n.removeFrom = function (t, e) {
    var n = t.indexOf(e);-1 != n && t.splice(n, 1);
  }, n.getParent = function (t, n) {
    for (; t.parentNode && t != document.body;) {
      if (t = t.parentNode, e(t, n)) return t;
    }
  }, n.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, n.handleEvent = function (t) {
    var e = "on" + t.type;this[e] && this[e](t);
  }, n.filterFindElements = function (t, i) {
    var o = [];return (t = n.makeArray(t)).forEach(function (t) {
      if (t instanceof HTMLElement) if (i) {
        e(t, i) && o.push(t);for (var n = t.querySelectorAll(i), r = 0; r < n.length; r++) {
          o.push(n[r]);
        }
      } else o.push(t);
    }), o;
  }, n.debounceMethod = function (t, e, n) {
    n = n || 100;var i = t.prototype[e],
        o = e + "Timeout";t.prototype[e] = function () {
      var t = this[o];clearTimeout(t);var e = arguments,
          r = this;this[o] = setTimeout(function () {
        i.apply(r, e), delete r[o];
      }, n);
    };
  }, n.docReady = function (t) {
    var e = document.readyState;"complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, n.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, n) {
      return e + "-" + n;
    }).toLowerCase();
  };var o = t.console;return n.htmlInit = function (e, i) {
    n.docReady(function () {
      var r = n.toDashed(i),
          s = "data-" + r,
          a = document.querySelectorAll("[" + s + "]"),
          l = document.querySelectorAll(".js-" + r),
          c = n.makeArray(a).concat(n.makeArray(l)),
          u = s + "-options",
          h = t.jQuery;c.forEach(function (t) {
        var n,
            r = t.getAttribute(s) || t.getAttribute(u);try {
          n = r && JSON.parse(r);
        } catch (e) {
          return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + e));
        }var a = new e(t, n);h && h.data(t, i, a);
      });
    });
  }, n;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function (n) {
    return e(t, n);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {}, t.Flickity.Cell = e(t, t.getSize));
}(window, function (t, e) {
  function n(t, e) {
    this.element = t, this.parent = e, this.create();
  }var i = n.prototype;return i.create = function () {
    this.element.style.position = "absolute", this.element.setAttribute("aria-hidden", "true"), this.x = 0, this.shift = 0;
  }, i.destroy = function () {
    this.unselect(), this.element.style.position = "";var t = this.parent.originSide;this.element.style[t] = "";
  }, i.getSize = function () {
    this.size = e(this.element);
  }, i.setPosition = function (t) {
    this.x = t, this.updateTarget(), this.renderPosition(t);
  }, i.updateTarget = i.setDefaultTarget = function () {
    var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign;
  }, i.renderPosition = function (t) {
    var e = this.parent.originSide;this.element.style[e] = this.parent.getPositionValue(t);
  }, i.select = function () {
    this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden");
  }, i.unselect = function () {
    this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true");
  }, i.wrapShift = function (t) {
    this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t);
  }, i.remove = function () {
    this.element.parentNode.removeChild(this.element);
  }, n;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e());
}(window, function () {
  "use strict";
  function t(t) {
    this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0;
  }var e = t.prototype;return e.addCell = function (t) {
    if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
      this.x = t.x;var e = this.isOriginLeft ? "marginLeft" : "marginRight";this.firstMargin = t.size[e];
    }
  }, e.updateTarget = function () {
    var t = this.isOriginLeft ? "marginRight" : "marginLeft",
        e = this.getLastCell(),
        n = e ? e.size[t] : 0,
        i = this.outerWidth - (this.firstMargin + n);this.target = this.x + this.firstMargin + i * this.parent.cellAlign;
  }, e.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  }, e.select = function () {
    this.cells.forEach(function (t) {
      t.select();
    });
  }, e.unselect = function () {
    this.cells.forEach(function (t) {
      t.unselect();
    });
  }, e.getCellElements = function () {
    return this.cells.map(function (t) {
      return t.element;
    });
  }, t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (n) {
    return e(t, n);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.animatePrototype = e(t, t.fizzyUIUtils));
}(window, function (t, e) {
  var n = { startAnimation: function startAnimation() {
      this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate());
    }, animate: function animate() {
      this.applyDragForce(), this.applySelectedAttraction();var t = this.x;if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
        var e = this;requestAnimationFrame(function () {
          e.animate();
        });
      }
    }, positionSlider: function positionSlider() {
      var t = this.x;this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), this.setTranslateX(t, this.isAnimating), this.dispatchScrollEvent();
    }, setTranslateX: function setTranslateX(t, e) {
      t += this.cursorPosition, t = this.options.rightToLeft ? -t : t;var n = this.getPositionValue(t);this.slider.style.transform = e ? "translate3d(" + n + ",0,0)" : "translateX(" + n + ")";
    }, dispatchScrollEvent: function dispatchScrollEvent() {
      var t = this.slides[0];if (t) {
        var e = -this.x - t.target,
            n = e / this.slidesWidth;this.dispatchEvent("scroll", null, [n, e]);
      }
    }, positionSliderAtSelected: function positionSliderAtSelected() {
      this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider());
    }, getPositionValue: function getPositionValue(t) {
      return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px";
    }, settle: function settle(t) {
      this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]));
    }, shiftWrapCells: function shiftWrapCells(t) {
      var e = this.cursorPosition + t;this._shiftCells(this.beforeShiftCells, e, -1);var n = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);this._shiftCells(this.afterShiftCells, n, 1);
    }, _shiftCells: function _shiftCells(t, e, n) {
      for (var i = 0; i < t.length; i++) {
        var o = t[i],
            r = e > 0 ? n : 0;o.wrapShift(r), e -= o.size.outerWidth;
      }
    }, _unshiftCells: function _unshiftCells(t) {
      if (t && t.length) for (var e = 0; e < t.length; e++) {
        t[e].wrapShift(0);
      }
    }, integratePhysics: function integratePhysics() {
      this.x += this.velocity, this.velocity *= this.getFrictionFactor();
    }, applyForce: function applyForce(t) {
      this.velocity += t;
    }, getFrictionFactor: function getFrictionFactor() {
      return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
    }, getRestingPosition: function getRestingPosition() {
      return this.x + this.velocity / (1 - this.getFrictionFactor());
    }, applyDragForce: function applyDragForce() {
      if (this.isDraggable && this.isPointerDown) {
        var t = this.dragX - this.x - this.velocity;this.applyForce(t);
      }
    }, applySelectedAttraction: function applySelectedAttraction() {
      if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
        var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;this.applyForce(t);
      }
    } };return n;
}), function (t, e) {
  if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (n, i, o, r, s, a) {
    return e(t, n, i, o, r, s, a);
  });else if ("object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports) module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));else {
    var n = t.Flickity;t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, n.Cell, n.Slide, n.animatePrototype);
  }
}(window, function (t, e, n, i, o, r, s) {
  var a = t.jQuery,
      l = t.getComputedStyle,
      c = t.console;function u(t, e) {
    for (t = i.makeArray(t); t.length;) {
      e.appendChild(t.shift());
    }
  }var h = 0,
      d = {};function f(t, e) {
    var n = i.getQueryElement(t);if (n) {
      if (this.element = n, this.element.flickityGUID) {
        var o = d[this.element.flickityGUID];return o.option(e), o;
      }a && (this.$element = a(this.element)), this.options = i.extend({}, this.constructor.defaults), this.option(e), this._create();
    } else c && c.error("Bad element for Flickity: " + (n || t));
  }f.defaults = { accessibility: !0, cellAlign: "center", freeScrollFriction: .075, friction: .28, namespaceJQueryEvents: !0, percentPosition: !0, resize: !0, selectedAttraction: .025, setGallerySize: !0 }, f.createMethods = [];var p = f.prototype;i.extend(p, e.prototype), p._create = function () {
    var e = this.guid = ++h;for (var n in this.element.flickityGUID = e, d[e] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this), this.options.on) {
      var i = this.options.on[n];this.on(n, i);
    }f.createMethods.forEach(function (t) {
      this[t]();
    }, this), this.options.watchCSS ? this.watchCSS() : this.activate();
  }, p.option = function (t) {
    i.extend(this.options, t);
  }, p.activate = function () {
    this.isActive || (this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), u(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate"), this.selectInitialIndex(), this.isInitActivated = !0, this.dispatchEvent("ready"));
  }, p._createSlider = function () {
    var t = document.createElement("div");t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t;
  }, p._filterFindCellElements = function (t) {
    return i.filterFindElements(t, this.options.cellSelector);
  }, p.reloadCells = function () {
    this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize();
  }, p._makeCells = function (t) {
    return this._filterFindCellElements(t).map(function (t) {
      return new o(t, this);
    }, this);
  }, p.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  }, p.getLastSlide = function () {
    return this.slides[this.slides.length - 1];
  }, p.positionCells = function () {
    this._sizeCells(this.cells), this._positionCells(0);
  }, p._positionCells = function (t) {
    t = t || 0, this.maxCellHeight = t && this.maxCellHeight || 0;var e = 0;if (t > 0) {
      var n = this.cells[t - 1];e = n.x + n.size.outerWidth;
    }for (var i = this.cells.length, o = t; o < i; o++) {
      var r = this.cells[o];r.setPosition(e), e += r.size.outerWidth, this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight);
    }this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = i ? this.getLastSlide().target - this.slides[0].target : 0;
  }, p._sizeCells = function (t) {
    t.forEach(function (t) {
      t.getSize();
    });
  }, p.updateSlides = function () {
    if (this.slides = [], this.cells.length) {
      var t = new r(this);this.slides.push(t);var e = "left" == this.originSide ? "marginRight" : "marginLeft",
          n = this._getCanCellFit();this.cells.forEach(function (i, o) {
        if (t.cells.length) {
          var s = t.outerWidth - t.firstMargin + (i.size.outerWidth - i.size[e]);n.call(this, o, s) ? t.addCell(i) : (t.updateTarget(), t = new r(this), this.slides.push(t), t.addCell(i));
        } else t.addCell(i);
      }, this), t.updateTarget(), this.updateSelectedSlide();
    }
  }, p._getCanCellFit = function () {
    var t = this.options.groupCells;if (!t) return function () {
      return !1;
    };if ("number" == typeof t) {
      var e = parseInt(t, 10);return function (t) {
        return t % e != 0;
      };
    }var n = "string" == typeof t && t.match(/^(\d+)%$/),
        i = n ? parseInt(n[1], 10) / 100 : 1;return function (t, e) {
      return e <= (this.size.innerWidth + 1) * i;
    };
  }, p._init = p.reposition = function () {
    this.positionCells(), this.positionSliderAtSelected();
  }, p.getSize = function () {
    this.size = n(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign;
  };var g = { center: { left: .5, right: .5 }, left: { left: 0, right: 1 }, right: { right: 0, left: 1 } };return p.setCellAlign = function () {
    var t = g[this.options.cellAlign];this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
  }, p.setGallerySize = function () {
    if (this.options.setGallerySize) {
      var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;this.viewport.style.height = t + "px";
    }
  }, p._getWrapShiftCells = function () {
    if (this.options.wrapAround) {
      this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);var t = this.cursorPosition,
          e = this.cells.length - 1;this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1);
    }
  }, p._getGapCells = function (t, e, n) {
    for (var i = []; t > 0;) {
      var o = this.cells[e];if (!o) break;i.push(o), e += n, t -= o.size.outerWidth;
    }return i;
  }, p._containSlides = function () {
    if (this.options.contain && !this.options.wrapAround && this.cells.length) {
      var t = this.options.rightToLeft,
          e = t ? "marginRight" : "marginLeft",
          n = t ? "marginLeft" : "marginRight",
          i = this.slideableWidth - this.getLastCell().size[n],
          o = i < this.size.innerWidth,
          r = this.cursorPosition + this.cells[0].size[e],
          s = i - this.size.innerWidth * (1 - this.cellAlign);this.slides.forEach(function (t) {
        o ? t.target = i * this.cellAlign : (t.target = Math.max(t.target, r), t.target = Math.min(t.target, s));
      }, this);
    }
  }, p.dispatchEvent = function (t, e, n) {
    var i = e ? [e].concat(n) : n;if (this.emitEvent(t, i), a && this.$element) {
      var o = t += this.options.namespaceJQueryEvents ? ".flickity" : "";if (e) {
        var r = a.Event(e);r.type = t, o = r;
      }this.$element.trigger(o, n);
    }
  }, p.select = function (t, e, n) {
    if (this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = i.modulo(t, this.slides.length)), this.slides[t])) {
      var o = this.selectedIndex;this.selectedIndex = t, this.updateSelectedSlide(), n ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [t]), t != o && this.dispatchEvent("change", null, [t]), this.dispatchEvent("cellSelect");
    }
  }, p._wrapSelect = function (t) {
    var e = this.slides.length;if (!(this.options.wrapAround && e > 1)) return t;var n = i.modulo(t, e),
        o = Math.abs(n - this.selectedIndex),
        r = Math.abs(n + e - this.selectedIndex),
        s = Math.abs(n - e - this.selectedIndex);!this.isDragSelect && r < o ? t += e : !this.isDragSelect && s < o && (t -= e), t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth);
  }, p.previous = function (t, e) {
    this.select(this.selectedIndex - 1, t, e);
  }, p.next = function (t, e) {
    this.select(this.selectedIndex + 1, t, e);
  }, p.updateSelectedSlide = function () {
    var t = this.slides[this.selectedIndex];t && (this.unselectSelectedSlide(), this.selectedSlide = t, t.select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0]);
  }, p.unselectSelectedSlide = function () {
    this.selectedSlide && this.selectedSlide.unselect();
  }, p.selectInitialIndex = function () {
    var t = this.options.initialIndex;if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);else {
      if (t && "string" == typeof t) if (this.queryCell(t)) return void this.selectCell(t, !1, !0);var e = 0;t && this.slides[t] && (e = t), this.select(e, !1, !0);
    }
  }, p.selectCell = function (t, e, n) {
    var i = this.queryCell(t);if (i) {
      var o = this.getCellSlideIndex(i);this.select(o, e, n);
    }
  }, p.getCellSlideIndex = function (t) {
    for (var e = 0; e < this.slides.length; e++) {
      if (-1 != this.slides[e].cells.indexOf(t)) return e;
    }
  }, p.getCell = function (t) {
    for (var e = 0; e < this.cells.length; e++) {
      var n = this.cells[e];if (n.element == t) return n;
    }
  }, p.getCells = function (t) {
    var e = [];return (t = i.makeArray(t)).forEach(function (t) {
      var n = this.getCell(t);n && e.push(n);
    }, this), e;
  }, p.getCellElements = function () {
    return this.cells.map(function (t) {
      return t.element;
    });
  }, p.getParentCell = function (t) {
    var e = this.getCell(t);return e || (t = i.getParent(t, ".flickity-slider > *"), this.getCell(t));
  }, p.getAdjacentCellElements = function (t, e) {
    if (!t) return this.selectedSlide.getCellElements();e = void 0 === e ? this.selectedIndex : e;var n = this.slides.length;if (1 + 2 * t >= n) return this.getCellElements();for (var o = [], r = e - t; r <= e + t; r++) {
      var s = this.options.wrapAround ? i.modulo(r, n) : r,
          a = this.slides[s];a && (o = o.concat(a.getCellElements()));
    }return o;
  }, p.queryCell = function (t) {
    if ("number" == typeof t) return this.cells[t];if ("string" == typeof t) {
      if (t.match(/^[#\.]?[\d\/]/)) return;t = this.element.querySelector(t);
    }return this.getCell(t);
  }, p.uiChange = function () {
    this.emitEvent("uiChange");
  }, p.childUIPointerDown = function (t) {
    "touchstart" != t.type && t.preventDefault(), this.focus();
  }, p.onresize = function () {
    this.watchCSS(), this.resize();
  }, i.debounceMethod(f, "onresize", 150), p.resize = function () {
    if (this.isActive) {
      this.getSize(), this.options.wrapAround && (this.x = i.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");var t = this.selectedElements && this.selectedElements[0];this.selectCell(t, !1, !0);
    }
  }, p.watchCSS = function () {
    this.options.watchCSS && (-1 != l(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate());
  }, p.onkeydown = function (t) {
    var e = document.activeElement && document.activeElement != this.element;if (this.options.accessibility && !e) {
      var n = f.keyboardHandlers[t.keyCode];n && n.call(this);
    }
  }, f.keyboardHandlers = { 37: function _() {
      var t = this.options.rightToLeft ? "next" : "previous";this.uiChange(), this[t]();
    }, 39: function _() {
      var t = this.options.rightToLeft ? "previous" : "next";this.uiChange(), this[t]();
    } }, p.focus = function () {
    var e = t.pageYOffset;this.element.focus({ preventScroll: !0 }), t.pageYOffset != e && t.scrollTo(t.pageXOffset, e);
  }, p.deactivate = function () {
    this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function (t) {
      t.destroy();
    }), this.element.removeChild(this.viewport), u(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"));
  }, p.destroy = function () {
    this.deactivate(), t.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), a && this.$element && a.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete d[this.guid];
  }, i.extend(p, s), f.data = function (t) {
    var e = (t = i.getQueryElement(t)) && t.flickityGUID;return e && d[e];
  }, i.htmlInit(f, "flickity"), a && a.bridget && a.bridget("flickity", f), f.setJQuery = function (t) {
    a = t;
  }, f.Cell = o, f.Slide = r, f;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (n) {
    return e(t, n);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter);
}(window, function (t, e) {
  function n() {}var i = n.prototype = Object.create(e.prototype);i.bindStartEvent = function (t) {
    this._bindStartEvent(t, !0);
  }, i.unbindStartEvent = function (t) {
    this._bindStartEvent(t, !1);
  }, i._bindStartEvent = function (e, n) {
    var i = (n = void 0 === n || n) ? "addEventListener" : "removeEventListener",
        o = "mousedown";t.PointerEvent ? o = "pointerdown" : "ontouchstart" in t && (o = "touchstart"), e[i](o, this);
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;this[e] && this[e](t);
  }, i.getTouch = function (t) {
    for (var e = 0; e < t.length; e++) {
      var n = t[e];if (n.identifier == this.pointerIdentifier) return n;
    }
  }, i.onmousedown = function (t) {
    var e = t.button;e && 0 !== e && 1 !== e || this._pointerDown(t, t);
  }, i.ontouchstart = function (t) {
    this._pointerDown(t, t.changedTouches[0]);
  }, i.onpointerdown = function (t) {
    this._pointerDown(t, t);
  }, i._pointerDown = function (t, e) {
    t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e));
  }, i.pointerDown = function (t, e) {
    this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]);
  };var o = { mousedown: ["mousemove", "mouseup"], touchstart: ["touchmove", "touchend", "touchcancel"], pointerdown: ["pointermove", "pointerup", "pointercancel"] };return i._bindPostStartEvents = function (e) {
    if (e) {
      var n = o[e.type];n.forEach(function (e) {
        t.addEventListener(e, this);
      }, this), this._boundPointerEvents = n;
    }
  }, i._unbindPostStartEvents = function () {
    this._boundPointerEvents && (this._boundPointerEvents.forEach(function (e) {
      t.removeEventListener(e, this);
    }, this), delete this._boundPointerEvents);
  }, i.onmousemove = function (t) {
    this._pointerMove(t, t);
  }, i.onpointermove = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
  }, i.ontouchmove = function (t) {
    var e = this.getTouch(t.changedTouches);e && this._pointerMove(t, e);
  }, i._pointerMove = function (t, e) {
    this.pointerMove(t, e);
  }, i.pointerMove = function (t, e) {
    this.emitEvent("pointerMove", [t, e]);
  }, i.onmouseup = function (t) {
    this._pointerUp(t, t);
  }, i.onpointerup = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
  }, i.ontouchend = function (t) {
    var e = this.getTouch(t.changedTouches);e && this._pointerUp(t, e);
  }, i._pointerUp = function (t, e) {
    this._pointerDone(), this.pointerUp(t, e);
  }, i.pointerUp = function (t, e) {
    this.emitEvent("pointerUp", [t, e]);
  }, i._pointerDone = function () {
    this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
  }, i._pointerReset = function () {
    this.isPointerDown = !1, delete this.pointerIdentifier;
  }, i.pointerDone = function () {}, i.onpointercancel = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
  }, i.ontouchcancel = function (t) {
    var e = this.getTouch(t.changedTouches);e && this._pointerCancel(t, e);
  }, i._pointerCancel = function (t, e) {
    this._pointerDone(), this.pointerCancel(t, e);
  }, i.pointerCancel = function (t, e) {
    this.emitEvent("pointerCancel", [t, e]);
  }, n.getPointerPoint = function (t) {
    return { x: t.pageX, y: t.pageY };
  }, n;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function (n) {
    return e(t, n);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer);
}(window, function (t, e) {
  function n() {}var i = n.prototype = Object.create(e.prototype);i.bindHandles = function () {
    this._bindHandles(!0);
  }, i.unbindHandles = function () {
    this._bindHandles(!1);
  }, i._bindHandles = function (e) {
    for (var n = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", i = e ? this._touchActionValue : "", o = 0; o < this.handles.length; o++) {
      var r = this.handles[o];this._bindStartEvent(r, e), r[n]("click", this), t.PointerEvent && (r.style.touchAction = i);
    }
  }, i._touchActionValue = "none", i.pointerDown = function (t, e) {
    this.okayPointerDown(t) && (this.pointerDownPointer = e, t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]));
  };var o = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 },
      r = { radio: !0, checkbox: !0, button: !0, submit: !0, image: !0, file: !0 };return i.okayPointerDown = function (t) {
    var e = o[t.target.nodeName],
        n = r[t.target.type],
        i = !e || n;return i || this._pointerReset(), i;
  }, i.pointerDownBlur = function () {
    var t = document.activeElement;t && t.blur && t != document.body && t.blur();
  }, i.pointerMove = function (t, e) {
    var n = this._dragPointerMove(t, e);this.emitEvent("pointerMove", [t, e, n]), this._dragMove(t, e, n);
  }, i._dragPointerMove = function (t, e) {
    var n = { x: e.pageX - this.pointerDownPointer.pageX, y: e.pageY - this.pointerDownPointer.pageY };return !this.isDragging && this.hasDragStarted(n) && this._dragStart(t, e), n;
  }, i.hasDragStarted = function (t) {
    return Math.abs(t.x) > 3 || Math.abs(t.y) > 3;
  }, i.pointerUp = function (t, e) {
    this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e);
  }, i._dragPointerUp = function (t, e) {
    this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
  }, i._dragStart = function (t, e) {
    this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(t, e);
  }, i.dragStart = function (t, e) {
    this.emitEvent("dragStart", [t, e]);
  }, i._dragMove = function (t, e, n) {
    this.isDragging && this.dragMove(t, e, n);
  }, i.dragMove = function (t, e, n) {
    t.preventDefault(), this.emitEvent("dragMove", [t, e, n]);
  }, i._dragEnd = function (t, e) {
    this.isDragging = !1, setTimeout(function () {
      delete this.isPreventingClicks;
    }.bind(this)), this.dragEnd(t, e);
  }, i.dragEnd = function (t, e) {
    this.emitEvent("dragEnd", [t, e]);
  }, i.onclick = function (t) {
    this.isPreventingClicks && t.preventDefault();
  }, i._staticClick = function (t, e) {
    this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
      delete this.isIgnoringMouseUp;
    }.bind(this), 400)));
  }, i.staticClick = function (t, e) {
    this.emitEvent("staticClick", [t, e]);
  }, n.getPointerPoint = e.getPointerPoint, n;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (n, i, o) {
    return e(t, n, i, o);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils);
}(window, function (t, e, n, i) {
  i.extend(e.defaults, { draggable: ">1", dragThreshold: 3 }), e.createMethods.push("_createDrag");var o = e.prototype;i.extend(o, n.prototype), o._touchActionValue = "pan-y";var r = "createTouch" in document,
      s = !1;o._createDrag = function () {
    this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), r && !s && (t.addEventListener("touchmove", function () {}), s = !0);
  }, o.onActivateDrag = function () {
    this.handles = [this.viewport], this.bindHandles(), this.updateDraggable();
  }, o.onDeactivateDrag = function () {
    this.unbindHandles(), this.element.classList.remove("is-draggable");
  }, o.updateDraggable = function () {
    ">1" == this.options.draggable ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable");
  }, o.bindDrag = function () {
    this.options.draggable = !0, this.updateDraggable();
  }, o.unbindDrag = function () {
    this.options.draggable = !1, this.updateDraggable();
  }, o._uiChangeDrag = function () {
    delete this.isFreeScrolling;
  }, o.pointerDown = function (e, n) {
    this.isDraggable ? this.okayPointerDown(e) && (this._pointerDownPreventDefault(e), this.pointerDownFocus(e), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = l(), t.addEventListener("scroll", this), this._pointerDownDefault(e, n)) : this._pointerDownDefault(e, n);
  }, o._pointerDownDefault = function (t, e) {
    this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY }, this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e]);
  };var a = { INPUT: !0, TEXTAREA: !0, SELECT: !0 };function l() {
    return { x: t.pageXOffset, y: t.pageYOffset };
  }return o.pointerDownFocus = function (t) {
    a[t.target.nodeName] || this.focus();
  }, o._pointerDownPreventDefault = function (t) {
    var e = "touchstart" == t.type,
        n = "touch" == t.pointerType,
        i = a[t.target.nodeName];e || n || i || t.preventDefault();
  }, o.hasDragStarted = function (t) {
    return Math.abs(t.x) > this.options.dragThreshold;
  }, o.pointerUp = function (t, e) {
    delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e);
  }, o.pointerDone = function () {
    t.removeEventListener("scroll", this), delete this.pointerDownScroll;
  }, o.dragStart = function (e, n) {
    this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), t.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [n]));
  }, o.pointerMove = function (t, e) {
    var n = this._dragPointerMove(t, e);this.dispatchEvent("pointerMove", t, [e, n]), this._dragMove(t, e, n);
  }, o.dragMove = function (t, e, n) {
    if (this.isDraggable) {
      t.preventDefault(), this.previousDragX = this.dragX;var i = this.options.rightToLeft ? -1 : 1;this.options.wrapAround && (n.x = n.x % this.slideableWidth);var o = this.dragStartPosition + n.x * i;if (!this.options.wrapAround && this.slides.length) {
        var r = Math.max(-this.slides[0].target, this.dragStartPosition);o = o > r ? .5 * (o + r) : o;var s = Math.min(-this.getLastSlide().target, this.dragStartPosition);o = o < s ? .5 * (o + s) : o;
      }this.dragX = o, this.dragMoveTime = new Date(), this.dispatchEvent("dragMove", t, [e, n]);
    }
  }, o.dragEnd = function (t, e) {
    if (this.isDraggable) {
      this.options.freeScroll && (this.isFreeScrolling = !0);var n = this.dragEndRestingSelect();if (this.options.freeScroll && !this.options.wrapAround) {
        var i = this.getRestingPosition();this.isFreeScrolling = -i > this.slides[0].target && -i < this.getLastSlide().target;
      } else this.options.freeScroll || n != this.selectedIndex || (n += this.dragEndBoostSelect());delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(n), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e]);
    }
  }, o.dragEndRestingSelect = function () {
    var t = this.getRestingPosition(),
        e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
        n = this._getClosestResting(t, e, 1),
        i = this._getClosestResting(t, e, -1);return n.distance < i.distance ? n.index : i.index;
  }, o._getClosestResting = function (t, e, n) {
    for (var i = this.selectedIndex, o = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function (t, e) {
      return t <= e;
    } : function (t, e) {
      return t < e;
    }; r(e, o) && (i += n, o = e, null !== (e = this.getSlideDistance(-t, i)));) {
      e = Math.abs(e);
    }return { distance: o, index: i - n };
  }, o.getSlideDistance = function (t, e) {
    var n = this.slides.length,
        o = this.options.wrapAround && n > 1,
        r = o ? i.modulo(e, n) : e,
        s = this.slides[r];if (!s) return null;var a = o ? this.slideableWidth * Math.floor(e / n) : 0;return t - (s.target + a);
  }, o.dragEndBoostSelect = function () {
    if (void 0 === this.previousDragX || !this.dragMoveTime || new Date() - this.dragMoveTime > 100) return 0;var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
        e = this.previousDragX - this.dragX;return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0;
  }, o.staticClick = function (t, e) {
    var n = this.getParentCell(t.target),
        i = n && n.element,
        o = n && this.cells.indexOf(n);this.dispatchEvent("staticClick", t, [e, i, o]);
  }, o.onscroll = function () {
    var t = l(),
        e = this.pointerDownScroll.x - t.x,
        n = this.pointerDownScroll.y - t.y;(Math.abs(e) > 3 || Math.abs(n) > 3) && this._pointerDone();
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (n, i, o) {
    return e(t, n, i, o);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils);
}(window, function (t, e, n, i) {
  "use strict";
  var o = "http://www.w3.org/2000/svg";function r(t, e) {
    this.direction = t, this.parent = e, this._create();
  }r.prototype = Object.create(n.prototype), r.prototype._create = function () {
    this.isEnabled = !0, this.isPrevious = -1 == this.direction;var t = this.parent.options.rightToLeft ? 1 : -1;this.isLeft = this.direction == t;var e = this.element = document.createElement("button");e.className = "flickity-button flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");var n = this.createSVG();e.appendChild(n), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
  }, r.prototype.activate = function () {
    this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element);
  }, r.prototype.deactivate = function () {
    this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this);
  }, r.prototype.createSVG = function () {
    var t = document.createElementNS(o, "svg");t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");var e = document.createElementNS(o, "path"),
        n = function (t) {
      if ("string" == typeof t) return t;return "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z";
    }(this.parent.options.arrowShape);return e.setAttribute("d", n), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t;
  }, r.prototype.handleEvent = i.handleEvent, r.prototype.onclick = function () {
    if (this.isEnabled) {
      this.parent.uiChange();var t = this.isPrevious ? "previous" : "next";this.parent[t]();
    }
  }, r.prototype.enable = function () {
    this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0);
  }, r.prototype.disable = function () {
    this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1);
  }, r.prototype.update = function () {
    var t = this.parent.slides;if (this.parent.options.wrapAround && t.length > 1) this.enable();else {
      var e = t.length ? t.length - 1 : 0,
          n = this.isPrevious ? 0 : e;this[this.parent.selectedIndex == n ? "disable" : "enable"]();
    }
  }, r.prototype.destroy = function () {
    this.deactivate(), this.allOff();
  }, i.extend(e.defaults, { prevNextButtons: !0, arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 } }), e.createMethods.push("_createPrevNextButtons");var s = e.prototype;return s._createPrevNextButtons = function () {
    this.options.prevNextButtons && (this.prevButton = new r(-1, this), this.nextButton = new r(1, this), this.on("activate", this.activatePrevNextButtons));
  }, s.activatePrevNextButtons = function () {
    this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons);
  }, s.deactivatePrevNextButtons = function () {
    this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons);
  }, e.PrevNextButton = r, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (n, i, o) {
    return e(t, n, i, o);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils);
}(window, function (t, e, n, i) {
  function o(t) {
    this.parent = t, this._create();
  }o.prototype = Object.create(n.prototype), o.prototype._create = function () {
    this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.handleClick = this.onClick.bind(this), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
  }, o.prototype.activate = function () {
    this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder);
  }, o.prototype.deactivate = function () {
    this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder);
  }, o.prototype.setDots = function () {
    var t = this.parent.slides.length - this.dots.length;t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t);
  }, o.prototype.addDots = function (t) {
    for (var e = document.createDocumentFragment(), n = [], i = this.dots.length, o = i + t, r = i; r < o; r++) {
      var s = document.createElement("li");s.className = "dot", s.setAttribute("aria-label", "Page dot " + (r + 1)), e.appendChild(s), n.push(s);
    }this.holder.appendChild(e), this.dots = this.dots.concat(n);
  }, o.prototype.removeDots = function (t) {
    this.dots.splice(this.dots.length - t, t).forEach(function (t) {
      this.holder.removeChild(t);
    }, this);
  }, o.prototype.updateSelected = function () {
    this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"));
  }, o.prototype.onTap = o.prototype.onClick = function (t) {
    var e = t.target;if ("LI" == e.nodeName) {
      this.parent.uiChange();var n = this.dots.indexOf(e);this.parent.select(n);
    }
  }, o.prototype.destroy = function () {
    this.deactivate(), this.allOff();
  }, e.PageDots = o, i.extend(e.defaults, { pageDots: !0 }), e.createMethods.push("_createPageDots");var r = e.prototype;return r._createPageDots = function () {
    this.options.pageDots && (this.pageDots = new o(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots));
  }, r.activatePageDots = function () {
    this.pageDots.activate();
  }, r.updateSelectedPageDots = function () {
    this.pageDots.updateSelected();
  }, r.updatePageDots = function () {
    this.pageDots.setDots();
  }, r.deactivatePageDots = function () {
    this.pageDots.deactivate();
  }, e.PageDots = o, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function (t, n, i) {
    return e(t, n, i);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity);
}(window, function (t, e, n) {
  function i(t) {
    this.parent = t, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this);
  }i.prototype = Object.create(t.prototype), i.prototype.play = function () {
    "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()));
  }, i.prototype.tick = function () {
    if ("playing" == this.state) {
      var t = this.parent.options.autoPlay;t = "number" == typeof t ? t : 3e3;var e = this;this.clear(), this.timeout = setTimeout(function () {
        e.parent.next(!0), e.tick();
      }, t);
    }
  }, i.prototype.stop = function () {
    this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange);
  }, i.prototype.clear = function () {
    clearTimeout(this.timeout);
  }, i.prototype.pause = function () {
    "playing" == this.state && (this.state = "paused", this.clear());
  }, i.prototype.unpause = function () {
    "paused" == this.state && this.play();
  }, i.prototype.visibilityChange = function () {
    this[document.hidden ? "pause" : "unpause"]();
  }, i.prototype.visibilityPlay = function () {
    this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay);
  }, e.extend(n.defaults, { pauseAutoPlayOnHover: !0 }), n.createMethods.push("_createPlayer");var o = n.prototype;return o._createPlayer = function () {
    this.player = new i(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer);
  }, o.activatePlayer = function () {
    this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this));
  }, o.playPlayer = function () {
    this.player.play();
  }, o.stopPlayer = function () {
    this.player.stop();
  }, o.pausePlayer = function () {
    this.player.pause();
  }, o.unpausePlayer = function () {
    this.player.unpause();
  }, o.deactivatePlayer = function () {
    this.player.stop(), this.element.removeEventListener("mouseenter", this);
  }, o.onmouseenter = function () {
    this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this));
  }, o.onmouseleave = function () {
    this.player.unpause(), this.element.removeEventListener("mouseleave", this);
  }, n.Player = i, n;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (n, i) {
    return e(t, n, i);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils);
}(window, function (t, e, n) {
  var i = e.prototype;return i.insert = function (t, e) {
    var n = this._makeCells(t);if (n && n.length) {
      var i = this.cells.length;e = void 0 === e ? i : e;var o = function (t) {
        var e = document.createDocumentFragment();return t.forEach(function (t) {
          e.appendChild(t.element);
        }), e;
      }(n),
          r = e == i;if (r) this.slider.appendChild(o);else {
        var s = this.cells[e].element;this.slider.insertBefore(o, s);
      }if (0 === e) this.cells = n.concat(this.cells);else if (r) this.cells = this.cells.concat(n);else {
        var a = this.cells.splice(e, i - e);this.cells = this.cells.concat(n).concat(a);
      }this._sizeCells(n), this.cellChange(e, !0);
    }
  }, i.append = function (t) {
    this.insert(t, this.cells.length);
  }, i.prepend = function (t) {
    this.insert(t, 0);
  }, i.remove = function (t) {
    var e = this.getCells(t);if (e && e.length) {
      var i = this.cells.length - 1;e.forEach(function (t) {
        t.remove();var e = this.cells.indexOf(t);i = Math.min(e, i), n.removeFrom(this.cells, t);
      }, this), this.cellChange(i, !0);
    }
  }, i.cellSizeChange = function (t) {
    var e = this.getCell(t);if (e) {
      e.getSize();var n = this.cells.indexOf(e);this.cellChange(n);
    }
  }, i.cellChange = function (t, e) {
    var n = this.selectedElement;this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize();var i = this.getCell(n);i && (this.selectedIndex = this.getCellSlideIndex(i)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [t]), this.select(this.selectedIndex), e && this.positionSliderAtSelected();
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function (n, i) {
    return e(t, n, i);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils);
}(window, function (t, e, n) {
  "use strict";
  e.createMethods.push("_createLazyload");var i = e.prototype;function o(t, e) {
    this.img = t, this.flickity = e, this.load();
  }return i._createLazyload = function () {
    this.on("select", this.lazyLoad);
  }, i.lazyLoad = function () {
    var t = this.options.lazyLoad;if (t) {
      var e = "number" == typeof t ? t : 0,
          i = [];this.getAdjacentCellElements(e).forEach(function (t) {
        var e = function (t) {
          if ("IMG" == t.nodeName) {
            var e = t.getAttribute("data-flickity-lazyload"),
                i = t.getAttribute("data-flickity-lazyload-src"),
                o = t.getAttribute("data-flickity-lazyload-srcset");if (e || i || o) return [t];
          }var r = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");return n.makeArray(r);
        }(t);i = i.concat(e);
      }), i.forEach(function (t) {
        new o(t, this);
      }, this);
    }
  }, o.prototype.handleEvent = n.handleEvent, o.prototype.load = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this);var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
        e = this.img.getAttribute("data-flickity-lazyload-srcset");this.img.src = t, e && this.img.setAttribute("srcset", e), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset");
  }, o.prototype.onload = function (t) {
    this.complete(t, "flickity-lazyloaded");
  }, o.prototype.onerror = function (t) {
    this.complete(t, "flickity-lazyerror");
  }, o.prototype.complete = function (t, e) {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);var n = this.flickity.getParentCell(this.img),
        i = n && n.element;this.flickity.cellSizeChange(i), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, i);
  }, e.LazyLoader = o, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")));
}(window, function (t) {
  return t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils);
}(window, function (t, e) {
  t.createMethods.push("_createAsNavFor");var n = t.prototype;return n._createAsNavFor = function () {
    this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);var t = this.options.asNavFor;if (t) {
      var e = this;setTimeout(function () {
        e.setNavCompanion(t);
      });
    }
  }, n.setNavCompanion = function (n) {
    n = e.getQueryElement(n);var i = t.data(n);if (i && i != this) {
      this.navCompanion = i;var o = this;this.onNavCompanionSelect = function () {
        o.navCompanionSelect();
      }, i.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0);
    }
  }, n.navCompanionSelect = function (t) {
    if (this.navCompanion) {
      var e,
          n,
          i,
          o = this.navCompanion.selectedCells[0],
          r = this.navCompanion.cells.indexOf(o),
          s = r + this.navCompanion.selectedCells.length - 1,
          a = Math.floor((e = r, n = s, i = this.navCompanion.cellAlign, (n - e) * i + e));if (this.selectCell(a, !1, t), this.removeNavSelectedElements(), !(a >= this.cells.length)) {
        var l = this.cells.slice(r, s + 1);this.navSelectedElements = l.map(function (t) {
          return t.element;
        }), this.changeNavSelectedClass("add");
      }
    }
  }, n.changeNavSelectedClass = function (t) {
    this.navSelectedElements.forEach(function (e) {
      e.classList[t]("is-nav-selected");
    });
  }, n.activateAsNavFor = function () {
    this.navCompanionSelect(!0);
  }, n.removeNavSelectedElements = function () {
    this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements);
  }, n.onNavStaticClick = function (t, e, n, i) {
    "number" == typeof i && this.navCompanion.selectCell(i);
  }, n.deactivateAsNavFor = function () {
    this.removeNavSelectedElements();
  }, n.destroyAsNavFor = function () {
    this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion);
  }, t;
}), function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (n) {
    return e(t, n);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter);
}("undefined" != typeof window ? window : this, function (t, e) {
  var n = t.jQuery,
      i = t.console;function o(t, e) {
    for (var n in e) {
      t[n] = e[n];
    }return t;
  }var r = Array.prototype.slice;function s(t, e, a) {
    if (!(this instanceof s)) return new s(t, e, a);var l,
        c = t;("string" == typeof t && (c = document.querySelectorAll(t)), c) ? (this.elements = (l = c, Array.isArray(l) ? l : "object" == (typeof l === "undefined" ? "undefined" : _typeof(l)) && "number" == typeof l.length ? r.call(l) : [l]), this.options = o({}, this.options), "function" == typeof e ? a = e : o(this.options, e), a && this.on("always", a), this.getImages(), n && (this.jqDeferred = new n.Deferred()), setTimeout(this.check.bind(this))) : i.error("Bad element for imagesLoaded " + (c || t));
  }s.prototype = Object.create(e.prototype), s.prototype.options = {}, s.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  }, s.prototype.addElementImages = function (t) {
    "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);var e = t.nodeType;if (e && a[e]) {
      for (var n = t.querySelectorAll("img"), i = 0; i < n.length; i++) {
        var o = n[i];this.addImage(o);
      }if ("string" == typeof this.options.background) {
        var r = t.querySelectorAll(this.options.background);for (i = 0; i < r.length; i++) {
          var s = r[i];this.addElementBackgroundImages(s);
        }
      }
    }
  };var a = { 1: !0, 9: !0, 11: !0 };function l(t) {
    this.img = t;
  }function c(t, e) {
    this.url = t, this.element = e, this.img = new Image();
  }return s.prototype.addElementBackgroundImages = function (t) {
    var e = getComputedStyle(t);if (e) for (var n = /url\((['"])?(.*?)\1\)/gi, i = n.exec(e.backgroundImage); null !== i;) {
      var o = i && i[2];o && this.addBackground(o, t), i = n.exec(e.backgroundImage);
    }
  }, s.prototype.addImage = function (t) {
    var e = new l(t);this.images.push(e);
  }, s.prototype.addBackground = function (t, e) {
    var n = new c(t, e);this.images.push(n);
  }, s.prototype.check = function () {
    var t = this;function e(e, n, i) {
      setTimeout(function () {
        t.progress(e, n, i);
      });
    }this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function (t) {
      t.once("progress", e), t.check();
    }) : this.complete();
  }, s.prototype.progress = function (t, e, n) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && i && i.log("progress: " + n, t, e);
  }, s.prototype.complete = function () {
    var t = this.hasAnyBroken ? "fail" : "done";if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var e = this.hasAnyBroken ? "reject" : "resolve";this.jqDeferred[e](this);
    }
  }, l.prototype = Object.create(e.prototype), l.prototype.check = function () {
    this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src);
  }, l.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, l.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.img, e]);
  }, l.prototype.handleEvent = function (t) {
    var e = "on" + t.type;this[e] && this[e](t);
  }, l.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, l.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, l.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, c.prototype = Object.create(l.prototype), c.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, c.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, c.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.element, e]);
  }, s.makeJQueryPlugin = function (e) {
    (e = e || t.jQuery) && ((n = e).fn.imagesLoaded = function (t, e) {
      return new s(this, t, e).jqDeferred.promise(n(this));
    });
  }, s.makeJQueryPlugin(), s;
}), function (t, e) {
  "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function (n, i) {
    return e(t, n, i);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded);
}(window, function (t, e, n) {
  "use strict";
  e.createMethods.push("_createImagesLoaded");var i = e.prototype;return i._createImagesLoaded = function () {
    this.on("activate", this.imagesLoaded);
  }, i.imagesLoaded = function () {
    if (this.options.imagesLoaded) {
      var t = this;n(this.slider).on("progress", function (e, n) {
        var i = t.getParentCell(n.img);t.cellSizeChange(i && i.element), t.options.freeScroll || t.positionSliderAtSelected();
      });
    }
  }, e;
}), function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define([], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : t.Headroom = e();
}(this, function () {
  "use strict";
  var t = { bind: !!function () {}.bind, classList: "classList" in document.documentElement, rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) };function e(t) {
    this.callback = t, this.ticking = !1;
  }function n(t, e) {
    var i;e = function t(e) {
      if (arguments.length <= 0) throw new Error("Missing arguments in extend function");var n,
          i,
          o,
          r = e || {};for (i = 1; i < arguments.length; i++) {
        var s = arguments[i] || {};for (n in s) {
          "object" != _typeof(r[n]) || (o = r[n]) && "undefined" != typeof window && (o === window || o.nodeType) ? r[n] = r[n] || s[n] : r[n] = t(r[n], s[n]);
        }
      }return r;
    }(e, n.options), this.lastKnownScrollY = 0, this.elem = t, this.tolerance = (i = e.tolerance) === Object(i) ? i : { down: i, up: i }, this.classes = e.classes, this.offset = e.offset, this.scroller = e.scroller, this.initialised = !1, this.onPin = e.onPin, this.onUnpin = e.onUnpin, this.onTop = e.onTop, this.onNotTop = e.onNotTop, this.onBottom = e.onBottom, this.onNotBottom = e.onNotBottom;
  }return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, e.prototype = { constructor: e, update: function update() {
      this.callback && this.callback(), this.ticking = !1;
    }, requestTick: function requestTick() {
      this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0);
    }, handleEvent: function handleEvent() {
      this.requestTick();
    } }, n.prototype = { constructor: n, init: function init() {
      if (n.cutsTheMustard) return this.debouncer = new e(this.update.bind(this)), this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this;
    }, destroy: function destroy() {
      var t = this.classes;for (var e in this.initialised = !1, t) {
        t.hasOwnProperty(e) && this.elem.classList.remove(t[e]);
      }this.scroller.removeEventListener("scroll", this.debouncer, !1);
    }, attachEvent: function attachEvent() {
      this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent());
    }, unpin: function unpin() {
      var t = this.elem.classList,
          e = this.classes;!t.contains(e.pinned) && t.contains(e.unpinned) || (t.add(e.unpinned), t.remove(e.pinned), this.onUnpin && this.onUnpin.call(this));
    }, pin: function pin() {
      var t = this.elem.classList,
          e = this.classes;t.contains(e.unpinned) && (t.remove(e.unpinned), t.add(e.pinned), this.onPin && this.onPin.call(this));
    }, top: function top() {
      var t = this.elem.classList,
          e = this.classes;t.contains(e.top) || (t.add(e.top), t.remove(e.notTop), this.onTop && this.onTop.call(this));
    }, notTop: function notTop() {
      var t = this.elem.classList,
          e = this.classes;t.contains(e.notTop) || (t.add(e.notTop), t.remove(e.top), this.onNotTop && this.onNotTop.call(this));
    }, bottom: function bottom() {
      var t = this.elem.classList,
          e = this.classes;t.contains(e.bottom) || (t.add(e.bottom), t.remove(e.notBottom), this.onBottom && this.onBottom.call(this));
    }, notBottom: function notBottom() {
      var t = this.elem.classList,
          e = this.classes;t.contains(e.notBottom) || (t.add(e.notBottom), t.remove(e.bottom), this.onNotBottom && this.onNotBottom.call(this));
    }, getScrollY: function getScrollY() {
      return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }, getViewportHeight: function getViewportHeight() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }, getElementPhysicalHeight: function getElementPhysicalHeight(t) {
      return Math.max(t.offsetHeight, t.clientHeight);
    }, getScrollerPhysicalHeight: function getScrollerPhysicalHeight() {
      return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller);
    }, getDocumentHeight: function getDocumentHeight() {
      var t = document.body,
          e = document.documentElement;return Math.max(t.scrollHeight, e.scrollHeight, t.offsetHeight, e.offsetHeight, t.clientHeight, e.clientHeight);
    }, getElementHeight: function getElementHeight(t) {
      return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight);
    }, getScrollerHeight: function getScrollerHeight() {
      return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller);
    }, isOutOfBounds: function isOutOfBounds(t) {
      var e = t < 0,
          n = t + this.getScrollerPhysicalHeight() > this.getScrollerHeight();return e || n;
    }, toleranceExceeded: function toleranceExceeded(t, e) {
      return Math.abs(t - this.lastKnownScrollY) >= this.tolerance[e];
    }, shouldUnpin: function shouldUnpin(t, e) {
      var n = t > this.lastKnownScrollY,
          i = t >= this.offset;return n && i && e;
    }, shouldPin: function shouldPin(t, e) {
      var n = t < this.lastKnownScrollY,
          i = t <= this.offset;return n && e || i;
    }, update: function update() {
      var t = this.getScrollY(),
          e = t > this.lastKnownScrollY ? "down" : "up",
          n = this.toleranceExceeded(t, e);this.isOutOfBounds(t) || (t <= this.offset ? this.top() : this.notTop(), t + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(), this.shouldUnpin(t, n) ? this.unpin() : this.shouldPin(t, n) && this.pin(), this.lastKnownScrollY = t);
    } }, n.options = { tolerance: { up: 0, down: 0 }, offset: 0, scroller: window, classes: { pinned: "headroom--pinned", unpinned: "headroom--unpinned", top: "headroom--top", notTop: "headroom--not-top", bottom: "headroom--bottom", notBottom: "headroom--not-bottom", initial: "headroom" } }, n.cutsTheMustard = void 0 !== t && t.rAF && t.bind && t.classList, n;
}), function (t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function (t) {
  "use strict";
  var e = t.scrollTo = function (e, n, i) {
    return t(window).scrollTo(e, n, i);
  };function n(e) {
    return !e.nodeName || -1 !== t.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
  }function i(e) {
    return t.isFunction(e) || t.isPlainObject(e) ? e : { top: e, left: e };
  }return e.defaults = { axis: "xy", duration: 0, limit: !0 }, t.fn.scrollTo = function (o, r, s) {
    "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && (s = r, r = 0), "function" == typeof s && (s = { onAfter: s }), "max" === o && (o = 9e9), s = t.extend({}, e.defaults, s), r = r || s.duration;var a = s.queue && s.axis.length > 1;return a && (r /= 2), s.offset = i(s.offset), s.over = i(s.over), this.each(function () {
      if (null !== o) {
        var l,
            c = n(this),
            u = c ? this.contentWindow || window : this,
            h = t(u),
            d = o,
            f = {};switch (typeof d === "undefined" ? "undefined" : _typeof(d)) {case "number":case "string":
            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(d)) {
              d = i(d);break;
            }d = c ? t(d) : t(d, u);case "object":
            if (0 === d.length) return;(d.is || d.style) && (l = (d = t(d)).offset());}var p = t.isFunction(s.offset) && s.offset(u, d) || s.offset;t.each(s.axis.split(""), function (t, n) {
          var i = "x" === n ? "Left" : "Top",
              o = i.toLowerCase(),
              r = "scroll" + i,
              m = h[r](),
              v = e.max(u, n);if (l) f[r] = l[o] + (c ? 0 : m - h.offset()[o]), s.margin && (f[r] -= parseInt(d.css("margin" + i), 10) || 0, f[r] -= parseInt(d.css("border" + i + "Width"), 10) || 0), f[r] += p[o] || 0, s.over[o] && (f[r] += d["x" === n ? "width" : "height"]() * s.over[o]);else {
            var y = d[o];f[r] = y.slice && "%" === y.slice(-1) ? parseFloat(y) / 100 * v : y;
          }s.limit && /^\d+$/.test(f[r]) && (f[r] = f[r] <= 0 ? 0 : Math.min(f[r], v)), !t && s.axis.length > 1 && (m === f[r] ? f = {} : a && (g(s.onAfterFirst), f = {}));
        }), g(s.onAfter);
      }function g(e) {
        var n = t.extend({}, s, { queue: !0, duration: r, complete: e && function () {
            e.call(u, d, s);
          } });h.animate(f, n);
      }
    });
  }, e.max = function (e, i) {
    var o = "x" === i ? "Width" : "Height",
        r = "scroll" + o;if (!n(e)) return e[r] - t(e)[o.toLowerCase()]();var s = "client" + o,
        a = e.ownerDocument || e.document,
        l = a.documentElement,
        c = a.body;return Math.max(l[r], c[r]) - Math.min(l[s], c[s]);
  }, t.Tween.propHooks.scrollLeft = t.Tween.propHooks.scrollTop = { get: function get(e) {
      return t(e.elem)[e.prop]();
    }, set: function set(e) {
      var n = this.get(e);if (e.options.interrupt && e._last && e._last !== n) return t(e.elem).stop();var i = Math.round(e.now);n !== i && (t(e.elem)[e.prop](i), e._last = this.get(e));
    } }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define([], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "undefined" != typeof exports ? module.exports = e() : t.Papa = e();
}(this, function t() {
  "use strict";
  var e = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : {};var n = !e.document && !!e.postMessage,
      i = n && /blob:/i.test((e.location || {}).protocol),
      o = {},
      r = 0,
      s = { parse: function parse(n, i) {
      var a = (i = i || {}).dynamicTyping || !1;w(a) && (i.dynamicTypingFunction = a, a = {});if (i.dynamicTyping = a, i.transform = !!w(i.transform) && i.transform, i.worker && s.WORKERS_SUPPORTED) {
        var l = function () {
          if (!s.WORKERS_SUPPORTED) return !1;var n = (a = e.URL || e.webkitURL || null, l = t.toString(), s.BLOB_URL || (s.BLOB_URL = a.createObjectURL(new Blob(["(", l, ")();"], { type: "text/javascript" })))),
              i = new e.Worker(n);var a, l;return i.onmessage = v, i.id = r++, o[i.id] = i, i;
        }();return l.userStep = i.step, l.userChunk = i.chunk, l.userComplete = i.complete, l.userError = i.error, i.step = w(i.step), i.chunk = w(i.chunk), i.complete = w(i.complete), i.error = w(i.error), delete i.worker, void l.postMessage({ input: n, config: i, workerId: l.id });
      }var p = null;if (n === s.NODE_STREAM_INPUT && "undefined" == typeof PAPA_BROWSER_CONTEXT) return (p = new f(i)).getStream();"string" == typeof n ? p = i.download ? new c(i) : new h(i) : !0 === n.readable && w(n.read) && w(n.on) ? p = new d(i) : (e.File && n instanceof File || n instanceof Object) && (p = new u(i));return p.stream(n);
    }, unparse: function unparse(t, e) {
      var n = !1,
          i = !0,
          o = ",",
          r = "\r\n",
          a = '"',
          l = a + a,
          c = !1,
          u = null;!function () {
        if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) return;"string" != typeof e.delimiter || s.BAD_DELIMITERS.filter(function (t) {
          return -1 !== e.delimiter.indexOf(t);
        }).length || (o = e.delimiter);("boolean" == typeof e.quotes || "function" == typeof e.quotes || Array.isArray(e.quotes)) && (n = e.quotes);"boolean" != typeof e.skipEmptyLines && "string" != typeof e.skipEmptyLines || (c = e.skipEmptyLines);"string" == typeof e.newline && (r = e.newline);"string" == typeof e.quoteChar && (a = e.quoteChar);"boolean" == typeof e.header && (i = e.header);if (Array.isArray(e.columns)) {
          if (0 === e.columns.length) throw new Error("Option columns is empty");u = e.columns;
        }void 0 !== e.escapeChar && (l = e.escapeChar + a);
      }();var h = new RegExp(g(a), "g");"string" == typeof t && (t = JSON.parse(t));if (Array.isArray(t)) {
        if (!t.length || Array.isArray(t[0])) return f(null, t, c);if ("object" == _typeof(t[0])) return f(u || d(t[0]), t, c);
      } else if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) return "string" == typeof t.data && (t.data = JSON.parse(t.data)), Array.isArray(t.data) && (t.fields || (t.fields = t.meta && t.meta.fields), t.fields || (t.fields = Array.isArray(t.data[0]) ? t.fields : d(t.data[0])), Array.isArray(t.data[0]) || "object" == _typeof(t.data[0]) || (t.data = [t.data])), f(t.fields || [], t.data || [], c);throw new Error("Unable to serialize unrecognized input");function d(t) {
        if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) return [];var e = [];for (var n in t) {
          e.push(n);
        }return e;
      }function f(t, e, n) {
        var s = "";"string" == typeof t && (t = JSON.parse(t)), "string" == typeof e && (e = JSON.parse(e));var a = Array.isArray(t) && t.length > 0,
            l = !Array.isArray(e[0]);if (a && i) {
          for (var c = 0; c < t.length; c++) {
            c > 0 && (s += o), s += p(t[c], c);
          }e.length > 0 && (s += r);
        }for (var u = 0; u < e.length; u++) {
          var h = a ? t.length : e[u].length,
              d = !1,
              f = a ? 0 === Object.keys(e[u]).length : 0 === e[u].length;if (n && !a && (d = "greedy" === n ? "" === e[u].join("").trim() : 1 === e[u].length && 0 === e[u][0].length), "greedy" === n && a) {
            for (var g = [], m = 0; m < h; m++) {
              var v = l ? t[m] : m;g.push(e[u][v]);
            }d = "" === g.join("").trim();
          }if (!d) {
            for (var y = 0; y < h; y++) {
              y > 0 && !f && (s += o);var _ = a && l ? t[y] : y;s += p(e[u][_], y);
            }u < e.length - 1 && (!n || h > 0 && !f) && (s += r);
          }
        }return s;
      }function p(t, e) {
        if (void 0 === t || null === t) return "";if (t.constructor === Date) return JSON.stringify(t).slice(1, 25);var i = t.toString().replace(h, l),
            r = "boolean" == typeof n && n || "function" == typeof n && n(t, e) || Array.isArray(n) && n[e] || function (t, e) {
          for (var n = 0; n < e.length; n++) {
            if (t.indexOf(e[n]) > -1) return !0;
          }return !1;
        }(i, s.BAD_DELIMITERS) || i.indexOf(o) > -1 || " " === i.charAt(0) || " " === i.charAt(i.length - 1);return r ? a + i + a : i;
      }
    } };if (s.RECORD_SEP = String.fromCharCode(30), s.UNIT_SEP = String.fromCharCode(31), s.BYTE_ORDER_MARK = "\uFEFF", s.BAD_DELIMITERS = ["\r", "\n", '"', s.BYTE_ORDER_MARK], s.WORKERS_SUPPORTED = !n && !!e.Worker, s.NODE_STREAM_INPUT = 1, s.LocalChunkSize = 10485760, s.RemoteChunkSize = 5242880, s.DefaultDelimiter = ",", s.Parser = m, s.ParserHandle = p, s.NetworkStreamer = c, s.FileStreamer = u, s.StringStreamer = h, s.ReadableStreamStreamer = d, "undefined" == typeof PAPA_BROWSER_CONTEXT && (s.DuplexStreamStreamer = f), e.jQuery) {
    var a = e.jQuery;a.fn.parse = function (t) {
      var n = t.config || {},
          i = [];return this.each(function (t) {
        if (!("INPUT" === a(this).prop("tagName").toUpperCase() && "file" === a(this).attr("type").toLowerCase() && e.FileReader) || !this.files || 0 === this.files.length) return !0;for (var o = 0; o < this.files.length; o++) {
          i.push({ file: this.files[o], inputElem: this, instanceConfig: a.extend({}, n) });
        }
      }), o(), this;function o() {
        if (0 !== i.length) {
          var e,
              n,
              o,
              l,
              c = i[0];if (w(t.before)) {
            var u = t.before(c.file, c.inputElem);if ("object" == (typeof u === "undefined" ? "undefined" : _typeof(u))) {
              if ("abort" === u.action) return e = "AbortError", n = c.file, o = c.inputElem, l = u.reason, void (w(t.error) && t.error({ name: e }, n, o, l));if ("skip" === u.action) return void r();"object" == _typeof(u.config) && (c.instanceConfig = a.extend(c.instanceConfig, u.config));
            } else if ("skip" === u) return void r();
          }var h = c.instanceConfig.complete;c.instanceConfig.complete = function (t) {
            w(h) && h(t, c.file, c.inputElem), r();
          }, s.parse(c.file, c.instanceConfig);
        } else w(t.complete) && t.complete();
      }function r() {
        i.splice(0, 1), o();
      }
    };
  }function l(t) {
    this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, function (t) {
      var e = b(t);e.chunkSize = parseInt(e.chunkSize), t.step || t.chunk || (e.chunkSize = null);this._handle = new p(e), this._handle.streamer = this, this._config = e;
    }.call(this, t), this.parseChunk = function (t, n) {
      if (this.isFirstChunk && w(this._config.beforeFirstChunk)) {
        var o = this._config.beforeFirstChunk(t);void 0 !== o && (t = o);
      }this.isFirstChunk = !1, this._halted = !1;var r = this._partialLine + t;this._partialLine = "";var a = this._handle.parse(r, this._baseIndex, !this._finished);if (!this._handle.paused() && !this._handle.aborted()) {
        var l = a.meta.cursor;this._finished || (this._partialLine = r.substring(l - this._baseIndex), this._baseIndex = l), a && a.data && (this._rowCount += a.data.length);var c = this._finished || this._config.preview && this._rowCount >= this._config.preview;if (i) e.postMessage({ results: a, workerId: s.WORKER_ID, finished: c });else if (w(this._config.chunk) && !n) {
          if (this._config.chunk(a, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);a = void 0, this._completeResults = void 0;
        }return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(a.data), this._completeResults.errors = this._completeResults.errors.concat(a.errors), this._completeResults.meta = a.meta), this._completed || !c || !w(this._config.complete) || a && a.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), c || a && a.meta.paused || this._nextChunk(), a;
      }this._halted = !0;
    }, this._sendError = function (t) {
      w(this._config.error) ? this._config.error(t) : i && this._config.error && e.postMessage({ workerId: s.WORKER_ID, error: t, finished: !1 });
    };
  }function c(t) {
    var e;(t = t || {}).chunkSize || (t.chunkSize = s.RemoteChunkSize), l.call(this, t), this._nextChunk = n ? function () {
      this._readChunk(), this._chunkLoaded();
    } : function () {
      this._readChunk();
    }, this.stream = function (t) {
      this._input = t, this._nextChunk();
    }, this._readChunk = function () {
      if (this._finished) this._chunkLoaded();else {
        if (e = new XMLHttpRequest(), this._config.withCredentials && (e.withCredentials = this._config.withCredentials), n || (e.onload = E(this._chunkLoaded, this), e.onerror = E(this._chunkError, this)), e.open("GET", this._input, !n), this._config.downloadRequestHeaders) {
          var t = this._config.downloadRequestHeaders;for (var i in t) {
            e.setRequestHeader(i, t[i]);
          }
        }if (this._config.chunkSize) {
          var o = this._start + this._config.chunkSize - 1;e.setRequestHeader("Range", "bytes=" + this._start + "-" + o);
        }try {
          e.send();
        } catch (t) {
          this._chunkError(t.message);
        }n && 0 === e.status && this._chunkError();
      }
    }, this._chunkLoaded = function () {
      4 === e.readyState && (e.status < 200 || e.status >= 400 ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : e.responseText.length, this._finished = !this._config.chunkSize || this._start >= function (t) {
        var e = t.getResponseHeader("Content-Range");if (null === e) return -1;return parseInt(e.substring(e.lastIndexOf("/") + 1));
      }(e), this.parseChunk(e.responseText)));
    }, this._chunkError = function (t) {
      var n = e.statusText || t;this._sendError(new Error(n));
    };
  }function u(t) {
    var e, n;(t = t || {}).chunkSize || (t.chunkSize = s.LocalChunkSize), l.call(this, t);var i = "undefined" != typeof FileReader;this.stream = function (t) {
      this._input = t, n = t.slice || t.webkitSlice || t.mozSlice, i ? ((e = new FileReader()).onload = E(this._chunkLoaded, this), e.onerror = E(this._chunkError, this)) : e = new FileReaderSync(), this._nextChunk();
    }, this._nextChunk = function () {
      this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
    }, this._readChunk = function () {
      var t = this._input;if (this._config.chunkSize) {
        var o = Math.min(this._start + this._config.chunkSize, this._input.size);t = n.call(t, this._start, o);
      }var r = e.readAsText(t, this._config.encoding);i || this._chunkLoaded({ target: { result: r } });
    }, this._chunkLoaded = function (t) {
      this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(t.target.result);
    }, this._chunkError = function () {
      this._sendError(e.error);
    };
  }function h(t) {
    var e;t = t || {}, l.call(this, t), this.stream = function (t) {
      return e = t, this._nextChunk();
    }, this._nextChunk = function () {
      if (!this._finished) {
        var t,
            n = this._config.chunkSize;return n ? (t = e.substring(0, n), e = e.substring(n)) : (t = e, e = ""), this._finished = !e, this.parseChunk(t);
      }
    };
  }function d(t) {
    t = t || {}, l.call(this, t);var e = [],
        n = !0,
        i = !1;this.pause = function () {
      l.prototype.pause.apply(this, arguments), this._input.pause();
    }, this.resume = function () {
      l.prototype.resume.apply(this, arguments), this._input.resume();
    }, this.stream = function (t) {
      this._input = t, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
    }, this._checkIsFinished = function () {
      i && 1 === e.length && (this._finished = !0);
    }, this._nextChunk = function () {
      this._checkIsFinished(), e.length ? this.parseChunk(e.shift()) : n = !0;
    }, this._streamData = E(function (t) {
      try {
        e.push("string" == typeof t ? t : t.toString(this._config.encoding)), n && (n = !1, this._checkIsFinished(), this.parseChunk(e.shift()));
      } catch (t) {
        this._streamError(t);
      }
    }, this), this._streamError = E(function (t) {
      this._streamCleanUp(), this._sendError(t);
    }, this), this._streamEnd = E(function () {
      this._streamCleanUp(), i = !0, this._streamData("");
    }, this), this._streamCleanUp = E(function () {
      this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
    }, this);
  }function f(t) {
    var e = require("stream").Duplex,
        n = b(t),
        i = !0,
        o = !1,
        r = [],
        s = null;this._onCsvData = function (t) {
      var e = t.data;s.push(e) || this._handle.paused() || this._handle.pause();
    }, this._onCsvComplete = function () {
      s.push(null);
    }, n.step = E(this._onCsvData, this), n.complete = E(this._onCsvComplete, this), l.call(this, n), this._nextChunk = function () {
      o && 1 === r.length && (this._finished = !0), r.length ? r.shift()() : i = !0;
    }, this._addToParseQueue = function (t, e) {
      r.push(E(function () {
        if (this.parseChunk("string" == typeof t ? t : t.toString(n.encoding)), w(e)) return e();
      }, this)), i && (i = !1, this._nextChunk());
    }, this._onRead = function () {
      this._handle.paused() && this._handle.resume();
    }, this._onWrite = function (t, e, n) {
      this._addToParseQueue(t, n);
    }, this._onWriteComplete = function () {
      o = !0, this._addToParseQueue("");
    }, this.getStream = function () {
      return s;
    }, (s = new e({ readableObjectMode: !0, decodeStrings: !1, read: E(this._onRead, this), write: E(this._onWrite, this) })).once("finish", E(this._onWriteComplete, this));
  }function p(t) {
    var e,
        n,
        i,
        o = Math.pow(2, 53),
        r = -o,
        a = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,
        l = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
        c = this,
        u = 0,
        h = 0,
        d = !1,
        f = !1,
        p = [],
        v = { data: [], errors: [], meta: {} };if (w(t.step)) {
      var y = t.step;t.step = function (e) {
        if (v = e, C()) E();else {
          if (E(), 0 === v.data.length) return;u += e.data.length, t.preview && u > t.preview ? n.abort() : (v.data = v.data[0], y(v, c));
        }
      };
    }function _(e) {
      return "greedy" === t.skipEmptyLines ? "" === e.join("").trim() : 1 === e.length && 0 === e[0].length;
    }function E() {
      if (v && i && (S("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + s.DefaultDelimiter + "'"), i = !1), t.skipEmptyLines) for (var e = 0; e < v.data.length; e++) {
        _(v.data[e]) && v.data.splice(e--, 1);
      }return C() && function () {
        if (!v) return;function e(e) {
          w(t.transformHeader) && (e = t.transformHeader(e)), p.push(e);
        }if (Array.isArray(v.data[0])) {
          for (var n = 0; C() && n < v.data.length; n++) {
            v.data[n].forEach(e);
          }v.data.splice(0, 1);
        } else v.data.forEach(e);
      }(), function () {
        if (!v || !t.header && !t.dynamicTyping && !t.transform) return v;function e(e, n) {
          var i,
              o = t.header ? {} : [];for (i = 0; i < e.length; i++) {
            var r = i,
                s = e[i];t.header && (r = i >= p.length ? "__parsed_extra" : p[i]), t.transform && (s = t.transform(s, r)), s = x(r, s), "__parsed_extra" === r ? (o[r] = o[r] || [], o[r].push(s)) : o[r] = s;
          }return t.header && (i > p.length ? S("FieldMismatch", "TooManyFields", "Too many fields: expected " + p.length + " fields but parsed " + i, h + n) : i < p.length && S("FieldMismatch", "TooFewFields", "Too few fields: expected " + p.length + " fields but parsed " + i, h + n)), o;
        }var n = 1;!v.data.length || Array.isArray(v.data[0]) ? (v.data = v.data.map(e), n = v.data.length) : v.data = e(v.data, 0);t.header && v.meta && (v.meta.fields = p);return h += n, v;
      }();
    }function C() {
      return t.header && 0 === p.length;
    }function x(e, n) {
      return function (e) {
        return t.dynamicTypingFunction && void 0 === t.dynamicTyping[e] && (t.dynamicTyping[e] = t.dynamicTypingFunction(e)), !0 === (t.dynamicTyping[e] || t.dynamicTyping);
      }(e) ? "true" === n || "TRUE" === n || "false" !== n && "FALSE" !== n && (function (t) {
        if (a.test(t)) {
          var e = parseFloat(t);if (e > r && e < o) return !0;
        }return !1;
      }(n) ? parseFloat(n) : l.test(n) ? new Date(n) : "" === n ? null : n) : n;
    }function S(t, e, n, i) {
      var o = { type: t, code: e, message: n };void 0 !== i && (o.row = i), v.errors.push(o);
    }this.parse = function (o, r, a) {
      var l = t.quoteChar || '"';if (t.newline || (t.newline = function (t, e) {
        t = t.substring(0, 1048576);var n = new RegExp(g(e) + "([^]*?)" + g(e), "gm"),
            i = (t = t.replace(n, "")).split("\r"),
            o = t.split("\n"),
            r = o.length > 1 && o[0].length < i[0].length;if (1 === i.length || r) return "\n";for (var s = 0, a = 0; a < i.length; a++) {
          "\n" === i[a][0] && s++;
        }return s >= i.length / 2 ? "\r\n" : "\r";
      }(o, l)), i = !1, t.delimiter) w(t.delimiter) && (t.delimiter = t.delimiter(o), v.meta.delimiter = t.delimiter);else {
        var c = function (e, n, i, o, r) {
          var a, l, c, u;r = r || [",", "\t", "|", ";", s.RECORD_SEP, s.UNIT_SEP];for (var h = 0; h < r.length; h++) {
            var d = r[h],
                f = 0,
                p = 0,
                g = 0;c = void 0;for (var v = new m({ comments: o, delimiter: d, newline: n, preview: 10 }).parse(e), y = 0; y < v.data.length; y++) {
              if (i && _(v.data[y])) g++;else {
                var b = v.data[y].length;p += b, void 0 !== c ? b > 0 && (f += Math.abs(b - c), c = b) : c = b;
              }
            }v.data.length > 0 && (p /= v.data.length - g), (void 0 === l || f <= l) && (void 0 === u || p > u) && p > 1.99 && (l = f, a = d, u = p);
          }return t.delimiter = a, { successful: !!a, bestDelimiter: a };
        }(o, t.newline, t.skipEmptyLines, t.comments, t.delimitersToGuess);c.successful ? t.delimiter = c.bestDelimiter : (i = !0, t.delimiter = s.DefaultDelimiter), v.meta.delimiter = t.delimiter;
      }var u = b(t);return t.preview && t.header && u.preview++, e = o, n = new m(u), v = n.parse(e, r, a), E(), d ? { meta: { paused: !0 } } : v || { meta: { paused: !1 } };
    }, this.paused = function () {
      return d;
    }, this.pause = function () {
      d = !0, n.abort(), e = w(t.chunk) ? "" : e.substring(n.getCharIndex());
    }, this.resume = function () {
      c.streamer._halted ? (d = !1, c.streamer.parseChunk(e, !0)) : setTimeout(this.resume, 3);
    }, this.aborted = function () {
      return f;
    }, this.abort = function () {
      f = !0, n.abort(), v.meta.aborted = !0, w(t.complete) && t.complete(v), e = "";
    };
  }function g(t) {
    return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }function m(t) {
    var e,
        n = (t = t || {}).delimiter,
        i = t.newline,
        o = t.comments,
        r = t.step,
        a = t.preview,
        l = t.fastMode,
        c = e = void 0 === t.quoteChar ? '"' : t.quoteChar;if (void 0 !== t.escapeChar && (c = t.escapeChar), ("string" != typeof n || s.BAD_DELIMITERS.indexOf(n) > -1) && (n = ","), o === n) throw new Error("Comment character same as delimiter");!0 === o ? o = "#" : ("string" != typeof o || s.BAD_DELIMITERS.indexOf(o) > -1) && (o = !1), "\n" !== i && "\r" !== i && "\r\n" !== i && (i = "\n");var u = 0,
        h = !1;this.parse = function (t, s, d) {
      if ("string" != typeof t) throw new Error("Input must be a string");var f = t.length,
          p = n.length,
          m = i.length,
          v = o.length,
          y = w(r);u = 0;var _ = [],
          b = [],
          E = [],
          C = 0;if (!t) return q();if (l || !1 !== l && -1 === t.indexOf(e)) {
        for (var x = t.split(i), S = 0; S < x.length; S++) {
          if (E = x[S], u += E.length, S !== x.length - 1) u += i.length;else if (d) return q();if (!o || E.substring(0, v) !== o) {
            if (y) {
              if (_ = [], O(E.split(n)), M(), h) return q();
            } else O(E.split(n));if (a && S >= a) return _ = _.slice(0, a), q(!0);
          }
        }return q();
      }for (var T = t.indexOf(n, u), D = t.indexOf(i, u), k = new RegExp(g(c) + g(e), "g"), A = t.indexOf(e, u);;) {
        if (t[u] !== e) {
          if (o && 0 === E.length && t.substring(u, u + v) === o) {
            if (-1 === D) return q();u = D + m, D = t.indexOf(i, u), T = t.indexOf(n, u);
          } else {
            if (-1 !== T && (T < D || -1 === D)) {
              if (!(A > T)) {
                E.push(t.substring(u, T)), u = T + p, T = t.indexOf(n, u);continue;
              }var I = H(T, A, D);if (I && void 0 !== I.nextDelim) {
                T = I.nextDelim, A = I.quoteSearch, E.push(t.substring(u, T)), u = T + p, T = t.indexOf(n, u);continue;
              }
            }if (-1 === D) break;if (E.push(t.substring(u, D)), R(D + m), y && (M(), h)) return q();if (a && _.length >= a) return q(!0);
          }
        } else for (A = u, u++;;) {
          if (-1 === (A = t.indexOf(e, A + 1))) return d || b.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: _.length, index: u }), j();if (A === f - 1) return j(t.substring(u, A).replace(k, e));if (e !== c || t[A + 1] !== c) {
            if (e === c || 0 === A || t[A - 1] !== c) {
              -1 !== T && T < A + 1 && (T = t.indexOf(n, A + 1)), -1 !== D && D < A + 1 && (D = t.indexOf(i, A + 1));var N = P(-1 === D ? T : Math.min(T, D));if (t[A + 1 + N] === n) {
                E.push(t.substring(u, A).replace(k, e)), u = A + 1 + N + p, t[A + 1 + N + p] !== e && (A = t.indexOf(e, u)), T = t.indexOf(n, u), D = t.indexOf(i, u);break;
              }var L = P(D);if (t.substring(A + 1 + L, A + 1 + L + m) === i) {
                if (E.push(t.substring(u, A).replace(k, e)), R(A + 1 + L + m), T = t.indexOf(n, u), A = t.indexOf(e, u), y && (M(), h)) return q();if (a && _.length >= a) return q(!0);break;
              }b.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: _.length, index: u }), A++;
            }
          } else A++;
        }
      }return j();function O(t) {
        _.push(t), C = u;
      }function P(e) {
        var n = 0;if (-1 !== e) {
          var i = t.substring(A + 1, e);i && "" === i.trim() && (n = i.length);
        }return n;
      }function j(e) {
        return d ? q() : (void 0 === e && (e = t.substring(u)), E.push(e), u = f, O(E), y && M(), q());
      }function R(e) {
        u = e, O(E), E = [], D = t.indexOf(i, u);
      }function q(t) {
        return { data: _, errors: b, meta: { delimiter: n, linebreak: i, aborted: h, truncated: !!t, cursor: C + (s || 0) } };
      }function M() {
        r(q()), _ = [], b = [];
      }function H(i, o, r) {
        var s = { nextDelim: void 0, quoteSearch: void 0 },
            a = t.indexOf(e, o + 1);if (i > o && i < a && (a < r || -1 === r)) {
          var l = t.indexOf(n, a);if (-1 === l) return s;l > a && (a = t.indexOf(e, a + 1)), s = H(l, a, r);
        } else s = { nextDelim: i, quoteSearch: o };return s;
      }
    }, this.abort = function () {
      h = !0;
    }, this.getCharIndex = function () {
      return u;
    };
  }function v(t) {
    var e = t.data,
        n = o[e.workerId],
        i = !1;if (e.error) n.userError(e.error, e.file);else if (e.results && e.results.data) {
      var r = { abort: function abort() {
          i = !0, y(e.workerId, { data: [], errors: [], meta: { aborted: !0 } });
        }, pause: _, resume: _ };if (w(n.userStep)) {
        for (var s = 0; s < e.results.data.length && (n.userStep({ data: e.results.data[s], errors: e.results.errors, meta: e.results.meta }, r), !i); s++) {}delete e.results;
      } else w(n.userChunk) && (n.userChunk(e.results, r, e.file), delete e.results);
    }e.finished && !i && y(e.workerId, e.results);
  }function y(t, e) {
    var n = o[t];w(n.userComplete) && n.userComplete(e), n.terminate(), delete o[t];
  }function _() {
    throw new Error("Not implemented.");
  }function b(t) {
    if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) || null === t) return t;var e = Array.isArray(t) ? [] : {};for (var n in t) {
      e[n] = b(t[n]);
    }return e;
  }function E(t, e) {
    return function () {
      t.apply(e, arguments);
    };
  }function w(t) {
    return "function" == typeof t;
  }return i && (e.onmessage = function (t) {
    var n = t.data;void 0 === s.WORKER_ID && n && (s.WORKER_ID = n.workerId);if ("string" == typeof n.input) e.postMessage({ workerId: s.WORKER_ID, results: s.parse(n.input, n.config), finished: !0 });else if (e.File && n.input instanceof File || n.input instanceof Object) {
      var i = s.parse(n.input, n.config);i && e.postMessage({ workerId: s.WORKER_ID, results: i, finished: !0 });
    }
  }), c.prototype = Object.create(l.prototype), c.prototype.constructor = c, u.prototype = Object.create(l.prototype), u.prototype.constructor = u, h.prototype = Object.create(h.prototype), h.prototype.constructor = h, d.prototype = Object.create(l.prototype), d.prototype.constructor = d, "undefined" == typeof PAPA_BROWSER_CONTEXT && (f.prototype = Object.create(l.prototype), f.prototype.constructor = f), s;
}), function (t) {
  "use strict";
  var e = {},
      n = ["xs", "sm", "md", "lg", "xl", "xxl"];function i() {
    var n = t("body");1 != t(".lv-screen-data").length && n.append('<div class="lv-screen-data"></div>');var i,
        o,
        r = window.innerWidth,
        s = window.innerHeight,
        a = t(window).width(),
        l = t(window).height();r < e.sm && (i = "xs"), r >= e.sm && r < e.md && (i = "sm"), r >= e.md && r < e.lg && (i = "md"), r >= e.lg && r < e.xl && (i = "lg"), r >= e.xl && r < e.xxl && (i = "xl"), r >= e.xxl && (i = "xxl"), a < e.sm && (o = "xs"), a >= e.sm && a < e.md && (o = "sm"), a >= e.md && a < e.lg && (o = "md"), a >= e.lg && a < e.xl && (o = "lg"), a >= e.xl && a < e.xxl && (o = "xl"), a >= e.xxl && (o = "xxl"), t(".lv-screen-data").html(a + " x " + l + "<br><small>" + r + " x " + s + "</small><br>" + i + "  [" + o + "]").css({ position: "fixed", top: 0, padding: "5px 10px", background: "rgba(0,0,0,0.5)", "font-family": "Helvetica Neue", "font-size": "14px", color: "white", "z-index": 2147483646 }).click(function () {
      n.toggleClass("developer");
    });
  }!function () {
    for (var i, o = "", r = window.getComputedStyle(document.getElementsByTagName("body")[0]).getPropertyValue("content").replace(/\\a/g, "").replace(/ /g, "").replace(/'/g, "").replace(/"/g, "").split("|"), s = 0; s < r.length; s++) {
      e[n[s]] = Number(r[s].replace("px", "")), o += "<tr><td>" + n[s] + "</td><td>" + r[s] + "</td></tr>";
    }i = '<table class="table breakpoints-table" style="width: 300px;">' + o + "</table>", t('[data-js="lv-responsive-table"]').append(i);
  }(), t("html[development]").length && (i(), t(window).resize(function () {
    i();
  }));
}(jQuery), function (t) {
  "use strict";
  var e = t(".lv-google-map");e.length && (e.click(function () {
    e.find("iframe").css("pointer-events", "auto");
  }), e.mouseleave(function () {
    e.find("iframe").css("pointer-events", "none");
  }));
}(jQuery), function () {
  "use strict";
  function t() {
    function t() {
      var t = { width: s.width / s.naturalWidth, height: s.height / s.naturalHeight };r.forEach(function (e, n) {
        var i = 0;o[n].coords = e.split(",").map(function (e) {
          var n = 1 == (i = 1 - i) ? "width" : "height";return Math.floor(Number(e) * t[n]);
        }).join(",");
      });
    }function e(t) {
      return t.coords.replace(/ *, */g, ",").replace(/ +/g, ",");
    }function n() {
      clearTimeout(a), a = setTimeout(t, 250);
    }var i = this,
        o = null,
        r = null,
        s = null,
        a = null;"function" == typeof i._resize ? i._resize() : (o = i.getElementsByTagName("area"), r = Array.prototype.map.call(o, e), s = document.querySelector('img[usemap="#' + i.name + '"]'), i._resize = t, s.addEventListener("load", t, !1), window.addEventListener("focus", t, !1), window.addEventListener("resize", n, !1), window.addEventListener("readystatechange", t, !1), document.addEventListener("fullscreenchange", t, !1), (s.width !== s.naturalWidth || s.height !== s.naturalHeight) && t());
  }function e() {
    function e(e) {
      e && (function (t) {
        if (!t.tagName) throw new TypeError("Object is not a valid DOM element");if ("MAP" !== t.tagName.toUpperCase()) throw new TypeError("Expected <MAP> tag, found <" + t.tagName + ">.");
      }(e), t.call(e), n.push(e));
    }var n;return function (t) {
      switch (n = [], typeof t === "undefined" ? "undefined" : _typeof(t)) {case "undefined":case "string":
          Array.prototype.forEach.call(document.querySelectorAll(t || "map"), e);break;case "object":
          e(t);break;default:
          throw new TypeError("Unexpected data type (" + (typeof t === "undefined" ? "undefined" : _typeof(t)) + ").");}return n;
    };
  }"function" == typeof define && define.amd ? define([], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e() : window.imageMapResize = e(), "jQuery" in window && (jQuery.fn.imageMapResize = function () {
    return this.filter("map").each(t).end();
  });
}(), function (t, e) {
  "use strict";
  function n(t, e) {
    for (var n in e) {
      e.hasOwnProperty(n) && (t[n] = e[n]);
    }
  }function i(t) {
    return parseFloat(t) || 0;
  }function o(t) {
    for (var e = 0; t;) {
      e += t.offsetTop, t = t.offsetParent;
    }return e;
  }function r() {
    function n() {
      t.pageXOffset != h.left ? (h.top = t.pageYOffset, h.left = t.pageXOffset, p.refreshAll()) : t.pageYOffset != h.top && (h.top = t.pageYOffset, h.left = t.pageXOffset, d.forEach(function (t) {
        return t._recalcPosition();
      }));
    }function i() {
      o = setInterval(function () {
        d.forEach(function (t) {
          return t._fastCheck();
        });
      }, 500);
    }if (!c) {
      c = !0, n(), t.addEventListener("scroll", n), t.addEventListener("resize", p.refreshAll), t.addEventListener("orientationchange", p.refreshAll);var o = void 0,
          r = void 0,
          s = void 0;"hidden" in e ? (r = "hidden", s = "visibilitychange") : "webkitHidden" in e && (r = "webkitHidden", s = "webkitvisibilitychange"), s ? (e[r] || i(), e.addEventListener(s, function () {
        e[r] ? clearInterval(o) : i();
      })) : i();
    }
  }var s = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
      a = !1,
      l = void 0 !== t;l && t.getComputedStyle ? function () {
    var t = e.createElement("div");["", "-webkit-", "-moz-", "-ms-"].some(function (e) {
      try {
        t.style.position = e + "sticky";
      } catch (t) {}return "" != t.style.position;
    }) && (a = !0);
  }() : a = !0;var c = !1,
      u = "undefined" != typeof ShadowRoot,
      h = { top: null, left: null },
      d = [],
      f = function () {
    function r(t) {
      if (function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, r), !(t instanceof HTMLElement)) throw new Error("First argument must be HTMLElement");if (d.some(function (e) {
        return e._node === t;
      })) throw new Error("Stickyfill is already applied to this node");this._node = t, this._stickyMode = null, this._active = !1, d.push(this), this.refresh();
    }return s(r, [{ key: "refresh", value: function value() {
        if (!a && !this._removed) {
          this._active && this._deactivate();var r = this._node,
              s = getComputedStyle(r),
              l = { position: s.position, top: s.top, display: s.display, marginTop: s.marginTop, marginBottom: s.marginBottom, marginLeft: s.marginLeft, marginRight: s.marginRight, cssFloat: s.cssFloat };if (!isNaN(parseFloat(l.top)) && "table-cell" != l.display && "none" != l.display) {
            this._active = !0;var c = r.style.position;"sticky" != s.position && "-webkit-sticky" != s.position || (r.style.position = "static");var h = r.parentNode,
                d = u && h instanceof ShadowRoot ? h.host : h,
                f = r.getBoundingClientRect(),
                p = d.getBoundingClientRect(),
                g = getComputedStyle(d);this._parent = { node: d, styles: { position: d.style.position }, offsetHeight: d.offsetHeight }, this._offsetToWindow = { left: f.left, right: e.documentElement.clientWidth - f.right }, this._offsetToParent = { top: f.top - p.top - i(g.borderTopWidth), left: f.left - p.left - i(g.borderLeftWidth), right: -f.right + p.right - i(g.borderRightWidth) }, this._styles = { position: c, top: r.style.top, bottom: r.style.bottom, left: r.style.left, right: r.style.right, width: r.style.width, marginTop: r.style.marginTop, marginLeft: r.style.marginLeft, marginRight: r.style.marginRight };var m = i(l.top);this._limits = { start: f.top + t.pageYOffset - m, end: p.top + t.pageYOffset + d.offsetHeight - i(g.borderBottomWidth) - r.offsetHeight - m - i(l.marginBottom) };var v = g.position;"absolute" != v && "relative" != v && (d.style.position = "relative"), this._recalcPosition();var y = this._clone = {};y.node = e.createElement("div"), n(y.node.style, { width: f.right - f.left + "px", height: f.bottom - f.top + "px", marginTop: l.marginTop, marginBottom: l.marginBottom, marginLeft: l.marginLeft, marginRight: l.marginRight, cssFloat: l.cssFloat, padding: 0, border: 0, borderSpacing: 0, fontSize: "1em", position: "static" }), h.insertBefore(y.node, r), y.docOffsetTop = o(y.node);
          }
        }
      } }, { key: "_recalcPosition", value: function value() {
        if (this._active && !this._removed) {
          var t = h.top <= this._limits.start ? "start" : h.top >= this._limits.end ? "end" : "middle";if (this._stickyMode != t) {
            switch (t) {case "start":
                n(this._node.style, { position: "absolute", left: this._offsetToParent.left + "px", right: this._offsetToParent.right + "px", top: this._offsetToParent.top + "px", bottom: "auto", width: "auto", marginLeft: 0, marginRight: 0, marginTop: 0 });break;case "middle":
                n(this._node.style, { position: "fixed", left: this._offsetToWindow.left + "px", right: this._offsetToWindow.right + "px", top: this._styles.top, bottom: "auto", width: "auto", marginLeft: 0, marginRight: 0, marginTop: 0 });break;case "end":
                n(this._node.style, { position: "absolute", left: this._offsetToParent.left + "px", right: this._offsetToParent.right + "px", top: "auto", bottom: 0, width: "auto", marginLeft: 0, marginRight: 0 });}this._stickyMode = t;
          }
        }
      } }, { key: "_fastCheck", value: function value() {
        this._active && !this._removed && (Math.abs(o(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) && this.refresh();
      } }, { key: "_deactivate", value: function value() {
        var t = this;this._active && !this._removed && (this._clone.node.parentNode.removeChild(this._clone.node), delete this._clone, n(this._node.style, this._styles), delete this._styles, d.some(function (e) {
          return e !== t && e._parent && e._parent.node === t._parent.node;
        }) || n(this._parent.node.style, this._parent.styles), delete this._parent, this._stickyMode = null, this._active = !1, delete this._offsetToWindow, delete this._offsetToParent, delete this._limits);
      } }, { key: "remove", value: function value() {
        var t = this;this._deactivate(), d.some(function (e, n) {
          if (e._node === t._node) return d.splice(n, 1), !0;
        }), this._removed = !0;
      } }]), r;
  }(),
      p = { stickies: d, Sticky: f, forceSticky: function forceSticky() {
      a = !1, r(), this.refreshAll();
    }, addOne: function addOne(t) {
      if (!(t instanceof HTMLElement)) {
        if (!t.length || !t[0]) return;t = t[0];
      }for (var e = 0; e < d.length; e++) {
        if (d[e]._node === t) return d[e];
      }return new f(t);
    }, add: function add(t) {
      if (t instanceof HTMLElement && (t = [t]), t.length) {
        for (var e = [], n = function n(_n3) {
          var i = t[_n3];return i instanceof HTMLElement ? d.some(function (t) {
            if (t._node === i) return e.push(t), !0;
          }) ? "continue" : void e.push(new f(i)) : (e.push(void 0), "continue");
        }, i = 0; i < t.length; i++) {
          n(i);
        }return e;
      }
    }, refreshAll: function refreshAll() {
      d.forEach(function (t) {
        return t.refresh();
      });
    }, removeOne: function removeOne(t) {
      if (!(t instanceof HTMLElement)) {
        if (!t.length || !t[0]) return;t = t[0];
      }d.some(function (e) {
        if (e._node === t) return e.remove(), !0;
      });
    }, remove: function remove(t) {
      if (t instanceof HTMLElement && (t = [t]), t.length) for (var e = function e(_e3) {
        var n = t[_e3];d.some(function (t) {
          if (t._node === n) return t.remove(), !0;
        });
      }, n = 0; n < t.length; n++) {
        e(n);
      }
    }, removeAll: function removeAll() {
      for (; d.length;) {
        d[0].remove();
      }
    } };a || r(), "undefined" != typeof module && module.exports ? module.exports = p : l && (t.Stickyfill = p);
}(window, document), function (t) {
  "use strict";
  var e = [];var n = window.location.hash || null,
      i = t("[data-accordion]"),
      o = t(".accordion-filter"),
      r = t("button", o),
      s = t("[data-accordion-trigger]"),
      a = t("> ul > li[data-filter]", i),
      l = t("a", s);function c() {
    t(".accordion-filter").removeAttr("hidden");
  }n && t(n).length && (t("a[href='" + n + "']", s).addClass("active"), t(n).addClass("active"), c()), l.on("click", function (e) {
    var n = t(this),
        o = n.attr("href");i.removeClass("active"), l.removeClass("active"), n.hasClass("active") || (n.addClass("active"), t(o).addClass("active"), c());
  }), r.each(function () {
    var n = t(this),
        i = n.data("filter-id");n.on("click", function (o) {
      n.hasClass("active") ? (n.removeClass("active"), e = e.filter(function (t) {
        return t !== i;
      })) : (n.addClass("active"), e.push(i)), console.log(e), e.length ? (a.attr("hidden", !0), a.each(function () {
        var n = t(this),
            i = n.data("filter").split(",");for (var _t2 = 0; _t2 < i.length; _t2++) {
          var _o = i[_t2].trim().toLowerCase();if (_o && -1 !== e.indexOf(_o)) {
            n.attr("hidden", !1);break;
          }
        }
      })) : a.attr("hidden", !1);
    });
  });
}(jQuery), function (t) {
  var e = -1,
      n = -1,
      i = function i(t) {
    return parseFloat(t) || 0;
  },
      o = function o(e) {
    var n = { byRow: !0, property: "height", target: null, remove: !1, mq: null };return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? t.extend(n, e) : ("boolean" == typeof e ? n.byRow = e : "remove" === e && (n.remove = !0), n);
  },
      r = t.fn.matchHeight = function (e) {
    var n = o(e);if (n.remove) {
      var i = this;return this.css(n.property, ""), t.each(r._groups, function (t, e) {
        e.elements = e.elements.not(i);
      }), this;
    }return this.length <= 1 && !n.target ? this : (r._groups.push({ elements: this, options: n }), n.mq && window.matchMedia("only all").matches && !window.matchMedia(n.mq).matches ? this : (r._apply(this, n), this));
  };r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._apply = function (e, n) {
    var s = o(n),
        a = t(e),
        l = [a],
        c = t(window).scrollTop(),
        u = t("html").outerHeight(!0),
        h = a.parents().filter(":hidden");return h.each(function () {
      var e = t(this);e.data("style-cache", e.attr("style"));
    }), h.css("display", "block"), s.byRow && !s.target && (a.each(function () {
      var e = t(this),
          n = "inline-block" === e.css("display") ? "inline-block" : "block";e.data("style-cache", e.attr("style")), e.css({ display: n, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px" });
    }), l = function (e) {
      var n = null,
          o = [];return t(e).each(function () {
        var e = t(this),
            r = e.offset().top - i(e.css("margin-top")),
            s = o.length > 0 ? o[o.length - 1] : null;null === s ? o.push(e) : Math.floor(Math.abs(n - r)) <= 1 ? o[o.length - 1] = s.add(e) : o.push(e), n = r;
      }), o;
    }(a), a.each(function () {
      var e = t(this);e.attr("style", e.data("style-cache") || "");
    })), t.each(l, function (e, n) {
      var o = t(n),
          r = 0;if (s.target) r = s.target.outerHeight(!1);else {
        if (s.byRow && o.length <= 1) return void o.css(s.property, "");o.each(function () {
          var e = t(this),
              n = { display: "inline-block" === e.css("display") ? "inline-block" : "block" };n[s.property] = "", e.css(n), e.outerHeight(!1) > r && (r = e.outerHeight(!1)), e.css("display", "");
        });
      }o.each(function () {
        var e = t(this),
            n = 0;s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (n += i(e.css("border-top-width")) + i(e.css("border-bottom-width")), n += i(e.css("padding-top")) + i(e.css("padding-bottom"))), e.css(s.property, r - n));
      });
    }), h.each(function () {
      var e = t(this);e.attr("style", e.data("style-cache") || null);
    }), r._maintainScroll && t(window).scrollTop(c / u * t("html").outerHeight(!0)), this;
  }, r._applyDataApi = function () {
    var e = {};t("[data-match-height], [data-mh]").each(function () {
      var n = t(this),
          i = n.attr("data-mh") || n.attr("data-match-height");e[i] = i in e ? e[i].add(n) : n;
    }), t.each(e, function () {
      this.matchHeight(!0);
    });
  };var s = function s(e) {
    r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
      if (this.options.mq && window.matchMedia("only all").matches && !window.matchMedia(this.options.mq).matches) return this.elements.css(this.options.property, ""), !0;r._apply(this.elements, this.options);
    }), r._afterUpdate && r._afterUpdate(e, r._groups);
  };r._update = function (i, o) {
    if (o && "resize" === o.type) {
      var a = t(window).width();if (a === e) return;e = a;
    }i ? -1 === n && (n = setTimeout(function () {
      s(o), n = -1;
    }, r._throttle)) : s(o);
  }, t(r._applyDataApi), t(window).bind("load", function (t) {
    r._update(!1, t);
  }), t(window).bind("resize orientationchange", function (t) {
    r._update(!0, t);
  });
}(jQuery), function () {
  "use strict";
  var t,
      e = document.querySelector(".lv-page"),
      n = null;function i() {
    n.offset = 140, window.innerWidth >= 768 && (n.offset = 230), window.innerWidth >= 992 && (n.offset = 230);
  }window.addEventListener("load", function () {
    var _ref;

    if (!n) return n = new Headroom(e, (_ref = { offset: 0, tolerance: 0 }, _defineProperty(_ref, "tolerance", { up: 5, down: 0 }), _defineProperty(_ref, "classes", { initial: "headroom", pinned: "headroom--pinned", unpinned: "headroom--unpinned", top: "headroom--top", notTop: "headroom--not-top", bottom: "headroom--bottom", notBottom: "headroom--not-bottom" }), _defineProperty(_ref, "onPin", function onPin() {}), _defineProperty(_ref, "onUnpin", function onUnpin() {}), _defineProperty(_ref, "onTop", function onTop() {}), _defineProperty(_ref, "onNotTop", function onNotTop() {}), _defineProperty(_ref, "onBottom", function onBottom() {}), _defineProperty(_ref, "onNotBottom", function onNotBottom() {}), _ref)), i(), void n.init();
  }), window.addEventListener("resize", function () {
    clearTimeout(t), t = setTimeout(function () {
      n && i();
    }, 250);
  });
}(), function (t) {
  "use strict";
  t("[data-slider]").each(function () {
    var e = t(this),
        n = t("[data-flickity]", e),
        i = t(".slider-prev-btn", e),
        o = t(".slider-next-btn", e);n.children().length > 1 && (i.on("click", function () {
      n.flickity("previous").flickity("stopPlayer");
    }), o.on("click", function () {
      n.flickity("next").flickity("stopPlayer");
    }));
  });
}(jQuery), function () {
  "use strict";
  window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach);var t = document.querySelector(".lv-topbar"),
      e = t.querySelectorAll("ul:first-child > li"),
      n = window.location.pathname,
      i = n.split("/").slice(1).slice(0, -1);if ("/" == n) t.querySelector("li:nth-child(2)").classList.add("active");else if ("/about/" == n) t.querySelector('li[data-alias="about"]').classList.add("active");else if ("/about-us/" == n) t.querySelector('li[data-alias="about-us"]').classList.add("active");else if ("/search/" == n) t.querySelector('li[data-alias="search"]').classList.add("active");else {
    var _e4 = t.querySelector('a[href="' + n + '"]');if (_e4) {
      if (i.length <= 2) {
        var _t3 = _e4.parentNode.parentNode.parentNode;_t3.classList.contains("lv-topbar") || _t3.classList.add("active");
      }if (i.length <= 3) {
        _e4.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add("active");
      }if (3 == i.length) {
        _e4.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add("active"), _e4.parentNode.parentNode.parentNode.classList.add("active");
      }
    }
  }e.forEach(function (t) {
    var n = t.querySelector("a");n && n.addEventListener("click", function (n) {
      var _this3 = this;

      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t;
      n.preventDefault();var o = this.href.indexOf("#") > -1;o || (e.forEach(function (t) {
        t.classList.remove("active");
      }), i.classList.add("active")), i.classList.contains("has-dropdown") || o ? o || document.documentElement.classList.remove("has-closed-nav") : (document.documentElement.classList.add("has-closed-nav"), setTimeout(function () {
        window.location = _this3.href;
      }, 150));
    });
  });
}(), function (t) {
  "use strict";
  var e = t("html"),
      n = (t(".lv-page"), t(".lv-off-canvas")),
      i = t(".dropdown", n),
      o = t("li:not(.has-dropdown) > a", i),
      r = t(".submenu-arrow");t("[data-menu-toggle]").on("click", function (t) {
    t.preventDefault(), e.toggleClass("has-open-menu");
  }), r.on("click", function (e) {
    e.preventDefault(), e.stopPropagation(), t(this).parent().next(".dropdown").addClass("is-open");
  }), o.click(function (n) {
    n.preventDefault();var i = t(this).attr("href");e.removeClass("has-open-menu").addClass("has-closed-menu"), setTimeout(function () {
      window.location = i;
    }.bind(i), 200);
  }), i.on("click", function (e) {
    t(this).removeClass("is-open"), e.stopPropagation();
  });
}(jQuery), function () {
  "use strict";
  var t = document.querySelector("body > [data-global-search]"),
      e = t.querySelector("input");function n() {
    t.classList.remove("active"), document.activeElement.blur();
  }document.querySelectorAll('a[href="#/search/"]').forEach(function (e) {
    e.addEventListener("click", function (e) {
      e.preventDefault(), t.classList.add("active"), t.querySelector("input").focus();
    });
  }), t.addEventListener("mousedown", n), e.addEventListener("mousedown", function (t) {
    t.stopPropagation();
  }), document.addEventListener("keyup", function (t) {
    27 === t.keyCode && n();
  });
}(), document.getElementById("vue-jobs-listing-app") && init(), $("#modal-newsletter").on("shown.bs.modal", function () {
  $(this).find("form").validator("destroy").validator();
});var elements = $(".is-sticky");Stickyfill.add(elements), $("[data-equal-height]").matchHeight({ byRow: !1, property: "height", target: null, remove: !1, mq: "(min-width: 768px)" }), $("#aus-map").imageMapResize(), $("[data-sitemap-trigger]").on("click", function (t) {
  $(".fa", $(this)).toggleClass("fa-angle-down"), $("[data-sitemap]").toggleClass("is-collapsed");
}), $('a[href*="#"]:not([href="#"], [data-toggle="tab"])').on("click", function () {
  var t = $(this).attr("href"),
      e = $(t),
      n = $(".global-header").height();return e.length && $(this).parent().parent().parent().hasClass("accordion-trigger") ? ($.scrollTo(e.offset().top - 220, 800), !1) : e.length ? ($.scrollTo(e.offset().top - n, 800), !1) : void 0;
}), $("[data-back-top]").click(function () {
  $.scrollTo(0, 500);
});var currFFZoom = 1,
    currIEZoom = 100,
    isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
    isIE11 = 11 === ieVersion() || !1;function ieVersion(t) {
  t = t || navigator.userAgent;var e = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(t);if (e) return parseInt(e[2]);
}$("[data-resize-up]").on("click", function () {
  isFirefox || isIE11 ? (currFFZoom += .02, $("body").css("transform", "scale(" + currFFZoom + ")"), $("body").css("transform-origin", "top center")) : (currIEZoom += 2, $("body").css("zoom", " " + currIEZoom + "%"));
}), $("[data-resize-down]").on("click", function () {
  isFirefox || isIE11 ? (currFFZoom -= .02, $("body").css("transform", "scale(" + currFFZoom + ")")) : (currIEZoom -= 2, $("body").css("zoom", " " + currIEZoom + "%"));
});
