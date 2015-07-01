(function() {
  'use strict';

  angular
    .module('iPromise')
    .service('TokenService', TokenService);

  /** @ngInject */
  function TokenService($http) {
    var vm = this;

    vm.getToken = getToken;

    function getToken() {
      console.log("TokenService.getToken called");
      return $http.get('app/resource/token.json');
    }
  }

})();
