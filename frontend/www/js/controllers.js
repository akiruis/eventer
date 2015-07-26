angular.module('eventer.controllers', [])

.controller('AppCtrl', ['$scope', '$state', function($scope, $state) {
  var vm = this;
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  vm.logout = function(){
    if(Parse.User.current()){
      Parse.User.logOut();
    }
    $state.go('login');
  };
  
}])

.controller('EventsCtrl',[EventsCtrl])
.controller('EventCtrl',['$stateParams', EventCtrl])
.controller('UsersCtrl',[UsersCtrl])
.controller('UserCtrl',['$stateParams', UserCtrl]);

function EventsCtrl() {
  var vm = this;

  vm.events = [];
}

function EventCtrl($stateParams) {
  var vm = this;

  vm.event = {};
}

function UsersCtrl() {
  var vm = this;

  vm.users = [];
}

function UserCtrl($stateParams) {
  var vm = this;

  vm.user = {};
}