/**
 * Created by gaurav.m on 9/22/17.
 */
'use strict';

angular.module('goStarWar.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {

        /**
         * If already logged in user, redirect to dashboard
         */
        if (sessionStorage.user && angular.fromJson(sessionStorage.user).name) {
            $location.path("/dashboard")
        }
        $scope.login = function () {
            $http.get("https://swapi.co/api/people/").success(function (data) {
                if (data.results && data.results.length > 0 && data.results.filter(function (result) {
                        let user_found = (result.name === $scope.user.username && result.birth_year === $scope.user.password)
                        /**
                         * If user found, store it in session storage and rootscope
                         */
                        if (user_found) {
                            $rootScope.user = result
                            sessionStorage.user = angular.toJson(result);
                        }
                        return user_found
                    }).length > 0) {
                    $location.path("/dashboard")

                } else {
                    alert("Not a valid user found.")
                }
            })
        }
    }]);