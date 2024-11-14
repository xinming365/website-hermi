"use strict";
function aesEncrypt(word) {
    var keyWord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "XwKsGlMcdPMEhR1B";
    var key = CryptoJS.enc.Utf8.parse(keyWord);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
function _resetSize(vm) {
    var img_width, img_height, bar_width, bar_height;
    var parentWidth = vm.$el.parentNode.offsetWidth || window.offsetWidth;
    var parentHeight = vm.$el.parentNode.offsetHeight || window.offsetHeight;
    if (vm.imgSize.width.indexOf("%") != -1) {
        img_width = parseInt(this.imgSize.width) / 100 * parentWidth + "px";
    } else {
        img_width = this.imgSize.width;
    }
    if (vm.imgSize.height.indexOf("%") != -1) {
        img_height = parseInt(this.imgSize.height) / 100 * parentHeight + "px";
    } else {
        img_height = this.imgSize.height;
    }
    if (vm.barSize.width.indexOf("%") != -1) {
        bar_width = parseInt(this.barSize.width) / 100 * parentWidth + "px";
    } else {
        bar_width = this.barSize.width;
    }
    if (vm.barSize.height.indexOf("%") != -1) {
        bar_height = parseInt(this.barSize.height) / 100 * parentHeight + "px";
    } else {
        bar_height = this.barSize.height;
    }
    return {
        imgWidth: img_width,
        imgHeight: img_height,
        barWidth: bar_width,
        barHeight: bar_height
    };
}
Vue.component('verify-slide', {
    template: "<div style=\"position: relative; overflow: hidden;\">\n    <div\n      v-if=\"type === '2'\"\n      class=\"verify-img-out\"\n      :style=\"{ height: parseInt(setSize.imgHeight) + vSpace + 'px' }\"\n    >\n      <div\n        class=\"verify-img-panel\"\n        v-loading=\"loading\"\n        element-loading-background=\"rgba(0, 0, 0, 0.6)\"\n        :style=\"{ width: '100%', height: setSize.imgHeight }\"\n      >\n        <img\n          v-show=\"backImgBase\"\n          :src=\"\n            backImgBase ? 'data:image/png;base64,' + backImgBase : defaultImg\n          \"\n          alt=\"\"\n          style=\"width: 100%; height: 100%; display: block\"\n        />\n        <div v-show=\"showRefresh\" class=\"verify-refresh\" @click=\"refresh\">\n          <i class=\"iconfont icon-refresh\" />\n        </div>\n        <transition name=\"tips\">\n          <span\n            v-if=\"tipWords\"\n            class=\"verify-tips\"\n            :class=\"passFlag ? 'suc-bg' : 'err-bg'\"\n            >{{ tipWords }}</span\n          >\n        </transition>\n      </div>\n    </div>\n    <!-- \u516C\u5171\u90E8\u5206 -->\n    <div\n      class=\"verify-bar-area\"\n      :style=\"{\n        width: '100%',\n        height: barSize.height,\n        'line-height': barSize.height,\n      }\"\n    >\n      <span class=\"verify-msg\" v-text=\"text\" />\n      <div\n        class=\"verify-left-bar\"\n        :style=\"{\n          width: leftBarWidth !== undefined ? leftBarWidth : barSize.height,\n          height: barSize.height,\n          'border-color': leftBarBorderColor,\n          transaction: transitionWidth,\n        }\"\n      >\n        <span class=\"verify-msg\" v-text=\"finishText\" />\n        <div\n          class=\"verify-move-block\"\n          :style=\"{\n            width: leftBarHeight,\n            height: leftBarHeight,\n            'background-color': moveBlockBackgroundColor,\n            left: moveBlockLeft,\n            transition: transitionLeft,\n          }\"\n          @touchstart=\"start\"\n          @mousedown=\"start\"\n        >\n          <i\n            :class=\"['verify-icon iconfont', iconClass]\"\n            :style=\"{ color: iconColor }\"\n          />\n          <div\n            v-if=\"type === '2'\"\n            class=\"verify-sub-block\"\n            :style=\"{\n              width: Math.floor((parseInt(setSize.imgWidth) * 47) / 310) + 'px',\n              height: setSize.imgHeight,\n              top: '-' + (parseInt(setSize.imgHeight) + vSpace) + 'px',\n              'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,\n            }\"\n          >\n            <img\n              v-show=\"blockBackImgBase\"\n              :src=\"'data:image/png;base64,' + blockBackImgBase\"\n              alt=\"\"\n              style=\"width: 100%; height: 100%; display: block\"\n            />\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>",
    name: "VerifySlide",
    props: {
        captchaType: {
            type: String
        },
        type: {
            type: String,
            default: "1"
        },
        mode: {
            type: String,
            default: "fixed"
        },
        vSpace: {
            type: Number,
            default: 5
        },
        explain: {
            type: String,
            default: "向右滑动完成验证"
        },
        imgSize: {
            type: Object,
            default: function _default() {
                return {
                    width: "310px",
                    height: "155px"
                };
            }
        },
        blockSize: {
            type: Object,
            default: function _default() {
                return {
                    width: "50px",
                    height: "50px"
                };
            }
        },
        barSize: {
            type: Object,
            default: function _default() {
                return {
                    width: "310px",
                    height: "40px"
                };
            }
        },
        defaultImg: {
            type: String,
            default: ""
        }
    },
    data: function data() {
        return {
            secretKey: "",
            passFlag: "",
            backImgBase: "",
            blockBackImgBase: "",
            backToken: "",
            startMoveTime: "",
            endMovetime: "",
            tipsBackColor: "",
            tipWords: "",
            text: "",
            finishText: "",
            setSize: {
                imgHeight: 0,
                imgWidth: 0,
                barHeight: 0,
                barWidth: 0
            },
            top: 0,
            left: 0,
            moveBlockLeft: undefined,
            leftBarWidth: undefined,
            moveBlockBackgroundColor: undefined,
            leftBarBorderColor: "#ddd",
            iconColor: undefined,
            iconClass: "icon-right",
            status: false,
            isEnd: false,
            showRefresh: true,
            transitionLeft: "",
            transitionWidth: "",
            loading: false
        };
    },
    computed: {
        barArea: function barArea() {
            return this.$el.querySelector(".verify-bar-area");
        },
        barMoveBlock: function barMoveBlock() {
            return this.$el.querySelector(".verify-move-block");
        },
        resetSize: function resetSize() {
            return _resetSize;
        },
        leftBarHeight: function leftBarHeight() {
            return parseInt(this.barSize.height) - 2 + 'px';
        }
    },
    watch: {
        type: {
            immediate: true,
            handler: function handler() {
                this.init();
            }
        }
    },
    mounted: function mounted() {
        this.$el.onselectstart = function() {
            return false;
        }
        ;
    },
    methods: {
        init: function init() {
            var _this2 = this;
            this.text = this.explain;
            this.$nextTick(function() {
                var setSize = _this2.resetSize(_this2);
                for (var key in setSize) {
                    _this2.$set(_this2.setSize, key, setSize[key]);
                }
                _this2.$parent.$emit("ready", _this2);
            });
            var _this = this;
            window.removeEventListener("touchmove", function(e) {
                _this.move(e);
            });
            window.removeEventListener("mousemove", function(e) {
                _this.move(e);
            });
            window.removeEventListener("touchend", function() {
                _this.end();
            });
            window.removeEventListener("mouseup", function() {
                _this.end();
            });
            window.addEventListener("touchmove", function(e) {
                _this.move(e);
            });
            window.addEventListener("mousemove", function(e) {
                _this.move(e);
            });
            window.addEventListener("touchend", function() {
                _this.end();
            });
            window.addEventListener("mouseup", function() {
                _this.end();
            });
        },
        start: function start(e) {
            if (this.loading) {
                return false;
            }
            e = e || window.event;
            var x;
            if (!e.touches) {
                x = e.clientX;
            } else {
                x = e.touches[0].pageX;
            }
            this.startLeft = x;
            this.startMoveTime = +new Date();
            if (this.isEnd == false) {
                this.text = "";
                this.moveBlockBackgroundColor = "#337ab7";
                this.leftBarBorderColor = "#337AB7";
                this.iconColor = "#fff";
                e.stopPropagation();
                this.status = true;
            }
        },
        move: function move(e) {
            e = e || window.event;
            if (this.status && this.isEnd == false) {
                var x;
                if (!e.touches) {
                    x = e.clientX;
                } else {
                    x = e.touches[0].pageX;
                }
                var move_block_left = x - this.startLeft;
                if (move_block_left >= this.barArea.offsetWidth - this.barMoveBlock.offsetWidth - 1) {
                    move_block_left = this.barArea.offsetWidth - this.barMoveBlock.offsetWidth - 1;
                }
                if (move_block_left <= -1) {
                    move_block_left = -1;
                }
                this.moveBlockLeft = move_block_left + "px";
                this.leftBarWidth = move_block_left + this.barMoveBlock.offsetWidth + "px";
            }
        },
        end: function end() {
            var _this3 = this;
            this.endMovetime = +new Date();
            var _this = this;
            if (this.status && this.isEnd == false) {
                var moveLeftDistance = parseInt((this.moveBlockLeft || "").replace("px", ""));
                moveLeftDistance = moveLeftDistance * 310 / parseInt(this.setSize.imgWidth);
                var data = {
                    captchaType: this.captchaType,
                    pointJson: this.secretKey ? aesEncrypt(JSON.stringify({
                        x: moveLeftDistance,
                        y: 5.0
                    }), this.secretKey) : JSON.stringify({
                        x: moveLeftDistance,
                        y: 5.0
                    }),
                    token: this.backToken
                };
                Api.Verify.check(data).then(function(res) {
                    if (res.code == 20000) {
                        _this3.moveBlockBackgroundColor = "#5cb85c";
                        _this3.leftBarBorderColor = "#5cb85c";
                        _this3.iconColor = "#fff";
                        _this3.iconClass = "icon-check";
                        _this3.showRefresh = false;
                        _this3.isEnd = true;
                        if (_this3.mode == "pop") {
                            setTimeout(function() {
                                _this3.$parent.clickShow = false;
                                _this3.refresh();
                            }, 1500);
                        }
                        _this3.passFlag = true;
                        _this3.tipWords = "".concat(((_this3.endMovetime - _this3.startMoveTime) / 1000).toFixed(2), "s\u9A8C\u8BC1\u6210\u529F");
                        setTimeout(function() {
                            _this3.tipWords = "";
                            _this3.$parent.closeBox();
                            _this3.$parent.$emit("success", {
                                key: res.key
                            });
                        }, 1000);
                    } else {
                        _this3.moveBlockBackgroundColor = "#d9534f";
                        _this3.leftBarBorderColor = "#d9534f";
                        _this3.iconColor = "#fff";
                        _this3.iconClass = "icon-close";
                        _this3.passFlag = false;
                        setTimeout(function() {
                            _this.refresh();
                        }, 1000);
                        _this3.$parent.$emit("error", _this3);
                        _this3.tipWords = "验证失败";
                        setTimeout(function() {
                            _this3.tipWords = "";
                        }, 1000);
                    }
                });
                this.status = false;
            }
        },
        refresh: function refresh() {
            var _this4 = this;
            this.showRefresh = true;
            this.finishText = "";
            this.transitionLeft = "left .3s";
            this.moveBlockLeft = 0;
            this.leftBarWidth = undefined;
            this.transitionWidth = "width .3s";
            this.leftBarBorderColor = "#ddd";
            this.moveBlockBackgroundColor = "#fff";
            this.iconColor = "#000";
            this.iconClass = "icon-right";
            this.isEnd = false;
            this.getPictrue();
            setTimeout(function() {
                _this4.transitionWidth = "";
                _this4.transitionLeft = "";
                _this4.text = _this4.explain;
            }, 300);
        },
        getPictrue: function getPictrue() {
            var _this5 = this;
            var data = {
                captchaType: this.captchaType,
                clientUid: localStorage.getItem("slider"),
                ts: Date.now()
            };
            this.loading = true;
            Api.Verify.get(data).then(function(res) {
                if (res.code == 20000) {
                    _this5.backImgBase = res.data.originalImageBase64;
                    _this5.blockBackImgBase = res.data.jigsawImageBase64;
                    _this5.backToken = res.data.token;
                    _this5.secretKey = res.data.secretKey;
                } else {
                    _this5.tipWords = res.msg;
                }
                if (res.code == "6201") {
                    _this5.backImgBase = null;
                    _this5.blockBackImgBase = null;
                }
            }).finally(function() {
                _this5.loading = false;
            });
        }
    }
});
