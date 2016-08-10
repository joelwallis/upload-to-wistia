/* global angular, jQuery */
;(function (ng, $) {
  'use strict'
  angular.module('wistiaUploadApp').controller('MainController', MainController)

  MainController.$inject = ['$window']
  function MainController ($window) {
    console.log('MainController running')

    var vm = this
    vm.apiToken = null

    vm.setupApiToken = () => {
      vm.apiToken = $window.prompt('Please enter your Wistia API token:')
    }
  }
})(angular, jQuery)
