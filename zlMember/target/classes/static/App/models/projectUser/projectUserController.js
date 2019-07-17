/**
 * Created by zy38036 on 2016/8/16.
 */
angular.module('webApp').controller('projectUserController', ['$scope', 'projectUserService', 'FileUploader', '$location', function ($scope, projectUserService, FileUploader, $location) {

    $scope.page = {
        pageNumber: 1,
        pageSize: 8
    };


    $scope.searchUser = {
        name: "",
        userNo: ""
    };

    $scope.onPageChange = function () {
        $scope.page.pageNumber = $scope.currentPage;
        $scope.getZlUserInfo();
    };

    $scope.getZlUserInfo = function () {
        var data = {
            "pageNumber": $scope.page.pageNumber,
            "pageSize": $scope.page.pageSize,
            "data": {
                "mobile": $scope.searchUser.mobile,
                "userName": $scope.searchUser.name
            }
        };
        projectUserService.getZlUserInfo(data).then(function (response) {
            if (response.data) {
                $scope.projectUserBasicInfo = response.data.list;
                $scope.pageCount = response.data.pages;
                $scope.pageTotal = response.data.total;
            } else {
                $scope.projectUserBasicInfo = [];
                $scope.pageCount = 0;
                $scope.pageTotal = 0;
            }
        });
    };

    $scope.getZlUserInfo();

    $scope.$watch('searchUser.mobile', function (newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.getZlUserInfo();
        }
    });
    $scope.$watch('searchUser.name', function (newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.getZlUserInfo();
        }
    });

    $scope.openAddUser = function () {
        $("#addUser").modal('show');
        $('[data-toggle="tooltip"]').tooltip();
    };

    $scope.backAdd = function () {
        $("#addUser").modal('hide');
    };

    //添加用户
    $scope.addUser = function () {
        debugger;
        var birthDate = $("#birthDate").val();
        if ($scope.user.userName == null || $scope.user.userName == '') {
            $.alert("请填写会员姓名");
            return;
        }
        if ($scope.user.mobile == null || $scope.user.mobile == '') {
            $.alert("请填写会员手机号");
            return;
        }
        if ($scope.user.price == null || $scope.user.price == '') {
            $.alert("请填写衣服价格");
            return;
        }
        if ($scope.user.sex == null || $scope.user.sex == '') {
            $.alert("请选择会员性别");
            return;
        }
        if (birthDate == null || birthDate == '') {
            $.alert("请填写会员生日");
            return;
        }
        var data = {
            "data": {
                "userName": $scope.user.userName,
                "mobile": $scope.user.mobile,
                "price": $scope.user.price,
                "sex": $scope.user.sex,
                "birthDate": birthDate
            }
        };
        projectUserService.saveUser(data).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                Messenger().post("添加成功！");
                $scope.getZlUserInfo();
                $("#addUser").modal('hide');
            } else {
                Messenger().post(response.errorMessage);
                $("#addUser").modal('hide');
            }
        });
    };

    //修改用户模块
    $scope.openModifyModal = function (p) {
        $("#modifyUser").modal('show');
        $scope.modifyUser = p;
        if ($scope.modifyUser.sex == '0') {
            $scope.sex = '女';
        } else if ($scope.modifyUser.sex == '1') {
            $scope.sex = '男';
        }
    };
    $scope.closeModifyModal = function () {
        $("#modifyUser").modal('hide');
    };

    //修改用户
    $scope.modifyUserSubmit = function () {
        debugger;
        if ($scope.modifyUser.userName == null || $scope.modifyUser.userName == '') {
            $.alert("请填写会员姓名");
            return;
        }
        if ($scope.modifyUser.mobile == null || $scope.modifyUser.mobile == '') {
            $.alert("请填写会员手机号");
            return;
        }
        // if($scope.modifyUser.price == null || $scope.modifyUser.price == ''){
        //     $.alert("请填写衣服价格");
        //     return;
        // }
        var data = {
            "data": {
                "id": $scope.modifyUser.id,
                "userName": $scope.modifyUser.userName,
                "mobile": $scope.modifyUser.mobile,
                "price": $scope.modifyUser.price,
            }
        };
        projectUserService.updateUser(data).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                Messenger().post("修改成功！");
                $scope.getZlUserInfo();
                $("#modifyUser").modal('hide');
            } else {
                Messenger().post(response.errorMessage);
                $("#modifyUser").modal('hide');
            }
        });
    };

    //删除模块
    $scope.delZlUser = function (id) {
        $.confirm('确定要删除吗?', {
            okFn: function () {
                if (id == null) {
                    Messenger().post("不能为空！");
                } else {
                    projectUserService.delZlUser(id).then(function (response) {
                        if (response.status == SUCCESS_CODE) {
                            Messenger().post("删除成功！");
                            $scope.getZlUserInfo();
                        } else {
                            Messenger().post("删除失败！");
                        }
                    });
                }
            },
            cancelFn: function () {
            }
        });
    };

    $scope.openAddClothes = function (p) {
        $("#addClothes").modal('show');
        $scope.oldUser = p;
        if ($scope.oldUser.sex == '0') {
            $scope.oldSex = '女';
        } else if ($scope.oldUser.sex == '1') {
            $scope.oldSex = '男';
        }
    };

    $scope.backAddClothes = function () {
        $("#addClothes").modal('hide');
    };

    $scope.buyClothes = function () {
        debugger;
        if ($scope.newUser.price == null || $scope.newUser.price == '') {
            $.alert("请填写衣服价格");
            return;
        }
        var data = {
            "data": {
                "id": $scope.oldUser.id,
                "price": $scope.newUser.price,
            }
        };
        projectUserService.buyClothes(data).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                Messenger().post("操作成功！");
                $scope.getZlUserInfo();
                $("#addClothes").modal('hide');
            } else {
                Messenger().post(response.errorMessage);
                $("#addClothes").modal('hide');
            }
        });
    };

    // 初始化Web Uploader
    var uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf: './App/modules/bower_components/webuploader/Uploader.swf',

        // 文件接收服务端。
        // server: 'http://webuploader.duapp.com/server/fileupload.php',
        server: '/zlMember/upload/uploadFile',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    var $list = $("#fileList");
    uploader.on('fileQueued', function (file) {
        debugger;
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info">' + file.name + '</div>' +
                '</div>'
            ),
            $img = $li.find('img');

        // $list为容器jQuery实例
        $list.append($li);

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        console.log(uploader)
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, 100, 100);
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        debugger;
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                .appendTo($li)
                .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
        debugger;
        var $li = $('#' + file.id),
            $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });


    // angular上传文件
    // var uploader = $scope.uploader = new FileUploader({
    //     url: 'upload/uploadFile',
    //     autoUpload: true
    // });
    //
    // // FILTERS
    // uploader.filters.push({
    //     name: 'customFilter',
    //     fn: function (item /*{File|FileLikeObject}*/, options) {
    //         return this.queue.length < 100;
    //     }
    // });
    //
    // uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
    // };
    // uploader.onAfterAddingFile = function (fileItem) {
    // };
    // uploader.onAfterAddingAll = function (addedFileItems) {
    // };
    // uploader.onBeforeUploadItem = function (item) {
    // };
    // uploader.onProgressItem = function (fileItem, progress) {
    // };
    // uploader.onProgressAll = function (progress) {
    // };
    // uploader.onSuccessItem = function (fileItem, response, status, headers) {
    //     $scope.list = [];
    //     $scope.list = response.data;
    //     fileItem.contractFile = response.data[0];
    //     if (response.data[0].pdfServerUrl != null && !response.data[0].pdfServerUrl == "") {
    //         fileItem.pdfServerUrl = response.data[0].pdfServerUrl;
    //     } else {
    //         fileItem.pdfServerUrl = response.data[0].serverurl;
    //     }
    //
    //     var fileName = response.data[0].fileName.toLowerCase();
    //
    //
    //     if (fileName.indexOf('.doc') >= 0 || fileName.indexOf('.pdf') >= 0 || fileName.indexOf('.xls') >= 0 || fileName.indexOf('.jpg') >= 0 || fileName.indexOf('.ppt') >= 0
    //         || fileName.indexOf('.txt') >= 0 || fileName.indexOf('.rtf') >= 0 || fileName.indexOf('.tif') >= 0) {
    //
    //     } else {
    //         $.alert("不正确的文件格式，请上传正确的文件格式，如doc,pdf,xls,jpg,ppt,txt,rtf,tif");
    //         fileItem.remove();
    //         return false;
    //     }
    //
    //     for (var i = 0; i < $scope.uploader.queue.length; i++) {
    //         if ($scope.uploader.queue[i].contractFile != undefined && response.data[0].fileName == $scope.uploader.queue[i].contractFile.fileName) {
    //             if (fileName.indexOf('.png') >= 0) {
    //                 $scope.uploader.queue[i].itemType = "png";
    //             }
    //             else if (fileName.indexOf('.jpg') >= 0) {
    //                 $scope.uploader.queue[i].itemType = "jpg";
    //             }
    //             else if (fileName.indexOf('.pdf') >= 0) {
    //                 $scope.uploader.queue[i].itemType = "pdf";
    //             }
    //             else if (fileName.indexOf('.docx') >= 0) {
    //                 $scope.uploader.queue[i].itemType = "docx";
    //             }
    //             else if (fileName.indexOf('.doc') >= 0) {
    //                 $scope.uploader.queue[i].itemType = "doc";
    //             }
    //             else {
    //                 $scope.uploader.queue[i].itemType = "word";
    //             }
    //         }
    //     }
    // };
    // uploader.onErrorItem = function (fileItem, response, status, headers) {
    // };
    // uploader.onCancelItem = function (fileItem, response, status, headers) {
    // };
    // uploader.onCompleteItem = function (fileItem, response, status, headers) {
    // };
    // uploader.onCompleteAll = function () {
    // };

}]);

