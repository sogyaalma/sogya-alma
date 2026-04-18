var config = {
  dataUrl: confURL + ".data",
  frameworkUrl: confURL + ".framework.js",
  codeUrl: confURL + ".wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "Mind Rockets Inc",
  productName: "Sing Language Interpreter",
  productVersion: "4.0.6080",
  showBanner: unityShowBanner,
  "TOTAL_MEMORY": 536870912,
  autoSyncPersistentDataPath: true
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  config.devicePixelRatio = 1;
} else {

}
canvas.style.width = "100vw";
canvas.style.height = "100vh";
loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";

  }).then((unityInstance) => {
    gameInstance = unityInstance;


    loadingBar.style.display = "none";

  }).catch((message) => {
    //alert(message);
  });
};
function getReverseRangeValue(value, rangeSelector) {
  var minV = parseFloat($(rangeSelector).attr('min'));
  var maxV = parseFloat($(rangeSelector).attr('max'));
  return getReverseValue(value, minV, maxV);
  return newval;

}
function getReverseValue(value, minV, maxV) {

  return maxV - value + minV;

}
function SetSpeed(val) {
  gameInstance.SendMessage('JSHandler', "SetSpeed", val);
  SetParam("Speed", val);
}
function SetZoom(val) {
  gameInstance.SendMessage('JSHandler', "SetZoom", getReverseValue(val, 60, 80).toString());
  SetParam("Zoom", val);
}

document.body.appendChild(script);
