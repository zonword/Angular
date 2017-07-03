# Mes notes sur Angular 1.6

*Ce qu'il faut savoir sur Angular 1.X*

AngularJs est un framework que j'affectionne tout particulièrement, le data binding d'une simplicité inégalé comparé avec Angular 4.

## Remarque

Angular 1 est dans tout mes projets pour le `web`, pour la création de logiciel grâce à `electron`, et le mobile avec `ionic 1`.
Voici quelque astuces que je dévoile ici pour la creation de mes projet

## Sommaire

   1. [Package](#package) package
   1. [Bower](#bower) Bower
   1. [Server](#server) Permet de lancer mon projet
   1. [Index](#server) Index.html
   1. [App](#app) App
   1. [Factory](#factory) Creer une factory
   1. [Controller](#controller) Répétition d'évenement

## Package
   Contient la parti back qui permet d'exécuter mon projet
   
```Javascript
{
  "name": "MonProjet",
  "version": "1.0.0",
  "description": "Descriptoin de mon projet",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.15.0",
    "express": "^4.13.4",
    "http": "^0.0.0",
    "request": "^2.69.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC"
}
```

## Bower
   Contient tout mes libraire pour le front
   
```Javascript   
{
  "name": "MonProjet",
  "description": "tout les lib necessaire au front",
  "main": "server.js",
  "authors": [
    "kevin grondin"
  ],
  "license": "ISC",
  "moduleType": [],
  "homepage": "",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "jquery": "^2.2.2",
    "angular": "^1.5.2",
    "angular-route": "^1.5.3",
    "angular-resource": "^1.5.3",
    "angular-cookies": "^1.5.3",
    "angular-sanitize": "^1.5.3",
    "angular-touch": "^1.5.3",
    "angular-animate": "^1.5.3",
    "bootstrap": "^3.3.6",
    "bootswatch": "^3.3.6",
    "angular-socket-io": "^0.7.0",
    "socket.io-client": "^1.4.5"
  }
}
```

## Server
   Le strict minimum pour lancer le projet sur le port 4000
   
```Javascript
var express = require('express');
var request = require('request');

var app     = express();
app.use('/', express.static('./main/'));
app.use('/lib', express.static('./bower_components/'));

var http    = require('http').Server(app);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(process.env.PORT || 4000, process.env.IP || "0.0.0.0", function(){
  console.log("Serveur web en cour");
});
```

## Index
   Index.html la vue principale

```Html
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Materiel</title>
        <link href="lib/bootswatch/cerulean/bootstrap.css" rel="stylesheet">
    </head>
    <body ng-app="myApp">
        
        <div class="wrapper">
            <div ng-view></div>
        </div>
        <!--lib-->
        <script type="text/javascript" src="http://back-office-du-site:2016/socket.io/socket.io.js"></script>
        <script src="lib/jquery/dist/jquery.min.js"></script>

        <script src="lib/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="lib/angular/angular.min.js"></script>
        <script src="lib/angular-route/angular-route.min.js"></script>
        <script src="lib/angular-resource/angular-resource.min.js"></script>
        <script src="lib/angular-cookies/angular-cookies.min.js"></script>
        <script src="lib/angular-sanitize/angular-sanitize.min.js"></script>
        <script src="lib/angular-touch/angular-touch.min.js"></script>
        <script src="lib/angular-animate/angular-animate.min.js"></script>

        <script src="lib/angular-socket-io/socket.js"></script>
        
        <!--Main-->
        <script src="js/app.js"></script>
        <script src="factory/MainFactory.js"></script>
        <script src="vue/page1/list/Page1ListCtrl.js"></script>
    </body>
</html>
```
   
## App
   App.js est la base de notre projet

```Javascript
(function() {
    "use strict";
    
    angular.module('myApp', ['btford.socket-io','ngRoute','MainFactory'])
    //.constant('CONSTANT', { MODE: "TEST", URL: "http://back-office-TEST-du-site/", SOCKET: "http://back-office-TEST-du-site:2016" })
    .constant('CONSTANT', { MODE: "PROD", URL: "http://back-office-du-site/", SOCKET: "http://back-office-du-site:2016" })
    .config(config)
    
    config.$inject = ['$routeProvider', '$httpProvider']
    function config($routeProvider,$httpProvider) {
        $routeProvider.
            when('/page1', {
                templateUrl: 'vue/page1/list/list.html',
                controller: 'Page1ListCtrl'
            }).
            otherwise({
                redirectTo: '/page1'
            });
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    
})();
```

## Factory
   Voici comment j'ecris mon Factory principale, généralement contient tout les correspondance des mes API.
   classeA peut avoir tout les correspondance avec les API Youtube 
   ClasseB de facebook, etc
   
   Je n'aurais a importer qu'un seul fichier pour avoir tout mes API
   
```Javascript
(function() {
    "use strict";
    angular.module('MainFactory', [])
        .factory("ClasseA", ClasseA)
        .factory("ClasseB", ClasseB)
        .factory("ClasseSocket", ClasseSocket)
        .factory("socketio", socketio)
        
        ClasseA.$inject = ['$q','$http','CONSTANT'];
        function ClasseA($q,$http,CONSTANT) {
           var Get = () => {
              var q = $q.defer();
              $http({method: 'GET', url: 'http://api_site_internet/'})
                 .thne(res => {
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
                 .thne(res => {
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
```

## Controller
   exemple d'un Controller pour echanger avec ma vue

```Javascript
(function(){
    "use strict";
    
    angular.module('myApp')
    .controller('Page1ListCtrl', ListController)
    
    ListController.$inject = ['$scope','ClasseA','ClasseSocket','$timeout'];
    function ListController($scope,ClasseA,ClasseSocket,$timeout) {
        ClasseSocket.connect();

        function GetClasseA(socket){ 
            ClasseA.Get()
                .then(function(data) {
                    // data contient mes resultats
                }, function(err) {
                    // err contient mes resultats
                });
        }

        GetClasseA();
    }
        
})();
```
