var settingsFile = {};
var Modify = true;
var UseSourceLabel = false;
var MRReplaceIndex = -1;
var prov = "p2d";
var MRAppCat = undefined;
var MRAppInfo = undefined;
var lastSelector = undefined;
function MonitorQA(selector, r) {

  var Avatar = settingsFile[selector].Avatar;
  var clURL = settingsFile[selector].ClientURL;
  var lang = settingsFile[selector].lang;
  var cid = settingsFile[selector].cid;

  api.translate.qa({
    av: Avatar,
    url: clURL,
    r: r,
    lang: lang,
    cid: cid, prov: prov
  }, function (data) {

  });

}
var AllowupDateTextLabel = true;
var MrLongTextLabel = [];
var MrSplitter = undefined;

function MrDisplayLongText(text) {
  if (MrSplitter == undefined || MrLongTextLabel.length<=1) {

    $("#Subtitles").text(sentence);
  } else {
    var TextToDisp = undefined;
    TextToDisp = MrLongTextLabel.filter(r => r.includes(text)).at(0);
    if (text.includes(MrSplitter)) {
      var Parts = text.split(MrSplitter);
      if (Parts.length > 0) {
        TextToDisp = MrLongTextLabel.filter(r => Parts.filter(k => r.includes(k)).length > 0).at(-1);
      }
    }
    if (TextToDisp != undefined && TextToDisp != null) {
      
    $("#Subtitles").text(TextToDisp);
    }
  }

}
function UpdateTextLabel(selector, text) {

  var LabelSelector = settingsFile[selector].LabelSelector;
  if (AllowupDateTextLabel) {
    $(LabelSelector).html(text);
  } else {
     MrDisplayLongText(text);
  }
}
function TranslatePart(selector, sen1) {

  ShowIdle();
  if (UseSourceLabel) {
    Modify = false;
    settingsFile[selector].lastPart = sen1;
  }
  if (settingsFile[selector].source == undefined || settingsFile[selector].source == null) {
    settingsFile[selector].source = 'EN';
  }

  api.translate.interpret({
    s: settingsFile[selector].source,
    d: settingsFile[selector].lang,
    express: false,
    q: sen1,
    SiteId: settingsFile[selector].cid,
    av: settingsFile[selector].Avatar,
    cat: MRAppCat,
    cinfo: MRAppInfo
  }, function (res) {
    try {
      var re = JSONSafeParse(res);
      setTimeout(function () {
        MonitorQA(selector, re.translated);

      }, 500);
    
        UpdateTextLabel(selector, sen1);

    
      requestSignsWords(selector, re.translated);
    } catch (e) {

    }
  });


}
function requestSignsWords(selector, sen1) {
  api.signWords.regular({
    r: sen1,
    av: settingsFile[selector].Avatar,
    express: false,
    lang: settingsFile[selector].lang,
    c: settingsFile[selector].cid,
    u: settingsFile[selector].ClientURL,
    prov: prov
  }, function (data) {
    if (!UseSourceLabel || (UseSourceLabel && Modify)) {

      settingsFile[selector].lastPart = sen1;
    }
    var items = JSONSafeParse(data);

    if (items != undefined) {
      PlayAnimatedSequance(selector, items);

    }
  });

}

function TranslateSentince(selector, sen) {

  sen = sen.toString().replace(':', '');

  var w = settingsFile[selector].w;
  var h = settingsFile[selector].h;
  var speed = settingsFile[selector].speed;
  var ID = settingsFile[selector].ID;
  settingsFile[selector].LastSentince = sen;
  settingsFile[selector].sentinces = SplitSentinces(sen, 4);
  settingsFile[selector].partIndex = 0;

  ResetPlayer(selector);
  if (UseSourceLabel) {
    $(settingsFile[selector].LabelSelector).parent().parent().show();
  }
  TranslatePart(selector, settingsFile[selector].sentinces[settingsFile[selector].partIndex]);
}

function SplitSentinces(sentince, step) {
  var data = [];
  var sp = sentince.toString().split(' ');
  var st = "";
  var count = 0;
  if (step == undefined || step == null) {
    step = 10;
  }

  for (var i = 0; i < sp.length; i++) {
    st += sp[i] + ' ';
    if (count < step) {
      count++;

    } else {
      count = 0;
      data.push(st);
      st = "";
    }
  }
  if (count > 0) {
    data.push(st);
    st = "";
  }
  return data;
}
function ReplaceAtPos(s, rep, newRep, index) {
  if (index > s.length)
    return s;
  else
    if (index <= -1)
      return s.replace(rep, newRep);
    else
      return s.slice(0, index) + (s.slice(index)).replace(rep, newRep);
}
function SetSLProv(v) {
  prov = v;
}
function InitTranslator(selector, w, h, speed, ID, callback, LabelSelector, Avatar, lang, source, cid, ClientURL) {

  lastSelector = selector;
  settingsFile[selector] = {
    w: w,
    h: h,
    speed: speed,
    ID: ID,
    callback: callback,
    LabelSelector: LabelSelector,
    LastSentince: null,
    sentinces: null,
    partIndex: 0,
    Avatar: Avatar,
    lang: lang != undefined ? lang : 'ar',
    source: source,
    lastPart: '',
    cid: cid,
    ClientURL: ClientURL
  };
  ResetPlayer(selector);
  $(LabelSelector).parent().parent().hide();
}
function SetLabelSource(sr) { UseSourceLabel = sr; }