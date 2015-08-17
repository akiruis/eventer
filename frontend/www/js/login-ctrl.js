angular.module('eventer.controllers')

.controller('LoginCtrl', ['$state', '$timeout', 
  function($state, $timeout) {

  var vm = this;

  // Form data for the login modal
  vm.loginData = {};
  vm.loginError = '';
  vm.passwordResetError  = '';
  vm.passwordResetSuccess = false;

  // Perform the login action when the user submits the login form
  vm.doLogin = function() {
    vm.loginData.inProgress = true;
    $timeout(function(){
    vm.loginData.inProgress = false;

    vm.loginError = '';
    vm.passwordResetError = '';
    vm.passwordResetSuccess = false;

    if(vm.loginForm.$error.required){
      vm.loginError = "Missing inputs"
      return;
    }

    Parse.User.logIn(vm.loginData.username, vm.loginData.password, {
      success: function(user) {
        $state.go('app.events');
      },
      error: function(user, error) {
        if(Parse.Error.INVALID_SESSION_TOKEN == error.code){
          Parse.User.logOut();
          vm.doLogin();
          return;
        }
        console.log(error.message);
        vm.loginError = 'Login failed';
      }
    });
}, 1000);
  };

  vm.submit = function(event){
//    vm.loginForm.submit();
    event.preventDefault();
    document.getElementById('vmloginForm').submit();
  }

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
      },
      error: function(error) {
        vm.passwordResetError = error.message;
      }
    });
  }

}]);