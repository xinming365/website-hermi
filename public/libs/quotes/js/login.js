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
var loginApp = new Vue({
    el: '#loginApp',
    name: 'loginApp',
    data: function data() {
        return {
            visible: false,
            type: 'password',
            loginTimePass: 0,
            loginTimeCode: 0,
            formPass: {},
            formCode: {},
            countdown: 0,
            verifyType: 'msg'
        };
    },
    mounted: function mounted() {
        this.$el.style.display = 'block';
    },
    computed: {
        canSend: function canSend() {
            return this.formCode.phone && Tool.reg.phone.test(this.formCode.phone);
        }
    },
    methods: {
        open: function open() {
            if (Tool.isMobile()) {
                location.href = '/login';
                return false;
            }
            this.visible = true;
            this.getLoginTime();
            document.body.parentNode.style.overflow = 'hidden';
        },
        close: function close() {
            this.visible = false;
            document.body.parentNode.style.overflow = 'auto';
        },
        loginFn: function loginFn() {
            if (this.type === 'password') {
                this.loginByPass();
            }
            if (this.type === 'code') {
                this.loginByCode();
            }
        },
        getLoginTime: function getLoginTime() {
            var _this = this;
            Api.User.loginTimes().then(function(res) {
                if (res.success) {
                    _this.loginTimePass = res.login_times || 0;
                    _this.loginTimeCode = res.verify_login_times || 0;
                }
            });
        },
        loginByPass: function loginByPass() {
            if (!this.formPass.phone) {
                layer.msg('请输入手机号');
                return false;
            }
            if (!this.formPass.password) {
                layer.msg('请输入密码');
                return false;
            }
            if (this.loginTimePass >= 3) {
                this.openVerify('pass');
                return false;
            }
            this.loginByPassAjax();
        },
        loginByPassAjax: function loginByPassAjax() {
            var _this2 = this;
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            Api.User.loginByPass(_objectSpread(_objectSpread({}, this.formPass), params)).then(function(res) {
                if (res.success) {
                    if (res.need_upgrade) {
                        _this2.close();
                        registerApp.open('area');
                    } else {
                        layer.msg('登录成功');
                        location.reload();
                    }
                } else {
                    if (res.data) {
                        _this2.loginTimePass = res.data.login_times || 0;
                    }
                }
            });
        },
        loginByCode: function loginByCode() {
            if (!this.formCode.phone) {
                layer.msg('请输入手机号');
                return false;
            }
            if (!this.formCode.verify_code) {
                layer.msg('请输入手机验证码');
                return false;
            }
            if (this.loginTimeCode > 3) {
                this.openVerify('code');
                return false;
            }
            this.loginByCodeAjax();
        },
        loginByCodeAjax: function loginByCodeAjax() {
            var _this3 = this;
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            Api.User.loginByCode(_objectSpread(_objectSpread({}, this.formCode), params)).then(function(res) {
                if (res.success) {
                    if (res.need_upgrade) {
                        _this3.close();
                        registerApp.open('area');
                    } else {
                        location.reload();
                        layer.msg('登录成功');
                    }
                } else {
                    if (res.data) {
                        _this3.loginTimeCode = res.data.login_times || 0;
                    }
                }
            });
        },
        sendCodeFn: function sendCodeFn() {
            if (!this.formCode.phone) {
                layer.msg('请输入手机号');
                return false;
            }
            if (!Tool.reg.phone.test(this.formCode.phone)) {
                layer.msg('请输入正确的手机号格式');
                return false;
            }
            Tool.reg.phone.lastIndex = 0;
            this.openVerify('msg');
        },
        sendCodeAjax: function sendCodeAjax(params) {
            var _this4 = this;
            Api.User.getLoginCode(_objectSpread({
                phone: this.formCode.phone
            }, params)).then(function(res) {
                if (res.success) {
                    _this4.countdown = 59;
                    var si = setInterval(function() {
                        _this4.countdown--;
                        if (_this4.countdown == 0) {
                            clearInterval(si);
                        }
                    }, 1000);
                }
            });
        },
        openVerify: function openVerify(type) {
            this.verifyType = type;
            this.$refs['codeVerify'].show();
        },
        verifySuccess: function verifySuccess(params) {
            if (this.verifyType === 'msg') {
                this.sendCodeAjax(params);
            } else if (this.verifyType === 'pass') {
                this.loginByPassAjax(params);
            } else if (this.verifyType === 'code') {
                this.loginByCodeAjax(params);
            }
        }
    }
});
