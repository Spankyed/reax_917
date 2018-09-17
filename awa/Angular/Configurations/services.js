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
var LocalStore = function(localStorageService)
{
    return {
        get: function (key) {
            return localStorageService.get(key);
        },
        //should return?
        add: function (key, val) {
            localStorageService.set(key, val);
        },

        remove: function (key) {
            return localStorageService.remove(key);
        },

        getLength: function () {
            return localStorageService.length();
        },

        getKeys: function () {
            return localStorageService.keys();
        },

        clearAll: function () {
            return localStorageService.clearAll();
        },

        setPrefix: function (prefix){
            localStorageService.setPrefix(prefix);
        }
    }
}

app.factory("Webservice", Webservice);
app.factory("LocalStore", LocalStore);

