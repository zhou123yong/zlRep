angular.module('webApp').directive('repeatDone', function () {
    return {
        link: function (scope, element, attrs) {
            if (scope.$last) {                   // 这个判断意味着最后一个 OK
                scope.$eval(attrs.repeatDone)    // 执行绑定的表达式
            }
        }
    }
});

angular.module('webApp').directive('repeatFirst', function () {
    return {
        link: function (scope, element, attrs) {
            if (scope.$first) {                   // 这个判断意味着最后一个 OK
                element.addClass('active');   // 执行绑定的表达式
            }
        }
    }
});

angular.module('webApp').directive('repeatDonea', function () {
    return {
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {                   // 这个判断意味着最后一个 OK
                scope.$eval(attrs.repeatDonea)    // 执行绑定的表达式
                //element.attr("hidden", true);
            }
        }
    }
});