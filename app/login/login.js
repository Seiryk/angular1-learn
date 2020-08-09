angular.module('Login', [])
  .component('login', {
    templateUrl: 'login/login.html',
    controller: ['authUtils', '$scope',
    function LoginController(authUtils, $scope) {

      $scope.logType = 'LOGIN'
      $scope.isError = false


      $scope.onSubmit = () => {
        const userObj = $scope.logForm.$$controls.reduce((acc, el) => {
          acc[el.$name] = el.$viewValue;
          return acc
        }, {});

        if ($scope.logType === 'LOGIN') {
          $scope.isError  = !authUtils.logIn(userObj);
        } else {
          $scope.isError = !authUtils.SignUp(userObj);
        }

      }
      $scope.onChangeLogType = () => {
        $scope.logType = $scope.logType === 'LOGIN' ? 'SUGNUP' : 'LOGIN';
      }
      $scope.appliedClass = function () {
        return 'form-control' + ( $scope.isError ? ' is-invalid' : '')
      }

      this.$onInit = function() {
        authUtils.authCheck();
      }
    }]
  });