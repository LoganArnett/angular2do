System.register("angular2/src/test_lib/utils", ["angular2/src/facade/collection", "angular2/src/facade/dom", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/test_lib/utils";
  var List,
      ListWrapper,
      DOM,
      isPresent,
      Log;
  function queryView(view, selector) {
    for (var i = 0; i < view.nodes.length; ++i) {
      var res = DOM.querySelector(view.nodes[i], selector);
      if (isPresent(res)) {
        return res;
      }
    }
    return null;
  }
  function dispatchEvent(element, eventType) {
    DOM.dispatchEvent(element, DOM.createEvent(eventType));
  }
  function el(html) {
    return DOM.firstChild(DOM.createTemplate(html).content);
  }
  $__export("queryView", queryView);
  $__export("dispatchEvent", dispatchEvent);
  $__export("el", el);
  return {
    setters: [function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      Log = $__export("Log", (function() {
        var Log = function Log() {
          this._result = [];
        };
        return ($traceurRuntime.createClass)(Log, {
          add: function(value) {
            ListWrapper.push(this._result, value);
          },
          fn: function(value) {
            var $__0 = this;
            return (function() {
              ListWrapper.push($__0._result, value);
            });
          },
          result: function() {
            return ListWrapper.join(this._result, "; ");
          }
        }, {});
      }()));
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/test_lib/utils.map

//# sourceMappingURL=./utils.map