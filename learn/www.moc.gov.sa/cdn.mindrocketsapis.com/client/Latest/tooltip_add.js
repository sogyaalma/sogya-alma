function MrActivateDelayHide(){MrDelayHide=!0}function MrSetAccent(n){MrAccent=n}function SetDisableOffMethod(){DisableOffMethod=!0}function DisableChildLoop(){MrEnableChildLoop=!1}function MrActivateTranslationService(){MrEnableReview=!0}function MrDeactivateTranslationService(){MrEnableReview=!1}function SetMrAfterPluginAdd(n){MrAfterPluginAdd=n}function SetSourceLabel(){SourceLabel=!0}function SetDarkMode(n){DarkMode=n}function MrSetWelcomeMessage(n){WelcomeMessage=n}function SetCallBackAfterAddCSSClassToChildren(n){AfterAddCSSClassToChildren=n}function MrSetDisableHovering(){MrDisableHovering=!0}function MrAllowLongQS(){MrAllowLongRequest=!0;MrIsLongSentinceListenerSet||(addEventListener("message",MrOnLongSentinceListenerSetCallback),MrIsLongSentinceListenerSet=!0)}function MrPreConfigTooltip(n,t,i,r,u,f,e){MRTooltipWidth=n;MRTooltipHeight=t;MRAVSpeed=i;mrLang=u;Avatar=r;Source=f;MrClientID=e}function LoopChilds(){MrSLTooltipMgr.Inject();MrSLHandleDomShadowRoots&&document.querySelectorAll("*").forEach(n=>n.shadowRoot&&Array.from(n.shadowRoot.childNodes).filter(n=>!["STYLE","BR","HR","NOSCRIPT","SCRIPT"].includes(n.nodeName)).forEach(n=>MrSLTooltipMgr.Inject(n)))}function MrGetSlItemSelector(){var n=undefined,t;try{n=typeof mr_selector!="undefined"?mr_selector:selector}catch(i){n==undefined&&(t=jQuery("#DeafTranslate"),t!=undefined&&(n=jQuery(t).parent(),jQuery(n).parent().prop("tagName").toString().toLowerCase()=="li"&&(n=n.parent())))}return n}function MrGetStopTranslateButtonText(n){let t=n.toString();return MrClearReplaceKey("stopReplace"),MrStopTranslateKeys.textPairs.forEach(n=>{t=MrReplaceIfNeeded("stopReplace",t,n.input,n.output)}),MrStopTranslateKeys.imgSrcPairs.forEach(n=>{const i=new RegExp(n.input.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g");t=t.replace(i,n.output)}),t}function MrInitTooltip(n){var i,t;if(MrLastPlURL=ItemURL,IsPluginInited=!0,MRdetectIE()&&!MRAllowIE){try{GetParam("DeafIE")=="true"||(SetParam("DeafIE","true"),alert("this plugin is not supported on IE"))}catch(r){}return}if(LoopChilds(n),AllowImgs)try{jQuery("img").each(function(){var n=!1;jQuery(this).attr("alt")!=undefined&&jQuery(this).attr("alt")!=null&&jQuery(this).attr("alt").toString().length>0?(jQuery(this).text(jQuery(this).attr("alt")),n=!0,jQuery(this).attr("mr-allow-long","true")):jQuery(this).attr("title")!=undefined&&jQuery(this).attr("title")!=null&&jQuery(this).attr("title").toString().length>0&&(jQuery(this).text(jQuery(this).attr("title")),n=!0);n&&jQuery(this).addClass(MrTooltipIndicatorClass)})}catch(r){}try{MrDeafItemToAddTemplate=MrTKWidgetController.ParseHTML(ItemToAdd)}catch(r){MrDeafItemToAddTemplate=jQuery("#DeafTranslate").clone();jQuery(MrDeafItemToAddTemplate).show()}try{MrAddBeforeTemplate=addBefore}catch(r){}try{i=MrGetSlItemSelector();typeof i!=undefined&&typeof MrDeafItemToAddTemplate!=undefined&&MrDeafItemToAddTemplate!=null&&(t=jQuery(MrDeafItemToAddTemplate).clone(),MrTKWidgetController.ReplaceBulk(t,MrStopTranslateKeys),jQuery(t).attr("id","TranslateStop"),MrAddBeforeTemplate?jQuery(i).prepend(t):jQuery(i).append(t),MrAfterPluginAdd!=undefined&&MrAfterPluginAdd(t),jQuery("#TranslateStop,.stoptranslate").click(MrOnStopTranslateClickButtonCallback))}catch(r){}jQuery(n).append(jQuery("<div>",{"class":"mr-cont-tooltip-window"}));MRAddCSS(n);createPlayer(".mr-cont-tooltip-window",WelcomeMessage,MRTooltipWidth,MRTooltipHeight,MRAVSpeed,MrSlDivId,mrLang,Source,Avatar,MrClientID,SourceLabel);MrImmidateAttachEvents==!1?addEventListener("message",MrOnHandlingMsgCallback,!0):(MRAttachMoveEventsToPlugin(),MrCanTranslate=!0)}function MrSafeFadeIn(n){try{jQuery(n).fadeIn("slow",function(){})}catch(t){try{jQuery(n).show()}catch(i){}}}function MRRequestTrnaslate(n,t){if(n=MrFilterSpecialCharacters(n),n.trim().length!=0){MrSafeFadeIn(".mr-cont-tooltip-window");var u=t,i=Source,r=SourceLabel;Source==undefined&&u=="true"&&(i="rev-"+mrLang,r=!0);jQuery("#mr_sign_player"+MrSlDivId.toString()).attr("src",MRGetSignItemURL(n,MRTooltipWidth,MRTooltipHeight,MRAVSpeed,MrSlDivId,mrLang,i,Avatar,MrClientID,r))}}function visitKids(){}function MrGetAlternativeText(n){var t=jQuery(n).text().trim(),i=["aria-label","placeholder","alt","title"];for(let r=0;r<i.length;r++){if(!MrIsEmptyText(t))break;t=jQuery(n).attr(i[r])}return t==undefined?null:t}function MrIsEmptyText(n){return n==undefined||n==null||n.toString().trim().length==0}function MrGetTextFromElement(n){var t=MrSafeTrim(getTextOnly(jQuery(n)).toString().trim()),r,i;if(jQuery(n).attr("mr-text-go")!=undefined&&jQuery(n).attr("mr-text-go").length>0&&(t=jQuery(n).attr("mr-text-go")),t=MrFilterSpecialCharacters(t),jQuery(this).attr("mr-allow-long")!="true"&&(!MrAllowLongRequest&&t.length>300||MrAllowLongRequest&&t.length>2500))return null;if(!MrIsEmptyText(t)&&(MrAllowLongRequest||MrSafeTrim(jQuery(n).text()).length<300))t=jQuery(n).clone().find(":hidden").remove().end().find(MrSLTooltipMgr.MrExcludedElements).remove().end().contents().filter((n,t)=>t.nodeType===3).map((n,t)=>t.nodeValue.trim()).get().join(" ");else if(r=MrSafeTrim(jQuery(n).clone().find(":hidden").remove().end().text()),r.length<300&&r.length>0)t=r;else if(MrIsEmptyText(t)&&(MrAllowLongRequest||MrSafeTrim(jQuery(n).text()).length<300))i=jQuery(n).clone(),jQuery(i).find("script").remove(),jQuery(i).find("style").remove(),jQuery(i).find("*").append("&nbsp"),t=MrSafeTrim(jQuery(i).text().replace(/&nbsp/g," ").replace(/undefined/g,""));else return null;return(t=MrFilterSpecialCharacters(t),MrIsEmptyText(t)&&(t=MrGetAlternativeText(n),MrIsEmptyText(t)))?null:t}function MrTranslateTextInternal(n){window.MrSLTranslateDelayerId!=undefined&&clearTimeout(window.MrSLTranslateDelayerId);window.MrSLTranslateDelayerId=setTimeout(()=>{n=MrFilterSpecialCharacters(n);var t=Source,i=SourceLabel;MrUseRealtimeEngine==!1?jQuery("#mr_sign_player"+MrSlDivId.toString()).attr("src",MRGetSignItemURL(n,MRTooltipWidth,MRTooltipHeight,MRAVSpeed,MrSlDivId,mrLang,t,Avatar,MrClientID,i)):MrLastPlURL!=ItemURL?(jQuery("#mr_sign_player"+MrSlDivId.toString()).attr("src",MRGetSignItemURL(n,MRTooltipWidth,MRTooltipHeight,MRAVSpeed,MrSlDivId,mrLang,t,Avatar,MrClientID,i)),MrLastPlURL=ItemURL):document.querySelector("#mr_sign_player"+MrSlDivId.toString()).contentWindow.postMessage("tr:"+n,MrCommOrigin)},MrSLTranslateDelayTime)}function MrSLOnDocumentMouseOver(n){try{if(n.target&&n.target.closest&&n.target.closest(`.${MrTooltipIndicatorClass}`)||n.target.closest(`.mr-img-transcripted`)){const t=n.target.closest(`.${MrTooltipIndicatorClass}`);if(n.relatedTarget&&t.contains(n.relatedTarget))return;n.stopPropagation();MrOnElementHoverMouseOverCallback(jQuery(t))}if(n.target&&n.target.closest&&n.target.closest(`.mr-img-transcripted`)){const t=n.target.closest(`.mr-img-transcripted`);if(n.relatedTarget&&t.contains(n.relatedTarget))return;n.stopPropagation();MrOnImgTrasncribedMouseOver(jQuery(t))}}catch(t){MrConsLogger.Log(n.target)}}function MrSLOnDocumentMouseOut(n){try{if(n.target&&n.target.closest&&n.target.closest(`.${MrTooltipIndicatorClass}`)){const t=n.target.closest(`.${MrTooltipIndicatorClass}`);if(n.relatedTarget&&t.contains(n.relatedTarget))return;n.stopPropagation();MrOnElementHoverMouseOutCallback(jQuery(t))}}catch(t){}}function MrAttachMouseEventsToDocument(){document.addEventListener("mouseenter",MrSLOnDocumentMouseOver,!0);document.addEventListener("mouseleave",MrSLOnDocumentMouseOut,!0);MrSLHandleDomShadowRoots&&document.querySelectorAll("*").forEach(n=>n.shadowRoot&&jQuery(n.shadowRoot.childNodes).not("style,br,hr,noscript,script").each((n,t)=>{t.addEventListener("mouseenter",MrSLOnDocumentMouseOver,!0),t.addEventListener("mouseleave",MrSLOnDocumentMouseOut,!0)}))}function MrSafeUnattachMouseEvents(){document.removeEventListener("mouseenter",MrSLOnDocumentMouseOver,!0);document.removeEventListener("mouseleave",MrSLOnDocumentMouseOut,!0);MrSLHandleDomShadowRoots&&document.querySelectorAll("*").forEach(n=>n.shadowRoot&&jQuery(n.shadowRoot.childNodes).not("style,br,hr,noscript,script").each((n,t)=>{t.removeEventListener("mouseenter",MrSLOnDocumentMouseOver,!0),t.removeEventListener("mouseleave",MrSLOnDocumentMouseOut,!0)}))}function MrTurnOffMrTooltipAttachedEvents(){MrSafeUnattachMouseEvents(`.${MrTooltipIndicatorClass},.mr-img-transcripted`)}function MRAttachMoveEventsOfElementToPluginAdvance(n){(jQuery(n).hasClass(MrTooltipIndicatorClass)==!1&&jQuery(n).addClass(MrTooltipIndicatorClass),IsPluginInited!=!1)&&(MrSafeUnattachMouseEvents(n),MrDisableHovering==!1&&MrAttachMouseEventsToDocument(),IsFirst=!1)}function MRAttachMoveEventsToPlugin(){IsPluginInited!=!1&&(MrSafeUnattachMouseEvents("mouseover"),MrDisableHovering==!1&&MrAttachMouseEventsToDocument(),MrIsFirstCallFlag=!1)}function MRTranslatorPrepareCSS(n){MRTranslatorCSS=n}function MRAddCSS(n){jQuery(n).append("<style>"+MRTranslatorCSS+"<\/style>")}function MrSelTranslate(n){var i=jQuery(n).parents().find("body"),t;jQuery(i).find("#MrSelView>#cont").empty();t=jQuery(n).clone();t.attr("size","15");t.attr("id","cloned-select");t.attr("style","    width: 100% !important;       overflow-y: auto;    margin-bottom: 0 !important;   height: max-content !important;");jQuery(i).find("#MrSelView>#cont").append(t);t.attr("onclick","");jQuery(t).change(function(){jQuery(n).val(jQuery(t).val());jQuery(i).find("#MrbackShade").hide()});jQuery(i).find("#MrSelView>#cont").append(t);jQuery(i).find("#MrbackShade").show();jQuery(i).find("#MrbackShade").click(function(){jQuery(this).hide()});t.find("option").addClass(MrTooltipIndicatorClass);MRAttachMoveEventsToPlugin();t.focus()}function prepareSel(){MrPrepareSel()}function MrPrepareSel(){var n=jQuery("body");jQuery("#MrbackShade").length==0&&(jQuery(n).append(`
        <div id="MrbackShade">
            <div id="MrSelView"></div>
        </div>
    `),jQuery(n).find("#MrSelView").append(`
        <div class="TitleBar" style="display: block; height: 17px; padding: 10px;">
            <div id="" style="float: left;"></div>
            <div id="MenCloseBtn" style="float: right; margin-right: 4px; margin-top: 4px; margin-bottom: 4px; cursor: pointer;">
                <img src="https://cdn.mindrocketsapis.com/client/imgs/png/close.png" class="iconBtn" width="14" />
            </div>
        </div>
    `),jQuery(n).find("#MrSelView").append(`
        <div id='cont'>content</div>
    `),jQuery(n).append(`
        <style>
            select#cloned-select,
            select#cloned-select:focus {
                border: 1px solid #8e8d8d;
                outline: none;
            }
            #cloned-select > option {
                padding-left: 14px;
                padding-top: 5.5px;
                padding-bottom: 5.5px;
            }
            #MrSelView {
                display: block;
                position: fixed;
                top: 50%;
                left: 50%;
                width: 35%;
                height: auto;
                min-height: 151px;
                background: var(--mr-fore-color);
                transform: translate(-50%, -50%);
                color: black;
            }
        </style>
    `),jQuery(n).append(`
        <style>
            #MrbackShade {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                min-height: 200px;
                background: #464646d1;
                z-index:9999;
            }
        </style>
    `),jQuery(n).find("#MrbackShade").hide());MrCreateAllDrops();jQuery(n).find("#MenCloseBtn").click(function(){jQuery(n).find("#MrbackShade").hide()})}function MrAutoAttachDynamicContentOn(n){const t=n=>{for(const i of n)if(i.type==="childList"){var t=$(i.target);MRAttachMoveEventsOfElementToPluginAdvance(t)}else i.type==="attributes"},i=new MutationObserver(t);i.observe(n,{attributes:!0,childList:!0,subtree:!0})}function MrCreateAllDrops(){jQuery(`select.${MrTooltipIndicatorClass}`).click(function(){IsPluginInited&&MRStop==!1&&MrSelTranslate(jQuery(this))})}function MrCreateAvatarModal(){var i,f,t,r,u,n;if(MrTKAddStyle(`
    #mr-av-change-modal {
