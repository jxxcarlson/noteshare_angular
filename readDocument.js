function readDocument($scope, $http) {
$http.get('http://localhost:2300/documents/12').
    success(function(data) {
        $scope.text = data['text'];
    });
}
