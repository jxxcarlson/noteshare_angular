// script.js

    // create the module and name it noteshareApp
        // also include ngRoute for all our routing needs
    var noteshareApp = angular.module('noteshareApp', ['ngRoute', 'ngStorage']);

    /*
This directive allows us to pass a function in on an enter key to do what we want.
http://fiddle.jshell.net/lsconyer/bktpzgre/1/light/

That’s it.  Now just add ng-enter="myFunction()" to any element in your partial
that detects keystrokes. This has helped me a ton and added a lot of easy
functionality to an already great AngularJS system.  If you have any other
great directives or AngularJS tips please leave them below in the comments.
 */
 angular.module('noteshareApp').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});


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


            .when('/newdocument', {
                templateUrl : 'pages/newdocument.html',
                controller  : 'newDocumentController'
            })

            // route for the contact page
            .when('/documents', {
                templateUrl : 'pages/documents.html',
                controller  : 'documentsController'
            })

            .when('/documents/:id', {
                templateUrl : 'pages/documents.html',
                controller  : 'documentsController'
            })


            .when('/editdocument', {
                templateUrl : 'pages/editdocument.html',
                controller  : 'editDocumentController'
            })

            .when('/editdocument/:id', {
                templateUrl : 'pages/editdocument.html',
                controller  : 'editDocumentController'
            })

            .when('/signup', {
                templateUrl : 'pages/signup.html',
                controller  : 'signupController'
            });
    });

    // create the controller and inject Angular's $scope
    noteshareApp.controller('mainController', function($scope, $http) {

    });

    /* REFERENCE: https://github.com/gsklee/ngStorage */
    noteshareApp.controller('searchController', [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
      $scope.doSearch = function(){
            console.log('Search text: ' + $scope.searchText);
            $http.get('http://localhost:2300/v1/documents' + '?' + $scope.searchText  )
            .then(function(response){
              console.log(response.data['status'])
              var jsonData = response.data
              var documents = jsonData['documents']
              $localStorage.documents = documents
            });

      };
    }]);


    noteshareApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });


    noteshareApp.controller('signinController', [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
        $scope.submit = function() {
          console.log('Submit username = ' + $scope.username + ', password = ' + $scope.password);

          $http.get('http://localhost:2300/v1/users/' + $scope.username + '?' + $scope.password)
          .then(function(response){
            if (response.data['status'] == 200) {
              $scope.message = 'Success!'
              $localStorage.access_token = response.data['token']
            } else {
              $scope.message = 'Sorry!'
            }
            console.log(String(response.data['token']))
            $scope.text = $scope.token
          });
        }
      }
    ]);


    noteshareApp.controller('signupController', [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
        $scope.submit = function() {
          var parameter = JSON.stringify({username:$scope.username, email:$scope.email, password: $scope.password, password_confirmation: $scope.passwordConfirmation});
          console.log(parameter);

          $http.post('http://localhost:2300/v1/users/create', parameter)
          .then(function(response){
            if (response.data['status'] == 200) {
              $scope.message = 'Success!'
              $localStorage.access_token = response.data['token']
            } else {
              $scope.message = response.data['error']
            }
            console.log('status = ' + String(response.data['status']))
          });


        }
      }
    ]);


    noteshareApp.controller('newDocumentController', [
      '$scope',
      '$http',
      '$localStorage',
      function($scope, $http, $localStorage) {
        $scope.submit = function() {

          console.log('CREATE DOCUMENT')
          console.log("create new document: " + $scope.title)

          var access_token = $localStorage.access_token
          console.log("TOKEN: " + String(access_token))

          var parameter = JSON.stringify({title:$scope.title, token:access_token });
          console.log('parameter: ' + parameter);

          $http.post('http://localhost:2300/v1/documents', parameter)
          .then(function(response){
            if (response.data['status'] == 200) {
              $scope.message = 'Success!'
            } else {
              $scope.message = response.data['error']
            }
            console.log('status = ' + String(response.data['status']))
          });


        }
      }
    ]);

    /*
    REFERENCE: https://github.com/gsklee/ngStorage

    For example, URL’s like /route/12345?a=2&b=3 will match the route /route
    with id 12345 and query string variables a & b. Now those values can
    be accessed in controller code using $routeParams service. Any parameter
    [preceded by ':'] in route can be accessed in controller by it’s name
    using $routeParams.paramName. Additionally, any query string passed
    in URL can be accessed in controller using $routeParams.variableName
    */
    noteshareApp.controller('documentsController', [
      '$scope',
      '$localStorage',
      '$routeParams',
      '$http',

      function($scope, $localStorage, $routeParams, $http) {

        var id;
        if ($routeParams.id != undefined) {
          id = $routeParams.id
        } else {
          id = $localStorage.currentDocumentID;
        }

        console.log('Document id: ' + id)
        $scope.title = $localStorage.title
        $scope.text = $localStorage.text
        /* $scope.documents = [{'title': 'Foo'}, {'title': 'Bar'}] */
        var docArray = $localStorage.documents
        $scope.docArray = docArray
        $http.get('http://localhost:2300/v1/documents/' + id  )
        .then(function(response){
          $scope.text = response.data['document']['text']
          $scope.title = response.data['document']['title']
          $localStorage.currentDocumentID = response.data['document']['id']
          $localStorage.title = $scope.title
          $localStorage.text = $scope.text
          console.log('TEXT: ' + $scope.text)
        });
    }]);

    noteshareApp.controller('editDocumentController', [
    '$scope',
    '$localStorage',
    '$routeParams',
    '$http',
    function($scope, $localStorage, $routeParams, $http) {

        var id;
        console.log('EDIT CONTROLLER, $routeParams.id: ' + $routeParams.id)
        if ($routeParams.id != undefined) {
            id = $routeParams.id
        } else {
            id = $localStorage.currentDocumentID;
        }
        /* Initial values: */
        $scope.title = $localStorage.title
        $scope.text = $localStorage.text
        $scope.editText = $localStorage.text
        $scope.docArray = $localStorage.documents

        /* Get most recent version from server */
        $http.get('http://localhost:2300/v1/documents/' + id  )
            .then(function(response){
                $scope.title = response.data['document']['title']
                $scope.text = response.data['document']['text']
                console.log('TEXT: ' + $scope.text)
            })

        /* updateDocument */
        $scope.updateDocument = function() {
            console.log('Update document ' + id + ', text = ' + $scope.editText)

            var parameter = JSON.stringify({id:id, text:$scope.editText, token: $localStorage.access_token });

            console.log('parameter:' + parameter);

            $http.post('http://localhost:2300/v1/documents/' + id, parameter)
                .then(function(response){
                    if (response.data['status'] == 200) {
                        $scope.message = 'Success!'
                    } else {
                        $scope.message = response.data['error']
                    }
                    console.log('status = ' + String(response.data['status']))

                })
        }

}]);

/**
    noteshareApp.controller('documentController', function($scope, $http) {
      $http.get('http://localhost:2300/documents/12')
      .then(function(response){
        $scope.text = response.data
      });
    });
*/
