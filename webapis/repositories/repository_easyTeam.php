<?php

//Requiere Data Access Layer
require_once '../libraries/class_data_access_layer.php';
//Requiere Data Access Layer
require_once '../libraries/class_util_response.php';
require_once '../vendor/autoload.php';

use Spipu\Html2Pdf\Html2Pdf;



class Repository_easyTeam {

    public $DAL;
    public $Response;

    public function __construct() {
        $this->DAL = new Data_Access_Layer();
        $this->Response = new Response();
    }

    public function add($object) {

        $response = null;

        $Nombres = $object['Nombres'];
        $Apellidos = $object['Apellidos'];
        $Correo_Electronico = $object['Correo_Electronico'];
        $Cargo = $object['Cargo'];

        try {
            $result = $this->DAL->query("CALL sp_empleados_insert('$Nombres','$Apellidos','$Correo_Electronico','$Cargo');", [], false);
            $response = $this->Response->ok('Empleado agregado satisfactoriamente');
        } catch (Exception $e) {
            $response = $this->Response->error('Error al agregar el empleado');
        }

        $this->DAL->close();

        return $response;
    }

    public function formaterFecha($fecha){

        $f = explode(".", $fecha);
        $fecha = $f[2]."-".$f[0]."-".$f[1];

        return $fecha;
    }

    public function GuardarCliente($object){

        $response = null;
        $result = null;
        
        $nombre           = $object[0]->nombre;
        $apellidos        = $object[0]->apellidos;
        $identificacion   = $object[0]->identificacion;
        $correo           = $object[0]->correo;
        $telefono         = $object[0]->telefono;
        $nomUsuario       = $object[0]->nomUsuario;
        $password         = password_hash($object[0]->password, PASSWORD_DEFAULT);
        
        try{
            
            

            $result = $this->DAL->query("CALL sp_insert_persona('$nombre', '$apellidos', '$identificacion', '$correo', '$telefono', 'USA', '$nomUsuario', '$password')", [], false);

            $response =  $this->Response->ok("El usuario". $nomUsuario . " fue creado correctamente", $object);
        }catch(Exception $e){
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;
    }

    public function BuscarNombresDeUsuarios(){

        $response = null;
        $result = null;
        
        try{

            $result = $this->DAL->query("CALL sp_select_nomUsuarios();", [], false);

            
            $response = $this->Response->ok(null, $result);    
        }catch(Exception $e){
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;
    }

    public function Login($nomUsu, $pass){

        $response = null;
        $result = null;
        $usuarios = array();
        $sw = false;

        try{

            $usuarios = $this->DAL->query("CALL sp_validacionLogin('$nomUsu');", [], false);

            $len = count($usuarios);

            for ($i=0; $i < $len ; $i++) { 
                if ($nomUsu == $usuarios[$i]['nombre_usuario'] && password_verify($pass, $usuarios[$i]['password'])) {
                    $sw = true;
                }
            }

            if($sw){
                $result = $this->DAL->query("CALL sp_select_info_usuario('$nomUsu');", [], false);
                $response = $this->Response->ok(null, $result);
            }else{
                $response = $this->Response->ok("EL Usario o contraseña no son validos", null);
            }
        }catch(Exception $e){
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;
    }

    public function BuscarApartCasa(){

        $response = null;
        $result = null;

        try {
            
            $result = $this->DAL->query("CALL sp_select_apartamentos_casas();", [], false);

            $response = $this->Response->ok(null, $result);
        } catch (Exception $e) {
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;
    }

    public function BuscarYatesBotes(){

        $response = null;
        $result = null;

        try {
            
            $result = $this->DAL->query("CALL sp_select_yates_botes();", [], false);

            $response = $this->Response->ok(null, $result);
        } catch (Exception $e) {
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;
    }
}
?>