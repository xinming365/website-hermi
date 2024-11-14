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
var Product = function() {
    function Product() {
        _classCallCheck(this, Product);
        __module__header.renderAddcart();
        this.initTab();
        this.initSwiper();
        this.initChangeGoodsNum();
        this.initTable();
        this.initHighlight();
        this.initCompare();
        this.initCurve();
    }
    return _createClass(Product, [{
        key: "initTab",
        value: function initTab() {
            var tabWrap = document.querySelector("#productTab");
            var navs = tabWrap.querySelectorAll('.lb-product-tabs__nav_item');
            var boxs = tabWrap.querySelectorAll('.lb-product-tabs__content_item');
            var activeTab = 0;
            var navActiveClass = "lb-product-tabs__nav_item--active";
            var boxActiveClass = "lb-product-tabs__content_item--active";
            navs[activeTab].classList.add(navActiveClass);
            boxs[activeTab].classList.add(boxActiveClass);
            navs.forEach(function(nav, index) {
                nav.addEventListener('click', function(e) {
                    if (e.target.dataset.url) {
                        window.open(e.target.dataset.url);
                        return false;
                    }
                    if (activeTab === index)
                        return false;
                    navs[activeTab].classList.remove(navActiveClass);
                    boxs[activeTab].classList.remove(boxActiveClass);
                    activeTab = index;
                    navs[activeTab].classList.add(navActiveClass);
                    boxs[activeTab].classList.add(boxActiveClass);
                });
            });
        }
    }, {
        key: "initSwiper",
        value: function initSwiper() {
            layui.use(function() {
                var carousel = layui.carousel;
                carousel.render({
                    elem: '#productSwiper',
                    autoplay: false,
                    width: '460px',
                    height: '260px'
                });
            });
        }
    }, {
        key: "initChangeGoodsNum",
        value: function initChangeGoodsNum() {
            var changeNum = layui.debounce(function(num, el) {
                var $tr = $(el).parents('tr');
                var $leadtime = $tr.find('td[name="leadtime"]');
                var _$tr$data = $tr.data()
                  , id = _$tr$data.id
                  , lead_time = _$tr$data.lead_time;
                Api.Product.getLeadTime({
                    id: id,
                    num: num
                }).then(function(_ref) {
                    var success = _ref.success
                      , data = _ref.data;
                    if (success) {
                        if (JSON.stringify(data) === JSON.stringify(lead_time)) {
                            if (data[0] === '联系客服') {
                                $leadtime.html("<span class=\"lb-leadtime\">\u8054\u7CFB\u5BA2\u670D</span>");
                            } else {
                                $leadtime.html("<span>".concat(data[0], "</span>"));
                            }
                        } else {
                            var html = '<span class="lb-leadtime">';
                            data.map(function(str) {
                                html += "<i>".concat(str, "</i>");
                            });
                            html += '</span>';
                            $leadtime.html(html);
                        }
                    }
                });
            }, 500);
            $('[name="goods-num-wrapper"]').bind("click", function(e) {
                e.stopPropagation();
                e.preventDefault();
            });
            $('input[lay-filter="changeGoodsNum"]').bind('input', function(e) {
                var value = $(this).val();
                value = value < 1 ? 1 : value;
                changeNum(Number(value), this);
            });
            layui.use('form', function() {
                var form = layui.form;
                form.on('input-affix(changeGoodsNum)', function(data) {
                    var el = data.elem;
                    changeNum(Number(el.value), el);
                });
            });
        }
    }, {
        key: "initTable",
        value: function initTable() {
            var isSort = document.querySelector("#tab_sort").value == 1;
            var defaultOptions = {
                paging: false,
                info: false,
                order: isSort ? [[2, "asc"], [3, "asc"]] : [],
                columnDefs: [{
                    targets: [0, 1, -4, -3, -2, -1],
                    orderable: false
                }],
                language: {
                    emptyTable: '没有找到您想要的结果，很抱歉~',
                    zeroRecords: '没有找到您想要的结果，很抱歉~'
                }
            };
            var tables = $('table.lb-goods-table').DataTable(defaultOptions);
            $('table.lb-goods-table').each(function() {
                var $table = $(this);
                if ($table.data('has_curves')) {
                    tables.tables($table).destroy();
                    var newOptions = Object.assign({}, defaultOptions, {
                        columnDefs: [{
                            targets: [0, 1, -5, -4, -3, -2, -1],
                            orderable: false
                        }]
                    });
                    $table.DataTable(newOptions);
                }
            });
            var htmlMap = {};
            function loadProductData(params) {
                if (htmlMap[params.id]) {
                    return htmlMap[params.id];
                }
                var $extend = $("\n        <div class=\"lb-goods-table__detail\">\n          <div class=\"lb-goods-table__loading\">\u6B63\u5728\u52A0\u8F7D...</div>\n        </div>\n      ");
                var copy_type = $("#copy_type").val();
                var preview_product_id = $("#preview_product_id").val();
                if (copy_type && preview_product_id == id) {
                    params.type = copy_type;
                }
                Api.Product.getProductDetail(params).then(function(_ref2) {
                    var success = _ref2.success
                      , html = _ref2.html;
                    if (success) {
                        $extend.html(html);
                        htmlMap[params.id] = $extend;
                    }
                });
                return $extend;
            }
            layui.util.on({
                openTr: function openTr($tr) {
                    var $table = $tr.parents('.lb-goods-table');
                    var row = tables.tables($table).row($tr);
                    var $extendBtn = $tr.find('.lb-goods-table__extend');
                    var id = $tr.get(0).dataset.id;
                    var list_id = $tr.get(0).dataset.list_id;
                    if (row.child.isShown()) {
                        row.child.hide();
                        $tr.removeClass('shown');
                        $extendBtn.removeClass('is-open');
                    } else {
                        row.child(loadProductData({
                            id: id,
                            list_id: list_id
                        })).show();
                        $tr.addClass('shown');
                        $extendBtn.addClass('is-open');
                    }
                }
            });
            var hideFn = function hideFn() {
                $(".lb-goods-dropdown").hide();
                $(document).unbind('click', hideFn);
            };
            $(".lb-goods-table__dropdown").bind('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                hideFn();
                var $dropdown = $(this).find(".lb-goods-dropdown");
                $dropdown.show();
                $(document).bind('click', hideFn);
            });
            layui.use('form', function() {
                var form = layui.form;
                form.on('checkbox(dropdownCheckbox)', function(data) {
                    var $this = $(data.elem);
                    var $checkedOption = $this.parents('.lb-goods-dropdown').find('input[name="dropdownCheckbox"]:checked');
                    var checkedValues = [];
                    $checkedOption.each(function() {
                        checkedValues.push($(this).attr('title'));
                    });
                    var $th = $this.parents('th');
                    var index = $th.parent().children().index($th);
                    var $table = $this.parents('.lb-goods-table');
                    tables.tables($table).column(index).search(function(value) {
                        return checkedValues.length === 0 || checkedValues.indexOf(value) > -1;
                    }).draw();
                });
            });
        }
    }, {
        key: "initHighlight",
        value: function initHighlight() {
            var id = $('#product_id').val();
            if (id && id > 0) {
                var $select = $('table.lb-goods-table').find("tr[data-id=\"".concat(id, "\"]"));
                $select.addClass('is-highlight');
                $select.trigger('click');
                $('html, body').animate({
                    scrollTop: $select.get(0).getBoundingClientRect().top
                }, 'slow');
            }
        }
    }, {
        key: "initCompare",
        value: function initCompare() {
            var selectedIds = toolbarHandler.compareIds;
            if (selectedIds != null) {
                selectedIds.forEach(function(id) {
                    var $tr = $(".lb-goods-table").find("tr[data-id=".concat(id, "]"));
                    $tr.find('input[name="compareProduct"]').prop("checked", true);
                });
            }
            layui.use('form', function() {
                var form = layui.form;
                form.on('checkbox(compareProduct)', function(data) {
                    var $this = $(data.elem);
                    var id = $this.parents('tr').attr('data-id');
                    if ($this.prop('checked')) {
                        var success = toolbarHandler.addCompares(id, true);
                        if (!success)
                            $this.attr("checked", false);
                    } else {
                        toolbarHandler.removeCompares(id);
                    }
                });
            });
            $(".lb-goods-table").on('click', '.layui-form-checkbox', function(e) {
                e.stopPropagation();
                e.preventDefault();
            });
        }
    }, {
        key: "initGroup",
        value: function initGroup() {
            __module__header.renderAddcart();
            layui.use('form', function() {
                var form = layui.form;
                form.render('checkbox', 'groupCheckboxWrapper');
                form.on('checkbox(groupCheckbox)', function(data) {
                    var $this = $(data.elem);
                    var $group = $this.parents('.lb-goods-group');
                    var $checkedCheckboxs = $group.find('input[name="groupCheck"]:checked');
                    var $groupBuy = $group.siblings('.lb-goods-group-buy');
                    var num = 1
                      , price = parseFloat($group.attr('data-master-price'));
                    $checkedCheckboxs.each(function() {
                        price += parseFloat($(this).attr('data-price'));
                        num++;
                    });
                    $groupBuy.find('.total-price').html(price);
                    $groupBuy.find('.total-num').html(num);
                });
            });
            $(".lb-goods-group__opt_btn").unbind('click').bind('click', function() {
                var $list = $(this).parents('.lb-goods-group__opt').siblings('.lb-goods-group__list');
                if ($list.attr('moving'))
                    return false;
                var $item = $list.find('.lb-goods-group__item');
                var itemWidth = 174;
                var maxLeft = ($item.length - 5) * itemWidth;
                var currntLeft = parseInt($list.scrollLeft());
                if ($(this).hasClass('is-prev')) {
                    if (currntLeft > 0) {
                        $list.attr('moving', true);
                        $list.animate({
                            scrollLeft: currntLeft - itemWidth
                        }, 'fast', function() {
                            $list.removeAttr('moving');
                        });
                    }
                }
                if ($(this).hasClass('is-next')) {
                    if (currntLeft < maxLeft) {
                        $list.attr('moving', true);
                        $list.animate({
                            scrollLeft: currntLeft + itemWidth
                        }, 'fast', function() {
                            $list.removeAttr('moving');
                        });
                    }
                }
            });
        }
    }, {
        key: "initDownload",
        value: function initDownload() {
            function addDownload() {
                var downloadModal = document.createElement('div');
                downloadModal.setAttribute('class', 'lb-download-modal');
                document.body.appendChild(downloadModal);
                var downloadInner = document.createElement('div');
                downloadInner.setAttribute('class', 'lb-download-modal__inner');
                downloadModal.appendChild(downloadInner);
                var downloadTitle = document.createElement('div');
                downloadTitle.setAttribute('class', 'lb-download-modal__title');
                downloadTitle.innerText = '文件正在下载，先不要刷新页面哦~';
                downloadInner.appendChild(downloadTitle);
                var downloadPrograss = document.createElement('div');
                downloadPrograss.setAttribute('class', 'lb-download-modal__prograss');
                downloadInner.appendChild(downloadPrograss);
                var downloadBar = document.createElement('div');
                downloadBar.setAttribute('class', 'lb-download-modal__bar');
                downloadPrograss.appendChild(downloadBar);
            }
            function downloadProgress(step, total) {
                if (!document.querySelector('.lb-download-modal')) {
                    addDownload();
                }
                document.querySelector('.lb-download-modal__bar').setAttribute('style', 'width:' + Math.floor(step / total * 100) + '%;');
            }
            function downloadEnd() {
                document.querySelector('.lb-download-modal').remove();
            }
            jQuery.download_XMLHttpRequest = function(url, fn, data, method) {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                xhr.responseType = "blob";
                xhr.onprogress = function(e) {
                    downloadProgress(e.loaded, e.total);
                }
                ;
                xhr.onload = function() {
                    setTimeout(function() {
                        downloadEnd();
                    }, 300);
                    if (this.status === 200) {
                        var blob = this.response;
                        if (navigator.msSaveBlob) {
                            window.navigator.msSaveBlob(blob, fn);
                            return;
                        }
                        if (window.URL) {
                            var a = document.createElement('a');
                            var oURL = window.URL.createObjectURL(blob);
                            if ('download'in a) {
                                a.href = oURL;
                                a.setAttribute("download", fn);
                                a.innerHTML = "downloading...";
                                document.body.appendChild(a);
                                setTimeout(function() {
                                    a.click();
                                    document.body.removeChild(a);
                                    setTimeout(function() {
                                        window.URL.revokeObjectURL(a.href);
                                    }, 250);
                                }, 66);
                                return;
                            }
                            var f = document.createElement("iframe");
                            document.body.appendChild(f);
                            oURL = "data:" + oURL.replace(/^data:([\w\/\-\+]+)/, "application/octet-stream");
                            f.src = oURL;
                            setTimeout(function() {
                                document.body.removeChild(f);
                            }, 333);
                        }
                    }
                }
                ;
                xhr.onloadend = function(e) {
                    if (this.status == 404) {
                        layer.msg('找不到资源,请联系客服');
                    }
                }
                ;
                var form = new FormData();
                jQuery.each(data.split('&'), function() {
                    var pair = this.split('=');
                    form.append(pair[0], pair[1]);
                });
                xhr.send(form);
            }
            ;
            $(".download-control").unbind('click').bind('click', function() {
                $.download_XMLHttpRequest($(this).attr('data-url'), $(this).attr('data-name'), "", 'get');
            });
        }
    }, {
        key: "initCurve",
        value: function initCurve() {
            var colors = ['#9d0f15', '#cb2534', '#f53f3f', '#f76660', '#fbada3', '#cc501f', '#da6b00', '#ff7e01', '#ff9b2d', '#ffcf8e', '#145fb9', '#1e6ece', '#3392f8', '#57a9fb', '#a0d4fe', '#541caf', '#722ed2', '#8c4fda', '#c296ee', '#debef6', '#008588', '#09a5a9', '#10c6c2', '#34d2ca', '#86e8de'];
            var curveDataSet = {};
            var currentCurve = null;
            var currentWavelength = undefined;
            var curveFormula = '1';
            var waveRange = {
                min: undefined,
                max: undefined
            };
            var minWaveLength = undefined;
            var maxWaveLength = undefined;
            var showSn = [];
            var myChart = echarts.init(document.getElementById('chartRender'));
            var renderTable = function renderTable() {
                var html = '';
                currentCurve.curve_data.map(function(v, i) {
                    var isDisbaled = showSn.indexOf(v.product_sn) < 0;
                    var value = undefined;
                    if (currentWavelength && !isDisbaled) {
                        var temp = v.wave_length_list.find(function(x) {
                            return x.wave_length == currentWavelength;
                        });
                        value = temp ? curveFormula === '1' ? temp.value1 : temp.value2 : undefined;
                    }
                    html += "\n          <tr style=\"color: ".concat(colors[i], "\" class=\"").concat(isDisbaled ? 'disabled' : '', "\" lay-on=\"setShowSn\" data-sn=\"").concat(v.product_sn, "\">\n            <td>").concat(v.product_sn, "</td>\n            <td>").concat(v.wave_length_range, "</td>\n            <td>").concat(isDisbaled ? '--' : currentWavelength || '--', "</td>\n            <td>").concat(value || '--', "</td>\n          </tr>\n        ");
                });
                $("#tableRender").html(html);
            };
            var renderChart = function renderChart() {
                var legendData = currentCurve.curve_data.map(function(v) {
                    return v.product_sn;
                });
                var xAxisData = [];
                for (var i = minWaveLength; i <= maxWaveLength; i++) {
                    xAxisData.push(i);
                }
                var renderData = currentCurve.curve_data.filter(function(v) {
                    return showSn.indexOf(v.product_sn) > -1;
                });
                var chartColor = renderData.map(function(v) {
                    return v.color;
                });
                var seriesData = renderData.map(function(v) {
                    var data = [];
                    var _loop = function _loop(_i) {
                        var temp = v.wave_length_list.find(function(x) {
                            return x.wave_length === _i;
                        });
                        data.push(temp ? curveFormula === '1' ? temp.value1 : temp.value2 : null);
                    };
                    for (var _i = minWaveLength; _i <= maxWaveLength; _i++) {
                        _loop(_i);
                    }
                    return {
                        name: v.product_sn,
                        type: 'line',
                        symbol: 'none',
                        areaStyle: {
                            opacity: 0.1
                        },
                        lineStyle: {
                            width: 1
                        },
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        connectNulls: true,
                        data: data
                    };
                });
                var option = {
                    color: chartColor,
                    animationDuration: 3000,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        show: false,
                        data: legendData
                    },
                    grid: {
                        top: '30px',
                        left: '60px',
                        right: '30px',
                        bottom: '60px'
                    },
                    xAxis: [{
                        type: 'category',
                        name: 'WaveLength(nm)',
                        nameLocation: 'center',
                        nameTextStyle: {
                            fontSize: 16,
                            padding: 15
                        },
                        boundaryGap: false,
                        data: xAxisData
                    }],
                    yAxis: [{
                        type: 'value',
                        name: curveFormula === '1' ? '%T' : 'OD',
                        nameLocation: 'center',
                        nameTextStyle: {
                            fontSize: 16,
                            padding: 15
                        },
                        min: 0,
                        max: curveFormula === '1' ? 100 : 10
                    }],
                    series: seriesData
                };
                setTimeout(function() {
                    myChart.resize();
                    myChart.setOption(option, {
                        notMerge: true,
                        lazyUpdate: true
                    });
                }, 0);
                myChart.getZr().on('mousemove', function(params) {
                    var op = myChart.getOption();
                    var pointInPixel = [params.offsetX, params.offsetY];
                    if (myChart.containPixel('grid', pointInPixel)) {
                        var point = myChart.convertFromPixel({
                            seriesIndex: 0
                        }, pointInPixel);
                        if (point) {
                            currentWavelength = op.xAxis[0].data[point[0]];
                            renderTable();
                        }
                    }
                });
            };
            var getWaveLengthRange = function getWaveLengthRange() {
                waveRange.min = Infinity;
                waveRange.max = 0;
                var renderData = currentCurve.curve_data.filter(function(v) {
                    return showSn.indexOf(v.product_sn) > -1;
                });
                renderData.forEach(function(v, i) {
                    waveRange.min = Math.min(waveRange.min, v.min);
                    waveRange.max = Math.max(waveRange.max, v.max);
                });
                minWaveLength = waveRange.min;
                maxWaveLength = waveRange.max;
                $('input[name="rangeMin"]').val('');
                $('input[name="rangeMax"]').val('');
                layui.form.render('input', 'curveForm');
            };
            var renderCurve = function renderCurve(data) {
                currentCurve = data;
                currentCurve.curve_data.map(function(v, i) {
                    v.color = colors[i];
                });
                getWaveLengthRange();
                renderTable();
                renderChart();
                $("#chartExplain").empty().hide();
                if (data.curve_desc) {
                    $("#chartExplain").html("\n          <h3>\u66F2\u7EBF\u8BF4\u660E</h3>\n          <p>".concat(data.curve_desc, "</p>\n        ")).show();
                }
                $("#curveModal").parent().css('height', 'auto');
            };
            layui.form.on('radio(curveFormula)', function(data) {
                curveFormula = data.value;
                if (curveFormula === '1') {
                    $("#dataTitle").text('当前透射率(%)');
                }
                if (curveFormula === '2') {
                    $("#dataTitle").text('当前光密度');
                }
                renderChart();
            });
            layui.util.on({
                viewCurve: function viewCurve($this, e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var _$this$parents$data = $this.parents('tr').data()
                      , group_id = _$this$parents$data.group_id
                      , list_id = _$this$parents$data.list_id
                      , sn = _$this$parents$data.sn;
                    showSn = [sn];
                    if (!curveDataSet[group_id + list_id]) {
                        Api.Product.getCurve({
                            group_id: group_id,
                            list_id: list_id
                        }).then(function(_ref3) {
                            var success = _ref3.success
                              , data = _ref3.data;
                            if (success) {
                                data.curve_data.map(function(x) {
                                    x.wave_length_list.map(function(y) {
                                        y.wave_length = Number(y.wave_length);
                                        y.reflection = Number(y.reflection);
                                        var temp1 = y.reflection;
                                        temp1 = Number.isFinite(temp1) ? temp1 : null;
                                        temp1 = temp1 < 0 ? 0 : temp1;
                                        temp1 = temp1 ? temp1.toFixed(6) : null;
                                        y.value1 = temp1;
                                        var temp2 = -Math.log10(y.reflection / 100);
                                        temp2 = Number.isFinite(temp2) ? temp2 : null;
                                        temp2 = temp2 < 0 ? 0 : temp2;
                                        temp2 = temp2 ? temp2.toFixed(6) : null;
                                        y.value2 = temp2;
                                    });
                                    x.min = x.wave_length_list[0].wave_length;
                                    x.max = x.wave_length_list[x.wave_length_list.length - 1].wave_length;
                                });
                                curveDataSet[group_id + list_id] = data;
                                renderCurve(data);
                            }
                        });
                    } else {
                        renderCurve(curveDataSet[group_id + list_id]);
                    }
                    layer.open({
                        type: 1,
                        title: "曲线图",
                        area: ['1440px', 'auto'],
                        scrollbar: false,
                        content: $("#curveModal")
                    });
                },
                setRange: function setRange() {
                    var min = parseInt($('input[name="rangeMin"]').val());
                    var max = parseInt($('input[name="rangeMax"]').val());
                    if (!min || !max || min >= max) {
                        layer.alert('请输入正确的波长范围');
                    } else {
                        minWaveLength = min;
                        maxWaveLength = max;
                        renderChart();
                    }
                },
                clearRange: function clearRange() {
                    minWaveLength = waveRange.min;
                    maxWaveLength = waveRange.max;
                    $('input[name="rangeMin"]').val('');
                    $('input[name="rangeMax"]').val('');
                    layui.form.render('input', 'curveForm');
                    renderChart();
                },
                setShowSn: function setShowSn($this) {
                    var sn = $this.data('sn');
                    if ($this.hasClass('disabled')) {
                        $this.removeClass('disabled');
                        showSn.push(sn);
                    } else {
                        $this.addClass('disabled');
                        showSn = showSn.filter(function(x) {
                            return x !== sn;
                        });
                    }
                    renderCurve(currentCurve);
                },
                export: function _export() {
                    Api.Product.exportCurve({
                        product_sn_list: showSn
                    }).then(function(res) {
                        Api.Tools.blobHandler(res).then(function(data) {
                            Api.Tools.downloadFile(data);
                        });
                    });
                }
            });
        }
    }]);
}();
$(function() {
    var productHandler = new Product();
    window.productHandler = productHandler;
});