position: fixed;
top: var(--mr-av-win-t);
    width: var(--mr-av-win-w);
    left: var(--mr-av-win-l);
    height: max-content;
    padding-bottom: 25px;
z-index: 9999999999;
background-color: var(--mr-back-color);
border: var(--mr-fore-color) 3px solid;
}
.mr-av-modal-content center h1{
font-size: 26px;
    color: var(--mr-fore-color);
}
a#mr-av-change-modal-close {
padding: 7px;
}
a#mr-av-change-modal-close img {
filter:${MrCSSColorsUtil.hexToFilter(MrBackColor)};
}

.mr-avatar-ancor {
    display: inline-block;
    margin-left: 4px;
    margin-right: 4px;
        padding-top: 15px;
}
label.mr-av-name-label {
    width: 100%;
    background-color: var(--mr-fore-color);
    color: var(--mr-back-color);
}
a[mr-av-target] {
    display: inline-block;
}
div#mr-av-change-modal {
    min-height: var(--mr-av-win-min-h);
}
.mr-avatar-select-window {
    display: inline;
    text-align: center;
   
}

img.mr-av-image {
    display: block;
    width: var(--mr-av-single-img-width);
    height: var(--mr-av-single-img-height);
}
img.mr-av-image.mr-selected {
    border: 4px solid var(--mr-fore-color);
}
:root {
  --mr-av-win-w: 50vw;
  --mr-av-win-t: 20vh;
  --mr-av-win-l: 25vw;
  --mr-av-win-min-h: 60vh;
}

