<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    //Headers
    header('Access-Control-Allow-Origin:*');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

    //Require
    require '../vendor/autoload.php';
    require '../repositories/repository_easyTeam.php';
    require '../middleware/autorization.php';

    //Objects
    $app = new \Slim\App;
    $Template = new Repository_easyTeam();
    $Auto = new Autorization();

$app->post('/GuardarCliente/', function (Request $request, Response $response) use ($Template){

    $data = $request->getParam('data');

    try{

        $respuesta = $Template->GuardarCliente($data);
        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->get('/ConfirmarUsuario/{email}', function (Request $request, Response $response) use ($Template){

    $email = $request->getAttribute('email');
    
    try{

        $respuesta = $Template->CambiarEstadoUser($email);
        // return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->get('/BuscarEmailUsuarios/', function (Request $request, Response $response) use ($Template){
    
    try{

        $respuesta = $Template->BuscarEmailUsuarios();
        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->post('/Login/', function (Request $request, Response $response) use ($Template){

    $data = $request->getParam('data');

    try{

        $respuesta = $Template->Login($data);

        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->post('/NuevoEmailConfirmarCorreo/', function (Request $request, Response $response) use ($Template){

    $email = $request->getParam('data');

    try{

        $respuesta = $Template->NuevoEmailConfirmarCorreo($email);
        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->get('/BuscarPaises/', function (Request $request, Response $response) use ($Template){

    try{

        $respuesta = $Template->BuscarPaises();
        // $token = $request->getAttribute('token');

        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});


$app->get('/BuscarApartCasa/', function (Request $request, Response $response) use ($Template){

    try{

        $respuesta = $Template->BuscarApartCasa();

        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->get('/BuscarYatesBotes/', function (Request $request, Response $response) use ($Template){

    try{

        $respuesta = $Template->BuscarYatesBotes();

        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->get('/BuscarCarros/', function (Request $request, Response $response) use ($Template){

    try{

        $respuesta = $Template->BuscarCarros();

        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->post('/GuardarCompra/', function (Request $request, Response $response) use ($Template) {
    $data = $request->getParam('data');
    try{
        $respuesta = $Template->GuardarCompra($data);
        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->get('/BuscarProductosUsuario', function (Request $request, Response $response) use ($Template) {
    try{
        $idusauario = (int)$request->getAttribute('idusuarios');
        $respuesta = $Template->BuscarProductosUsuario($idusauario);
        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
})->add( $Auto );

$app->post('/CambiarContrasena', function (Request $request, Response $response) use ($Template) {
    try{
        $usuario = array(
            "id" => (int)$request->getAttribute('idusuarios'),
            "old_pass" => $request->getParam('old_pass'),
            "new_pass" => $request->getParam('new_pass')
        );
        $respuesta = $Template->CambiarContraseña($usuario);
        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
})->add( $Auto );

$app->post('/UpdateInfo', function (Request $request, Response $response) use ($Template) {
    try{
        $usuario = array(
            "idusuarios" => (int)$request->getAttribute('idusuarios'),
            "email" => $request->getParam('email'),
            "telefono" => $request->getParam('telefono')
        );
        $respuesta = $Template->UpdateInfo($usuario);
        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
})->add( $Auto );

$app->get('/SearchGalery/{idproduct}', function (Request $request, Response $response) use ($Template) {
    try{
        $idproduct = $request->getAttribute("idproduct");
        $respuesta = $Template->SearchGalery($idproduct);
        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->run();