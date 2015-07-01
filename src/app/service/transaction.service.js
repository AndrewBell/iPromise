(function () {
  'use strict';

  angular
    .module('iPromise')
    .service('TransactionService', TransactionService);

  /** @ngInject */
  function TransactionService(UrlService, TokenService, GatewayService,$q) {
    var vm = this;

    vm.postTransaction = postTransaction;
    vm.gatewayUrl = '';
    vm.token = '';
    vm.response = '';

    function postTransaction(transaction) {
      console.log("TransactionService.postTransaction() called on " + transaction.card);
      return $q(function (resolve, reject) {
        setTimeout(function () {

          UrlService.getUrl()
            .then(function (url) {
              console.log("Returned url: " + JSON.stringify(url));
              vm.gatewayUrl = url.data.gateway;
              console.log("Gateway URL has been set to: " + vm.gatewayUrl);
              return TokenService.getToken();
            })
            .then(function (token) {
              console.log("Returned token: " + JSON.stringify(token));
              vm.token = token.data.token;
              console.log("My token has been set to: " + vm.token);
              return GatewayService.postRequest(vm.gatewayUrl, vm.token);
            })
            .then(function (response) {
              console.log("Returned response:" + JSON.stringify(response));
              var result = response.data.result;
              if (result === "Transaction success!") {
                console.log("Transaction has a success body!");
                resolve(result);
              } else {
                console.log("Transaction has a failure body!");
                reject(response.data.response);
              }
            });

        }, 1000);
      });

    }
  }
})();
