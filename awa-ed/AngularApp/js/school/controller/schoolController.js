/**
 * Created by gabrielcarrillo on 6/5/18.
 */

app.controller('schoolController', function ($scope, $location, $uibModal, confService) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";
    $scope.addSchool = function () {
        $location.url('addSchool')
    };

    //-------------------- Periods & Areas -------------------- 
    $scope.Skills = [];
    $scope.newSkills = ''
    $scope.Periods = [];
    $scope.newPeriods = ''
    /**
     * Add new item to list of items
     * @param {String} type type of items to push new item to
     */
    $scope.addItem = function (type){
        var title = ($scope['new'+ type] == '') ? (function (){ return 'New ' + type.charAt(0).toUpperCase() + type.slice(1, type.length-1)})() : $scope['new'+ type];
        var newItem = {'title': title, 'done': false}
        $scope[type].push(newItem)
    }
    $scope.deleteItem = function (index, type){
        $scope[type].splice(index, 1);
    }

    //-------------------- WIZARD --------------------
    $scope.current = 0; //inicia en el primer indice del wizard
    $scope.max = 10;
    $scope.wizard = {step: 1}
    $scope.random = function() {
        var value = Math.floor((Math.random() * 100) + 1);
        var type;

        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }

        $scope.showWarning = (type === 'danger' || type === 'warning');

        $scope.dynamic = value;
        $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
        $scope.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];

        for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
            var index = Math.floor((Math.random() * 4));
            $scope.stacked.push({
                value: Math.floor((Math.random() * 30) + 1),
                type: types[index]
            });
        }
    };
    $scope.randomStacked();

    //-------------------- Subjects (JS Tree) --------------------
    $scope.subjects = []; //subjects checked for roster
    
    $scope.add = function (){
        currentNode = $scope.Treeview.jstree("get_selected");
        if (currentNode.length > 0){
            //TODO: NEW NODES DO NOT HAVE AN ID!
            $scope.Treeview.jstree('create_node', currentNode[0], {text : "New Subject"}, 'last' , function(new_node){
                $scope.Treeview.jstree("open_node", currentNode[0]); //open parent node
                var inst = $.jstree.reference(new_node);
                inst.edit(new_node); //edit new node
            });
        } else {
            $scope.Treeview.jstree(true).create_node("#", {text : "New Subject"}, 'last') //add to root
        }
    }
    $scope.edit = function (){
        selectedNodes = $scope.Treeview.jstree("get_selected");
        if (selectedNodes.length > 0)
            $scope.Treeview.jstree().edit(selectedNodes[0]);
    }
    $scope.delete = function (){
        selectedNodes = $scope.Treeview.jstree("get_selected");
        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Delete Customer',
            headerText: 'Delete subject?',
            bodyText: 'Are you sure you want to delete this customer?'
        };
        if (selectedNodes.length > 0){
            console.log('deleting node')

            confService.showModal({}, modalOptions)


        }
    }

    var tree = function () {
        var subjects = function () {
            $scope.Treeview = $('#m_tree_subject');
            $scope.Treeview.jstree({
                'plugins': ["wholerow", "checkbox", "types"],
                'core': {
                    "check_callback": true, //magical property
                    "themes" : {
                        "responsive": false
                    },
                    'data': [{
                        "text": "Math (MA)",
                        "children": [{
                            "text": "MATh 1",
                            "state": {
                                "selected": true
                            }
                        }]
                    },
                        "Science (SC)"
                    ],
                    "attr": { "id": "node id", "class":"jstree-checked" }
                },
                checkbox: {
                    //three_state : false, // to avoid that fact that checking a node also check others
                    whole_node : false,  // to avoid checking the box just clicking the node
                    tie_selection : false // for checking without selecting and selecting without checking
                },
                "types" : {
                    "default" : {
                        "icon" : "fa fa-folder m--font-warning"
                    },
                    "file" : {
                        "icon" : "fa fa-file  m--font-warning"
                    }
                },
            });
        }
        return {
            //main function to initiate the module
            init: function () {
                subjects();
            }
        };
    }();

    jQuery(document).ready(function() {
        tree.init();
        //todo: figure out why events binded multiple times?
        $scope.Treeview.unbind("dblclick.jstree check_node.jstree uncheck_node.jstree") 
        //Check node when doublicked
        $scope.Treeview.bind("dblclick.jstree", function (event) {
            var tree = $(this).jstree();
            var node = tree.get_node(event.target);
            node.state.checked ? $scope.Treeview.jstree(true).uncheck_node(node) : $scope.Treeview.jstree(true).check_node(node);
        });
        // Add/remove subject in roster when checked/unchecked
        $scope.Treeview.bind("check_node.jstree uncheck_node.jstree", function(e, data) { 
            var node = data.node;
            var add = (node) => $scope.subjects.push(node)  
            var remove = (node) => {
                var ix = $scope.subjects.indexOf(node);
                $scope.subjects.splice(ix, 1);
            }
            node.state.checked ? add(node) : remove(node)
        });

    });
});

