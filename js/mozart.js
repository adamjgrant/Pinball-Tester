var _$_decorated=function(e){var t=e._$.bind(e);return t.api=e.api,t.routes=e.routes,t.here=function(n,o){parent_component_name=e.scope.split('"')[1];var r=function(e){return e.dataset.component==parent_component_name?e:(parentScope=e.parentNode,r(parentScope))};return e.nodeScope=r(n),t.call(e,o)},t};"undefined"==typeof jQuery&&(window.$=function(e){return[].slice.call(document.querySelectorAll(e))}.bind(this)),String.prototype.interpolate=function(e){return this.replace(/#\{(.+?)\}/g,function(t,n){var o=e[n];return"string"==typeof o||"number"==typeof o?o:t})},Object.deepExtend=function(e,t){for(var n in t)t[n]&&t[n].constructor&&t[n].constructor===Object?(e[n]=e[n]||{},arguments.callee(e[n],t[n])):e[n]=t[n];return e},window.m$={};var Mozart=function(){this.scope=void 0,this.nodeScope=void 0};Mozart.prototype._$=function(e){if(e instanceof Mozart)return $(this.scope);var t=e?" "+e:"";return this.nodeScope?"undefined"==typeof jQuery?this.nodeScope.querySelectorAll(e):$(e).find(e):$(this.scope+t)},Mozart.prototype.api=function(e){for(var t in e){var n=this;this.api[t]=function(e){return this.api_fn.call(n,_$_decorated(n),e)}.bind({api_fn:e[t]})}},Mozart.prototype.routes=function(e){for(var t in e){var n=JSON.parse(JSON.stringify(e[t]));this.routes[t]=function(){var e=Array.prototype.slice.call(arguments),t=e[1],n=e[0],o={};return o.url=n.url.interpolate(t),o.data=n.data||{},o.method=n.method,o.data=Object.deepExtend(o.data,t.data),o}.bind(this,n)}},Mozart.prototype.events=function(e){this.events=e},Mozart.init=function(){var e=[];for(var t in window.m$){var n=m$[t],o=_$_decorated(n);if(!n instanceof Mozart)return;n.scope='[data-component~="'+t+'"]',e.push([n,o])}e.forEach(function(e){e[0].events.call(e[0],e[1])})},Mozart.clone=function(e){var t=new DOMParser,n=document.createElement("div");if(!e)return console.error("No <template> element provided");if("object"!=typeof e)return console.error("Element to clone expected to be a <template> element. Was a "+typeof e);n.append(document.importNode(e.content,!0));var o=t.parseFromString(n.innerHTML,"text/xml").documentElement,r=document.createElement("div");return r.appendChild(o),o=r.childNodes[0],"undefined"==typeof jQuery?o:$(o)};
