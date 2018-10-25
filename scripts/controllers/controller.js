'use strict';

(function () {

    app.controller('controEasyTeam', controEasyTeam);

    controEasyTeam.$inject = ['serviEasyTeam', 'ngCart', 'ngCartItem', 'toaster', '$location', '$sessionStorage', 'auth_service', 'CONSTANTS', '$scope'];

    function controEasyTeam(serviEasyTeam, ngCart, ngCartItem, toaster, $location, $sessionStorage, auth_service, CONSTANTS, $scope) {

        var easyTeam = this;

        easyTeam.dataRegistro = []; // variable que guarda la información de un cliente que se acaba de rigistrar
        easyTeam.login = []; // variable que guardala informacion del login
        easyTeam.listaApartamentos = []; // variable que guarda la info de los apartamentos, su valor es asignado en la función easyTeam.onBuscarApartCasa
        easyTeam.listaCasas = []; // variable que guarda la info de las casa, su valor es asignado en la función easyTeam.onBuscarApartCasa
        easyTeam.listaYates = []; // variable que guarda la info de los yates, su valor es asignado en la función easyTeam.onBuscarYatesBotes
        easyTeam.listaBotes = []; // variable que guarda la info de los botes, su valor es asignado en la función easyTeam.onBuscarYatesBotes
        easyTeam.listaCarros = []; // variable que guarda la info de los carros, su valor es asignado en la función easyTeam.onBuscarCarros
        easyTeam.listaEmailUsuarios = []; // variable que guarda la lista de nombres de usuarios su, valor es asignado en la funcion easyTeam.onBuscarNombresDeUsuarios;
        easyTeam.emailUsuValid = false; // variable que se utiliza para mandar una alerta en el campo nomUsuario en la vista header.html en el formulario de rigistro
        easyTeam.passValid = false; // variable que se utiliza para mandar una alerta en el campo configPassqord en la vista header.html en el formulario de rigistro
        easyTeam.ocultar = true; // variable que se utiliza para ocultas el sigin sing up cuando el usuario se loguea
        easyTeam.infoUsuario = JSON.parse(sessionStorage.getItem("infoUsuario"));
        easyTeam.detalleProducto = JSON.parse(sessionStorage.getItem("infoProducto")); // variable que contiene la informacion de un producto que esta en el sessionStorage para luego mostrarla en la vista detalles
        easyTeam.dataJson = [];
        easyTeam.dataCarrito = ngCart.getItems();
        easyTeam.fechaServicio = ""; // en esta variable se guarda la fecha en que se realizará el servicio
        easyTeam.listaPaises = []; // variable que contiene la lista de paises
        easyTeam.productsUsuario = []; // variable que contiene los productos que ha comprado del usuario        
        easyTeam.accountPage = 'Home'; // Páginas en la cuenta de usuario        
        easyTeam.pass = {}; // Páginas en la cuenta de usuario        
        easyTeam.detailtProduct = JSON.parse(sessionStorage.getItem("detailtProduct")); // detalles de un producto                
        easyTeam.galeryProduct = [];
        easyTeam.whatsapp = CONSTANTS.whatsapp;
        easyTeam.keyfacebook = CONSTANTS.keyfacebook;

        easyTeam.clientesFelices = ["img1.jpeg", "img2.jpeg", "img3.jpeg", "img4.jpeg", "img5.jpeg", "img9.jpeg", "img7.jpg", "img8.jpg"];
        easyTeam.arr = [{
                'nombre': 'RIDE IN CHIVA',
                'img': 'img/publicidad/chiva.jpg'
            },
            {
                'nombre': 'CITY TOUR',
                'img': 'img/publicidad/cityTour.jpg'
            },
            {
                'nombre': 'DIVING',
                'img': 'img/publicidad/buceo.jpg'
            },
            {
                'nombre': 'TOTUMO VOLCANO',
                'img': 'img/publicidad/totumo.jpg'
            },
            {
                'nombre': 'HORSE CARRIAGE',
                'img': 'img/publicidad/carriage.jpg'
            }
        ];
        easyTeam.paquete = "";
        easyTeam.paquetes = [{
            'idPaquete': 1,
            'descripcion': 'Transportation included 24 hours per day of stay with SoEasyTeam (urban perimeter only), if you want to leave the urban perimeter contact your host for more information, including gasoline and driver. The tour of the Rosario Islands is by luxury boat with a party in Cholon. Includes: breakfast with typical fried foods, lunch with sea food, beer and mixers, unlimited cocktails in select drinks.'
        }, {
            'idPaquete': 2,
            'descripcion': 'Transportation included 24 hours per day of stay with SoEasyTeam (urban perimeter only), if you want to leave the urban perimeter contact your host for more information, including gasoline and driver. The tour of the Rosario Islands is by luxury boat with a party in Cholon. Includes: breakfast with typical fried foods, lunch with sea food, beer and mixers, unlimited cocktails in select drinks. ALSO This package includes: private island trip, farewell party (24 national beers, water, soda).'
        }];

        easyTeam.onBuscarInfoPaquete = function (idPaquete) {
            var len = easyTeam.paquetes.length;
            for (var i = 0; i < len; i++) {
                if (easyTeam.paquetes[i].idPaquete == idPaquete) {
                    easyTeam.paquete = easyTeam.paquetes[i].descripcion;
                }
            }
        };

        easyTeam.scrollTop = function () {
            var body = document.body;
            var html = document.documentElement;

            body.scrollTop = 0 + "px";
            html.scrollTop = 0 + "px";
        };

        easyTeam.onAddCart = function (data) {

            if (!ngCart.getItemById(data.id)) {
                ngCart.addItem(data.id, data.nombre, data.valor, 1, {
                    imagen: data.imagen,
                    num_days: 1
                });
                easyTeam.dataCarrito = ngCart.getItems();
                toaster.pop({
                    type: 'success',
                    title: 'Added',
                    body: data.nombre,
                    timeout: 1500,
                    showCloseButton: true
                });
            } else {
                toaster.pop({
                    type: 'warning',
                    title: 'Warning',
                    body: 'The Product ' + data.nombre + ' Exists',
                    timeout: 1500,
                    showCloseButton: true
                });
            }
        };

        easyTeam.onValidarExistenciaProducto = function (idproducto) {

            if (ngCart.getItemById(idproducto)) {
                // return "Added";
                return true;
            }
        };

        easyTeam.ongetTotalItems = function () {
            return ngCart.getTotalItems();
        };

        easyTeam.onTotalCost = function () {
            return ngCart.totalCost();
        };

        easyTeam.onGetTotal = function (quantity, price, num_days) {
            var totaItem = quantity * price * num_days;
            return totaItem;
        };

        easyTeam.onRemoveItemById = function (id) {
            ngCart.removeItemById(id);
        };

        easyTeam.onCambiarEstadoFecha = function () {
            if (easyTeam.fechaServicio !== null || easyTeam.fechaServicio !== undefined || easyTeam.fechaServicio != "") {
                easyTeam.fechaVali = true;
            }
        };

        easyTeam.onGuardarCompra = function () {

            var data = [{
                "totalVenta": ngCart.totalCost(),
                "fecha": easyTeam.fechaServicio,
                "items": ngCart.getItems(),
                "id_usuario": easyTeam.infoUsuario[0].idusuarios,
                "correo": easyTeam.infoUsuario[0].email
            }];

            easyTeam.fechaVali = true;
            // console.log(data);

            if (easyTeam.ongetTotalItems() > 0) {
                if (easyTeam.fechaServicio === null || easyTeam.fechaServicio === undefined || easyTeam.fechaServicio == "") {
                    easyTeam.scrollTop();
                    easyTeam.fechaVali = false;
                } else {
                    var d = new Date();

                    var fechaServi = new Date(easyTeam.fechaServicio.getFullYear(), easyTeam.fechaServicio.getMonth(), easyTeam.fechaServicio.getDate());
                    var fechaActual = new Date(d.getFullYear(), d.getMonth(), d.getDate());

                    if (fechaServi >= fechaActual) {
                        easyTeam.fechaVali = true;
                        swal({
                            title: 'Confirm Purchase',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Confirm!'
                        }).then((status) => {
                            if (status.value) {
                                serviEasyTeam.guardarCompra({
                                    'data': data
                                }).then(function (resp) {
                                    easyTeam.dataCarrito = [];
                                    ngCart.empty();
                                    document.getElementById('fecha').value = "";
                                    swal({
                                        title: resp.data.message,
                                        text: 'An email has been sent with the details of your purchase',
                                        type: 'success',
                                    });
                                }).catch(function (error) {
                                    console.log(error);
                                });
                            }
                        });
                    } else {
                        swal({
                            title: "enter a date greater than or equal to today's",
                            type: 'warning',
                        });
                        easyTeam.scrollTop();
                    }
                }
            } else {
                swal({
                    title: 'Please Add Products To Cart',
                    type: 'warning',
                });
            }
        };

        // console.log(easyTeam.ongetTotalItems());
        // funcion que busca los nombre de usuario para la validacion en el registro
        easyTeam.onBuscarEmailUsuarios = function () {

            var len = easyTeam.listaEmailUsuarios.length;

            if (len <= 0) {
                serviEasyTeam.buscarEmailUsuarios().then(function (resp) {
                    // console.log(resp.data.data);
                    easyTeam.listaEmailUsuarios = resp.data.data;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        };

        // funcion que valida si un nombre de usuario no se repite esta funcion se dispara en la vista header.html
        easyTeam.onValidarEmail = function () {

            var len = easyTeam.listaEmailUsuarios.length;
            var sw = false;

            for (var i = 0; i < len; i++) {
                if (easyTeam.dataRegistro[0].correo == easyTeam.listaEmailUsuarios[i].email) {
                    sw = true;
                    break;
                }
            }

            if (sw) {
                easyTeam.emailUsuValid = true;
            }
        };

        // funcion que valida si el campo password es igual al campo confirmar password
        easyTeam.onValidarPassword = function () {

            var pass = easyTeam.dataRegistro[0].password;
            var configPass = easyTeam.dataRegistro[0].configPassword;

            if (configPass !== pass) {
                easyTeam.passValid = true;
            } else {
                easyTeam.passValid = false;
            }
        };

        // funcion que busca los paises para mostraslos en el select del registro
        easyTeam.onBuscarPaises = function () {

            serviEasyTeam.buscarPaises().then(function (resp) {
                // console.log(resp.data.data);
                easyTeam.listaPaises = resp.data.data;
            }).catch(function (error) {
                console.log(error);
            });
        };

        // funcion que guarda un nuevo cliente. Esta funcion se dispara en la vista header.html
        easyTeam.onGuardarCliente = function () {

            if (easyTeam.emailUsuValid == false && easyTeam.passValid == false) {

                serviEasyTeam.guardarCliente({
                    'data': easyTeam.dataRegistro
                }).then(function (resp) {

                    swal({
                        title: resp.data.message,
                        text: 'A Confirmation Mail Has Been Sent To Your Account of Email',
                        type: 'success'
                    });

                    if (resp.data.data) {
                        $location.path('Inicio');
                        easyTeam.scrollTop();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else {

                if (easyTeam.emailUsuValid) {
                    swal({
                        title: "Change The Mail",
                        type: "warning",
                    });
                } else {
                    swal({
                        title: "Passwords Are Not The Same",
                        type: "warning",
                    });
                }
            }
        };

        // funcion que valida el login de una persona
        easyTeam.onLogin = function () {

            serviEasyTeam.login({
                'data': easyTeam.login
            }).then(function (resp) {

                if (resp.data.data.sw != false) {

                    var response = resp.data.data.data;
                    var token = resp.data.data.token;

                    sessionStorage.setItem('infoUsuario', JSON.stringify(response));
                    sessionStorage.setItem('token', JSON.stringify(token));

                    easyTeam.ocultar = true;
                    easyTeam.infoUsuario = response;

                    document.getElementById('cerrarModal').click();

                    swal({
                        title: 'Welcome ' + response[0].nombre,
                        type: 'success',
                    });

                    $location.path('Inicio');
                } else {

                    easyTeam.msjErrorLogin = resp.data.message;

                    if (resp.data.data.estadoUser) {
                        easyTeam.estadoUser = resp.data.data.estadoUser;
                    } else {
                        easyTeam.estadoUser = resp.data.data.estadoUser;
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        // funccion para cerrar sesion de un cliente
        easyTeam.onLogout = function () {
            sessionStorage.removeItem('infoUsuario');
            sessionStorage.removeItem('token');

            easyTeam.infoUsuario = [];
            document.getElementById("pass").value = "";
            easyTeam.ocultar = false;
            if ($location.url() === "/Account") {
                $location.path('Inicio');
            }
        };

        // funcion que envia un nuevo email de confirmación
        easyTeam.onNuevoEmailConfimacionCorreo = function () {

            if (validar_email(easyTeam.login[0].email)) {
                serviEasyTeam.nuevoEmailConfirmarCorreo({
                    'data': easyTeam.login[0].email
                }).then(function (resp) {

                    if (resp.data.data) {
                        swal({
                            title: resp.data.message,
                            type: 'success',
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                swal({
                    title: 'Please specify a valid email',
                    type: 'warning',
                });
            }
        };

        // valida si un email está bien escrito
        function validar_email(email) {
            var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email) ? true : false;
        }

        // funcion que busca todos los apartamentos y las casas y los guarda en la variable easyTeam.listaApartCasas
        easyTeam.onBuscarApartCasa = function () {

            easyTeam.scrollTop();

            serviEasyTeam.buscarApartCasa().then(function (resp) {
                var len = resp.data.data.length;
                for (var i = 0; i < len; i++) {
                    if (resp.data.data[i].tipo == 'apartamento') {
                        easyTeam.listaApartamentos.push(resp.data.data[i]);
                    } else {
                        easyTeam.listaCasas.push(resp.data.data[i]);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        easyTeam.onBuscarYatesBotes = function () {

            easyTeam.scrollTop();

            serviEasyTeam.buscarYatesBotes().then(function (resp) {
                // console.log(resp.data.data);

                var len = resp.data.data.length;

                for (var i = 0; i < len; i++) {
                    if (resp.data.data[i].tipo == "yate") {
                        easyTeam.listaYates.push(resp.data.data[i]);
                    } else {
                        easyTeam.listaBotes.push(resp.data.data[i]);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        };

        easyTeam.onBuscarCarros = function () {

            easyTeam.scrollTop();

            serviEasyTeam.buscarCarros().then(function (resp) {
                easyTeam.listaCarros = resp.data.data;
                // console.log(resp.data.data);
            }).catch(function (error) {
                console.log(error);
            });
        };

        // funcion que busca las fotos de los productos en el archivo productos.json ubicado en la carpeta scripts
        easyTeam.onBuscarinfoImg = function (idproducto, tipo) {

            var tipo = tipo;
            var idproducto = idproducto;
            var data = [];

            serviEasyTeam.buscarImgJson().then(function (resp) {

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
                        //$sessionStorage.infoProducto=JSON.stringify(data);
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

                        $sessionStorage.infoProducto = JSON.stringify(data);
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

                        $sessionStorage.infoProducto = JSON.stringify(data);
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
                        $sessionStorage.infoProducto = JSON.stringify(data);
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
            }).catch(function (error) {
                console.log(error);
            });
        };

        easyTeam.onBuscarProductosUsuario = function () {
            var fk_usuario = easyTeam.infoUsuario[0].idusuarios;
            serviEasyTeam.buscarProductosUsuario(fk_usuario).then(function (resp) {
                easyTeam.productsUsuario = resp.data.data;
            }).catch(function (error) {
                console.log(error);
            });
        }

        easyTeam.onCambiarContrasena = function () {
            easyTeam.pass.id = easyTeam.infoUsuario[0].idusuarios;
            serviEasyTeam.cambiarContraseña(easyTeam.pass).then(function (resp) {
                if (resp.data.data == "Bien") {
                    swal({
                        title: "Password changed successly",
                        type: "success",
                    });
                } else if (resp.data.data == "Mal") {
                    swal({
                        title: "Error to change password",
                        type: "warning",
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        }


        easyTeam.onUpdateInfo = function () {
            serviEasyTeam.updateInfo(easyTeam.infoUsuario[0]).then(function (resp) {
                sessionStorage.setItem('infoUsuario', JSON.stringify(easyTeam.infoUsuario));
                swal({
                    title: "Personal details changed successly",
                    type: "success",
                });
            }).catch(function (error) {
                console.log(error);
            });
        }

        easyTeam.viewDetails = function (product) {
            sessionStorage.setItem('detailtProduct', JSON.stringify(product));
            $location.path("/Detail");
        }

        easyTeam.onGaleryProduct = function (id) {
            serviEasyTeam.searchGalery(id).then(function (resp) {
                easyTeam.galeryProduct = resp;
            }).catch(function (error) {
                console.log(error);
            });
        };

        if (easyTeam.detailtProduct && easyTeam.detailtProduct.id) {
            easyTeam.onGaleryProduct(easyTeam.detailtProduct.id);
        }

        $scope.loginFacebook = function (usuario) {
            easyTeam.onBuscarFacebook(usuario);
            // console.log(usuario);
        }

        easyTeam.onBuscarFacebook = function (usuario) {
            serviEasyTeam.buscarFacebook(usuario).then(function (resp) {

                if (resp && angular.isObject(resp)) {
                    
                    sessionStorage.setItem('infoUsuario', JSON.stringify([resp.data.data]));
                    sessionStorage.setItem('token', JSON.stringify(resp.data.token));
                    easyTeam.infoUsuario = [resp.data.data];

                    easyTeam.ocultar = true;
                    document.getElementById('cerrarModal').click();
                    $location.path('Inicio');
                };
            }).catch(function (error) {
                console.log(error);
            });
        };
    }
})();