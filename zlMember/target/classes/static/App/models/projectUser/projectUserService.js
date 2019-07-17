/**
 * Created by zy38036 on 2016/8/16.
 */
angular.module('webApp').factory('projectUserService', ['myhttp', function (myhttp) {
    var p = {
        getZlUserInfo: function (data) {
            return myhttp._httpPost("zlUser/list", data);
        },
        saveUser: function (data) {
            return myhttp._httpPost("zlUser/addZlUser", data);
        },
        updateUser: function (data) {
            return myhttp._httpPost("zlUser/updateZlUser", data);
        },
        delZlUser: function (id) {
            return myhttp._httpPost("zlUser/deleteZlUser/" + id);
        },
        buyClothes: function (data) {
            return myhttp._httpPost("zlUser/buyClothes", data);
        },
        uploadMultiFileToUrl: function (file,url) {
            return myhttp._multiFileHttpPost(url, file);
        }
    };
    return p;
}]);
