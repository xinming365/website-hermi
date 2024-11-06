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
function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"])
        return Array.from(r);
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r))
        return _arrayLikeToArray(r);
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
var Toolbar = function() {
    function Toolbar() {
        var _this = this;
        _classCallCheck(this, Toolbar);
        _defineProperty(this, "compare_product_name", 'lbtek_compare_products');
        _defineProperty(this, "compareIds", []);
        _defineProperty(this, "$compareModal", $("#compareModal"));
        _defineProperty(this, "compareModalVisible", false);
        _defineProperty(this, "toolbarVisible", true);
        _defineProperty(this, "compareModalHide", function(e) {
            if (!$(e.target).parents().andSelf().is(_this.$compareModal)) {
                _this.compareModalVisible = false;
                _this.$compareModal.hide();
                document.querySelector('body').removeEventListener('click', _this.compareModalHide);
            }
        });
        this.bindEvent();
        this.getCompareDataFromCookie();
        this.renderCompareNum();
        this.getCompareProductHtml();
    }
    return _createClass(Toolbar, [{
        key: "bindEvent",
        value: function bindEvent() {
            var _this2 = this;
            $("#backTop").bind('click', this.backTop);
            $("#compareEntry").bind('mouseenter', this.compareModalShow.bind(this));
            $("#expandBtn").bind('click', function(e) {
                if (_this2.toolbarVisible) {
                    $("#toolbarMain").fadeOut();
                    _this2.toolbarVisible = false;
                    $("#expandBtn").html("<i class=\"lb-toolbar__icon lb-icon-expand\"></i>");
                } else {
                    $("#toolbarMain").fadeIn();
                    _this2.toolbarVisible = true;
                    $("#expandBtn").html("<i class=\"lb-toolbar__icon lb-icon-compress\"></i>");
                }
                LSH.setItem('toolbarVisible', _this2.toolbarVisible);
            });
            $("#expandBtn").bind('mouseenter', function() {
                if (!_this2.toolbarVisible && window.innerWidth <= 1920) {
                    $("#expandBtn").animate({
                        right: '0'
                    });
                }
            });
            $("#expandBtn").bind('mouseleave', function() {
                if (!_this2.toolbarVisible && window.innerWidth <= 1920) {
                    $("#expandBtn").animate({
                        right: -30
                    });
                }
            });
            if (LSH.getItem('toolbarVisible') === false) {
                $("#expandBtn").trigger('click');
                $("#expandBtn").trigger('mouseleave');
            }
        }
    }, {
        key: "backTop",
        value: function backTop(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        }
    }, {
        key: "contactService",
        value: function contactService(e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            $("#serviceModal").fadeIn();
            $("#serviceModal .lb-service-modal__close").one('click', function() {
                $("#serviceModal").fadeOut();
            });
        }
    }, {
        key: "changeCartNums",
        value: function changeCartNums(num) {
            $('#cartNums,#headerCartNums').html(num);
        }
    }, {
        key: "addProductAnimation",
        value: function addProductAnimation(e) {
            var hei = $(window).scrollTop();
            var offset = $('#cartAnimationEnd').offset();
            var flyer = $('<img class="u-flyer" id="flyer" width="100" height="100" src="/static/icon/height-light1.png"/>');
            flyer.fly({
                start: {
                    left: e.pageX,
                    top: e.pageY - hei
                },
                end: {
                    left: offset.left,
                    top: offset.top - hei,
                    width: 20,
                    height: 20
                }
            });
        }
    }, {
        key: "getCompareDataFromCookie",
        value: function getCompareDataFromCookie() {
            var compareStr = Tool.docCookies.getItem(this.compare_product_name);
            if (compareStr !== null) {
                this.compareIds = compareStr.split('_');
            }
        }
    }, {
        key: "setCompareDataToCookie",
        value: function setCompareDataToCookie() {
            var value = this.compareIds.join('_');
            Tool.docCookies.setItem(this.compare_product_name, value, Infinity, '/');
        }
    }, {
        key: "renderCompareNum",
        value: function renderCompareNum() {
            $('#compareNum').html(this.compareIds.length);
        }
    }, {
        key: "addCompares",
        value: function addCompares(id) {
            var showPanel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            if (this.compareIds.length >= 5) {
                layer.msg('最多对比5个产品');
                return false;
            }
            if (this.compareIds.findIndex(function(k) {
                return k == id;
            }) > -1) {
                layer.msg('添加的产品已存在对比列表中，请勿重复添加');
                return false;
            }
            this.getCompareDataFromCookie();
            this.compareIds = [].concat(_toConsumableArray(this.compareIds), [id]);
            this.setCompareDataToCookie();
            this.renderCompareNum();
            this.getCompareProductHtml(showPanel);
            return true;
        }
    }, {
        key: "removeCompares",
        value: function removeCompares(id) {
            var showPanel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            this.getCompareDataFromCookie();
            var index = this.compareIds.findIndex(function(v) {
                return v == id;
            });
            if (index > -1) {
                this.compareIds.splice(index, 1);
                this.setCompareDataToCookie();
                this.renderCompareNum();
                this.getCompareProductHtml(showPanel);
                return true;
            } else {
                console.error("\u5BF9\u6BD4\u5217\u8868\u4E2D\u627E\u4E0D\u5230id\u4E3A".concat(id, "\u7684\u4EA7\u54C1\uFF01"));
                return false;
            }
        }
    }, {
        key: "clearCompares",
        value: function clearCompares() {
            this.compareIds = [];
            this.setCompareDataToCookie();
            this.renderCompareNum();
            this.getCompareProductHtml();
        }
    }, {
        key: "getCompareProductHtml",
        value: function getCompareProductHtml(showPanel) {
            var _this3 = this;
            if (this.compareIds.length === 0) {
                this.$compareModal.hide();
                this.$compareModal.html('');
            } else {
                Api.Product.getCompare().then(function(res) {
                    if (res.success) {
                        _this3.$compareModal.html(res.html);
                        if (showPanel) {
                            _this3.compareModalShow();
                        }
                    }
                });
            }
        }
    }, {
        key: "compareModalShow",
        value: function compareModalShow() {
            if (!this.compareModalVisible && this.compareIds.length > 0) {
                this.compareModalVisible = true;
                this.$compareModal.show();
                document.querySelector('body').addEventListener('click', this.compareModalHide);
            }
        }
    }]);
}();
$(function() {
    var toolbarHandler = new Toolbar();
    window.toolbarHandler = toolbarHandler;
});
