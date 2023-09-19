!function(){function e(e){let t,r,l,n,a,i,d,o;// Private functions for parsing
let h=e=>e[e.length-1],p=(e,t)=>e.rule===t.rule&&e.position===t.position&&e.lookahead===t.lookahead,s=(e,t)=>{if(e.length!==t.length)return!1;let r=[];for(let l=0;l<e.length;++l)for(let n=0;n<e.length;++n)!r.includes(n)&&p(e[l],t[n])&&r.push(n);return r.length===e.length},c=(e,t)=>{if(e.type!==t.type)return!1;switch(e.type){case"accept":return!0;case"shift":return e.state===t.state;case"reduce":return e.rule===t.rule;case"conflict":return!1}},u=e=>e<r&&e>0,f=e=>e>=r&&e<t.length-1,m=e=>e>=r&&e<t.length,g=e=>{if(m(e))return[e];let t=[];for(let r=0;r<n.length;++r)if(n[r].lhs===e&&n[r].rhs[0]!==e){let e=g(n[r].rhs[0]);for(let r=0;r<e.length;++r)t.push(e[r])}return t},E=e=>{let t=e.slice(0),r=!0;for(;r;){r=!1;for(let e=0;e<t.length;++e){let l=t[e].rule.rhs[t[e].position];for(let a=0;a<n.length;++a)if(n[a].lhs===l){let l=g(t[e].position+1<t[e].rule.rhs.length?t[e].rule.rhs[t[e].position+1]:t[e].lookahead);for(let e=0;e<l.length;++e){let i={rule:n[a],position:0,lookahead:l[e]},d=!0;for(let e=0;e<t.length;++e)if(p(t[e],i)){d=!1;break}d&&(t.push(i),r=!0)}}}}return t},y=(e,t)=>{let r=[];for(let l=0;l<e.length;++l)e[l].rule.rhs[e[l].position]===t&&r.push({rule:e[l].rule,position:e[l].position+1,lookahead:e[l].lookahead});return E(r)},C=e=>{let r=e.trim().split(/\s+/),n=[];for(let e=0;e<r.length;++e){let l=t.indexOf(r[e]);if(!f(l))return!1;n.push(l)}return n.push(l),n},v=(e,t)=>{if(e.symbol===t.lhs&&0===e.children.length){for(let r=0;r<t.rhs.length;++r)e.children.push({symbol:t.rhs[r],children:[]});return!0}for(let r=e.children.length-1;r>=0;--r)if(v(e.children[r],t))return!0;return!1},b=()=>{let e;for(let t=o.length-1;t>=0;--t)"reduce"===o[t].action.type&&(void 0===e&&(e={symbol:o[t].action.rule.lhs,children:[]}),v(e,o[t].action.rule));return e},k=()=>{a=[E([{rule:n[0],position:0,lookahead:l}])];let e=!0;for(;e;){e=!1;for(let r=0;r<a.length;++r)for(let l=1;l<t.length-1;++l){let t=y(a[r],l);if(0!==t.length){let r=!0;for(let e=0;e<a.length;++e)if(s(a[e],t)){r=!1;break}r&&(a.push(t),e=!0)}}}},T=(e,t,r)=>{if(void 0===i[e][t])i[e][t]=r;else if("conflict"===i[e][t].type){let l=!0;for(let n=0;n<i[e][t].actions.length;++n)if(c(i[e][t].actions[n],r)){l=!1;break}l&&i[e][t].actions.push(r)}else c(i[e][t],r)||(i[e][t]={type:"conflict",actions:[i[e][t],r]},d=!0)},S=()=>{i=Array(a.length),d=!1;for(let e=0;e<a.length;++e){i[e]=Array(t.length);for(let t=0;t<a[e].length;++t){let r=a[e][t].rule.rhs[a[e][t].position];if(f(r)){let t=y(a[e],r);for(let l=0;l<a.length;++l)s(a[l],t)&&T(e,r,{type:"shift",state:l})}a[e][t].position===a[e][t].rule.rhs.length&&(0!==a[e][t].rule.lhs?T(e,a[e][t].lookahead,{type:"reduce",rule:a[e][t].rule}):a[e][t].lookahead===l&&(i[e][l]={type:"accept"}))}for(let t=1;t<r;++t){let r=y(a[e],t);for(let l=0;l<a.length;++l)s(a[l],r)&&(i[e][t]=l)}}};// Public API for parsing
this.createParser=e=>{t=[];let a=e.trim().split(/[\r\n]+/),i=[];for(let e=0;e<a.length;++e)i[e]=a[e].trim().split(/\s+/),t.includes(i[e][0])||t.push(i[e][0]);r=t.length;for(let e=0;e<i.length;++e)for(let r=0;r<i[e].length;++r)t.includes(i[e][r])||t.push(i[e][r]);l=t.length,t.push("$"),n=[];for(let e=0;e<i.length;++e){n[e]={index:e,rhs:[]};for(let r=0;r<i[e].length;++r)0===r?n[e].lhs=t.indexOf(i[e][r]):n[e].rhs.push(t.indexOf(i[e][r]))}k(),S()},this.parse=e=>{if(void 0===i)return;if(o=[],d){o.push({stateStack:[],symbolStack:[],input:[],action:{type:"error",error:"conflict in parse table"}});return}let t=C(e);if(!1===t){o.push({stateStack:[],symbolStack:[],input:[],action:{type:"error",error:"syntax error"}});return}let r=[0],l=[];for(;;){let e=i[h(r)][t[0]];switch(void 0===e&&(e={type:"error",error:"parse error"}),o.push({stateStack:r.slice(0),symbolStack:l.slice(0),input:t.slice(0),action:e}),e.type){case"shift":l.push(t.shift()),r.push(e.state);break;case"reduce":for(let t=0;t<e.rule.rhs.length;++t)l.pop(),r.pop();l.push(e.rule.lhs),r.push(i[h(r)][e.rule.lhs]);break;case"accept":case"error":return}}},this.clear=()=>{t=r=l=n=a=i=d=o=void 0};// Private functions for rendering
let x=e=>{switch(e.type){case"accept":return"acc";case"shift":return"s"+e.state;case"reduce":return"r"+e.rule.index;case"error":return"error: "+e.error;case"conflict":let t=x(e.actions[0]);for(let r=1;r<e.actions.length;++r)t+=","+x(e.actions[r]);return t}},L=e=>0===e?"start-symbol":e===l?"end-marker":u(e)?"non-terminal":f(e)?"terminal":void 0,I=()=>e.createTextNode(" → "),B=()=>e.createTextNode("•"),P=(t,r,l,n)=>{let a=e.createElement(t);return(void 0===r?[]:Array.isArray(r)?r:[r]).forEach(t=>{"object"==typeof t?a.appendChild(t):a.appendChild(e.createTextNode(t))}),void 0!==l&&(Array.isArray(l)?a.classList.add(...l):a.classList.add(l)),void 0!==n&&Object.keys(n).forEach(e=>{a[e]=n[e]}),a},G=(e,r)=>{let l=[L(e)];return void 0!==r&&l.push(r),P("b",t[e],l)},M=e=>e.map(e=>G(e)),w=e=>[G(e.lhs),I(),...M(e.rhs)],A=t=>{let r=[G(t.rule.lhs),I()];return t.rule.rhs.forEach((e,l)=>{t.position===l&&r.push(B()),r.push(G(e))}),t.position===t.rule.rhs.length&&r.push(B()),r.push(e.createTextNode(",")),r.push(G(t.lookahead,"lookahead")),r},H=r=>{if(void 0===r)return;let l=e.createElement("ul"),n=e.createElement("li");n.classList.add(L(r.symbol)),l.appendChild(n);let a=e.createElement("span");return a.appendChild(e.createTextNode(t[r.symbol])),n.appendChild(a),r.children.forEach(e=>{let t=H(e);void 0!==t&&l.appendChild(t)}),l};// Public API for rendering
this.renderGrammar=r=>{if(r.innerHTML="",void 0===t)return;let l=e.createElement("pre");n.forEach((t,r)=>{l.appendChild(P("i",r+" ")),w(t).forEach(e=>{l.appendChild(e)}),r!==n.length-1&&l.appendChild(e.createElement("br"))}),r.appendChild(l)},this.renderCollection=t=>{if(t.innerHTML="",void 0===a)return;let r=e.createElement("pre");a.forEach((t,l)=>{t.forEach((n,a)=>{r.appendChild(P("i",0===a?["I",P("sub",l)," "]:void 0)),A(n).forEach(e=>{r.appendChild(e)}),a!==t.length-1&&r.appendChild(e.createElement("br"))}),l!==a.length-1&&(r.appendChild(e.createElement("br")),r.appendChild(e.createElement("br")))}),t.appendChild(r)},this.renderParseTable=n=>{if(n.innerHTML="",void 0===i)return;let a=e.createElement("table"),d=e.createElement("thead");a.appendChild(d);let o=e.createElement("tr");d.appendChild(o);let h=e.createElement("tr");d.appendChild(h);let p=e.createElement("tbody");a.appendChild(p),o.appendChild(P("th","state",void 0,{rowSpan:2})),o.appendChild(P("th","action",void 0,{colSpan:t.length-r})),o.appendChild(P("th","goto",void 0,{colSpan:r-1}));for(let e=r;e<t.length;++e){let r=["action"];e===l&&r.push("end-marker"),h.appendChild(P("th",t[e],r))}for(let e=1;e<r;++e)h.appendChild(P("th",t[e],"goto"));for(let l=0;l<i.length;++l){let n=e.createElement("tr");p.appendChild(n),n.appendChild(P("td",l));for(let e=r;e<t.length;++e)void 0===i[l][e]?n.appendChild(P("td",void 0,"error")):n.appendChild(P("td",x(i[l][e]),i[l][e].type));for(let e=1;e<r;++e)n.appendChild(P("td",i[l][e]))}n.appendChild(a)},this.renderParseSteps=t=>{if(t.innerHTML="",void 0===o)return;let r=e.createElement("table"),l=e.createElement("thead");r.appendChild(l);let n=e.createElement("tr");l.appendChild(n);let a=e.createElement("tbody");r.appendChild(a),n.appendChild(P("th","state stack")),n.appendChild(P("th","symbol stack")),n.appendChild(P("th","input")),n.appendChild(P("th","action")),n.appendChild(P("th","output")),o.forEach(t=>{let r=e.createElement("tr");a.appendChild(r),r.appendChild(P("td",e.createTextNode(t.stateStack.join(" ")))),r.appendChild(P("td",M(t.symbolStack))),r.appendChild(P("td",M(t.input))),r.appendChild(P("td",x(t.action),t.action.type)),r.appendChild(P("td","reduce"===t.action.type?w(t.action.rule):void 0))}),t.appendChild(r)},this.renderParseTree=e=>{if(e.innerHTML="",void 0===o)return;let t=H(b());void 0!==t&&e.appendChild(t)},// Public API for samples
this.sampleGrammar=()=>"S' G\nG E = E\nG id\nE E + T\nE T\nT T * id\nT id",this.sampleInput=()=>"id = id + id * id"}document.addEventListener("DOMContentLoaded",()=>{let t=new e(document),r=document.getElementById("grammar-text"),l=document.getElementById("input-text"),n={grammar:document.getElementById("grammar-container"),collection:document.getElementById("collection-container"),parseTable:document.getElementById("parse-table-container"),parseSteps:document.getElementById("parse-steps-container"),parseTree:document.getElementById("parse-tree-container")},a=()=>{Object.keys(n).forEach(e=>{n[e].innerHTML=""})},i=()=>{a(),t.createParser(r.value),t.renderGrammar(n.grammar),t.renderCollection(n.collection),t.renderParseTable(n.parseTable)},d=()=>{t.parse(l.value),t.renderParseSteps(n.parseSteps),t.renderParseTree(n.parseTree)};document.getElementById("create-parser").addEventListener("click",i),document.getElementById("parse").addEventListener("click",d),document.getElementById("show-example").addEventListener("click",()=>{r.value=t.sampleGrammar(),i(),l.value=t.sampleInput(),d()}),document.getElementById("clear").addEventListener("click",()=>{r.value="",l.value="",a(),t.clear()})})}();//# sourceMappingURL=index.12b7ec3c.js.map

//# sourceMappingURL=index.12b7ec3c.js.map
