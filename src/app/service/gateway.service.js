(function () {
  'use strict';

  angular
    .module('iPromise')
    .service('GatewayService', GatewayService);

  /** @ngInject */
  function GatewayService($http, $q, $log) {
    var that = this;
    that.postRequest = postRequest;

    function postRequest(url, token, transaction) {
      $log.debug("GatewayService.postRequest " + transaction + "called with " + token + " to url " + url);

      return $q(function (resolve, reject) {
        $log.debug('GatewayService is making http request...');
        setTimeout(function () { // Artificial delay
          $http.get('app/resource/transaction.json')// your url, header(token), and body(transaction) would be specified here.
            .then(function (transactionResponse) {
              if (isValidResponse(transactionResponse)) {
                $log.debug("transaction received valid response: " + JSON.stringify(transactionResponse));
                that.response = parseResponse(transactionResponse);
                resolve(that.response);
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
