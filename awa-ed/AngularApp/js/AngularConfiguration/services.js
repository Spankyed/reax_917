var Webservice = function($http, Constants)
{

    function Get(url)
    {
        return $http.get(Constants.urlServices + url).then(DefaultSuccessFunction, DefaultErrorFunction);
    }

    function GetJSON(url)
    {
        return $http.get(url).then(DefaultSuccessFunction, DefaultErrorFunction);
    }

    function Post(url, parameters)
    {
        return $http.post(Constants.urlServices + url, parameters).then(DefaultSuccessFunction, DefaultErrorFunction);
    }

    function DefaultSuccessFunction(data)
    {
        if(data == null || data.status != 200)
        {
            DefaultErrorFunction(data);
        }
        else if(data.status == 200)
        {
            return data.data;
        }
    }

    function DefaultErrorFunction(data)
    {
        var error =
            {
                "message": "",
                "success": false
            };
        if(data == null)
        {
            error.message = "Error, compruebe su conexión";
        }
        else if(data.status == 404)
        {
            error.message = "No se encontró el recurso.";
        }
        return error;
    }

    return {
        Get: Get,
        GetJSON: GetJSON,
        Post: Post
    };
};

app.factory("Webservice", Webservice);


app.service('confService',['$uibModal', function ($uibModal) {

    var modalDefaults = {
        templateUrl: 'AngularApp/templates/confirm/confModal.html',
        resolve: {
            data: function () {
                console.log('tryna resolve stuff',this)
                return modalOptions;
            }
        }
    };

    var modalOptions = {
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $uibModalInstance.dismiss('cancel');
                };
            };
        }

        return $uibModal.open(tempModalDefaults);
    };

}]);