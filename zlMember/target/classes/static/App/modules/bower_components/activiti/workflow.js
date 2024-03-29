function graphTrace(options) {


    //var ctx = "http://localhost:8080/merchant"
    $('#workflowModal').modal('show');
    var _defaults = {
        srcEle: this,
        pid: $(this).attr('pid'),
	    pdid: $(this).attr('pdid')
    };
    var opts = $.extend(true, _defaults, options);
    // 获取图片资源
    var imageUrl =  "workflow/resource/process-instance?pid=" + opts.pid + "&type=image";
    $.getJSON( 'workflow/process/trace?pid=' + opts.pid, function(infos) {

        var positionHtml = "";

        // 生成图片
        var varsArray = new Array();
        $.each(infos, function(i, v) {
            var $positionDiv = $('<div/>', {
                'class': 'activity-attr'
            }).css({
                position: 'absolute',
                left: (v.x - 1),
                top: (v.y - 1),
                width: (v.width - 2),
                height: (v.height - 2),
                backgroundColor: 'black',
                opacity: 0,
                zIndex: $.fn.qtip.zindex - 1
            });

            // 节点边框
            var $border = $('<div/>', {
                'class': 'activity-attr-border'
            }).css({
                position: 'absolute',
                left: (v.x - 1),
                top: (v.y - 1),

                width: (v.width - 4),
                height: (v.height - 3),
                zIndex: $.fn.qtip.zindex - 2
            });

            if (v.currentActiviti) {
                $border.addClass('ui-corner-all-12').css({
                    border: '3px solid red'
                });
            }
            positionHtml += $positionDiv.outerHTML() + $border.outerHTML();
            varsArray[varsArray.length] = v.vars;
        });

        //if ($('#workflowTraceDialog').length == 0) {
        //    $('<div/>', {
        //        id: 'workflowTraceDialog',
        //        title: '查看流程（按ESC键可以关闭）',
        //        html: "<div><img src='" + imageUrl + "' style='position:absolute; left:0px; top:0px;' />" +
        //        "<div id='processImageBorder'>" +
        //        positionHtml +
        //        "</div>" +
        //        "</div>"
        //    }).appendTo($('#activitiGialog'));
        //} else {
        //    $('#workflowTraceDialog img').attr('src', imageUrl);
        //    $('#workflowTraceDialog #processImageBorder').html(positionHtml);
        //}

        var html = "<div><img src='" + imageUrl + "' style='position:absolute; left:0px; top:0px;' />" +
        "<div id='processImageBorder'>" +
        positionHtml +
        "</div>" +
        "</div>";

        $('#activitiGialog').html(html);
        //$('#activitiGialog').html("<img src='" + imageUrl + "' style='position:absolute; left:0px; top:0px;' />");

        // 设置每个节点的data

        //$('#workflowTraceDialog.activity-attr').each(function(i, v) {
        $("div[class='activity-attr']").each(function(i, v) {
            $(this).data('vars', varsArray[i]);
        });

        // 打开对话框
        //$('#workflowTraceDialog').dialog({
        //    modal: true,
        //    resizable: false,
        //    dragable: false,
        //    open: function() {
        //        $('#workflowTraceDialog').dialog('option', 'title', '查看流程（按ESC键可以关闭）');
        //         $('#workflowTraceDialog').css('padding', '0.2em');
        //        $('#workflowTraceDialog .ui-accordion-content').css('padding', '0.2em').height($('#workflowTraceDialog').height() - 75);

                // 此处用于显示每个节点的信息，如果不需要可以删除
        $("div[class='activity-attr']").qtip({
                    content: function() {
                        var vars = $(this).data('vars');
                        var tipContent = "<table border='1'>";
                        $.each(vars, function(varKey, varValue) {
                            if (varValue!=null&&varValue!="") {
                                tipContent += "<tr><th >" + varKey + "</th><td>" + varValue + "<td/></tr>";
                            }
                        });
                        tipContent += "</table>";
                        return tipContent;
                    },
                    position: {
                        at: 'bottom right',
                        adjust: {
                            x: 3
                        }
                    }

            //content: {
            //    title: {
            //        text: 'content-title-text',
            //        button: 'button'
            //    },
            //    text: 'content-text'
            //}

                });
                // end qtip
        //    },
        //    close: function() {
        //        $('#workflowTraceDialog').remove();
        //    },
        //    width: document.documentElement.clientWidth * 0.7,
        //    height: document.documentElement.clientHeight * 0.7
        //});

    });
}