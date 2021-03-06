//Directiva para el Checklist

app.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
    // contains
    function contains(arr, item, comparator) {
        if (angular.isArray(arr)) {
            for (var i = arr.length; i--;) {
                if (comparator(arr[i], item)) {
                    return true;
                }
            }
        }
        return false;
    }

    // add
    function add(arr, item, comparator) {
        arr = angular.isArray(arr) ? arr : [];
        if(!contains(arr, item, comparator)) {
            arr.push(item);
        }
        return arr;
    }

    // remove
    function remove(arr, item, comparator) {
        if (angular.isArray(arr)) {
            for (var i = arr.length; i--;) {
                if (comparator(arr[i], item)) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        return arr;
    }

    // http://stackoverflow.com/a/19228302/1458162
    function postLinkFn(scope, elem, attrs) {
        // exclude recursion, but still keep the model
        var checklistModel = attrs.checklistModel;
        attrs.$set("checklistModel", null);
        // compile with `ng-model` pointing to `checked`
        $compile(elem)(scope);
        attrs.$set("checklistModel", checklistModel);

        // getter / setter for original model
        var getter = $parse(checklistModel);
        var setter = getter.assign;
        var checklistChange = $parse(attrs.checklistChange);
        var checklistBeforeChange = $parse(attrs.checklistBeforeChange);

        // value added to list
        var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;


        var comparator = angular.equals;

        if (attrs.hasOwnProperty('checklistComparator')){
            if (attrs.checklistComparator[0] == '.') {
                var comparatorExpression = attrs.checklistComparator.substring(1);
                comparator = function (a, b) {
                    return a[comparatorExpression] === b[comparatorExpression];
                };

            } else {
                comparator = $parse(attrs.checklistComparator)(scope.$parent);
            }
        }

        // watch UI checked change
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
                scope[attrs.ngModel] = contains(getter(scope.$parent), value, comparator);
                return;
            }

            setValueInChecklistModel(value, newValue);

            if (checklistChange) {
                checklistChange(scope);
            }
        });

        function setValueInChecklistModel(value, checked) {
            var current = getter(scope.$parent);
            if (angular.isFunction(setter)) {
                if (checked === true) {
                    setter(scope.$parent, add(current, value, comparator));
                } else {
                    setter(scope.$parent, remove(current, value, comparator));
                }
            }

        }

        // declare one function to be used for both $watch functions
        function setChecked(newArr, oldArr) {
            if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
                setValueInChecklistModel(value, scope[attrs.ngModel]);
                return;
            }
            scope[attrs.ngModel] = contains(newArr, value, comparator);
        }

        // watch original model change
        // use the faster $watchCollection method if it's available
        if (angular.isFunction(scope.$parent.$watchCollection)) {
            scope.$parent.$watchCollection(checklistModel, setChecked);
        } else {
            scope.$parent.$watch(checklistModel, setChecked, true);
        }
    }

    return {
        restrict: 'A',
        priority: 1000,
        terminal: true,
        scope: true,
        compile: function(tElement, tAttrs) {
            if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') && (tElement[0].tagName !== 'MD-CHECKBOX') && (!tAttrs.btnCheckbox)) {
                throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
            }

            if (!tAttrs.checklistValue && !tAttrs.value) {
                throw 'You should provide `value` or `checklist-value`.';
            }

            // by default ngModel is 'checked', so we set it if not specified
            if (!tAttrs.ngModel) {
                // local scope var storing individual checkbox model
                tAttrs.$set("ngModel", "checked");
            }

            return postLinkFn;
        }
    };

}]);

app.directive('fade', ['$animate', '$interval', function($animate, $interval) {
    return function ($scope, element, attrs) {
        $interval(function () {
            $animate.enter(element, element.parent());
            $scope.headline = $scope.next();
            //$animate.leave(element);
        }, 6000);
    }
}]);


// directivas para las tabs
app.directive('deseTabs', function() {
    return {
        scope: true,
        replace: true,
        restrict: 'E',
        transclude: true,
        template: ' \
<div class="m-portlet__head-tools"> \
   <div  class=" nav nav-tabs m-tabs m-tabs-line   m-tabs-line--primary bg-tabs"role="tablist"> \
    <div class="nav-item m-tabs__item " ng-repeat="tab in tabs" \
        ng-class="{ active: currentTab == $index }"> \
      <a class="nav-link m-tabs__link " data-toggle="tab" ng-click="selectTab($index)"> \
        {{tab}} \
      </a> \
    </div> \
  </div> \
  <div class="contained" ng-transclude></div> \
</div>',
        controller: function($scope) {
            $scope.currentTab = 0;

            $scope.tabs = [];

            $scope.selectTab = function(index) {
                $scope.currentTab = index;
            };

            return $scope;
        }
    }
})

app.directive('datTab', function() {
    return {
        require: '^deseTabs',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        template: '<li ng-show="showTab()" ng-transclude></li>',
        link: function(scope, element, attrs, deseTabs) {
            var tabId = deseTabs.tabs.length;

            scope.showTab = function() {
                return tabId == deseTabs.currentTab;
            };

            deseTabs.tabs.push(attrs.datHeading);
        }
    }
});

// app.directive('confModal', ['$modal', function ($modal) {

//     return {
//         restrict: 'E',
//         scope: {
//             textAlert: '@'
//         },
//         link: function (scope, elm, attrs) {

//             scope.data = {
//                 textAlert: scope.textAlert || 'text'
//             }

//             var ModalInstanceCtrl = function ($scope, $modalInstance, data) {
//                 console.log(data);
//                 $scope.data = data;
//                 $scope.close = function () {
//                     $modalInstance.close($scope.data);
//                 };
//             };

//             elm.parent().bind("click", function (e) {
//                 scope.open();
//             });

//             scope.open = function () {
//                 var modalInstance = $modal.open({
//                     templateUrl: '<div></div>',
//                     controller: ModalInstanceCtrl,
//                     backdrop: true,
//                     keyboard: true,
//                     backdropClick: true,
//                     size: 'lg',
//                     resolve: {
//                         data: function () {
//                             return scope.data;
//                         }
//                     }
//                 });

//                 modalInstance.result.then(function (selectedItem) {
//                     scope.selected = selectedItem;
//                 }, function () {
//                     console.log('Modal dismissed at: ' + new Date());
//                 });
//             }

//         }
//     }
// }])