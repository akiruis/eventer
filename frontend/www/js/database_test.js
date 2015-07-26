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
        'notes': 'Enter through side gate.'
      }
    },
    'eventParticipants' : [
      {'eventId': 1, 'userId': 1, 'isComing': true, 'notes': 'I\'m the host, duh!'},
      {'eventId': 1, 'userId': 2, 'isComing': true, 'notes': 'I\'m in'},
      {'eventId': 2, 'userId': 2, 'isComing': true, 'notes': ''},
      {'eventId': 2, 'userId': 1, 'isComing': false, 'notes': 'Sorry have to be some where else'},
    ]
  };

  var api = {
    'event': {
      'events': function () {
        var resp = [];
        Object.keys(database.events).forEach(function(eventId){
          var event = angular.copy(database.events[eventId]);
          event.id = eventId;
          event.participants = _.filter(database.eventParticipants, {'eventId': parseInt(eventId, 10)});
          event.host = database.users[event.hostId];
          resp.push(event);
        });
        return resp;
      },
      'eventById': function (id) {
        if(!id || !database.events[id]){
          return;
        }
        var event = angular.copy(database.events[id]);
        event.id = id;
        event.participants = _.filter(database.eventParticipants, {'eventId': parseInt(id, 10)});
        event.host = database.users[event.hostId];
        return event;
      },
      'addEvent': function(event){
        if(!event || !event.date || NaN == Date.parse(event.date)){
          return;
        }
        if(!event.userId || !database.users[event.userId]){
          return;
        }
        var nextKey = database.events.Keys().sort(function(a,b){return b-a;})[0]+1;
        database.events[nextKey] = {
          'date': Date.parse(event.date),
          'hostId': event.hostId,
          'notes': event.notes
        }
      }
    },
    'user': {
      'users': function () {

      },
      'userById': function (id) {

      }
    }
  };

  return api;

}
