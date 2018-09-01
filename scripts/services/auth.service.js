(function() {
    'use strict';

    app.service('auth_service', auth_service);

    auth_service.$inject = ['$sessionStorage','jwtHelper', 'md5'];

    //Servicio de Autenticacion
    function auth_service($sessionStorage,jwtHelper, md5) {
        var service = this;
        service.jwt = jwt;

        //Funcion que desifra el token y lo convierte en un json manejable
        function jwt() {
            
        }
    }
})();