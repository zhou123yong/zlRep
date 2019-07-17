(function () {
    /*
     * 自定义滚动条，目前只支持垂直方向的滚动
     * panel  {selector}  滚动条父元素选择器，这个元素包含且仅包含滚动的元素
     * speed  {number}  滚动的速度，默认值是24，也就是每次滚动24px
     * minHeight {number}  滚动条的指示块的最小高度，默认是8(px)，在滚动元素很高时使用
     * padding {number}  滚动条的指示块两端的留白，默认是3(px)
     * skin  {string}  如果默认的滚动条样式不能满足需求，可以提供皮肤名，生成滚动条的时候回提供类名：'scrollbar-' + skin
     */
    function Scrollbar(panel, param) {
        this.panel = $(panel);
        $.extend(this, param);
        build.call(this);
        init.call(this);
        this.update();
    }
    Scrollbar.prototype.speed = 24;
    Scrollbar.prototype.minHeight = 8;
    Scrollbar.prototype.padding = 3;
    function setRelative(elem) {
        if (elem.css('position') === 'static') {
            elem.css({
                position: 'relative',
                top: '0px'
            });
        }
    }
    function build() {
        setRelative(this.panel);
        setRelative(this.panel.children());
        this.panel.append('<div class="scrollbar' + (this.skin ? ' scrollbar-' + this.skin : '') + '" style="display: none; padding: ' + this.padding + 'px 0;">' +
            '<div><span style="padding: ' + (this.minHeight / 2) + 'px 0;"></span></div>' +
        '</div>');
    }
    function init() {
        var that = this;
        this.panel.on(typeof document.body.onmousewheel !== 'undefined' ? 'mousewheel' : 'DOMMouseScroll', function (e) {
            var delta = e.originalEvent.wheelDelta;
            if (typeof delta === 'undefined') {
                delta = -e.originalEvent.detail; // delta + 10
            }
            var elem = $(this),
                wrapper = elem.children().first(),
                wrapperTop = parseFloat(wrapper.css('top')),
                minTop;
            if (delta > 0) {
                if (wrapperTop === 0) {
                    return;
                }
                wrapperTop += that.speed;
            } else {
                minTop = elem.height() - wrapper.outerHeight();
                if (wrapperTop === minTop) {
                    return;
                }
                wrapperTop -= that.speed;
            }
            e.preventDefault();
            that.scrollTo(wrapperTop);
        });
        this.panel.children().last().on('mousedown', function (e) {
            var clientY = parseFloat($('span', that.panel.children().last()).css('top')) - e.clientY;
            $(document).on('mousemove.scrollBar', function (e) {
                that.scrollTo(-(clientY + e.clientY) * that.panel.children().first().outerHeight() / getUsedHeight.call(that));
                e.preventDefault();
            }).on('mouseup.scrollBar', function () {
                $(document).off('mousemove.scrollBar');
                $(document).off('mouseup.scrollBar');
            });
        });
    }
    function getUsedHeight() {
        var elem = this.panel;
        return elem.height() + parseFloat(elem.css('padding-top')) + parseFloat(elem.css('padding-bottom')) - this.minHeight - this.padding * 2;
    }
    Scrollbar.prototype.update = function () {
        var panelHeight = this.panel.height(),
            children = this.panel.children(),
            wrapperHeight = children.first().outerHeight(),
            scrollbar = children.last();
        if (wrapperHeight < panelHeight) {
            scrollbar.css({
                display: 'none'
            });
            return;
        }
        scrollbar.css({
            display: 'block'
        });
        $('span', scrollbar).css({
            height: panelHeight / wrapperHeight * getUsedHeight.call(this)
        });
        this.scrollTo(parseFloat(this.panel.css('top')));
    };
    Scrollbar.prototype.scrollTo = function(top) {
        var children = this.panel.children(),
            wrapper = children.first(),
            scrollbar = $('span', children.last()),
            minTop = this.panel.height() - wrapper.outerHeight();
        if (top > 0) {
            top = 0;
        } else if (top < minTop) {
            top = minTop; 
        } 
        wrapper.css({
            top: top
        });
        scrollbar.css({
            top:  -getUsedHeight.call(this) / wrapper.outerHeight() * top
        });
    };
    $.fn.scrollbar = function (param) {
        var scrollbarList = [];
        for (var i = 0, len = this.length; i < len; i++) {
            scrollbarList.push(new Scrollbar(this[i], param))
        }
        if (scrollbarList.length < 2) {
            return scrollbarList[0];
        } else {
            return scrollbarList;
        }
    };
})();
    // bindEvent: function() {
        // this.scrollBar.onmousedown = function(ev) {
        //     ev = ev || event;
        //     var disY = ev.clientY - this.offsetTop;
        //     document.onmousemove = function(ev) {
        //         ev = ev || event;
        //         that.top = ev.clientY - disY;
        //         that.fnScroll();
        //     };
        //     document.onmouseup = function() {
        //         document.onmouseup = document.onmousemove = null;
        //     };
        //     return false;
        // };

    // },
