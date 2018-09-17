/**
 * Created by gabrielcarrillo on 8/20/18.
 */

app.controller('allSchoolController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";

    $scope.current = 0; //inicia en el primer indice del wizard

    $scope.allSchoolView = function () {
        $location.url('allSchool')
    };


});