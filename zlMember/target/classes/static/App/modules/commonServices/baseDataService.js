/**
 * Created by wxp4532 on 2016/9/29.
 */
/**
 * Created by wxp4532 on 2016/8/10.
 */
angular.module('webApp').factory('baseDataService', ['myhttp', function (myhttp) {
    var c = {
        provinceList: function () {
            return myhttp._httpPost("baseData/provinceList",{});
        },
        cityList: function (query) {
            return myhttp._httpPost("baseData/cityList",query);
        },
        settleList:function (query) {
            return myhttp._httpPost("settlementModes/list",query);
        }
    };
    return c;
}]);





