app.service('serviEasyTeam', ['$http', '$q', function($http, $q) {

    var servicio = this;

    servicio.guardarCliente = GuardarCliente;
    servicio.login = Login;
    servicio.buscarTodosProductos = BuscarTodosProductos;
    servicio.buscarNombresDeUsuarios = BuscarNombresDeUsuarios;


    var url = "http://localhost/easy_team2/webapis/api/api_easyTeam.php/";

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

        $http.post(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }

    function BuscarTodosProductos() {
        var defered = $q.defer();
        var urlRequest = url + "BuscarTodosProductos/";

        $http.get(urlRequest).then(function(resp) {
            defered.resolve(resp);
        }).catch(function(error) {
            defered.reject(error);
        })

        return defered.promise;
    }
}]);