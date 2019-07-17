$(function () {
	function resetSubmenuStyle(fn) {
		$(this).css({
			display: '',
			height: '',
			transition: ''
		}).off('transitionend');
		if (typeof fn === 'function') {
			fn();
		}
	}
	function toggleSubmenu(fn) {
		var heightChange = 0,
			elem = $(this.parentNode);
		var submenu = $(this).next();
		if (submenu.length === 0) {
			if (elem.parents('.page-nav').length !== 0) {
				$('.page-nav .current').removeClass('current active');
				elem.addClass('current active');
			} else {
				$('.menubar-popup .current').removeClass('current');
				elem.addClass('current');
				$('.page-nav .current').removeClass('current');
				if (elem.is('h2')) {
					currentFirstLevel.addClass('current');
				} else {
					$('> ul', currentFirstLevel).replaceWith($('.menubar-popup > ul').clone());
					// 更优解决方案是对比查找
				}

			}
			elem = $('a', elem);
			$.pageTab.open(elem.attr('href'), elem.text());
			// 打开页面的功能
			return heightChange;
		}
		if (elem.hasClass('active')) {
			heightChange = -submenu.outerHeight();
			submenu.css({
				display: 'block',
				height: -heightChange + 'px',
				transition: 'height .24s linear'
			});
			elem.removeClass('active');
			requestAnimationFrame(function () {
				submenu.on('transitionend', function () {
					resetSubmenuStyle.call(this, fn);
				}).css({
					height: '0px'
				});
			});
		} else {
			var activeMenu = elem.siblings('.active');
			if (activeMenu.length !== 0) {
				heightChange = toggleSubmenu.call(activeMenu.children()[0]);
			}
			submenu.css({
				display: 'block',
				height: '0px',
				transition: 'height .24s linear'
			});
			elem.addClass('active');
			var menuItems = $('li', submenu),
				totalHeight = 0;
			for (var i = 0, len = menuItems.length; i < len; i++) {
				totalHeight += menuItems.eq(i).outerHeight();
			}
			requestAnimationFrame(function () {
				submenu.on('transitionend', function () {
					resetSubmenuStyle.call(this, fn);
				}).css({
					height: totalHeight + 'px'
				});
			});
			heightChange += totalHeight;
		}
		return heightChange;
	}
	// 打开当前页面的功能
	$('body').on('click', '.page-nav-wrapper .menubar-first-level > li > a, .page-nav-wrapper .menubar-second-level > li > a, .page-nav-wrapper .menubar-third-level > li > a', function (e) {
		// e.preventDefault();
		if ($(this.parentNode.parentNode).hasClass('menubar-first-level') && $(document.body).hasClass('page-nav-mini')) {
			return;
		}
		if (toggleSubmenu.call(this, function () {
				pageNavScrollbar.update();
			}));
	});
	function getListTotalHeight(li) {
		var totalHeight = 0,
			ulElem = $('> ul', li);
		if (ulElem.length === 0) {
			return totalHeight;
		}
		var listElems = $('> li', ulElem);
		for (var i = 0, len = listElems.length; i < len; i++) {
			totalHeight += listElems.eq(i).height() + getListTotalHeight(listElems[i]);
		}
		return totalHeight;
	}
	var menubarPopupTimer,
		currentFirstLevel;
	$('body').on('mouseenter', '.page-nav .menubar-first-level > li:not(#liHome)', function (e) {
		if (!$(document.body).hasClass('page-nav-mini')) {
			return;
		}
		if (menubarPopupTimer) {
			clearTimeout(menubarPopupTimer);
		}
		if (currentFirstLevel && currentFirstLevel[0] === this) {
			return;
		}
		var menubarPopup = $('.menubar-popup');
		currentFirstLevel = $(this);
		if (menubarPopup.length === 0) {
			menubarPopup = $('<div class="menubar-popup"><i></i><h2></h2></div>').appendTo(document.body);

			menubarPopup.hover(function () {
				if (menubarPopupTimer) {
					clearTimeout(menubarPopupTimer);
				}
			}, function () {
				menubarPopupTimer = setTimeout(function () {
					$('.menubar-popup').css({
						display: 'none'
					});
					currentFirstLevel = undefined;
				}, 100);
			});
			menubarPopup.on('h2 > a, .menubar-second-level > li > a, .menubar-third-level > li > a', 'click', function (e) {
				// e.preventDefault();
				var height = menubarPopup.outerHeight() + toggleSubmenu.call(this);
				var elemOffset = currentFirstLevel.offset(),
					diffHeight = height + elemOffset.top + 1 - $(window).height();
				if (diffHeight > 0) {
					menubarPopup.css({
						top: elemOffset.top + 1 - diffHeight
					});
					$('i', menubarPopup).css({
						top: 10 + diffHeight
					});
				} else {
					menubarPopup.css({
						top: elemOffset.top + 1
					});
					$('i', menubarPopup).css({
						top: 10
					});
				}

			});
		}
		var menuItem = $(' > a', this).clone();
		$('i, em', menuItem).remove();
		if (currentFirstLevel.hasClass('current')) {
			$('h2', menubarPopup).addClass('current').html(menuItem);
		} else {
			$('h2', menubarPopup).removeClass('current').html(menuItem);
		}
		if ($('>ul', this).length === 0) {
			menubarPopup.addClass('single-level');
		} else {
			menubarPopup.removeClass('single-level');
		}
		if ($('.menubar-second-level', menubarPopup).length) {
			$('.menubar-second-level', menubarPopup).replaceWith($('.menubar-second-level', this).clone());
		} else {
			menubarPopup.append($('.menubar-second-level', this).clone());
		}
		var elemOffset = $(this).offset();
		menubarPopup.css({
			display: 'block',
			top: elemOffset.top + 1,
			left: elemOffset.left + elemOffset.width
		});
		// console.log(getListTotalHeight(menubarPopup));
		var windowHeight = $(window).height(),
			diffHeight = menubarPopup.outerHeight() + elemOffset.top + 1 - windowHeight;
		if (diffHeight > 0) {
			menubarPopup.css({
				top: elemOffset.top + 1 - diffHeight
			});
			$('i', menubarPopup).css({
				top: 10 + diffHeight
			});
		} else {
			$('i', menubarPopup).css({
				top: 10
			});
		}
	}).on('mouseleave', '.page-nav .menubar-first-level', function (e) {
		menubarPopupTimer = setTimeout(function () {
			$('.menubar-popup').css({
				display: 'none'
			});
			currentFirstLevel = undefined;
		}, 100);
	}).on('mouseenter', '.page-nav .menubar-first-level > li#liHome', function() {
		menubarPopupTimer = setTimeout(function () {
			$('.menubar-popup').css({
				display: 'none'
			});
			currentFirstLevel = undefined;
		}, 100);
	});


	var pageNavScrollbar = $('.page-nav').scrollbar();

	$(window).on('resize', function () {
		pageNavScrollbar.update();
	});

	$('body').on('click', '.switch1', function () {
		$(document.body).toggleClass('page-nav-mini');
		$.pageTab.setTabNavWrapWidth();
		pageNavScrollbar.update();
	});
});