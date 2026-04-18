if (!IsNullOrEmpty(cat) && !IsNullOrEmpty(cinfo)) {
  MRAppCat = cat;
  MRAppInfo = cinfo;
}
var LastTranslatedSentince = "";
$(document).ready(function () {
  if (!IsNullOrEmpty(MrProvName)) {
    SetSLProv(MrProvName);
  }
  if (!MrHasEntro) {
    $("#Subtitles").parent().parent().hide();
  }
  window.SignLanguagePlayerLoadedEvent = function (callback) {
    setTimeout(function () {
      gameInstance.SendMessage('JSHandler', "InitService", MainMRS + "," + MrAvatarMainUrl + "," + DispAvatar);
    }, 500);

    var speedCached = GetParam("Speed");
    if (speedCached == null) {
      SetParam("Speed", "1.0");
      speedCached = "1.0";
    }
    SetSpeed(speedCached);

    if (!IsNullOrEmpty(cameraOptions)) {

      setTimeout(function () {
        gameInstance.SendMessage('JSHandler', "SetCamOpt", cameraOptions);
      }, 500);
      var zoomCached = GetParam("Zoom");
      if (zoomCached == null) {
        SetParam("Zoom", "77");
        zoomCached = "77";
      }
      SetZoom(zoomCached);
    }
  };
  window.AvatarInitEvent = function () {
    MrIsEngineIsReady = true;
    console.log("avatar loaded");
    if (IsNullOrEmpty(srcLblVar)) {
      SetLabelSource(true);
    }
    InitTranslator("#parent", width, height, speed, ID, callback, hideSubtitles, avatar, lang, source, Cid, mrURL);
    try {
      var selec = document.querySelector("#canvas");
      selec.width = width * 1;
      selec.height = height * 1;
    }
    catch (e) {

    }
    $("#introVid").remove();
    if (IsDisplayingIntro) {
      $("#Subtitles").parent().parent().hide();
      $("#Subtitles").text('');
      //mrClearTimeout();
    }

    if (MrNeedTranslate) {
      if (IsInRecordMode) {
        RecordAvIntro(sentence);
      } else {
       
        TranslateSentince("#parent", sentence);
        $(hideSubtitles).parent().parent().show();
      }
    }


    if (IsNullOrEmpty(ScaleAv)) {
      let scaledValue = parseIntValue(ScaleAv);
      gameInstance.SendMessage('JSHandler', "SetScale", scaledValue.toString());
    }
    if (AvatarHasSettings) {
      MrCreationAvatar3DSettings();

      var zoomCached = GetParam('Zoom');
      if (zoomCached == null) {
        SetParam('Zoom', '77');
        zoomCached = '77';
      }
      SetZoom(zoomCached);
    }

  };

 
  function handlingMsg(e) {
    if (e.origin != document.location.origin || IsInSocialMedia) {
      if (!e.data.toString().toLocaleLowerCase().startsWith('msfapi#')) {
        if (e.data.toString().toLocaleLowerCase().startsWith('tr:') || e.data.toString().toLocaleLowerCase().startsWith('rr:')) {
          if (!AllowupDateTextLabel) {
            return;
          }
          var senti = e.data.toString().replace("tr:", "");
          senti = senti.replace("rr:", "");
          MrHandleReceivedText(senti);
        
        } else {
          if (e.data.toString().toLocaleLowerCase().startsWith('cmd:')) {
            var command = (e.data.toString().toLocaleLowerCase().split(':')[1]).split(';');
            console.log('command received ' + command);
            if (command[0] == "speed") {
              SetSpeed(command[1]);
            }
            if (command[0] == "zoom") {
              SetZoom(command[1]);
            }
            if (command[0] == "bg") {
              var mrBgParams = command[1].split(',');
              if (mrBgParams.length > 1) {
                MrChangeBg(MrConvertHexToRGBA(mrBgParams[0], mrBgParams[1]));
              } else {
                MrChangeBg(mrBgParams[0]);
              }
            }
          } else {
            if (e.data.toString().toLocaleLowerCase().startsWith('release-sub:')) {
              AllowupDateTextLabel = true;
            }
            //more cmd
          }
        }
      }
    }
  }
  addEventListener("message", handlingMsg, true);


});
var SentinceTimeout=undefined;
function MrHandleReceivedText(senti) {
  if (SentinceTimeout != undefined) {
    clearTimeout(SentinceTimeout);
  }
  SentinceTimeout = setTimeout(function () {
    if (MrIsEngineIsReady == false)
      return;
    if (senti != LastTranslatedSentince) {
      
      LastTranslatedSentince = senti;
    } else {

      return;
    }
    if (NextTranslatationQ.length > 0) {
      EmptyQ();
      AddToQ(senti);

    } else {
      TranslateSentince("#parent", senti);
    }
  }, 100);
}

var AvIntroURL = MrAvatarMainUrl + DispAvatar + "/intro.mp4";
var UseIntroForAv = true;
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  var AvIntroURL = MrAvatarMainUrl + DispAvatar + "/intro_ios.mov";
  UseIntroForAv = false;
}