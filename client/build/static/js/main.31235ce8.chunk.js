(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{23:function(e,t,n){},25:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var o,c=n(2),a=n(16),r=n.n(a),i=(n(23),n(6)),l=n.n(i),s=n(17),u=n(7),f=(n(25),n(18)),p=n.n(f),g=n(1);function d(){var e=Object(c.useState)(),t=Object(u.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(""),i=Object(u.a)(r,2),f=i[0],d=i[1],h=function(){var e=Object(s.a)(l.a.mark((function e(t){var c,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(o),(c=new FormData).append("file",n),c.append("fileName",f),console.log(c);try{a=p.a.post("http://127.0.0.1:3010/greeting/hello",o),console.log(a)}catch(t){console.log(t)}case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{className:"App",children:[Object(g.jsx)("input",{type:"file",accept:".csv,.xlsx,.xls",onChange:function(e){var t=e.target.files[0],n=new FileReader;n.onload=function(e){console.log("Reader E",e);var t=e.target.result;o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",n=e.slice(0,e.indexOf("\n")).split(t);return e.slice(e.indexOf("\n")+1).split("\n").map((function(e){var o=e.split(t);return n.reduce((function(e,t,n){return e[t]=o[n],e}),{})}))}(t),console.log(o)},n.readAsText(t),console.log("E",e),console.log(e.target.files[0]),a(e.target.files[0]),d(e.target.files[0].name)}}),Object(g.jsx)("button",{onClick:h,children:"Upload"})]})}var h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,o=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),o(e),c(e),a(e),r(e)}))};r.a.render(Object(g.jsx)(d,{}),document.getElementById("root")),h()}},[[45,1,2]]]);
//# sourceMappingURL=main.31235ce8.chunk.js.map