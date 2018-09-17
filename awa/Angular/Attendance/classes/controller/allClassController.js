/**
 * Created by gabrielcarrillo on 7/3/18.
 */

app.controller('allClassController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";

    $scope.current = 0; //inicia en el primer indice del wizard

    $scope.allClass = function () {
        $location.url('allClass')
    };

    // se agregan areas automaticamente

    $scope.skills = [];

    $scope.addSkill = function() {
        $scope.skills.push({'title': $scope.newSkill, 'done':false})
        $scope.newSkill = ''
    }

    $scope.deleteSkill = function(index) {
        $scope.skills.splice(index, 1);
    }

    // se agregan periodos automaticamente

    $scope.periods = [];

    $scope.addPeriods = function() {
        $scope.periods.push({'title': $scope.newPeriods, 'done':false})
        $scope.newPeriods = ''
    }

    $scope.deletePeriods = function(index) {
        $scope.periods.splice(index, 1);
    }

    //WIZARD

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

});