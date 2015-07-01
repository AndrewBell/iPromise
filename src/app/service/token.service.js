(function () {
  'use strict';

  angular
    .module('iPromise')
    .service('TokenService', TokenService);

  /** @ngInject */
  function TokenService($http, $q, $log) {
    var that = this;
    that.token = '';
    that.getToken = getToken;

    function getToken() {
      $log.debug("TokenService.getToken called");
      return $q(function (resolve, reject) {
        //$log.debug("Current TokenService scope: " + JSON.stringify(this));
        if (that.token !== '') {
          $log.debug('Returning cached token: ' + that.token);
          resolve(that.token);
        } else {
          $log.debug('No cached token, making http request...');
          setTimeout(function () { // Artificial delay
            $http.get('app/resource/token.json')
              .then(function (result) {
                if (isValidResponse(result)) {
                  $log.debug("token get received valid response: " + JSON.stringify(result));
                  that.token = parseResponse(result);
                  resolve(that.token);
                } else {
                  $log.debug('Response marked as invalid, rejecting');
                  reject('Invalid Token Response.');
                }
              }).catch(function (result) {
                $log.debug('FAILED Token, Result:' + JSON.stringify(result));
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
