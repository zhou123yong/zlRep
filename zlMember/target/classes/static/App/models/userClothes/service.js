/**
 * Created by Administrator on 2019/4/12.
 */
angular.module('webApp').factory('service', ['myhttp', function (myhttp) {
    var p = {
        getClothesInfo: function (data) {
            return myhttp._httpPost("userClothes/list", data);
        },
        delete: function (id) {
            return myhttp._httpPost("userClothes/delete/" + id);
        }

    };
    return p;
}]);
