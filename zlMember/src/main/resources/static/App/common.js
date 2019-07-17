$(function(){
    window.onresize = function () {
        if ( !$('.filter-wrapper').hasClass('open') ) {
            $('.filter-wrapper').css({
                'height': 34
            });
        } else {
            $('.filter-wrapper').css({
                'height': $( '.filter-wrapper ul').height()
            });
        }
    };
    $('.page-wrapper').delegate('a.more','click', function () {
        var $wrapper = $('.filter-wrapper');
        if ( $wrapper.hasClass('open') ) {
            $(this).html('更多 <i class="fa fa-angle-down"></i>');
            $wrapper.removeClass('open').css({
                'height': 34
            });
        } else {
            $(this).html('收起 <i class="fa fa-angle-up"></i>');
            $wrapper.addClass('open').css({
                'height': $( 'ul', $wrapper ).height()
            });
        }
    });

    var calObj = new $.Calendar({
        skin: 'white',
        isBigRange: true,
        monthNum:1,
        hasClear:false
    });
    var monthObj = new $.Calendar({
        skin: 'white',
        time: 'month',
        monthNum:1,
        hasClear:false
    })
    window.setStartDate = function (year, month, date) {
        $('#timeEnd').attr('data-start-date', year + '-' + month + '-' + date);
        $('.timeEnd').attr('data-start-date', year + '-' + month + '-' + date);
    }
    window.setEndDate = function (year, month, date) {
        $('#timeStart').attr('data-end-date', year + '-' + month + '-' + date);
        $('.timeStart').attr('data-end-date', year + '-' + month + '-' + date);
    }
    $('.page-wrapper').delegate('.time-ipt','focus', function () {
        var elem = $(this),
            options = {
                elem: this
            };
        options.startDate = elem.attr('data-start-date');
        if (!options.startDate) {
            options.startDate = undefined;
        }
        options.endDate = elem.attr('data-end-date');
        if (!options.endDate) {
            options.endDate = undefined;
        }
        var fnName = elem.attr('data-fn-name');
        if (fnName) {
            options.fn = window[fnName]
        }
        if (elem.attr('data-time') === 'month') {
            monthObj.pick(options);
        } else {
            calObj.pick(options);
        }
    });
})


angular.module('webApp').factory('commonService', [function () {
    return{
        //pdf预览
        openPdf : function(fileUrl){
            var pdfUrl = fileUrl;
            pdfUrl = encodeURIComponent(pdfUrl);
            window.open('pdf/find?pdfUrl='+pdfUrl);
        },
       //图片放大
       showAttach: function(a,i){
        var list = a.split(',');
        var attachmentList = [];
        var flag = true;
        var k = 0;
        list.forEach(function (m,index) {
            if(m.indexOf('.png') >= 0 || m.indexOf('.jpg') >=0 || m.indexOf('.jpeg') >=0 || m.indexOf('.gif') >=0 || m.indexOf('.bmp') >=0){
                attachmentList.push(m);
                if (i == index){
                    flag = false;
                    i -= k ;
                }
            } else {
                k += 1;
            }
        })
        // imgShow = true;
        var imageList = buildImageList(attachmentList);
        var imageViewer = $.ImageViewer({
            images: imageList,
            isThumb: false
        });
        imageViewer.show(i);
        },
        //
        leaf:function (c) {
            var param = c ;
            if(param.itemType.toLowerCase().indexOf('doc') >=0) {
                window.open(param.pdfServerUrl);
            }
            else if(param.itemType.toLowerCase().indexOf('pdf') >=0) {
                var pdfUrl = encodeURIComponent(param.pdfServerUrl);
                window.open('pdf/find?pdfUrl='+pdfUrl);
            }

            else  {
                var attachName = param.itemType.toLowerCase();
                if(attachName.indexOf('png') >= 0 || attachName.indexOf('jpg') >=0 || attachName.indexOf('jpeg') >=0 || attachName.indexOf('gif') >=0 || attachName.indexOf('bmp') >=0){
                    showImg(param.pdfServerUrl);
                }
                else {
                    Messenger().post("未知文件");
                    window.open(param.pdfServerUrl);
                }
            }
        }
    };
    function buildImageList(attachmentList) {
        var result = [];
        attachmentList.forEach(function(a){
            result.push({
                big: a
            });
        });
        return result;
    }

    var imgUrl = {};
    function showImg (c){
        // $scope.imgShow = true;
        imgUrl = c;
        var imageList = buildImageList(c);
        var imageViewer = $.ImageViewer({
            images: imageList,
            isThumb: false
        });
        function buildImageList(c) {
            var result = [];
            result.push({
                big: c
            });
            return result;
        }

        imageViewer.show(0);
    };
}])

