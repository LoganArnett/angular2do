System.register("benchmarks_external/src/largetable/largetable_benchmark", ["angular2/src/test_lib/benchmark_util"], function($__export) {
  "use strict";
  var __moduleName = "benchmarks_external/src/largetable/largetable_benchmark";
  var getIntParameter,
      getStringParameter,
      bindAction,
      totalRows,
      totalColumns,
      benchmarkType;
  function main() {
    angular.bootstrap(document.querySelector('largetable'), ['app']);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      getIntParameter = $__m.getIntParameter;
      getStringParameter = $__m.getStringParameter;
      bindAction = $__m.bindAction;
    }],
    execute: function() {
      totalRows = getIntParameter('rows');
      totalColumns = getIntParameter('columns');
      benchmarkType = getStringParameter('benchmarkType');
      angular.module('app', []).config(function($compileProvider) {
        if ($compileProvider.debugInfoEnabled) {
          $compileProvider.debugInfoEnabled(false);
        }
      }).filter('noop', function() {
        return function(input) {
          return input;
        };
      }).directive('largetable', function() {
        return {
          restrict: 'E',
          templateUrl: 'largetable-js-template.html',
          controller: 'DataController'
        };
      }).controller('DataController', function($scope) {
        bindAction('#destroyDom', destroyDom);
        bindAction('#createDom', createDom);
        function destroyDom() {
          $scope.$apply(function() {
            $scope.benchmarkType = 'none';
          });
        }
        function createDom() {
          $scope.$apply(function() {
            $scope.benchmarkType = benchmarkType;
          });
        }
        var data = $scope.data = [];
        function iGetter() {
          return this.i;
        }
        function jGetter() {
          return this.j;
        }
        for (var i = 0; i < totalRows; i++) {
          data[i] = [];
          for (var j = 0; j < totalColumns; j++) {
            data[i][j] = {
              i: i,
              j: j,
              iFn: iGetter,
              jFn: jGetter
            };
          }
        }
      }).directive('baselineBindingTable', function() {
        return {
          restrict: 'E',
          link: function($scope, $element) {
            var i,
                j,
                row,
                cell,
                comment;
            var template = document.createElement('span');
            template.setAttribute('ng-repeat', 'foo in foos');
            template.classList.add('ng-scope');
            template.appendChild(document.createElement('span'));
            template.appendChild(document.createTextNode(':'));
            template.appendChild(document.createElement('span'));
            template.appendChild(document.createTextNode('|'));
            for (i = 0; i < totalRows; i++) {
              row = document.createElement('div');
              $element[0].appendChild(row);
              for (j = 0; j < totalColumns; j++) {
                cell = template.cloneNode(true);
                row.appendChild(cell);
                cell.childNodes[0].textContent = i;
                cell.childNodes[2].textContent = j;
                cell.ng3992 = 'xxx';
                comment = document.createComment('ngRepeat end: bar in foo');
                row.appendChild(comment);
              }
              comment = document.createComment('ngRepeat end: foo in foos');
              $element[0].appendChild(comment);
            }
          }
        };
      }).directive('baselineInterpolationTable', function() {
        return {
          restrict: 'E',
          link: function($scope, $element) {
            var i,
                j,
                row,
                cell,
                comment;
            var template = document.createElement('span');
            template.setAttribute('ng-repeat', 'foo in foos');
            template.classList.add('ng-scope');
            for (i = 0; i < totalRows; i++) {
              row = document.createElement('div');
              $element[0].appendChild(row);
              for (j = 0; j < totalColumns; j++) {
                cell = template.cloneNode(true);
                row.appendChild(cell);
                cell.textContent = '' + i + ':' + j + '|';
                cell.ng3992 = 'xxx';
                comment = document.createComment('ngRepeat end: bar in foo');
                row.appendChild(comment);
              }
              comment = document.createComment('ngRepeat end: foo in foos');
              $element[0].appendChild(comment);
            }
          }
        };
      });
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/benchmarks_external/src/largetable/largetable_benchmark.map

//# sourceMappingURL=./largetable_benchmark.map