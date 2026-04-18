
function _JS_Sound_ResumeIfNeeded() {

}
function MrConvertHexToRGBA(hexCode, opacity = 1) {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);


  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
}
function MrChangeBg(color) {
  document.documentElement.style.setProperty('--bgcolor', color);
}


var JSONSafeParse = function (json) {
  if (typeof (json) == "object") {
    return json;
  }
  else if (typeof (json) == "string") {
    return JSON.parse(json);
  }
  else {
    return JSON.parse(json);
  }
}
//window.DoneTranslateEvent = function (callback) {


//};
window.DoneTranslateEvent = function (callback) {
  onDoneTranslation(callback);

};
window.SpeedActivatedEvent = function (callback) {

};
window.LatenizeWord = function (sentince) {
  return sentince;
};

var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");

var warningBanner = document.querySelector("#unity-warning");
var gameInstance = undefined;
function unityShowBanner(msg, type) {
  function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
  }
  var div = document.createElement('div');
  div.innerHTML = msg;
  warningBanner.appendChild(div);
  if (type == 'error') div.style = 'background: red; padding: 10px;';
  else {
    if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
    setTimeout(function () {
      warningBanner.removeChild(div);
      updateBannerVisibility();
    }, 5000);
  }
  updateBannerVisibility();
}
function isArabic(text) {
  var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  result = pattern.test(text);
  return result;
}


function IsNullOrEmpty(cat) {
  return cat == undefined || cat==null || cat.trim().length == 0 || cat == 'null';
}
function urlExists(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.status < 400);
    }
  };
  xhr.open('HEAD', url);
  xhr.send();
}
function parseIntValue(intv) {
  let intV = parseInt(intv, 10);
  if (isNaN(intV)) {
    intV = 100;
  }
  return intV;
}

var callback = function (p) {
  if (IsInRecordMode) {

    if (IsRecordingIntro) {
      MrEndRecording();
    }
  }
  parent.postMessage(ID, '*');
};

