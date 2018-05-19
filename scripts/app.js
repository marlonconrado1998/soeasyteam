'use strict';


var app = angular.module('easyTeam', [
    'ui.router',
    'ngCart'
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    	$urlRouterProvider.otherwise('/Inicio');

    	$stateProvider.state('Inicio', {
    		url: "/Inicio",
    		templateUrl: "views/main.html"
    	}).state('Hola', {
    		url: "/Hola",
    		templateUrl: "views/hola.html"
    	}).state('Paquetes', {
    		url: "/Paquetes",
    		templateUrl: "views/paquetes.html"
    	}).state('Productos', {
    		url: "/Productos",
    		templateUrl: "views/productos.html"
    	}).state('Detalles', {
    		url: "/Detalles",
    		templateUrl: "views/detalles.html"
    	}).state('Registro', {
    		url: "/Registro",
    		templateUrl: "views/registro.html"
    	}).state('Carrito',{
            url: "/Carrito",
            templateUrl: "views/carrito.html"
        }).state('About',{
            url: "/About",
            templateUrl: "views/about.html"
        }).state('ClientesFelices',{
            url: "/ClientesFelices",
            templateUrl: "views/clientes_felices.html"
        });
    }
]);