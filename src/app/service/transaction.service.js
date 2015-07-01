(function () {
  'use strict';

  angular
    .module('iPromise')
    .service('TransactionService', TransactionService);

  /** @ngInject */
  function TransactionService(UrlService, TokenService, GatewayService, $q, $log) {
    var vm = this;

    vm.postTransaction = postTransaction;
    vm.gatewayUrl = '';
    vm.token = '';
    vm.response = '';

    function postTransaction(transaction) {
      $log.debug("TransactionService.postTransaction() called with card: " + transaction.card);
      return $q(function (resolve, reject) {
        UrlService.getUrl()
          .then(function (url) {
            vm.gatewayUrl = url;
            $log.debug("Gateway URL has been set to: " + vm.gatewayUrl);
            return TokenService.getToken();
          })
          .then(function (token) {
            vm.token = token;
            $log.debug("Token has been set to: " + vm.token);
            return GatewayService.postRequest(vm.gatewayUrl, vm.token, transaction);
          })
          .then(function (response) {
            $log.debug("Returned response:" + JSON.stringify(response));
            var result = response;
            if (result === "Transaction success!") {
              $log.debug("Transaction has a success body!");
              resolve(result);
            } else {
              $log.debug("Transaction has a failure body!");
              reject(response.data.response);
            }
          });

      });

    }
  }
})();
