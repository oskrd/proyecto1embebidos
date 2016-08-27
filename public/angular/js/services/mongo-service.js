var rootURL = "http://winvisual-mongo.eastus.cloudapp.azure.com:8888/";

angular.module('starter.services', [])
        .factory('MyServices', function ($http) {
            return {
                //singin
                signin: function (signin, callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'usuarios/login',
                        data: {
                            "correo": signin.username,
                            "password": signin.password
                        }
                    }).success(callback).error(err);
                },
                
                //estadistica de dashboard
                estadisticas: function (callback, err) {
                    return $http({
                        method: "GET",
                        url: rootURL + 'resumen'
                    }).success(callback).error(err);
                },
                
                //estaciones
                getEstaciones: function (callback, err) {
                    return $http({
                        method: "GET",
                        url: rootURL + 'estaciones/lista'
                    }).success(callback).error(err);
                },
                postEstaciones: function (estacion,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'estaciones/editar',
                        data: estacion
                    }).success(callback).error(err);
                },
                postMangas: function (manga,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'mangas/editar',
                        data: manga
                    }).success(callback).error(err);
                },
                putEstaciones: function (estacion,callback, err) {
                    return $http({
                        method: "PUT",
                        url: rootURL + 'estaciones/nuevo',
                        data: estacion
                    }).success(callback).error(err);
                },
                putMangas: function (manga,callback, err) {
                    return $http({
                        method: "PUT",
                        url: rootURL + 'mangas/nuevo',
                        data: manga
                    }).success(callback).error(err);
                },
                deleteEstaciones: function (id,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'estaciones/borrar',
                        data: id
                    }).success(callback).error(err);
                },
                deleteMangas: function (id,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'mangas/borrar',
                        data: id
                    }).success(callback).error(err);
                },
                
                //vasos
                getVasos: function (callback, err) {
                    return $http({
                        method: "GET",
                        url: rootURL + 'vasos/lista'
                    }).success(callback).error(err);
                },
                postVasos: function (vaso,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'vasos/editar',
                        data: vaso
                    }).success(callback).error(err);
                },
                putVasos: function (vaso,callback, err) {
                    return $http({
                        method: "PUT",
                        url: rootURL + 'vasos/nuevo',
                        data: vaso
                    }).success(callback).error(err);
                },
                deleteVasos: function (id,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'vasos/borrar',
                        data: id
                    }).success(callback).error(err);
                },
                
                //combos
                getCombos: function (callback, err) {
                    return $http({
                        method: "GET",
                        url: rootURL + 'combos/lista'
                    }).success(callback).error(err);
                },
                postCombos: function (combo,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'combos/editar',
                        data: combo
                    }).success(callback).error(err);
                },
                putCombos: function (combo,callback, err) {
                    return $http({
                        method: "PUT",
                        url: rootURL + 'combos/nuevo',
                        data: combo
                    }).success(callback).error(err);
                },
                deleteCombos: function (id,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'combos/borrar',
                        data: id
                    }).success(callback).error(err);
                },
                
                //mail
                ////comentarios
                 getComments: function (callback, err) {
                    return $http({
                        method: "GET",
                        url: rootURL + 'comentarios/lista'
                    }).success(callback).error(err);
                },
                deleteComments: function (id,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'comentarios/borrar',
                        data: id
                    }).success(callback).error(err);
                },
                
                //swugerencias
                 getSugest: function (callback, err) {
                    return $http({
                        method: "GET",
                        url: rootURL + 'sugerencias/lista'
                    }).success(callback).error(err);
                },
                deleteSugest: function (id,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'sugerencias/borrar',
                        data: id
                    }).success(callback).error(err);
                },
                
                //configuracion
                //About
                getAbout: function (callback, err) {
                    return $http({
                        method: "GET",
                        url: rootURL + 'empresa/acercade'
                    }).success(callback).error(err);
                },
                //contact
                getContact: function (callback, err) {
                    return $http({
                        method: "GET",
                        url: rootURL + 'empresa/contacto'
                    }).success(callback).error(err);
                },
                //configuracion
                postConfiguracion: function (configuracion,callback, err) {
                    return $http({
                        method: "POST",
                        url: rootURL + 'empresa/editar',
                        data: configuracion
                    }).success(callback).error(err);
                }
            };
        });

     