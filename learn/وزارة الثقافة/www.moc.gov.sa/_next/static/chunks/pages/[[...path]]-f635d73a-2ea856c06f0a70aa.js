"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3195],{75549:function(l,i,d){d.r(i);var o=d(62099),e=d(35738),n=d(25675),v=d.n(n),u=d(67294),t=d(31230),a=d(16748),s=d(26261),r=d(85893);let c=l=>{var i,d,o,n;let{0:c,1:m}=(0,u.useState)(!1),{0:g,1:f}=(0,u.useState)(!0);(0,u.useEffect)(()=>{m(!0)});let h=t.Ps`
  query Gallery{
    data: search(
      rootItem: "${null==l?void 0:null===(i=l.rendering)||void 0===i?void 0:i.dataSource}"
      fieldsEqual: [
        { name: "_templatename", value: "Featured-Image-Video-Description" }
      ]
    ){
      results{
        pageInfo{
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        items: edges{
          node{
            fields: item{
              shortDescription :field(name: "shortDescription"){
                value
              }
              ... on FeaturedImageVideoDescription{
                title{
                  value
                }
                video{
                  url
                }
                image{
                  src
                  alt
                  width
                  height
                }
                thumnailImage{
                  src
                  alt
                  width
                  height
                }
                textalignment{
                  value
                }
                isEnabled{
                  value: boolValue
                }
              }
            }
          }
        }
      }
    }
  }
  `,{loading:x,error:p,data:w}=(0,a.a)(h);return c?x?(0,r.jsx)(s.default,{isGallery:!0,itemsPerPage:8}):p?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"responsive",children:(0,r.jsx)("h2",{children:(null==l?void 0:l.locale)==(null==l?void 0:l.lang)?"حدث خطا حاول مجددا":"error in loading items"})})}):(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:`responsive grid gap-y-11 grid-cols-1 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-14 my-24 overflow-hidden ${(null==l?void 0:l.locale)==(null==l?void 0:l.lang)?"rtl":""}`,children:null==w?void 0:null===(d=w.data)||void 0===d?void 0:null===(o=d.results)||void 0===o?void 0:null===(n=o.items)||void 0===n?void 0:n.map(i=>{var d,o,n,u,t,a,s,c,m,h,x,p,w,j,b,y,C,N,P,F,$,I,D,E,V,_,k,S,q,L,T,G,U,z,A,B,R,H,J,K,M,O,Q,W,X,Y,Z,ll,li,ld,lo,le,ln,lv,lu,lt,la,ls,lr,lc,lm,lg,lf,lh,lx,lp,lw,lj,lb,ly,lC,lN,lP,lF,l$,lI,lD,lE,lV,l_,lk,lS,lq,lL,lT,lG,lU,lz,lA,lB;return(null==i?void 0:null===(d=i.node)||void 0===d?void 0:null===(o=d.fields)||void 0===o?void 0:null===(n=o.isEnabled)||void 0===n?void 0:n.value)&&(0,r.jsx)(r.Fragment,{children:((null==i?void 0:null===(u=i.node)||void 0===u?void 0:null===(t=u.fields)||void 0===t?void 0:null===(a=t.image)||void 0===a?void 0:a.src)||(null==i?void 0:null===(s=i.node)||void 0===s?void 0:null===(c=s.fields)||void 0===c?void 0:null===(m=c.video)||void 0===m?void 0:m.url))&&(0,r.jsxs)("div",{className:`${(null==i?void 0:null===(h=i.node)||void 0===h?void 0:null===(x=h.fields)||void 0===x?void 0:null===(p=x.textalignment)||void 0===p?void 0:p.value)!="Center"&&(null==i?void 0:null===(w=i.node)||void 0===w?void 0:null===(j=w.fields)||void 0===j?void 0:null===(b=j.textalignment)||void 0===b?void 0:b.value)!=""?"lg:col-span-2 lg:max-h-[398px] flex flex-col gap-x-11":""}
              ${(null==i?void 0:null===(y=i.node)||void 0===y?void 0:null===(C=y.fields)||void 0===C?void 0:null===(N=C.textalignment)||void 0===N?void 0:N.value)!="Left"?" lg:flex-row ":" lg:flex-row-reverse "}`,children:[(null==i?void 0:null===(P=i.node)||void 0===P?void 0:null===(F=P.fields)||void 0===F?void 0:null===($=F.textalignment)||void 0===$?void 0:$.value)!="Center"&&(((null==i?void 0:null===(I=i.node)||void 0===I?void 0:null===(D=I.fields)||void 0===D?void 0:null===(E=D.image)||void 0===E?void 0:E.src)||(null==i?void 0:null===(V=i.node)||void 0===V?void 0:null===(_=V.fields)||void 0===_?void 0:null===(k=_.video)||void 0===k?void 0:k.url))&&(null==i?void 0:null===(S=i.node)||void 0===S?void 0:null===(q=S.fields)||void 0===q?void 0:null===(L=q.textalignment)||void 0===L?void 0:L.value)=="Right"||(null==i?void 0:null===(T=i.node)||void 0===T?void 0:null===(G=T.fields)||void 0===G?void 0:null===(U=G.textalignment)||void 0===U?void 0:U.value)=="Left")&&(0,r.jsxs)("div",{className:`animate-top text-theme-color w-full pb-8 lg:w-2/5 ${(null==l?void 0:l.locale)==(null==l?void 0:l.lang)?"rtl":""}`,children:[(0,r.jsx)("h2",{className:"text-title-2brand font-medium",children:null==i?void 0:null===(z=i.node)||void 0===z?void 0:null===(A=z.fields)||void 0===A?void 0:null===(B=A.title)||void 0===B?void 0:B.value}),(0,r.jsx)("p",{className:"text-5brand md:text-4brand",children:null==i?void 0:null===(R=i.node)||void 0===R?void 0:null===(H=R.fields)||void 0===H?void 0:null===(J=H.shortDescription)||void 0===J?void 0:J.value})]}),(null==i?void 0:null===(K=i.node)||void 0===K?void 0:null===(M=K.fields)||void 0===M?void 0:null===(O=M.image)||void 0===O?void 0:O.src)&&(0,r.jsxs)("div",{className:"w-full animate-top relative h-full",children:[(0,r.jsx)("div",{className:`absolute flex bottom-0 w-full h-full px-6 z-30
                      bg-gradient-to-t from-[#0000009d] group`,children:(null==i?void 0:null===(Q=i.node)||void 0===Q?void 0:null===(W=Q.fields)||void 0===W?void 0:null===(X=W.textalignment)||void 0===X?void 0:X.value)=="Center"&&(0,r.jsxs)("div",{className:`flex flex-col gap-y-4 self-end pb-4 ${(null==l?void 0:l.locale)==(null==l?void 0:l.lang)?"rtl":""}`,children:[(0,r.jsx)("h2",{className:"text-4brand md:text-[30px] 2xl:text-3brand text-white font-medium",children:null==i?void 0:null===(Y=i.node)||void 0===Y?void 0:null===(Z=Y.fields)||void 0===Z?void 0:null===(ll=Z.title)||void 0===ll?void 0:ll.value}),(0,r.jsx)("p",{className:"text-white pr-4 text-5brand 2xl:text-4brand",children:null==i?void 0:null===(li=i.node)||void 0===li?void 0:null===(ld=li.fields)||void 0===ld?void 0:null===(lo=ld.shortDescription)||void 0===lo?void 0:lo.value})]})}),(0,r.jsx)("div",{className:"h-full [&>span]:!h-full",children:(0,r.jsx)(v(),{src:"https://www.moc.gov.sa/s-core"+(null==i?void 0:null===(le=i.node)||void 0===le?void 0:null===(ln=le.fields)||void 0===ln?void 0:null===(lv=ln.image)||void 0===lv?void 0:lv.src),alt:(null==i?void 0:null===(lu=i.node)||void 0===lu?void 0:null===(lt=lu.fields)||void 0===lt?void 0:null===(la=lt.image)||void 0===la?void 0:la.alt)||(null==i?void 0:null===(ls=i.node)||void 0===ls?void 0:null===(lr=ls.fields)||void 0===lr?void 0:null===(lc=lr.title)||void 0===lc?void 0:lc.value)||"Content image",width:null==i?void 0:null===(lm=i.node)||void 0===lm?void 0:null===(lg=lm.fields)||void 0===lg?void 0:null===(lf=lg.image)||void 0===lf?void 0:lf.width,height:null==i?void 0:null===(lh=i.node)||void 0===lh?void 0:null===(lx=lh.fields)||void 0===lx?void 0:null===(lp=lx.image)||void 0===lp?void 0:lp.height,layout:"responsive",objectFit:"cover",className:`transform lg:group-hover:opacity-50 ease-in-out duration-500
                        ${function(){for(var l=arguments.length,i=Array(l),d=0;d<l;d++)i[d]=arguments[d];return i.filter(Boolean).join(" ")}("duration-700 ease-in-out group-hover:opacity-75",g?"scale-110 blur-2xl grayscale":"scale-100 blur-0 grayscale-0")}`,onLoadingComplete:()=>f(!1)})})]}),(null==i?void 0:null===(lw=i.node)||void 0===lw?void 0:null===(lj=lw.fields)||void 0===lj?void 0:null===(lb=lj.video)||void 0===lb?void 0:lb.url)&&(0,r.jsx)("div",{className:"w-full [&>div]:w-full",children:(0,r.jsx)(e.CustomPlayer,{src:"https://www.moc.gov.sa/s-core"+(null==i?void 0:null===(ly=i.node)||void 0===ly?void 0:null===(lC=ly.fields)||void 0===lC?void 0:null===(lN=lC.video)||void 0===lN?void 0:lN.url),poster:"https://www.moc.gov.sa/s-core"+(null==i?void 0:null===(lP=i.node)||void 0===lP?void 0:null===(lF=lP.fields)||void 0===lF?void 0:null===(l$=lF.thumnailImage)||void 0===l$?void 0:l$.src),title:(null==i?void 0:null===(lI=i.node)||void 0===lI?void 0:null===(lD=lI.fields)||void 0===lD?void 0:null===(lE=lD.textalignment)||void 0===lE?void 0:lE.value)==="Center"?null==i?void 0:null===(lV=i.node)||void 0===lV?void 0:null===(l_=lV.fields)||void 0===l_?void 0:null===(lk=l_.title)||void 0===lk?void 0:lk.value:"",description:(null==i?void 0:null===(lS=i.node)||void 0===lS?void 0:null===(lq=lS.fields)||void 0===lq?void 0:null===(lL=lq.textalignment)||void 0===lL?void 0:lL.value)==="Center"?null==i?void 0:null===(lT=i.node)||void 0===lT?void 0:null===(lG=lT.fields)||void 0===lG?void 0:null===(lU=lG.shortDescription)||void 0===lU?void 0:lU.value:"",isCentered:(null==i?void 0:null===(lz=i.node)||void 0===lz?void 0:null===(lA=lz.fields)||void 0===lA?void 0:null===(lB=lA.textalignment)||void 0===lB?void 0:lB.value)==="Center",locale:null==l?void 0:l.locale,lang:null==l?void 0:l.lang})})]})})})})}):null};i.default=(0,o.C)()(c)},91018:function(l,i,d){d.r(i);var o=d(62099),e=d(35738),n=d(67294),v=d(31230),u=d(16748),t=d(26261),a=d(85893);let s=l=>{var i,d,o,s;let{0:r,1:c}=(0,n.useState)(!1),m=v.Ps`
  query Podcast{
    data: search(rootItem: "${null==l?void 0:null===(i=l.rendering)||void 0===i?void 0:i.dataSource}" 
      fieldsEqual: [{
        name: "_templatename"
        value: "Featured-Video-with-Title-Description"
      }]
    first: ${6} after: "${0}")
    {
      results{
        totalCount
        pageInfo{
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        items: edges{
          cursor
          node{
            item{
              ... on FeaturedVideowithTitleDescription{
                title{
                  value
                }    
                description{
                  value
                }
                videoImage{
                  src
                  alt
                  width
                  height
                }
                videoUrl{
                  url
                  target
                  linkType
                }
              }
            }
          }
        }
      }
    }
  }
  `,{loading:g,error:f,data:h}=(0,u.a)(m);return((0,n.useEffect)(()=>{c(!0)},[h]),r)?g?(0,a.jsx)(t.default,{isVideoList:!0,itemsPerPage:6}):f?(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{children:"couldn't load items"})}):(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:`responsive flex flex-wrap md:justify-between justify-around gap-y-14 my-24 overflow-hidden ${(null==l?void 0:l.locale)==(null==l?void 0:l.lang)?"rtl":""}`,children:null==h?void 0:null===(d=h.data)||void 0===d?void 0:null===(o=d.results)||void 0===o?void 0:null===(s=o.items)||void 0===s?void 0:s.map(i=>{var d,o,n,v,u,t,s,r,c,m,g,f;return(0,a.jsx)(e.CustomPlayer,{src:null==i?void 0:null===(d=i.node)||void 0===d?void 0:null===(o=d.item)||void 0===o?void 0:null===(n=o.videoUrl)||void 0===n?void 0:n.url,poster:"https://www.moc.gov.sa/s-core"+(null==i?void 0:null===(v=i.node)||void 0===v?void 0:null===(u=v.item)||void 0===u?void 0:null===(t=u.videoImage)||void 0===t?void 0:t.src),title:null==i?void 0:null===(s=i.node)||void 0===s?void 0:null===(r=s.item)||void 0===r?void 0:null===(c=r.title)||void 0===c?void 0:c.value,description:null==i?void 0:null===(m=i.node)||void 0===m?void 0:null===(g=m.item)||void 0===g?void 0:null===(f=g.description)||void 0===f?void 0:f.value,locale:null==l?void 0:l.locale,lang:null==l?void 0:l.lang})})})}):(0,a.jsx)(a.Fragment,{})};i.default=(0,o.C)()(s)}}]);
//# sourceMappingURL=[[...path]]-f635d73a-2ea856c06f0a70aa.js.map