/**
 * Created by lx40226 on 2016/11/22.
 */
angular.module('webApp').controller('bigCustomerBaseController', ['$scope', 'bigCustomerService', '$location', function ($scope, bigCustomerService, $location) {

    $scope.bigCustomer = {};
    $scope.project={};
    var project;
    var setting = {
        view : {
            selectedMulti : false
        },
        data : {
            simpleData : {
                enable : true
            }
        }
    };
    var loadCustomersDept = function (customerId) {
        $scope.pdfList=[];
        bigCustomerService.loadCustomers(customerId).then(function (response) {
            var customer = $scope.customer = response.data;
            bigCustomerService.customer= customer;

            if ($scope.customer.isAbroad == 1) {
                $scope.loadContinentList1();
                $scope.loadCountryList1();
                $scope.loadStateList1();
                $scope.loadCityLists1();
                $scope.loadTownList1();
            } else {
                $scope.loadProvinceList1();
                $scope.loadCityList1();
                $scope.loadCountyList1();
            }
            if(customer!=null){
                if(customer.country!=null && customer.country.indexOf(',')>0){
                    $scope.customer.country = customer.country.split(",")[1];
                }
                if(customer.province!=null && customer.province.indexOf(',')>0){
                    $scope.customer.province = customer.province.split(",")[1];
                }
                if(customer.city!=null && customer.city.indexOf(',')>0){
                    $scope.customer.city = customer.city.split(",")[1];
                }
                if(customer.county!=null && customer.county.indexOf(',')>0){
                    $scope.customer.county = customer.county.split(",")[1];
                }
                if(customer.continent!=null && customer.continent.indexOf(',')>0){
                    $scope.customer.continent = customer.continent.split(",")[1];
                }
                if(customer.continent!=null && customer.continent.indexOf(',')>0){
                    $scope.customer.continent = customer.continent.split(",")[1];
                }
                if(customer.customerAttachmentList!=null){
                    $scope.customerAttachmentName=[];
                    for(var i =0; i<customer.customerAttachmentList.length;i++){
                        $scope.customerAttachmentName.push(customer.customerAttachmentList[i].attachmentTypeName);
                    }
                }

            }

        });
        bigCustomerService.loadCustomersDept(customerId).then(function (response) {
            $scope.customersDeptList = response.data;
        });
    };
    var initData = $scope.initData = function() {
        bigCustomerService.querySignSubTypes({"typeBelongsCatalog": "SUPPLIER_TYPE_CATEGORY"}).then(function (response) {
            $scope.signSubTypeList = response.data;
        });
        bigCustomerService.querySignSubTypes({"typeBelongsCatalog": "RECON_TYPE_CATEGORY"}).then(function (response) {
            $scope.resonTypeList = response.data;
        });
        bigCustomerService.querySignSubTypes({"typeBelongsCatalog": "CURRENCY_TYPE_CATEGORY"}).then(function (response) {
            $scope.currencyTypeList = response.data;
        });
        bigCustomerService.querySignSubTypes({"typeBelongsCatalog": "BUSINESS_NATURE"}).then(function (response) {
            $scope.businessNatureList = response.data;
        });
        var data = {"userId": userId};
        bigCustomerService.loadSignProject(data).then(function (response) {
            $scope.signProjectList = response.data;
        });
        //载入签约项目
        bigCustomerService.loadUserBelongProject().then(function(response){
            $scope.signProject = response.data;
            if($scope.signProject.length > 0){
                $scope.bigCustomer.projectId = $scope.signProject[0].projectId;
                $scope.bigCustomer.projectName = $scope.signProject[0].projectName;
            } else {
                if($scope.signProject == null || $scope.signProject == undefined){
                    $.confirm('未找到当前用户注册项目！请选择自己所属项目！如有疑问请联系 33565-宋淑婷', {
                        okFn: function() {
                            $location.path('/home');
                        },

                        cancelFn: function() {
                            $location.path('/home');
                        }
                    });
                }
            }

        });

    };
    initData();
    // 即时搜索商户信息
    $scope.$on('$includeContentLoaded', function () {
        handleSelect2New("customerId", 'customerManage/searchCustomerByName',function (param) {
                return JSON.stringify({
                    pageSize: 5,
                    pageNumber: 1,
                    data: {
                        customerName:param.term
                    }
                });
            },function (data) {
                return data.data;
            }
            , function (repo) {
                if (repo.loading) return repo.text;
                //var markup = repo.customerName + " <span class='label label-default ng-binding'>" + repo.customerName + "</span>"
                var markup = repo.customerName
                return markup;
            }, function (repo) {

                return repo.customerName;
            });

        $('#customerId').on('select2:select', function () {
            loadCustomersDept($('#customerId').val());
        });
        $("#currencyTypes").select2();
    });

    $scope.changeAbroad = function () {
        $scope.customer.countryId = "";
        $scope.customer.provinceId = "";
        $scope.customer.cityId = "";
        $scope.customer.countyId = "";
        var data = {"userId": userId};
        if ($scope.customer.isAbroad == 0) {
            bigCustomerService.loadProvinceList(data).then(function (response) {
                $scope.provinceList = response.data;
                $scope.provinces = response.data;
            });
        } else {
            $scope.customer.continentId = "";
            $scope.loadContinentList1();
            $scope.provinceList = [];
        }
        $scope.continentChange();
        $scope.countryList = [];
        $scope.cityList = [];
        $scope.countyList = [];
    };

    $scope.provinceChange = function () {
        $scope.countyList = [];
        $scope.customer.cityId = "";
        $scope.customer.countyId = "";
    };

    $scope.cityChange = function () {
        $scope.customer.countyId = "";
    };

    $scope.continentChange = function () {
        $scope.provinceList = [];
        $scope.cityList = [];
        $scope.countyList = [];
        $scope.customer.countryId = "";
        $scope.customer.provinceId = "";
        $scope.customer.cityId = "";
        $scope.customer.countyId = "";
    };

    $scope.countryChange = function () {
        $scope.cityList = [];
        $scope.countyList = [];
        $scope.customer.provinceId = "";
        $scope.customer.cityId = "";
        $scope.customer.countyId = "";
    };

    //载入省份--国内
    $scope.loadProvinceList1 = function () {
        var data = $scope.customer.countryId;
        bigCustomerService.loadProvinceList(data).then(function (response) {
            $scope.provinceList = response.data;
        });
    };
    //载入城市--国内
    $scope.loadCityList1 = function () {
        var data = $scope.customer.provinceId;
        bigCustomerService.loadCityList(data).then(function (response) {
            $scope.cityList = response.data;
        });
    };

    //载入县--国内
    $scope.loadCountyList1 = function () {
        var data = $scope.customer.cityId;
        bigCustomerService.loadCountyList(data).then(function (response) {
            $scope.countyList = response.data;
        });
    };

    //载入洲--国外
    $scope.loadContinentList1 = function () {
        var data = {"userId": userId};
        bigCustomerService.loadContinentList(data).then(function (response) {
            $scope.continentList = response.data;
        });
    };

    //载入国家
    $scope.loadCountryList1 = function () {
        var data = $scope.customer.continentId;
        bigCustomerService.loadCountryList(data).then(function (response) {
            $scope.countryList = response.data;
        });
    };

    //载入省-国外
    $scope.loadStateList1 = function () {
        var data = $scope.customer.countryId;
        bigCustomerService.loadCountryList(data).then(function (response) {
            $scope.provinceList = response.data;
        });
    };

    //载入市--国外
    $scope.loadCityLists1 = function () {
        var data = $scope.customer.provinceId;
        bigCustomerService.loadCityList(data).then(function (response) {
            $scope.cityList = response.data;
        });
    };

    //载入称--国外
    $scope.loadTownList1 = function () {
        var data = $scope.customer.cityId;
        bigCustomerService.loadCountyList(data).then(function (response) {
            $scope.countyList = response.data;
        });
    };
    

    $scope.saveBigCustomer = function () {
        if($scope.customer==undefined){
            $.alert("请选择商户");
            return;
        }

        if ($scope.customer.isAbroad == 0) {
            $scope.customer.continent = "亚洲";
            $scope.customer.continentId = "3106";
            $scope.customer.country = "中国";
            $scope.customer.countryId = "1";
            if ($scope.customer.provinceId == "" || $scope.customer.provinceId == undefined) {
                $.alert("请选择省份");
                return false;
            } else {
                $scope.customer.province = $("#provinceInner").find("option:selected").text().trim();
            }
            if ($scope.customer.cityId == "" || $scope.customer.cityId == undefined) {
                $.alert("请选择城市");
                return false;
            } else {
                $scope.customer.city = $("#cityInner").find("option:selected").text().trim();
            }
            if ($scope.customer.countyId != "") {
                $scope.customer.county = $("#countyInner").find("option:selected").text().trim();
            } else {
                $scope.customer.countyId = 0;
                $scope.customer.county = '';
            }
        }
        if ($scope.customer.isAbroad == 1) {
            if ($scope.customer.continentId == "" || $scope.customer.continentId == undefined) {
                $.alert("请选择洲");
                return false;
            } else {
                $scope.customer.continent = $("#continent").find("option:selected").text().trim();
            }
            if ($scope.customer.countryId == "" || $scope.customer.countryId == undefined) {
                $.alert("请选择国家");
                return false;
            } else {
                $scope.customer.country = $("#country").find("option:selected").text().trim();
            }
            if ($scope.customer.provinceId == "" || $scope.customer.provinceId == undefined) {
                if ($scope.provinceList.length > 0) {
                    $.alert("请选择省份");
                    return false;
                } else {
                    $scope.customer.provinceId = 0;
                    $scope.customer.province = '';
                }
            } else {
                $scope.customer.province = $("#province").find("option:selected").text().trim();
            }
            if ($scope.customer.cityId != "") {
                $scope.customer.city = $("#city").find("option:selected").text().trim();
            } else {
                $scope.customer.cityId = 0;
                $scope.customer.city = '';
            }
            if ($scope.customer.countyId != "") {
                $scope.customer.county = $("#town").find("option:selected").text().trim();
            } else {
                $scope.customer.countyId = 0;
                $scope.customer.county = '';
            }
        }

        if($scope.customer.hangupStatus ==1){
            $.alert("该商户已被挂起，请联系财务");
            return;
        }

        if($scope.bigCustomer.projectId==-1){
            $.alert("请选择签约项目");
            return;
        }

        if($scope.customer.isInside==1){
            if($scope.bigCustomer.insideName==undefined || $scope.bigCustomer.insideName==""){
                $.alert("内部商户请填写内部供应商名称");
                return;
            }
        }
        if($scope.signProject.length > 1){
            $scope.bigCustomer.projectName =  $("#signProjectSelect").find("option:selected").text();
        }
        $scope.bigCustomer.customerId = $scope.customer.customerId;
        bigCustomerService.customerInfo = $scope.customer;

        var parm = {
            "userId": userId,
            "data": {
                signTypeId : "18",
                "customerId": $scope.bigCustomer.customerId,
                "projectId": $scope.bigCustomer.projectId,
                "signWithDepartment": $scope.bigCustomer.signWithDepartment,
                "signDepartment": $scope.bigCustomer.signDepartment
            }
        };
        bigCustomerService.checkSupplier(parm).then(function(response){
            $scope.supplierList = response.data;
            if($scope.supplierList !=null && $scope.supplierList.length > 0){
                Messenger().post("该大客户已经存在，不能重复添加！");
                return;
            }else {
                bigCustomerService.bigCustomer= $scope.bigCustomer;
                $scope.$emit('$fromSubControllerClick','hello');
                $('#bigCustomerTab li:eq(1) a').tab('show');
            }
        });
    };


    //增加商户
    $scope.openAddCustomer = function () {
        $("#customerInfo").modal('show');
        setTimeout(function() {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        });
    };

    //商户新增
    $scope.tab = 1;
    $scope.customerInfo = {};
    $scope.customerDept = {};
    $scope.accountType = {};
    $scope.attach = {};
    $scope.attachTypes = [];
    $scope.customerInfo.country = '中国';
    $scope.customerInfo.customerAttachmentList = [];//商户品牌
    $scope.provinceList = []; //省
    $scope.cityList = []; //城市
    $scope.continentList = [];//洲
    $scope.countryList = [];//国家
    $scope.countyList = [];
    $scope.stateList = [];
    $scope.townList = [];
    $scope.citysList = [];
    $scope.currentAttach={};
    var loadData = function () {
        var data = {"data": {"typeBelongsCatalog": "CUSTOMER_TYPE"}};
        bigCustomerService.loadTypeMaintenance(data).then(function (response) {
            $scope.customerTypes = response.data;
            $scope.customerInfo.customerType = $scope.customerTypes[0];
        });
        data = {"data": {"typeBelongsCatalog": "ACCOUNT_TYPE"}};
        bigCustomerService.loadTypeMaintenance(data).then(function (response) {
            $scope.accountTypes = response.data;
        });
        data = {"data": {"typeBelongsCatalog": "CUSTOMER_ATTACH_TYPE"}};
        bigCustomerService.loadTypeMaintenance(data).then(function (response) {
            $scope.attachTypes = response.data;
            setTimeout(function() {
                $("#attachTypes").select2();
            }, 200);
        });
        data = {"userId": userId};
        bigCustomerService.loadSignProject(data).then(function (response) {
            $scope.signProjectList = response.data;
            $scope.customerInfo.signProject = $scope.signProjectList[0];
        });
        //载入省份
        data = {"userId": userId};
        bigCustomerService.loadProvinceList(data).then(function (response) {
            $scope.provinceList = response.data;
        });
        //载入洲
        data = {"userId": userId};
        bigCustomerService.loadContinentList(data).then(function (response) {
            $scope.continentList = response.data;
        });
    };
    loadData();

    //载入市
    $scope.loadCityList = function (){
        if($scope.customerInfo.province !=null && $scope.customerInfo.province != undefined){
            var data = $scope.customerInfo.province.id;
            bigCustomerService.loadCityList(data).then(function (response) {
                $scope.cityList = response.data;
            });
        }else {
            $scope.cityList = "";
        }

    };

    //载入县
    $scope.loadCountyList = function (){
        if($scope.customerInfo.city !=null && $scope.customerInfo.city != undefined){
            var data = $scope.customerInfo.city.id;
            bigCustomerService.loadCountyList(data).then(function (response) {
                $scope.countyList = response.data;
            });
        }else {
            $scope.countyList = "";
        }

    };

    //载入国家
    $scope.loadCountryList = function (){
        if($scope.customerInfo.continent !=null && $scope.customerInfo.continent != undefined){
            var data = $scope.customerInfo.continent.id;
            bigCustomerService.loadCountryList(data).then(function (response) {
                $scope.countryList = response.data;
            });
        }else {
            $scope.countryList = "";
        }

    };

    //载入省
    $scope.loadStateList = function (){
        if($scope.customerInfo.country !=null && $scope.customerInfo.country != undefined){
            var data = $scope.customerInfo.country.id;
            bigCustomerService.loadCountryList(data).then(function (response) {
                $scope.provinceList = response.data;
            });
        }else {
            $scope.provinceList = "";
        }

    };

    //载入市
    $scope.loadCityLists = function (){
        if($scope.customerInfo.province !=null && $scope.customerInfo.province != undefined){
            var data = $scope.customerInfo.province.id;
            bigCustomerService.loadCountryList(data).then(function (response) {
                $scope.cityList = response.data;
            });
        }else {
            $scope.cityList = "";
        }

    };

    //载入县
    $scope.loadTownList = function (){
        if($scope.customerInfo.city !=null && $scope.customerInfo.city != undefined){
            var data = $scope.customerInfo.city.id;
            bigCustomerService.loadCountryList(data).then(function (response) {
                $scope.countyList = response.data;
            });
        }else {
            $scope.countyList = "";
        }

    };


    $scope.selectCountryByIsAbroad = function () {
        if ($scope.customerInfo.isAbroad == 0) {
            $scope.customerInfo.country = '中国';
            loadData();
        } else {
            $scope.customerInfo.country = '';
            $scope.countryList =null;
            $scope.provinceList =null;
            $scope.cityList =null;
            $scope.countyList =null;
        }
    };

    $scope.changeTimeType = function (typeId,value) {
        if(value == 0){
            $('#endTime'+typeId).hide();
            $('#timeEnd'+typeId).val('2120-01-01');
        } else {
            $('#endTime'+typeId).show();
            $('#timeEnd'+typeId).val('');
        }
    };

    $scope.flag4 = false;
    $scope.addCustomer = function () {
        var customer = $scope.customerInfo;
        if (customer.customerType.typeCode == 'QY' && $scope.customerInfo.isAbroad ==0) {
            if (customer.taxRegisterNo == undefined) {
                //   $.alert("注册号不能为空！");
                return;
            }
            var reg = /[\u4e00-\u9fa5]/;
            if (reg.test(customer.taxRegisterNo) == true) {
                //  $.alert("注册号不能包含汉字！");
                return;
            }
        }
        if (customer.customerType.typeCode == 'GR' && $scope.customerInfo.isAbroad ==0) {
            $scope.customerInfo.taxRegisterNo=null;
            if (customer.identityCardNo == undefined) {
                //  $.alert("身份证号不能为空！");
                return;
            }

            var reg = /[\u4e00-\u9fa5]/;
            if(reg.test(customer.identityCardNo)){
                $(".idCard").html("身份证不能包含汉字")
                return true;
            }

        }
        if (customer.customerType.typeCode != 'QY'  && customer.customerType.typeCode != 'GR' && $scope.customerInfo.isAbroad ==0 ) {
            if (customer.taxRegisterNo == undefined) {
                //    $.alert("证书编号不能为空！");
                return;
            }
            var reg = /[\u4e00-\u9fa5]/;
            if (reg.test(customer.taxRegisterNo) == true) {
                //    $.alert("注册号不能包含汉字！");
                return;
            }
        }
        if (customer.customerName == undefined) {
            //  $.alert("商户名不能为空！");
            return;
        }
        if(customer.customerName.length>50){
            //  $.alert("商户名超长！");
            return;
        }

        if (customer.customerType.typeCode != 'XJ'  && customer.customerType.typeCode != 'SD' ) {
            if($scope.customerInfo.businessScope == null || $scope.customerInfo.businessScope == undefined){
                $(".error-point4").html("经营范围不能为空");
                $scope.flag4 = true;
                return;
            }else {
                $(".error-point4").html("");
                $scope.flag4 = false;
            }
        }else {
            $(".error-point4").html("");
            $scope.flag4 = false;
        }

        if($scope.currentAttach.attachmentInfo == undefined){
            //  $.alert("请上传资质");
            $(".attachment").eq(0).find(".showmessage").html("请上传资质");
            return;
        }

        if($scope.customerInfo.address!=undefined){
            if($scope.customerInfo.address.length > 250){
                ///    $.alert("详细地址超长！");
                return;
            }
        }

        var customerInfo = $scope.customerInfo,
            attachTypes = $scope.attachTypes;

        for (var i = 0; i < $scope.customerInfo.customerAttachmentList.length; i++) {
            if($scope.customerInfo.customerAttachmentList[i].attachmentInfo == undefined){
                $(".showmessage").html('');
                $(".attachment").eq(i).find(".showmessage").html("请上传资质");
                return;
            }
            for (var j = 0; j < attachTypes.length; j++) {
                var attachmentTypeId = $scope.customerInfo.customerAttachmentList[i].attachmentTypeId;
                var attachmentTypeName = $scope.customerInfo.customerAttachmentList[i].attachmentTypeName;
                if (attachmentTypeId == attachTypes[j].typeId) {
                    if(attachmentTypeName.indexOf("特批文件") >= 0){
                        $scope.customerInfo.customerAttachmentList[i].intelligenceStartTime = '1900-01-01';
                        $scope.customerInfo.customerAttachmentList[i].intelligenceEndTime = '1900-01-01';
                    } else {
                        $scope.customerInfo.customerAttachmentList[i].intelligenceStartTime = $('#timeStart' + attachmentTypeId).val();
                        $scope.customerInfo.customerAttachmentList[i].intelligenceEndTime = $('#timeEnd' + attachmentTypeId).val();
                    }
                    if (!$scope.customerInfo.customerAttachmentList[i].intelligenceStartTime) {
                        $(".showmessage").html('');
                        $(".attachment").eq(i).find(".showmessage").html("资质开始时间不能为空");
                        return;
                    }
                    if (!$scope.customerInfo.customerAttachmentList[i].intelligenceEndTime) {
                        $(".showmessage").html('');
                        $(".attachment").eq(i).find(".showmessage").html("资质结束时间不能为空");
                        return;
                    }
                    if($scope.customerInfo.customerAttachmentList[i].intelligenceStartTime > $scope.customerInfo.customerAttachmentList[i].intelligenceEndTime){
                        $(".showmessage").html('');
                        $(".attachment").eq(i).find(".showmessage").html("资质结束时间必须大于开始时间");
                        return;
                    }
                    break;
                }
            }
            $(".showmessage").html('');
        }
        $scope.customerInfo.customerTypeId = $scope.customerInfo.customerType.typeId;
        $scope.customerInfo.customerTypeName = $scope.customerInfo.customerType.typeName;
        $scope.customerInfo.projectId = $scope.customerInfo.signProject.projectId;
        var data = {
            "userId": userId, "data": customerInfo
        };



        var continent;
        var country;
        var province;
        var city;
        var county;
        var continentId;
        var countryId;
        var provinceId;
        var cityId;
        var countyId;
        var hasProvince = true;

        //保存国内\国外数据
        if($scope.customerInfo.isAbroad == 0){
            $scope.customerInfo.continent="亚洲";
            $scope.customerInfo.country = "中国";
            $scope.customerInfo.shortEnName = "CN";
            $scope.customerInfo.continentId = "3106";
            $scope.customerInfo.countryId= "1";
            if($scope.customerInfo.province == undefined){
            //    $.alert("请选择省");
                return;
            }
            if($scope.customerInfo.city == undefined){
             //   $.alert("请选择城");
                return;
            }
            province = $scope.customerInfo.province.name;
            provinceId = $scope.customerInfo.province.id;
            city = $scope.customerInfo.city.name;
            cityId = $scope.customerInfo.city.id;

            if($scope.customerInfo.county!=undefined){
                county = $scope.customerInfo.county.name;
                countyId = $scope.customerInfo.county.id;
            }else {
                county = "";
                countyId = 0;
            }
            $scope.customerInfo.province =province;
            $scope.customerInfo.city = city;
            $scope.customerInfo.county = county;
            $scope.customerInfo.provinceId = provinceId;
            $scope.customerInfo.cityId = cityId;
            $scope.customerInfo.countyId = countyId;
        }else{
            if($scope.customerInfo.continent == undefined){
                // $.alert("请选择洲");
                return;
            }
            if($scope.customerInfo.country == undefined){
                // $.alert("请选择国");
                return;
            }
            if($scope.customerInfo.province == undefined){
                if($scope.provinceList.length > 0){
                    // $.alert("请选择省");
                    return;
                } else {
                    hasProvince = false;
                }
            }

            $scope.customerInfo.shortEnName = $scope.customerInfo.country.shortEnName;
            continent = $scope.customerInfo.continent.name;
            continentId = $scope.customerInfo.continent.id;
            country = $scope.customerInfo.country.name;
            countryId = $scope.customerInfo.country.id;
            $scope.customerInfo.continent= continent;
            $scope.customerInfo.country = country;
            $scope.customerInfo.continentId = continentId;
            $scope.customerInfo.countryId= countryId;
            if(hasProvince) {
                province = $scope.customerInfo.province.name;
                provinceId = $scope.customerInfo.province.id;
            } else {
                province = '';
                provinceId = 0;
            }

            if($scope.customerInfo.city!=undefined){
                city = $scope.customerInfo.city.name;
                cityId = $scope.customerInfo.city.id;
            }else{
                city="";
                cityId=0;
            }
            if($scope.customerInfo.county!=undefined){
                county = $scope.customerInfo.county.name;
                countyId = $scope.customerInfo.county.id;
            }else{
                county="";
                countyId=0;
            }
            $scope.customerInfo.province =province;
            $scope.customerInfo.city = city;
            $scope.customerInfo.county = county;
            $scope.customerInfo.provinceId = provinceId;
            $scope.customerInfo.cityId = cityId;
            $scope.customerInfo.countyId = countyId;
        }

        bigCustomerService.addCustomer(data).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                Messenger().post("商户添加成功，请在此页面继续维护供应商信息哦！！");
                $("#customerInfo").modal('hide');
                bigCustomerService.queryCustomerByName(customer.customerName).then(function (response) {
                    $scope.customer = response.data;
                    if($scope.customer != null){
                        loadCustomersDept($scope.customer.customerId);
                        $scope.customerName = $scope.customer.customerName;
                        $('#select2-customerId-container').text(''+$scope.customerName+'');
                    }
                });
            } else {
                Messenger().post(response.errorMessage);
                if($scope.customerInfo.isAbroad == 0){
                    $scope.cityList = "";
                    $scope.countyList = "";
                }else {
                    $scope.countryList = "";
                    $scope.provinceList = "";
                    $scope.cityList = "";
                    $scope.countyList = "";
                }
            }
        });
    };


    $scope.uploadIdentifyNoFile = function (file) {
        $(".showmessage").html('');
        var uploadUrl = "files/uploadMulti";
        bigCustomerService.uploadMultiFileToUrl(file.files, uploadUrl).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                $scope.attach.identityCardNoList = response.data;
            } else {
                Messenger().post(response.errorMessage);
            }
        });
    };

    $scope.uploadThreeCertificates = function (file) {
        var uploadUrl = "files/uploadMulti";
        bigCustomerService.uploadMultiFileToUrl(file.files, uploadUrl).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                $scope.attach.threeCertificatesList = response.data;
            } else {
                Messenger().post(response.errorMessage);
            }
        });
    };

    $scope.loadCurrentAttach = function (c) {
        $scope.currentAttach = c;
        $scope.currentAttach.attachmentTypeId = c.typeId;
        $scope.currentAttach.attachmentTypeName = c.typeName;
        $scope.currentAttach.attachName=[];
    };
    $scope.atta = [];
    $scope.uploadMultiFile = function (file) {

        var uploadUrl = "files/uploadMulti";
        if(file.files.length ==0){
          //  $.alert("请选择要上传的图片");
            return;
        }
        $scope.atta=file.files;
        var attach =$scope.atta;
        for(var i = 0;i<$scope.atta.length;i++){
            if(attach[i].size/1024/1024>5){
                // $.alert("上传大小不能超过5M请压缩后上传");
                $(".showmessage").html('');
                $(file).parents(".attachment").find(".showmessage").html("上传大小不能超过5M请压缩后上传");
                return;
            }
            var attachName = attach[i].name.toLowerCase();
            if (attachName.indexOf('.png') >= 0 || attachName.indexOf('.jpg') >=0 || attachName.indexOf('.jpeg') >=0 || attachName.indexOf('.gif') >=0 || attachName.indexOf('.bmp') >=0 || attachName.indexOf('.pdf') >=0) {
                $scope.currentAttach.attachName.push($scope.atta[i].name);
                $(file).parents(".attachment").find(".pic_lists").animate({left: '0px'}, "normal");
            }
            else{
                //    $.alert("非法的图片格式，请上传正确的图片格式");
                $(".showmessage").html('');
                $(file).parents(".attachment").find(".showmessage").html("非法的图片格式，请上传正确的图片格式");
                return;
            }

        }

        $(file).parents(".attachment").find(".left_b").addClass("left_btn2").removeClass("left_btn");
        $(file).parents(".attachment").find(".right_b").addClass("right_btn2").removeClass("right_btn");
        if($scope.atta.length > 2){
            $(file).parents(".attachment").find(".right_btn2").addClass("right_btn").removeClass("right_btn2");
        }


        bigCustomerService.uploadMultiFileToUrl(file.files, uploadUrl).then(function (response) {
            if (response.status == SUCCESS_CODE) {
                $scope.currentAttach.attachmentInfo = response.data.join();
            } else {
                Messenger().post(response.errorMessage);
            }
        });
    }

    $scope.backAdd = function(){
        $("#customerInfo").modal('hide');
    }

    $scope.openPdf = function(fileUrl){
        var pdfUrl = fileUrl;
        pdfUrl = encodeURIComponent(pdfUrl);
        window.open('pdf/find?pdfUrl='+pdfUrl);
    };

    $scope.showAttach = function(a,i){
        var attachmentList = a.split(',');
        $scope.imgShow = true;
        var imageList = buildImageList(attachmentList);
        var imageViewer = $.ImageViewer({
            images: imageList,
            isThumb: false
        });
        function buildImageList(attachmentList) {
            var result = [];
            attachmentList.forEach(function(a){
                result.push({
                    big: a
                });
            });

            return result;
        }

        imageViewer.show(i);
    };
    $scope.flag3 =false;
    $scope.getInfo = function () {
        var name = $scope.customerInfo.customerName;
        var name =$.trim(name);
        if(name !=undefined && name != ''){
            bigCustomerService.getInfoByName(name).then(function (response){
                $scope.infoList = response.data;
                if($scope.infoList != null && $scope.infoList.length >0){
                    $scope.customerInfo.address = $scope.infoList[0].address;
                    $scope.customerInfo.businessScope = $scope.infoList[0].businessScope;
                    $scope.customerInfo.taxRegisterNo = $scope.infoList[0].taxRegisterNo;
                    if($scope.infoList[0].province != "") {
                        $.each($scope.provinceList, function (i, v) {
                            if (v.name == $scope.infoList[0].province) {
                                $scope.customerInfo.province = v;
                                (function () {
                                    if ($scope.customerInfo.province != null && $scope.customerInfo.province != undefined) {
                                        var data = $scope.customerInfo.province.id;
                                        bigCustomerService.loadCityList(data).then(function (response) {
                                            $scope.cityList = response.data;
                                            $.each($scope.cityList, function (i, v) {
                                                if (v.name == $scope.infoList[0].city) {
                                                    $scope.customerInfo.city = v;
                                                }
                                            });
                                        });
                                    } else {
                                        $scope.cityList = "";
                                    }
                                })();
                            }
                        });
                    }
                    $(".error-point3").html("");
                    $scope.flag3= false;
                }else{
                    $scope.customerInfo.address = "";
                    $scope.customerInfo.businessScope = "";
                    $scope.customerInfo.taxRegisterNo = "";
                    $scope.customerInfo.province = "";
                    $scope.customerInfo.city = "";
                    if($scope.changeflage){
                        $scope.changeflage = false;
                        if(response.status == 0){
                            $(".error-point3").html(response.errorMessage);
                            $scope.flag3 = true;

                        }
                    }else{
                        $(".error-point3").html(response.errorMessage);
                        $scope.flag3 = true;
                    }
                }
            });
        }else {
            $(".error-point3").html("该字段不能为空");
            $scope.flag3 = true;
        }

    }

    $scope.hideMessage =  function () {
        $(".error-point3").html("");
        $scope.flag3= false;
        //调用企查查
        $scope.changeflage = true;
        $scope.getInfo();
    }

    $scope.showlinkcontent = function () {
        if ($(".link-content").css("display") == 'block') {
            $(".link-content").hide();

        } else {
            $(".link-content").show();
        }
    }
    var flag = true;
    $scope.nextpic = function ($event) {
        //图片数量 picCount
        var picCount = $($event.target).parent(".pic_con").find("li").length;
        //单次移动大小 move_number
        var move_number = 108;
        if(flag && picCount>2){
            flag = false;
            var $picDiv=$($event.target).parent(".pic_con").find(".pic_lists");
            //图片总长度totalLength
            var totalLength = picCount * 54;
            //图片相对与父元素.pic_lists偏左位置pic_lists_left
            var pic_lists_left =$picDiv.position().left;
            if(totalLength - Math.abs(pic_lists_left)>move_number){
                $picDiv.animate({left:'-'+(move_number+ Math.abs(pic_lists_left))+'px'},"normal",function () {
                    flag = true;
                    $($event.target).parent(".pic_con").find(".left_btn2").addClass("left_btn").removeClass("left_btn2");
                    if( totalLength - Math.abs(pic_lists_left)<= move_number*2){
                        $($event.target).addClass("right_btn2").removeClass("right_btn");
                    }

                });
            }else{
                flag = true;
            }
        }

    }

    $scope.prevpic = function ($event) {
        var picCount = $($event.target).parent(".pic_con").find("li").length;
        var move_number = 108;
        if(flag){
            flag = false;
            var $picDiv=$($event.target).parent(".pic_con").find(".pic_lists");
            var pic_lists_left =$picDiv.position().left;
            if(pic_lists_left<0){
                $picDiv.animate({left:(pic_lists_left+move_number)+ 'px'}, "normal",function () {
                    flag = true;
                    $($event.target).parent(".pic_con").find(".right_btn2").addClass("right_btn").removeClass("right_btn2");
                    if(pic_lists_left == -move_number){
                        $($event.target).addClass("left_btn2").removeClass("left_btn");
                    }
                });
            }else {
                flag = true;
            }
        }
    }

    $scope.isTrueRgisterNo = function (taxRegisterNo) {
        var reg = /[\u4e00-\u9fa5]/;

        if (reg.test(taxRegisterNo)) {
            $(".rgisterNo").html("注册号不能包含汉字")
            return true;
        }
        if(taxRegisterNo != undefined && taxRegisterNo.length >= 30){
            $(".rgisterNo").html("最多只能输入30个字")
            return true;
        }
        return false;
    }

    $scope.isTrueIdCard = function (identityCardNo) {
        var reg = /[\u4e00-\u9fa5]/;
        if(identityCardNo != undefined && reg.test(identityCardNo)){
            $(".idCard").html("身份证不能包含汉字")
            return true;
        }
        if(identityCardNo != undefined && identityCardNo.length>=18){
            $(".idCard").html("最多只能输入18个字")
            return true;
        }
        return false;
    }

    $scope.$watch('customerInfo.customerName',function (customerName) {
        if(customerName!= undefined && customerName.length >= 50){
            $(".error-point3").html("最多只能输入50个字");
            $scope.flag3 = true;
        }
    })

    $scope.isTrueOrgCode = function (taxRegisterNo) {
        var reg = /[\u4e00-\u9fa5]/;

        if (reg.test(taxRegisterNo)) {
            $(".orgCode").html("不能包含汉字")
            return true;
        }
        if(taxRegisterNo != undefined && taxRegisterNo.length >= 20){
            $(".orgCode").html("最多只能输入20个字")
            return true;
        }
        return false;
    }
}]);





