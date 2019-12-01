"use strict"
define("ast-viz/adapters/-json-api",["exports","@ember-data/adapter/json-api"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-viz/app",["exports","ast-viz/resolver","ember-load-initializers","ast-viz/config/environment"],(function(e,t,r,n){function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var s=function(e){function r(){var e,l;(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,r)
for(var s=arguments.length,d=new Array(s),f=0;f<s;f++)d[f]=arguments[f]
return l=function(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?a(e):t}(this,(e=i(r)).call.apply(e,[this].concat(d))),u(a(l),"modulePrefix",n.default.modulePrefix),u(a(l),"podModulePrefix",n.default.podModulePrefix),u(a(l),"Resolver",t.default),l}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(r,Ember.Application),r}()
e.default=s,(0,r.default)(s,n.default.modulePrefix)})),define("ast-viz/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-viz/components/vis-network",["exports","vis-network/standalone/esm/vis-network","recast","ast-node-finder"],(function(e,t,r,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=[{id:1,label:"Program"},{id:2,label:"Body"}],i=[{from:1,to:2}],a={},l=Ember.Component.extend({theme:"solarized light",mode:"javascript",code:"let a = 1; hello(); foo.bar();",init:function(){this._super.apply(this,arguments)},didInsertElement:function(){this._super.apply(this,arguments)
var e="\nlet a = 1;\nhello();\nfoo.bar();\n"
this.buildTree(e)},addQuery:function(e,t){var r=""
switch(t.type){case"VariableDeclarator":r="\n            root.find(j.VariableDeclarator, {\n            id: { name: '".concat(t.id.name,"' }\n            })\n            ")
break
case"CallExpression":r="\n            root.find(j.CallExpression, {\n            callee: { name: '".concat(t.callee.name,"' }\n            })\n            "),r=(0,n.findQuery)(t)
break
default:console.log("addQuery => ",t.type)}a[e]=r},createNode:function(e,t){var r=t+1,n={id:r,label:e.type},a={from:t,to:r}
this.addQuery(r,e),o.push(n),i.push(a)},buildTree:function(e){var n=this,l=(0,r.parse)(e)
console.log(l)
var u=2
l.program.body.forEach((function(e){var t=++u
switch(o.push({id:t,label:e.type}),i.push({from:2,to:t}),e.type){case"VariableDeclaration":e.declarations.forEach((function(e){n.createNode(e,u++)}))
break
case"ExpressionStatement":n.createNode(e.expression,u++)
break
default:console.log("buildTree => ",e.type)}}))
var s=new t.DataSet(o),d=new t.DataSet(i),f=document.getElementById("mynetwork"),c={nodes:s,edges:d}
new t.Network(f,c,{nodes:{shape:"box"},edges:{arrows:"to"},layout:{hierarchical:{direction:"UD"}}}).on("selectNode",(function(e){console.log("selectNode Event:",e),console.log(a[e.nodes[0]]),n.set("transform",a[e.nodes[0]])}))}})
e.default=l})),define("ast-viz/controllers/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({theme:"solarized light"})
e.default=t})),define("ast-viz/controllers/index",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({})
e.default=t})),define("ast-viz/helpers/app-version",["exports","ast-viz/config/environment","ember-cli-app-version/utils/regexp"],(function(e,t,r){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=t.default.APP.version,i=n.versionOnly||n.hideSha,a=n.shaOnly||n.hideVersion,l=null
return i&&(n.showExtended&&(l=o.match(r.versionExtendedRegExp)),l||(l=o.match(r.versionRegExp))),a&&(l=o.match(r.shaRegExp)),l?l[0]:o}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var o=Ember.Helper.helper(n)
e.default=o})),define("ast-viz/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-viz/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-viz/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ast-viz/config/environment"],(function(e,t,r){var n,o
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r.default.APP&&(n=r.default.APP.name,o=r.default.APP.version)
var i={name:"App Version",initialize:(0,t.default)(n,o)}
e.default=i})),define("ast-viz/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=r})),define("ast-viz/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],(function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n})),define("ast-viz/initializers/export-application-global",["exports","ast-viz/config/environment"],(function(e,t){function r(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var r
if("undefined"!=typeof window)r=window
else if("undefined"!=typeof global)r=global
else{if("undefined"==typeof self)return
r=self}var n,o=t.default.exportApplicationGlobal
n="string"==typeof o?o:Ember.String.classify(t.default.modulePrefix),r[n]||(r[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete r[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=r,e.default=void 0
var n={name:"export-application-global",initialize:r}
e.default=n})),define("ast-viz/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"ember-data",initialize:t.default}
e.default=r})),define("ast-viz/resolver",["exports","ember-resolver"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-viz/router",["exports","ast-viz/config/environment"],(function(e,t){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function o(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var l=function(e){function l(){var e,i;(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,l)
for(var u=arguments.length,s=new Array(u),d=0;d<u;d++)s[d]=arguments[d]
return i=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?o(e):t}(this,(e=n(l)).call.apply(e,[this].concat(s))),a(o(i),"location",t.default.locationType),a(o(i),"rootURL",t.default.rootURL),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(l,Ember.Router),l}()
e.default=l,l.map((function(){}))})),define("ast-viz/routes/index",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t})),define("ast-viz/serializers/-default",["exports","@ember-data/serializer/json"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-viz/serializers/-json-api",["exports","@ember-data/serializer/json-api"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-viz/serializers/-rest",["exports","@ember-data/serializer/rest"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-viz/services/code-mirror",["exports","ivy-codemirror/services/code-mirror"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-viz/templates/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"FhLX4HRh",block:'{"symbols":[],"statements":[[7,"h1",true],[8],[0,"ast-viz"],[9],[0,"\\n"],[1,[22,"outlet"],false]],"hasEval":false}',meta:{moduleName:"ast-viz/templates/application.hbs"}})
e.default=t})),define("ast-viz/templates/components/vis-network",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"nu1yezZ5",block:'{"symbols":[],"statements":[[7,"div",true],[10,"class","grid-row"],[8],[0,"\\n"],[7,"div",true],[10,"id","editor"],[8],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options","valueUpdated"],[[24,["code"]],[28,"hash",null,[["lineNumbers","mode","matchBrackets","theme"],[true,[24,["mode"]],true,[24,["theme"]]]]],[28,"action",[[23,0,[]],[28,"mut",[[24,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["transform"]],[28,"hash",null,[["lineNumbers","mode","theme","foldGutter","readOnly"],[true,[24,["mode"]],[24,["theme"]],true,true]]]]]],false],[0,"\\n"],[9],[0,"\\n"],[7,"div",true],[10,"id","mynetwork"],[8],[9],[0,"\\n"],[9]],"hasEval":false}',meta:{moduleName:"ast-viz/templates/components/vis-network.hbs"}})
e.default=t})),define("ast-viz/templates/index",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"Oz6L4RLz",block:'{"symbols":[],"statements":[[5,"vis-network",[],[[],[]]]],"hasEval":false}',meta:{moduleName:"ast-viz/templates/index.hbs"}})
e.default=t})),define("ast-viz/transforms/boolean",["exports","@ember-data/serializer/-private"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.BooleanTransform}})})),define("ast-viz/transforms/date",["exports","@ember-data/serializer/-private"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.DateTransform}})})),define("ast-viz/transforms/number",["exports","@ember-data/serializer/-private"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.NumberTransform}})})),define("ast-viz/transforms/string",["exports","@ember-data/serializer/-private"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.StringTransform}})})),define("ast-viz/config/environment",[],(function(){try{var e="ast-viz/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),r={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}})),runningTests||require("ast-viz/app").default.create({name:"ast-viz",version:"0.0.0+6ace7dd9"})
