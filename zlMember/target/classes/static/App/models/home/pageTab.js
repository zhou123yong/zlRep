(function() {
    var $tabNav = $(".page-tab-nav"),
        $tabNavWrap = $tabNav.find("div"),
        $tabNavPrev = $tabNav.find(".page-tab-nav-previous"),
        $tabNavNext = $tabNav.find(".page-tab-nav-next"),
        $tabNavList = $tabNavWrap.find(".tab-nav-list"),
        $pageWrapper = $('.page-wrapper'),
        // $pageList = $pageWrapper.find("iframe"),
        $pageNavToolBar = $tabNav.find(".page-tab-nav-toolbar"),
        $tabRefresh = $pageNavToolBar.find(".tab-refresh"),
        $tabCloseAll = $pageNavToolBar.find(".tab-close-all"),
        $tabCloseOther = $pageNavToolBar.find(".tab-close-other"),
        $tabLocateActive = $pageNavToolBar.find(".tab-locate-active");
    var openTabUrls = [$.parseUrl($(".home-page").data("url")).hash],
        tabNavWrapWidth = $tabNav.width() - 151,
        tabNavWidth = 0,
        distanceX = 0;

    function open(url, text) {
        if (url.indexOf("javascript:;") != -1 || url.indexOf("javascript:void(0)") != -1 || url === '' || url === undefined) {
            return;
        }
        // url = $.parseUrl(url).href.split('#')[0]; // 使用完成的url来做关联，但不包括hash值
        var tabIndex = openTabUrls.indexOf(url);
        getActiveTab().removeClass("active");
        // getActivePage().removeClass("active");

        if (tabIndex === -1) {
            $tabNavList.append('<li data-url="' + url + '"class="active"><a href="' + url + '">' + text + '<i></i></a></li>');
            // $pageWrapper.append('<iframe class="active" src="' + url + '" data-url="' + url + '"></iframe>');
            openTabUrls.push(url);
            setTabNavbar();
        } else {
            getActiveTab().removeClass("active");
            $tabNavList.find("li").eq(tabIndex).addClass("active");
            // getActivePage().removeClass("active");
            // $pageWrapper.find("iframe").eq(tabIndex).addClass("active");
            locateActive();
        }
    }

    function setTabNavbar() {
        tabNavWidth = $tabNavList.width();
        //  .log(tabNavWidth);
        //  .log(tabNavWrapWidth);
        if (tabNavWidth - distanceX > tabNavWrapWidth) {
            $tabNavList.css({
                "transform": "translate(-" + (distanceX + 200) + "px)"
            });
            distanceX += 200;
        }
    }

    function setTabNavWrapWidth() {
        setTimeout(function(){
            tabNavWrapWidth = $tabNav.width() - 151;
        }, 150);

    }

    // url也可以是page-tab-nav-item
    function remove(e) {
        var $targetItem = $(e.target).closest("li"),
            $prevItem = $targetItem.prev(),
            $nextItem = $targetItem.next(),
            targetUrl = $targetItem.data("url"),
            prevUrl = $prevItem.data("url"),
            nextUrl = $nextItem.data("url"),
            // $targetPageItem = $pageWrapper.find('[data-url="' + targetUrl + '"]'),
            // $prevPageItem = $targetPageItem.prev(),
            // $nextPageItem = $targetPageItem.next(),
            targetIndex = openTabUrls.indexOf(targetUrl);

        // 删除标签以及对应的iframe
        openTabUrls.splice(targetIndex, 1);
        $targetItem.remove();
        // $targetPageItem.remove();

        if ($targetItem.hasClass("active")) {
            $prevItem.addClass("active");
            setTimeout(function () {
                history.go(-1);
            }, 0);
            locateActive();
        }
        // if ($targetPageItem.hasClass("active")) {
        //     if ($nextPageItem[0]) {
        //         $nextPageItem.addClass("active");
        //     } else if ($prevPageItem[0]) {
        //         $prevPageItem.addClass("active");
        //     }
        // }
    }
    // 但是保留第一个打开
    function removeAll(e) {
        $tabNavList.empty();
        $pageWrapper.empty();
        openTabUrls = [];
    }

    function removeOther(e) {
        var $activeTab = getActiveTab();
            // $activePage = getActivePage();
        $tabNavList.empty().append($activeTab);
        // $pageWrapper.empty().append($activePage);
        openTabUrls = [];
        openTabUrls.push($activeTab.data("url"));

    }
    // url是可选的，先active然后刷新
    function refresh(url) {
        var $activePage = getActivePage();
        if ($activePage[0]) {
            locateActive();
            $activePage[0].src = $activePage[0].src;
        }
    }

    // url是可选的
    function active(e) {}

    // 获取当前活动的tab
    function getActiveTab() {
        return $tabNavList.find(".active");
    }

    // 获取当前活动的iframe
    // function getActivePage() {
    //     return $pageWrapper.find(".active");
    // }

    function locateActive() {
        var $activeTab = getActiveTab(),
            currentDisX = $activeTab.width() + 16,
            tmp = 0;
        while ($activeTab.prev()[0]) {
            currentDisX += $activeTab.prev().width() + 16;
            $activeTab = $activeTab.prev();
        }
        tmp = currentDisX - tabNavWrapWidth;
        //  .log(currentDisX);
        if (tmp <= 0) {
            $tabNavList.css({
                "transform": "translate(0px)"
            });
            distanceX = 0;
        } else {
            tmp = Math.ceil(tmp / 200) * 200;
            //  .log(tmp);
            $tabNavList.css({
                "transform": "translate(-" + tmp + "px)"
            });
            distanceX = tmp;
        }
    }

    function bindEvent() {
        $tabNavList.delegate("i", "click", function(e) {
            e.stopPropagation();
            remove(e);
            return false;
        });

        // tab点击切换，同时切换iframe
        $tabNavList.delegate("li", "click", function(e) {
            getActiveTab().removeClass("active");
            $(this).addClass("active");
            // getActivePage().removeClass("active");
            //  .log($pageList.length);
            // $pageWrapper.find("iframe").eq($(this).index()).addClass("active");
            locateActive();
        });

        $tabRefresh.on("click", function(e) {
            refresh();
        });

        $tabCloseAll.on("click", function(e) {
            removeAll();
        });

        $tabLocateActive.on("click", function(e) {
            locateActive();
        });

        $tabCloseOther.on("click", function(e) {
            removeOther();
        });

        $tabNavPrev.on("click", function(e) {
            tabNavWidth = $tabNavList.width();
            if (tabNavWidth > tabNavWrapWidth && distanceX > 0) {
                $tabNavList.css({
                    "transform": "translate(-" + (distanceX - 200) + "px)"
                });
                distanceX -= 200;
            }
        });

        $tabNavNext.on("click", function(e) {
            tabNavWidth = $tabNavList.width();
            if (tabNavWidth > tabNavWrapWidth && distanceX < tabNavWidth - tabNavWrapWidth) {
                $tabNavList.css({
                    "transform": "translate(-" + (distanceX + 200) + "px)"
                });
                distanceX += 200;
            }
        });

        $(window).resize(function(e) {
            tabNavWrapWidth = $tabNav.width() - 151;
        });
    }

    function init() {
        bindEvent();
    }

    init();

    $.pageTab = {
        open: open,
        setTabNavWrapWidth: setTabNavWrapWidth
    };

})();
