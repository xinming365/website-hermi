"use strict";
Vue.component('lb-verify', {
    template: "<div v-show=\"showBox\" :class=\"mode == 'pop' ? 'verify-mask' : ''\">\n  <div\n    :class=\"mode == 'pop' ? 'verifybox' : ''\"\n    :style=\"{ 'max-width': parseInt(imgSize.width) + 30 + 'px' }\"\n  >\n    <div v-if=\"mode == 'pop'\" class=\"verifybox-top\">\n      \u8BF7\u5B8C\u6210\u5B89\u5168\u9A8C\u8BC1\n      <span class=\"verifybox-close\" @click=\"closeBox\">\n        <i class=\"iconfont icon-close\" />\n      </span>\n    </div>\n    <div\n      class=\"verifybox-bottom\"\n      :style=\"{ padding: mode == 'pop' ? '15px' : '0' }\"\n    >\n      <verify-slide\n        ref=\"instance\"\n        :captcha-type=\"captchaType\"\n        :type=\"verifyType\"\n        :figure=\"figure\"\n        :arith=\"arith\"\n        :mode=\"mode\"\n        :v-space=\"vSpace\"\n        :explain=\"explain\"\n        :img-size=\"imgSize\"\n        :block-size=\"blockSize\"\n        :bar-size=\"barSize\"\n        :default-img=\"defaultImg\"\n      />\n    </div>\n  </div>\n</div>",
    name: "lbVerify",
    props: {
        locale: {
            require: false,
            type: String,
            default: function _default() {
                var language;
                if (navigator.language) {
                    language = navigator.language;
                } else {
                    language = navigator.browserLanguage;
                }
                return language;
            }
        },
        captchaType: {
            type: String,
            default: 'blockPuzzle'
        },
        figure: {
            type: Number
        },
        arith: {
            type: Number
        },
        mode: {
            type: String,
            default: "pop"
        },
        vSpace: {
            type: Number
        },
        explain: {
            type: String
        },
        imgSize: {
            type: Object,
            default: function _default() {
                return {
                    width: '330px',
                    height: '155px'
                };
            }
        },
        blockSize: {
            type: Object
        },
        barSize: {
            type: Object
        }
    },
    data: function data() {
        return {
            clickShow: false,
            hasInit: false,
            verifyType: undefined,
            componentType: undefined,
            defaultImg: ""
        };
    },
    computed: {
        instance: function instance() {
            return this.$refs.instance || {};
        },
        showBox: function showBox() {
            if (this.mode == "pop") {
                return this.clickShow;
            } else {
                return true;
            }
        }
    },
    watch: {
        captchaType: {
            immediate: true,
            handler: function handler(captchaType) {
                switch (captchaType.toString()) {
                case "blockPuzzle":
                    this.verifyType = "2";
                    this.componentType = "VerifySlide";
                    break;
                case "clickWord":
                    this.verifyType = "";
                    this.componentType = "VerifyPoints";
                    break;
                }
            }
        }
    },
    mounted: function mounted() {
        this.uuid();
    },
    methods: {
        uuid: function uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";
            s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = "-";
            var slider = "slider" + "-" + s.join("");
            var point = "point" + "-" + s.join("");
            console.log(localStorage.getItem("slider"));
            if (!localStorage.getItem("slider")) {
                localStorage.setItem("slider", slider);
            }
            if (!localStorage.getItem("point")) {
                localStorage.setItem("point", point);
            }
        },
        i18n: function i18n(text) {
            if (this.$t) {
                return this.$t(text);
            } else {
                var i18n = this.$options.i18n.messages[this.locale] || this.$options.i18n.messages["en-US"];
                return i18n[text];
            }
        },
        refresh: function refresh() {
            if (this.instance.refresh) {
                this.instance.refresh();
            }
        },
        closeBox: function closeBox() {
            this.clickShow = false;
        },
        show: function show() {
            if (this.mode == "pop") {
                this.clickShow = true;
                if (!this.hasInit) {
                    this.hasInit = true;
                    this.refresh();
                }
            }
        }
    }
});
