angular.module('eventer.controllers')

.controller('LoginCtrl', ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {

  var vm = this;

  // Form data for the login modal
  vm.loginData = {};
  vm.loginError = '';
  vm.passwordResetError  = '';
  vm.passwordResetSuccess = false;

  // Perform the login action when the user submits the login form
  vm.doLogin = function() {
    vm.loginError = '';
    vm.passwordResetError = '';
    vm.passwordResetSuccess = false;

    if(!vm.loginForm.$valid) return;

    Parse.User.logIn(vm.loginData.username, vm.loginData.password, {
      success: function(user) {
        $state.go('app.events');
      },
      error: function(user, error) {
        vm.loginError = error.message;
        $scope.$apply();
      }
    });

  };

  vm.resetPassword = function(){
    vm.passwordResetError = '';
    vm.passwordResetSuccess = false;

    var EMAIL_REGX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!EMAIL_REGX.test(vm.loginData.username)) {
      vm.passwordResetError = 'Enter your email above first';
      return;
    }

    Parse.User.requestPasswordReset(vm.loginData.username, {
      success: function() {
        vm.passwordResetSuccess = true;
        $scope.$apply();
      },
      error: function(error) {
        vm.passwordResetError = error.message;
        $scope.$apply();
      }
    });
  }

}]);