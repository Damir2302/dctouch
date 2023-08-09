function parseUserAgent(e) {
    var r = e;
    if (void 0 == e) {
        var r = {};
        r.browser = "",
        r.version = "",
        r.version_long = "",
        r.os = "",
        r.mobile = !1,
        r.device = "desktop",
        r.runBy = "javascript";
        var n = navigator.userAgent;
        n.match(/Chrome/) && (r.browser = "chrome"),
        n.match(/Safari/) && "chrome" != r.browser && (r.browser = "safari"),
        n.match(/MSIE/) && (r.browser = "ie"),
        window.opera && (r.browser = "opera"),
        n.match(/Firefox/) && (r.browser = "firefox"),
        n.match(/android/i) && (r.browser = "android"),
        "firefox" == r.browser && n.match(/Firefox\D+(\d+(\.\d+)?)/) ? r.version = parseFloat(RegExp.$1) : "safari" == r.browser && n.match(/Version\D(\d+(\.\d+)?)/) ? r.version = parseFloat(RegExp.$1) : "chrome" == r.browser && n.match(/Chrome\D(\d+(\.\d+)?)/) ? r.version = parseFloat(RegExp.$1) : "ie" == r.browser && n.match(/MSIE\D+(\d+(\.\d+)?)/) ? r.version = parseFloat(RegExp.$1) : "opera" == r.browser && n.match(/Opera\D+(\d+(\.\d+)?)/) && (r.version = parseFloat(RegExp.$1)),
        ("ipod" == r.browser || "ipad" == r.browser || "iphone" == r.browser) && (r.os = "ios",
        r.browser = "safari_mobile"),
        "android" == r.browser ? r.os = "android" : n.match(/macintosh|mac os x/i) ? r.os = "mac" : n.match(/windows/i) && (r.os = "windows"),
        r.string = n
    }
    void 0 == r.has_device_detect && (r.string.toLowerCase().match(/iphone|ipod|android|blackberry|mini|windows\sce|palm/i) && (r.device = "phone"),
    r.string.toLowerCase().match(/ipad/i) && (r.device = "tablet"),
    r.mobile = "desktop" != r.device),
    window.agent = r
}
function $e(e, r) {
    if (e)
        return null != e.match(/(\>|\.| )/) || "#" != e.substr(0, 1) || r ? Sizzle(e, r) : document.getElementById(e.replace("#", ""))
}
function setCss(e, r, n, o, s) {
    if (!e)
        throw Error("setCss() Invalid DOM element");
    if (isArray(e))
        throw TypeError("setCss() Array was given instead of DOM element.");
    var l = parseProperty(r);
    if (l) {
        if (/rotate|scale|skew|translate/i.test(r)) {
            e.style[l] = setCss_css3transform(e.style[l], r, n);
            return
        }
        if ("opacity" == r && "ie" == agent.browser && (8 == agent.version || 7 == agent.version)) {
            e.style.zoom = 1,
            n < 1 ? e.style.filter = "alpha(opacity=" + Math.round(100 * n) + ")" : e.style.removeAttribute("filter");
            return
        }
        e.style ? (n = null == o ? setCss_fillProp(l, n) : o ? n + "px" : n,
        s && tracer("setCss() style[" + l + "] = " + n),
        e.style[l] = n) : (!0 == o && (n += "px"),
        s && tracer("setCss() " + l + ": " + n),
        e[l] = n)
    }
}
function setCss_fillProp(e, r) {
    if (!setCss_styles[e])
        return r;
    var n = setCss_styles[e];
    if (isArray(r)) {
        for (i in r)
            n = n.split("@" + i).join(r[i]);
        return n
    }
    if (void 0 != r.split) {
        var o = r.split(parseFloat(r)).join("");
        r = parseFloat(r)
    }
    var n = n.split("@0").join(r).split("@1").join(r).split("@2").join(r);
    return o && (n = n.split("px").join(o)),
    n
}
function getCss(e, r, n) {
    if (!e)
        throw Error("getCss() Invalid DOM element");
    if (isArray(e))
        throw TypeError("setCss() Array was given instead of DOM element.");
    var o = "";
    try {
        void 0 != e[r] && (o = e[r])
    } catch (s) {}
    if (/rotate|scale|skew|translate/i.test(r)) {
        var l = parseProperty(r);
        if (e.style[l]) {
            var c = e.style[l].split(", ").join(",").split(" ");
            for (i in c)
                if (c[i].match(RegExp(r))) {
                    var u = c[i].split("(")[1];
                    for (j in u = (u = u.split(")")[0]).split(","))
                        u[j] = parseFloat(u[j]);
                    if (u.length > 1)
                        return u;
                    return u[0]
                }
        }
        return "scale" == r ? 1 : 0
    }
    if ("" === o) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            if (o = document.defaultView.getComputedStyle(e, "").getPropertyValue(r),
            "firefox" == agent.browser && agent.version < 4 && 0 == parseInt(o))
                try {
                    var f = e.style[r];
                    f && (o = f)
                } catch (d) {}
        } else
            e.currentStyle && (r = r.replace(/\-(\w)/g, function(e, r) {
                return r.toUpperCase()
            }),
            o = e.currentStyle[r]);
        if ("ie" == agent.browser && (8 == agent.version || 7 == agent.version)) {
            if (String(o).indexOf("%") > -1 || "auto" == o) {
                if ("width" == r)
                    return e.offsetWidth;
                if ("height" == r)
                    return e.offsetHeight
            }
            if ("opacity" == r)
                return e.filters.alpha ? e.filters.alpha.opacity / 100 : 1
        }
    }
    try {
        if (o.substr && "rgb" == o.substr(0, 3))
            return o.split("rgb(").join("").split("rgba(").join("").split(")").join("").split(",")
    } catch (p) {}
    return (n && tracer("getCss() style[" + r + "] = " + o),
    isNaN(Number(o = String(o).split("px").join("").split("em").join("").split("%").join("")))) ? o : Number(String(o))
}
function addClass(e, r) {
    if (!e)
        throw Error("addClass() Invalid DOM element");
    hasClass(e, r, !0) || (e.className += " " + r)
}
function removeClass(e, r) {
    if (!e)
        throw Error("removeClass() Invalid DOM element");
    if (hasClass(e, r, !0)) {
        var n = RegExp("(\\s|^)" + r + "(\\s|$)");
        e.className = e.className.replace(n, " ").split("  ").join(" ")
    }
}
function hasClass(e, r, n) {
    if (!e && !n)
        throw Error("hasClass() Invalid DOM element");
    return null != e.className.match(RegExp("(\\s|^)" + r + "(\\s|$)"))
}
function getDocumentSize() {
    return {
        w: Math.max(Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), Math.max(document.body.offsetWidth, document.documentElement.offsetWidth), Math.max(document.body.clientWidth, document.documentElement.clientWidth)),
        h: Math.max(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight))
    }
}
function getBodySize() {
    return {
        w: document.body.offsetWidth,
        h: document.body.offsetHeight
    }
}
function setCookie(e, r, n) {
    var o = new Date
      , s = new Date;
    null == n && (n = 9494),
    n > 0 ? (s.setTime(o.getTime() + 36e5 * 24 * n),
    document.cookie = e + "=" + escape(r) + ";expires=" + s.toGMTString() + ";path=/;") : document.cookie = e + "=" + escape(r) + ";expires=;path=/;"
}
function getCookie(e) {
    var r, n, o, s = document.cookie.split(";");
    for (r = 0; r < s.length; r++)
        if (n = s[r].substr(0, s[r].indexOf("=")),
        o = s[r].substr(s[r].indexOf("=") + 1),
        (n = n.replace(/^\s+|\s+$/g, "")) == e)
            return unescape(o);
    return null
}
function forEach(e, r, n) {
    if (void 0 === e && console.error("forEach() Argument is undefined."),
    isArray(e))
        for (var o = 0, s = e.length; o < s; o++)
            o in e && r.call(n, o, e[o]);
    else
        for (var l in e)
            r.call(n, l, e[l])
}
function isFunction(e) {
    return "function" == typeof e
}
function isArray(e) {
    return "[object Array]" === Object.prototype.toString.call(e)
}
function parseProperty(e) {
    return /rotate|scale|skew|translate/i.test(e) ? void 0 != window.Modernizr ? Modernizr.prefixed("transform") : null : e.replace(/-([a-z])/ig, function(e, r) {
        return r.toUpperCase()
    })
}
parseUserAgent(window.agent),
function() {
    function e(e, r, n, o, s, l) {
        for (var c = 0, f = o.length; c < f; c++) {
            var d = o[c];
            if (d) {
                var p = !1;
                for (d = d[e]; d; ) {
                    if (d.sizcache === n) {
                        p = o[d.sizset];
                        break
                    }
                    if (1 === d.nodeType) {
                        if (l || (d.sizcache = n,
                        d.sizset = c),
                        "string" != typeof r) {
                            if (d === r) {
                                p = !0;
                                break
                            }
                        } else if (u.filter(r, [d]).length > 0) {
                            p = d;
                            break
                        }
                    }
                    d = d[e]
                }
                o[c] = p
            }
        }
    }
    var r = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g
      , n = 0
      , o = Object.prototype.toString
      , s = !0
      , l = /\\/g
      , c = /\W/;
    [0, 0].sort(function() {
        return s = !1,
        0
    });
    var u = function(e, n, s, l) {
        s = s || [];
        var c = n = n || document;
        if (1 !== n.nodeType && 9 !== n.nodeType)
            return [];
        if (!e || "string" != typeof e)
            return s;
        var p, m, v, g, w, E, b, _, x = !0, C = u.isXML(n), S = [], T = e;
        do
            if (r.exec(""),
            (p = r.exec(T)) && (T = p[3],
            S.push(p[1]),
            p[2])) {
                g = p[3];
                break
            }
        while (p);
        if (S.length > 1 && d.exec(e)) {
            if (2 === S.length && f.relative[S[0]])
                m = y(S[0] + S[1], n);
            else
                for (m = f.relative[S[0]] ? [n] : u(S.shift(), n); S.length; )
                    e = S.shift(),
                    f.relative[e] && (e += S.shift()),
                    m = y(e, m)
        } else if (!l && S.length > 1 && 9 === n.nodeType && !C && f.match.ID.test(S[0]) && !f.match.ID.test(S[S.length - 1]) && (n = (w = u.find(S.shift(), n, C)).expr ? u.filter(w.expr, w.set)[0] : w.set[0]),
        n)
            for (m = (w = l ? {
                expr: S.pop(),
                set: h(l)
            } : u.find(S.pop(), 1 === S.length && ("~" === S[0] || "+" === S[0]) && n.parentNode ? n.parentNode : n, C)).expr ? u.filter(w.expr, w.set) : w.set,
            S.length > 0 ? v = h(m) : x = !1; S.length; )
                b = E = S.pop(),
                f.relative[E] ? b = S.pop() : E = "",
                null == b && (b = n),
                f.relative[E](v, b, C);
        else
            v = S = [];
        if (v || (v = m),
        v || u.error(E || e),
        "[object Array]" === o.call(v)) {
            if (x) {
                if (n && 1 === n.nodeType)
                    for (_ = 0; null != v[_]; _++)
                        v[_] && (!0 === v[_] || 1 === v[_].nodeType && u.contains(n, v[_])) && s.push(m[_]);
                else
                    for (_ = 0; null != v[_]; _++)
                        v[_] && 1 === v[_].nodeType && s.push(m[_])
            } else
                s.push.apply(s, v)
        } else
            h(v, s);
        return g && (u(g, c, s, l),
        u.uniqueSort(s)),
        s
    };
    u.find = function(e, r, n) {
        var o;
        if (!e)
            return [];
        for (var s = 0, c = f.order.length; s < c; s++) {
            var u, d = f.order[s];
            if (u = f.leftMatch[d].exec(e)) {
                var p = u[1];
                if (u.splice(1, 1),
                "\\" !== p.substr(p.length - 1) && (u[1] = (u[1] || "").replace(l, ""),
                null != (o = f.find[d](u, r, n)))) {
                    e = e.replace(f.match[d], "");
                    break
                }
            }
        }
        return o || (o = void 0 !== r.getElementsByTagName ? r.getElementsByTagName("*") : []),
        {
            set: o,
            expr: e
        }
    }
    ,
    u.filter = function(e, r, n, o) {
        for (var s, l, c = e, d = [], p = r, m = r && r[0] && u.isXML(r[0]); e && r.length; ) {
            for (var h in f.filter)
                if (null != (s = f.leftMatch[h].exec(e)) && s[2]) {
                    var v, g, w = f.filter[h], E = s[1];
                    if (l = !1,
                    s.splice(1, 1),
                    "\\" === E.substr(E.length - 1))
                        continue;
                    if (p === d && (d = []),
                    f.preFilter[h]) {
                        if (s = f.preFilter[h](s, p, n, d, o, m)) {
                            if (!0 === s)
                                continue
                        } else
                            l = v = !0
                    }
                    if (s) {
                        for (var b = 0; null != (g = p[b]); b++)
                            if (g) {
                                var _ = !!(v = w(g, s, b, p)) ^ o;
                                n && null != v ? _ ? l = !0 : p[b] = !1 : _ && (d.push(g),
                                l = !0)
                            }
                    }
                    if (void 0 !== v) {
                        if (n || (p = d),
                        e = e.replace(f.match[h], ""),
                        !l)
                            return [];
                        break
                    }
                }
            if (e === c) {
                if (null == l)
                    u.error(e);
                else
                    break
            }
            c = e
        }
        return p
    }
    ;
    var f = u.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            class: "className",
            for: "htmlFor"
        },
        relative: {
            "+": function(e, r) {
                var n = "string" == typeof r
                  , o = n && !c.test(r)
                  , s = n && !o;
                o && (r = r.toLowerCase());
                for (var l, f = 0, d = e.length; f < d; f++)
                    if (l = e[f]) {
                        for (; (l = l.previousSibling) && 1 !== l.nodeType; )
                            ;
                        e[f] = s || l && l.nodeName.toLowerCase() === r ? l || !1 : l === r
                    }
                s && u.filter(r, e, !0)
            },
            ">": function(e, r) {
                var n, o = "string" == typeof r, s = 0, l = e.length;
                if (o && !c.test(r)) {
                    for (r = r.toLowerCase(); s < l; s++)
                        if (n = e[s]) {
                            var f = n.parentNode;
                            e[s] = f.nodeName.toLowerCase() === r && f
                        }
                } else {
                    for (; s < l; s++)
                        (n = e[s]) && (e[s] = o ? n.parentNode : n.parentNode === r);
                    o && u.filter(r, e, !0)
                }
            },
            "": function(r, o, s) {
                var l, u = n++, f = e;
                "string" != typeof o || c.test(o) || (l = o = o.toLowerCase(),
                f = t),
                f("parentNode", o, u, r, l, s)
            }
        },
        find: {
            ID: function(e, r, n) {
                if (void 0 !== r.getElementById && !n) {
                    var o = r.getElementById(e[1]);
                    return o && o.parentNode ? [o] : []
                }
            },
            TAG: function(e, r) {
                if (void 0 !== r.getElementsByTagName)
                    return r.getElementsByTagName(e[1])
            }
        },
        preFilter: {
            CLASS: function(e, r, n, o, s, c) {
                if (e = " " + e[1].replace(l, "") + " ",
                c)
                    return e;
                for (var u, f = 0; null != (u = r[f]); f++)
                    u && (s ^ (u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || o.push(u) : n && (r[f] = !1));
                return !1
            }
        },
        filter: {
            CLASS: function(e, r) {
                return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(r) > -1
            }
        }
    }
      , d = f.match.POS
      , p = function(e, r) {
        return "\\" + (r - 0 + 1)
    };
    for (var m in f.match)
        f.match[m] = RegExp(f.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source),
        f.leftMatch[m] = RegExp(/(^(?:.|\r|\n)*?)/.source + f.match[m].source.replace(/\\(\d+)/g, p));
    var h = function(e, r) {
        return (e = Array.prototype.slice.call(e, 0),
        r) ? (r.push.apply(r, e),
        r) : e
    };
    (function() {
        var e = document.documentElement
          , r = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
        if (r) {
            r.call(document.createElement("div"), "div");
            var n = !1;
            try {
                r.call(document.documentElement, "[test!='']:sizzle")
            } catch (o) {
                n = !0
            }
        }
    }
    )(),
    function() {
        var e = document.createElement("div");
        if (e.innerHTML = "<div class='test e'></div><div class='test'></div>",
        e.getElementsByClassName && 0 !== e.getElementsByClassName("e").length)
            e.lastChild.className = "e",
            1 !== e.getElementsByClassName("e").length && (f.order.splice(1, 0, "CLASS"),
            f.find.CLASS = function(e, r, n) {
                if (void 0 !== r.getElementsByClassName && !n)
                    return r.getElementsByClassName(e[1])
            }
            ,
            e = null)
    }(),
    document.documentElement.contains && (u.contains = function(e, r) {
        return e !== r && (!e.contains || e.contains(r))
    }
    ),
    u.isXML = function(e) {
        var r = (e ? e.ownerDocument || e : 0).documentElement;
        return !!r && "HTML" !== r.nodeName
    }
    ,
    window.Sizzle = u
}();
var setCss_styles = {
    width: "@0px",
    height: "@0px",
    minHeight: "@0px",
    maxHeight: "@0px",
    minWidth: "@0px",
    maxWidth: "@0px",
    top: "@0px",
    left: "@0px",
    bottom: "@0px",
    right: "@0px",
    margin: "@0px",
    marginTop: "@0px",
    marginLeft: "@0px",
    marginBottom: "@0px",
    marginRight: "@0px",
    padding: "@0px",
    paddingTop: "@0px",
    paddingLeft: "@0px",
    paddingBottom: "@0px",
    paddingRight: "@0px",
    rotate: "rotate(@0deg)",
    rotateX: "rotateX(@0deg)",
    rotateY: "rotateY(@0deg)",
    scale: "scale(@0,@1)",
    skew: "skew(@0deg,@1deg)",
    translate: "translate(@0px,@1px)",
    color: "rgb(@0,@1,@2)",
    backgroundColor: "rgb(@0,@1,@2)",
    backgroundPosition: "@0px @1px",
    fontSize: "@0px",
    letterSpacing: "@0px",
    lineHeight: "@0px"
};
if (!function() {
    var e = {
        inited: !1,
        init_arr: [],
        init: function() {
            if (!this.inited) {
                this.inited = !0;
                for (var e = 0; e < this.init_arr.length; e++)
                    this.init_arr[e]();
                this.resize()
            }
        },
        registerInit: function(e) {
            this.init_arr.push(e)
        },
        load_arr: [],
        load: function() {
            for (var e = 0; e < this.load_arr.length; e++)
                this.load_arr[e]()
        },
        resize_arr: [],
        resize: function() {
            for (var e = 0; e < this.resize_arr.length; e++)
                this.resize_arr[e]()
        },
        scroll_arr: [],
        scroll: function() {
            for (var e = 0; e < this.scroll_arr.length; e++)
                this.scroll_arr[e]()
        },
        windowHasFocus: !0,
        focus_arr: [],
        blur_arr: [],
        hashChange_arr: [],
        DEFAULT_DURATION: 15,
        DEFAULT_EQUATION: "quad",
        DEFAULT_EASE: "out",
        NO_ANIMATION: !1,
        fps: 30,
        multiply: 2,
        tween: function(r, n) {
            if (!r)
                throw Error("proto.tween() Invalid DOM element");
            if (void 0 == n.end)
                throw Error("proto.tween() Invalid property 'end'");
            if (n.debug)
                for (var o in tracer("\n[TWEEN]"),
                n)
                    tracer("\xa0\xa0\xa0" + o + ": " + n[o]);
            if (void 0 != n.start && (n.tweenValue ? r[n.prop] = n.start : setCss(r, n.prop, n.start, n.setPx)),
            n.tweenValue ? n.current = r[n.prop] : n.current = getCss(r, n.prop),
            isArray(n.current) && (n.current = n.current[0]),
            n.debug && tracer("\xa0\xa0\xa0current: " + n.current),
            n.current != n.end) {
                n.target = r,
                n.start = n.current,
                n.progress = 0,
                void 0 != n.skip && (n.start += (n.end - n.start) * n.skip),
                n.delay && (n.count_delay = 0),
                n.duration || (n.duration = this.DEFAULT_DURATION),
                n.equation || (n.equation = this.DEFAULT_EQUATION),
                n.ease || (n.ease = this.DEFAULT_EASE),
                n.duration *= this.multiply,
                n.ms && (n.duration /= this.fps),
                e.NO_ANIMATION && (n.duration = 1);
                var s = function() {
                    var n = 0;
                    for (var o in r._TWEENS)
                        r._TWEENS[o] && (void 0 == r._TWEENS[o].DONE ? (e.runTween(r, r._TWEENS[o]),
                        n++) : delete r._TWEENS[r._TWEENS[o].prop]);
                    0 == n && (clearInterval(r._interval),
                    r._interval = null,
                    r._TWEENS = null)
                };
                r._interval || (r._TWEENS = {},
                r._interval = setInterval(s, 1e3 / (this.fps * this.multiply))),
                r._TWEENS[n.prop] = n
            }
        },
        runTween: function(r, n) {
            n.delay && n.count_delay < n.delay ? n.count_delay++ : (n.onStart && (e.executeFunction("onStart", n.onStart),
            n.onStart = null),
            n.progress + 1 < n.duration ? (n.progress++,
            n.current = this[n.equation + "_" + n.ease](n.progress, n.start, n.end - n.start, n.duration, n.tweenvars),
            n.round && (n.current = Math.round(n.current * (1 / n.round)) / (1 / n.round)),
            n.tweenValue ? r[n.prop] = n.current : setCss(r, n.prop, n.current, n.setPx),
            n.debug && tracer("[TWEEN] " + n.prop + ": " + n.current)) : (n.progress = n.duration,
            n.tweenValue ? r[n.prop] = n.end : setCss(r, n.prop, n.end, n.setPx),
            r._TWEENS[n.prop].DONE = !0,
            n.debug && tracer("[TWEEN] " + n.prop + ": completed.")),
            n.onProgress && e.executeFunction("onProgress", n.onProgress),
            r._TWEENS[n.prop].DONE && n.onComplete && e.executeFunction("onComplete", n.onComplete))
        },
        quad_out: function(e, r, n, o) {
            return -n * (e /= o) * (e - 2) + r
        },
        executeFunction: function(e, r) {
            if (isFunction(r)) {
                r();
                return
            }
            if ("string" == typeof r[0] && (r[0] = window[r[0]]),
            void 0 != r[0])
                r[2] ? r[1].apply(r[0], r[2]) : r[1].apply(r[0]);
            else
                throw Error("proto.tween() Invalid " + e + " function")
        }
    };
    window.proto = e
}(),
document.addEventListener)
    document.addEventListener("DOMContentLoaded", function() {
        document.removeEventListener("DOMContentLoaded", arguments.callee, !1),
        proto.init()
    }, !1),
    window.addEventListener("load", function() {
        window.removeEventListener("load", arguments.callee, !1),
        proto.load()
    }, !1);
