(function() {
    "use strict";
    angular.module('myApp', [])
        .directive("client", Client)
        
    function Client() {
       return{
          restrict: 'E',
          templateUrl: 'templates/client.html'
       }
    }
})();
