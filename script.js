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
            })

            .when('/signup', {
                templateUrl : 'pages/signup.html',
                controller  : 'signupController'
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
      '$http',
      function($scope, $http) {
        $scope.submit = function() {
          console.log('Submit username = ' + $scope.username + ', password = ' + $scope.password);

          $http.get('http://localhost:2300/v1/users/' + $scope.username + '?' + $scope.password)
          .then(function(response){
            if (response.data['status'] == 200) {
              $scope.message = 'Success!'
              $scope.token = response.data['token']
            } else {
              $scope.message = 'Sorry!'
            }
            console.log(String(response.data['token']))
            $scope.text = $scope.token
          });


        }
      }
    ]);


    noteshareApp.controller('signupController', function($scope) {
    });

/**
    noteshareApp.controller('documentController', function($scope, $http) {
      $http.get('http://localhost:2300/documents/12')
      .then(function(response){
        $scope.text = response.data
      });
    });
*/
