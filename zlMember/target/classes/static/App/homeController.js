angular.module('webApp').controller('homecontroller', ['$scope',  '$location','$rootScope', function ($scope, $location,$rootScope) {

    document.title = "商户管理系统";

    $scope.initClass = function (id){
        $('ul.menubar-second-level > li > a').removeAttr("style");
        $('#'+id+'').find('a').css("color","#f60");

        $('#liHome').removeAttr("style");
    };

    $scope.$on('ngRepeatFinished', function(){
        var path = $location.path();
        var target = $("ul.menubar-first-level a[href='#"+path+"']");
        var li = target.parent("li");
        if(target.size() > 0 && !li.hasClass('current')){
            $("ul.menubar-first-level li").removeClass('current active');
            var parent = li.parents("ul.menubar-first-level>li");
            if(parent.size() > 0){
                li.addClass('current active');
                parent.addClass('active');
            }else{
                li.addClass('current');
            }
        }
    });

}]);

