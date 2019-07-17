var webApp = angular.module('webApp', ['ui.router', 'oc.lazyLoad', 'LocalStorageModule', 'ng-pagination', 'angularFileUpload']);
webApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    // $urlRouterProvider.otherwise('/home');
    // var systemTime = new Date().getTime();
    var systemTime = '1111';
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "App/models/home/home.html?t="+systemTime,
            data: {pageTitle: '首页', pageSubTitle: 'statistics & reports'},
            controller: "indexcontroller",
            resolve: {
                do: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'App/models/home/homeController.js?t='+systemTime
                            ]
                        });
                    }
                ]
            }
        })
        /************** zy38036 开始**************/
        .state('zlUserList', {
            url: "/zlUser/list",
            templateUrl: "App/models/projectUser/ProjectUser.html?t="+systemTime,
            data: {pageTitle: '用户查询', pageSubTitle: 'projectUser'},
            controller: "projectUserController",
            resolve: {
                do: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'App/models/projectUser/projectUserService.js?t='+systemTime,
                                'App/models/projectUser/projectUserController.js?t='+systemTime
                            ]
                        });
                    }
                ]
            }
        })

        .state('userClothesList', {
            url: "/userClothes/list",
            templateUrl: "App/models/userClothes/index.html?t="+systemTime,
            data: {pageTitle: '商品查询', pageSubTitle: 'userClothes'},
            controller: "controller",
            resolve: {
                do: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                'App/models/userClothes/service.js?t='+systemTime,
                                'App/models/userClothes/controller.js?t='+systemTime
                            ]
                        });
                    }
                ]
            }
        })

        /************** zy38036 结束 **************/
        .state('complexDemo', {
            url: "/complexDemo",
            templateUrl: "App/models/complexDemo/index.html?t="+systemTime,
            data: {pageTitle: '复杂页面分离', pageSubTitle: '复杂页面分离'},
            controller: "complexDemoController",
            resolve: {
                do: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                            files: [
                                'App/models/complexDemo/controller.js?t='+systemTime,
                                'App/models/complexDemo/service.js?t='+systemTime,
                                'App/models/complexDemo/section1/controller.js?t='+systemTime,
                                'App/models/complexDemo/section2/controller.js?t='+systemTime,
                                'App/models/complexDemo/supplierContactInfo/controller.js?t='+systemTime,
                            ]
                        });
                    }
                ]
            }
        })

    ;
    $ocLazyLoadProvider.config({
        debug: false,
        events: false
    });
}]).run(function ($rootScope, $urlRouter,$location) {
    $rootScope.systemTime = new Date().getTime();
    $rootScope.$on('$locationChangeSuccess', function(e) {
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
    $urlRouter.listen();
});

webApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});
webApp.factory('myhttp', ['$http', '$q', function ($http, $q) {
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    var c = {
        _httpGet: function (url, data) {
            var deferred = $q.defer();
            $http.get(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        _httpPost: function (url, data) {
            var deferred = $q.defer();
            $http.post(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        _fileHttpPost: function (url, file) {
            var deferred = $q.defer();
            var fd = new FormData();
            fd.append('file', file);
            $http.post(url, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        _multiFileHttpPost: function (url, file) {
            var deferred = $q.defer();
            var fd = new FormData();
            for (var i = 0; i < file.length; i++) {
                fd.append('file', file[i]);
            }
            $http.post(url, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        },
        formPost:function(url,data){
            var deferred = $q.defer();
            $http.post(url, data,{
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest:function(data) {
                    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
                }
            }).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    };
    return c;
}]);

webApp.directive('fileDownload', function () {
    return {
        restrict: 'A',
        scope: {
            fileDownload: '=',
            fileName: '='
        },
        link: function (scope, elem, atrs) {
            scope.$watch('fileDownload', function (newValue, oldValue) {
                if (newValue != undefined && newValue != null) {
                    var isFirefox = typeof InstallTrigger !== 'undefined';
                    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                    var isIE = false || !!document.documentMode;
                    var isEdge = !isIE && !!window.StyleMedia;
                    var isChrome = !!window.chrome && !!window.chrome.webstore;
                    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                    var isBlink = (isChrome || isOpera) && !!window.CSS;

                    if (isFirefox || isIE || isChrome) {
                        if (isChrome) {
                            console.debug(scope.fileDownload);
                            var url = window.URL || window.webkitURL;
                            var fileURL = url.createObjectURL(scope.fileDownload);
                            var downloadLink = angular.element('<a></a>');
                            downloadLink.attr('href', fileURL);
                            downloadLink.attr('download', scope.fileName);
                            downloadLink.attr('target', '_self');
                            downloadLink[0].click();//call click function
                            url.revokeObjectURL(fileURL);//revoke the object from URL
                        }
                        if (isIE) {
                            window.navigator.msSaveOrOpenBlob(scope.fileDownload, scope.fileName);
                        }
                        if (isFirefox) {
                            var url = window.URL || window.webkitURL;
                            var fileURL = url.createObjectURL(scope.fileDownload);
                            var a = elem[0];
                            a.href = fileURL;
                            a.download = scope.fileName;
                            a.target = '_self';
                            a.click();
                        }
                    } else {
                        alert('Sorry your browser is not support');
                    }
                }
            });

        }
    }
})

angular.module('webApp').filter(
    'to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]
);

webApp.directive('ngThumb', ['$window', function ($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };
    return {
        restrict: 'A',
        template: '<canvas style="height: 50px"/>',
        link: function (scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({width: width, height: height});
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);

webApp.directive('onFinishRenderFilters',['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
}]);

webApp.filter('unique', function () {
    return function (collection, keyname) {
        var output = [], keys = [];
        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});

$(document).ajaxError(function( event, request, settings ) {
    if (request.status == 401) {
        window.location.href =  './oauth/applyfortoken?returnUrl='+window.location.href.replace("#","aaaaaa");
    }

});