else if (window.attachEvent)
    try {
        var e = null != window.frameElement
    } catch (r) {}
"ie" == agent.browser && (8 == agent.version || 7 == agent.version) || (document.onfocusin ? (document.onfocusin = proto.on_focus,
document.onfocusout = proto.on_blur) : (window.onfocus = proto.on_focus,
window.onblur = proto.on_blur)),
window.Modernizr = function(e, r, n) {
    function o(e, r) {
        return typeof e === r
    }
    function s(e, r) {
        return !!~("" + e).indexOf(r)
    }
    function l(e, r) {
        for (var o in e) {
            var l = e[o];
            if (!s(l, "-") && g[l] !== n)
                return "pfx" != r || l
        }
        return !1
    }
    function c(e, r, n) {
        var s = e.charAt(0).toUpperCase() + e.slice(1)
          , c = (e + " " + b.join(s + " ") + s).split(" ");
        return o(r, "string") || o(r, "undefined") ? l(c, r) : a(c = (e + " " + _.join(s + " ") + s).split(" "), r, n)
    }
    var u, f, d, p = {}, m = r.documentElement, h = "modernizr", v = r.createElement(h), g = v.style, w = " -webkit- -moz- -o- -ms- ".split(" "), E = "Webkit Moz O ms", b = E.split(" "), _ = E.toLowerCase().split(" "), x = {
        svg: "http://www.w3.org/2000/svg"
    }, C = {}, S = [], T = (S.slice,
    function(e, n, o, s) {
        var l, c, u, f, d = r.createElement("div"), p = r.body, v = p || r.createElement("body");
        if (parseInt(o, 10))
            for (; o--; )
                (u = r.createElement("div")).id = s ? s[o] : h + (o + 1),
                d.appendChild(u);
        return l = ["&#173;", '<style id="s', h, '">', e, "</style>"].join(""),
        d.id = h,
        (p ? d : v).innerHTML += l,
        v.appendChild(d),
        p || (v.style.background = "",
        v.style.overflow = "hidden",
        f = m.style.overflow,
        m.style.overflow = "hidden",
        m.appendChild(v)),
        c = n(d, e),
        p ? d.parentNode.removeChild(d) : (v.parentNode.removeChild(v),
        m.style.overflow = f),
        !!c
    }
    ), N = function(r) {
        var n, o = e.matchMedia || e.msMatchMedia;
        return o ? o(r).matches : (T("@media " + r + " { #" + h + " { position: absolute; } }", function(r) {
            n = "absolute" == (e.getComputedStyle ? getComputedStyle(r, null) : r.currentStyle).position
        }),
        n)
    }, F = {}.hasOwnProperty;
    for (var A in o(F, "undefined") || o(F.call, "undefined") ? C.csstransforms = function() {
        return !!c("transform")
    }
    : d = function(e, r) {
        return F.call(e, r)
    }
    ,
    C.csstransforms3d = function() {
        var e = !!c("perspective");
        return e && "webkitPerspective"in m.style && T("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(r, n) {
            e = 9 === r.offsetLeft && 3 === r.offsetHeight
        }),
        e
    }
    ,
    C.csstransitions = function() {
        return c("transition")
    }
    ,
    C.video = function() {
        var e = r.createElement("video")
          , n = !1;
        try {
            (n = !!e.canPlayType) && ((n = new Boolean(n)).ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
            n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""),
            n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (o) {}
        return n
    }
    ,
    C.audio = function() {
        var e = r.createElement("audio")
          , n = !1;
        try {
            (n = !!e.canPlayType) && ((n = new Boolean(n)).ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (o) {}
        return n
    }
    ,
    C.localstorage = function() {
        try {
            return localStorage.setItem(h, h),
            localStorage.removeItem(h),
            !0
        } catch (e) {
            return !1
        }
    }
    ,
    C.svg = function() {
        return !!r.createElementNS && !!r.createElementNS(x.svg, "svg").createSVGRect
    }
    ,
    C)
        d(C, A) && (p[f = A.toLowerCase()] = C[A](),
        S.push((p[f] ? "" : "no-") + f));
    return p.addTest = function(e, r) {
        if ("object" == typeof e)
            for (var o in e)
                d(e, o) && p.addTest(o, e[o]);
        else {
            if (p[e = e.toLowerCase()] !== n)
                return p;
            r = "function" == typeof r ? r() : r,
            m.className += " " + (r ? "" : "no-") + e,
            p[e] = r
        }
        return p
    }
    ,
    g.cssText = "",
    v = u = null,
    function(e, r) {
        function c(e) {
            e || (e = r);
            var o, s, c = ((s = h[(o = e)[p]]) || (s = {},
            m++,
            o[p] = m,
            h[m] = s),
            s);
            return !v.shivCSS || u || c.hasCSS || (c.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),
            f || l(e, c),
            e
        }
        var u, f, d = e.html5 || {}, p = "_html5shiv", m = 0, h = {};
        (function() {
            try {
                var e, n = r.createElement("a");
                n.innerHTML = "<xyz></xyz>",
                u = "hidden"in n,
                f = 1 == n.childNodes.length || (r.createElement("a"),
                e = r.createDocumentFragment(),
                void 0 === e.cloneNode || void 0 === e.createDocumentFragment || void 0 === e.createElement)
            } catch (o) {
                u = !0,
                f = !0
            }
        }
        )();
        var v = {
            elements: d.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: !1 !== d.shivCSS,
            supportsUnknownElements: f,
            shivMethods: !1 !== d.shivMethods,
            type: "default",
            shivDocument: c,
            createElement: o,
            createDocumentFragment: s
        };
        e.html5 = v,
        c(r)
    }(this, r),
    p._version = "2.6.2",
    p._prefixes = w,
    p._domPrefixes = _,
    p._cssomPrefixes = b,
    p.mq = N,
    p.hasEvent = e,
    p.testProp = function(e) {
        return l([e])
    }
    ,
    p.testAllProps = c,
    p.testStyles = T,
    p.prefixed = function(e, r, n) {
        return r ? c(e, r, n) : c(e, "pfx")
    }
    ,
    m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + S.join(" "),
    p
}(this, this.document);


function MainNav() {
    var e = this;
    e.init = function() {
        e.fallback = !Modernizr.csstransforms3d,
        e.speed = 12,
        e.tweening = !1,
        e.nav_perc = 1,
        e.opened = !1,
        e.mainnav = $e("#mainnav"),
        e.panel = $e(".panel", e.mainnav)[0],
        e.slice1 = $e(".slice.s1", e.panel)[0],
        e.slice2 = $e(".slice.s2", e.panel)[0],
        e.slice3 = $e(".slice.s3", e.panel)[0],
        e.menu_content = $e(".menu .content", e.panel),
        e.blocks = $e("#container .blocks")[0],
        e.sliceWidth = getCss(e.slice1, "width"),
        e.sliceWidth_slice3 = getCss(e.slice3, "width"),
        e.openedWidth = 2 * e.sliceWidth + e.sliceWidth_slice3,
        e.offsetX = -3,
        e.fallback || e.setClosed(),
        forEach(e.menu_content, function(e, n) {
            setCss(n, "display", "none")
        }),
        setCss(e.mainnav, "width", e.sliceWidth_slice3);
        var n = $e("a", e.menu_content[0])
          , t = $e("a", e.menu_content[1]);
        forEach(n, function(e) {
            n[e].sibling = t[e],
            t[e].sibling = n[e],
            n[e].onmouseover = t[e].onmouseover = function() {
                addClass(this, "hover"),
                addClass(this.sibling, "hover")
            }
            ,
            n[e].onmouseout = t[e].onmouseout = function() {
                removeClass(this, "hover"),
                removeClass(this.sibling, "hover")
            }
        }),
        setCss($e("#menu_button"), "display", "block"),
        getCookie("yr_menuclicked") || (addClass($e("#menu_button"), "intro"),
        addClass($e("#jumpToMenu"), "intro")),
        e.fallback && (addClass(e.mainnav, "fallback"),
        removeClass(e.panel, "closed"))
    }
    ,
    e.openMenu = function() {
        e.opened = !0,
        e.tweening = !0,
        removeClass(e.panel, "closed"),
        setCookie("yr_menuclicked", !0),
        setCss(e.mainnav, "width", 270),
        forEach(e.menu_content, function(e, n) {
            setCss(n, "display", "block")
        }),
        proto.tween(e, {
            prop: "nav_perc",
            end: 0,
            onProgress: e.onMenuMove,
            onComplete: e.onMenuOpened,
            duration: 24
        })
    }
    ,
    e.onMenuOpened = function() {
        e.tweening = !1
    }
    ,
    e.closeMenu = function() {
        e.opened = !1,
        e.tweening = !0,
        e.fallback || addClass(e.panel, "closed"),
        setCss(e.mainnav, "width", e.sliceWidth_slice3),
        proto.tween(e, {
            prop: "nav_perc",
            end: 1,
            onProgress: e.onMenuMove,
            onComplete: e.onMenuClosed,
            duration: 12
        })
    }
    ,
    e.onMenuClosed = function() {
        forEach(e.menu_content, function(e, n) {
            setCss(n, "display", "none")
        }),
        e.tweening = !1
    }
    ,
    e.setClosed = function() {
        e.slice1.style[Modernizr.prefixed("transform")] = "translate3d(-" + e.sliceWidth + "px,0,0)",
        e.slice2.style[Modernizr.prefixed("transform")] = "translate3d(-" + e.sliceWidth + "px,0,0)",
        e.slice3.style[Modernizr.prefixed("transform")] = "translate3d(" + 2 * e.sliceWidth + "px,0,0)"
    }
    ,
    e.toggleMenu = function() {
        e.opened ? e.closeMenu() : e.openMenu()
    }
    ,
    e.onMenuMove = function() {
        if (e.fallback) {
            var n = -(2 * e.sliceWidth) * e.nav_perc;
            setCss(e.panel, "left", n)
        } else {
            var t = 90 * e.nav_perc;
            e.get3dRotatedWidth(t, e.sliceWidth),
            e.sliceWidth_slice3,
            e.offsetX,
            e.nav_perc,
            1 == e.nav_perc ? e.setClosed() : (e.slice1.style[Modernizr.prefixed("transform")] = "translate3d(0,0,0) rotateY(" + 90 * e.nav_perc + "deg)",
            e.slice2.style[Modernizr.prefixed("transform")] = "translate3d(" + Math.max(0, e.sliceWidth - 1) + "px,0,0) rotateY(" + -180 * e.nav_perc + "deg)",
            e.slice3.style[Modernizr.prefixed("transform")] = "translate3d(" + Math.max(0, e.sliceWidth - 2) + "px,0,0) rotateY(" + 90 * e.nav_perc + "deg)")
        }
    }
    ,
    e.resize = function(n) {
        e.tweening && !agent.mobile && (proto.endTween(e, "nav_perc"),
        e.onMenuMove())
    }
    ,
    e.getWidth = function() {
        return e.opened ? e.openedWidth + e.offsetX : e.sliceWidth_slice3
    }
    ,
    e.get3dRotatedWidth = function(e, n) {
        return 90 == e || 270 == e ? 0 : Math.abs(Math.cos(e * Math.PI / 180) * n)
    }
}
