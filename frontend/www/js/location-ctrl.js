angular.module('eventer.controllers')
.controller('LocationCtrl',[LocationCtrl])

function LocationCtrl() {
  var vm = this;


  vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

}