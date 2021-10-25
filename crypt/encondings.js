function padding_left(e, a, t) {
    if (!e || !a || e.length >= t)
        return e;
    for (var r = (t - e.length) / a.length, i = 0; i < r; i++)
        e = a + e;
    return e
}

function isBinary(input) {
    for (var i of input) {
        if (i != 0 && i != 1) return false;
    }
    return true;
}

function isBase64(input) {
    var re = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    var answer = false;
    if (re.test(input)) {
        answer = true;
    }
    re.lastIndex = 0;
    return answer;
}

function isHex(input) {
    var re = /[0-9A-Fa-f]{6}/g;
    var answer = false;
    if (re.test(input)) {
        answer = true;
    }
    re.lastIndex = 0;
    return answer;
}

function rot(s) {
    i = 13
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
    });
}

function strTobinary(s) {
    var e, a, t = s,
        r = [],
        i = "";
    for (e = 0; e < t.length; e++)
        r.push(t[e].charCodeAt(0).toString(2));
    for (a = 0; a < r.length; a++) {
        i += padding_left(r[a], "0", 8) + " "
    }
    return i;
}

function binaryTostr(s) {
    var e = s,
        a = "";
    if ((e = e.replace(/\s/g, "")).length % 8 != 0)
        a = null;
    else
        for (; 0 < e.length;) {
            var t = e.substring(0, 8);
            e = e.substring(8);
            var r = parseInt(t, 2);
            a += String.fromCharCode(r)
        }
    return a;
}

function encodeBase64(s) {
    return Base64.encode(s)
}

function decodeBase64(s) {
    return Base64.decode(s)
}

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var a, t, r, i, n, o, l, s = "", c = 0;
        for (e = Base64._utf8_encode(e); c < e.length; )
            i = (a = e.charCodeAt(c++)) >> 2,
            n = (3 & a) << 4 | (t = e.charCodeAt(c++)) >> 4,
            o = (15 & t) << 2 | (r = e.charCodeAt(c++)) >> 6,
            l = 63 & r,
            isNaN(t) ? o = l = 64 : isNaN(r) && (l = 64),
            s = s + this._keyStr.charAt(i) + this._keyStr.charAt(n) + this._keyStr.charAt(o) + this._keyStr.charAt(l);
        return s
    },
    decode: function(e) {
        var a, t, r, i, n, o, l = "", s = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); s < e.length; )
            a = this._keyStr.indexOf(e.charAt(s++)) << 2 | (i = this._keyStr.indexOf(e.charAt(s++))) >> 4,
            t = (15 & i) << 4 | (n = this._keyStr.indexOf(e.charAt(s++))) >> 2,
            r = (3 & n) << 6 | (o = this._keyStr.indexOf(e.charAt(s++))),
            l += String.fromCharCode(a),
            64 != n && (l += String.fromCharCode(t)),
            64 != o && (l += String.fromCharCode(r));
        return l = Base64._utf8_decode(l)
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        for (var a = "", t = 0; t < e.length; t++) {
            var r = e.charCodeAt(t);
            r < 128 ? a += String.fromCharCode(r) : (127 < r && r < 2048 ? a += String.fromCharCode(r >> 6 | 192) : (a += String.fromCharCode(r >> 12 | 224),
            a += String.fromCharCode(r >> 6 & 63 | 128)),
            a += String.fromCharCode(63 & r | 128))
        }
        return a
    },
    _utf8_decode: function(e) {
        for (var a = "", t = 0, r = c1 = c2 = 0; t < e.length; )
            (r = e.charCodeAt(t)) < 128 ? (a += String.fromCharCode(r),
            t++) : 191 < r && r < 224 ? (c2 = e.charCodeAt(t + 1),
            a += String.fromCharCode((31 & r) << 6 | 63 & c2),
            t += 2) : (c2 = e.charCodeAt(t + 1),
            c3 = e.charCodeAt(t + 2),
            a += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3),
            t += 3);
        return a
    }
};
