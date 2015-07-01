(function () {
  'use strict';

  angular
    .module('iPromise')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(TransactionService) {
    var vm = this;

    vm.runTransaction = runTransaction;
    vm.resetStatus = resetStatus;
    vm.status = '';
    vm.response = '';

    function runTransaction() {
      console.log("main.runTransaction started...");
      vm.response='YOU MUST GATHER YOUR PARTY BEFORE VENTURING FORTH...';
      var transaction = {
        'card':'4111111111111111'
      };

      TransactionService.postTransaction(transaction)
        .then(function(response){
          console.log("The call to TransactionService.postTransaction returned: " + response);
          vm.response = response;
        });


      vm.status = 'success';
    }

    function resetStatus() {
      vm.status = '';
      vm.response = '';
    }

  }


})();
