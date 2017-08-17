(function() {
    "use strict";
    angular.module('MainFactory', [])
        .factory("ClasseA", ClasseA)
        .factory("ClasseB", ClasseB)
        .factory("ClasseSocket", ClasseSocket)
        .factory("socketio", socketio)
        
        ClasseA.$inject = ['$q','$http','CONSTANT'];
        function ClasseA($q,$http,CONSTANT) {
           var url      = CONSTANT.URL+'ClasseA.php';
           var config   = {
                headers: {
                    "Accept": "application/json;charset=utf-8",
                    "Accept-Charset":"charset=utf-8"
                }
            };
           
           var Get = () => {
              var q = $q.defer();
              $http({method: 'GET', url: url, params: { action: "Get"} })
                 .then(res => {
                    q.resolve(res)
                 }, err => {
                    q.reject(err)
                 });
              return q.promise;
           }
           
           var Set = (id,modif) => {
              var q = $q.defer();
              var data = {
                 id : id,
                 modif : modif
              }
              $http({ method: 'POST', url: url, params: { action: "Set" }, data: data, config: config })
                 .then(res => {
                    q.resolve(res)
                 }, err => {
                    q.reject(err)
                 });
              return q.promise;
           }
           
           return {
              Get: Get,
              Set: Set
           }
        }
        
        ClasseB.$inject = ['$q','$http','CONSTANT'];
        function ClasseB($q,$http,CONSTANT) {
           var Get = () => {
              var q = $q.defer();
              $http({method: 'GET', url: 'http://api_site_internet/'})
                 .then(res => {
                    q.resolve(res)
                 }, err => {
                    q.reject(err)
                 });
              return q.promise;
           }
           
           return {
              Get: Get,
              Set: Set
           }
        }
        
        ClasseSocket.$inject = ['socketFactory','CONSTANT'];
        function ClasseSocket(socketFactory,CONSTANT){
            var myIoSocket  = io.connect(ENV.SOCKET);
            var socket      = socketFactory({ ioSocket: myIoSocket });
            return socket;
        }

        socketio.$inject = ['$rootScope'];
        function socketio($rootScope){
            var socket = io.connect();
            return {
                on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                    callback.apply(socket, args);
                    });
                });
                },
                emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                    if(callback){
                        callback.apply(socket, args);
                    }
                    });
                })
                }
            };
        }
