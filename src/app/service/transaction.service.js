(function () {
  'use strict';

  angular
    .module('iPromise')
    .service('TransactionService', TransactionService);

  /** @ngInject */
  function TransactionService(UrlService, TokenService, GatewayService, $q, $log) {
    var that = this;

    that.postTransaction = postTransaction;
    that.gatewayUrl = '';
    that.token = '';
    that.response = '';

    function postTransaction(transaction) {
      $log.debug("TransactionService.postTransaction() called with card: " + transaction.card);
        var independentPromises = [UrlService.getUrl(), TokenService.getToken()];
        return $q.all(independentPromises)
          .then(function(results){
            $log.debug('Prerequisite requests success: ' + JSON.stringify(results));
            that.gatewayUrl = results[0];
            that.token = results[1];
            return GatewayService.postRequest(that.gatewayUrl, that.token, transaction);
          });
    }
  }
})();
