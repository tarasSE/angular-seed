angular.module("myApp").controller("TestCtrl",['$scope', function($scope){
    $scope.text = "I'm working!";
    alert($scope.text);
}]);