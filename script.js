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
            .when('/documents', {
                templateUrl : 'pages/documents.html',
                controller  : 'documentsController'
            });
    });

    // create the controller and inject Angular's $scope
    noteshareApp.controller('mainController', function($scope, $http) {
      $http.get('http://localhost:2300/v1/documents/1')
      .then(function(response){
        console.log(String(response.data))
        $scope.text = response.data['document']['text']
      });
    });

    noteshareApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    noteshareApp.controller('documentsController', function($scope, $http) {
      $http.get('http://localhost:2300/v1/documents/1')
      .then(function(response){
        console.log(String(response.data))
        $scope.text = response.data['document']['text']
      });
    });

    noteshareApp.controller('signinController', [
      '$scope',
      function($scope) {
        $scope.submit = function() { console.log('Sign in page: submit'); }
      }
    ]);


/**
    noteshareApp.controller('documentController', function($scope, $http) {
      $http.get('http://localhost:2300/documents/12')
      .then(function(response){
        $scope.text = response.data
      });
    });
*/
