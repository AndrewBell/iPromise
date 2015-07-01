(function () {
  'use strict';

  angular
    .module('iPromise')
    .service('GatewayService', GatewayService);

  /** @ngInject */
  function GatewayService($http, $q, $log) {
    var vm = this;
    vm.postRequest = postRequest;

    function postRequest(url, token) {
      $log.debug("GatewayService.postRequest called with " + token + " to url " + url);

      return $q(function (resolve, reject) {
        $log.debug('GatewayService is making http request...');
        setTimeout(function () { // Artificial delay
          $http.get('app/resource/transaction.json')
            .then(function (transactionResponse) {
              if (isValidResponse(transactionResponse)) {
                $log.debug("transaction received valid response: " + JSON.stringify(transactionResponse));
                vm.response = parseResponse(transactionResponse);
                resolve(vm.response);
              } else {
                $log.debug("Invalid Gateway Response - Rejecting");
                reject('Invalid Gateway Response.');
              }
            }, function (result) {
              $log.debug('Result:' + JSON.stringify(result));
              reject('Gateway Request Failed.');
            });
        }, 1000);
      });

      function isValidResponse(result) {
        $log.debug('Checking valid response: ' + JSON.stringify(result));
        return true;
      }

      function parseResponse(response) {
        return response.data.txresult;
      }

    }
  }

})();
