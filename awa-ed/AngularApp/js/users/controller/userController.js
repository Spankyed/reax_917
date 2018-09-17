app.controller('userController', function ($scope, $location) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";


    $scope.myUser = function () {
        $location.url('myUsers')
    };

});