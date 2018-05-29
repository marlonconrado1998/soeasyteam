'use strict';

(function() {
    app.controller('carritoController', carritoController);

    carritoController.$inject = ['$scope', '$http', 'ngCart'];

    function carritoController($scope, $http, ngCart) {
        ngCart.setTaxRate(7.5);
        ngCart.setShipping(2.99);
        console.log(ngCart);

        var cart = this;

        cart.agregar = function(id, nombre, precio, cantidad, data) {
            ngCart.addItem(id, nombre, precio, cantidad, data);
        };
    };
})();