/**
 * Created by lx40226 on 2016/11/22.
 */
angular.module('webApp').controller('bigCustomerController', ['$scope', 'bigCustomerService', '$location', function ($scope, bigCustomerService, $location) {


    $scope.$on('$fromSubControllerClick', function(e,data){
        $scope.da = data;

    });
}]);