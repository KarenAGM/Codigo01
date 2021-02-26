var Http = require( 'http' );
var fs = require('fs');
var url = require('url');

var server = Http.createServer(function(request,response){

    var uri = (request.connection.encrypted ? 'https': 'http') + '://' + request.headers.host + request.url;
    console.log(uri);
    var uri_parseada = url.parse(uri,true);
    console.log(uri_parseada);

//GET y ruta / --> pagina.html
//POST y ruta / --> pagina2.html
//GET y ruta / mensaje --> recurso.json
if(request.method == 'GET'){
    if(uri_parseada.path == "/"){
        fs.readFile('pagina1.html',function(err,datos){
            console.log('Sirviendo pagina uno');
            response.writeHead(200,"Content-Type:text/html");
            response.write(datos);
            response.end();
          });
    }else{
        if(uri_parseada.path == "/mensaje"){
            fs.readFile('recurso.json',function(err,datos){
                console.log('Sirviendo pagina uno');
                response.writeHead(200,"Content-Type:text/json");
                response.write(datos);
                response.end();
              });
        }
    }
    
}else{
    if(request.method == 'POST'){
        fs.readFile('pagina2.html',function(err,datos){
            console.log('Sirviendo pagina dos');
            response.write(datos);
            response.end();
          });
    }else{
        response.write("Nada que servir");
        response.end();

    }

}



});

server.listen( 3000, function( ) {
console.log( 'Escuchando conexión en el puerto 3000' );
});