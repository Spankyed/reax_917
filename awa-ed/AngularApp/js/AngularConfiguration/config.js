app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'AngularApp/templates/login/registerParent.html',
            controller: 'loginController'
        })
        .when('/home', {
            templateUrl: 'AngularApp/templates/home/home.html',
            controller: 'homeController'
        })
        .when('/allUsers', {
            templateUrl: 'AngularApp/templates/users/allUsers.html',
            controller: 'allUserController'
        })
        .when('/myUsers', {
            templateUrl: 'AngularApp/templates/users/myUsers.html',
            controller: 'userController'
        })
        .when('/viewUser', {
            templateUrl: 'AngularApp/templates/users/viewUser.html',
            controller: 'viewUserController'
        })
        .when('/bulkUser', {
            templateUrl: 'AngularApp/templates/users/bulkUser.html',
            controller: 'bulkUserController'
        })
        .when('/addSchool', {
            templateUrl: 'AngularApp/templates/school/addSchool.html',
            controller: 'schoolController'
        })
        .when('/allSchool', {
            templateUrl: 'AngularApp/templates/school/allSchool.html',
            controller: 'allSchoolController'
        })
        .when('/addClass', {
            templateUrl: 'AngularApp/templates/myClass/addClass.html',
            controller: 'addClassController'
        })
        .when('/allClass', {
            templateUrl: 'AngularApp/templates/myClass/allClass.html',
            controller: 'allClassController'
        })
        .when('/allDevice', {
            templateUrl: 'AngularApp/templates/Device/allDevice.html',
            controller: 'allDeviceController'
        })
        .when('/addDevice', {
            templateUrl: 'AngularApp/templates/Device/addDevice.html',
            controller: 'addDeviceController'
        })
        .otherwise({
            redirectTo: '/home'
        })

}]);