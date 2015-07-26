// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('eventer', ['ionic', 'ngMessages', 'eventer.controllers', 'eventer.config'])

.run(['$rootScope', '$state', '$ionicPlatform', 'configFactory', function($rootScope, $state, $ionicPlatform, clientConfig) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    // Initialize Parse.com
  Parse.initialize(clientConfig.apiKey, clientConfig.clientKey);

  // If not logged in then throw back to login screen

  $rootScope.$on('$stateChangeStart', function(e, to) {
    if (to.noAuthentication || Parse.User.current()) {
      return;
    }

    e.preventDefault();
    $state.go('login', null, {notify: false});
  });

}])
.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider, cc) {

  $stateProvider
  
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl as vm',
    noAuthentication: true
  })
  .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'SignupCtrl as vm',
    noAuthentication: true
  })
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl as vm'
  })
  .state('app.users', {
    url: "/users",
    views: {
      'menuContent': {
        templateUrl: "templates/users.html",
        controller: 'UsersCtrl as vm'
      }
    }
  })
  .state('app.user', {
    url: "/user/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/user.html",
        controller: 'UserCtrl as vm'
      }
    }
  })
  .state('app.events', {
    url: "/events",
    views: {
      'menuContent': {
        templateUrl: "templates/events.html",
        controller: 'EventsCtrl as vm'
      }
    }
  })
  .state('app.event', {
    url: "/event/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/event.html",
        controller: 'EventCtrl as vm'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}])
.run(['$rootScope', '$state', 'configFactory', function($rootScope, $state, clientConfig){
  // Initialize Parse.com
  Parse.initialize(clientConfig.apiKey, clientConfig.clientKey);

  // If not logged in then throw back to login screen
  $rootScope.$on('$stateChangeStart', function(e, to) {
    if (to.noAuthentication || Parse.User.current()) {
      return;
    }

    e.preventDefault();
    $state.go('login', null, {notify: false});
  });

  // Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362
  // Paste this in browser's console
  //var $rootScope = angular.element(document.querySelectorAll("[ion-nav-view]")[0]).injector().get('$rootScope');

  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
  });

  $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeError - fired when an error occurs during transition.');
    console.log(arguments);
  });

  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
  });

  $rootScope.$on('$viewContentLoaded',function(event){
    console.log('$viewContentLoaded - fired after dom rendered',event);
  });

  $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
    console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
    console.log(unfoundState, fromState, fromParams);
  });
}]);
