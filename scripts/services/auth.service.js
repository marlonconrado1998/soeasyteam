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
            var token = $sessionStorage.infoUsuario;
            var fecha = new Date();
            var rem = md5.createHash(fecha.getDate() + "");
            token = token.substr(0, (token.length - 38));
            token = token.replace(rem, ".");
            token = token.replace(rem, ".");
            token = jwtHelper.decodeToken(token);
            token = token.data;
            token = {
                nombre: token.nombre,
                telefono: token.telefono,
                email: token.email,
                id: token.idusuarios
            };
            return token;
        }
    }
})();