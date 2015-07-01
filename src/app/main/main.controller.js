(function () {
  'use strict';

  angular
    .module('iPromise')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(TransactionService, $log) {
    var vm = this;

    vm.runTransaction = runTransaction;
    vm.resetStatus = resetStatus;
    vm.status = '';
    vm.response = '';

    function runTransaction() {
      $log.debug("main.runTransaction started...");
      vm.response = 'YOU MUST GATHER YOUR PARTY BEFORE VENTURING FORTH...';
      var transaction = {
        'card': '4XXXXXXXXXX1111'
      };

      TransactionService.postTransaction(transaction)
        .then(function (response) {
          $log.debug("The call to TransactionService.postTransaction returned: " + response);
          vm.response = response;
          vm.status = 'success';
        }, function (response) {
          $log.debug("Post Transaction request failed: " + response);
          vm.status = 'failure';
          vm.respnose = response;
        });


      vm.status = 'submitted';
    }

    function resetStatus() {
      vm.status = '';
      vm.response = '';
    }

  }


})();
