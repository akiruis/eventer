angular.module('eventer.database_test', [])
.factory('dbApi', [ '$q', dbApi  ]);

function adApi(){
  var api = {
    'events': function(){

    },
    'eventById': function(id){

    },
    'users': function(){

    },
    'userById': function(id){

    }

    return api;
  };
}
