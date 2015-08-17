
angular.module('eventer.controllers')
.controller('EventsCtrl',[EventsCtrl])

function EventsCtrl() {
  var vm = this;

  // Two list, could have used and custom filter
  vm.upcomingEvents = [];
  vm.pastEvents = [];

  var Event = Parse.Object.extend("Event");
  var query = new Parse.Query(Event);
  query.include('host');
  query.ascending('date');

  query.find({
    success: function(results) {
      var now = new Date();
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var event = {
          '_parseObj': results[i]
        }
        fromParseToPojo(event);
        if(now>event.date){
          vm.pastEvents.push(event);  
        } else {
          vm.upcomingEvents.push(event);
        }
        
      }
      console.log(vm.events);
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

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

}

