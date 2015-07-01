(function() {
  'use strict';

  angular
    .module('iPromise')
    .service('UrlService', UrlService);

  /** @ngInject */
  function UrlService($http) {
    var vm = this;

    vm.getUrl = getUrl;

    function getUrl(){
      console.log("UrlService.getUrl called");
      return $http.get('app/resource/url.json');
    }

  }

})();
