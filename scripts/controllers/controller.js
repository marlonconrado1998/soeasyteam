'use strict';

(function() {

    app.controller('controEasyTeam', controEasyTeam);

    controEasyTeam.$inject = ['serviEasyTeam'];

    function controEasyTeam(serviEasyTeam) {

        var easyTeam = this;

        easyTeam.dataRegistro = []; // variable que guarda la información de un cliente que se acaba de rigistrar
        easyTeam.login = []; // variable que guardala informacion del login
        easyTeam.listaProductos = []; // variable que guarda los productos que vienen de la base de datos, su valor es asignado en la función onBuscarTodosProductos
        easyTeam.listaNomUsuarios = []; // variable que guarda la lista de nombres de usuarios su valor es asignado en la funcion easyTeam.onBuscarNombresDeUsuarios;
        easyTeam.nomUsuValid = false; // variable que se utiliza para mandar una alerta en el campo nomUsuario en la vista header.html en el formulario de rigistro
        easyTeam.passValid = false; // variable que se utiliza para mandar una alerta en el campo configPassqord en la vista header.html en el formulario de rigistro
        easyTeam.ocultar = false; // variable que se utiliza para ocultas el sigin sing up cuando el usuario se loguea
        easyTeam.infoUsuario = JSON.parse(sessionStorage.getItem("infoUsuario"));

        easyTeam.clientesFelices = ["img1.jpeg", "img2.jpeg", "img3.jpeg", "img4.jpeg", "img5.jpeg", "img9.jpeg", "img7.jpg", "img8.jpg"];
        easyTeam.arr = [
            { 'nombre': 'ABELARDO CASTRO', 'img': 'img/product2.jpg' },
            { 'nombre': 'RONALD BARIOS', 'img': 'img/product3.jpg' },
            { 'nombre': 'GABRIEL VILLAREL', 'img': 'img/product4.jpg' }
        ];
    

        // funcion que busca los nombre de usuario para la validacion en el registro
        easyTeam.onBuscarNombresDeUsuarios = function() {

            var len = easyTeam.listaNomUsuarios.length;

            if (len <= 0) {
                serviEasyTeam.buscarNombresDeUsuarios().then(function(resp) {
                    console.log(resp.data.data);
                    easyTeam.listaNomUsuarios = resp.data.data;
                }).catch(function(error) {
                    console.log(error);
                });
            }
        };

        // funcion que valida si un nombre de usuario no se repite esta funcion se dispara en la vista header.html
        easyTeam.onValidarNomUsuario = function() {

            var len = easyTeam.listaNomUsuarios.length;
            var sw = false;
            // console.log("hola nomUsu");
            for (var i = 0; i < len; i++) {
                if (easyTeam.dataRegistro[0].nomUsuario == easyTeam.listaNomUsuarios[i].nombre_usuario) {
                    sw = true;
                    break;
                }
            }

            if (sw) {
                easyTeam.nomUsuValid = true;
            } else {
                easyTeam.nomUsuValid = false;
            }
        };

        // funcion que valida si el campo password es igual al campo confirmar password
        easyTeam.onValidarPassword = function(){
            var pass = easyTeam.dataRegistro[0].password;
            var configPass = easyTeam.dataRegistro[0].configPassword;

            if (configPass !== pass) {
                easyTeam.passValid = true;
            }else{
                easyTeam.passValid = false;
            }
        };

        // funcion que guarda un nuevo cliente. Esta funcion se dispara en la vista header.html
        easyTeam.onGuardarCliente = function() {

            var data = JSON.stringify(easyTeam.dataRegistro);

            serviEasyTeam.guardarCliente({ 'data': data }).then(function(resp) {

                swal({
                    text: resp.data.message,
                    type: 'success'
                });

                // console.log(resp.data.data);
            }).catch(function(error) {
                console.log(error);
            });
        };

        // funcion que valida el login de una persona
        easyTeam.onLogin = function() {

            var nomUsu = easyTeam.login[0].nomUsu;
            var pass = easyTeam.login[0].pass;
            // console.log(easyTeam.login);
            serviEasyTeam.login(nomUsu, pass).then(function(resp) {

                sessionStorage.setItem('infoUsuario', JSON.stringify(resp.data.data));
                easyTeam.ocultar = true;
                // console.log(resp.data.data);s
            }).catch(function(error) {
                console.log(error);
            });
        };

        easyTeam.onLogout = function(){
            sessionStorage.removeItem('infoUsuario');
            easyTeam.ocultar = true;
        };

        // funcion que busca todos los productos y los guarda en la variable easyTeam.listaProductos 
        easyTeam.onBuscarTodosProductos = function() {

            serviEasyTeam.buscarTodosProductos().then(function(resp) {
                console.log(resp.data.data);
                easyTeam.listaProductos = resp.data.data;
            }).catch(function(error) {
                console.log(error);
            });
        };
    }
})();