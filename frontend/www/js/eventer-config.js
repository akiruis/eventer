
angular.module('eventer.config', [])
.factory('configFactory', [ configFactory ]);

function configFactory() {
   var config = {};

   config.apiKey = 'Ine';
   config.clientKey = 'Insert your Parse.com Client key here';

   return config;
}