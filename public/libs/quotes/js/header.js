"use strict";
(function() {
    function Header() {}
    Header.prototype.initScrollbox = function(id) {
        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
        var box = document.querySelector(id);
        if (!box)
            return false;
        var boxHeight = box.getBoundingClientRect().height;
        var ul = box.querySelector('ul');
        var liAll = ul.children;
        if (liAll.length === 1)
            return false;
        var lastLi = liAll[0].cloneNode(true);
        ul.appendChild(lastLi);
        var index = 0;
        var move = function move() {
            index++;
            ul.style.transition = "all ease 0.3s";
            ul.style.transform = "translateY(-".concat(boxHeight * index, "px)");
            if (index === liAll.length - 1) {
                setTimeout(function() {
                    index = 0;
                    ul.style.transition = "none";
                    ul.style.transform = "translateY(0px)";
                }, 1000);
            }
            setTimeout(function() {
                return move();
            }, time);
        };
        setTimeout(function() {
            return move();
        }, time);
    }
    ;
    Header.prototype.getAreas = function() {
        var _this = this;
        this.areaList = null;
        var time = null;
        var areaData = LSH.getItem('areaData');
        if (areaData) {
            time = areaData.time;
            this.areaList = areaData.data;
        }
        Api.Common.getAreas({
            time: time
        }).then(function(res) {
            if (res.code === 20000) {
                if (res.data.length > 0) {
                    _this.areaList = res.data;
                    LSH.setItem('areaData', {
                        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                        data: _this.areaList
                    });
                }
                _this._transAreaObj();
                _this._transAreaForParse();
            }
        });
    }
    ;
    Header.prototype._transAreaObj = function() {
        this.areaObj = null;
        var recursive = function recursive(list, result) {
            return list.reduce(function(result, item) {
                result[item.code] = item.name;
                if (item.children) {
                    recursive(item.children, result);
                }
                return result;
            }, result);
        };
        this.areaObj = recursive(this.areaList, {});
    }
    ;
    Header.prototype._transAreaForParse = function() {
        this.areaListForParse = null;
        var recursive = function recursive(list) {
            return list.map(function(v) {
                var temp = {
                    "code": "".concat(v.code),
                    "name": v.name
                };
                if (v.children && v.children.length > 0) {
                    temp.children = recursive(v.children);
                }
                return temp;
            });
        };
        this.areaListForParse = recursive(this.areaList);
    }
    ;
    Header.prototype.imgEnlarge = function(className) {
        $("body").on('click', className, function() {
            var imgUrl = $(this).attr('data-img');
            layer.photos({
                photos: {
                    title: "麓邦商城",
                    start: 0,
                    data: [{
                        src: imgUrl
                    }]
                },
                footer: false
            });
        });
    }
    ;
    Header.prototype.initMessageNum = function() {
        var $el = $('#user__text,#message__text');
        if ($el.length > 0) {
            Api.Message.getTypes().then(function(res) {
                if (res.code === 20000) {
                    var num = 0;
                    res.no_read_count.forEach(function(v) {
                        num += v.message_count;
                    });
                    if (num > 0) {
                        $el.addClass('lb-pagetop-user__dot');
                    }
                }
            });
        }
    }
    ;
    Header.prototype._needToPage = function() {
        var list = ['login', 'register', 'retrieve', 'sns'];
        return !!list.find(function(name) {
            return ~location.href.indexOf(name);
        });
    }
    ;
    Header.prototype.login = function() {
        console.log(this);
        this._needToPage() ? location.href = '/login.html' : loginApp.open();
    }
    ;
    Header.prototype.register = function() {
        this._needToPage() ? location.href = '/register.html' : registerApp.open();
    }
    ;
    Header.prototype.logout = function() {
        var _this2 = this;
        Api.User.logout().then(function(res) {
            if (res.code === 20000) {
                layer.msg('登出成功');
                _this2._needToPage() ? location.href = '/login.html' : location.reload();
            }
        });
    }
    ;
    Header.prototype.initTitle = function() {
        $(".product_name").hover(function() {
            layer.tips($(this).html(), $(this), {
                tips: [1, '#f5f5f5'],
                time: 4000
            });
        }, function() {
            layer.closeAll('tips');
        });
    }
    ;
    Header.prototype.getCartBags = function() {
        var _this3 = this;
        Api.Cart.bagList().then(function(res) {
            if (res.success) {
                _this3.cartBag = res.data;
            }
        });
        $("body").click(function(e) {
            $('.lb-addcart__baglist').hide();
        });
    }
    ;
    Header.prototype.renderAddcart = function() {
        var _this4 = this;
        var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!this.cartBag) {
            this.getCartBags();
        }
        Tool.awaitFrom(this, 'cartBag', function() {
            var $addcart = $(".lb-addcart");
            if (_this4.cartBag === null) {
                $addcart.removeClass('lb-addcart--bag').empty().text(opt.text || '加入购物车');
            } else {
                $addcart.addClass('lb-addcart--bag').empty().text(opt.text || '一键加购');
                $addcart.append("<span class=\"lb-addcart__addmore\"><i class=\"el-dropdown__icon el-icon-arrow-down\"></i></span>");
                var bagListHtml = '<div class="lb-addcart__baglist"><ul>';
                _this4.cartBag.map(function(v) {
                    bagListHtml += "<li data-bagid=\"".concat(v.id, "\">").concat(v.bag_name, "</li>");
                });
                bagListHtml += '</ul></div>';
                $addcart.append(bagListHtml);
            }
            $addcart.unbind('click').bind('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                var $target = $(e.target);
                var $this = $(e.currentTarget);
                if ($this.hasClass('is-disabled')) {
                    return false;
                }
                if ($target.parent().andSelf().is('.lb-addcart__addmore')) {
                    $this.find('.lb-addcart__baglist').show();
                    return false;
                }
                if (opt.callback) {
                    opt.callback($target.data('bagid'), e);
                    return false;
                }
                if ($this.hasClass('is-batch')) {
                    var $groupBuy = $this.parents('.lb-goods-group-buy');
                    var $group = $groupBuy.siblings('.lb-goods-group');
                    var $checkedCheckboxs = $group.find('input[name="groupCheck"]:checked');
                    var data = {
                        products: [{
                            product_id: $group.attr('data-master-id'),
                            list_id: $group.attr('data-list_id'),
                            num: 1
                        }]
                    };
                    $checkedCheckboxs.each(function() {
                        data.products.push({
                            product_id: $(this).attr('data-id'),
                            list_id: $(this).attr('data-list_id'),
                            num: 1
                        });
                    });
                    if ($target.is('li')) {
                        var bag_id = $target.data('bagid');
                        data.bag_id = bag_id;
                    }
                    Api.Cart.addCartBatch(data).then(function(res) {
                        if (res.success) {
                            toolbarHandler.addProductAnimation(e);
                            toolbarHandler.changeCartNums(res.cart_nums);
                        }
                    });
                } else {
                    var $goods = $this.parents('[name=goods]');
                    var _$goods$get$dataset = $goods.get(0).dataset
                      , id = _$goods$get$dataset.id
                      , list_id = _$goods$get$dataset.list_id;
                    var num = $goods.find('input[name="goodsNum"]').val() || 1;
                    var _data = {
                        product_id: id,
                        list_id: list_id,
                        num: num
                    };
                    if ($target.is('li')) {
                        var _bag_id = $target.data('bagid');
                        _data.bag_id = _bag_id;
                    }
                    Api.Cart.addCart(_data).then(function(res) {
                        if (res.success) {
                            toolbarHandler.addProductAnimation(e);
                            toolbarHandler.changeCartNums(res.cart_nums);
                        }
                    });
                }
            });
        });
    }
    ;
    var header = new Header();
    window.__module__header = header;
    header.getAreas();
    $(function() {
        header.imgEnlarge('.enlarge');
        header.initMessageNum();
        $('.registbtn').bind('click', function() {
            return header.register();
        });
        $('.loginbtn').bind('click', function() {
            return header.login();
        });
        $('#userLogout').bind('click', function() {
            return header.logout();
        });
        header.initTitle();
        header.initScrollbox("#verticalScrollbox");
    });
}
)();
