app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'Angular/login/templates/registerParent.html',
            controller: 'loginController'
        })
        .when('/dash', {
            templateUrl: 'Angular/Attendance/dash/templates/dash.html',
            controller: 'dashController'
        })
        .when('/allUsers', {
            templateUrl: 'Angular/Attendance/users/templates/allUsers.html',
            controller: 'allUserController'
        })
        .when('/myUsers', {
            templateUrl: 'Angular/Attendance/users/templates/myUsers.html',
            controller: 'userController'
        })
        .when('/viewUser', {
            templateUrl: 'Angular/Attendance/users/templates/viewUser.html',
            controller: 'viewUserController'
        })
        .when('/addSchool', {
            templateUrl: 'Angular/Attendance/schools/templates/addSchool.html',
            controller: 'schoolController'
        })
        .when('/allSchool', {
            templateUrl: 'Angular/Attendance/schools/templates/allSchool.html',
            controller: 'allSchoolController'
        })
        .when('/addClass', {
            templateUrl: 'Angular/Attendance/classes/templates/addClass.html',
            controller: 'addClassController'
        })
        .when('/allClass', {
            templateUrl: 'Angular/Attendance/classes/templates/allClass.html',
            controller: 'allClassController'
        })
        .when('/allDevice', {
            templateUrl: 'Angular/Attendance/devices/templates/allDevice.html',
            controller: 'allDeviceController'
        })
        .when('/addDevice', {
            templateUrl: 'Angular/Attendance/devices/templates/addDevice.html',
            controller: 'addDeviceController'
        })
        .when('/admin', {
            templateUrl: 'Angular/Attendance/Admin/templates/admin.html',
            controller: 'adminController'
        })
        .otherwise({
            redirectTo: '/dash'
        })

}]);