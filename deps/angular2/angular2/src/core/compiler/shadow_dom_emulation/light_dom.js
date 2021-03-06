System.register("angular2/src/core/compiler/shadow_dom_emulation/light_dom", ["rtts_assert/rtts_assert", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/lang", "../view", "../element_injector", "../viewport", "./content_tag"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/shadow_dom_emulation/light_dom";
  var assert,
      Element,
      Node,
      DOM,
      List,
      ListWrapper,
      isBlank,
      isPresent,
      View,
      ElementInjector,
      ViewPort,
      Content,
      SourceLightDom,
      DestinationLightDom,
      _Root,
      LightDom;
  function redistributeNodes(contents, nodes) {
    for (var i = 0; i < contents.length; ++i) {
      var content = contents[i];
      var select = content.select;
      var matchSelector = (function(n) {
        return DOM.elementMatches(n, select);
      });
      if (isBlank(select)) {
        content.insert(nodes);
        ListWrapper.clear(nodes);
      } else {
        var matchingNodes = ListWrapper.filter(nodes, matchSelector);
        content.insert(matchingNodes);
        ListWrapper.removeAll(nodes, matchingNodes);
      }
    }
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Element = $__m.Element;
      Node = $__m.Node;
      DOM = $__m.DOM;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      ElementInjector = $__m.ElementInjector;
    }, function($__m) {
      ViewPort = $__m.ViewPort;
    }, function($__m) {
      Content = $__m.Content;
    }],
    execute: function() {
      SourceLightDom = $__export("SourceLightDom", (function() {
        var SourceLightDom = function SourceLightDom() {};
        return ($traceurRuntime.createClass)(SourceLightDom, {}, {});
      }()));
      DestinationLightDom = $__export("DestinationLightDom", (function() {
        var DestinationLightDom = function DestinationLightDom() {};
        return ($traceurRuntime.createClass)(DestinationLightDom, {}, {});
      }()));
      _Root = (function() {
        var _Root = function _Root(node, injector) {
          this.node = node;
          this.injector = injector;
        };
        return ($traceurRuntime.createClass)(_Root, {}, {});
      }());
      LightDom = $__export("LightDom", (function() {
        var LightDom = function LightDom(lightDomView, shadowDomView, element) {
          assert.argumentTypes(lightDomView, View, shadowDomView, View, element, Element);
          this.lightDomView = lightDomView;
          this.shadowDomView = shadowDomView;
          this.nodes = DOM.childNodesAsList(element);
          this.roots = null;
        };
        return ($traceurRuntime.createClass)(LightDom, {
          redistribute: function() {
            var tags = this.contentTags();
            if (tags.length > 0) {
              redistributeNodes(tags, this.expandedDomNodes());
            }
          },
          contentTags: function() {
            return assert.returnType((this._collectAllContentTags(this.shadowDomView, [])), assert.genericType(List, Content));
          },
          _collectAllContentTags: function(view, acc) {
            var $__0 = this;
            assert.argumentTypes(view, View, acc, assert.genericType(List, Content));
            var eis = view.elementInjectors;
            for (var i = 0; i < eis.length; ++i) {
              var ei = eis[i];
              if (isBlank(ei))
                continue;
              if (ei.hasDirective(Content)) {
                ListWrapper.push(acc, ei.get(Content));
              } else if (ei.hasPreBuiltObject(ViewPort)) {
                var vp = ei.get(ViewPort);
                ListWrapper.forEach(vp.contentTagContainers(), (function(view) {
                  $__0._collectAllContentTags(view, acc);
                }));
              }
            }
            return assert.returnType((acc), assert.genericType(List, Content));
          },
          expandedDomNodes: function() {
            var res = [];
            var roots = this._roots();
            for (var i = 0; i < roots.length; ++i) {
              var root = roots[i];
              var ei = root.injector;
              if (isPresent(ei) && ei.hasPreBuiltObject(ViewPort)) {
                var vp = root.injector.get(ViewPort);
                res = ListWrapper.concat(res, vp.nodes());
              } else if (isPresent(ei) && ei.hasDirective(Content)) {
                var content = root.injector.get(Content);
                res = ListWrapper.concat(res, content.nodes());
              } else {
                ListWrapper.push(res, root.node);
              }
            }
            return assert.returnType((res), List);
          },
          _roots: function() {
            if (isPresent(this.roots))
              return this.roots;
            var viewInj = this.lightDomView.elementInjectors;
            this.roots = ListWrapper.map(this.nodes, (function(n) {
              return new _Root(n, ListWrapper.find(viewInj, (function(inj) {
                return inj.forElement(n);
              })));
            }));
            return this.roots;
          }
        }, {});
      }()));
      Object.defineProperty(LightDom, "parameters", {get: function() {
          return [[View], [View], [Element]];
        }});
      Object.defineProperty(LightDom.prototype._collectAllContentTags, "parameters", {get: function() {
          return [[View], [assert.genericType(List, Content)]];
        }});
      Object.defineProperty(redistributeNodes, "parameters", {get: function() {
          return [[assert.genericType(List, Content)], [assert.genericType(List, Node)]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/shadow_dom_emulation/light_dom.map

//# sourceMappingURL=./light_dom.map