@media (max-width: 480px) {
  :root {
    --mr-av-win-w: 100vw;
    --mr-av-win-t: 0vh;
    --mr-av-win-l: 0vw;
    --mr-av-win-min-h: 35vh;
  }
}

@media (max-width: 768px) {
  :root {
    --mr-av-win-w: 100vw;
    --mr-av-win-t: 0vh;
    --mr-av-win-l: 0vw;
    --mr-av-win-min-h: 35vh;
  }
}

@media (min-width: 769px) {
  :root {
    --mr-av-win-w: 50vw;
    --mr-av-win-t: 20vh;
    --mr-av-win-l: 25vw;
    --mr-av-win-min-h: 60vh;
  }
}
    `,"MrAvModalCss"),i=SiteLang?"اختر شخصية المترجم":"Select the  Avatar",f=WelcomeMessage,jQuery("#mr-av-change-modal").length==0&&(jQuery("body").append(`
            
            <div id="mr-av-change-modal">
            <a href="javascript:void(0)" id="mr-av-change-modal-close"><img src="https://cdn.mindrocketsapis.com/client/imgs/png/close.png" width="20"/></a>
            <div class="mr-av-modal-content">
                <center><h1 >${i}</h1> </center>
                <div class="mr-avatar-select-window">
                    
                
                </div>
            </div>
            </div>
            `),jQuery("#mr-av-change-modal-close").click(function(){jQuery(this).parent().remove()})),t="#mr-av-change-modal .mr-av-modal-content .mr-avatar-select-window",r=t.length>0?jQuery("#mr-av-change-modal").width()*.9/MrAvatarsList.length:"100%",MrDefineSingleVar("mr-av-group","mr-av-single-img-width",r.toString()+"px"),jQuery(t).length>0){jQuery(t).empty();u=jQuery("#mr-av-change-modal").height()-jQuery("#mr-av-change-modal-close").height()-jQuery(".mr-av-modal-content").height()-55;jQuery(window).width()>768?MrDefineSingleVar("mr-av-group","mr-av-single-img-height",(u*.85).toString()+"px"):MrDefineSingleVar("mr-av-group","mr-av-single-img-height","auto");jQuery(t).append("<center><\/center>");for(let i=0;i<MrAvatarsList.length;i++)n=MrAvatarsList[i],jQuery(t+" center").append(`
                <div class="mr-avatar-ancor" data="${n.AvTechName}" >
                <a href="javascript:MrAvSwitchAvatar('${n.AvTechName}'); jQuery('#mr-av-change-modal-close')[0].click();" mr-av-target="${n.AvTechName}">
                <label class="mr-av-name-label">${n.AvName}</label>
                <img src="${n.AvImage}" class="mr-av-image${MrDavSkin==n.AvTechName?" mr-selected":""}" />
                </a> 
                </div>
                `)}}function MrAvSwitchAvatar(n){MRSetDisplayAvatar(n);jQuery("#mr_sign_player"+MrSlDivId.toString()).attr("src",MRGetSignItemURL(WelcomeMessage,MRTooltipWidth,MRTooltipHeight,MRAVSpeed,MrSlDivId,mrLang,Source,Avatar,MrClientID,SourceLabel));jQuery(".mr-av-image.mr-selected").removeClass("mr-selected");jQuery(`[data='${n}'] .mr-av-image`).addClass("mr-selected");SetParam("mr-selected-avatar",n)}var MRTooltipWidth=350,MRTooltipHeight=350,MRAVSpeed=48,isin=!1,MrSlDivId=999,Avatar="Bader",Lang="ar",mrLang="ar",Source=undefined,MRWBottom=5,MRWLeft=10,WelcomeMessage="أهلا وسهلا حرك المؤشر على الجملة وأنا أترجم",MrClientID=0,MrAllowLongRequest=!1,SourceLabel=!0,DarkMode=!1,MRStop=!1,MrEnableChildLoop=!0,AllowImgs=!0,MrAfterPluginAdd=undefined,AfterAddCSSClassToChildren=undefined,MakeRevNo=!1,MrEnableReview=!1,DisableOffMethod=!1,MrCanTranslate=!1,MrDisableHovering=!1,MrOnStopTranslate=function(){},MrUseRealtimeEngine=!1,MrHideAfterDone=!0,MrAccent="uae",MrDelayHide=!1,MrHideTimer=undefined,MrIsWindowShown=!1,MrLastPlURL=undefined,MRTranslatorCSS=".mr-cont-tooltip-window{        position: fixed;      bottom: 5px;        left: 10px;    z-index:99999999999;}\r\n .Highlite{background-color:#e7e8e9;}.Darklite{background-color:rgba(156, 156, 156, 0.45);}",PreventInterferanceToOtherIframes=!0,MrImmidateAttachEvents=!1,MrQueuedSentinces=[],MrIsLongSentinceListenerSet=!1,MRAllowIE=!0,IsPluginInited=!1,MrIsFirstCallFlag=!0,MrAddBeforeTemplate=!1,MrDeafItemToAddTemplate=undefined,MrSLHandleDomShadowRoots=!0,MrCommOrigin="https://mindrocketsapis.com",MrTooltipIndicatorClass="mr-tooltip",MrParentHolderDetectorLevel=5,MrSLTranslateDelayTime=200,MrAvatarsList=[{AvName:"",AvTechName:"",AvImage:""}],MrOnLongSentinceListenerSetCallback=function(n){if(n.origin.indexOf("mindrockets")>-1&&MrQueuedSentinces.length>0){var t=MrQueuedSentinces.shift();MrTranslateTextInternal(t,!0)}},MrOnImgTrasncribedMouseOver=function(n){MRStop||isin||(MrTranslateTextInternal(jQuery(n).attr("alt")),isin=!0)},MrOnHandlingMsgCallback=function(n){n.origin==document.location.origin&&PreventInterferanceToOtherIframes||MrIsFirstCallFlag&&(setTimeout(function(){MRAttachMoveEventsToPlugin()},5),MrCanTranslate=!0)},MrOnStopTranslateClickButtonCallback=function(){MRStop=!0;jQuery("#TranslateStop,.stoptranslate").remove();try{SetParam("DeafUser","nouse")}catch(t){}try{var n=MrGetSlItemSelector();jQuery(".mr-cont-tooltip-window").remove();jQuery("#DeafTranslate,.deaftranslate").remove();MrAddBeforeTemplate?jQuery(n).prepend(MrDeafItemToAddTemplate):jQuery(n).append(MrDeafItemToAddTemplate);MrAfterPluginAdd!=undefined&&MrAfterPluginAdd(MrDeafItemToAddTemplate);jQuery("#DeafTranslate,.deaftranslate").click(function(){MRStop=!1;TranslateWebsite();jQuery("#DeafTranslate,.deaftranslate").hide()});MrOnStopTranslate()}catch(t){}},MrOnElementHoverMouseOutCallback=function(n){MrUseRealtimeEngine==!1&&MrHideAfterDone==!0&&(MrDelayHide?(MrHideTimer!=undefined&&clearTimeout(MrHideTimer),MrHideTimer=setTimeout(function(){jQuery(".mr-cont-tooltip-window").hide()},200)):jQuery(".mr-cont-tooltip-window").hide());DarkMode?jQuery(n).removeClass("Darklite"):jQuery(n).removeClass("Highlite");isin=!1},MrMangementMrtoolTipAddRemove={MrExcludedElements:"hr,br,script,noscript,style",Events:{OnClassAdded:function(){MrConsLogger.Log("All tooltips applied")}},MrRemoveMrtooltip:function(){jQuery(".mr-tooltip").removeClass("mr-tooltip")},MAddMrTooltip:function(){MrMangementMrtoolTipAddRemove.MrRemoveMrtooltip();var n="*:not("+MrMangementMrtoolTipAddRemove.MrExcludedElements.split(",").join("):not(")+")";jQuery(n).addClass("mr-tooltip");jQuery(".mr-tooltip .mr-tooltip").parent().removeClass("mr-tooltip");MrMangementMrtoolTipAddRemove.Events.OnClassAdded()}},MrOnElementHoverMouseOverCallback=function(n){var t,u;if(!MRStop){if(MrDelayHide&&MrHideTimer!=undefined&&clearTimeout(MrHideTimer),!isin){if(t=MrGetTextFromElement(jQuery(n)),(t==null||t==undefined||t.trim().length<=0)&&(t=jQuery(n).attr("alt"),(t==null||t==undefined||t.trim().length<=0)&&(t=jQuery(n).attr("title"),(t==null||t==undefined||t.trim().length<=0)&&(t=jQuery(n).attr("mr-translate-text"),t==null||t==undefined||t.trim().length<=0))))return;MrSafeFadeIn(".mr-cont-tooltip-window");var e=jQuery(n).attr("rev"),o=Source,s=SourceLabel;if(Source==undefined&&e=="true"&&(o="rev-"+mrLang,s=!0),MrAllowLongRequest)if(MrQueuedSentinces=[],t.length>300){var f=t.split(/[., $!]/),i=0,r="";for(MrQueuedSentinces=[],u=0;u<f.length;u++)i>0&&(r+=" "),r+=f[u],i++,i==25&&(MrQueuedSentinces.push(r),r="",i=0);i<25&&(MrQueuedSentinces.push(r),r="",i=0);MrTranslateTextInternal(MrQueuedSentinces.shift())}else MrQueuedSentinces=[],MrTranslateTextInternal(t);else MrTranslateTextInternal(t);jQuery(".Darklite, .Highlite").removeClass("Darklite").removeClass("Highlite");DarkMode?jQuery(n).addClass("Darklite"):jQuery(n).addClass("Highlite")}isin=!0}},MrSLTooltipMgr={ParentHoldingLevel:3,MrExcludedElements:"hr,br,script,noscript,style,.mr-tooltip-skip,.mr-tooltip-ignore",Events:{OnClassAdded:function(){}},ExeculdMajorParents:function(){const n=Array(MrSLTooltipMgr.ParentHoldingLevel).fill("."+MrTooltipIndicatorClass).join(" ");jQuery(`*:has(${n})`).removeClass(MrTooltipIndicatorClass);jQuery(`ul.${MrTooltipIndicatorClass}:has(li.${MrTooltipIndicatorClass})`).removeClass(MrTooltipIndicatorClass)},Inject:function(n="body"){const t=jQuery(n);t.find("*").not(MrSLTooltipMgr.MrExcludedElements).not("."+MrTooltipIndicatorClass).addClass(MrTooltipIndicatorClass);MrSLTooltipMgr.ExeculdMajorParents();MrSLTooltipMgr.Events.OnClassAdded();AfterAddCSSClassToChildren!=undefined&&AfterAddCSSClassToChildren()}},MrStopTranslateKeys={textPairs:[{input:"Sara - Sign language avatar",output:"Stop sign language avatar"},{input:"ساره - متحدثة لغة الإشارة",output:"إيقاف مُتحدثة لغة الإشارة"},{input:"مترجم لغة الإشارة",output:" إيقاف مترجم لغة الإشارة"},{input:"نسخة الصم",output:"ايقاف"},{input:"لغة الإشارة",output:"ايقاف"},{input:"خدمة أصدقاء الصم",output:"ايقاف"},{input:"For Deaf",output:"Stop"},{input:"Sign Language Interpreter",output:"Stop sign language interpreter"},{input:"For Hearing-impaired",output:"Stop"},{input:"For Hearing impaired",output:"Stop"},{input:"For Hearing Impaired",output:"Stop"},{input:"For Hearing-Impaired",output:"Stop"},{input:"Deaf Friends Service",output:"Stop"},{input:"deaftranslate",output:"stoptranslate"},{input:"Sign Language",output:"Stop"}],imgSrcPairs:[{input:"deaficon",output:"stopicon"},{input:"deaftranslate",output:"stoptranslate"},{input:"DeafTranslate",output:"TranslateStop"}]}