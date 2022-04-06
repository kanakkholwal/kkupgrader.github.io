function prettify(r, e) {
    function t(r) { for (r = void 0 !== r && r; C.length && (" " === C[C.length - 1] || C[C.length - 1] === b || C[C.length - 1] === er || r && ("\n" === C[C.length - 1] || "\r" === C[C.length - 1]));) C.pop() }

    function T(r) { return r.replace(/^\s\s*|\s\s*$/, "") }

    function E(r) { for (var e = [], t = (r = r.replace(/\x0d/g, "")).indexOf("\n"); - 1 !== t;) e.push(r.substring(0, t)), t = (r = r.substring(t + 1)).indexOf("\n"); return r.length && e.push(r), e }

    function n() {
        var r = y;
        y = !1, O(), y = r
    }

    function O(r) {
        if (p.i = !1, (!y || !c(p.mode)) && (r = void 0 === r || r, p.f = !1, t(), C.length)) {
            for ("\n" === C[C.length - 1] && r || (F = !0, C.push("\n")), er && C.push(er), r = 0; r < p.c; r += 1) C.push(b);
            p.a && p.b && C.push(b), p.h && C.push(b)
        }
    }

    function a() {
        if ("TK_COMMENT" === l) O();
        else if (p.i) p.i = !1;
        else {
            var r = " ";
            C.length && (r = C[C.length - 1]), " " !== r && "\n" !== r && r !== b && C.push(" ")
        }
    }

    function _() { F = !1, p.i = !1, C.push(d) }

    function K() { p.c += 1 }

    function i() { C.length && C[C.length - 1] === b && C.pop() }

    function f(r) { p && D.push(p), p = { l: p ? p.mode : "BLOCK", mode: r, a: !1, g: !1, b: !1, s: !1, f: !1, v: !1, o: !1, h: !1, i: !1, j: -1, c: p ? p.c + (p.h ? 1 : 0) + (p.a && p.b ? 1 : 0) : 0, m: 0 } }

    function c(r) { return "[EXPRESSION]" === r || "[INDENTED-EXPRESSION]" === r }

    function N(r) { return S(r, ["[EXPRESSION]", "(EXPRESSION)", "(FOR-EXPRESSION)", "(COND-EXPRESSION)"]) }

    function o() {
        if (x = "DO_BLOCK" === p.mode, 0 < D.length) {
            var r = p.mode;
            (p = D.pop()).l = r
        }
    }

    function h(r) {
        var e;
        for (e = 0; e < r.length; e++)
            if ("*" !== T(r[e]).charAt(0)) return !1;
        return !0
    }

    function R(r) { return S(r, "case return do if throw else".split(" ")) }

    function S(r, e) {
        for (var t = 0; t < e.length; t += 1)
            if (e[t] === r) return !0;
        return !1
    }

    function s(r) {
        for (var e = g, t = A.charAt(e); S(t, M) && t !== r;) {
            if (++e >= z) return 0;
            t = A.charAt(e)
        }
        return t
    }

    function u() {
        var r, e, E, n, a, _;
        if (U = 0, g >= z) return ["", "TK_EOF"];
        if (w = !1, e = A.charAt(g), g += 1, y && c(p.mode)) {
            for (E = 0; S(e, M);) {
                if ("\n" === e ? (t(), C.push("\n"), F = !0, E = 0) : "\t" === e ? E += 4 : "\r" === e || (E += 1), g >= z) return ["", "TK_EOF"];
                e = A.charAt(g), g += 1
            }
            if (-1 === p.j && (p.j = E), F) {
                for (r = 0; r < p.c + 1; r += 1) C.push(b);
                if (-1 !== p.j)
                    for (r = 0; r < E - p.j; r++) C.push(" ")
            }
        } else {
            for (; S(e, M);) {
                if ("\n" === e && (U += J && U > J ? 0 : 1), g >= z) return ["", "TK_EOF"];
                e = A.charAt(g), g += 1
            }
            if (j && U > 1)
                for (r = 0; U > r; r += 1) O(0 === r), F = !0;
            w = U > 0
        }
        if (S(e, X)) {
            if (z > g)
                for (; S(A.charAt(g), X) && (e += A.charAt(g), (g += 1) !== z););
            return g === z || !e.match(/^[0-9]+[Ee]$/) || "-" !== A.charAt(g) && "+" !== A.charAt(g) ? "in" === e ? [e, "TK_OPERATOR"] : (!w || "TK_OPERATOR" === l || "TK_EQUALS" === l || p.f || !j && "var" === I || O(), [e, "TK_WORD"]) : (n = A.charAt(g), g += 1, [e += n + (a = u())[0], "TK_WORD"])
        }
        if ("(" === e || "[" === e) return [e, "TK_START_EXPR"];
        if (")" === e || "]" === e) return [e, "TK_END_EXPR"];
        if ("{" === e) return [e, "TK_START_BLOCK"];
        if ("}" === e) return [e, "TK_END_BLOCK"];
        if (";" === e) return [e, "TK_SEMICOLON"];
        if ("/" === e) {
            if (r = "", E = !0, "*" === A.charAt(g)) {
                if (z > (g += 1))
                    for (; z > g && ("*" !== A.charAt(g) || !A.charAt(g + 1) || "/" !== A.charAt(g + 1)) && (r += e = A.charAt(g), ("\n" === e || "\r" === e) && (E = !1), z > (g += 1)););
                return g += 2, E && 0 === U ? ["/*" + r + "*/", "TK_INLINE_COMMENT"] : ["/*" + r + "*/", "TK_BLOCK_COMMENT"]
            }
            if ("/" === A.charAt(g)) {
                for (r = e;
                    "\r" !== A.charAt(g) && "\n" !== A.charAt(g) && (r += A.charAt(g), z > (g += 1)););
                return w && O(), [r, "TK_COMMENT"]
            }
        }
        if ("'" === e || '"' === e || "/" === e && ("TK_WORD" === l && R(I) || ")" === I && S(p.l, ["(COND-EXPRESSION)", "(FOR-EXPRESSION)"]) || "TK_COMMA" === l || "TK_COMMENT" === l || "TK_START_EXPR" === l || "TK_START_BLOCK" === l || "TK_END_BLOCK" === l || "TK_OPERATOR" === l || "TK_EQUALS" === l || "TK_EOF" === l || "TK_SEMICOLON" === l)) {
            if (E = e, n = !1, a = 0, _ = 0, r = e, z > g)
                if ("/" === E) {
                    for (e = !1; n || e || A.charAt(g) !== E;)
                        if (r += A.charAt(g), n ? n = !1 : (n = "\\" === A.charAt(g), "[" === A.charAt(g) ? e = !0 : "]" === A.charAt(g) && (e = !1)), (g += 1) >= z) return [r, "TK_STRING"]
                } else
                    for (; n || A.charAt(g) !== E;)
                        if (r += A.charAt(g), a && a >= _ && (!(a = parseInt(r.substr(-_), 16)) || 32 > a || a > 126 || (a = String.fromCharCode(a), r = r.substr(0, r.length - _ - 2) + (a === E || "\\" === a ? "\\" : "") + a), a = 0), a ? a++ : n ? (n = !1, q && ("x" === A.charAt(g) ? (a++, _ = 2) : "u" === A.charAt(g) && (a++, _ = 4))) : n = "\\" === A.charAt(g), (g += 1) >= z) return [r, "TK_STRING"];
            if (g += 1, r += E, "/" === E)
                for (; z > g && S(A.charAt(g), X);) r += A.charAt(g), g += 1;
            return [r, "TK_STRING"]
        }
        if ("#" === e) { if (0 === C.length && "!" === A.charAt(g)) { for (r = e; z > g && "\n" !== e;) r += e = A.charAt(g), g += 1; return C.push(T(r) + "\n"), O(), u() } if (r = "#", z > g && S(A.charAt(g), v)) { do { r += e = A.charAt(g), g += 1 } while (z > g && "#" !== e && "=" !== e); return "#" === e || ("[" === A.charAt(g) && "]" === A.charAt(g + 1) ? (r += "[]", g += 2) : "{" === A.charAt(g) && "}" === A.charAt(g + 1) && (r += "{}", g += 2)), [r, "TK_WORD"] } }
        if ("<" === e && "\x3c!--" === A.substring(g - 1, g + 3)) {
            for (g += 3, e = "\x3c!--";
                "\n" !== A.charAt(g) && z > g;) e += A.charAt(g), g++;
            return p.s = !0, [e, "TK_COMMENT"]
        }
        if ("-" === e && p.s && "--\x3e" === A.substring(g - 1, g + 2)) return p.s = !1, g += 2, w && O(), ["--\x3e", "TK_COMMENT"];
        if (S(e, B)) { for (; z > g && S(e + A.charAt(g), B) && (e += A.charAt(g), z > (g += 1));); return "," === e ? [e, "TK_COMMA"] : "=" === e ? [e, "TK_EQUALS"] : [e, "TK_OPERATOR"] }
        return [e, "TK_UNKNOWN"]
    }
    var A, C, d, l, I, L, P, p, D, b, M, X, B, g, m, v, k, W, x, w, F, U, G, j, J, Q, y, $, H, q, z, V, Y, Z, rr, er = "";
    for (void 0 !== (e = e || {}).I && void 0 === e.u && (e.u = e.I), void 0 !== e.A && (G = e.A ? "expand" : "collapse"), G = e.w ? e.w : G || "collapse", m = e.D ? e.D : 4, P = e.C ? e.C : " ", j = void 0 === e.H || e.H, J = void 0 !== e.G && e.G, Q = "undefined" !== e.u && e.u, y = void 0 !== e.F && e.F, $ = void 0 === e.J || e.J, H = void 0 !== e.B && e.B, q = void 0 !== e.K && e.K, F = !1, z = r.length, b = ""; m > 0;) b += P, --m;
    for (; r && (" " === r.charAt(0) || "\t" === r.charAt(0));) er += r.charAt(0), r = r.substring(1);
    for (A = r, P = "", l = "TK_START_EXPR", L = I = "", C = [], x = !1, M = ["\n", "\r", "\t", " "], X = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split(""), v = "0123456789".split(""), B = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::", B = (B += " <%= <% %> <?= <? ?>").split(" "), m = "continue try throw return var if switch case default for while break function".split(" "), D = [], f("BLOCK"), g = 0; V = u(), d = V[0], "TK_EOF" !== (W = V[1]);) {
        switch (W) {
            case "TK_START_EXPR":
                if ("[" === d) { if ("TK_WORD" === l || ")" === I) { S(I, m) && a(), f("(EXPRESSION)"), _(); break } "[EXPRESSION]" === p.mode || "[INDENTED-EXPRESSION]" === p.mode ? "]" === L && "," === I ? ("[EXPRESSION]" === p.mode && (p.mode = "[INDENTED-EXPRESSION]", y || K()), f("[EXPRESSION]"), y || O()) : "[" === I ? ("[EXPRESSION]" === p.mode && (p.mode = "[INDENTED-EXPRESSION]", y || K()), f("[EXPRESSION]"), y || O()) : f("[EXPRESSION]") : f("[EXPRESSION]") } else "for" === P ? f("(FOR-EXPRESSION)") : S(P, ["if", "while"]) ? f("(COND-EXPRESSION)") : f("(EXPRESSION)");
                ";" === I || "TK_START_BLOCK" === l ? O() : "TK_END_EXPR" === l || "TK_START_EXPR" === l || "TK_END_BLOCK" === l || "." === I ? w && O() : "TK_WORD" !== l && "TK_OPERATOR" !== l ? a() : "function" === P || "typeof" === P ? Q && a() : (S(I, m) || "catch" === I) && $ && a(), _();
                break;
            case "TK_END_EXPR":
                if ("]" === d)
                    if (y) { if ("}" === I) { i(), _(), o(); break } } else if ("[INDENTED-EXPRESSION]" === p.mode && "]" === I) { o(), O(), _(); break }
                o(), _();
                break;
            case "TK_START_BLOCK":
                f("do" === P ? "DO_BLOCK" : "BLOCK"), "expand" === G || "expand-strict" === G ? (Y = !1, "expand-strict" === G ? (Y = "}" === s()) || O(!0) : "TK_OPERATOR" !== l && ("=" === I || R(I) && "else" !== I ? a() : O(!0)), _(), Y || K()) : ("TK_OPERATOR" !== l && "TK_START_EXPR" !== l ? "TK_START_BLOCK" === l ? O() : a() : c(p.l) && "," === I && ("}" === L ? a() : O()), K(), _());
                break;
            case "TK_END_BLOCK":
                o(), "expand" === G || "expand-strict" === G ? ("{" !== I && O(), _()) : ("TK_START_BLOCK" === l ? F ? i() : t() : c(p.mode) && y ? (y = !1, O(), y = !0) : O(), _());
                break;
            case "TK_WORD":
                if (x) { a(), _(), a(), x = !1; break }
                if (k = "NONE", "function" === d) {
                    if (p.a && "TK_EQUALS" !== l && (p.b = !0), (F || ";" === I) && "{" !== I && "TK_BLOCK_COMMENT" !== l && "TK_COMMENT" !== l)
                        for (U = F ? U : 0, j || (U = 1), P = 0; 2 - U > P; P++) O(!1);
                    "TK_WORD" === l ? "get" === I || "set" === I || "new" === I || "return" === I ? a() : O() : "TK_OPERATOR" === l || "=" === I ? a() : N(p.mode) || O(), _(), P = d;
                    break
                }
                if ("case" === d || "default" === d && p.v) { ":" === I || p.h ? i() : (H || p.c--, O(), H || p.c++), _(), p.o = !0, p.v = !0, p.h = !1; break }
                "TK_END_BLOCK" === l ? S(d.toLowerCase(), ["else", "catch", "finally"]) ? "expand" === G || "end-expand" === G || "expand-strict" === G ? k = "NEWLINE" : (k = "SPACE", a()) : k = "NEWLINE" : "TK_SEMICOLON" !== l || "BLOCK" !== p.mode && "DO_BLOCK" !== p.mode ? "TK_SEMICOLON" === l && N(p.mode) ? k = "SPACE" : "TK_STRING" === l ? k = "NEWLINE" : "TK_WORD" === l ? ("else" === I && t(!0), k = "SPACE") : "TK_START_BLOCK" === l ? k = "NEWLINE" : "TK_END_EXPR" === l && (a(), k = "NEWLINE") : k = "NEWLINE", S(d, m) && ")" !== I && (k = "else" === I ? "SPACE" : "NEWLINE"), p.f && "TK_END_EXPR" === l && (p.f = !1), S(d.toLowerCase(), ["else", "catch", "finally"]) ? "TK_END_BLOCK" !== l || "expand" === G || "end-expand" === G || "expand-strict" === G ? O() : (t(!0), a()) : "NEWLINE" === k ? R(I) ? a() : "TK_END_EXPR" !== l ? "TK_START_EXPR" === l && "var" === d || ":" === I || ("if" === d && "else" === P && "{" !== I ? a() : (p.a = !1, p.b = !1, O())) : S(d, m) && ")" !== I && (p.a = !1, p.b = !1, O()) : c(p.mode) && "," === I && "}" === L ? O() : "SPACE" === k && a(), _(), P = d, "var" === d && (p.a = !0, p.b = !1, p.g = !1), "if" === d && (p.f = !0), "else" === d && (p.f = !1);
                break;
            case "TK_SEMICOLON":
                _(), p.a = !1, p.b = !1, "OBJECT" === p.mode && (p.mode = "BLOCK");
                break;
            case "TK_STRING":
                "TK_END_EXPR" === l && S(p.l, ["(COND-EXPRESSION)", "(FOR-EXPRESSION)"]) ? a() : "TK_COMMENT" === l || "TK_STRING" === l || "TK_START_BLOCK" === l || "TK_END_BLOCK" === l || "TK_SEMICOLON" === l ? O() : "TK_WORD" === l && a(), _();
                break;
            case "TK_EQUALS":
                p.a && (p.g = !0), a(), _(), a();
                break;
            case "TK_COMMA":
                if (p.a) {
                    if ((N(p.mode) || "TK_END_BLOCK" === l) && (p.g = !1), p.g) { _(), p.b = !0, p.g = !1, O(); break }
                    p.g = !1, _(), a();
                    break
                }
                "TK_COMMENT" === l && O(), "TK_END_BLOCK" === l && "(EXPRESSION)" !== p.mode ? (_(), "OBJECT" === p.mode && "}" === I ? O() : a()) : "OBJECT" === p.mode ? (_(), O()) : (_(), a());
                break;
            case "TK_OPERATOR":
                if (k = !0, Z = !0, R(I)) { a(), _(); break }
                if ("*" === d && "TK_UNKNOWN" === l && !L.match(/^\d+$/)) { _(); break }
                if (":" === d && p.o) { H && (p.h = !0), _(), O(), p.o = !1; break }
                if ("::" === d) { _(); break }
                S(d, ["--", "++", "!"]) || S(d, ["-", "+"]) && (S(l, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || S(I, m)) ? (k = !1, Z = !1, ";" === I && N(p.mode) && (k = !0), "TK_WORD" === l && S(I, m) && (k = !0), "BLOCK" !== p.mode || "{" !== I && ";" !== I || O()) : "." === d ? k = !1 : ":" === d ? 0 === p.m ? ("BLOCK" === p.mode && (p.mode = "OBJECT"), k = !1) : --p.m : "?" === d && (p.m += 1), k && a(), _(), Z && a();
                break;
            case "TK_BLOCK_COMMENT":
                if (h((rr = E(d)).slice(1)))
                    for (O(), C.push(rr[0]), L = 1; L < rr.length; L++) O(), C.push(" "), C.push(T(rr[L]));
                else
                    for (1 < rr.length ? O() : "TK_END_BLOCK" === l ? O() : a(), L = 0; L < rr.length; L++) C.push(rr[L]), C.push("\n");
                "\n" !== s("\n") && O();
                break;
            case "TK_INLINE_COMMENT":
                a(), _(), N(p.mode) ? a() : n();
                break;
            case "TK_COMMENT":
                "," !== I || w || t(!0), "TK_COMMENT" !== l && (w ? O() : a()), _(), O();
                break;
            case "TK_UNKNOWN":
                R(I) && a(), _()
        }
        L = I, l = W, I = d
    }
    return W = er + C.join("").replace(/[\r\n ]+$/, "")
}
var code = `$(document).ready(function(){
    var comments = $('.comments.threaded');comments.before('<button class="btn" id="showComments">Show / Hide Comments</button>');comments.addClass('hidden');$('#showComments').click(function(){comments.toggleClass('hidden')});
    });`;

var button = document.getElementById('beautify');
button.onclick = function() {
    minified.innerText = prettify(source_code.value);
    Prism.highlightAll();

}
source_code.value = code;

minified.innerText = prettify(code);