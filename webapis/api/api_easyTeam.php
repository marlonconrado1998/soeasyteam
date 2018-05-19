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

    //Objects
    $app = new \Slim\App;
    $Template = new Repository_easyTeam();

$app->post('/GuardarCliente/', function (Request $request, Response $response) use ($Template){

    $data = json_decode($request->getParam('data'));
    
    try{

        $respuesta = $Template->GuardarCliente($data);

        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->get('/BuscarNombresDeUsuarios/', function (Request $request, Response $response) use ($Template){
    
    try{

        $respuesta = $Template->BuscarNombresDeUsuarios();

        return $response->withJson($respuesta, 200);
    }catch(Exception $e){
        return $response->withJson($e->getMessage(), 500);
    }
});

$app->get('/Login/{nomUsu}/{pass}', function (Request $request, Response $response) use ($Template){

    $nomUsu = $request->getAttribute('nomUsu');
    $pass = $request->getAttribute('pass');

    try{

        $respuesta = $Template->Login($nomUsu, $pass);

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

$app->run();