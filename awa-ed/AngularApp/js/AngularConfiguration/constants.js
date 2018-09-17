var host = window.location.host;
var protocol = window.location.protocol;
var HOST = { "CURRENT": protocol + "//" + host + "/" };

app.constant('HOST', HOST);

app.constant('Constants' , {

    'urlJSON': "AngularApp/js/", //LOCAL
    'urlServices': HOST.CURRENT + ""
});