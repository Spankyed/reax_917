app.controller('adminController', 
function($scope, $location, LocalStore, mockSubjects, mockAreas, mockGrades, mockPeriods, ivhTreeviewMgr, ivhTreeviewBfs, ivhTreeviewOptions){
    
    $scope.loading = false;
    $scope.gotoAdmin = function () {
        $location.url('admin')
    };

    //----------------------------\\ ***** AREAS GRADES & PERIODS ***** //------------------------------
    $scope.addType;
    $scope.editType;
    $scope.Areas = mockAreas;
    $scope.Grades = mockGrades;
    $scope.Periods = mockPeriods;
    $scope.Grade = {value: 'New Grade', checked: true}; //placeholder variable for adding grade
    $scope.Area = {value: 'New Area', checked: true};
    $scope.Period = {value: 'New Period', checked: true};

    /**
     * Set isSelected property of item in list
     * @param {String} type type of items to select
     * @param {String} item item to be selected 
     */
    $scope.itemSelect = function (type, item) {        
        var index = $scope[type].indexOf(item);
        $scope[type][index].isSelected = !$scope[type][index].isSelected; //switch boolean value
    }

    /**
     * Add new item to list of items
     * @param {String} type type of items to push new item to
     */
    $scope.add = function(type){
        //.push(new Item(area))
        if (type == 'area'){
            $scope.Areas.push($scope.Area);
            $scope.Area = {id: 0, value: 'New Area', checked: true}; //restore add template to defaults
            $scope.addType = 'none';
        } else if (type == 'grade'){
            $scope.Grades.push($scope.Grade);
            $scope.Grade = {id: 0, value: 'New Grade', checked: true};
            $scope.addType = 'none';
        } else if (type == 'period'){
            $scope.Periods.push($scope.Period);
            $scope.Period = {id: 0, value: 'New Period', checked: true};
            $scope.addType = 'none';
        }
    };

    /**
     * Set edit indicator to none to stop editing, return to regular tree
     */
    $scope.edit = function(){
        $scope.editType = 'none'; //item to edit is binded to input model, no need to set; item retains input value
    };

    /**
     * Remove selected item from list
     * @param {String} type type of item to remove from corresponding list 
     */
    $scope.remove = function(type){
        if($scope.editType != type){ //If not editing
            var items = $scope[type]
            for (i = 0; i < items.length; i++){
                if(items[i].isSelected){
                    //console.log('removing items', item[i])
                    items.splice(i ,1); 
                    i = i-1; //loop is off by one after splice, length is changed 
                }
            }
        }
    }

    /**
     * Indicate which list of items we want to add to
     * @param {String} type type of items to add to 
     */
    $scope.adding = function(type){
        if (type == 'Areas'){
            $scope.addType = 'Areas'
        } else if (type == 'Grades') {
            $scope.addType = 'Grades'
        } else if (type == 'Periods') {
            $scope.addType = 'Periods'
        }
        //type == 'areas' ? $scope.addType = 'areas' : $scope.addType = 'grades'; 
        //console.log('addType', $scope.addType)
    };

    /**
     * Set an indicator for which list of items we want to edit
     * @param {String} type type of item to edit 
     */
    $scope.editing = function(type){
        
        if (type == 'Areas'){
            if($scope[type].length > 0){
                if(checkOneSelected()){
                    $scope.editType = ($scope.editType == 'Areas') ? 'none ': 'Areas'
                }
            }
        } else if (type == 'Grades') {
            if($scope[type].length > 0){
                if(checkOneSelected()){
                    $scope.editType = ($scope.editType == 'Grades') ? 'none ': 'Grades'
                }
            }
        } else if (type == 'Periods') {
            if($scope[type].length > 0){
                if(checkOneSelected()){
                    $scope.editType = ($scope.editType == 'Periods') ? 'none ': 'Periods'
                }
            }
        } else { //also editing subjects here
            //console.log('editing subj.',$scope.selected)
            if($scope.selected.length > 0){
                //change cancer namespace 
                ivhTreeviewMgr.stopEdit($scope.list, $scope.options)
                if(!$scope.cancer){ $scope.cancer = {} } 
                $scope.cancer.editType = ($scope.cancer.editType == 'Subjects') ? 'none ': 'Subjects'
                //console.log('edittype',$scope.cancer.editType)
            }

        }
        function checkOneSelected(){
            var selected = $scope[type].filter(function(c){ return c.isSelected;})
            
            return (selected.length > 0) ? true : false
        }
    };

    // ------------------------\\ ***** SUBJECTS (IVH-TREEVIEW) ***** //-----------------------------
    $scope.list = mockSubjects; //LocalStore.get('Tree') 
    $scope.selected = []; //used for add/editing/deleting subjects
    $scope.query; //string used to search tree
    $scope.options = { //IVH tree configuration
        idAttribute: 'id',
        //labelAttribute: 'title', //issue with ng databinding when using different label attribute
        childrenAttribute: 'items',
        twistieCollapsedTpl: '<i class="fa fa-caret-right"></i>',
        twistieExpandedTpl: '<i class="fa fa-caret-down"></i>',
        twistieLeafTpl: '- '
    } 

    /**
     * Add subject to last item in selected array
    */
    $scope.addSubject = function (){
        //only adds to last item in $scope.selected array
        var last = $scope.selected[$scope.selected.length-1];
        //console.log('last selected', last)
        var root = $scope.list;

        ivhTreeviewMgr.stopEdit(root, $scope.options)

        //If we are not editing subjecs
        if(Object($scope.cancer).editType != "Subjects"){
            if ($scope.selected.length > 0){ //if subject is selected spawn child
                spawn(last)
            } else { //else we spawn subject on tree root
                root.push({
                    id: root.length + 1,
                    label: 'New',
                    //mSelected: true,
                    selected: true,
                    editme: true //should node be editable.
                });
                //console.log('new node', root[root.length])
            }
        } else {
            return false;
        }

        function spawn (nodeSire) {
            var cont = true;
            var opts = $scope.options;
            ivhTreeviewBfs(root, opts,function(node) {
              if(node.id === nodeSire.id) {
                cont = false;
                ivhTreeviewMgr.expand(root, node, opts)
                node.items = node.items || [];
                node.items.unshift({
                    id: Number(node.id.toString() + (node.items.length+1)), //should not unshift(put first visually) since we are setting id according to children length,  
                    label: 'New',
                    //mSelected: true,
                    selected:true,
                    editme: true
                  });
                  //node.mSelected = true; //how is it set to false?
                  
                  //console.log(node.mSelected)
                //ivhTreeviewMgr.validate(root);
              }
              return cont;
            });
          };
    }

    /**
     * Removes all nodes in $scope.selected[] from the subjects tree, if not editing
     */
    $scope.removeSubject = function (){
        var sel = $scope.selected;
        //$scope.cancer.editType = 'none'; //submit edit handler to stop editing while deleting --Maria
        //alternatively can just check if we are editing before deleting
        ivhTreeviewMgr.stopEdit($scope.list, $scope.options)

        if (sel.length > 0 && Object($scope.cancer).editType != 'Subjects'){
            //console.log('deleting', $scope.selected)
            kill(sel)//use IIFE
            function kill(nodes) {
                var cont = true;
                var opts = $scope.options;
                var root = $scope.list;
                ivhTreeviewBfs(root, opts, function(node, parents) {
                    nodes.forEach(function(n){
                        if(node.id === n.id) {
                            cont = false;
                            if(parents.length > 0) {
                                var nIx = parents[0].items.indexOf(node);
                                parents[0].items.splice(nIx, 1);
                                ivhTreeviewMgr.validate(root);
                            } else {
                                var nIx = root.indexOf(node);
                                root.splice(nIx, 1);
                                ivhTreeviewMgr.validate(root);
                            }
                        }
                    })
                return cont;//stop ivhTreeviewBfs 
                });
                $scope.selected = []; //empty selected array
            };        
        }
    }

    /* $scope.editSubject hardcoded into library- trvw.edit()
       treeview component scoped to ivh library, 
    */

    /**
     * Expand matched nodes when searching, restore to previously expand state 
     *
     * @param {String} query Search string entered by user
     */
    $scope.expanded = false
    $scope.onFilterChange = function (query){
        var root = $scope.list,
            opts = ivhTreeviewOptions(),
            expandAttr = opts.expandedAttribute;
        //non-empty (kinda)*
        if(1 === query.length) { //gets hit coming and going
            if ($scope.expanded == false){
                ivhTreeviewBfs(root, function(node) {
                    node.savedExpandedState = node[expandAttr];
                });
            }
            $scope.expanded = true;
            ivhTreeviewMgr.expandRecursive(root);
            
        }
        //empty
        if(query.length < 1) {
            $scope.expanded = false;
            ivhTreeviewBfs(root, function(node) {
              node[expandAttr] = node.savedExpandedState;
            });
        }
    }

    //----------------------------\\ ***** ADMINISTRATIVE FUNCTIONS ***** //------------------------------
    /**
     * Save item to Local Store 
     * @param {String} type What object to save in Local Store 
     */
    $scope.save = function(type){
        var subs = [];
        var opts = $scope.options;
        var root = $scope.list;
        ivhTreeviewBfs(root, opts, function(node, parents) {
            if(node.selected === true) {
                subs.push(node)
            }
        });
        //Sort Subjects to parent->child
        /*subs.sort(function(a, b) {

            if(a.id > b.id ){
                return true;
            } else if(Number(String(a)[0]) > Number(String(b)[0])) {
                console.log('holy sht that worked')
                return true;
            }
        })*/

        LocalStore.add('Tree', root); // used to regenerate the admin page
        LocalStore.add('Subjects', subs); // used to populate dropdowns on classes and users page
        LocalStore.add('Grades', $scope['Grades']);
        LocalStore.add('Areas', $scope['Areas']);
    }

    /**
     * Get item from Local Store 
     *
     * @param {String} type What object to return from Local Store 
     */
    $scope.getStore = function(type){   
        $scope.list = LocalStore.get('Tree');
        $scope['Grades'] = LocalStore.get('Grades');
        $scope['Areas'] = LocalStore.get('Areas');
    }

    $scope.getStore();

});

//Focus <input/> for subject edit
app.directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
      //scope: true,   // optionally create a child scope
      link: function (scope, element, attrs) {
          var model = $parse(attrs.focusMe);
          scope.$watch(model, function (value) {
              //console.log('value=', value);
              if (value === true) {
                //console.log('focusing', element[0]);
                  $timeout(function () {
                      element[0].focus();
                  });
              }
          });
      }
  };}]);
