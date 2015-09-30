// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','jett.ionic.filter.bar','starter.controllers'])

        .run(function ($ionicPlatform, $http, $rootScope) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
            $rootScope.data = {}
            $rootScope.onTeamsLoaded = function(){};
            $http.get('/json/test.json').
                    then(function (response) {
                        console.log(response);
                        $rootScope.data.teams = response.data;
                        $rootScope.data.teams.forEach(function(team){
                            team.searchText = team.name + team.age + team.sport + team.zip;
                        })
                        //$rootScope.onTeamsLoaded();
                    }, function (response) {
                        alert('error getting json');
                    });
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('teams', {
                        url: '/teams',
                        templateUrl: 'templates/teams.html',
                        controller: 'TeamsCtrl'
                    })

                    .state('team', {
                        url: '/team/:teamId',
                        templateUrl: 'templates/team.html',
                        controller: 'TeamCtrl'
                    })

                    .state('map',{
                        url: '/map?zip',
                        templateUrl: 'templates/map.html',
                        controller: 'MapCtrl'
                    })
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/teams');
        });
