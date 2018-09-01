<?php

// Middleware para validar autenticidad de los tokens

class Autorization  extends class_jwt{


    function __invoke  ($request, $response, $next) {
        
        try {
            // Obtiene el token del cliente
            $token = $request->getHeader('TOKEN')[0];
            
            // Valida que el token sea válido
            $result = parent::validar_jwt($token);

            // Pregunta si fue denedago el token
            if ($result['mensaje'] == 'Acceso denegado') {          
                $response->getBody()->write($result['mensaje']);
            }else{
                $idusuario = $result['data']->{'idusuarios'}; // Obtiene el idusuario del payload 
                $request = $request->withAttribute('idusuarios', $idusuario); // Crea en el request el attributo id usuarios
                return $next($request, $response); // Permite que siga ejecutandose la petición al servicio
            }
            return $response;
        }catch (Exception $e) {
            return $response;
        }
    }
}