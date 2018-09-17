/**
 * Created by gabrielcarrillo on 8/10/18.
 */

app.controller('allDeviceController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";


    $scope.deviceList = function () {
        $location.url('allDevice')
    };
});