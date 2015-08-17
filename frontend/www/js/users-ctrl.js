angular.module('eventer.controllers')
.controller('UsersCtrl',['$stateParams', UsersCtrl]);

function UsersCtrl($stateParams) {
  var vm = this;

  vm.users = [];

  var query = new Parse.Query(Parse.User);
  query.find({
    success: function(users) {
      users.forEach(function(user){
        console.log(user);
        var newUser = {
          _parseObj: user
        }
        fromParseToPOJO(newUser);
        // Add default picture is they don't have one
        if(!newUser.image){
          newUser.image = 'img/placeholder-md.png';
        }
        vm.users.push(newUser);
      });
    }
  });

  var attributesToCopy = [
    'id', 'firstName', 'lastName', 'address', 'phone', 'email'
  ];

  function fromParseToPOJO(obj){
    attributesToCopy.forEach(function(attr){
      obj[attr] = obj._parseObj.get(attr);
      // Try to get from top level
      if(!obj[attr]){
        obj[attr] = obj._parseObj[attr];
      }
    });
  }

}