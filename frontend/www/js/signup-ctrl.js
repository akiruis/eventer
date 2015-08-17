angular.module('eventer.controllers')
.controller('SignupCtrl', ['$state', '$timeout', SignupCtrl]);

function SignupCtrl($state, $timeout) {

  var vm = this;

  // Form data for the signup modal
  vm.signupData = {};
  vm.signupError = '';

  // Perform the signup action when the user submits the signup form
  vm.doSignup = function() {
    vm.signupError = '';

    if(!vm.signupForm.$valid) return;
    if(vm.signupData.password != vm.signupData.password2){
      vm.signupError = "Passwords do not match";
      return;
    }

    var user = new Parse.User();
    user.set('firstName', vm.signupData.firstName);
    user.set('lastName', vm.signupData.lastName); 
    user.set('username', vm.signupData.username);
    user.set('password', vm.signupData.password);
    user.set('email', vm.signupData.username);

    user.signUp(null, {
      success: function(user) {
        $state.go('app.user', {'id': user.id});
      },
      error: function(user, error) {
        vm.signupError = error.message;
      }
    });
  };

}