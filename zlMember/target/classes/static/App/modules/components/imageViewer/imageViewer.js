(function() {
    var options = {
        // 图片地址参数
        images: [],
        isThumb: true,
        isPrint: false,
        onDelete: null
    };

    function ImageViewer(opts) {
        this.options = this.options || {};
        $.extend(this.options, options);
        $.extend(this.options, opts);
        //console.log(this.options)
        // this.init();
    }

    ImageViewer.prototype = {
        constructor: ImageViewer,
        presentIndex: 0,
        currentAngle: 0,
        zoomCount: 0,
        photoCount: 0,
        direction: 'level',
        template: {
            imagePage: '<div class="photo-layer-container">\
                            <div class="photo-bg-layer"></div>\
                            <div class="photo-figure">\
                                <div class="photo-figure-main">\
                                    <i class="fa fa-times-circle-o fa-3x photo-layer-close" title="close" aria-hidden="true"></i>\
                                    <div class="figure-area" id="pic-div">\
                                        <% if (images.length !== 1) { %>\
                                            <em class="pre-btn"></em>\
                                        <% } %>\
                                        <img id="img-display" src="<%=images[0].big%>" class="img-disp">\
                                        <% if (images.length !== 1) { %>\
                                            <em class="next-btn"></em>\
                                        <% } %>\
                                        <div id="js-img-border">\
                                            <img src="<%=images[0].big%>" class="foo" style="opacity: 0">\
                                        </div>\
                                    </div>\
                                    <div class="function-area clearfix">\
                                        <span><i class="current-index">1</i>/<i class="photo-count">11</i></span>\
                                        <ul>\
                                            <li class="zoom"><i class="fa fa-search-plus fa-2x" aria-hidden="true" title="放大"></i></li>\
                                            <li class="narrow"><i class="fa fa-search-minus fa-2x" aria-hidden="true" title="缩小"></i></li>\
                                            <li class="rotate-left"><i class="fa fa-undo fa-2x" aria-hidden="true" title="左旋转"></i></li>\
                                            <li class="rotate-right"><i class="fa fa-repeat fa-2x" aria-hidden="true" title="右旋转"></i></li>\
											<% if (isPrint) { %>\
												<li class="print"><i class="fa fa-print fa-2x" aria-hidden="true" title="打印"></i></li>\
											<% } %>\
                                            <% if (onDelete) { %>\
                                                <li class="delete"><i class="fa fa-trash-o fa-2x" aria-hidden="true" title="删除"></i></li>\
                                            <% } %>\
                                        </ul>\
                                    </div>\
                                    <% if (isThumb) { %>\
                                        <div class="thumb-area clearfix">\
                                            <span class="thumb-prev"></span>\
                                            <span class="thumb-next"></span>\
                                            <div class="thumbList-container">\
                                                <ul class="thumb-list clearfix">\
                                                    <% for (var i = 0; i < images.length; i++) { %>\
                                                        <% var image = images[i] %>\
                                                        <li><img src="<%=image.small%>"></li>\
                                                    <% } %>\
                                                </ul>\
                                            </div>\
                                        </div>\
                                    <% } %>\
                                </div>\
                            </div>\
                        </div>'
        },
        init: function() {
            this.render();
            this.setStyle();
            this.bindEvent();
        },
        render: function() {
            var imagePageTemplate = this.template.imagePage;
            this.$body = $("body");

            var renderFunc = _.template(imagePageTemplate),
                imagePageStr = renderFunc(this.options);
            this.$body.append(imagePageStr);

            this.$container = this.$body.find(".photo-layer-container");
            this.$bgLayer = this.$container.find(".photo-bg-layer");
            this.$photoFigure = this.$container.find(".photo-figure");
            this.$photoFigureMain = this.$photoFigure.find(".photo-figure-main");
            this.$closeBtn = this.$photoFigureMain.find(".photo-layer-close");
            this.$figureArea = this.$photoFigureMain.find(".figure-area");
            this.$functionArea = this.$photoFigureMain.find(".function-area");
            this.$currentIndex = this.$functionArea.find(".current-index");
            this.$photoCount = this.$functionArea.find(".photo-count");
            this.$rotateLeftBtn = this.$functionArea.find(".rotate-left");
            this.$rotateRightBtn = this.$functionArea.find(".rotate-right");
            this.$printBtn = this.$functionArea.find(".print");
            this.$deleteBtn = this.$functionArea.find(".delete");
            this.$zoomBtn = this.$functionArea.find(".zoom");
            this.$narrowBtn = this.$functionArea.find(".narrow");
            this.$thumbArea = this.$photoFigureMain.find(".thumb-area");
            this.$thumbPrev = this.$thumbArea.find(".thumb-prev");
            this.$thumbNext = this.$thumbArea.find(".thumb-next");
            this.$thumbListContainer = this.$thumbArea.find(".thumbList-container");
            this.$thumbList = this.$thumbListContainer.find(".thumb-list");
            this.$thumbItems = this.$thumbList.find("li");
            this.$imgContainer = this.$body.find(".img-container");
            this.$imgDisplay = this.$body.find("#img-display");
            this.$jsImg = this.$body.find("#js-img-border img");
            this.$preBtn = this.$container.find(".pre-btn");
            this.$nextBtn = this.$container.find(".next-btn");

            // 初始化图片数量
            this.photoCount = this.options.images.length;
            this.$photoCount.html(this.photoCount);

            // 初始化图片容器大小
            this.resizeHandler();

            this.scalePhoto();
            this.setPhotoMiddle();

            // this.$jsImg.hide();
        },
        setThumbArea: function() {
            var thumbListWidth = this.photoCount * 55,
                thumbListContainerWidth = this.$thumbListContainer.width();
            if (this.photoCount > 10) {
                if (this.presentIndex < 10) {
                    this.$thumbNext.css("display", "block");
                } else {
                    this.$thumbPrev.css("display", "block");
                }
            }
            this.$thumbList.css("width", thumbListWidth + "px");
        },
        drag: function() {
            //在固定div层拖动图片
            // debugger
            var ie = document.all;
            var nn6 = document.getElementById && !document.all;
            var isdrag = false;
            var y, x;
            var oDragObj;
            var originTop, originLeft;
            var isFirstDrag = true;

            //鼠标移动
            function moveMouse(e) {
                if (this.direction === "level") {
                    // 图片水平放置时的区域内拖拽
                    if (isdrag) {
                        var top = nn6 ? nTY + e.clientY - y : nTY + event.clientY - y,
                            left = nn6 ? nTX + e.clientX - x : nTX + event.clientX - x,
                            imgHeight = this.$imgDisplay.height(),
                            imgWidth = this.$imgDisplay.width(),
                            containerHeight = this.$figureArea.height(),
                            containerWidth = this.$figureArea.width();
                        if (nTY <= 0) {
                            if (top > 0) {
                                oDragObj.style.top = 0 + "px";
                            } else if (top < containerHeight - imgHeight) {
                                oDragObj.style.top = (containerHeight - imgHeight) + "px";
                            } else {
                                oDragObj.style.top = top + "px";
                            }
                        }

                        if (nTX <= 0) {
                            if (left > 0) {
                                oDragObj.style.left = 0 + "px";
                            } else if (left < containerWidth - imgWidth) {
                                oDragObj.style.left = (containerWidth - imgWidth) + "px";
                            } else {
                                oDragObj.style.left = left + "px";
                            }
                        }
                    }
                } else {
                    // 图片垂直放置时的区域内拖拽
                    if (isdrag) {
                        var top = nn6 ? nTY + e.clientY - y : nTY + event.clientY - y,
                            left = nn6 ? nTX + e.clientX - x : nTX + event.clientX - x,
                            imgHeight = this.$imgDisplay.height(),
                            imgWidth = this.$imgDisplay.width(),
                            containerHeight = this.$figureArea.height(),
                            containerWidth = this.$figureArea.width();
                        if (originLeft <= 0) {
                            if (top >= originTop - originLeft) {
                                oDragObj.style.top = (originTop - originLeft) + "px";
                            } else if (top <= originTop + originLeft) {
                                oDragObj.style.top = (originTop + originLeft) + "px";
                            } else {
                                oDragObj.style.top = top + "px";
                            }
                        }
                        if (originTop <= 0) {
                            if (left >= originLeft - originTop) {
                                oDragObj.style.left = (originLeft - originTop) + "px";
                            } else if (left <= originLeft + originTop) {
                                oDragObj.style.left = (originLeft + originTop) + "px";
                            } else {
                                oDragObj.style.left = left + "px";
                            }
                        }
                    }
                }
            }

            //鼠标按下才初始化
            function initDrag(e) {
                var oDragHandle = nn6 ? e.target : event.srcElement;
                var topElement = "HTML";
                while (oDragHandle.tagName != topElement && oDragHandle.className != "img-disp") {
                    oDragHandle = nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
                }
                if (oDragHandle.className == "img-disp") {
                    isdrag = true;
                    oDragObj = oDragHandle;
                    x = nn6 ? e.clientX : event.clientX; //指针距离左边的距离
                    y = nn6 ? e.clientY : event.clientY; //指针距离上边的距离
                    nTX = parseInt(oDragObj.style.left + 0); //left值
                    nTY = parseInt(oDragObj.style.top + 0); //top值
                    document.onmousemove = $.proxy(moveMouse, this);
                    if (isFirstDrag) {
                        originLeft = nTX;
                        originTop = nTY;
                        isFirstDrag = false;
                    }
                    return false;
                }
            }
            document.onmousedown = $.proxy(initDrag, this);
            document.onmouseup = function(e) {
                isdrag = false;
            };
        },
        setStyle: function() {
            this.hide();
        },
        bindEvent: function() {
            var that = this;
            $(window).resize(function(e) {
                that.resizeHandler();
                that.setPhotoMiddle();
            });

            that.$preBtn.on("click", function(e) {
                that.slidePrevious();
                that.scalePhoto();
                that.setPhotoMiddle();
            });
            that.$nextBtn.on("click", function(e) {
                that.slideNext();
                that.scalePhoto();
                that.setPhotoMiddle();
            });
            that.$thumbItems.on("click", function(e) {
                that.slideTo($(this).index());
                that.scalePhoto();
                that.setPhotoMiddle();
            });
            that.$closeBtn.on("click", function(e) {
                // that.hide();
                that.destory();
            });
            that.$rotateLeftBtn.on("click", function(e) {
                that.rotateLeft();
                that.setPhotoMiddle();
            });
            that.$rotateRightBtn.on("click", function(e) {
                that.rotateRight();
                that.setPhotoMiddle();
            });
            that.$narrowBtn.on("click", function(e) {
                that.zoom();
                if (that.zoomCount > 0) {
                    that.drag();
                } else {
                    document.onmousedown = null;
                    document.onmousemove = null;
                }
            });
            that.$zoomBtn.on("click", function(e) {
                that.zoom(true);
                if (that.zoomCount > 0) {
                    that.drag();
                } else {
                    document.onmousedown = null;
                    document.onmousemove = null;
                }
            });
            that.$printBtn.on("click", function(e) {
                var popup = window.open();
                var imgSrc = that.$imgDisplay[0].src;
                var imgTransform = that.$imgDisplay[0].style.transform;
                var htmlStr = '<html>\
								<title>打印</title>\
								<body style="margin:0">\
									<img src="' + imgSrc + '" onload="window.print();" style="transform: ' + imgTransform + '">\
								</body>\
								</html>';
                popup.document.write(htmlStr);
            });
            that.$deleteBtn.on("click", function(e) {
                var deleteConfirm = confirm("确定要删除吗"),
                    callback;
                if (deleteConfirm) {
                    callback = that.options.onDelete;
                    if (callback && typeof callback === "function") {
                        callback(that.presentIndex, that.options.images[that.presentIndex].id, $.proxy(that.deleteOption, that));
                    }
                }
            });
            that.$thumbNext.on("click", function(e) {
                that.$thumbList.css("transform", "translateX(-550px)");
                that.$thumbNext.css("display", "none");
                that.$thumbPrev.css("display", "block");
            });
            that.$thumbPrev.on("click", function(e) {
                that.$thumbList.css("transform", "");
                that.$thumbNext.css("display", "block");
                that.$thumbPrev.css("display", "none");
            });
        },
        deleteOption: function() {
            var that = this,
                $activeThumb = that.$thumbList.find('.active');;
            that.photoCount--;
            that.options.images.splice(that.presentIndex, 1); // 图片数组中删除当前值
            // debugger;
            if (that.presentIndex === that.photoCount) {
                that.presentIndex--;
                $activeThumb.prev().addClass('active');

                that.$imgDisplay[0].src = that.options.images[that.presentIndex].big;
                that.$jsImg[0].src = that.options.images[that.presentIndex].big;
            } else {
                $activeThumb.next().addClass('active');

                that.$imgDisplay[0].src = that.options.images[that.presentIndex].big;
                that.$jsImg[0].src = that.options.images[that.presentIndex].big;
            }
            that.paramReset();
            that.updatePageNum();
            $activeThumb.remove();

        },
        updatePageNum: function() {
            this.$photoCount.text(this.photoCount);
            this.$currentIndex.text(this.presentIndex + 1);
        },
        removeEvent: function() {

        },
        hide: function() {
            this.$thumbItems.eq(this.presentIndex).removeClass("active");
            this.$container.css("display", "none");
        },
        // index为需要显示的索引
        show: function(index) {
            var that = this;
            this.init();

            if (typeof index !== 'undefined') {
                this.presentIndex = index;
            }
            this.slideTo(this.presentIndex);
            this.setThumbArea();

            this.$thumbItems.eq(this.presentIndex).addClass("active");
            this.$container.css("display", "block");
            this.resizeHandler();
            // debugger;
            // 图片加载完毕执行，因为需要获取图片宽高
            this.$jsImg.load(function() {
                that.scalePhoto();
                that.setPhotoMiddle();
            });



        },
        slideTo: function(index) {
            // 删除元素后需要重新选取li元素
            this.$thumbList.find("li").eq(this.presentIndex).removeClass("active");
            this.presentIndex = index;
            this.$imgDisplay[0].src = this.options.images[this.presentIndex].big;
            this.$jsImg[0].src = this.options.images[this.presentIndex].big;
            this.$currentIndex.html(this.presentIndex + 1);
            this.$thumbList.find("li").eq(this.presentIndex).addClass("active");

            this.paramReset();
        },
        slideNext: function() {
            if (this.presentIndex === this.photoCount - 1) {
                alert("已经是最后一张了");
            } else {
                this.$thumbItems.eq(this.presentIndex).removeClass("active");
                this.presentIndex++;
                this.$imgDisplay[0].src = this.options.images[this.presentIndex].big;
                this.$jsImg[0].src = this.options.images[this.presentIndex].big;
                this.$currentIndex.html(this.presentIndex + 1);
                this.$thumbItems.eq(this.presentIndex).addClass("active");

                this.paramReset();
            }
        },
        slidePrevious: function() {
            if (this.presentIndex === 0) {
                alert("已经是第一张了");
            } else {
                this.$thumbItems.eq(this.presentIndex).removeClass("active");
                this.presentIndex--;
                this.$imgDisplay[0].src = this.options.images[this.presentIndex].big;
                this.$jsImg[0].src = this.options.images[this.presentIndex].big;
                this.$currentIndex.html(this.presentIndex + 1);
                this.$thumbItems.eq(this.presentIndex).addClass("active");

                this.paramReset();
            }
        },
        rotateLeft: function() {
            this.currentAngle -= 90;
            this.$imgDisplay.css("transform", "rotate(" + this.currentAngle + "deg)");
            if (this.currentAngle % 180 === 90) {
                this.direction = "vertical";
            } else {
                this.direction = "level";
            }
            this.scalePhoto(this.direction);
            document.onmousedown = null;
            document.onmousemove = null;
        },
        rotateRight: function() {
            this.currentAngle += 90;
            this.$imgDisplay.css("transform", "rotate(" + this.currentAngle + "deg)");
            if (this.currentAngle % 180 === 90) {
                this.direction = "vertical";
            } else {
                this.direction = "level";
            }
            this.scalePhoto(this.direction);
            document.onmousedown = null;
            document.onmousemove = null;
        },
        zoom: function(args) {
            var photoHeight = this.$imgDisplay.height(),
                photoWidth = this.$imgDisplay.width(),
                containerHeight = this.$figureArea.height(),
                containerWidth = this.$figureArea.width();
            if (args) {
                if (photoWidth > 1300) return;
                this.$imgDisplay.height(photoHeight = photoHeight * 1.5);
                this.$imgDisplay.width(photoWidth = photoWidth * 1.5);
                this.zoomCount++;
            } else {
                if (photoWidth < 500) return;
                this.$imgDisplay.height(photoHeight = photoHeight / 1.5);
                this.$imgDisplay.width(photoWidth = photoWidth / 1.5);
                this.zoomCount--;
            }
            this.setPhotoMiddle();

            // 当图片放大到超出容器大小时，出现拖拽效果
            if (photoHeight > containerHeight || photoWidth > containerWidth) {
                this.$figureArea.css("cursor", "move");
            } else {
                this.$figureArea.css("cursor", "");
            }
        },
        // 更近figureArea(大图容器)的高度
        resizeHandler: function() {
            // debugger;
            var mainHeight = this.$photoFigureMain.height(),
                figureHeight = mainHeight - 95;
            this.$figureArea.height(figureHeight);
        },
        // 根据原始图片的大小缩放图片进行显示
        scalePhoto: function() {
            // debugger
            var containerHeight = this.$figureArea.height(),
                containerWidth = this.$figureArea.width(),
                photoHeight = this.$jsImg.height(),
                photoWidth = this.$jsImg.width(),
                finalHeight, finalWidth;
            if (this.direction === "vertical") {
                if (photoWidth <= containerHeight && photoHeight <= containerWidth) {
                    finalWidth = photoWidth;
                    finalHeight = photoHeight;
                } else if (photoWidth <= containerHeight && photoHeight > containerWidth) {
                    finalHeight = containerWidth;
                    finalWidth = (containerWidth / photoHeight) * photoWidth;
                } else if (photoWidth > containerHeight && photoHeight <= containerWidth) {
                    finalWidth = containerHeight;
                    finalHeight = (containerHeight / photoWidth) * photoHeight;
                } else {
                    if (containerHeight / photoWidth < containerWidth / photoHeight) {
                        finalWidth = containerHeight;
                        finalHeight = (containerHeight / photoWidth) * photoHeight;
                    } else {
                        finalHeight = containerWidth;
                        finalWidth = (containerWidth / photoHeight) * photoWidth;
                    }
                }
            } else {
                if (photoHeight <= containerHeight && photoWidth <= containerWidth) {
                    finalWidth = photoWidth;
                    finalHeight = photoHeight;
                } else if (photoHeight <= containerHeight && photoWidth > containerWidth) {
                    finalWidth = containerWidth;
                    finalHeight = (containerWidth / photoWidth) * photoHeight;
                } else if (photoHeight > containerHeight && photoWidth <= containerWidth) {
                    finalHeight = containerHeight;
                    finalWidth = (containerHeight / photoHeight) * photoWidth;
                } else {
                    if (containerHeight / photoHeight < containerWidth / photoWidth) {
                        finalHeight = containerHeight;
                        finalWidth = (containerHeight / photoHeight) * photoWidth;
                    } else {
                        finalWidth = containerWidth;
                        finalHeight = (containerWidth / photoWidth) * photoHeight;
                    }
                }
            }
            this.$imgDisplay.height(finalHeight).width(finalWidth);
        },
        setPhotoMiddle: function() {
            var containerHeight = this.$figureArea.height(),
                containerWidth = this.$figureArea.width(),
                photoHeight = this.$imgDisplay.height(),
                photoWidth = this.$imgDisplay.width(),
                translateYLen = (containerHeight - photoHeight) / 2,
                translateXLen = (containerWidth - photoWidth) / 2;
            this.$imgDisplay.css("top", translateYLen);
            this.$imgDisplay.css("left", translateXLen)
        },
        /**
         * 当图片切换时，重置一些相关参数
         */
        paramReset: function() {
            // 重置旋转角度
            this.$imgDisplay.css("transform", "");
            this.currentAngle = 0;
            this.zoomCount = 0;
            document.onmousedown = null;
            document.onmousemove = null;
            this.$figureArea.css("cursor", "");
            this.direction = "level";
        },
        destory: function() {
            this.$container.remove();
        }
    };

    $.ImageViewer = function(opts) {
        return new ImageViewer(opts);
    }
})();
