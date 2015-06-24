angular.module('eventer.database_test', [])
.factory('dbApi', [ '$q', dbApi  ]);

function dbApi(){

  var database = {
    'users': {
      '1': {
        'firstName': 'Joe',
        'lastName': 'Michaels',
        'address': '123 Home Alley, City, CA 92025',
        'phone': '+1 555 123 4567',
        'email': 'joem@a.com'
      },
      '2': {
        'firstName': 'Bill',
        'lastName': 'Poppins',
        'address': '554 Flow Street, Town, CA 92025',
        'phone': '+1 555 333 4455',
        'email': 'poppins@a.com'
      }
    },
    'events': {
      '1' : {
        'date': new Date('2015-07-30:19:00'),
        'hostId': 1,
        'notes': 'Welcome! BYOB!'
      },
      '2' : {
        'date': new Date('2015-08-25:20:00'),
        'hostId': 2,
        'notes': 'Welcome! BYOB!'
      }
    },
    'eventParticipants' : [
      {'eventId:'1, 'userId': 1, 'isComing': true, 'notes': 'I\'m the host, duh!'},
      {'eventId:'1, 'userId': 2, 'isComing': true, 'notes': 'I\'m in'},
      {'eventId:'2, 'userId': 2, 'isComing': true, 'notes': ''},
      {'eventId:'2, 'userId': 1, 'isComing': true, 'notes': 'Sorry have to be some where else'},
    ]
  }

  var api = {
    'events': function () {
      var resp = [];
      Object.keys(database.events).forEach(function(eventId){
        var event = angular.copy(database.events[eventId]);
        event.id = eventId;
        event.participants = _.filter(database.eventParticipants, {'eventId': eventId});
        resp.push(event);
      });
      return resp;
    },
    'eventById': function (id) {
      if(!id || !database.events[id]){
        return;
      }
      var resp = angular.copy(database.events[eventId]);
      resp.participants = _.filter(database.eventParticipants, {'eventId': id});
    },
    'users': function () {

    },
    'userById': function (id) {

    }

  };

  return api;

}
