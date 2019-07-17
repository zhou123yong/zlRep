/**
 * Created by wxp4532 on 2016/8/19.
 */
//id:元素id
    //url:请求地址
    //buildParam:请求参数结构,参数带过来搜索框内容
    //getResult:设置结果列表格式,结果中必须包含id,name属性，不然无法选择
    //Myformat：下拉格式
    //MyformatSelect：选择后格式
var handleSelect2New = function (id, url,buildParam,getResult, Myformat, MyformatSelect) {
    $('#' + id).select2({
        ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return buildParam(params);
            },
            // data:param,
            method: 'post',
            contentType:'application/json;charset=UTF-8',
            // beforeSend: function (request) {
            //     request.setRequestHeader("Content-Type", 'application/json;charset=UTF-8');
            // },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;

                return {
                    results:getResult(data), //data.list,
                    pagination: {
                        more: (params.page * 30) < data.total_count
                    }
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        templateResult: Myformat,
        templateSelection: MyformatSelect,
        language: "zh-CN" //设置中文提示
    });
};