app.service('serviEasyTeam', ['$http', '$q', function($http, $q) {

    var servicio = this;

    servicio.guardarCliente = GuardarCliente;
    servicio.login = Login;
    servicio.buscarApartCasa = BuscarApartCasa;
    servicio.buscarNombresDeUsuarios = BuscarNombresDeUsuarios;
    servicio.buscarImgJson = BuscarImgJson;
    servicio.buscarYatesBotes = BuscarYatesBotes;
    servicio.buscarCarros = BuscarCarros;
    servicio.guardarCompra = GuardarCompra;

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

    function BuscarNombresDeUsuarios() {
        var defered = $q.defer();
        var urlRequest = url + "BuscarNombresDeUsuarios/";

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function Login(nomUsu, pass) {
        var defered = $q.defer();
        var urlRequest = url + "Login/" + nomUsu + "/" + pass;

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
}]);