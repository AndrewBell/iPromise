(function () {
  'use strict';

  angular
    .module('iPromise')
    .service('TokenService', TokenService);

  /** @ngInject */
  function TokenService($http, $q, $log) {
    var vm = this;
    vm.token = '';
    vm.getToken = getToken;

    function getToken() {
      $log.debug("TokenService.getToken called");
      return $q(function (resolve, reject) {
        //$log.debug("Current TokenService scope: " + JSON.stringify(this));
        if (vm.token !== '') {
          $log.debug('Returning cached token: ' + vm.token);
          resolve(vm.token);
        } else {
          $log.debug('No cached token, making http request...');
          setTimeout(function () { // Artificial delay
            $http.get('app/resource/token.json')
              .then(function (result) {
                if (isValidResponse(result)) {
                  $log.debug("token get received valid response: " + JSON.stringify(result));
                  vm.token = parseResponse(result);
                  resolve(vm.token);
                } else {
                  reject('Invalid Token Response.');
                }
              }, function (result) {
                $log.debug('Result:' + JSON.stringify(result));
                reject('Token Request Failed.');
              });
          }, 1000);
        }
      });

      function isValidResponse(result) {
        $log.debug('Checking valid response: ' + JSON.stringify(result));
        return true;
      }

      function parseResponse(result) {
        return result.data.token;
      }

    }
  }

})();
