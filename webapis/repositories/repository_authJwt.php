<?php

require_once '../vendor/autoload.php';

use \Firebase\JWT\JWT;

class class_jwt {

    protected $clave; //clave del token
    protected $iss; //host del cual se responde
    protected $aud; // host al cual se le respondera
    protected $jwt_opcion; // opciones para construir el token
    protected $char_relleno; // caracteres de relleno

    function __construct() {
        $this->clave = $this->clave();
        $this->iss = 'http://' . $_SERVER['HTTP_HOST'] . "/" . md5($this->clave);
        $this->aud = 'http://SoEasyTeam/' . md5($this->clave);
        $this->char_relleno = 38;
        $this->jwt_opcion = array(
            "alg" => 'HS256',
            "typ" => 'JWT'
        );
    }

    public function generar_jwt($json) {
        $jwt = null;
        $time = time();

        $token = array(
            'iat' => $time, // Tiempo que inició el token
            'exp' => $time + (60 * 5), // Tiempo que expirará el token (5 min)
            'iss' => $this->iss,
            'aud' => $this->aud,
            'data' => $json
        );
        $jwt = JWT::encode($token, $this->clave);
        $jwt = $this->encriptar_jwt($jwt);
        return $jwt;
    }

    public function validar_jwt($jwt) {
        $jwt = $this->desencriptar_jwt($jwt);
        try {
            $decoded = JWT::decode($jwt, $this->clave, $this->jwt_opcion);
            if (!isset($decoded->aud)) {
                return $this->error();
            } else {
                if (strcmp($decoded->aud, $this->aud) !== 0 || $decoded->exp < time()) {
                    return $this->error();
                } else {
                    return $this->ok($decoded->data);
                }
            }
        } catch (Exception $ex) {
            return $this->error();
        }
    }

    private function desencriptar_jwt($jwt) {
        $fecha = getdate();
        $remplazar = md5($fecha['mday']);
        $jwt = substr($jwt, 0, strlen($jwt) - $this->char_relleno);
        $jwt = str_replace($remplazar, ".", $jwt);
        return $jwt;
    }

    private function encriptar_jwt($jwt) {
        $jwt_resultado = '';
        $relleno = '';
        $sub = '';
        $fecha = getdate();
        $remplazar = md5($fecha['mday']);
        $char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '3', '2', '1', '6', '5', '4', '9', '8', '7'];
        for ($index = 0; $index < $this->char_relleno; $index++) {
            $relleno .= $char[rand(0, (count($char)) - 1)];
        }
        $jwt .= $relleno;
        $jwt_resultado = str_replace(".", $remplazar, $jwt);

        return $jwt_resultado;
    }

    private function clave() {
        $fecha = getdate();
        $temp = $fecha['year'] . $fecha['mon'] . $fecha['mday'] . $fecha['weekday'];
        $clave = md5(md5($temp));
        return $clave;
    }

    private function error() {
        $respuesta = array(
            "estado" => false,
            "mensaje" => "Aceso denegado",
            "data" => null
        );
        return $respuesta;
    }

    private function ok($data) {
        $respuesta = array(
            "estado" => true,
            "mensaje" => "ok",
            "data" => $data
        );
        return $respuesta;
    }

}
