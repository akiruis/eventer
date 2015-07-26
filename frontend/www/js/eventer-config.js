
angular.module('eventer.config', [])
.factory('configFactory', [ configFactory ]);

function configFactory() {
   var config = {};

   config.apiKey = 'Insert your Parse.com API key here';
   config.clientKey = 'Insert your Parse.com Client key here';

   return config;
}