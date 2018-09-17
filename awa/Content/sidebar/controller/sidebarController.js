app.controller('sidebarController', function($scope)
{
    $scope.loading = false;
    $scope.posts = JSON.parse(sessionStorage.getItem("posts"));

});