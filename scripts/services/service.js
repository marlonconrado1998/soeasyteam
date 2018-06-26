'use strict';

app.service('serviEasyTeam', ['$http', '$q', function($http, $q) {

    var servicio = this;

    servicio.guardarCliente = GuardarCliente;
    servicio.login = Login;
    servicio.buscarApartCasa = BuscarApartCasa;
    servicio.buscarEmailUsuarios = BuscarEmailUsuarios;
    servicio.buscarImgJson = BuscarImgJson;
    servicio.buscarYatesBotes = BuscarYatesBotes;
    servicio.buscarCarros = BuscarCarros;
    servicio.guardarCompra = GuardarCompra;
    servicio.buscarPaises = BuscarPaises;
    servicio.nuevoEmailConfirmarCorreo = NuevoEmailConfirmarCorreo;
    servicio.buscarProductosUsuario = BuscarProductosUsuario;
    servicio.cambiarContraseña = CambiarContraseña;
    servicio.updateInfo = UpdateInfo;

    var url = "http://localhost/soEasyTeam/webapis/api/api_easyTeam.php/";

    function BuscarImgJson(){

        var defered = $q.defer();
        var urlRequest = "http://localhost/soEasyTeam/scripts/productos.json";

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
           defered.reject(error);
        });

        return defered.promise;
    }

    function GuardarCliente(data) {
        var defered = $q.defer();
        var urlRequest = url + "GuardarCliente/";

        $http.post(urlRequest, data).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function BuscarEmailUsuarios() {
        var defered = $q.defer();
        var urlRequest = url + "BuscarEmailUsuarios/";

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function Login(data) {
        var defered = $q.defer();
        var urlRequest = url + "Login/";

        $http.post(urlRequest, data).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function NuevoEmailConfirmarCorreo(data) {
        var defered = $q.defer();
        var urlRequest = url + "NuevoEmailConfirmarCorreo/";

        $http.post(urlRequest, data).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function BuscarPaises() {
        var defered = $q.defer();
        var urlRequest = url + "BuscarPaises/";

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function BuscarApartCasa() {
        var defered = $q.defer();
        var urlRequest = url + "BuscarApartCasa/";

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function BuscarYatesBotes() {
        var defered = $q.defer();
        var urlRequest = url + "BuscarYatesBotes/";

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function BuscarCarros() {
        var defered = $q.defer();
        var urlRequest = url + "BuscarCarros/";

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function GuardarCompra(data) {
        var defered = $q.defer();
        var urlRequest = url + "GuardarCompra/";

        $http.post(urlRequest, data).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function BuscarProductosUsuario(fk_usuario) {
        var defered = $q.defer();
        var urlRequest = url + "BuscarProductosUsuario/"+fk_usuario;

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }
    
    function CambiarContraseña(usuario) {
        var defered = $q.defer();
        var urlRequest = url + "CambiarContrasena";

        $http.post(urlRequest, usuario).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }
    
    function UpdateInfo (usuario) {
        var defered = $q.defer();
        var urlRequest = url + "UpdateInfo";

        $http.post(urlRequest, usuario).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }
}]);