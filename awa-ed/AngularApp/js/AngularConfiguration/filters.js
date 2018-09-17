//Directiva para el salto de linea
app.filter('paragraph', function(){
    return function(text){
        if(text != null){
            return text.replace(/\n/g, "<br/><br/>");
        }
    }
});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


