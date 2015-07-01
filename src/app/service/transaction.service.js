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
        var independentPromises = [UrlService.getUrl(), TokenService.getToken()];
        return $q.all(independentPromises)
          .then(function(results){
            $log.debug('Prerequisite requests success: ' + JSON.stringify(results));
            vm.gatewayUrl = results[0];
            vm.token = results[1];
            return GatewayService.postRequest(vm.gatewayUrl, vm.token, transaction);
          });
    }
  }
})();
