/**
 * Created by gaurav.m on 9/22/17.
 */
'use strict';

angular.module('goStarWar.dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$http', '$scope', "$location", '$q', function ($http, $scope, $location, $q) {
        $scope.search = ""
        $scope.noOfSearchPerformed = 0
        /**
         * if user is not a logged in user, redirects to the login page.
         */
        if (!sessionStorage.user || !angular.fromJson(sessionStorage.user).name) {
            $location.path("/login")
        }

        var canceler = $q.defer();
        var resolved = false;

        var cancel = function () {
            canceler.resolve("ABORTED RECENT CALL.");
        };

        $scope.loadPlanets = function () {
            if ($scope.noOfSearchPerformed > 15) {
                alert("You've reached maximum limit of searches")
                return false
            }
            $scope.loaded = false
            $scope.planets = []
            /**
             * If another HTTP request is pending,
             * cancel that call and updates with the new
             * keyword search
             */
            if (resolved) {
                cancel();
            }

            canceler = $q.defer();
            resolved = true;
            $http.get("https://swapi.co/api/planets?search=" + $scope.search, {timeout: canceler.promise}).success(function (data) {
                $scope.loaded = true
                $scope.noOfSearchPerformed++;
                if (data && data.results.length > 0) {
                    $scope.planets = data.results
                    /**
                     * Find the maximum of population to show the
                     * relative population in the listing page.
                     */
                    $scope.maxPopulation = Math.max.apply(null, data.results.map(function (planet) {
                        return +planet.population
                    }))
                }
            })
        }
        $scope.loadPlanets()


        /**
         * Clicking the logout button will remove the user
         * session and will redirect to the login page.
         */
        $scope.logout = function () {
            delete $rootScope.user
            sessionStorage.removeItem('user')
            $location.path("/login")
        }

    }]);