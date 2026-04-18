
var cAvIdx = 0;
var NextTranslatationQ = [];

function ResetPlayer() {
}


function EmptyQ() {
  NextTranslatationQ = [];
}
function AddToQ(s) {
  NextTranslatationQ.push(s);
}

function onDoneTranslation(callback) {
  console.log('translate done was called');
  urls = [];
  var Callback = settingsFile[lastSelector].callback;
  settingsFile[lastSelector].partIndex++;

  if (settingsFile[lastSelector].partIndex < settingsFile[lastSelector].sentinces.length) {
    CurrentPo = 0;
    TranslatePart(lastSelector, settingsFile[lastSelector].sentinces[settingsFile[lastSelector].partIndex]);

  } else {

    if (NextTranslatationQ.length > 0) {
      var NextSent = NextTranslatationQ.shift();
      EmptyQ();
      TranslateSentince(selector, NextSent);
    } else {
      if (ID != undefined) {

        CurrentPo = 0;
        if (Callback != undefined && Callback != null) {
          Callback(ID);
          ShowIdle();
        }
      }
    }
  }
}

var urls = []
var CurInd = 0;

var MrDownTryNo = 0;

function playNext() {
    if (urls.length > 0) {
      console.log({ args: urls });
        
      var signsArgs = urls.join(",")+ ",NullWord02.mrs";
        
      gameInstance.SendMessage('JSHandler', "TranslateJS", signsArgs);
      urls = [];
    } 
}

function StopIdle() {

}
function ShowIdle() {

}

function PlayAnimatedSequance(selector, s) {
  

  urls = [];
  console.log('Url Received are ');
  console.log(s);
  for (var i = 0; i < s.length; i++) {
    if (prov.toLowerCase() == "cdn") {
      if (s[i].URL.toString().toLowerCase().indexOf(MainMRS.toLowerCase()) > -1) {
        s[i].URL = s[i].URL.replace(MainMRS, '');
      }
    }
        urls.push(s[i].URL+'$'+s[i].feeling);
    }
    
    MRReplaceIndex = -1;
    playNext();
    ShowIdle();
}


function GetParam(pname) {
  if (typeof (localStorage) != "undefined") {
    return localStorage.getItem(pname);
  } else {
    if (jQuery.cookie == undefined) {
      if (typeof (Cookies) != "undefined") {
        return Cookies.get(pname);
      } else {
        return "";
      }
    } else {
      return jQuery.cookie(pname);
    }
  }
}

function SetParam(pname, pval) {
  if (typeof (localStorage) != "undefined") {
    localStorage.setItem(pname, pval);
  } else {
    if (jQuery.cookie == undefined) {
      if (typeof (Cookies) != "undefined") {
        Cookies.set(pname, pval, { path: '/' });
      } else {
        console.log('no setter found');
      }


    } else {
      jQuery.cookie(pname, pval, { path: '/' });
    }
  }
}
