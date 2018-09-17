app.controller('homeController', function ($scope, Webservice, $location, Constants) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";

    $scope.homeMenu = function () {
        $location.url('home')
    };

});

