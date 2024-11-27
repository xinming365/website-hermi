"use strict";
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    }
    : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }
    ,
    _typeof(o);
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })),
        t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r))in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t,
    e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t)
        return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
            return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}
;
if (!location.origin) {
    location.origin = location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '');
}
var docCookies = {
    getItem: function getItem(sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
            case Number:
                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                break;
            case String:
                sExpires = "; expires=" + vEnd;
                break;
            case Date:
                sExpires = "; expires=" + vEnd.toUTCString();
                break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function removeItem(sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function hasItem(sKey) {
        return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
    },
    keys: function keys() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
};
var Tool = {
    docCookies: docCookies,
    reg: {
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
        phone: /^1[3-9][0-9]\d{8}$/,
        email: /^.+@.+\..+$/
    },
    urlGetId: function urlGetId() {
        var list = location.pathname.split("/");
        var id = list[list.length - 1];
        return id.replace('.html', '').replace(".htm", '');
    },
    urlGetValueByKey: function urlGetValueByKey(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)','i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    },
    urlReplace: function urlReplace(name, value) {
        var url = location.origin + location.pathname;
        var search = location.search;
        if (!search) {
            return url + '?' + name + '=' + value;
        }
        var reg = new RegExp("(^|[&, ?])".concat(name, "=[^&]+(&|$)"),'i');
        var r = search.match(reg);
        return r ? url + search.replace(reg, r[1] + name + '=' + value + r[2]) : url + search + '&' + name + '=' + value;
    },
    debounce: function debounce(fn, delay) {
        var time = null;
        return function(e) {
            var _arguments = arguments
              , _this = this;
            if (time) {
                clearTimeout(time);
            }
            time = setTimeout(function() {
                fn.apply(_this, _arguments);
            }, delay);
        }
        ;
    },
    blueTips: function blueTips(element, tips) {
        $(element).hover(function() {
            layer.tips(tips, element, {
                tips: [1, '#f5f5f5'],
                time: 4000
            });
        }, function() {
            return layer.closeAll('tips');
        });
    },
    signature: function signature(params, url) {
        var secretKey = 'MjQyNmJmYWQzM2YxYjJmNzA0NWVjOTZmNzRlOTQzOTI=';
        return window.btoa(unescape(encodeURIComponent(JSON.stringify(params)) + url + secretKey));
    }
};
Tool.modal = {
    canShow: function canShow(name) {
        return !docCookies.getItem(name);
    },
    cache: function cache(name, flag) {
        if (flag) {
            docCookies.setItem(name, 'Valar Morghulis', Infinity);
        } else {
            var date = new Date();
            var hours = date.getHours();
            if (hours < 12) {
                date.setHours(11, 59, 59);
            } else {
                date.setHours(23, 59, 59);
            }
            docCookies.setItem(name, 'Valar Morghulis', date);
        }
    }
};
Tool.activity = {
    validTime: function validTime(start, end) {
        var startTime = dayjs(start);
        var endTime = dayjs(end);
        var now = dayjs();
        return startTime.isBefore(now) && now.isBefore(endTime);
    }
};
Tool.jsonp = function(_ref) {
    var url = _ref.url
      , _ref$params = _ref.params
      , params = _ref$params === void 0 ? {} : _ref$params
      , callback = _ref.callback;
    var num = 1000000000;
    var fnName = "fn_".concat(Math.ceil(Math.random() * num), "_").concat(Math.ceil(Math.random() * num), "_").concat(Math.ceil(Math.random() * num));
    var temp = _objectSpread({
        output: 'jsonp',
        callback: fnName
    }, params);
    var src = '?';
    for (var k in temp) {
        src += "".concat(k, "=").concat(temp[k], "&");
    }
    window[fnName] = callback;
    var script = document.createElement('script');
    script.src = url + src;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}
;
Tool.getAddressCode = function(_callback) {
    Tool.jsonp({
        url: 'https://apis.map.qq.com/ws/location/v1/ip',
        params: {
            key: 'NNXBZ-7VHEV-LJOPD-U4ZUI-DZMNV-UJFCR'
        },
        callback: function callback(data) {
            if (data.status === 0) {
                _callback(data.result.ad_info.adcode);
            } else {
                _callback(null);
            }
        }
    });
}
;
Tool.isMobile = function() {
    var os = function() {
        var ua = navigator.userAgent
          , isWindowsPhone = /(?:Windows Phone)/.test(ua)
          , isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
          , isAndroid = /(?:Android)/.test(ua)
          , isFireFox = /(?:Firefox)/.test(ua)
          , isChrome = /(?:Chrome|CriOS)/.test(ua)
          , isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua)
          , isPhone = /(?:iPhone)/.test(ua) && !isTablet
          , isPc = !isPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };
    }();
    return os.isAndroid || os.isPhone;
}
;
Tool.residueTime = function(residue) {
    if (residue <= 0) {
        return {
            d: '00',
            h: '00',
            m: '00',
            s: '00'
        };
    }
    var d = Math.floor(residue / 86400);
    var h = Math.floor(residue % 86400 / 60 / 60);
    var m = Math.floor(residue / 60 % 60);
    var s = Math.floor(residue % 60);
    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (h < 10) {
        h = "0" + h;
    }
    var text = (d ? "".concat(d, "\u5929") : '') + "".concat(h, "\u65F6").concat(m, "\u5206").concat(s, "\u79D2");
    return {
        d: d,
        h: h,
        m: m,
        s: s,
        text: text
    };
}
;
Tool.validOptions = {
    errorElement: 'span',
    errorClass: 'error-false',
    validClass: 'right',
    onfocusout: function onfocusout(element) {
        $(element).valid();
    },
    errorPlacement: function errorPlacement(error, element) {
        element.parent().append(error);
    },
    highlight: function highlight(element, errorClass, validClass) {
        $(element).addClass('false');
    },
    success: function success($span) {
        $span.parent().children('input').removeClass('false');
    }
};
Tool.awaitFrom = function(obj, attrName, callback) {
    var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
    obj[attrName] !== undefined ? callback() : setTimeout(function() {
        return Tool.awaitFrom(obj, attrName, callback);
    }, time);
}
;
Tool.getAllAncestors = function(el) {
    var parents = [];
    while (el.parentElement) {
        parents.push(el.parentElement);
        el = el.parentElement;
    }
    return parents;
}
;
Tool.initSolutionSwiper = function(_ref2) {
    var el = _ref2.el
      , _ref2$interval = _ref2.interval
      , interval = _ref2$interval === void 0 ? 5000 : _ref2$interval
      , _ref2$callback = _ref2.callback
      , callback = _ref2$callback === void 0 ? function() {}
    : _ref2$callback;
    var $wapper = $(el);
    if ($wapper.length === 0)
        return false;
    var $items = $wapper.find('.lb-solution-swiper__item');
    var length = $items.length;
    $items.eq(0).addClass('lb-solution-swiper__item--active');
    $items.eq(1).addClass('lb-solution-swiper__item--next');
    $items.eq(length - 1).addClass('lb-solution-swiper__item--prev');
    var activeIndex = 0;
    var moveToIndex = function moveToIndex(index) {
        activeIndex = index;
        var prevIndex = index === 0 ? length - 1 : index - 1;
        var nextIndex = index === length - 1 ? 0 : index + 1;
        $items.removeClass('lb-solution-swiper__item--active lb-solution-swiper__item--next lb-solution-swiper__item--prev');
        $items.eq(activeIndex).addClass('lb-solution-swiper__item--active');
        $items.eq(prevIndex).addClass('lb-solution-swiper__item--prev');
        $items.eq(nextIndex).addClass('lb-solution-swiper__item--next');
        callback(activeIndex);
    };
    var $prevButton = $("<div class=\"lb-solution-swiper__control lb-solution-swiper__control--prev\"><i class=\"lb-icon-shouqi\"></i></div>");
    var $nextButton = $("<div class=\"lb-solution-swiper__control lb-solution-swiper__control--next\"><i class=\"lb-icon-shouqi\"></i></div>");
    var prevFn = function prevFn() {
        return moveToIndex(--activeIndex < 0 ? length - 1 : activeIndex);
    };
    var nextFn = function nextFn() {
        return moveToIndex(++activeIndex > length - 1 ? 0 : activeIndex);
    };
    $prevButton.bind('click', prevFn);
    $nextButton.bind('click', nextFn);
    $wapper.append($prevButton);
    $wapper.append($nextButton);
    var timer = setInterval(nextFn, interval);
    $wapper.mouseenter(function() {
        return clearInterval(timer);
    }).mouseleave(function() {
        return timer = setInterval(nextFn, interval);
    });
    moveToIndex(0);
    return {
        moveToIndex: moveToIndex,
        prevFn: prevFn,
        nextFn: nextFn
    };
}
;
Tool.toolTip = function() {
    layui.use('util', function() {
        layui.util.on('lay-mouseenter', {
            toolTip: function toolTip($this) {
                var _this2 = this;
                var delay = $this.data('delay') || 300;
                var tip = this.dataset.tip || $(this).html();
                var index = null;
                var si = setTimeout(function() {
                    index = layer.tips(tip, _this2, {
                        tips: 1,
                        anim: -1,
                        time: -1
                    });
                }, delay);
                $(this).unbind('mouseleave').bind('mouseleave', function() {
                    if (index)
                        layer.close(index);
                    clearTimeout(si);
                });
            }
        }, {
            trigger: 'mouseenter'
        });
    });
}
;
Tool.toolTip();
Tool.initFormVerify = function() {
    layui.use('form', function() {
        var form = layui.form;
        form.verify({
            required: function required(value, elem) {
                var min = elem.getAttribute('min');
                var max = elem.getAttribute('max');
                var placeholder = elem.getAttribute("placeholder");
                if (!value) {
                    return placeholder || '必填项不能为空';
                }
                if (min && value.length < min) {
                    return "\u957F\u5EA6\u6700\u5C0F\u4E3A".concat(min, "\u4E2A\u5B57\u7B26");
                }
                if (max && value.length > max) {
                    return "\u957F\u5EA6\u6700\u5927\u4E3A".concat(max, "\u4E2A\u5B57\u7B26");
                }
            }
        });
    });
}
;
Tool.initFormVerify();
Tool.getLeadtimeContent = function(num, dynamic_leadtime, leadtime, safe_stock, stock, special_leadtime) {
    var styleType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'product';
    var day = leadtime <= 0 || num > safe_stock ? leadtime : dynamic_leadtime;
    var waitWeek = Math.ceil(day / 7) + '周';
    if (day <= 0 || day > 56) {
        return "<span class=\"lb-button lb-button--primary is-radius lb-leadtime-btn\" onclick=\"toolbarHandler.contactService()\">\u8054\u7CFB\u5BA2\u670D</span>";
    }
    var current = '当天';
    if (special_leadtime > 0) {
        current = Math.ceil(special_leadtime / 7) + '周';
    }
    if (styleType === 'product') {
        if (stock <= 0) {
            return "<span>".concat(waitWeek, "</span>");
        }
        if (num > stock) {
            return "<span class=\"lb-leadtime\"><i>".concat(current, "\uFF1A").concat(stock, "</i><i>").concat(waitWeek, "\uFF1A").concat(num - stock, "</i></span>");
        }
        return "<span>".concat(current, "</span>");
    }
    if (styleType === 'cart') {
        if (stock <= 0) {
            return "<span class=\"lb-leadtime\">".concat(waitWeek, "</span>");
        }
        if (num > stock) {
            return "<span class=\"lb-leadtime\"><i>".concat(current, "\uFF1A").concat(stock, "</i><i>").concat(waitWeek, "\uFF1A").concat(num - stock, "</i></span>");
        }
        return current != '当天' ? "<span class=\"lb-leadtime\">".concat(current, "</span>") : '<span>当天</span>';
    }
}
;
