(function () {
  'use strict';

  angular
    .module('iPromise')
    .service('UrlService', UrlService);

  /** @ngInject */
  function UrlService($http, $q, $log) {
    var that = this;
    that.url = '';
    that.getUrl = getUrl;

    function getUrl() {
      $log.debug("UrlService.getUrl called");
      return $q(function (resolve, reject) {
        if (that.url !== '') {
          $log.debug('Returning cached url: ' + that.url);
          resolve(that.url);
        } else {
          $log.debug('No cached url, making http request...');
          setTimeout(function () { // Artificial delay
            $http.get('app/resource/url.json')
              .then(function (result) {
                if (isValidResponse(result)) {
                  $log.debug("url get received valid response: " + JSON.stringify(result));
                  that.url = parseResponse(result);
                  resolve(that.url);
                } else {
                  $log.debug("Rejecting due to invalid response");
                  reject('Invalid URL Response.');
                }
              })
              .catch(function(result){
                  $log.debug('FAILED Token, result:' + JSON.stringify(result));
                  reject('URL Request Failed.');
              });
          }, 1000);
        }
      });

      function isValidResponse(result) {
        $log.debug('Checking valid response: ' + JSON.stringify(result));
        return true;
      }

      function parseResponse(result) {
        return result.data.gateway;
      }

    }

  }

})();
