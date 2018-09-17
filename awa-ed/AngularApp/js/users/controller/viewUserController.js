/**
 * Created by gabrielcarrillo on 8/1/18.
 */

app.controller('viewUserController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";


    $scope.viewUserInformation = function () {
        $location.url('viewUser')
    };


});