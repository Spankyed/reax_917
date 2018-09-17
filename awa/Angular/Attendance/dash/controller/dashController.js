app.controller('dashController', function ($scope, Webservice, $location, Constants) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";

    $scope.dashMenu = function () {
        $location.url('dash')
    };

});

