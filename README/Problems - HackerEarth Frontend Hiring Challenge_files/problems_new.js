/* global ID_CLICK_BY_HISTORY: true, take_candidate_snapshot *//* global G_SCRIPTS_LOADED, mcq_timers */// this will store list of all the problems
function leadingZero(a){return a<10?"0"+a:+a}function timeHandler(){this.hElem=$("#hours"),this.mElem=$("#mins"),this.sElem=$("#secs"),this.updateTime=function(a){this.hours=Math.floor(a/3600),a-=this.hours*3600,this.mins=Math.floor(a/60),a-=this.mins*60,this.secs=a},this_ctx=this,eventStarted=$(".timer").attr("started"),eventStarted=="False"?this.eventStarted=!1:this.eventStarted=!0;var a=Number($(".timer").attr("time"));this.updateTime(a),this.mins>20?syncTime=13:syncTime=Math.floor(this.mins/2)-2,msyncTime=syncTime*60*1e3,this.setTime=function(){this.hElem.html(leadingZero(this.hours)),this.mElem.html(leadingZero(this.mins)),this.sElem.html(leadingZero(this.secs))},this.updateTimer=function(){var b=Number($("#hours").html()),c=Number($("#mins").html()),d=Number($("#secs").html());d-=1,d===-1&&(c-=1,d=59,c===-1&&(b-=1,c=59,b===-1&&(b=0,c=0,d=0))),this.hours=b,this.mins=c,this.secs=d,$("#hours").html(leadingZero(this.hours)),$("#mins").html(leadingZero(this.mins)),$("#secs").html(leadingZero(this.secs)),b===0&&c===5&&d===0&&addAlert(TEST_TO_FINISH_MESSAGE);if(b===0&&c===0&&d===0){var e=$(".timer").attr("end-test");$.ajax({type:"POST",url:e,dataType:"json",success:function(b){b.status=="OK"&&(b.ended?(clearInterval(testIntervalTimer),clearInterval(syncIntervalTimer),alert(TIME_COMPLETED_MESSAGE),CLOSE_BROWSER=!0,window.location=$(".timer").attr("test-completed")):(b.alert_message&&addAlert(b.alert_message),a=b.left,this_ctx.updateTime(a),$("#hours").html(leadingZero(this_ctx.hours)),$("#mins").html(leadingZero(this_ctx.mins)),$("#secs").html(leadingZero(this_ctx.secs))))}})}},this.syncTimer=function(){var b=$(".timer").attr("end-test");$.ajax({type:"POST",url:b,dataType:"json",success:function(b){b.status=="OK"&&(b.ended?(alert(TIME_COMPLETED_MESSAGE),CLOSE_BROWSER=!0,window.location=$(".timer").attr("test-completed")):(b.alert_message&&addAlert(b.alert_message),a=b.left,this_ctx.updateTime(a),$("#hours").html(leadingZero(this_ctx.hours)),$("#mins").html(leadingZero(this_ctx.mins)),$("#secs").html(leadingZero(this_ctx.secs))))}})},this.startTimer=function(){this.eventStarted&&(testIntervalTimer=setInterval(this.updateTimer,1e3))},this.startSync=function(){this.eventStarted&&(syncIntervalTimer=setInterval(function(){try{this_ctx.syncTimer}catch(a){Raven&&Raven.captureException(a,{extra:{origin:"syncTimer- startSync"}})}},12e4))},this.init=function(){this.setTime(),this.startTimer(),setTimeout(this.startSync,msyncTime)}}function $$(a){var b;if(jq_cache.hasOwnProperty(b))return jq_cache[b];var c=$(a);return jq_cache[a]=c,c}function startInititalTimers(a){for(var b in a)a.hasOwnProperty(b)&&startTimer(parseInt(b),parseInt(a[b]))}function startTimer(a,b){function d(){$(".countdown-left-"+a).show();var d=$(".countdown-"+a),e=$(".countdown-left-"+a);if(d.length>0&&e.length>0){var f=Math.floor(b/60);f<10&&(f="0"+f);var g=b-f*60;g<10&&(g="0"+g),d.html(f+":"+g),e.html("<i class='float-left fa-clock-o fa timer-icon'></i>"+f+":"+g)}if(b===0){clearInterval(c);var h=$("#question-"+a);h.html("<i class='float-left fa-clock-o fa timer-icon'></i> "+TIME_UP_MESSAGE);var i=$("#countdown-"+a);i.html('<i class="fa fa-info-circle fa-red"></i> '+TIME_OVER_MESSAGE_1);var j=$(".answer-"+a);j.length>0&&$(j).find(".load-next-question").trigger("click")}b-=1}window.mcq_timers||(window.mcq_timers=[]);var c;mcq_timers.indexOf(a)===-1&&(mcq_timers.push(parseInt(a)),b>=0&&(c=setInterval(d,1e3)))}function disableInputs(){var a=document.getElementsByTagName("input");if(a)for(var b=0;b<a.length;++b)a[b].disabled=!0}function log_question_viewed_activity(a){$this=$(a),url=$this.attr("activity-url"),event_id=$this.attr("event-id"),p_type_v=$this.attr("p-type"),private_url_hash=$this.attr("id"),data={event_id:event_id,p_type_v:p_type_v,private_url_hash:private_url_hash},$.ajax({url:url,type:"POST",data:data})}function closeDropDown(){$(".expand-box").hide()}function setPositionOfNext(){var a=$(".single-problem-node"),b=$(".right-pane").height();for(var c=0;c<a.length;c++){var d=$(a[c]).height(),e=b-d;if(e>0){var f=70+e,g=$(a[c]).find(".next-button-banner");g.css("margin-top",f)}}}function fixMarksWidth(){var a=$(".red-box");for(var b=0;b<a.length;b++){var c=$(a[b]).width(),d=$(a[b]).siblings(".green-box");pos_mark_width=$(d).width(),c>pos_mark_width?(c+=3,$(d).css({width:c})):c<pos_mark_width&&(pos_mark_width-=3,$(a[b]).css({width:pos_mark_width}))}}function checkPermissionsAndRenderBluebook(){areAllPermissionsEnabledByUser()&&(renderBluebook(),hide(".permission-container"))}function onWebcamLiveCode(){allPermissionsStatus.webcam_access=!0,checkPermissionsAndRenderBluebook()}function handleEnableFullscreen(){allPermissionsStatus.fullscreen_access=!0,enableFullscreen(),checkPermissionsAndRenderBluebook()}function onEnableFullscreenCode(){var a=Object.keys(allPermissionsStatus);if(a.length==1&&allPermissionsStatus["fullscreen_access"]!=undefined)handleEnableFullscreen();else{var b=$("#enable-fullscreen-modal");$("#show-fullscreen-modal-btn.show-modal").trigger("click"),b.find("#enable-fullscreen-btn").on("click",function(a){a.preventDefault(),a.stopPropagation(),b.closest("#simplemodal-container").find(".simplemodal-close").trigger("click"),handleEnableFullscreen()})}}function hide(a){$(a).addClass("hidden")}function show(a){$(a).removeClass("hidden")}function enableFullscreen(){var a=document.documentElement,b=a.requestFullscreen||a.webkitRequestFullScreen||a.webkitRequestFullscreen||a.mozRequestFullScreen||a.msRequestFullscreen;typeof b!="undefined"&&b&&b.call(a)}function isDocumentInFullscreen(){var a=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;return a!=null}function fullscreenChanged(){isDocumentInFullscreen()?(allPermissionsStatus.fullscreen_access=!0,checkPermissionsAndRenderBluebook(),show(".view-body")):(allPermissionsStatus.fullscreen_access=!1,$("#problem-detail>div").detach(),hide(".permission-item-container .permission-item, #permission-heading-before, #allow-permission-access-before, #admin-contact-info, .view-body"),show("#fullscreen-msg-after, #permission-heading-after, #allow-permission-access-after, .permission-container"),$(".permission-container").addClass("darker-background-overlay").find(">div").addClass("permission-container-modal"))}var PROBLEM_LIST=[],jq_cache={},testIntervalTimer=0,syncIntervalTimer=0,CLOSE_BROWSER=!1,this_ctx,syncTime,msyncTime,isTHandlerInitialized=!1,init_time_handler=function(a){if(isTHandlerInitialized===!0)return;var b=new timeHandler;return isTHandlerInitialized=!0,b.init(),a!=="False"&&!disable_tab_switch&&(window.onbeforeunload=function(a){if(!CLOSE_BROWSER){var b=LEAVE_CONFIRM_MESSAGE_1;return typeof a=="undefined"&&(a=window.event),a&&(a.returnValue=b),b}}),b},reorderSerialNumberAndSetNextValue=function(){var a=$(".s-no");a.each(function(b,c){var d=b+1,e=$(this).attr("private-url-hash");$(this).html(d+". "),$(".serial-number-"+e).html(d),$(".pr-serial-number-"+e).html(d),b!==a.length-1?(next_private_url_hash=a.eq(b+1).attr("private-url-hash"),$(".load-next-question-"+e).attr("target",next_private_url_hash)):$(".load-next-question-"+e).parent().addClass("not-visible")})},moveToNextQuestion=function(){$(".load-next-question").click()},disable_submit_button=function(){var a=$$("#problem-detail"),b=a.find("input[type=submit]");b.length>0&&b.attr("disabled","disabled")},enable_submit_button=function(){var a=$$("#problem-detail"),b=a.find("input[type=submit]");b.length>0&&b.removeAttr("disabled")},reset_mcq_answer=function(){$("#problem-detail").find("input[type=radio]:checked").removeAttr("checked")},mark_attempted=function(a){var b=$("#problem-detail").find(".errorlist li");if(b.length>=1)return;var c=$("#status-bar-"+a);c.addClass("blue-background"),c.attr("title",ATTEMPTED_MESSAGE),$("#status-bar-"+a).tipTip({content:ATTEMPTED_MESSAGE})},mark_unattempted=function(a){var b=$("#"+a+" .status").children().first(),c=$("#status-bar-"+a);c.removeClass("blue-background"),c.attr("title",NOT_ATTEMPTED_MESSAGE),$("#status-bar-"+a).tipTip({content:NOT_ATTEMPTED_MESSAGE})};$(document).ready(function(){$(document).ajaxError(function(a,b,c,d){typeof Raven!="undefined"&&Raven.isSetup()&&Raven.captureMessage(d||b.statusText,{extra:{type:c.type,url:c.url,data:c.data,status:b.status,error:d||b.statusText,response:b.responseText&&b.responseText.substring(0,100)}})}),$(".question-item").each(function(){PROBLEM_LIST.push($(this))}),$(".load-next-question").live("click",function(){var a=$(this),b=a.attr("target"),c=$("#"+b);return c.click(),!1}),$(".left-pane .question-item").live("click",function(){var a=$(this).attr("id");ID_CLICK_BY_HISTORY=a,$(".left-pane .question-item").removeClass("selected"),$(".left-pane").find("#"+a).addClass("selected");var b=$(".left-pane").scrollTop()+$(this).offset().top-47.5;$(".triangle-container").css("top",b)}),$("#problem-detail").delegate("input[type=submit], button:not(.compile-test-button)","click",function(a){var b=$(this).parent().attr("private-url-hash"),c=$(".mcq-options-"+b),d=c.find("input[type=radio]");if(d.length>0){if(!d.is(":checked"))return}else mark_attempted(b)}),$("#problem-detail").on("click","input[type=radio]",enable_submit_button),$("#problem-detail").on("click",".reset-answer-js-only",reset_mcq_answer),$("#problem-detail").on("click",".reset-answer",function(){var a=$(this).parent().attr("private-url-hash");mark_unattempted(a)}),$("#problem-detail").on("input propertychange","#wmd-input",function(){var a=$(".wmd-preview-container");a.hasClass("hidden")&&a.removeClass("hidden")});var a=function(){var a=$(".question-item").first();ID_CLICK_BY_HISTORY||(ID_CLICK_BY_HISTORY=a.attr("id")),$(".timer").attr("started",!0);var b=$(".timer");if(b.length>0){var c=b.attr("started");init_time_handler(c)}};take_candidate_snapshot===!0?$("#my-camera").on("webcam:live",a):a(),$("#end-test-click").live("click",function(){CLOSE_BROWSER=!0}),checkPermissionsAndRenderBluebook()}),$(".right-pane").on("click",".android-submit-button",function(){$(".android-start-flow").tipTip({content:PLEASE_WAIT_MESSAGE_1}),$(".android-start-flow").removeClass("android-start-flow")}),$("body").on("click",".goto-first-unattempted-question",function(a){var b=$(this).data("problem-type");$(".section."+b).find(".status-bar:not(.blue-background)").first().trigger("click"),$(".close-modal-window").trigger("click")}),$("body").on("keyup",".test-input",function(){var a=$(this).val().length,b=1024-a;$(".test-input-remaining").html(b),b===0?$(".test-error").addClass("red-text"):$(".test-error").removeClass("red-text")}),$(".show-question-statement").on("click",function(){var a=$(this).attr("id");$(".single-problem-node").hide(),$(".problem-"+a).show(),typeof active_private_url_hash!="undefined"&&(active_private_url_hash=a),$(".right-pane").scrollTop(0),$("#load-editor-button-"+a).trigger("click"),log_question_viewed_activity(this)}),$(".right-pane").on("click",".load-editor-button, .new-submission-tab, .all-submissions-tab",function(a,b){b||$(".right-pane").animate({scrollTop:$(this).offset().top-78+$(".right-pane").scrollTop()},"500","linear")}),$("body").on("change",".objective-option input[type='radio']",function(){var a=$(this).closest("ul"),b=a.find(".objective-option"),c=a.find(".objective-selected");b.removeClass("option-selected"),c.removeClass("objective-selected"),$(this).parent().addClass("option-selected"),$(this).siblings(".objective-virtual-radio").addClass("objective-selected")}),$(".right-pane").on("click",".next-button-banner",function(){$(this).find(".load-next-question")[0].click()}),$(".right-pane").on("click",".tab-container:not(.tab-selected)",function(a){$this=$(this),$sibling=$($this.siblings(".tab-selected")),$sibling.removeClass("tab-selected"),$this.addClass("tab-selected"),visible_content=$sibling.attr("data-container"),$("."+visible_content).hide(),hidden_content=$this.attr("data-container"),$("."+hidden_content).show()}),$(".right-pane").on("keyup input",".wmd-input",function(){var a=this.offsetHeight-this.clientHeight,b=$(".right-pane").scrollTop();$(this).css("height","auto").css("height",this.scrollHeight+a),$(".right-pane").scrollTop(b)}).removeAttr("data-autoresize");var allPermissionsStatus={},areAllPermissionsEnabledByUser=function(){for(var a in allPermissionsStatus)if(!allPermissionsStatus[a])return!1;return!0};document.addEventListener("fullscreenchange",fullscreenChanged,!1),document.addEventListener("webkitfullscreenchange",fullscreenChanged,!1),document.addEventListener("mozfullscreenchange",fullscreenChanged,!1),document.addEventListener("MSFullscreenChange",fullscreenChanged,!1);