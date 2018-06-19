'use strict';


var app = angular.module('easyTeam', [
    'ui.router',
    'ngCart',
    'toaster',
    'angular-jwt',
    'angular-md5',
    'ngStorage'
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
    		url: "/Package",
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
        }).state('ApartCasa', {
            url: "/ApartCasa",
            templateUrl: "views/apartCasa.html"
        }).state('YatesBotes', {
            url: "/YatesBotes",
            templateUrl: "views/yatesBotes.html"
        }).state('Transporte', {
            url: "/Transporte",
            templateUrl: "views/transporte.html"
        }).state('Carros', {
            url: "/Cars",
            templateUrl: "views/carros.html"
        });
    }
]);

// app.directive("itemCarrito", function(){
//     return {
//         ngCart.getTotalItems()
//     };
// });