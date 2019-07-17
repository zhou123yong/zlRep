'use strict';
webApp.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', '$rootScope', function ($q, $injector, $location, localStorageService, $rootScope) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};
        config.headers.curPath = $location.$$path;
        var authData = angular.fromJson(localStorage.getItem('authorizationData'));
        // if (authData) {
        //     config.headers.Authorization = 'Bearer ' + authData.token;
        // }

        return config;
    }

    var _responseError = function (rejection) {
        // if (rejection.status == 401) {
        //     location.href = "http://10.14.85.225:8081/oauth/login";
        // }
        if (rejection.status == 401) {
            window.location.href = './oauth/applyfortoken?returnUrl='+window.location.href.replace("#","aaaaaa");
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);