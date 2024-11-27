"use strict";
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
var searchApp = new Vue({
    el: '#searchApp',
    name: 'searchApp',
    data: function data() {
        return {
            filter: '',
            visible: false,
            isHistory: true,
            type: 'suggest',
            list: [],
            historyList: []
        };
    },
    created: function created() {
        this.filter = Tool.urlGetValueByKey('search');
    },
    methods: {
        focusFn: function focusFn() {
            var _this = this;
            if (!this.visible) {
                this.visible = true;
                setTimeout(function() {
                    document.querySelector('body').addEventListener('click', _this.closeFn);
                }, 0);
            }
        },
        closeFn: function closeFn(e) {
            var _this2 = this;
            var els = [e.target].concat(_toConsumableArray(Tool.getAllAncestors(e.target)));
            if (els.findIndex(function(el) {
                return el === _this2.$el;
            }) === -1) {
                this.visible = false;
                document.querySelector('body').removeEventListener('click', this.closeFn);
            }
        },
        inputFn: function inputFn() {
            var data = this.$refs['searchInput'].value;
            this.filter = data;
            if (data && data.replace(/ /g, '')) {
                if (!this.visible) {
                    this.focusFn();
                }
            }
        },
        searchFn: function searchFn() {
            if (this.filter) {
                this.setHistory(this.filter);
                location.href = '/search.html?search=' + this.filter;
            } else {
                console.warn('没有输入，不允许搜索');
            }
        },
        clickFn: function clickFn(item) {
            this.setHistory(item);
            if (typeof item === 'string') {
                location.href = '/search.html?search=' + item;
            } else if (item.product_id) {
                var list_id = item.list_id
                  , product_id = item.product_id
                  , product_sn = item.product_sn;
                location.href = "/product/".concat(list_id, "/product_id/").concat(product_id, ".html#").concat(product_sn);
            } else if (item.id) {
                location.href = "/category/".concat(item.id, ".html");
            }
        },
        getRecommend: Tool.debounce(function(value) {
            var _this3 = this;
            Api.Search.suggest({
                search: value
            }).then(function(res) {
                if (res.success && !_this3.isHistory) {
                    _this3.list = res.suggest;
                    _this3.type = res.type;
                }
            });
        }, 150),
        getHistory: function getHistory() {
            var history = LSH.getItem('searchHistory');
            this.historyList = history ? history.splice(0, 8) : [];
        },
        setHistory: function setHistory(val) {
            var history = LSH.getItem('searchHistory') || [];
            var point = -1;
            if (val.product_id) {
                point = history.findIndex(function(v) {
                    return val.product_id === v.product_id || val.product_sn === v;
                });
            } else if (val.id) {
                point = history.findIndex(function(v) {
                    return val.id === v.id || val.category_name === v;
                });
            } else {
                point = history.findIndex(function(v) {
                    return val === v || val === v.product_sn || val === v.category_name;
                });
                if (point > -1) {
                    val = history[point];
                }
            }
            if (point > -1) {
                history.splice(point, 1);
            }
            history.unshift(val);
            LSH.setItem('searchHistory', history);
            this.getHistory();
        },
        clearHistory: function clearHistory() {
            this.historyList = [];
            LSH.setItem('searchHistory', []);
        }
    },
    watch: {
        filter: function filter(newVal) {
            this.isHistory = !$.trim(newVal);
            if (!this.isHistory) {
                this.getRecommend(newVal);
            } else {
                this.getHistory();
            }
        }
    }
});
