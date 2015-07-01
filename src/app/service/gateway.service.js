(function() {
  'use strict';

  angular
    .module('iPromise')
    .service('GatewayService', GatewayService);

  /** @ngInject */
  function GatewayService($http) {
    var vm = this;

    vm.postRequest = postRequest;

    function postRequest(url,token) {
      console.log("GatewayService.postRequest called with " + token + " to url " + url);
      return $http.get('app/resource/response.json');
    }
  }

})();
