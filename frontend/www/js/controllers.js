angular.module('eventer.controllers', [])

.controller('AppCtrl', ['$state', function($state) {
  var vm = this;
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  vm.userId = Parse.User.current().id;

  vm.logout = function(){
    if(Parse.User.current()){
      Parse.User.logOut();
    }
    $state.go('login');
  };
  
}])


.controller('UsersCtrl',[UsersCtrl])

function UsersCtrl() {
  var vm = this;

  vm.users = [];
}