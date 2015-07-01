(function() {
  'use strict';

  angular
    .module('iPromise')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
