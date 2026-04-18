function apiClient(hostAPIS) {
  var client = new ModernAPIClient(hostAPIS)
  return {
    signWords: {
      regular: function (parameters, callback) {
        return  client.postActionResponse('signwords', 'rigular', {
          r: parameters.r,
          av: parameters.av,
          lang: parameters.lang,
          icmp: parameters.icmp,
          cmpcnt: parameters.cmpcnt,
          c: parameters.c,
          u: parameters.u,
          prov: parameters.prov,
          express:parameters.express
        }, true).then(function (resp) {
          if (resp.Results == 'OK') {
            callback(resp.Data);
          } else {
            //parent.postMessage(ID, '*');
            console.log(resp.Error);
          }
        });
      }
    },
    translate: {
      interpret: function (parameters, callback) {

        return  client.postActionResponse('translate', 'interpret', {
          s: parameters.source||parameters.s,
          d: parameters.d,
          q: parameters.q,
          SiteId: parameters.SiteId,
          av: parameters.av,
          cat: parameters.cat,
          cinfo: parameters.cinfo,
          tid: (parameters.tid != undefined) ? parameters.tid :''
        }, true).then(function (resp) {
          if (resp.Results == 'OK') {
            callback(resp.Data);
          } else {
           // parent.postMessage(ID, '*');
            console.log(resp.Error);
          }
        });
      },
      qa: function (parameters, callback) {
        return  client.postActionResponse('translate', 'qa', {
          av: parameters.av,
          url: parameters.url,
          r: parameters.r,
          lang: parameters.lang,
          cid: parameters.cid,
          prov: parameters.prov
        }, true).then(function (resp) {
          if (resp.Results == 'OK') {
            callback(resp.Data);
          } else {
            console.log(resp.Error);
          }
        });

      }
    }
  };

}