# Mes notes sur Angular 1.6

*Ce qu'il faut savoir sur Angular 1.X*

AngularJs est un framework que j'affectionne tout particulièrement, le data binding d'une simplicité inégalé comparé avec Angular 4.

## Remarque

Angular 1 est dans tout mes projets pour le `web`, pour la création de logiciel grâce à `electron`, et le mobile avec `ionic 1`.
Voici quelque astuces que je dévoile ici pour la creation de mes projet

## Sommaire

   1. [Factory](#factory) Creer une factory
   1. [Boucle Avec Condition](#boucle-avec-condition) Une boucle avec condition
   1. [setInterval](#setInterval) Répétition d'évenement
   1. [ArrayJson](#arrayjson) atteindre les différente clée d'un tableau JSON

## Factory
   Si je parle 

```Javascript
(function() {
    "use strict";
    angular.module('MainClass', [])
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
```
