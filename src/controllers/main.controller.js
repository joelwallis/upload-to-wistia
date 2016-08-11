/* global angular, jQuery */
;(function (ng, $) {
  'use strict'
  angular.module('wistiaUploadApp').controller('MainController', MainController)

  MainController.$inject = ['$scope', '$window']
  function MainController ($scope, $window) {
    console.log('MainController running')

    var vm = this
    $scope.apiToken = vm.apiToken = null

    vm.setupApiToken = () => {
      $scope.apiToken = vm.apiToken = $window.prompt('Please enter your Wistia API token:')
    }
  }
})(angular, jQuery)
