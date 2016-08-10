/* global angular, jQuery */
;(function (ng, $) {
  'use strict'
  ng.module('wistiaUploadApp').directive('wistiaUpload', wistiaUpload)

  wistiaUpload.$inject = []
  function wistiaUpload () {
    return {
      restrict: 'A'
    }
  }
})(angular, jQuery)
