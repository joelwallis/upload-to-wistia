/* global angular, jQuery */
;(function (ng, $) {
  'use strict'
  ng.module('wistiaUploadApp').directive('wistiaUploader', wistiaUploader)

  wistiaUploader.$inject = ['$window']
  function wistiaUploader ($window) {
    // Flag: is jQuery File Upload already initialized?
    var isFileuploadInitialized
    return {
      restrict: 'E',
      scope: false,
      templateUrl: 'wistia-uploader.html',
      link: function (scope, el, attrs) {
        var button = $('button', el)
        var fileInput = $('input[type=file]', el)
        var progress = $('.progress', el)
        var progressBar = $('.progress-bar', progress)
        var progressBarSpan = $('span', progressBar)
        var playerContainer = $('.player-container', el)

        button.click(() => fileInput.click())

        // Initialize the jQuery File Upload after getting a API token
        scope.$watch('apiToken', (apiToken) => {
          if (isFileuploadInitialized) {
            fileInput.fileupload('destroy')
          }
          apiToken = $window.encodeURIComponent(apiToken)
          fileInput
            .fileupload({
              url: `https://upload.wistia.com/?api_password=${apiToken}`
            })
            .bind('fileuploadstart', onUploadStart)
            .bind('fileuploadprogress', onUploadProgress)
            .bind('fileuploadalways', onUploadFinish)
          isFileuploadInitialized = true
        })

        function onUploadStart () {
          progress
            .attr({
              'aria-valuenow': '0',
              'aria-valuemin': '0',
              'aria-valuemax': '100'
            })
            .css({display: 'block'})

          progressBar
            .css({width: '0'})
        }
        function onUploadProgress (e, data) {
          let loaded = Math.round(data.loaded / data.total * 100)

          progress
            .attr({
              'aria-valuenow': `${loaded}`,
              'aria-valuemin': '0',
              'aria-valuemax': '100'
            })
            .css({display: 'block'})

          progressBar
            .css({width: `${loaded}%`})

          progressBarSpan.html(`${loaded}% completed`)
        }
        function onUploadFinish (e, data) {
          progress.css({display: 'none'})

          playerContainer
            .css({display: 'block'})
            .html(`<script src="//fast.wistia.com/embed/medias/${data.result.hashed_id}.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:62.5% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_${data.result.hashed_id} videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>`)
        }
      }
    }
  }
})(angular, jQuery)
