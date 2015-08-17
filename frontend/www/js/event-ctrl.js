angular.module('eventer.controllers')
.controller('EventCtrl',['$stateParams','$state', EventCtrl]);

function EventCtrl($stateParams, $state) {
  var vm = this;

  vm.event = {};
  vm.eventEdit = {};
  vm.updateButtonText = 'Create';

  vm.enableEdit = function(){
    vm.eventEdit = angular.extend({}, vm.event);
    vm.eventEdit.time = new Date(vm.eventEdit.date);
    vm.eventEdit.time.setSeconds(0);
    vm.eventEdit.time.setMilliseconds(0);
    vm.updateButtonText = ($stateParams.id)?'Update':'Create';
    vm.editMode = true;
    console.log(vm.event._parseObj == vm.eventEdit._parseObj);
    console.log(vm.event._parseObj);
    console.log(vm.eventEdit._parseObj);
  }

  var Event = Parse.Object.extend("Event");

  if($stateParams.id){
    var query = new Parse.Query(Event);
    query.include('host');
    query.get($stateParams.id, {
      success: function(event) {
        // The object was retrieved successfully.
        vm.event._parseObj = event;
        fromParseToPojo(vm.event);
        vm.updateButtonText = 'Update';
        vm.editMode = false;
      },
      error: function(object, error) {
        console.log(error);
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      }
    });
  } else {
    vm.event._parseObj = new Event();
    vm.event._parseObj.set('notes', null);
    var eventDate = new Date();
    eventDate.setDate(eventDate.getDate()+7);
    eventDate.setHours(18);
    eventDate.setMinutes(0);
    eventDate.setSeconds(0);
    eventDate.setMilliseconds(0);
    vm.event._parseObj.set('date', eventDate);
    vm.event._parseObj.set('host', Parse.User.current());
    fromParseToPojo(vm.event);

    vm.enableEdit();
  }


  vm.mergeTimeAndDate = function(){
    vm.eventEdit.date.setHours(vm.eventEdit.time.getHours());
    vm.eventEdit.date.setMinutes(vm.eventEdit.time.getMinutes());
    vm.eventEdit.date.setSeconds(0);
    vm.eventEdit.date.setMilliseconds(0);
  };

  function fromParseToPojo(obj){
    Object.keys(obj._parseObj.attributes).forEach(function(attr){
      var value = obj._parseObj.get(attr);
      if(value instanceof Parse.Object){
        obj[attr] = {
          _parseObj: value
        };
        fromParseToPojo(obj[attr]);        
      }
      else{
        obj[attr] = value;
      }
    });
  }

  function fromPojoToParse(obj){
    Object.keys(obj).forEach(function(attr){     
      var value = obj[attr];
      if((value instanceof Parse.Object) || (value._parseObj instanceof Parse.User) ){
        return;
      }
      if((value instanceof Object) && !(value instanceof Date)){
        fromPojoToParse(value);        
      }
      else{
        obj._parseObj.set(attr, value);
      }
    });
  }

  vm.editUpdate = function(){
    fromPojoToParse(vm.eventEdit);
    vm.eventEdit._parseObj.save().then(
      function(eventObj){
        vm.event = vm.eventEdit;
        vm.editMode = false;
      },
      function(err){
        console.log(err);
        vm.editMode = false;
      }
    );

  }

  vm.editCancel = function(){
    if($stateParams.id){
      vm.editMode = false;
    }
    else {
      $state.go('app.events');
    }
  };

}
