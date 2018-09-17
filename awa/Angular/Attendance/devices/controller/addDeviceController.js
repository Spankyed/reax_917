/**
 * Created by gabrielcarrillo on 8/10/18.
 */

app.controller('addDeviceController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";


    $scope.newDevice = function () {
        $location.url('addDevice')
    };
});