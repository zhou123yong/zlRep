angular.module('webApp').controller('bigCustomerContactsController', ['$scope', 'bigCustomerService', '$location', function ($scope, bigCustomerService, $location) {

    $scope.supplier = {
    };
    $scope.supplierContacterTemplateData = '';
    $scope.defaultContractTemplateData = '';
    $scope.supplierContacterInfos = [];
    $scope.contractContacterInfos = [];
    $scope.supplierContacterInfos = [];
    $scope.contacterDutyList = [];
    var initData = function (){
        bigCustomerService.querySignSubTypes({"typeBelongsCatalog": "CONTACTER_TYPE_CATEGORY"}).then(function (response) {
            $scope.contacterDutyList = response.data;
        });
    };
    initData();

    $scope.model = {
    }
    $scope.addContacter = function(){
        //var contacterName = $scope.model.contacterName;
        var addPhone = $scope.model.contacterPhone.replace(/\s+/g,"");

        var contacterPhone = $scope.model.contacterPhone;
        var contacterTel = $scope.model.contacterTel;
        var contacterFax = $scope.model.contacterFax;
        var contacterQQ = $scope.model.contacterQQ;
        var contacterMail = $scope.model.contacterMail;
        var contacterPosition = $scope.model.contacterPosition;
        var contacterNote = $scope.model.contacterDuty;

        var contacterName =$.trim($("#contacterName1").val());
        if(contacterName == undefined || contacterName == ""){
            $.alert("联系人姓名不能为空！");
            return;
        }
        var reg = /^\d{11}$/;
        if (reg.test(addPhone) == false) {
            $.alert("请输入正确的手机号码！");
            return;
        }
        var data = {
            "data": {
                "typeId": contacterNote,
            }
        };
        bigCustomerService.selectById(data).then(function (response) {
            $scope.contacterDutyInfo = response.data;
            var contacterDutyList = $scope.contacterDutyInfo;
            var contacterDuty = $scope.contacterDutyInfo.typeName;
            $scope.supplierContacterInfos.push({
                "contacterName":contacterName,
                "contacterPhone":contacterPhone,
                "contacterTel":contacterTel,
                "contacterFax":contacterFax,
                "contacterQQ":contacterQQ,
                "contacterMail":contacterMail,
                "contacterPosition":contacterPosition,
                "contacterTypeName":contacterDuty,
                "contacterDuty":contacterNote,
            });
        });
        $("#addContacter").modal('hide');
    };

    var count = 0;
    $scope.success = false;
    $scope.addBigCustomer = function(){
        $("#addBtn").attr("disabled", true);
        $("#addBtn").css("background-color", "grey");
        $scope.success = true;

        if($scope.supplierContacterInfos != null && $scope.supplierContacterInfos.length > 0){
            for(var i = 0 ; i<$scope.supplierContacterInfos.length;i++){
                $scope.supplierContacterInfos[i].contacterPhone = $scope.supplierContacterInfos[i].contacterPhone.replace(/\s+/g,"");
            }

        }

        $scope.bigCustomer = bigCustomerService.bigCustomer;
        $scope.bigCustomer.supplierContacterInfos = $scope.supplierContacterInfos;
        $scope.bigCustomer.attachmentFilesEntityList = bigCustomerService.signRelationAttachList;
        $scope.bigCustomer.customer = bigCustomerService.customerInfo;
        $scope.data = {"userId": userId, "data": $scope.bigCustomer};
        if(count == 0){
            bigCustomerService.addBigCustomers($scope.data).then(function(response){
                if(response.status == SUCCESS_CODE){
                    $scope.success = false;
                    //Messenger().post("保存成功");
                    $scope.supplierId = response.data.signRelationId;
                    if(bigCustomerService.historyUrl!=undefined && bigCustomerService.historyUrl!=""){
                        bigCustomerService.signType = '18';
                        $location.path(bigCustomerService.historyUrl);
                    }else{
                        $scope.applyContract = true;
                    }

                } else {
                    Messenger().post(response.errorMessage);
                    if(bigCustomerService.historyUrl!=undefined && bigCustomerService.historyUrl!=""){
                        bigCustomerService.signType = '18';
                        $location.path(bigCustomerService.historyUrl);
                    }else{
                        $location.path('/signRelationsQuery/query/bigCustomer');
                    }
                }
            });
        }else{
            Messenger().post("请不要重复提交");
        }
        count++;
    };
    $scope.deleteStudent=function(index){   //删除选中的一行
        $scope.supplierContacterInfos.splice(index,1);
    };

    $scope.first = function(){
        $('#bigCustomerTab li:eq(1) a').tab('show');
    }

    //打开隐藏联系人
    $scope.open = function () {
        $("#addContacter").modal('show');

    };

    //隐藏
    $scope.hide = function (){
        $("#addContacter").modal('hide');
        $("#editContacter").modal('hide');
    };

    $scope.applyContract = false;//新增结束弹框
    //继续添加供应商
    $scope.addNewSupplier = function () {
        $scope.applyContract = false;
        location.reload();

    };

    $scope.hideModal = function(){
        $scope.applyContract = false;
        $location.path('/signRelationsQuery/query/bigCustomer');

    };

    //申请合同
    $scope.applyCon = function () {
        $scope.applyContract = false;
        var signRelationId = $scope.supplierId;
        $location.path('signRelationsQuery/query/bigCustomer/cooperation/submit/'+ signRelationId);
    };

    $scope.editIndex = '';
    $scope.edit = function (index){
        $scope.editIndex = index;
        $scope.contacter=angular.copy($scope.supplierContacterInfos[index]);
        for(var i = 0;i < $scope.contacterDutyList.length;i++){
            if($scope.contacter.contacterTypeName == $scope.contacterDutyList[i].typeName){
                setTimeout(function() {
                    $(function () {
                        $("#contacterDutys").val($scope.contacter.contacterTypeName);
                    });
                })

            }
        }

        $("#editContacter").modal('show');
    };

    $scope.backEdit = function(){
        $("#editContacter").modal('hide');
    };

    //提交修改供应商联系人
    $scope.model={};
    $scope.editContacter = function (){
        //debugger;
        var contacterName =$.trim($("#contacterName").val());
        $scope.contacter.contacterName = contacterName;
        if(contacterName == undefined || contacterName == ""){
            $.alert("联系人姓名不能为空！");
            return;
        }
        for(var i = 0;i < $scope.contacterDutyList.length;i++){
            if($scope.contacter.contacterDuty == $scope.contacterDutyList[i].typeName){
                $scope.contacter.contacterDuty = $scope.contacterDutyList[i].typeId;
            }
        }

        var editPhone = $scope.contacter.contacterPhone.replace(/\s+/g,"");
        var reg = /^\d{11}$/;
        if (reg.test(editPhone) == false) {
            $.alert("请输入正确的手机号码！");
            return;
        }
        var data = {
            "data": {
                "typeId": $scope.contacter.contacterDuty,
            }
        };
        bigCustomerService.selectById(data).then(function (response) {
            $scope.contacterDutyInfo = response.data;
            var contacterDuty = $scope.contacterDutyInfo.typeName;
            $scope.contacter.contacterTypeName = contacterDuty;
            $scope.supplierContacterInfos[$scope.editIndex] = angular.copy($scope.contacter);
            $("#editContacter").modal('hide');

        });

    };
}]);