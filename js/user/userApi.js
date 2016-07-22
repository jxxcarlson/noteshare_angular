
<!-- http://stackoverflow.com/questions/34090517/angularjs-service-not-working -->

angular.module('userApi', []).service('userService', function($http) {

    this.login = function (username, password) {
      $http.get('http://localhost:2300/v1/users/' + username + '?' + password)
      .then(function(response){
        return response.data
      })
    }


  });
