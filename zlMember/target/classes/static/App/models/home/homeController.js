angular.module('webApp').controller('indexcontroller', ['$scope', '$location', function ($scope, $location) {

    document.title = "会员管理系统";

    $scope.blink=false;

    //跳转会员用户列表
    $scope.loadUser = function(){
        $location.path('/zlUser/list');
    };

    //跳转会员商品列表
    $scope.loadClothes = function(){
        $location.path('/userClothes/list');
    };

    $scope.loadHelp = function(){
        $scope.answerShow = true;
    };

    $scope.showAnswer = function (){
        $scope.answerShow = true;
    };

}]);

