angular.module('eventer.controllers')
.controller('UserCtrl',['$stateParams', UserCtrl]);

function UserCtrl($stateParams) {
  var vm = this;

  vm.user = {};
  vm.editMode = false;

  var attributesToCopy = [
    'id', 'firstName', 'lastName', 'address', 'phone', 'email'
  ];


  if($stateParams.id){
    var query = new Parse.Query(Parse.User);
    query.get($stateParams.id, {
      success: function(user) {
        vm.user._parseObj = user;
        fromParseToPOJO(vm.user);
        if(Parse.User.current().id == vm.user.id){
          vm.isMe = true;
        }
      },
      error: function(object, error) {
        console.log('no such user');
      }
    });
  } 

  function fromParseToPOJO(obj){
    attributesToCopy.forEach(function(attr){
      obj[attr] = obj._parseObj.get(attr);
      // Try to get from top level
      if(!obj[attr]){
        obj[attr] = obj._parseObj[attr];
      }
    });
  }

  function fromPOJOToParse(obj){
    attributesToCopy.forEach(function(attr){
      obj._parseObj.set(attr, obj[attr]);
    });
  }

  vm.editUpdate = function(){
    vm.errorMessage = '';
    if(!vm.userForm.$valid){
      return;
    }

    Object.keys(vm.userEdit).forEach(function(attr){
      vm.user[attr] = vm.userEdit[attr];
    });
    fromPOJOToParse(vm.user);

    // Save user to Parse.com
    vm.user._parseObj.save({}, {
      success: function(user) {
        vm.user._parseObj = user;
        fromParseToPOJO(vm.user);

        vm.editMode = false;
      },
      error: function(object, error) {
        console.log(error.message);
        vm.errorMessage = 'Failed to save user data';
      }
    });

  }

  vm.editCancel = function(){
    vm.editMode = false;
  }

  vm.editUser = function(){
    vm.userEdit = {
      'firstName': vm.user.firstName,
      'lastName': vm.user.lastName,
      'address': vm.user.address,
      'phone': vm.user.phone
    };
    vm.editMode = true;
  }

}