angular.module('Main', [])
  .component('main', {
  templateUrl: 'main/main.html',
  controller: [
    '$scope', 'authUtils',
    function MainController($scope, authUtils) {

     $scope.onLogOut = () => authUtils.logOut();
      
    this.$onInit = function() {
      authUtils.authCheck();
    }
  }]
});