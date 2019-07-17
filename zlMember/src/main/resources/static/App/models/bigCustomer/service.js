/**
 * Created by xcx38035 on 2016/11/11.
 */
angular.module('webApp').factory('bigCustomerService', ['myhttp', function (myhttp) {
    var c = {
        signRelationId : "",
        bigCustomer :{},
        customerInfo:{},
        distributorBankAccountList : [],
        shareObject: {
            submitData: {}
        },
        customer : "",
        signRelationAttachList : [],
        historyUrl : "",
        signType : "",
        shareService1: function () {
            return {name: "我是分部页1", age: 18};
        },
        shareService2: function () {
            return [{name: "我是分部页2", age: 18}, {name: "我是分部页3", age: 19}];
        },

        saveContactInfo: function (data) {
            return myhttp._httpPost("distributorContactInfo/TemplateData", data)
        },
        querySignSubTypes: function (data) {
            return myhttp._httpPost("typemaintenance/queryAll", data);
        },
        loadSignProject: function (data) {
            return myhttp._httpPost("sign-project/get-all", data);
        },
        loadCustomersDept: function (data) {
            return myhttp._httpPost("customerManage/queryCustomerDept", data);
        },
        loadCustomers: function (data) {
            return myhttp._httpPost("customerManage/queryCustomerDetailsByCustomerId", data);
        },
        addBigCustomers: function (data) {
            return myhttp._httpPost("bigCustomer/add", data);
        },
        loadSignSubject : function (data){
            return myhttp._httpPost("signSubject/get-all", data);
        },
        //载入洲国省市城
        loadProvinceList : function (data){
            return myhttp._httpPost("baseData/provinceList", data);
        },
        loadCityList : function (data){
            return myhttp._httpPost("baseData/cityList", data);
        },
        loadContinentList : function (data){
            return myhttp._httpPost("baseData/continentList", data);
        },
        loadCountryList : function (data){
            return myhttp._httpPost("baseData/countryList", data);
        },
        loadCountyList : function (data){
            return myhttp._httpPost("baseData/countyList", data);
        },
        addCustomer : function (data){
            return myhttp._httpPost("customerManage/addCustomerAllInfo", data);
        },
        loadTypeMaintenance : function (data){
            return myhttp._httpPost("typemaintenance/search", data);
        },
        uploadMultiFileToUrl: function (file,url) {
            return myhttp._multiFileHttpPost(url, file);
        },
        findPaymentWay : function (data){
            return myhttp._httpPost("typemaintenance/queryAll", data);
        },
        queryBank : function (data){
            return myhttp._httpPost("contractBankController/findBank", data);
        },
        initProject : function (data){
            return myhttp._httpPost("signProjects/loadProject", data);
        },
        checkSupplier : function (parm){
            return myhttp._httpPost("distributor/checkSupplier", parm);
        },
        selectById : function (data){
            return myhttp._httpPost("typemaintenance/selectById", data);
        },
        queryCustomerByName: function (data) {
            return myhttp._httpPost("customerManage/queryCustomerByName", data);
        },
        loadUserBelongProject : function () {
            return myhttp._httpGet("projectUser/belong/projects");
        },
        getInfoByName : function (customerName) {
            return myhttp._httpGet("customerManage/getInfo?customerName="+customerName);
        },



    };
    return c;
}]);