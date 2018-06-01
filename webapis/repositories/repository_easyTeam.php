<?php

use Spipu\Html2Pdf\Html2Pdf;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Requiere Data Access Layer
require_once '../libraries/class_data_access_layer.php';
//Requiere Data Access Layer
require_once '../libraries/class_util_response.php';
require_once '../vendor/autoload.php';

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
        
        $nombre           = $object[0]['nombre'];
        $apellidos        = $object[0]['apellidos'];
        $identificacion   = $object[0]['identificacion'];
        $correo           = $object[0]['correo'];
        $telefono         = $object[0]['telefono'];
        // $nomUsuario       = $object[0]['nomUsuario'];
        $password         = password_hash($object[0]['password'], PASSWORD_DEFAULT);

        $this->EnviarEmail($correo);

        try{
            
            // $result = $this->DAL->query("CALL sp_insert_persona('$nombre', '$apellidos', '$identificacion', '$correo', '$telefono', 'USA', '$nomUsuario', '$password')", [], false);

            $response =  $this->Response->ok("El usuario" . " fue creado correctamente", $object[0]['correo']);
        }catch(Exception $e){
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;
    }

    public function EnviarEmail($email){
        
        $mail = new PHPMailer();                              // Passing `true` enables exceptions
        $response = null;
        // $response = $email;
        try {

            //Configuración del Servidor
            $mail->SMTPDebug = 4;                                 // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587;                                    // TCP port to connect to

            $mail->Username = 'jorozcoc1892@gamail.com';           // SMTP username
            $mail->Password = 'JORGE9402ameLIVER';                // SMTP password

            // //Recipients
            $mail->setFrom('jorozcoc1892@gamail.com', 'No Responde Este Email');
            $mail->addAddress($email, 'Jorge LFC');     // Add a recipient

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name


            // cuerpo edel mensaje
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'prueba';
            $mail->Body    = 'Hola <b>Mundo!</b>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();

            // if($email->send()){
            //     $response = $this->Response->ok("El email fue enviado");
            // }else{
            //     $response = $this->Response->error("El no email fue enviado");
            // }
            // echo 'Message has been sent';
        } catch (Exception $e) {
            $response = $this->Response->error('Message could not be sent. Mailer Error: ', $mail->ErrorInfo);
            // echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }

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

    public function BuscarPaises(){

        $response = null;
        $result = null;

        try {
            
            $result = $this->DAL->query("CALL sp_select_paises();", [], false);

            $response = $this->Response->ok(null, $result);
        } catch (Exception $e) {
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

    public function BuscarCarros(){

        $response = null;
        $result = null;

        try {
            
            $result = $this->DAL->query("CALL sp_select_carros();", [], false);

            $response = $this->Response->ok(null, $result);
        } catch (Exception $e) {
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;
    }

    public function GuardarCompra($object){
        
        $response = null;
        $result = null;
        $result2 = null;

        $fk_usurario = 1;
        $iva = 0;
        $estado = 'porPrestar';
        $fecha = $object[0]['fecha'];
        $total_venta = $object[0]['totalVenta'];
        $items = $object[0]['items'];

        try {
            
            $result = $this->DAL->query("CALL sp_insert_po($fk_usurario, $iva, $total_venta, '$fecha', '$estado');", [], false);

            $arrIdpo = $this->DAL->query("CALL sp_select_ultimo_id_po();", [], false);
            $fk_po = $arrIdpo[0]['fk_po'];

            $len = count($items);
            
            for ($i=0; $i < $len; $i++) {
                $fk_producto = $items[$i]['_id'];
                $cantidad = $items[$i]['_quantity'];
                $precio_unidad = $items[$i]['_price'];
                $iva_unidad = 0;
                $result2 = $this->DAL->query("CALL sp_insert_poline($fk_producto, $cantidad, $precio_unidad, $iva_unidad, $fk_po);", [], false);
            }

            $response = $this->Response->ok("successful purchase", $fk_po);
        } catch (Exception $e) {
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;        
    }
}
?>
