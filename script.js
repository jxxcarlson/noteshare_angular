// script.js

    // create the module and name it noteshareApp
        // also include ngRoute for all our routing needs
    var noteshareApp = angular.module('noteshareApp', ['ngRoute']);

    // configure our routes
    noteshareApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
    noteshareApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    noteshareApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    noteshareApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    noteshareApp.controller('documentController', function readDocument($scope, $http) {
      $http.get('http://localhost:2300/documents/12')
      .then(function(response){
        $scope.text = response.data
      });
    });
