/**
 * Created by gabrielcarrillo on 6/12/18.
 */

app.controller('loginController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";


    $scope.registerParent = function () {
        $location.url('registerParent')
    };

});