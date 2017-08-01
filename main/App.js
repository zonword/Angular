(function() {
    "use strict";
    
    angular.module('myApp', ['btford.socket-io','ngRoute','anychart-angularjs','MainFactory'])
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
