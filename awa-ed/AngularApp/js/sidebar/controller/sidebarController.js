/**
 * Created by gabrielcarrillo on 6/12/18.
 */

app.controller('sidebarController', function ($scope) {
    $scope.title = "ReaXium | Class Room Attendance";
    $scope.metaDescription = "";

    $scope.hideSidebar = false;

    $scope.$on('$locationChangeStart', function(event, next, current)
    {
        if (next.indexOf('login') > -1 || current.indexOf('login') > -1){
            $scope.hideSidebar = true;
        }
        else
        {
            $scope.hideSidebar = false;
        }
    });

});