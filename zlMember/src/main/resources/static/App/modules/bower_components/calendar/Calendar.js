/* 行分割线，列分割线，日期格的大小width, height */

/**
 * 日期单元格类名说明
 * 不可选日期的类名为：invalid-day
 * 今天的类名为：today
 * 明天的类名为：tomorrow，但是有了今天，明天可以不用突出显示
 * 节日添加类名：festival
 * 选中的日期添加类名：selected-day
 * 区间选择之间日期添加类名：range-day
 * 区间选择时hover日期到目标日期的日期添加类名：hover-day
 * 周六，周日分别添加类名：saturday、sunday
 *
**/
// 自定义日期单元格宽度和高度时，日期内容填充最好也自定义提供

// hover, ajax请求数据
// 定位增强
(function () {
    'use strict';
    var helper = {};
    ["Date", "Array"].forEach(function (name) {
        helper["is" + name] = function (v) {
            return Object.prototype.toString.call(v) === "[object " + name + "]";
        };
    });
    function isElement(elem, tagName) {
        return elem.nodeType === 1 &&
            (tagName === undefined ? true : elem.tagName.toLowerCase() === tagName);
    }
    function isNotEmptyString(str) {
        return typeof str === "string" && str !== "";
    }
    function createDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    // 比较两个日期对象的日期的前后，通过创建时间为0的新日期对象进行比较
    function compareDate(date1, date2) {
        date1 = createDate(date1);
        date2 = createDate(date2);
        return date1.getTime() - date2.getTime();
    }
    function stringToDate(str) {
        str = str.trim();
        str = str.split(/[-\s:]/);
        var date = new Date(parseInt(str[0], 10), parseInt(str[1], 10) - 1, str[2] ? parseInt(str[2], 10) : 1);
        if (isNaN(date.getTime())) {
            return;
        }
        var methods = ['setHours', 'setMinutes', 'setSeconds'];
        for (var i = 3, len = str.length; i < len; i++) {
            date[methods[i - 3]](parseInt(str[i], 10));
        }
        if (isNaN(date.getTime())) {
            return;
        }
        return date;
    }
    function dateToString(date, time) {
        return date.getFullYear() + "-" + pullZero(date.getMonth() + 1) + (time !== 'month' ? "-" + pullZero(date.getDate()) : '');
    }
    function timeToString(date, hasSecond) {
        return pullZero(date.getHours()) + ":" + pullZero(date.getMinutes()) + (hasSecond ? ":" + pullZero(date.getSeconds()) : '');
    }
    function pullZero(num) {
        return (num < 10 ? "0" : "") + num;
    }
    function convertProp(obj, props) {
        var prop;
        for (var i = 0, len = props.length; i < len; i++) {
            prop = props[i];
            if (isNotEmptyString(obj[prop])) {
                obj[prop] = stringToDate(obj[prop]);
            } else if (!helper.isDate(obj[prop])) {
                obj[prop] = undefined;
            }
        }
    }
    function formatDate(param) {
        convertProp(param, ["startDate", "endDate"]);
        if (isNotEmptyString(param.currentDate)) {
            param.currentDate = [stringToDate(param.currentDate)];
        } else if (helper.isDate(param.currentDate)) {
            param.currentDate = [param.currentDate];
        } else if (helper.isArray(param.currentDate)) {
            convertProp(param.currentDate, [0, 1]);
        }
    }
    function setCurrentDate(param, time) {
        if (param.elem && isElement(param.elem, "input")) {
            var val = stringToDate(param.elem.value);
            if (val) {
                if (param.mode === "rangeTo") {
                    param.currentDate[1] = val;
                } else {
                    param.currentDate[0] = val;
                }
            } else {
                if (param.mode === "rangeTo") {
                    if (param.currentDate[1]) {
                        param.elem.value = dateToString(param.currentDate[1], time);
                    }
                } else {
                    if (param.currentDate[0]) {
                        if (param.autoFill === false) return;
                        param.elem.value = dateToString(param.currentDate[0], time);
                    }
                }
            }
        }
    }
    function resetStartDate(param) {
        if (param.mode === "rangeTo" && param.currentDate[0]) {
            if (param.startDate.getTime() < param.currentDate[0].getTime()) {
                param.startDate = new Date(param.currentDate[0]);
            }
        }
    }
    var isIE8 = false,
        isIE9 = false,
        offsetCorrectionMap = {
            def: {
                horizontal: isIE8 || isIE9 ? -3 : 0,
                vertical: 0,
                bottom: isIE8 || isIE9 ? 0 : 4,
            },
            white: {
                horizontal: isIE8 ? 1 : 0,
                vertical: isIE8 ? 7 : 10
            }
        };
    offsetCorrectionMap['sm-white'] = offsetCorrectionMap.white;
    function show(elem, base, wrapper, offset, skin) {
        var offsetCorrection = offsetCorrectionMap[skin] || offsetCorrectionMap['def'];
        if (!offset) {
            offset = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        } else {
            offset.left = offset.left || 0;
            offset.top = offset.top || 0;
            offset.right = offset.right || offset.left || 0;
            offset.bottom = offset.bottom || offset.top || 0;
        }
        var baseOffset = $(base).offset(),
            left,
            top;
        if (wrapper) {
            var wrapperOffset = $(wrapper).offset();
            left = offset.left + offsetCorrection.horizontal - wrapperOffset.left;
            top = offset.top + $(base).height() + offsetCorrection.top - wrapperOffset.top;
        } else {
            var winScrollLeft = $(window).scrollLeft(),
                winScrollTop = $(window).scrollTop(),
                winWidth = $(window).width(),
                winHeight = $(window).height(),
                baseWidth = $(base).outerWidth(),
                baseHeight = $(base).outerHeight(),
                elemWidth = $(elem).width(),
                elemHeight = $(elem).height();
            var className;
            elemWidth += offsetCorrection.horizontal + offset.right; // 需要加上偏移值
            if (winWidth + winScrollLeft - baseOffset.left < elemWidth && baseOffset.left - winScrollLeft + baseWidth >= elemWidth) {
                className = 'right';
                left = baseWidth - elemWidth;
            } else {
                className = 'left';
                left = offsetCorrection.horizontal + offset.left;
            }
            elemHeight += offsetCorrection.vertical + offset.bottom; // 需要加上偏移值
            if (winHeight + winScrollTop - baseOffset.top - baseHeight < elemHeight && baseOffset.top - winScrollTop >= elemHeight) {
                className += '-top';
                top = -elemHeight - (offsetCorrection.bottom !== undefined ? offsetCorrection.bottom : offsetCorrection.vertical) - offset.bottom; // 3px是阴影
            } else {
                className += '-bottom';
                top = baseHeight + offsetCorrection.vertical + offset.top;
            }
            var arrow = $(elem).children()[1];
            if (arrow) {
                arrow.className = className;
            }
        }
        elem.style.left = baseOffset.left + left + "px";
        elem.style.top = baseOffset.top + top + "px";
        elem.style.display = "block";
    }
    // 重置必要的属性
    function setProp(obj) {
        this._ = {}; // _属性表示副本
        $.extend(this._, obj);
        var props = ["startDate", "endDate", "zIndex", "currentDate", "ajaxObj", "cache", "fn", "elem", "elems", "mode", "offset", "buildContent", "hoverIn", "hoverOut"],
            prop;
        for (var i = 0, len = props.length; i < len; i++) {
            prop = props[i];
            this._[prop] = this._[prop] || this[prop];
        }
        if (!this._.currentDate) {
            this._.currentDate = [];
        }
        if (this.time === 'month') {
            this._.startDate.setDate(1);
            this._.endDate.setDate(1);
        }
    }
    function pushElem(obj) {
        if (obj.elem) {
            obj.elem = $(obj.elem);
            if (obj.elem.length) {
                obj.elem = obj.elem[0];
                if ($.inArray(obj.elem, this._elems) === -1) {
                    this._elems.push(obj.elem);
                }
            } else {
                delete obj.elem;
            }
        }
        if (obj.elems) {
            var elems = $(obj.elems);
            for (var i = 0, len = elems.length; i < len; i++) {
                if ($.inArray(elems[i], this._elems) === -1) {
                    this._elems.push(elems[i]);
                }
            }
        }
    }

    /**
     * firstDay  {number} 日历的第一天，默认是0，表示周日，1表示周一，依次类推，最大为6
     * startDate {string | date} 设置日历的可选区域的起始时间
     * endDate {string | date} 设置日历的可选区域的终止时间
     * wrapper {selector} 作为日历容器的元素器，不提供为body
     * type {string} 日历类型："show", "pick"(默认)(创建时有效)
     * elem {selector} 与日历关联的元素选择器，在"pick"类型下有效，用作定位，可在创建时传入，也可以在picker方法中传入
     * monthNum {number} (创建时有效)一次展现月份个数，默认2
     * navNum  {number}  (创建时有效)切换时候月份数，默认1
     * skin {string}  (创建时有效)日历的皮肤，默认是蓝色，可以设置为"green"、"white"
     * className {string} (创建时有效)设置在日历根元素的类名，方便在日历的指定皮肤上定制日历，最常于异步日历设置样式
     * showOtehrMonth {boolean} 是否显示前后月的日期
     * isBigRange {boolean} (创建时有效)是否是大区间日期选择，如果是的话，开启启年和月的选择功能
     * time {boolean | string} (创建时有效)是否需要时间输入，当置为true时显示时分，当置为'second'时显示时分秒，当设置为'month'时候显示年和月
     * minuteStep  {number}  (创建时有效)分钟数的步长，分钟选择列表按这个值从0开始递增，显示时间时有效
     * secondStep  {number}  (创建时有效)秒数的步长，秒数选择列表按这个值从0开始递增，显示秒时有效
     * hasClear  {boolean}  (创建时有效)是否显示清除按钮，默认是显示清除按钮
     * panelWidth 和 wrapperWidth 创建时有效
     * wrapper 创建时有效
     * mode {string} 选择的模式："rangeFrom"(默认), "rangeTo", "range", "single"(暂时不支持，只用当单选时选中日期的样式与不同时才考虑支持)
     * currentDate {string | date | array}
     * 当mode为rangeFrom，currentDate设置为数组时，第1个值表示起始时间，第2个表示终止时间，设置为日期字符串和日期对象时，表示起始时间
     * 当mode为rangeTo，currentDate
     * 当mode为range，表示同时选择两个日期
     * ajaxObj {object} 用来配置异步请求的对象，url属性和data属性可以是函数，接受year和month两个参数
     * cache  {boolean} 是否缓存日历数据，异步日历下有效
     * hoverIn {function}
     * hoverOut {function}
     * 扩展类属性
     * buildContent {function} 接受       
     * fn {function} 选中日期后的回调
     * 
    **/
    function Calendar(param) {
        $.extend(this, {
            firstDay: 0,
            monthNum: 1,
            navNum: 1,
            minuteStep: 5,
            secondStep: 5,
            hasClear: true,
            zIndex: '10000',
            startDate: new Date(1900, 1 - 1, 1),
            endDate: new Date(2100, 12 - 1, 31),
            dataCache: {}
        });
        if (param !== undefined) {
            formatDate(param);
            setCurrentDate(param, param.time);
            resetStartDate(param);
            $.extend(this, param);
        }
        if (this.style === "show") {
            build.call(this);
            if (this.wrapper) {
                this.wrapper = $(this.wrapper);
                if (this.wrapper.length) {
                    this.wrapper = this.wrapper[0];
                    this.wrapper.appendChild(this.panel);
                } else {
                    delete this.wrapper;
                }
            } else {
                document.body.appendChild(this.panel);
            }
            setProp.call(this, param);
            this.panel.style.position = "relative";
            this.update();
            init.call(this);
        } else {
            this._elems = []; // 存储相关联的元素
            pushElem.call(this, this);
        }
    }
    Calendar.prototype.dayStrs = ["日", "一", "二", "三", "四", "五", "六"];
    Calendar.prototype.dayClassNameMap = {
        '0': 'sunday',
        '6': 'saturday'
    };
    Calendar.prototype.pick = function (param) {
        if (this.style === "show") {
            return;
        }
        if (param !== undefined) {
            pushElem.call(this, param);
            formatDate(param);
            var currentDate = param.currentDate || [];
            if ($(this.panel).css('display') === 'block' && this._ && this._.elem === param.elem) {
                if (this._.mode === 'rangeTo') {
                    if (this._.currentDate[1] === currentDate[1]) {
                        return;
                    }
                } else {
                    if (this._.currentDate[0] === currentDate[0]) {
                        return;
                    }
                }
            }
        }
        if (!this.panel) {
            build.call(this);
            if (this.wrapper) {
                this.wrapper.appendChild(this.panel);
            } else {
                document.body.appendChild(this.panel);
            }
            this.panel.style.position = "absolute";
            this.panel.style.zIndex = this.zIndex;
            bindElem.call(this);
            init.call(this);
        }
        // 取必须值
        setProp.call(this, param);
        setCurrentDate(this._, this.time);
        resetStartDate(this._);
        this.update();
        var that = this;
        $('.time-selector', this.panel).css({
            display: 'none'
        });
        setTimeout(function () {
            that.panel.style.zIndex = that._.zIndex;
            show(that.panel, that._.elem, that.wrapper, that._.offset, that.skin);
        }, 0);
    };
    Calendar.prototype.hide = function () {
        if (!this.panel) { // 还没有创建
            return;
        }
        $('.time-selector', this.panel).css({
            display: 'none'
        });
        this.panel.style.display = "none";
    };
    var skinWidthMap = {
        "default": 231,
        "white": 266,
        "sm-white": 226
    };
    /* 
     * 日历id，主要用于重置样式，这样可以让样式只用于当前日历框
     * 如果需要定制日历，通过样式来完成
     * wrpperWidth {number} 每个日历内容板(类名为calendar-wrapper的div)的宽度，默认是231px((29 + 1) * 7 + 1 + 10 * 2)
     * panelWidth {number} 日历面板(类名为calendar-panel的div)宽度，不提供的话，通过wrapperWidth * this.monthNum
     * 
    **/
    function build() {
        if (this.isBigRange) {
            this.headerMonthHtmlStr = '<select name="year" class="calendar-year"></select><em>年</em>' +
                (this.time === 'month' ? '' : '<select name="month" class="calendar-month"></select><em>月</em>');
            this.updateHeaderMonth = function (wrapper, year, month, index) {
                var selects = $("select", wrapper),
                    name = selects[1] ? 'Month' : 'FullYear';
                if (!year) {
                    year = parseInt(selects[0].value, 10);
                    if (selects[1]) {
                        month = parseInt(selects[1].value, 10);
                    }
                }
                var date = new Date(year, month ? month - 1 : 0, 1),
                    startDate = new Date(this._.startDate),
                    endDate = new Date(this._.endDate);
                date['set' + name](date['get' + name]() - index);
                if (date < startDate) {
                    startDate = new Date(date);
                }
                date['set' + name](date['get' + name]() + index);

                date['set' + name](date['get' + name]() + this.monthNum - index - 1);
                if (date > endDate) {
                    endDate = date;
                }
                date['set' + name](date['get' + name]() - this.monthNum + index + 1);

                buildYearOptions(selects[0], startDate, endDate, year);
                if (selects[1]) {
                    buildMonthOptions(selects[1], startDate, endDate, year, month);
                }
            };
            this.getYearAndMonth = function (wrapper) {
                var result = $("select", wrapper);
                return [parseInt(result[0].value, 10), result[1] ? parseInt(result[1].value, 10) : 1];
            };
        } else {
            this.headerMonthHtmlStr = this.time === 'month' ? '年' : '年月';
            this.updateHeaderMonth = function (wrapper, year, month) {
                var span = $('h6 span', wrapper);
                span[0].innerHTML = year + '年' + (month ? month + '月' : '');
            };
            this.getYearAndMonth = function (wrapper) {
                var result = $("span", wrapper)[0].innerHTML.split("年");
                result[0] = parseInt(result[0], 10);
                result[1] = result[1] ? parseInt(result[1].split("月")[0], 10) : 1;
                return result;
            };
        }

        this.wrapperWidth = typeof this.wrapperWidth === "number" ? this.wrapperWidth : (skinWidthMap[this.skin] || skinWidthMap.default);
        this.panelWidth = typeof this.panelWidth === "number" ? this.panelWidth : (this.wrapperWidth * this.monthNum);
        var panel = document.createElement("div"),
            skins = this.skin ? this.skin.split('-') : [];
        panel.className = "calendar-panel" + (this.time === 'month' ? ' calendar-month-panel' : '') + (this.skin ? (skins[1] ? " " + skins[1] : "") + " " + this.skin : "") + (this.className ? " " + this.className : "");
        if (this.style !== 'show') {
            panel.style.display = "none";
        }
        panel.style.width = this.panelWidth + "px";

        var htmlStr = '<div style="width: ' + this.panelWidth + 'px">' +
            '<div class="calendar-container" style="width: ' + (this.wrapperWidth * (this.monthNum + this.navNum)) + 'px;">' +
                buildWrapper.call(this, this.monthNum) +
            '</div>';
        if (this.time === true || this.time === 'second') {
            var now = new Date();
            htmlStr += '<div class="control-container">' +
                '<div class="time-panel' + (this.time === 'second' ? ' time-second-panel' : '') + '">' +
                    '<label></label>' +
                    '<div>' +
                        '<span class="hour-wrapper"><input maxlength="2" value="' + pullZero(now.getHours()) + '"><div class="time-selector" style="display: none;">' +
                        '<ul>' + buildSelectList(24, 1) + '</ul>' +
                        '</div></span><em>:</em><span class="minute-wrapper"><input maxlength="2" value="' + pullZero(now.getMinutes()) + '">' +
                            '<div class="time-selector" style="display: none;"><ul>' + buildSelectList(60, this.minuteStep) + '</ul></div>' +
                        '</span>' +
                        (this.time === 'second' ? '<em>:</em><span class="second-wrapper" ><input maxlength="2" value="' + pullZero(now.getSeconds()) + '">' +
                            '<div class="time-selector" style="display: none;"><ul>' + buildSelectList(60, this.secondStep) + '</ul></div>' +
                        '</span>' : '') +
                    '</div>' +
                '</div>' +
                (this.hasClear ? '<button class="clear-control">清空</button>' : '') +
                '<button class="confirm-control">确定</button>' +
            '</div>';
        } else if (this.hasClear) {
            htmlStr += '<div class="control-container">' +
                    '<button class="clear-control">清空</button>' +
                '</div>';
        }
        htmlStr += '<div class="month-nav">' +
            '<span class="previous-month-panel"><i class="previous-month"></i></span>' +
            '<span class="next-month-panel"><i class="next-month"></i></span>' +
        '</div>';
        panel.innerHTML = htmlStr + '</div>' + (/(^|-)white$/.test(this.skin) && this.style !== 'show' ? '<i><em></em></i>' : '');
        this.panel = panel;
    }
    function buildWrapper(num) {
        var buildTable = this.time === 'month' ? buildMonthTable : buildDateTable,
            htmlStr = '';
        for (var i = 0; i < num; i++) {
            htmlStr += '<div class="calendar-wrapper" style="width:' + this.wrapperWidth + 'px">' +
                    '<h6>' +
                        '<span>' + this.headerMonthHtmlStr + '</span>' +
                    '</h6>' +
                    '<div>' +
                         buildTable.call(this) +
                    '</div>' +
                '</div>';
        }
        return htmlStr;
    }
    function buildDateTable() {
        var htmlStr = '<table>' +
            '<tr class="header">';
        var dayIndex,
            dayClass;
        for (var j = 0; j < 7; j++) {
            dayIndex = (j + this.firstDay) % 7;
            dayClass = this.dayClassNameMap[dayIndex + ''];
            htmlStr += '<th' + (dayClass ? ' class="' + dayClass + '"' : '') + '>' + this.dayStrs[dayIndex] + '</th>';
        }
        htmlStr += '</tr>';
        // 固定6列，不动态改变
        for (j = 0; j < 6; j++) {
            htmlStr += '<tr' + (j == 5 ? ' class="last-row"' : '') + '>';
            for (var k = 0; k < 7; k++) {
                htmlStr += '<td></td>';
            }
            htmlStr += '</tr>'
        }
        htmlStr += '</table>';
        return htmlStr;
    }
    function buildMonthTable() {
        var rowNum = 3,
            colNum = 4,
            htmlStr = '<table>';
        for (var i = 0; i < rowNum; i++) {
            htmlStr += '<tr>'
            for (var j = 0; j < colNum; j++) {
                htmlStr += '<td><span class="d">' + (i * colNum + j + 1) + '月</span></td>'
            }
            htmlStr += '</tr>';
        }
        htmlStr += '</table>';
        return htmlStr;
    }
    function buildYearOptions(select, startDate, endDate, year) {
        select.options.length = 0;
        for (var i = startDate.getFullYear(), len = endDate.getFullYear() ; i <= len; i++) {
            select.options.add(new Option(i, i));
        }
        select.value = year;
    }
    function buildMonthOptions(select, startDate, endDate, year, month) {
        var i = startDate.getFullYear() === year ? startDate.getMonth() + 1 : 1,
            len = endDate.getFullYear() === year ? endDate.getMonth() + 1 : 12
        if (i === 1 && len === 12 && select.options.length === 12) {
            select.value = month;
            return;
        }
        select.options.length = 0;
        for (; i <= len; i++) {
            select.options.add(new Option(i, i));
        }
        select.value = month;
    }
    function buildSelectList(end, step) {
        step = step || 1;
        var htmlStr = '';
        for (var i = 0; i < end; i += step) {
            htmlStr += '<li>' + pullZero(i) + '</li>'
        }
        return htmlStr;
    }
    function bindElem() {
        var that = this;
        $(document).on("click", function (e) {
            var target = e.target;
            while (target && document !== target) {
                if ($.inArray(target, that._elems) !== -1 || target === that.panel) {
                    return;
                }
                target = target.parentNode;
            }
            that.hide();
        });
        $(window).on("resize", function (e) {
            var display = $(that.panel).css("display");
            if (display !== "none") {
                show(that.panel, that._.elem, that.wrapper, that._.offset, that.skin);
            }
        });
    }
    function generateDate(td) {
        var date = stringToDate(td.attr('data-date'));
        if (td.hasClass("previous-month-day")) {
            date.setMonth(date.getMonth() - 1);
        } else if (td.hasClass("next-month-day")) {
            date.setMonth(date.getMonth() + 1);
        }
        return date;
    }
    function init() {
        var that = this,
            rangeDays,
            fromDay,
            toDay; // 储存选择区间的
        $('.time-selector', this.panel).delegate('li', 'click', function (e) {
            $('input', $(this).closest('span')).val(this.innerHTML);
            $(this).closest('.time-selector').css({
                display: 'none'
            });
            e.stopPropagation();
        });
        $(this.panel).on("click", function (e) {
            var target = e.target;
            while (target !== this) {
                target = $(target);
                if (target[0].tagName.toLowerCase() === "td") {
                    if (target.hasClass("invalid-day")) {
                        break;
                    }
                    var date = generateDate.call(that, target);
                    if (that.mode === 'rangeTo') {
                        that._.currentDate[1] = date;
                    } else {
                        that._.currentDate[0] = date;
                    }
                    if (that.time === true || that.time === 'second') {
                        if (that.mode === 'rangeTo') {
                            $('.to-day', that.panel).removeClass('to-day');
                            target.addClass('to-day');
                            if (!that._.currentDate[0]) {
                                break;
                            }
                            var tds = $('td', that.panel),
                                td = $(".from-day")[0],
                                i;
                            if (td) { // day为undefined的时候，index方法返回的是0不是1
                                i = tds.index(td) + 1;
                            } else {
                                i = 0;
                            }
                            var end = tds.index(target);
                            for (; i < end; i++) {
                                td = $(tds[i]);
                                if (!td.hasClass("invalid-day")) {
                                    td.addClass("range-day");
                                }
                            }
                        } else {
                            $('.from-day', that.panel).removeClass('from-day');
                            target.addClass('from-day');
                        }
                        break;
                    }
                    if (that.style !== "show") {
                        that.hide();
                    }

                    if (that._.elem && isElement(that._.elem, "input")) {
                        that._.elem.value = dateToString(date, that.time);
                        $(that._.elem).trigger('input');//触发input事件，支持vue的双向绑定
                    }
                    if (typeof that._.fn === "function") {
                        that._.fn(date.getFullYear(), date.getMonth() + 1, date.getDate(), target[0], that._.elem);
                    }
                    break;
                } else if (target.hasClass("previous-month")) {
                    if (!target.hasClass("previous-month-disabled")) {
                        that.previousMonth();
                    }
                    break;
                } else if (target.hasClass("next-month")) {
                    if (!target.hasClass("next-month-disabled")) {
                        that.nextMonth();
                    }
                    break;
                }
                target = target[0].parentNode;
            }
            $('.time-selector', this).css({
                display: 'none'
            });
            e.stopPropagation();
        }).delegate("td", "mouseenter", function (e) {
            var delegateTarget = $(this);
            if (delegateTarget.hasClass("invalid-day")) {
                return;
            }
            var date = stringToDate(this.getAttribute("data-date"));
            if (delegateTarget.hasClass("previous-month-day")) {
                date.setMonth(date.getMonth() - 1);
            } else if (delegateTarget.hasClass("next-month-day")) {
                date.setMonth(date.getMonth() + 1);
            }
            var days = $("td", that.panel),
                i,
                end,
                day;
            if (that._.mode === "rangeTo") {
                delegateTarget.addClass("hover-to-day");
                if (!that._.currentDate[0]) {
                    if (typeof that._.hoverIn === "function") {
                        that._.hoverIn(this, date);
                    }
                    return;
                }
                toDay = $(".to-day", that.panel);
                toDay.removeClass("to-day");
                day = $(".from-day")[0];
                if (day) { // day为undefined的时候，index方法返回的是0不是1
                    i = days.index(day) + 1;
                } else {
                    if (date.getTime() < that._.currentDate[0].getTime()) {
                        i = days.length;
                    } else {
                        i = 0;
                    }
                }
                end = days.index(this);
            } else {
                delegateTarget.addClass("hover-from-day");
                if (!that._.currentDate[1]) {
                    if (typeof that._.hoverIn === "function") {
                        that._.hoverIn(this, date);
                    }
                    return;
                }
                fromDay = $(".from-day", that.panel);
                fromDay.removeClass("from-day");
                i = days.index(this) + 1;
                day = $(".to-day")[0];
                if (day) {
                    end = days.index(day)
                } else {
                    if (date.getTime() > that._.currentDate[1].getTime()) {
                        i = 0;
                    } else {
                        end = days.length;
                    }
                }
            }
            rangeDays = $(".range-day");
            rangeDays.removeClass("range-day");
            for (; i < end; i++) {
                day = $(days[i]);
                if (!day.hasClass("invalid-day")) {
                    day.addClass("hover-day");
                }
            }
            if (typeof that._.hoverIn === "function") {
                that._.hoverIn(this, date);
            }
        }).delegate("td", "mouseleave", function (e) {
            var delegateTarget = $(this);
            if (delegateTarget.hasClass("invalid-day")) {
                return;
            }
            if (that._.mode === "rangeTo") {
                delegateTarget.removeClass("hover-to-day");
            } else {
                delegateTarget.removeClass("hover-from-day");
            }
            $(".hover-day").removeClass("hover-day");
            if (rangeDays) {
                rangeDays.addClass("range-day");
                rangeDays = undefined; // 需要删除掉
            }
            if (fromDay) {
                fromDay.addClass("from-day");
                fromDay = undefined;
            }
            if (toDay) {
                toDay.addClass("to-day");
                toDay = undefined;
            }
            if (typeof that._.hoverOut === "function") {
                that._.hoverOut(this);
            }
        });
        $('.time-panel > div > span', that.panel).on('click', function (e) {
            $('.time-selector', $(this).siblings('span')).css({
                display: 'none'
            });
            // 需要判断时间的范围
            $('.time-selector', this).css({
                display: 'block'
            });
            that.scrollbarList[$('.time-panel > div > span', that.panel).index(this)].update();
            e.stopPropagation();
        });
        $('.time-panel input', that.panel).on("keyup", function () {
            var max = $(this).parent().hasClass('hour-wrapper') ? 23 : 59;
            if (this.value === '-') {
                return;
            }
            var num = parseInt(this.value);
            if (num < 0) {
                this.value = 0;
            } else if (this.value > max) {
                this.value = max;
            } else if (isNaN(num)) {
                this.value = '';
            } else {
                this.value = num;
            }
        });
        that.scrollbarList = $('.time-panel > div > span > div', that.panel).scrollbar();
        $('.control-container > .confirm-control', that.panel).on('click', function (e) {
            that.hide();
            var date;
            if (that.mode === 'rangeTo') {
                date = that._.currentDate[1];
            } else {
                date = that._.currentDate[0];
            }
            if (!date) {
                return;
            }
            var inputList = $('.time-panel input', that.panel);
            date.setHours(parseInt(inputList[0].value, 10));
            date.setMinutes(parseInt(inputList[1].value, 10));
            if (inputList[2]) {
                date.setSeconds(parseInt(inputList[2].value, 10));
            }
            if (that._.elem && isElement(that._.elem, "input")) {
                that._.elem.value = dateToString(date) + ' ' + timeToString(date, that.time === 'second');
            }
            if (typeof that._.fn === "function") {
                that._.fn(date, $(that.mode === 'rangeTo' ? '.to-day' : '.from-day', that.panel)[0], that._.elem);
            }
        });
        $('.control-container > .clear-control', that.panel).on('click', function (e) {
            if (that.mode === 'rangeTo') {
                that._.currentDate[1] = undefined;
            } else {
                that._.currentDate[0] = undefined;
            }
            var classNames = ['from-day', 'range-day', 'to-day'];
            for (var i = 0, len = classNames.length; i < len; i++) {
                $('.' + classNames[i], that.panel).removeClass(classNames[i]);
            }
            if (isElement(that._.elem, 'input')) {
                that._.elem.value = '';
                $(that._.elem).trigger('input');//触发input事件，支持vue的双向绑定
            }
            that.hide();
            if (typeof that._.clearFn === "function") {
                that._.clearFn(that._.elem);
            }
        });
        if (!this.isBigRange) {
            return;
        }
        $('.calendar-year', that.panel).on('change', function () {
            yearChanged.call(that, this);
        });
        $('.calendar-month', that.panel).on('change', function () {
            monthChanged.call(that, this);
        });
    }
    function yearChanged(yearSelect) {
        var index = $('.calendar-year', this.panel).index(yearSelect),
            year = parseInt(yearSelect.value, 10),
            monthSelect = $('.calendar-month', yearSelect.parentNode)[0],
            date;
        if (!monthSelect) {
            date = new Date(year, 0, 1);
            date.setFullYear(date.getFullYear() - index);
            update.call(this, date);
            return;
        }
        var month = parseInt(monthSelect.value, 10),
            startDate = new Date(this._.startDate),
            endDate = new Date(this._.endDate);
        startDate.setMonth(startDate.getMonth() + index);
        endDate.setMonth(endDate.getMonth() - this.monthNum + index + 1);
        // 月份如果不在可选区域了，需要重置掉
        if (startDate.getFullYear() === year && month < startDate.getMonth() + 1) {
            month = startDate.getMonth() + 1;
        } else if (endDate.getFullYear() === year && month > endDate.getMonth() + 1) {
            month = endDate.getMonth() + 1;
        }
        buildMonthOptions(monthSelect, startDate, endDate, year, month);
        monthSelect.value = month;
        var date = new Date(year, month - 1, 1);
        date.setMonth(date.getMonth() - index);
        update.call(this, date);
    }
    function monthChanged(monthSelect) {
        var yearSelect = $('.calendar-year', monthSelect.parentNode)[0],
            index = $('.calendar-month', this.panel).index(monthSelect),
            date = new Date(parseInt(yearSelect.value, 10), parseInt(monthSelect.value, 10) - 1, 1);
        date.setMonth(date.getMonth() - index);
        update.call(this, date);
    }
    Calendar.prototype.update = function (date, month) {
        if (date === undefined) {
            update.call(this, date);
            updateTime.call(this);
            return;
        }
        if (!helper.isDate(date)) {
            date = new Date(date, month - 1, 1);
        } else {
            date = new Date(date);
        }
        if (isNaN(date.getTime())) {
            date = undefined;
        }
        update.call(this, date);
        updateTime.call(this);
    };
    function showLoading(panel) {
        var loadingElem = $(".loading", panel);
        if (loadingElem.length) {
            loadingElem.css({
                display: "block"
            });
        } else {
            $(panel).append('<div class="loading"><i></i><em></em></div>');
        }
    }
    function update(date, wrappers, isNext) {
        wrappers = wrappers || $(".calendar-wrapper", this.panel); // this.panel.getElementsByTagName("table");
        this.today = new Date();
        if (typeof date === "undefined") {
            var maxStartDate = compareDate(this.today, this._.startDate) > 0 && compareDate(this.today, this._.endDate) < 0 ? this.today : compareDate(this._.startDate, this.today) >= 0 ? this._.startDate : this._.endDate;
            if (this._.mode === "rangeTo") {
                if (this._.currentDate[1]) {
                    date = new Date(this._.currentDate[1]);
                } else if (this._.currentDate[0]) {
                    date = new Date(this._.currentDate[0]);
                } else {
                    date = new Date(maxStartDate);
                }
            } else {
                if (this._.currentDate[0]) {
                    date = new Date(this._.currentDate[0]);
                } else if (this._.currentDate[1]) {
                    date = new Date(this._.currentDate[1]);
                } else {
                    date = new Date(maxStartDate);
                }
            }
        }
        if (this.time === 'month') {
            date.setMonth(0);
        }
        date.setDate(1);
        if (this._.startDate) {
            if (this.time === 'month') {
                if (isNext) {
                    date.setFullYear(date.getFullYear() - this.monthNum + wrappers.length);
                }
                if (date.getFullYear() <= this._.startDate.getFullYear()) {
                    $(".previous-month", this.panel).addClass("previous-month-disabled");
                } else {
                    $(".previous-month", this.panel).removeClass("previous-month-disabled");
                }
                if (isNext) {  // 还原
                    date.setFullYear(date.getFullYear() + this.monthNum - wrappers.length);
                }
            } else {
                if (isNext) {
                    date.setMonth(date.getMonth() - this.monthNum + wrappers.length);
                }
                if ((this._.startDate.getFullYear() === date.getFullYear() && this._.startDate.getMonth() === date.getMonth()) || compareDate(this._.startDate, date) > 0) {
                    $(".previous-month", this.panel).addClass("previous-month-disabled");
                } else {
                    $(".previous-month", this.panel).removeClass("previous-month-disabled");
                }
                if (isNext) {  // 还原
                    date.setMonth(date.getMonth() + this.monthNum - wrappers.length);
                }
            }
        }
        if (this._.ajaxObj) {
            var ajaxNum = 0;
        }
        for (var i = 0, len = wrappers.length; i < len; i++) {
            this.updateHeaderMonth(wrappers[i], date.getFullYear(), this.time === 'month' ? undefined : date.getMonth() + 1, (isNext ? this.monthNum - this.navNum : 0) + i);
            if (this._.ajaxObj) {
                var that = this,
                    newWrapper = $(buildWrapper.call(this, 1));
                $($(wrappers[i]).children()[1]).remove();
                wrappers[i].appendChild(newWrapper.children()[1]);
                (function (wrapper, date, index) {
                    var ajaxObjCopy = $.extend({}, that._.ajaxObj);
                    if (typeof ajaxObjCopy.url === 'function') {
                        ajaxObjCopy.url = ajaxObjCopy.url(date.getFullYear(), date.getMonth() + 1);
                    } else {
                        ajaxObjCopy.url = ajaxObjCopy.url.replace("{year}", date.getFullYear()).replace("{month}", date.getMonth() + 1);
                    }
                    if (that._.cache && that.dataCache[ajaxObjCopy.url] !== undefined) {
                        updatePanel.call(that, wrapper, date, that.dataCache[ajaxObjCopy.url]);
                        ajaxNum++;
                        if (ajaxNum === that.monthNum) {
                            $(".loading", that.panel).css({ "display": "none" });
                        }
                        return;
                    }
                    if (typeof ajaxObjCopy.data === 'function') {
                        ajaxObjCopy.data = ajaxObjCopy.data(date.getFullYear(), date.getMonth() + 1);
                    }
                    var preProcess = ajaxObjCopy.success;
                    ajaxObjCopy.success = function (data) {
                        if (typeof preProcess === "function") {
                            data = preProcess(data) || data;
                        }
                        if (that._.cache) {
                            that.dataCache[ajaxObjCopy.url] = data;
                        }
                        updatePanel.call(that, wrapper, date, data);
                        ajaxNum++;
                        if (ajaxNum === wrappers.length) {
                            $(".loading", that.panel).css("display:none;");
                        }
                    };
                    showLoading();
                    $.ajax(ajaxObjCopy);
                })(wrappers[i], new Date(date), i);
            } else {
                updatePanel.call(this, wrappers[i], new Date(date)); // 日期是对象类型，需要重新创建一个，否者会对当前对象造成影响
            }
            if (this.time === 'month') {
                date.setFullYear(date.getFullYear() + 1);
            } else {
                date.setMonth(date.getMonth() + 1);
            }
        }
        if (this.time === 'month') {
            date.setFullYear(date.getFullYear() - 1);
        } else {
            date.setMonth(date.getMonth() - 1);   // 还原成最后一个日历面板的月份的第一天
        }
        if (this._.endDate) {
            if (this.time === 'month') {
                if (!isNext) {
                    date.setFullYear(date.getFullYear() + this.monthNum - wrappers.length);
                }
                if (date.getFullYear() >= this._.endDate.getFullYear()) {
                    $(".next-month", this.panel).addClass("next-month-disabled");
                } else {
                    $(".next-month", this.panel).removeClass("next-month-disabled");
                }
            } else {
                if (!isNext) {
                    date.setMonth(date.getMonth() + this.monthNum - wrappers.length);
                }
                if ((this._.endDate.getFullYear() === date.getFullYear() && this._.endDate.getMonth() === date.getMonth()) || compareDate(this._.endDate, date) < 0) {
                    $(".next-month", this.panel).addClass("next-month-disabled");
                } else {
                    $(".next-month", this.panel).removeClass("next-month-disabled");
                }
            }
        }
    };
    function updateTime() {
        var date;
        if (this.mode === 'rangeTo') {
            date = this._.currentDate[1];
        } else {
            date = this._.currentDate[0];
        }
        if (!date) {
            date = this.today; // 依赖update方式初始化的today 
        }
        if (this.time) {
            var inputs = $('.time-panel input', this.panel),
                methods = ['getHours', 'getMinutes', 'getSeconds'];
            for (var i = 0, len = inputs.length; i < len; i++) {
                inputs[i].value = pullZero(date[methods[i]]());
            }
        }
    }
    Calendar.prototype.previousMonth = function () {
        navMonth.call(this, true);
    };
    Calendar.prototype.nextMonth = function () {
        navMonth.call(this);
    };
    function navMonth(isPrevious) {
        var that = this,
            yearAndMonth,
            date,
            newWrappers = $(buildWrapper.call(this, this.navNum));
        if (isPrevious) {
            yearAndMonth = this.getYearAndMonth($(".calendar-wrapper", this.panel)[0]);
            date = new Date(yearAndMonth[0], yearAndMonth[1] - 1, 1);
            if (this.time === 'month') {
                date.setFullYear(date.getFullYear() - this.navNum);
            } else {
                date.setMonth(date.getMonth() - this.navNum);
            }
            $('.calendar-container', this.panel).prepend(newWrappers).css({
                left: -(this.wrapperWidth * this.navNum) + 'px'
            });
            $('.calendar-container', this.panel).stop().animate({
                left: '0px'
            }, 300, 'linear', function () {
                var wrappers = $('.calendar-wrapper', that.panel),
                    elems = [],
                    i,
                    len;
                if (that.isBigRange) {
                    for (i = that.navNum, len = that.monthNum; i < len; i++) {
                        that.updateHeaderMonth(wrappers[i], undefined, undefined, i);
                    }
                } else {
                    i = that.monthNum;
                }
                for (len = wrappers.length; i < len; i++) {
                    elems.push(wrappers[i]);
                }
                $(elems).remove();
            });
        } else {
            var wrappers = $('.calendar-wrapper', this.panel);
            yearAndMonth = this.getYearAndMonth(wrappers[wrappers.length - 1]);
            date = new Date(yearAndMonth[0], yearAndMonth[1] - 1, 1);
            if (this.time === 'month') {
                date.setFullYear(date.getFullYear() + this.navNum);
            } else {
                date.setMonth(date.getMonth() + this.navNum);
            }
            $('.calendar-container', this.panel).append(newWrappers).css({
                left: -(wrappers.length - this.monthNum) * this.wrapperWidth + 'px'
            });
            $('.calendar-container', this.panel).stop().animate({
                left: -this.wrapperWidth * (wrappers.length - this.monthNum + this.navNum) + 'px'
            }, 300, 'linear', function () {
                var wrappers = $('.calendar-wrapper', that.panel),
                    elems = [];
                for (var i = 0, len = wrappers.length - that.monthNum; i < len; i++) {
                    elems.push(wrappers[i]);
                }
                if (that.isBigRange) {
                    var j = 0;
                    for (len = that.monthNum; i < len; i++) {
                        that.updateHeaderMonth(wrappers[i], undefined, undefined, j++);
                    }
                }
                $(elems).remove();
                $('.calendar-container', that.panel).css({
                    left: 0
                });
            });
        }
        if (this.isBigRange) {
            $('.calendar-year', newWrappers).on('change', function () {
                yearChanged.call(that, this);
            });
            $('.calendar-month', newWrappers).on('change', function () {
                monthChanged.call(that, this);
            });
        }
        update.call(this, date, newWrappers, !isPrevious);
    }
    /**
     * 农历节日：除夕、春节、元宵、端午、七夕、中秋 
     * 节气节日：清明
    **/
    var festivals = {
        // 2021
        "2021-2-11": "除夕",
        "2021-2-12": "春节",
        "2021-2-16": "元宵",
        "2021-4-4": "清明",
        "2021-6-14": "端午",
        "2021-8-14": "七夕",
        "2021-9-21": "中秋",
        // 2020
        "2020-1-24": "除夕",
        "2020-1-25": "春节",
        "2020-2-8": "元宵",
        "2020-4-4": "清明",
        "2020-6-25": "端午",
        "2020-8-25": "七夕",
        "2020-10-1": "中秋",
        // 2019
        "2019-2-4": "除夕",
        "2019-2-5": "春节",
        "2019-2-19": "元宵",
        "2019-4-5": "清明",
        "2019-6-7": "端午",
        "2019-8-7": "七夕",
        "2019-9-13": "中秋",
        // 2018
        "2018-2-15": "除夕",
        "2018-2-16": "春节",
        "2018-3-2": "元宵",
        "2018-4-5": "清明",
        "2018-6-18": "端午",
        "2018-8-17": "七夕",
        "2018-9-24": "中秋",
        // 2017
        "2017-1-27": "除夕",
        "2017-1-28": "春节",
        "2017-2-11": "元宵",
        "2017-4-4": "清明",
        "2017-5-30": "端午",
        "2017-8-28": "七夕",
        "2017-10-4": "中秋",
        // 2016
        "2016-2-7": "除夕",
        "2016-2-8": "春节",
        "2016-2-22": "元宵",
        "2016-4-4": "清明",
        "2016-6-9": "端午",
        "2016-8-9": "七夕",
        "2016-9-15": "中秋",
        //2015
        "2015-2-18": "除夕",
        "2015-2-19": "春节",
        "2015-3-5": "元宵",
        "2015-4-5": "清明",
        "2015-6-20": "端午",
        "2015-8-20": "七夕",
        "2015-9-27": "中秋",
        //2014
        "2014-1-30": "除夕",
        "2014-1-31": "春节",
        "2014-2-14": "元宵",
        "2014-4-5": "清明",
        "2014-6-2": "端午",
        "2014-8-2": "七夕",
        "2014-9-8": "中秋",
        //2013
        "2013-2-9": "除夕",
        "2013-2-10": "春节",
        "2013-2-24": "元宵",
        "2013-4-4": "清明",
        "2013-6-12": "端午",
        "2013-8-13": "七夕",
        "2013-9-19": "中秋"
    };
    // 其他节气和放假安排，提供接口，可以完成
    function getFestival(date) {
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            dateStr = festivals[year + "-" + month + "-" + day];
        if (dateStr) {
            return dateStr;
        }
        if (month === 1 && day === 1) {
            dateStr = "元旦";
        } else if (month === 2 && day === 14) {
            dateStr = "情人";
        } else if (month === 5 && day === 1) {
            dateStr = "五一";
        } else if (month === 6 && day === 1) {
            dateStr = "儿童";
        } else if (month === 10 && day === 1) {
            dateStr = "国庆";
        } else if (month === 12 && day === 25) {
            dateStr = "圣诞";
        }
        return dateStr;
    }
    function processMonth(td, date, data) {
        date = new Date(date);
        var tableCell = $(td);
        if (compareDate(date, this._.startDate) < 0 || compareDate(date, this._.endDate) > 0) {
            td.className = 'invalid-day';
        } else {
            td.className = '';
        }
        if (date.getFullYear() === this.today.getFullYear() && date.getMonth() === this.today.getMonth()) {
            if (!tableCell.hasClass("invalid-day")) {
                if (this.mode === "rangeTo") {
                    if (!this._.currentDate[1]) {
                        this._.currentDate[1] = new Date(date);
                        tableCell.addClass('to-day');
                    }
                } else {
                    if (!this._.currentDate[0]) {
                        this._.currentDate[0] = new Date(date);
                        tableCell.addClass('from-day');
                    }
                }
            }
        }
        if (typeof this._.buildContent === "function") {
            this._.buildContent(td, date, dateStr, data);
        }
        td.setAttribute("data-date", date.getFullYear() + '-' + (date.getMonth() + 1));
        var isGtFromDay = false;
        if (this._.currentDate[0]) {
            if (compareDate(date, this._.currentDate[0]) > 0) {
                isGtFromDay = true;
            } else if (compareDate(date, this._.currentDate[0]) === 0) {
                tableCell.addClass("from-day");
            }
        }
        if (this._.currentDate[1]) {
            if (compareDate(date, this._.currentDate[1]) < 0) {
                if (isGtFromDay) {
                    tableCell.addClass("range-day");
                }
            } else if (compareDate(date, this._.currentDate[1]) === 0) {
                tableCell.addClass("to-day");
            }
        }
    }
    function processDate(td, date, data) {
        var tableCell = $(td);
        if (compareDate(date, this._.startDate) < 0 || compareDate(date, this._.endDate) > 0) {
            tableCell.addClass("invalid-day");
        }
        var className,
            day = date.getDate(),
            dateStr = getFestival(date);
        if (dateStr) {
            className = "festival";
        }
        if (compareDate(date, this.today) === 0) {
            dateStr = "今天";
            className = "today";
            if (!tableCell.hasClass("invalid-day")) {
                if (this.mode === "rangeTo") {
                    if (!this._.currentDate[1]) {
                        this._.currentDate[1] = this.today;
                        tableCell.addClass('to-day');
                    }
                } else {
                    if (!this._.currentDate[0]) {
                        this._.currentDate[0] = this.today;
                        tableCell.addClass('from-day');
                    }
                }
            }

        }
        if (typeof this._.buildContent === "function") {
            this._.buildContent(td, date, dateStr, data);
        } else {
            // 使用类名d是，为了避免自定义的内容结构包含span标签，需要要重置样式
            td.innerHTML = '<span class="d">' + (dateStr ? dateStr : day) + '</span>';
        }
        td.setAttribute("data-date", dateToString(date));
        if (className) {
            tableCell.addClass(className);
        }
        var isGtFromDay = false;
        if (this._.currentDate[0]) {
            if (compareDate(date, this._.currentDate[0]) > 0) {
                isGtFromDay = true;
            } else if (compareDate(date, this._.currentDate[0]) === 0) {
                tableCell.addClass("from-day");
            }
        }
        if (this._.currentDate[1]) {
            if (compareDate(date, this._.currentDate[1]) < 0) {
                if (isGtFromDay) {
                    tableCell.addClass("range-day");
                }
            } else if (compareDate(date, this._.currentDate[1]) === 0) {
                tableCell.addClass("to-day");
            }
        }
    }
    function setClassName(td, date, className) {
        var dayClassName = this.dayClassNameMap[date.getDay() + ''],
            classNames = [];
        if (dayClassName) {
            classNames.push(dayClassName);
        }
        if (className) {
            classNames.push(className);
        }
        td.className = classNames.join(' ');
    }
    function updatePanel(wrapper, date, data) {
        if (this.time === 'month') {
            updateMonth.call(this, wrapper, date, data);
        } else {
            updateDate.call(this, wrapper, date, data);
        }
    }
    function updateMonth(wrapper, date, data) {
        var tds = $("td", wrapper);
        date = new Date(date);
        for (var i = 0, len = tds.length; i < len; i++) {
            processMonth.call(this, tds[i], date, data);
            date.setMonth(date.getMonth() + 1);
        }
    }
    function updateDate(wrapper, date, data) {
        var table = $("table", wrapper)[0],
            month = date.getMonth(),
            dayIndex,
            rowIndex = 1,
            td,
            date1 = new Date(date); // 处理上月数据用到的日期对象
        // 上月日期处理
        while (date1.getDay() !== this.firstDay) {
            date1.setDate(date1.getDate() - 1);
            td = table.rows[1].cells[(date1.getDay() - this.firstDay + 7) % 7];
            if (this.showOtherMonth) {
                setClassName.call(this, td, date1, "previous-month-day");
                processDate.call(this, td, date1, data);
            } else {
                td.innerHTML = "";
                setClassName.call(this, td, date1, "invalid-day");
            }
        }
        // 当月数据处理
        while (date.getMonth() === month) {
            dayIndex = (date.getDay() - this.firstDay + 7) % 7;
            td = table.rows[rowIndex].cells[dayIndex];
            setClassName.call(this, td, date);
            processDate.call(this, td, date, data);
            if (dayIndex === 6) {
                rowIndex++;
            }
            date.setDate(date.getDate() + 1);
        }
        // 下月日期处理
        while (rowIndex < 7) {
            dayIndex = (date.getDay() - this.firstDay + 7) % 7;
            td = table.rows[rowIndex].cells[dayIndex];
            if (this.showOtherMonth) {
                setClassName.call(this, td, date, "next-month-day");
                processDate.call(this, td, date, data);
            } else {
                td.innerHTML = "";
                setClassName.call(this, td, date, "invalid-day");
            }
            if (dayIndex === 6) {
                rowIndex++;
            }
            date.setDate(date.getDate() + 1);
        }
    }

    $.extend({
        Calendar: Calendar
    });
})();