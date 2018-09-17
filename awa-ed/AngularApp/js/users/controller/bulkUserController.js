/**
 * Created by gabrielcarrillo on 9/5/18.
 */

app.controller('bulkUserController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";


    $scope.bulkUserUpload = function () {
        $location.url('bulkUser')
    };

});