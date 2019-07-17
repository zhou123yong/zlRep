angular.module('webApp').factory('tableService', ['$http', '$q', function ($http, $q) {
    var c = {
        addNewRow: function (data) {
            return _httpPost("api/table/newRow", data);
        },
        Update: function (data) {
            return _httpPost("api/table/update", data);
        }
    };
    var _httpPost = function (url, data) {
        var deferred = $q.defer();
        $http.post(url, data).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    var _httpGet = function (url, data) {
        var deferred = $q.defer();
        $http.get(url, data).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    return c;
}]);

