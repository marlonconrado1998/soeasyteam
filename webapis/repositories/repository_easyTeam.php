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

    public function GuardarCliente($object){

        $response = null;
        $result = null;

        if(isset($object[0]['nombre']) && !empty($object[0]['nombre']) && isset($object[0]['apellidos']) && !empty($object[0]['apellidos']) && isset($object[0]['identificacion']) && !empty($object[0]['identificacion']) && isset($object[0]['correo']) && !empty($object[0]['correo']) && isset($object[0]['pais']) && !empty($object[0]['pais']) && isset($object[0]['telefono']) && !empty($object[0]['telefono']) && isset($object[0]['password']) && !empty($object[0]['password']) && isset($object[0]['configPassword']) && !empty($object[0]['configPassword'])){

            if ($object[0]['password'] == $object[0]['configPassword']) {

                $nombre             = $object[0]['nombre'];
                $apellidos          = $object[0]['apellidos'];
                $identificacion     = $object[0]['identificacion'];
                $correo             = $object[0]['correo'];
                $pais               = $object[0]['pais'];
                $telefono           = $object[0]['telefono'];
                $password           = password_hash($object[0]['password'], PASSWORD_DEFAULT);

                try{
                    
                    $emails = $this->DAL->query("CALL sp_select_emailUsuarios()", [], false);

                    $len = count($emails);
                    $sw = true;

                    for ($i=0; $i < $len; $i++) { 
                        if ($emails[$i]['email'] == $correo) {
                            $sw = false;
                            break;
                        }
                    }

                    if ($sw) {

                        $result = $this->DAL->query("CALL sp_insert_persona('$nombre', '$apellidos', '$identificacion', '$correo', '$telefono', '$pais', '$password')", [], false);

                        $this->EnviarEmail($correo, 1);

                        $response =  $this->Response->ok("The user ". $nombre ." Was created correctly", true);
                    }else{
                        $response =  $this->Response->ok("The Email ". $correo ." Exists", $sw);
                    }
                }catch(Exception $e){
                    $response = $this->Response->error($e->getMessage(), 500);
                }
            }else{
                $response =  $this->Response->ok("Passwords Are Not The Same", false);
            }
        }else{
            $response =  $this->Response->ok("Fill All The Form Fields", false);
        }

        $this->DAL->close();

        return $response;
    }
    
    public function EnviarEmail($data, $caso){
        
        $mail = new PHPMailer(); // Crea Una Instancia De PHPMailer
        
        $response = null;
        
        try {

            //Configuración del Servidor
            $mail->isSMTP();                                      // Establecer PHPMailer Para Usar SMTP
            $mail->Host = 'smtp.gmail.com';                       // Establece El Servidor SMTP
            $mail->Port = 587;                                    // Especificar El Puerto
            $mail->SMTPSecure = 'tls';                            // Habilita El Cifrado tls También Puede Ser ssl
            $mail->SMTPAuth = true;                               // Habilita La Autenticación SMTP
            $mail->Username = 'jorozcoc1892@gmail.com';           // Nombre De Usuario SMTP
            $mail->Password = 'JORGE9402ameLIVER';                // Password De Usuario SMTP
            $mail->SMTPOptions = array(
                'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    )
            );

            //Recipients
            $mail->setFrom('jorozcoc1892@gmail.com', 'No Responda Este Email'); // Remitente Del Email

            switch ($caso) {
                case 1:

                    // url de confirmación
                    $url = 'http://127.0.0.1/soEasyTeam/webapis/api/confirmar_registro.php?email='.$data;
                    $mail->addAddress($data); // Recetor Del Email
                    // Configuración Del Email
                    $mail->isHTML(true); // Establecer Formato De Correo Electrónico A HTML
                    $mail->Subject = 'Confirm your account'; // Establecer Asunto
                    $mail->Body = 'Please click on the following button to confirm your account <br><a href="'.$url.'">'.$url.'</a>'; // Cuerpo Del Email
                    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
                    $mail->send(); // Enviar Email
                    // Se verifica si el email ha sido enviado
                    if($mail->send()){
                        $response = $this->Response->ok("The email has been sent");
                    }else{
                        $response = $this->Response->error("The email has not been sent: " . $mail->ErrorInfo);
                    }
                    break;
                case 2:

                    $mail->addAddress($data[0]['correo']); // Recetor Del Email

                    // Archivos Adjuntos
                    $mail->addAttachment('xibia1.docx', 'contract');

                    $tabla = '<head>
                                <style>

                                    table {
                                        border-collapse: collapse;
                                        width: 100%;
                                    }

                                    th, td {
                                        padding: 10px;
                                        text-align: left;
                                        border-bottom: 1px solid #ddd;
                                    }
                                    tr:hover {background-color:#f5f5f5;}
                                </style>
                                </head>
                                <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Unit price</th>
                                        <th>Total Item</th>
                                    </tr>
                                </thead>
                                <tbody>';

                    $arrItems = $data[0]['items'];
                    $len = count($arrItems);

                    for ($i=0; $i < $len; $i++) { 
                        $tabla .= '<tr>
                                        <td>'.$arrItems[$i]['_name'].'</td>
                                        <td>'.$arrItems[$i]['_quantity'].'</td>
                                        <td>'.$arrItems[$i]['_price'].'</td>
                                        <td>'.$arrItems[$i]['_price'] * $arrItems[$i]['_quantity'].'</td>
                                    </tr>';
                    }

                    $tabla .= '</tbody>
                                <tfoot>
                                    <tr>
                                        <th colspan="3">Total</th>
                                        <th colspan="1">$'.$data[0]['totalVenta'].'</th>
                                    </tr>
                                </tfoot></table>';

                    // Configuración Del Email
                    $mail->isHTML(true); // Establecer Formato De Correo Electrónico A HTML
                    $mail->Subject = 'Purchase items'; // Establecer Asunto
                    $mail->Body = 'The products that you have purchased are shown in the following table <br><br><br>' . $tabla; // Cuerpo Del Email
                    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
                    
                    // Se verifica si el email ha sido enviado
                    $mail->send();
                    if($mail->send()){
                        $response = $this->Response->ok("The email has been sent");
                    }else{
                        $response = $this->Response->error("The email has not been sent: " . $mail->ErrorInfo);
                    }
                    break;
            }
        } catch (Exception $e) {
            $response = $this->Response->error('Message could not be sent. Mailer Error: ', $mail->ErrorInfo);
        }

        return $response;
    }

    public function CambiarEstadoUser($correo){

        $response = null;
        $result = null;

        try{
            
            $result = $this->DAL->query("CALL sp_cambiar_estado_usuario('$correo')", [], false);
            
            $lastId = $this->DAL->lastId();
            
            $response =  $this->Response->ok("El usuario fue creado correctamente", $lastId);
        }catch(Exception $e){
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        // return $response;
    }

    public function BuscarEmailUsuarios(){

        $response = null;
        $result = null;
        
        try{

            $result = $this->DAL->query("CALL sp_select_emailUsuarios();", [], false);

            $response = $this->Response->ok(null, $result);
        }catch(Exception $e){
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;
    }

    public function Login($object){

        $response = null;
        $result = null;
        
        $email = $object[0]['email'];
        $pass = $object[0]['pass'];

        try{

            $usuarios = array();
            $sw = false;

            $usuarios = $this->DAL->query("CALL sp_validacionLogin('$email');", [], false);

            $len = count($usuarios);
            $response = $this->Response->ok(null, $object[0]['email']);
            
            if ($usuarios[0]['estado'] != 0) {
                if($len > 0){
                    for ($i=0; $i < $len ; $i++) { 
                        if ($email == $usuarios[$i]['email'] && password_verify($pass, $usuarios[$i]['password'])) {
                            $sw = true;
                        }
                    }
                }

                if($sw){
                    session_start();
                    $result = $this->DAL->query("CALL sp_select_info_usuario('$email');", [], false);
                    $_SESSION['nombre'] = $result[0]['nombre'];
                    $response = $this->Response->ok(null, $result);
                }else{
                    $response = $this->Response->ok("user or password are not valid", false);
                }
            }else{
                $response = $this->Response->ok("The email has not been confirmed", false);
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
                $precio_unidad = $items[$i]['_price'] * $cantidad;
                $iva_unidad = 0;
                $result2 = $this->DAL->query("CALL sp_insert_poline($fk_producto, $cantidad, $precio_unidad, $iva_unidad, $fk_po);", [], false);
            }

            $this->EnviarEmail($object, 2);

            $response = $this->Response->ok("successful purchase", $fk_po);
        } catch (Exception $e) {
            $response = $this->Response->error($e->getMessage(), 500);
        }

        $this->DAL->close();

        return $response;        
    }
}
?>
