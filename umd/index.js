!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).VanillaMarkdown=t()}(this,function(){"use strict";return function(){var i=this;this.eventList={},this.next=function(n){Object.keys(i.eventList).forEach(function(e){var t=i.eventList[e];t&&t(n)})},this.subscribe=function(t){var e=Date.now()+Math.random();return i.eventList[e]=t,{unsubscribe:function(){delete i.eventList[e]},next:function(e){t(e)}}}}});
//# sourceMappingURL=index.js.map
