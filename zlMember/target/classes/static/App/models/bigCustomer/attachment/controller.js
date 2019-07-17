/**
 * Created by xcx38035 on 2017/1/9.
 */
angular.module('webApp').controller('bigCustomerAttachmentController', ['$scope', '$rootScope', 'bigCustomerService', 'customerAddService','$location', function ($scope, $rootScope, bigCustomerService, customerAddService,$location) {

    $scope.$watch('da', function () {

        $scope.loadAttachment();

    });
    $scope.attachNext= true;
    $scope.customer  = bigCustomerService.customer;
    $scope.customerInfo = {};
    $scope.attach=[];
    $scope.loadAttachment = function ()     {
        if(bigCustomerService.customer!=""){
            $scope.customer = bigCustomerService.customer;

            if($scope.customer.customerAttachmentList!=null){
                $scope.customerAttachmentName=[];
                for(var i =0; i<$scope.customer.customerAttachmentList.length;i++){
                    $scope.customerAttachmentName.push($scope.customer.customerAttachmentList[i].attachmentTypeName);
                }
            }

        }

    };
    var loadCustomerAttachTypes = function () {
        var data = {"data": {"typeBelongsCatalog": "CUSTOMER_ATTACH_TYPE"}};
        customerAddService.loadTypeMaintenance(data).then(function (response) {
            $scope.attachTypes = response.data;

        })
    };
    loadCustomerAttachTypes();

    $scope.loadCurrentAttach = function (c) {
        $scope.currentAttach = c;
        $scope.currentAttach.attachmentTypeId = c.typeId;
        $scope.currentAttach.attachmentTypeName = c.typeName;
        $scope.currentAttach.attachName=[];
    };
    $scope.atta=[];
    $scope.uploadMultiFile = function (file) {
        var uploadUrl = "files/uploadMulti";
        $scope.atta=file.files;
        var attach =$scope.atta;
        if($scope.atta.length == 0){
            return;
        }
        for(var i = 0;i<$scope.atta.length;i++){
            if (attach[i].name.indexOf('.png') >= 0 || attach[i].name.indexOf('.jpg') >=0 || attach[i].name.indexOf('.jpeg') >=0 || attach[i].name.indexOf('.gif') >=0 || attach[i].name.indexOf('.bmp') >=0 || attach[i].name.indexOf('.pdf') >=0) {
                $scope.currentAttach.attachName.push($scope.atta[i].name);
            }else{
                $.alert("非法的图片格式，请上传正确的图片格式");
                return;
            }

        }
        $scope.reloadPicList(".attch-add",$(file).parents(".attch-add-upload").index(".attch-add-upload"),$scope.atta.length);
        customerAddService.uploadMultiFileToUrl(file.files, uploadUrl).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                $scope.currentAttach.attachmentInfo = response.data.join();
            } else {
                Messenger().post(response.errorMessage);
            }
        });
    };



    //调转
    $scope.nextStep = function () {
        if(bigCustomerService.customer.customerAttachmentList.length == 0){
            $.alert("请增加一条资质附件信息");
            return ;
        }
        bigCustomerService.signRelationAttachList = bigCustomerService.customer.customerAttachmentList;
        $('#bigCustomerTab li:eq(2) a').tab('show');
    };

    //上一步
    $scope.lastStep = function (){
        $('#bigCustomerTab li:eq(0) a').tab('show');
    };
    $scope.showAttach = false;
    $scope.showEdit = false;
    var count=0;
    $scope.addAttachment = function() {
        //$scope.attachNext= false;
        if(count%2==0){
            $scope.showAttach = true;
            $scope.attachNext= false;
            count++;
        }else{
            $scope.showAttach = false;
            $scope.attachNext= true;
            count--;
        }


        $("#attachType").select2();
    };

    $scope.delAttach = function(index){
        $scope.customer.customerAttachmentList.splice(index,1);
    };

    $scope.signRelationAttach =[];
    $scope.editAttach = function(index){
        $scope.reloadPicList('.attch-edit-upload',0,$scope.customer.customerAttachmentList[index].attachmentInfo.split(',').length);
        $scope.customer = bigCustomerService.customer;
        $scope.showEdit=true;
        $("#attachInfo").modal('show');
        $scope.signRelationAttach = angular.copy($scope.customer.customerAttachmentList[index]);
    };

    $scope.changeTimeType = function (typeId,value) {
        if(value == 0){
            $('#endTime'+typeId).hide();
            $('#timeEnd'+typeId).val('2120-01-01');
        } else {
            $('#endTime'+typeId).show();
            $('#timeEnd'+typeId).val('');
        }

    };

    /**
     * $scope.customerInfo 是新的资质 是从select ng-model="$scope.customerInfo" 绑定取值
     *
     */
    $scope.submitAttach = function(){

        $scope.customer = bigCustomerService.customer;
        var attachLength ;
        var attachNewLength;
        var attach = $scope.customer.customerAttachmentList;
        var attachNew = angular.copy($scope.customerInfo.customerAttachmentList);

        attachLength = attach.length;

        attachNewLength = attachNew.length;

        for(var i=0;i<attachNewLength;i++){
            attachNew[i].attachName = null;
            var attachmentTypeId = attachNew[i].attachmentTypeId;
            var attachmentTypeName = attachNew[i].attachmentTypeName;
            var flag=true;
            for(var j=0;j<attachLength;j++){
                if(attach[j].attachmentTypeId==attachNew[i].attachmentTypeId){
                    flag = false;
                    if(attachmentTypeName.indexOf('特批文件') >= 0){
                        var sTime = '1900-01-01',
                            eTime = '1900-01-01';
                    } else {
                        var sTime = $('#timeStart' + attachmentTypeId).val(),
                            eTime = $('#timeEnd' + attachmentTypeId).val();
                    }

                    function handler(attach, j, attachNew, i, sTime, eTime) {
                        $scope.reloadPicList('.attch-show',j,attachNew[i].attachmentInfo.split(',').length);
                        $scope.customer.customerAttachmentList[j].attachmentInfo = attachNew[i].attachmentInfo;
                        $scope.customer.customerAttachmentList[j].intelligenceStartTime = sTime;
                        $scope.customer.customerAttachmentList[j].intelligenceEndTime = eTime;
                        if(attach[j].attachmentInfo == undefined){
                            $.alert("请上传资质");
                            return;
                        }
                        if(attach[j].intelligenceStartTime == "" ){
                            $.alert("资质开始时间不能为空");
                            return;
                        }
                        if(attach[j].intelligenceEndTime == "" ){
                            $.alert("资质结束时间不能为空");
                            return;
                        }
                        if(attach[j].intelligenceStartTime > attach[j].intelligenceEndTime){
                            $.alert("资质结束时间必须大于开始时间");
                            return;
                        }
                    }

                    (function(attach, j, attachNew, i, sTime, eTime, fn) {
                        $.confirm("已有该资质，是否确定替换？", {
                            okFn: function() {
                                fn(attach, j, attachNew, i, sTime, eTime);
                                $scope.$apply();
                            }
                        });
                    })(attach, j, attachNew, i, sTime, eTime, handler);
                }
            }


            if(flag){
                if(attachNew[i].attachmentInfo == undefined){
                    $.alert("请上传资质");
                    return;
                }
                if(attachNew[i].attachmentTypeName.indexOf('特批文件') >= 0){
                    attachNew[i].intelligenceStartTime = '1900-01-01';
                    attachNew[i].intelligenceEndTime = '1900-01-01';
                } else {
                    attachNew[i].intelligenceStartTime = $('#timeStart' + attachmentTypeId).val();
                    attachNew[i].intelligenceEndTime = $('#timeEnd' + attachmentTypeId).val();
                }
                if(attachNew[i].intelligenceStartTime == "" ){
                    $.alert("资质开始时间不能为空");
                    return;
                }
                if(attachNew[i].intelligenceEndTime == "" ){
                    $.alert("资质结束时间不能为空");
                    return;
                }
                if(attachNew[i].intelligenceStartTime > attachNew[i].intelligenceEndTime){
                    $.alert("资质结束时间必须大于开始时间");
                    return;
                }
                attach.push(attachNew[i]);
            }
        }
        $scope.showAttach = false;
        count=0;
        $scope.customerInfo.customerAttachmentList = null;
        $scope.attachNext= true;
    };

    $scope.cancelSubmit = function(){
        $scope.showAttach = false;
        $scope.attachNext= true;
        count=0;
        $scope.customerInfo.customerAttachmentList = null;
    };

    $scope.edit = function(){

        $scope.customer = bigCustomerService.customer;
        var attachLength ;

        var attach = $scope.customer.customerAttachmentList;
        var attachNew = $scope.signRelationAttach;

        if(attach!=undefined && attach.length>0){
            attachLength = attach.length;
        }


        for(var j=0;j<attachLength;j++){
            var attachmentTypeId = attachNew.attachmentTypeId;
            if(attach[j].attachmentTypeId==attachNew.attachmentTypeId){
                var startTime =  $('#timeStart' + attachmentTypeId).val();
                var endTime = $('#timeEnd' + attachmentTypeId).val();
                if(startTime > endTime) {
                    $.alert("资质结束时间必须大于开始时间");
                    return;
                }
                $scope.reloadPicList('.attch-show',j,attachNew.attachmentInfo.split(",").length);
                attach[j].attachmentInfo=attachNew.attachmentInfo;
                attach[j].intelligenceStartTime = startTime;
                attach[j].intelligenceEndTime = endTime;
            }
        }
        $("#attachInfo").modal('hide');
    };

    $scope.loadEditAttach = function (){
        // $scope.signRelationAttach.attachName  = [];
        // $scope.signRelationAttach.attachmentInfo  = [];
        $(".attch-reload input[type='file']").val('');
    };

    //编辑重新上传图片
    $scope.EditUploadMultiFile = function (file) {
        var uploadUrl = "files/uploadMulti";
        $scope.atta=file.files;
        var attach =$scope.atta;
        if($scope.atta.length == 0){
            return;
        }
        $scope.signRelationAttach.attachName  = [];
        $scope.signRelationAttach.attachmentInfo  = [];
        for(var i = 0;i<$scope.atta.length;i++){
            if (attach[i].name.indexOf('.png') >= 0 || attach[i].name.indexOf('.jpg') >=0 || attach[i].name.indexOf('.jpeg') >=0 || attach[i].name.indexOf('.gif') >=0 || attach[i].name.indexOf('.bmp') >=0 || attach[i].name.indexOf('.pdf') >=0) {
                $scope.signRelationAttach.attachName.push($scope.atta[i].name);
            }else{
                $.alert("非法的图片格式，请上传正确的图片格式");
                return;
            }

        }
        $scope.reloadPicList('.attch-edit-upload',0,$scope.atta.length);
        customerAddService.uploadMultiFileToUrl(file.files, uploadUrl).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                $scope.signRelationAttach.attachmentInfo = response.data.join();
            } else {
                Messenger().post(response.errorMessage);
            }
        });
    };

    $scope.openPdf = function(fileUrl){
        var pdfUrl = fileUrl;
        pdfUrl = encodeURIComponent(pdfUrl);
        window.open('pdf/find?pdfUrl='+pdfUrl);
    };

    $scope.showAttachInfo = function(a,i){
        var list = a.split(',');
        var attachmentList = [];
        var k = 0;
        list.forEach(function (m,index) {
            if(m.indexOf('.png') >= 0 || m.indexOf('.jpg') >=0 || m.indexOf('.jpeg') >=0 || m.indexOf('.gif') >=0 || m.indexOf('.bmp') >=0){
                attachmentList.push(m);
                if (i == index){
                    i -= k ;
                }
            }
            else {
                k += 1;
            }
        })
        $scope.imgShow = true;
        var imageList = buildImageList(attachmentList);
        var imageViewer = $.ImageViewer({
            images: imageList,
            isThumb: false
        });
        function buildImageList(attachmentList) {
            var result = [];
            attachmentList.forEach(function(a){
                result.push({
                    big: a
                });
            });

            return result;
        }

        imageViewer.show(i);
    };

    /*下一页图片*/
    var show_img_flag = true;
    $scope.nextpic = function ($event) {
        var parentsDiv = $($event.target).parents(".pic_parent_div");
        //获取图片数量
        var picCount = parentsDiv.find(".one-line2").length;
        //展示出来的总宽度
        var show_with = parentsDiv.find(".pic_fixed_width").width();
        //获取单个图片宽度(包含margin宽度)
        var img_with = parentsDiv.find(".one-line2 img").outerWidth(true);
        //计算显示图片的个数
        var img_count = Math.floor(show_with/img_with);
        //单次移动大小 move_number
        var move_number = show_with;
        if(show_img_flag && picCount>img_count){
            show_img_flag = false;
            var $picDiv=parentsDiv.find(".pic_float_lists");
            //图片总长度totalLength
            var totalLength = picCount * img_with;
            //图片相对与父元素偏左位置
            var pic_lists_left =$picDiv.position().left;
            if(totalLength - Math.abs(pic_lists_left)>move_number){
                $picDiv.stop().animate({left:'-'+(move_number+ Math.abs(pic_lists_left))+'px'},"normal",function () {
                    show_img_flag = true;
                    parentsDiv.find(".btn_div_point_left").attr("src","App/modules/imgs/left_black.png");
                    if( totalLength - Math.abs(pic_lists_left)<= move_number * 2){
                        $($event.target).attr("src","App/modules/imgs/right_gray.png");;
                    }

                });
            }else{
                show_img_flag = true;
            }
        }

    }
    /*上一页图片*/
    $scope.prevpic = function ($event) {
        var parentsDiv = $($event.target).parents(".pic_parent_div");
        //获取图片数量
        // var picCount = $($event.target).parent(".pic_parent_div").find(".one-line2").length;
        //展示出来的总宽度
        var show_with = parentsDiv.find(".pic_fixed_width").width();
        var move_number = show_with;
        if(show_img_flag){
            show_img_flag = false;
            var $picDiv=parentsDiv.find(".pic_float_lists");
            var pic_lists_left =$picDiv.position().left;
            if(pic_lists_left<0){
                $picDiv.stop().animate({left:(pic_lists_left+move_number)+ 'px'}, "normal",function () {
                    show_img_flag = true;
                    parentsDiv.find(".btn_div_point_right").attr("src","App/modules/imgs/right_black.png");
                    if(pic_lists_left == -move_number){
                        $($event.target).attr("src","App/modules/imgs/left_gray.png");
                    }
                });
            }else {
                show_img_flag = true;
            }
        }
    }

    $scope.reloadPicList = function (className,index,size) {
        $(className +" .pic_float_lists").eq(index).animate({left: '0px'}, "normal");
        $(className +" .btn_div_point_left").eq(index).attr("src","App/modules/imgs/left_gray.png");
        if(size>2){
            $(className +" .btn_div_point_right").eq(index).attr("src","App/modules/imgs/right_black.png");
        }else{
            $(className +" .btn_div_point_right").eq(index).attr("src","App/modules/imgs/right_gray.png");
        }
    }


}]);