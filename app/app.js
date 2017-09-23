'use strict';

angular.module('goStarWar', [
  'ngRoute',
  'goStarWar.login',
  'goStarWar.dashboard','ui.bootstrap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);
