/**
 * Created by kjin on 11/15/2016.
 */
var items=[];
$(document).ready(function(){
    $.ajax({
        url: "tmpload",
        type: "GET",
        success: function checklist(data){
            loadList(JSON.parse(data));
            items = JSON.parse(data);
        }
    });
    var variable = 0;
    var tmp = 0;
    function loadList(items){
        $('div.pm').remove();
        var count=0;
        if(items.length > 0) {
            for(var i = 0; i < items.length; i++) {
                var j = i + 1;
                if (items[i]['order'] == 0) {
                    if(items[i]['required']==1){
                        $('div#left-rm-spill').append('<div class="panel panel-heading template" tmp-id="' + items[i]['id'] + '"><input type="checkbox" checked name="required'+items[i]['id']+'" id="required'+i+'" value="'+items[i]['id']+'" style="position:absolute;left:50px;"/>' + items[i]['name'] + '</div>');
                    }else{
                        $('div#left-rm-spill').append('<div class="panel panel-heading template" tmp-id="' + items[i]['id'] + '"><input type="checkbox" name="required'+items[i]['id']+'" id="required'+i+'" value="'+items[i]['id']+'" style="position:absolute;left:50px;"/>' + items[i]['name'] + '</div>');
                    }
                }else{
                   count++;
                }
            }
            variable = items.length - count+1;
            for(var k=1; k<=count; k++){
                for(var l=0; l<items.length;l++){
                    if(items[l]['order'] ==k){
                        if(items[l]['required']==1){
                            $('div#right-rm-spill').append('<div class="panel panel-heading template" tmp-id="' + items[l]['id'] + '"><input type="checkbox" checked name="required'+items[l]['id']+'" id="required'+k+'" value="'+items[l]['id']+'" style="position:absolute;left:50px;"/>' + items[l]['name'] + '</div>');

                        }else{
                            $('div#right-rm-spill').append('<div class="panel panel-heading template" tmp-id="' + items[l]['id'] + '"><input type="checkbox" name="required'+items[l]['id']+'" id="required'+k+'" value="'+items[l]['id']+'" style="position:absolute;left:50px;"/>' + items[l]['name'] + '</div>');
                        }
                    }
                }
            }
        }
    };

    $('#main-button').click(function(){
        var count = items.length;
        var value = $('#main-input').val();
        if(value==''){
            sweetAlert('insert input box');
        }else{

            $.ajax({
                url:"tmpsave",
                type:"POST",
                data:{ 'tmp_name': $("#main-input").val(),'tmp_identifier':$('#identifier').val() },
                success:function(data){
                    if(data=='ok'){
                        sweetAlert(data);
                        $('div#left-rm-spill').append('<div class="panel panel-heading template" tmp-id="' + count + '"><input type="checkbox" name="required'+count+'" id="required'+count+'" value="'+count+'" style="position:absolute;left:50px;"/>' + value + '</div>');
                    }else{
                        sweetAlert('Dont allow duplicated template name');
                    }


                }
            });

        }

    });
    $('#save-button').click(function(){
        var templates = $('div#right-rm-spill').find('.template');
        var array=[];
        var status = [];
        templates.each(function(template){
            var tmp_id = $(this).attr('tmp-id');
            var required = $(this).find('input[type="checkbox"]').prop('checked');
            array.push(tmp_id);
            status.push(required);

        });
        $.ajax({
            url:"tmpupdate",
            type:"POST",
            data:{'tmp_name':array,'tmp_identifier':$('#identifier').val(),'tmp_status':status},
            success:function(data){
                sweetAlert("보관성공");
            }
        });
    });
});