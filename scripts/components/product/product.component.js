app.component('mcProduct', {
    templateUrl: './scripts/components/product/product.html',
    bindings: {
        arrayProduct: "="
    },
    controller: [
        'serviEasyTeam',
        'ngCart',
        '$sessionStorage',
        'toaster',
        '$location',
        function productController(serviEasyTeam, ngCart, $sessionStorage, toaster, $location) {

            var productCtrl = this;

            productCtrl.onAddCart = function (data) {

                if (!ngCart.getItemById(data.id)) {
                    ngCart.addItem(data.id, data.nombre, data.valor, 1, {
                        imagen: data.imagen,
                        num_days: 1
                    });
                    productCtrl.dataCarrito = ngCart.getItems();
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

            productCtrl.viewDetails = function (product) {
                sessionStorage.setItem('detailtProduct', JSON.stringify(product));
                $location.path("/Detail");
            }

            // funcion que busca las fotos de los productos en el archivo productos.json ubicado en la carpeta scripts
            productCtrl.onBuscarinfoImg = function (idproducto, tipo) {

                var tipo = tipo;
                var idproducto = idproducto;
                var data = [];

                serviEasyTeam.buscarImgJson().then(function (resp) {

                    productCtrl.dataJson = resp.data;

                    switch (tipo) {

                        case "yate":
                            var len = productCtrl.listaYates.length;
                            var len2 = productCtrl.dataJson.yate.length;
                            var i = 0;
                            var j = 0;
                            for (i = 0; i < len; i++) {
                                if (productCtrl.listaYates[i].idproducto == idproducto) {
                                    data.push(productCtrl.listaYates[i]);
                                    break;
                                }
                            }

                            for (j = 0; j < len2; j++) {
                                if (productCtrl.dataJson.yate[j].id == idproducto) {
                                    data.push(productCtrl.dataJson.yate[j].galeria);
                                }
                            }
                            //$sessionStorage.infoProducto=JSON.stringify(data);
                            break;
                        case "bote":
                            var len = productCtrl.listaBotes.length;
                            var len2 = productCtrl.dataJson.bote.length;
                            var i = 0;
                            var j = 0;

                            for (i = 0; i < len; i++) {
                                if (productCtrl.listaBotes[i].idproducto == idproducto) {
                                    data.push(productCtrl.listaBotes[i]);
                                    break;
                                }
                            }

                            for (j = 0; j < len2; j++) {
                                if (productCtrl.dataJson.bote[j].id == idproducto) {
                                    data.push(productCtrl.dataJson.bote[j].galeria);
                                }
                            }

                            $sessionStorage.infoProducto = JSON.stringify(data);
                            break;
                        case "apartamento":
                            var len = productCtrl.dataJson.apartamento.length;
                            var len2 = productCtrl.listaApartamentos.length;
                            var i = 0;
                            var j = 0;

                            for (i = 0; i < len; i++) {
                                if (productCtrl.listaApartamentos[i].idproducto == idproducto) {
                                    data.push(productCtrl.listaApartamentos[i]);
                                    break;
                                }
                            }

                            for (j = 0; j < len2; j++) {
                                if (productCtrl.dataJson.apartamento[j].id == idproducto) {
                                    data.push(productCtrl.dataJson.apartamento[j].galeria);
                                }
                            }

                            $sessionStorage.infoProducto = JSON.stringify(data);
                            break;
                        case "casa":

                            var len = productCtrl.listaCasas.length;
                            var len2 = productCtrl.dataJson.casa.length;
                            var i = 0;
                            var j = 0;

                            for (i = 0; i < len; i++) {
                                if (productCtrl.listaCasas[i].idproducto == idproducto) {
                                    data.push(productCtrl.listaCasas[i]);
                                    break;
                                }
                            }

                            for (j = 0; j < len2; j++) {
                                if (productCtrl.dataJson.casa[j].id == idproducto) {
                                    data.push(productCtrl.dataJson.casa[j].galeria);
                                }
                            }
                            $sessionStorage.infoProducto = JSON.stringify(data);
                            break;
                        case "carro":
                            var len = productCtrl.listaCarros.length;
                            var len2 = productCtrl.dataJson.carro.length;
                            var i = 0;
                            var j = 0;

                            for (i = 0; i < len; i++) {
                                if (productCtrl.dataJson.carro[i].id == idproducto) {
                                    data.push(productCtrl.dataJson.carro[i].galeria);
                                }
                            }

                            for (j = 0; j < len2; j++) {
                                if (productCtrl.dataJson.carro[j].id == idproducto) {
                                    data.push(productCtrl.dataJson.carro[j].galeria);
                                }
                            }
                            break;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            };
        }
    ],
    controllerAs: "productCtrl"
});