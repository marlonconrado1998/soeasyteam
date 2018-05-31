'use strict';

(function() {

    app.controller('controEasyTeam', controEasyTeam);

    controEasyTeam.$inject = ['serviEasyTeam', 'ngCart', 'ngCartItem', '$location'];

    function controEasyTeam(serviEasyTeam, ngCart, ngCartItem, $location) {

        var easyTeam = this;

        easyTeam.dataRegistro = []; // variable que guarda la información de un cliente que se acaba de rigistrar
        easyTeam.login = []; // variable que guardala informacion del login
        easyTeam.listaApartamentos = []; // variable que guarda la info de los apartamentos, su valor es asignado en la función easyTeam.onBuscarApartCasa
        easyTeam.listaCasas = []; // variable que guarda la info de las casa, su valor es asignado en la función easyTeam.onBuscarApartCasa
        easyTeam.listaYates = []; // variable que guarda la info de los yates, su valor es asignado en la función easyTeam.onBuscarYatesBotes
        easyTeam.listaBotes = []; // variable que guarda la info de los botes, su valor es asignado en la función easyTeam.onBuscarYatesBotes
        easyTeam.listaCarros = []; // variable que guarda la info de los carros, su valor es asignado en la función easyTeam.onBuscarCarros
        easyTeam.listaNomUsuarios = []; // variable que guarda la lista de nombres de usuarios su, valor es asignado en la funcion easyTeam.onBuscarNombresDeUsuarios;
        easyTeam.nomUsuValid = false; // variable que se utiliza para mandar una alerta en el campo nomUsuario en la vista header.html en el formulario de rigistro
        easyTeam.passValid = false; // variable que se utiliza para mandar una alerta en el campo configPassqord en la vista header.html en el formulario de rigistro
        easyTeam.ocultar = false; // variable que se utiliza para ocultas el sigin sing up cuando el usuario se loguea
        easyTeam.infoUsuario = JSON.parse(sessionStorage.getItem("infoUsuario"));
        easyTeam.detalleProducto = JSON.parse(sessionStorage.getItem("infoProducto")); // variable que contiene la informacion de un producto que esta en el sessionStorage para luego mostrarla en la vista detalles
        easyTeam.dataJson = [];
        easyTeam.dataCarrito = ngCart.getItems();
        easyTeam.fechaServicio = ""; // en esta variable se guarda la fecha en que se realizará el servicio

        easyTeam.clientesFelices = ["img1.jpeg", "img2.jpeg", "img3.jpeg", "img4.jpeg", "img5.jpeg", "img9.jpeg", "img7.jpg", "img8.jpg"];

        easyTeam.arr = [
            { 'nombre': 'RIDE IN CHIVA', 'img': 'img/publicidad/chiva.jpg' },
            { 'nombre': 'CITY TOUR', 'img': 'img/publicidad/cityTour.jpg' },
            { 'nombre': 'DIVING', 'img': 'img/publicidad/buceo.jpg' },
            { 'nombre': 'TOTUMO VOLCANO', 'img': 'img/publicidad/totumo.jpg' },
            { 'nombre': 'HORSE CARRIAGE', 'img': 'img/publicidad/carriage.jpg' }
        ];

        easyTeam.scrollTop = function() {
            var body = document.body;
            var html = document.documentElement;

            body.scrollTop = 0 + "px";
            html.scrollTop = 0 + "px";
        };

        easyTeam.onAddCart = function(data) {
            ngCart.addItem(data.id, data.nombre, data.valor, 1, data.imagen);
            easyTeam.dataCarrito = ngCart.getItems();
            console.log(easyTeam.dataCarrito);
            console.log(easyTeam.dataCarrito[0]._id + " " + easyTeam.dataCarrito[0]._name);
            console.log("Total: " + ngCart.totalCost());
            console.log(ngCart.getTotalItems());
        };

        easyTeam.ongetTotalItems = function() {
            return ngCart.getTotalItems();
        };

        easyTeam.onTotalCost = function() {
            return ngCart.totalCost();
        };

        easyTeam.onGetTotal = function(quantity, price) {
            var totaItem = quantity * price;
            return totaItem;
        };

        easyTeam.onRemoveItemById = function(id) {
            ngCart.removeItemById(id);
        };

        easyTeam.onGuardarCompra = function(){
            
            var data = [{
                "totalVenta": ngCart.totalCost(),
                "fecha" : easyTeam.fechaServicio,
                "items": ngCart.getItems(),
            }];
        }

        // console.log(easyTeam.ongetTotalItems());
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
        easyTeam.onValidarPassword = function() {
            var pass = easyTeam.dataRegistro[0].password;
            var configPass = easyTeam.dataRegistro[0].configPassword;

            if (configPass !== pass) {
                easyTeam.passValid = true;
            } else {
                easyTeam.passValid = false;
            }
        };

        // funcion que guarda un nuevo cliente. Esta funcion se dispara en la vista header.html
        easyTeam.onGuardarCliente = function() {

            var data = easyTeam.dataRegistro;

            serviEasyTeam.guardarCliente({ 'data': data }).then(function(resp) {

                // swal({
                //     text: resp.data.message,
                //     type: 'success'
                // });

                console.log(resp);
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

        // funccion para cerrar sesion de un cliente
        easyTeam.onLogout = function() {
            sessionStorage.removeItem('infoUsuario');
            easyTeam.ocultar = true;
        };

        // funcion que busca todos los apartamentos y las casas y los guarda en la variable easyTeam.listaApartCasas
        easyTeam.onBuscarApartCasa = function() {

            serviEasyTeam.buscarApartCasa().then(function(resp) {
                var len = resp.data.data.length;
                for (var i = 0; i < len; i++) {
                    if (resp.data.data[i].tipo == 'apartamento') {
                        easyTeam.listaApartamentos.push(resp.data.data[i]);
                    } else {
                        easyTeam.listaCasas.push(resp.data.data[i]);
                    }
                }
            }).catch(function(error) {
                console.log(error);
            });
        };

        easyTeam.onBuscarYatesBotes = function() {

            serviEasyTeam.buscarYatesBotes().then(function(resp) {
                // console.log(resp.data.data);

                var len = resp.data.data.length;

                for (var i = 0; i < len; i++) {
                    if (resp.data.data[i].tipo == "yate") {
                        easyTeam.listaYates.push(resp.data.data[i]);
                    } else {
                        easyTeam.listaBotes.push(resp.data.data[i]);
                    }
                }
            }).catch(function(error) {
                console.log(error);
            });
        };

        // funcion que busca las fotos de los productos en el archivo productos.json ubicado en la carpeta scripts
        easyTeam.onBuscarinfoImg = function(idproducto, tipo) {

            var tipo = tipo;
            var idproducto = idproducto;
            var data = [];

            serviEasyTeam.buscarImgJson().then(function(resp) {

                easyTeam.dataJson = resp.data;

                switch (tipo) {

                    case "yate":
                        var len = easyTeam.listaYates.length;
                        var len2 = easyTeam.dataJson.yate.length;
                        var i = 0;
                        var j = 0;
                        for (i = 0; i < len; i++) {
                            if (easyTeam.listaYates[i].idproducto == idproducto) {
                                data.push(easyTeam.listaYates[i]);
                                break;
                            }
                        }

                        for (j = 0; j < len2; j++) {
                            if (easyTeam.dataJson.yate[j].id == idproducto) {
                                data.push(easyTeam.dataJson.yate[j].galeria);
                            }
                        }
                        sessionStorage.setItem("infoProducto", JSON.stringify(data));
                        break;
                    case "bote":
                        var len = easyTeam.listaBotes.length;
                        var len2 = easyTeam.dataJson.bote.length;
                        var i = 0;
                        var j = 0;

                        for (i = 0; i < len; i++) {
                            if (easyTeam.listaBotes[i].idproducto == idproducto) {
                                data.push(easyTeam.listaBotes[i]);
                                break;
                            }
                        }

                        for (j = 0; j < len2; j++) {
                            if (easyTeam.dataJson.bote[j].id == idproducto) {
                                data.push(easyTeam.dataJson.bote[j].galeria);
                            }
                        }

                        sessionStorage.setItem("infoProducto", JSON.stringify(data));
                        break;
                    case "apartamento":
                        var len = easyTeam.dataJson.apartamento.length;
                        var len2 = easyTeam.listaApartamentos.length;
                        var i = 0;
                        var j = 0;

                        for (i = 0; i < len; i++) {
                            if (easyTeam.listaApartamentos[i].idproducto == idproducto) {
                                data.push(easyTeam.listaApartamentos[i]);
                                break;
                            }
                        }

                        for (j = 0; j < len2; j++) {
                            if (easyTeam.dataJson.apartamento[j].id == idproducto) {
                                data.push(easyTeam.dataJson.apartamento[j].galeria);
                            }
                        }

                        sessionStorage.setItem("infoProducto", JSON.stringify(data));
                        break;
                    case "casa":

                        var len = easyTeam.listaCasas.length;
                        var len2 = easyTeam.dataJson.casa.length;
                        var i = 0;
                        var j = 0;

                        for (i = 0; i < len; i++) {
                            if (easyTeam.listaCasas[i].idproducto == idproducto) {
                                data.push(easyTeam.listaCasas[i]);
                                break;
                            }
                        }

                        for (j = 0; j < len2; j++) {
                            if (easyTeam.dataJson.casa[j].id == idproducto) {
                                data.push(easyTeam.dataJson.casa[j].galeria);
                            }
                        }
                        sessionStorage.setItem("infoProducto", JSON.stringify(data));
                        break;
                    case "carro":
                        var len = easyTeam.listaCarros.length;
                        var len2 = easyTeam.dataJson.carro.length;
                        var i = 0;
                        var j = 0;

                        for (i = 0; i < len; i++) {
                            if (easyTeam.dataJson.carro[i].id == idproducto) {
                                data.push(easyTeam.dataJson.carro[i].galeria);
                            }
                        }

                        for (j = 0; j < len2; j++) {
                            if (easyTeam.dataJson.carro[j].id == idproducto) {
                                data.push(easyTeam.dataJson.carro[j].galeria);
                            }
                        }
                        break;
                }
            }).catch(function(error) {
                console.log(error);
            });
        };
    }
})();