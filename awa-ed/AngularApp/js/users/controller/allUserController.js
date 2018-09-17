/**
 * Created by gabrielcarrillo on 5/24/18.
 */
app.controller('allUserController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";


    $scope.allUser = function () {
        $location.url('allUsers')
    };
});