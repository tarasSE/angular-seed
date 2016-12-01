'use strict';
// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ui.router',
    'ngCookies',                // Routing
    'oc.lazyLoad',                  // ocLazyLoad
    //'ui.bootstrap',                 // Ui Bootstrap
    'pascalprecht.translate',       // Angular Translate
    'ngIdle',                       // Idle timer
    'ngResource',
    //'match'
    //'myApp.view1',
    //'myApp.view2',
    //'myApp.version'
]);

//app.controller('TestCtrl', [function() {
//    alert("I'm working!")
//}]);

app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'IdleProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider) {

        alert("TEST");
        // Configure Idle settings
        IdleProvider.idle(5); // in seconds
        IdleProvider.timeout(120); // in seconds

        $urlRouterProvider.otherwise("/");

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: true,
            modules: [{
                name: 'match',
                files: ['scripts.html', './bower_components/ng-resource/dist/ng-resource.js']
            }]
        });
        //$locationProvider.html5Mode({ enabled: true, requireBase: false});
        $stateProvider
            .state('app', {
                url: "/site",
                templateUrl: 'root.html',
                abstract: true,
                resolve: {}
            })
            .state('app.homepage', {
                url: "/home",
                templateUrl: "view3/test.html",
                data: {pageTitle: 'Home page', specialClass: 'index-page'},
                controller: 'TestCtrl',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('match');
                    }
                }
            })
            .state('app.view1', {
                url: "/view1",
                templateUrl: "view1/view1.html",
                data: {pageTitle: 'Home page', specialClass: 'index-page'},
                controller: "View1Ctrl",
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            //{
                            //    files: ['/js/wow/wow.min.js']
                            //}
                        ]);
                    }
                }
            })
            .state('app.view2', {
                url: "/view2",
                templateUrl: "view2/view2.html",
                data: {pageTitle: 'Home page', specialClass: 'index-page'},
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        alert("loaded!");
                        return $ocLazyLoad.load([
                            //{
                            //    files: ['/js/wow/wow.min.js']
                            //}
                        ]);
                    }
                }
            })

    }]);
