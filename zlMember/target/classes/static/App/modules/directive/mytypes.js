/**
 * Created by wxp4532 on 2016/8/18.
 */
angular.module('webApp').directive('myTypes', function () {
    return {
        restrict: 'A',
        scope: {
            config: '=',
            ngModel: '=',
            select2Model: '='
        },

        link: function (scope, element, attrs) {
            if (scope.$first) {                   // 这个判断意味着最后一个 OK
                element.addClass('active');   // 执行绑定的表达式
            }
        }
    }
});