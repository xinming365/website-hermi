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
function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
            t && (r = t);
            var _n = 0
              , F = function F() {};
            return {
                s: F,
                n: function n() {
                    return _n >= r.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: r[_n++]
                    };
                },
                e: function e(r) {
                    throw r;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a = !0, u = !1;
    return {
        s: function s() {
            t = t.call(r);
        },
        n: function n() {
            var r = t.next();
            return a = r.done,
            r;
        },
        e: function e(r) {
            u = !0,
            o = r;
        },
        f: function f() {
            try {
                a || null == t.return || t.return();
            } finally {
                if (u)
                    throw o;
            }
        }
    };
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r)
            return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name),
        "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++)
        n[e] = r[e];
    return n;
}
function _classCallCheck(a, n) {
    if (!(a instanceof n))
        throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || !1,
        o.configurable = !0,
        "value"in o && (o.writable = !0),
        Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, "prototype", {
        writable: !1
    }),
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
var Pagehome = function() {
    function Pagehome() {
        _classCallCheck(this, Pagehome);
        this.init();
    }
    return _createClass(Pagehome, [{
        key: "init",
        value: function init() {
            this.initBanner();
            this.initScrollbox('#lateralScrollbox');
            this.initSolutionSwiper('#homepageSolutionSwiper');
            this.initActivity("#homepageActivity");
            this.initActivityFirst("#homepageActivityFirst");
            this.initClassroom("#homepageClassroomSwiper");
        }
    }, {
        key: "initBanner",
        value: function initBanner() {
            layui.use(function() {
                var carousel = layui.carousel;
                carousel.render({
                    elem: '#homepageBanner',
                    arrow: 'none',
                    width: '100%',
                    height: '500px',
                    interval: 5000
                });
            });
        }
    }, {
        key: "initScrollbox",
        value: function initScrollbox(id) {
            var maxWIdth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1260;
            var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
            var box = document.querySelector(id);
            if (!box)
                return false;
            var ul = box.querySelector('ul');
            var liAll = ul.children;
            var lastLi = liAll[liAll.length - 1];
            if (lastLi.offsetLeft + lastLi.clientWidth <= maxWIdth) {
                return false;
            }
            var fragment = document.createDocumentFragment();
            var _iterator = _createForOfIteratorHelper(liAll), _step;
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                    var el = _step.value;
                    fragment.appendChild(el.cloneNode(true));
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }
            ul.appendChild(fragment);
            var maxScrollWidth = liAll[liAll.length / 2].offsetLeft;
            var marquee = function marquee() {
                box.scrollLeft = box.scrollLeft >= maxScrollWidth ? 0 : ++box.scrollLeft;
            };
            var timer = setInterval(marquee, speed);
            $(box).mouseenter(function() {
                return clearInterval(timer);
            }).mouseleave(function() {
                return timer = setInterval(marquee, speed);
            });
        }
    }, {
        key: "initSolutionSwiper",
        value: function initSolutionSwiper(id) {
            var $dots = $("#homepageSolutionSwiperDot").find('.lb-button');
            if ($dots.length === 0)
                return false;
            var _Tool$initSolutionSwi = Tool.initSolutionSwiper({
                el: id,
                callback: function callback(index) {
                    $dots.removeClass('lb-button--primary').addClass('lb-button--default').eq(index).addClass('lb-button--primary');
                }
            })
              , moveToIndex = _Tool$initSolutionSwi.moveToIndex;
            $dots.bind('click', function() {
                moveToIndex($(this).index());
            });
        }
    }, {
        key: "initActivity",
        value: function initActivity(id) {
            var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 175;
            var langWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 900;
            var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
            var $box = $(id);
            if ($box.length === 0)
                return false;
            var $items = $box.find('.lb-homepage__activity_item');
            var activeClassName = 'lb-homepage__activity_item--active';
            var activityActiveIndex = 0;
            var activityDisabled = false;
            var timer = null;
            $items.eq(activityActiveIndex).addClass(activeClassName);
            var animateFn = function animateFn() {
                var _this = this;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    var $activeItem = $(_this);
                    if ($activeItem.index() === activityActiveIndex)
                        return false;
                    if (activityDisabled)
                        return false;
                    activityDisabled = true;
                    var $beforeActiveItem = $items.eq(activityActiveIndex);
                    $beforeActiveItem.animate({
                        width: "".concat(width, "px")
                    }, speed);
                    $beforeActiveItem.find('.mask').animate({
                        opacity: 1
                    }, speed);
                    $activeItem.animate({
                        width: "".concat(langWidth, "px")
                    }, speed, function() {
                        $beforeActiveItem.removeClass(activeClassName);
                        $activeItem.addClass(activeClassName);
                        activityDisabled = false;
                        activityActiveIndex = $activeItem.index();
                    });
                    $activeItem.find('.mask').animate({
                        opacity: 0
                    }, speed);
                }, 200);
            };
            $items.bind('mouseover', animateFn);
            $items.bind('click', animateFn);
        }
    }, {
        key: "initActivityFirst",
        value: function initActivityFirst(id) {
            layui.use(function() {
                var carousel = layui.carousel;
                carousel.render({
                    elem: id,
                    arrow: 'none',
                    width: '900px',
                    height: '380px',
                    anim: 'fade',
                    interval: 5000
                });
            });
        }
    }, {
        key: "initClassroom",
        value: function initClassroom(id) {
            layui.use(function() {
                var carousel = layui.carousel;
                carousel.render({
                    elem: id,
                    arrow: 'none',
                    width: '710px',
                    height: '400px',
                    interval: 5000
                });
            });
        }
    }]);
}();
$(function() {
    var pagehomeHandler = new Pagehome();
    window.pagehomeHandler = pagehomeHandler;
});
