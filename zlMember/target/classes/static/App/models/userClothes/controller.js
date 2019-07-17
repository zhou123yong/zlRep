/**
 * Created by Administrator on 2019/4/12.
 */
angular.module('webApp').controller('controller', ['$scope', 'service', '$location', function ($scope, service, $location) {

    $scope.page = {
        pageNumber: 1,
        pageSize: 8
    };

    $scope.searchUser = {
        name: ""
    };

    $scope.onPageChange = function () {
        $scope.page.pageNumber = $scope.currentPage;
        $scope.getClothesInfo();
    };

    $scope.getClothesInfo = function () {
        var data = {
            "pageNumber": $scope.page.pageNumber,
            "pageSize": $scope.page.pageSize,
            "data": {
                "userName": $scope.searchUser.name
            }
        };
        service.getClothesInfo(data).then(function (response) {
            debugger;
            if(response.data) {
                $scope.clothesList = response.data.list;
                $scope.pageCount = response.data.pages;
                $scope.pageTotal = response.data.total;
            }
        });
    };

    $scope.getClothesInfo();

    $scope.$watch('searchUser.mobile', function (newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.getClothesInfo();
        }
    });
    $scope.$watch('searchUser.name', function (newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.getClothesInfo();
        }
    });

    //删除模块
    $scope.delete = function (id)  {
        $.confirm('确定要删除吗?', {
            okFn: function() {
                if (id == null) {
                    Messenger().post("不能为空！");
                } else {
                    service.delete(id).then(function (response) {
                        if (response.status == SUCCESS_CODE) {
                            Messenger().post("删除成功！");
                            $scope.getClothesInfo();
                        } else {
                            Messenger().post("删除失败！");
                        }
                    });
                }
            },
            cancelFn: function() {}
        });
    };

}]);

