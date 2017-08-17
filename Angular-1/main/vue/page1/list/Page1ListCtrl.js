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
