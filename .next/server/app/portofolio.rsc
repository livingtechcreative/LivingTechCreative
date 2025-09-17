1:"$Sreact.fragment"
7:I[8393,[],""]
:HL["/_next/static/css/d9bcac48589b8964.css","style"]
:HL["/_next/static/css/6ac19d2a4a1eccb7.css","style"]
:HL["/_next/static/css/bbd093fe12be409f.css","style"]
2:Tb30,
              (function() {
                // Immediate error suppression
                var originalError = console.error;
                var originalWarn = console.warn;
                var originalLog = console.log;
                
                var extensionPatterns = [
                  'tx_attempts_exceeded',
                  'tx_ack_timeout',
                  'Failed to initialize messaging',
                  'host-console-events',
                  'host-network-events',
                  'host-dom-snapshot',
                  'pW.getSingleton',
                  'pq',
                  'p4',
                  'Object.p6',
                  'fM.getSingleton',
                  'fT',
                  'f$',
                  'Object.fV',
                  'cy.getSingleton',
                  'cb',
                  'cA',
                  'Object.cI',
                  'diagnostics',
                  'errors'
                ];
                
                function isExtensionError(message) {
                  var lowerMessage = message.toLowerCase();
                  return extensionPatterns.some(function(pattern) {
                    return lowerMessage.includes(pattern.toLowerCase());
                  });
                }
                
                console.error = function() {
                  var message = Array.prototype.join.call(arguments, ' ');
                  if (isExtensionError(message)) return;
                  originalError.apply(console, arguments);
                };
                
                console.warn = function() {
                  var message = Array.prototype.join.call(arguments, ' ');
                  if (isExtensionError(message)) return;
                  originalWarn.apply(console, arguments);
                };
                
                console.log = function() {
                  var message = Array.prototype.join.call(arguments, ' ');
                  if (isExtensionError(message)) return;
                  originalLog.apply(console, arguments);
                };
                
                window.addEventListener('unhandledrejection', function(event) {
                  var message = event.reason ? event.reason.toString() : '';
                  if (isExtensionError(message)) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }
                }, true);
                
                window.addEventListener('error', function(event) {
                  var message = event.message || '';
                  if (isExtensionError(message)) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }
                }, true);
              })();
            0:{"P":null,"b":"3M6gubGI7v3lkPxtJ3YHo","p":"","c":["","portofolio"],"i":false,"f":[[["",{"children":["portofolio",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/d9bcac48589b8964.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","link","1",{"rel":"stylesheet","href":"/_next/static/css/6ac19d2a4a1eccb7.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","link","2",{"rel":"stylesheet","href":"/_next/static/css/bbd093fe12be409f.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"en","className":"__variable_8e83e0 __variable_e0f4e5 font-sans","style":{"fontFamily":"Trap, sans-serif"},"children":[["$","head",null,{"children":[["$","script",null,{"src":"/error-suppression.js"}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"$2"}}]]}],"$L3"]}]]}],{"children":["portofolio","$L4",{"children":["__PAGE__","$L5",{},null,false]},null,false]},null,false],"$L6",false]],"m":"$undefined","G":["$7",[]],"s":false,"S":true}
8:I[5123,["820","static/chunks/820-603f449dacdca1c3.js","177","static/chunks/app/layout-ce07c3b5492501b3.js"],"default"]
9:I[7555,[],""]
a:I[1295,[],""]
b:I[4556,["820","static/chunks/820-603f449dacdca1c3.js","177","static/chunks/app/layout-ce07c3b5492501b3.js"],"default"]
c:I[894,[],"ClientPageRoot"]
d:I[5448,["820","static/chunks/820-603f449dacdca1c3.js","737","static/chunks/737-8ac426624f2ea147.js","874","static/chunks/874-88e24f0e286df0b2.js","25","static/chunks/25-5b5afc112b78f2d8.js","534","static/chunks/app/portofolio/page-24b96d4ed319d291.js"],"default"]
10:I[9665,[],"OutletBoundary"]
12:I[4911,[],"AsyncMetadataOutlet"]
14:I[9665,[],"ViewportBoundary"]
16:I[9665,[],"MetadataBoundary"]
17:"$Sreact.suspense"
3:["$","body",null,{"className":"min-h-screen bg-white","children":["$","$L8",null,{"children":[["$","$L9",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$La",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}],["$","$Lb",null,{}]]}]}]
4:["$","$1","c",{"children":[null,["$","$L9",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$La",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
5:["$","$1","c",{"children":[["$","$Lc",null,{"Component":"$d","searchParams":{},"params":{},"promises":["$@e","$@f"]}],null,["$","$L10",null,{"children":["$L11",["$","$L12",null,{"promise":"$@13"}]]}]]}]
6:["$","$1","h",{"children":[null,[["$","$L14",null,{"children":"$L15"}],null],["$","$L16",null,{"children":["$","div",null,{"hidden":true,"children":["$","$17",null,{"fallback":null,"children":"$L18"}]}]}]]}]
e:{}
f:"$5:props:children:0:props:params"
15:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
11:null
19:I[8175,[],"IconMark"]
13:{"metadata":[["$","title","0",{"children":"LivingTech Creative"}],["$","meta","1",{"name":"description","content":"Created with Creative Engineering"}],["$","meta","2",{"name":"generator","content":"v0.dev"}],["$","link","3",{"rel":"icon","href":"/favicon.ico","type":"image/x-icon","sizes":"16x16"}],["$","$L19","4",{}]],"error":null,"digest":"$undefined"}
18:"$13:metadata"
