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
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next,
            0 === l) {
                if (Object(t) !== t)
                    return;
                f = !1;
            } else
                for (; !(f = (e = i.call(t)).done) && (a.push(e.value),
                a.length !== l); f = !0)
                    ;
        } catch (r) {
            o = !0,
            n = r;
        } finally {
            try {
                if (!f && null != t.return && (u = t.return(),
                Object(u) !== u))
                    return;
            } finally {
                if (o)
                    throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r))
        return r;
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
var pendingMap = new Map();
function generateReqKey(config) {
    var method = config.method
      , url = config.url
      , params = config.params
      , data = config.data;
    if (config.forceNotRepeat) {
        return [method, url].join('&');
    }
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
}
function addPending(config) {
    var requestKey = generateReqKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken(function(cancel) {
        if (!pendingMap.has(requestKey)) {
            pendingMap.set(requestKey, cancel);
        }
    }
    );
}
function removePending(config) {
    var requestKey = generateReqKey(config);
    if (pendingMap.has(requestKey)) {
        var cancelToken = pendingMap.get(requestKey);
        cancelToken(requestKey);
        pendingMap.delete(requestKey);
    }
}
function clearPending() {
    var _iterator = _createForOfIteratorHelper(pendingMap), _step;
    try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2)
              , requestKey = _step$value[0]
              , cancelToken = _step$value[1];
            cancelToken(requestKey);
        }
    } catch (err) {
        _iterator.e(err);
    } finally {
        _iterator.f();
    }
    pendingMap.clear();
}
var http = axios.create({
    baseURL: '/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 10000
});
http.interceptors.request.use(function(config) {
    removePending(config);
    addPending(config);
    return config;
}, function(error) {
    return Promise.reject(error);
});
http.interceptors.response.use(function(response) {
    var data = response.data
      , status = response.status
      , config = response.config
      , headers = response.headers;
    if (config.responseType === 'blob') {
        return response;
    }
    var _config$hideMsg = config.hideMsg
      , hideMsg = _config$hideMsg === void 0 ? false : _config$hideMsg;
    var code = data.code
      , msg = data.msg
      , error_code = data.error_code;
    if (code !== 20000 && !hideMsg) {
        if (error_code === 'not_login') {
            layer.msg('未登录 / 登录已失效，请登录后再操作！');
        } else {
            layer.msg(msg);
        }
    }
    return data;
}, function(error) {
    if (axios.isCancel(error)) {
        return Promise.reject(error);
    }
    var message = '操作失败，请联系管理员！';
    if (error.code === 'ECONNABORTED' && ~error.message.indexOf('timeout')) {
        message = '接口请求超时';
    }
    if (error.response && error.response.data) {
        message = error.response.data.msg;
    }
    layer.msg(message);
    return Promise.reject(error);
});
var Api = {};
Api.Tools = {
    blobHandler: function blobHandler(response) {
        return new Promise(function(resolve) {
            if (response.data.type === 'application/json') {
                var reader = new FileReader();
                reader.readAsText(response.data, 'utf-8');
                reader.onload = function() {
                    var res = JSON.parse(reader.result);
                    resolve(_objectSpread(_objectSpread({}, res), {}, {
                        type: 'json'
                    }));
                }
                ;
            } else {
                resolve({
                    type: 'blob',
                    filename: response.headers.filename ? decodeURIComponent(response.headers.filename) : response.headers['content-disposition'] ? decodeURIComponent(response.headers['content-disposition']).split(';')[1].split('filename=')[1] : '未知文件',
                    blob: new Blob([response.data],{
                        type: response.headers['content-type']
                    }),
                    response: response
                });
            }
        }
        );
    },
    downloadFile: function downloadFile(res) {
        var objecturl = URL.createObjectURL(res.blob);
        var aEle = document.createElement('a');
        aEle.setAttribute('href', objecturl);
        aEle.setAttribute('download', res.filename);
        aEle.click();
        aEle.remove();
        URL.revokeObjectURL(objecturl);
    }
};
Api.Common = {
    getAreas: function getAreas(params) {
        return http({
            method: 'get',
            url: '/address/areas',
            params: params
        });
    }
};
Api.newNotice = {
    getRootCate: function getRootCate() {
        return http({
            method: 'get',
            url: '/category_list'
        });
    },
    getList: function getList(params) {
        return http({
            method: 'get',
            url: '/new_product_list',
            params: params
        });
    }
};
Api.Bill = {
    getBills: function getBills(params) {
        return http({
            method: 'get',
            url: '/order/user_orders',
            params: params,
            forceNotRepeat: true
        });
    },
    apply: function apply(data) {
        return http({
            method: 'post',
            url: '/order/invoice/apply',
            data: data
        });
    },
    invoiceHistory: function invoiceHistory(params) {
        return http({
            method: 'get',
            url: '/order/invoice/history',
            params: params
        });
    },
    showBill: function showBill() {
        return http({
            method: 'get',
            url: '/order/show_bill',
            hideMsg: true
        });
    },
    billTotal: function billTotal() {
        return http({
            method: 'get',
            url: '/order/total',
            hideMsg: true
        });
    },
    billCheck: function billCheck() {
        return http({
            method: 'get',
            url: '/order/look_bill',
            hideMsg: true
        });
    },
    closeBill: function closeBill() {
        return http({
            method: 'get',
            url: '/order/close_bill',
            hideMsg: true
        });
    }
};
Api.Verify = {
    get: function get(data) {
        return http({
            url: "/new_captcha/get",
            method: "post",
            data: data,
            hideMsg: true
        });
    },
    check: function check(data) {
        return http({
            url: "/new_captcha/check",
            method: "post",
            data: data,
            hideMsg: true
        });
    }
};
Api.Lottery = {
    getTimes: function getTimes(id) {
        return http({
            url: "/lottery/times/".concat(id),
            method: "get"
        });
    },
    doLottery: function doLottery(data) {
        return http({
            url: "/lottery",
            method: "post",
            data: data
        });
    },
    history: function history(params) {
        return http({
            url: "/lottery/record",
            method: "get",
            params: params
        });
    }
};
Api.LotteryV2 = {
    getTimes: function getTimes(params) {
        return http({
            url: "/accumulate_lottery/times",
            method: "get",
            params: params
        });
    },
    getInfo: function getInfo(act_id) {
        return http({
            url: "/accumulate_lottery/act_info",
            method: "get",
            params: {
                act_id: act_id
            }
        });
    },
    doLottery: function doLottery(data) {
        return http({
            url: "/accumulate_lottery",
            method: "post",
            data: data
        });
    },
    history: function history() {
        return http({
            url: "/accumulate_lottery/record",
            method: "get"
        });
    },
    orderList: function orderList() {
        return http({
            url: "/accumulate_lottery/order_list",
            method: 'get'
        });
    }
};
Api.Express = {
    sfExpress: function sfExpress(express_no, params) {
        return http({
            url: "/ztapi/api/express/".concat(express_no),
            method: "get",
            params: params
        });
    },
    otherExpress: function otherExpress(data) {
        return http({
            url: "/order/express",
            method: "post",
            data: data
        });
    }
};
Api.Course = {
    getList: function getList(params) {
        return http({
            url: "/course/article_list",
            method: 'get',
            params: params
        });
    },
    getInfo: function getInfo(id) {
        return http({
            url: "/course/article_data/".concat(id),
            method: 'get'
        });
    }
};
Api.Message = {
    getTypes: function getTypes() {
        return http({
            url: "/msg/getNoRead",
            method: 'get'
        });
    },
    getMessages: function getMessages(params) {
        return http({
            url: "/msg/index",
            method: 'get',
            params: params
        });
    },
    readOne: function readOne(params) {
        return http({
            url: "/msg/read/".concat(params.id),
            method: 'get',
            params: params
        });
    },
    readAll: function readAll(params) {
        return http({
            url: "/msg/readAll",
            method: 'get',
            params: params
        });
    }
};
Api.Cart = {
    addCart: function addCart(data) {
        return http({
            url: "/cart/add",
            method: 'post',
            data: data
        });
    },
    addCartBatch: function addCartBatch(data) {
        return http({
            url: "/cart/batch",
            method: 'post',
            data: data
        });
    },
    import: function _import(data) {
        return http({
            url: "/cart/excel/export",
            method: "post",
            data: data,
            responseType: 'blob',
            timeout: 60000,
            hideMsg: true
        });
    },
    exportProductList: function exportProductList(data) {
        return http({
            url: "/cart/list",
            method: 'post',
            data: data
        });
    },
    makeQuotation: function makeQuotation(data) {
        return http({
            url: "/cart/quotation",
            method: 'post',
            data: data
        });
    },
    emptyCart: function emptyCart() {
        return http({
            url: "/cart",
            method: 'delete'
        });
    },
    removeProduct: function removeProduct(id) {
        return http({
            url: "/cart/".concat(id),
            method: 'delete'
        });
    },
    changeNum: function changeNum(data) {
        return http({
            url: '/cart/change',
            method: 'post',
            data: data
        });
    },
    selectAll: function selectAll(data) {
        return http({
            url: '/cart/all',
            method: 'post',
            data: data
        });
    },
    selectOne: function selectOne(data) {
        return http({
            url: '/cart/one',
            method: 'post',
            data: data
        });
    },
    bagList: function bagList() {
        return http({
            url: '/cart/cartBagList',
            method: 'get'
        });
    },
    addBag: function addBag() {
        return http({
            url: '/cart/addCartBag',
            method: 'post'
        });
    },
    editBag: function editBag(data) {
        return http({
            url: '/cart/editCartBag',
            method: 'post',
            data: data
        });
    },
    setDefaultBag: function setDefaultBag(data) {
        return http({
            url: '/cart/setDefaultCartBag',
            method: 'post',
            data: data
        });
    },
    deleteBag: function deleteBag(data) {
        return http({
            url: '/cart/deleteCartBag',
            method: 'delete',
            data: data
        });
    },
    clearBag: function clearBag(data) {
        return http({
            url: '/cart/clearCartBag',
            method: 'delete',
            data: data
        });
    },
    selectBag: function selectBag(data) {
        return http({
            url: '/cart/checkBag',
            method: 'post',
            data: data
        });
    },
    batchRemoveProduct: function batchRemoveProduct(data) {
        return http({
            url: '/cart/deleteCart',
            method: 'delete',
            data: data
        });
    },
    batchmoveProduct: function batchmoveProduct(data) {
        return http({
            url: '/cart/moveToCartBag',
            method: 'post',
            data: data
        });
    }
};
Api.Address = {
    getAddressById: function getAddressById(id) {
        return http({
            url: "/address/".concat(id),
            method: 'get'
        });
    },
    addAddress: function addAddress(data) {
        return http({
            url: '/address',
            method: 'post',
            data: data
        });
    },
    updateAddress: function updateAddress(data, id) {
        return http({
            url: "/address/".concat(id),
            method: 'put',
            data: data
        });
    },
    delAddress: function delAddress(id) {
        return http({
            url: "/address/".concat(id),
            method: 'delete'
        });
    },
    setDefault: function setDefault(id) {
        return http({
            url: "/address/default/".concat(id),
            method: 'put'
        });
    }
};
Api.Invoice = {
    getInvoiceById: function getInvoiceById(id) {
        return http({
            url: "/invoice/".concat(id),
            method: 'get'
        });
    },
    addInvoice: function addInvoice(data) {
        return http({
            url: '/invoice',
            method: 'post',
            data: data
        });
    },
    updateInvoice: function updateInvoice(data, id) {
        return http({
            url: "/invoice/".concat(id),
            method: 'put',
            data: data
        });
    },
    delInvoice: function delInvoice(id) {
        return http({
            url: "/invoice/".concat(id),
            method: 'delete'
        });
    },
    setDefault: function setDefault(id) {
        return http({
            url: "/invoice/default/".concat(id),
            method: 'put'
        });
    },
    getRecommend: function getRecommend(data) {
        return http({
            url: "/invoice/query",
            method: 'post',
            data: data
        });
    }
};
Api.Checkout = {
    getEmail: function getEmail() {
        return http({
            url: "/cart/email",
            method: 'get'
        });
    },
    saveEmail: function saveEmail(data) {
        return http({
            url: '/cart/email/save',
            method: 'post',
            data: data
        });
    },
    pitchCoupon: function pitchCoupon(id) {
        return http({
            url: "/cart/coupon/pitch/".concat(id),
            method: 'post'
        });
    },
    cancelCoupon: function cancelCoupon(id) {
        return http({
            url: "/cart/coupon/cancel/".concat(id),
            method: 'post'
        });
    },
    checkEnergy: function checkEnergy(address_id) {
        return http({
            url: "/cart/is_give",
            method: 'get',
            params: {
                address_id: address_id
            }
        });
    }
};
Api.Payment = {
    wechat: function wechat(id) {
        return http({
            url: "/payment/wechat/".concat(id),
            method: 'get'
        });
    },
    sendContract: function sendContract(data) {
        return http({
            url: "/order/contract",
            method: 'post',
            data: data
        });
    },
    checkIsPaid: function checkIsPaid(orderSn) {
        return http({
            url: "/order/check_pay/".concat(orderSn),
            method: 'post'
        });
    }
};
Api.Order = {
    cancel: function cancel(data, orderSn) {
        return http({
            url: "/order/cancel/".concat(orderSn),
            method: 'put',
            data: data
        });
    },
    cancelReason: function cancelReason() {
        return http({
            url: "/order/reasons",
            method: 'get'
        });
    },
    push: function push(orderSn) {
        return http({
            url: "/order/push/".concat(orderSn),
            method: 'put'
        });
    },
    emailUpdate: function emailUpdate(data) {
        return http({
            url: '/order/invoice/email/update',
            method: 'post',
            data: data
        });
    },
    confirmReceived: function confirmReceived(id) {
        return http({
            url: "/order/order_received/".concat(id),
            method: 'put'
        });
    },
    invoiceChange: function invoiceChange(data) {
        return http({
            url: '/order/invoice_change/apply',
            method: 'post',
            data: data
        });
    },
    makeQuotation: function makeQuotation(data) {
        return http({
            url: "/order/quotation",
            method: 'post',
            data: data
        });
    },
    sendOrderConvertCode: function sendOrderConvertCode(data) {
        return http({
            url: "/order_convert/send_sms_code/".concat(data.token),
            method: 'get'
        });
    },
    orderConvert: function orderConvert(data) {
        return http({
            url: "/order_convert/confirm/".concat(data.token),
            method: 'post',
            data: data
        });
    }
};
Api.aftersales = {
    apply: function apply(data) {
        return http({
            url: '/order/service',
            method: 'put',
            data: data
        });
    },
    cancel: function cancel(order_sn) {
        return http({
            url: "/order/service_cancel/".concat(order_sn),
            method: 'post'
        });
    },
    orderBack: function orderBack(data) {
        return http({
            url: "/order/order_back/".concat(data.order_sn),
            method: 'put',
            data: data
        });
    },
    cardByParams: function cardByParams(data) {
        return http({
            url: '/order/return_card_params',
            method: 'post',
            data: data
        });
    },
    cardByOrder: function cardByOrder(data) {
        return http({
            url: '/order/return_card',
            method: 'post',
            data: data
        });
    }
};
Api.User = {
    registerTimes: function registerTimes() {
        return http({
            url: '/register/register_times',
            method: 'get'
        });
    },
    getArea: function getArea() {
        return http({
            url: '/register/getArea',
            method: 'get'
        });
    },
    getRegisterCode: function getRegisterCode(data) {
        return http({
            url: '/register/verify/sendCode',
            method: 'post',
            data: data
        });
    },
    register: function register(data) {
        return http({
            url: '/register/registerPhone',
            method: 'post',
            data: data
        });
    },
    registerSetPassword: function registerSetPassword(data) {
        return http({
            url: '/register/registerPwd',
            method: 'post',
            data: data
        });
    },
    registerSetArea: function registerSetArea(data) {
        return http({
            url: '/register/registerAddr',
            method: 'post',
            data: data
        });
    },
    loginTimes: function loginTimes() {
        return http({
            url: '/user/getLoginTimes',
            method: 'get'
        });
    },
    loginByPass: function loginByPass(data) {
        return http({
            url: '/user/login',
            method: 'post',
            data: data
        });
    },
    getLoginCode: function getLoginCode(data) {
        return http({
            url: '/user/loginVerifyCode',
            method: 'post',
            data: data
        });
    },
    loginByCode: function loginByCode(data) {
        return http({
            url: '/user/verifyLogin',
            method: 'post',
            data: data
        });
    },
    getRetrieveCode: function getRetrieveCode(data) {
        return http({
            url: '/user/sendResetVerifyCode',
            method: 'post',
            data: data
        });
    },
    verifyRetrieveCode: function verifyRetrieveCode(data) {
        return http({
            url: '/user/resetPwdFirst',
            method: 'post',
            data: data
        });
    },
    resetPassword: function resetPassword(data) {
        return http({
            url: '/user/resetPwdSecond',
            method: 'post',
            data: data
        });
    },
    logout: function logout() {
        return http({
            url: '/logout',
            method: 'post'
        });
    },
    info: function info() {
        return http({
            url: '/user/ajax',
            method: 'get'
        });
    },
    editUser: function editUser(data) {
        return http({
            url: '/user/info',
            method: "post",
            data: data
        });
    },
    sendEmailCode: function sendEmailCode(data) {
        return http({
            url: '/user/email_code/send',
            method: 'post',
            data: data
        });
    },
    getIntegralLogList: function getIntegralLogList(data) {
        return http({
            url: 'integral/log',
            method: 'post',
            data: data
        });
    },
    getIntegralOrderList: function getIntegralOrderList(data) {
        return http({
            url: '/integral/order',
            method: 'post',
            data: data
        });
    },
    getOrderList: function getOrderList(params) {
        return http({
            url: "/order/order_list/".concat(params.type),
            method: 'get',
            params: params
        });
    },
    getAftersalesList: function getAftersalesList(params) {
        return http({
            url: '/order/service_list',
            method: 'get',
            params: params
        });
    }
};
Api.Complaint = {
    sendComplaint: function sendComplaint(data) {
        return http({
            url: '/complaint',
            method: 'post',
            data: data
        });
    },
    complaintList: function complaintList() {
        return http({
            url: '/complaint/list',
            method: 'get',
            params: {
                limit: 1000
            }
        });
    },
    complaintRevoke: function complaintRevoke(id) {
        return http({
            url: "/complaint/".concat(id),
            method: 'put'
        });
    }
};
Api.Qiniu = {
    getToken: function getToken(params) {
        return http({
            url: 'upload/token',
            method: 'get',
            params: params
        });
    }
};
Api.Security = {
    safeList: function safeList() {
        return http({
            url: '/user/safeList',
            method: 'get'
        });
    },
    setPassword: function setPassword(data) {
        return http({
            url: '/user/password',
            method: 'post',
            data: data
        });
    },
    resetPassword: function resetPassword(data) {
        return http({
            url: '/user/password/modify',
            method: 'post',
            data: data
        });
    },
    getEmailCode: function getEmailCode(params) {
        return http({
            url: '/user/email/code',
            method: 'get',
            params: params
        });
    },
    setEmial: function setEmial(data) {
        console.log(data);
        return http({
            url: '/user/email/bind',
            method: 'post',
            data: data
        });
    },
    getOldPhoneCode: function getOldPhoneCode(params) {
        return http({
            url: '/user/old/code',
            method: 'get',
            params: params
        });
    },
    oldPhoneVerify: function oldPhoneVerify(data) {
        return http({
            url: '/user/old/check',
            method: 'post',
            data: data
        });
    },
    getNewPhoneCode: function getNewPhoneCode(params) {
        return http({
            url: '/user/bind/code',
            method: 'get',
            params: params
        });
    },
    newPhoneVerify: function newPhoneVerify(data) {
        return http({
            url: '/user/bind/phone',
            method: 'post',
            data: data
        });
    },
    unbindThird: function unbindThird(type) {
        return http({
            url: '/bind/' + type,
            method: 'delete'
        });
    }
};
Api.homeModal = {
    getModalData: function getModalData() {
        return http({
            url: '/page_box',
            method: 'get'
        });
    }
};
Api.userDelete = {
    getUserInfo: function getUserInfo() {
        return http({
            url: '/user/info_get',
            method: 'get'
        });
    },
    detectionAccount: function detectionAccount() {
        return http({
            url: '/user/write_off/preview',
            method: 'get'
        });
    },
    doDelelte: function doDelelte(data) {
        return http({
            url: '/user/write_off',
            method: 'post',
            data: data
        });
    },
    getCode: function getCode(params) {
        return http({
            url: '/user/write_off/code',
            method: 'get',
            params: params
        });
    }
};
Api.Privacy = {
    agree: function agree() {
        return http({
            url: '/user/agree',
            method: 'post'
        });
    }
};
Api.Integral = {
    getSeller: function getSeller() {
        return http({
            url: '/integral/seller',
            method: 'get',
            hideMsg: true
        });
    },
    exchange: function exchange(data) {
        return http({
            url: "/integral/order",
            method: 'put',
            data: data
        });
    }
};
Api.Evaluate = {
    comment: function comment(data) {
        return http({
            url: "order/comment/".concat(data.order_id),
            method: 'post',
            data: data
        });
    },
    serviceComment: function serviceComment(data) {
        return http({
            url: "service/comment/".concat(data.order_service_id),
            method: 'post',
            data: data
        });
    }
};
Api.BrowsingHistory = {
    list: function list(params) {
        return http({
            url: '/user/get_browsing_history',
            method: 'get',
            params: params
        });
    }
};
Api.Search = {
    suggest: function suggest(params) {
        return http({
            url: '/search/suggest',
            method: 'get',
            params: params
        });
    }
};
Api.Product = {
    getCompare: function getCompare() {
        return http({
            url: '/compare/brief',
            method: 'get'
        });
    },
    getProductDetail: function getProductDetail(params) {
        return http({
            url: "/product/details/".concat(params.id),
            method: 'get',
            params: params
        });
    },
    categoryGetSon: function categoryGetSon(id) {
        return http({
            url: "/product_center/children/".concat(id),
            method: 'get'
        });
    },
    getSetByFilter: function getSetByFilter(params) {
        return http({
            url: "/product_center/filter_product_list/".concat(params.id),
            method: 'get',
            params: params
        });
    },
    getProductByFilter: function getProductByFilter(params) {
        return http({
            url: "/product_center/filter_same_product/".concat(params.id),
            method: 'get',
            params: params
        });
    },
    getMoreProduct: function getMoreProduct(params) {
        return http({
            url: "/product_center/filter_same_product/".concat(params.id),
            method: 'get',
            params: params
        });
    },
    getCurve: function getCurve(params) {
        return http({
            url: "/product/group_curve/".concat(params.group_id),
            method: 'get',
            params: params
        });
    },
    exportCurve: function exportCurve(params) {
        return http({
            url: "/product/down_curve",
            method: 'get',
            responseType: 'blob',
            timeout: 60000,
            params: params
        });
    },
    addCompare: function addCompare(data) {
        return http({
            url: "/product/sn",
            method: 'post',
            data: data
        });
    },
    getLeadTime: function getLeadTime(params) {
        return http({
            url: "/product/lead_time/".concat(params.id),
            method: 'get',
            params: params
        });
    }
};
Api.Service = {
    downloadManual: function downloadManual(data) {
        return http({
            url: '/manuals/down',
            method: 'post',
            data: data
        });
    }
};
Api.Bbs = {
    editUser: function editUser(data) {
        return http({
            url: '/bbs/edit',
            method: 'post',
            data: data
        });
    },
    add: function add(data) {
        return http({
            url: '/bbs/add',
            method: "post",
            data: data
        });
    }
};
