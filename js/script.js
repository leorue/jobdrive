      // var CLIENT_ID = '1072336038401-lcg7rspltn4omhoflff01vj59h5uqaqm.apps.googleusercontent.com';
      // var SCOPES = 'https://www.googleapis.com/auth/drive';

      // /**
      //  * Called when the client library is loaded to start the auth flow.
      //  */
      // function handleClientLoad() {
      //   window.setTimeout(checkAuth, 1);
      // }

      // /**
      //  * Check if the current user has authorized the application.
      //  */
      // function checkAuth() {
      //   gapi.auth.authorize(
      //       {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
      //       handleAuthResult);
      // }

      // /**
      //  * Called when authorization server replies.
      //  *
      //  * @param {Object} authResult Authorization result.
      //  */
      // function handleAuthResult(authResult) {
      //   var authButton = document.getElementById('authorizeButton');
      //   var filePicker = document.getElementById('filePicker');
      //   authButton.style.display = 'none';
      //   filePicker.style.display = 'none';
      //   if (authResult && !authResult.error) {
      //     // Access token has been successfully retrieved, requests can be sent to the API.
      //     filePicker.style.display = 'block';
      //     filePicker.onchange = uploadFile;
      //   } else {
      //     // No access token could be retrieved, show the button to start the authorization flow.
      //     authButton.style.display = 'block';
      //     authButton.onclick = function() {
      //         gapi.auth.authorize(
      //             {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
      //             handleAuthResult);
      //     };
      //   }
      // }

      // /**
      //  * Start the file upload.
      //  *
      //  * @param {Object} evt Arguments from the file selector.
      //  */
      // function uploadFile(evt) {
      //   gapi.client.load('drive', 'v2', function() {
      //     var file = evt.target.files[0];
      //     insertFile(file);
      //   });
      // }

      // /**
      //  * Insert new file.
      //  *
      //  * @param {File} fileData File object to read data from.
      //  * @param {Function} callback Function to call when the request is complete.
      //  */
      // function insertFile(fileData, callback) {
      //   const boundary = '-------314159265358979323846';
      //   const delimiter = "\r\n--" + boundary + "\r\n";
      //   const close_delim = "\r\n--" + boundary + "--";

      //   var reader = new FileReader();
      //   reader.readAsBinaryString(fileData);
      //   reader.onload = function(e) {
      //     var contentType = fileData.type || 'application/octet-stream';
      //     var metadata = {
      //       'title': fileData.name,
      //       'mimeType': contentType
      //     };

      //     var base64Data = btoa(reader.result);
      //     var multipartRequestBody =
      //         delimiter +
      //         'Content-Type: application/json\r\n\r\n' +
      //         JSON.stringify(metadata) +
      //         delimiter +
      //         'Content-Type: ' + contentType + '\r\n' +
      //         'Content-Transfer-Encoding: base64\r\n' +
      //         '\r\n' +
      //         base64Data +
      //         close_delim;

      //     var request = gapi.client.request({
      //         'path': '/upload/drive/v2/files',
      //         'method': 'POST',
      //         'params': {'uploadType': 'multipart'},
      //         'headers': {
      //           'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
      //         },
      //         'body': multipartRequestBody});
      //     if (!callback) {
      //       callback = function(file) {
      //         console.log(file)
      //       };
      //     }
      //     request.execute(callback);
      //   }
      // }

      //       function postToGoogle() {
      //           var field1 = $('#name').val();
      //           var field2 = $("input[type='radio'][name='gender']:checked").val();
      //           var field3 = $('#phone').val();
      //           var field4 = $('#email').val();
      //           var field5 = $('#gpa').val();
      //           var field6 = $('#major').val();
      //           var field7 = $('#class').val();
 
      //           $.ajax({
      //               url: "https://docs.google.com/forms/d/1N8m37eeVjPYNH8NjcGgxN9xG-ZHvNCblVX2KrVBlZqQ/formResponse",
      //               data: {"entry.1": field1, "entry.2": field2, "entry.3": field3, "entry.4": field4, "entry.5": field5, "entry.6": field6, "entry.7": field7},
      //               type: "POST",
      //               dataType: "xml",
      //               statusCode: {
      //                   0: function() {
      //                       //Success message
      //                       window.location.replace("success.html");
      //                   },
      //                   200: function() {
      //                       //Success Message
      //                       window.location.replace("success.html");
      //                   }
      //               }
      //           });
      //       }
             
      //       $(document).ready(function(){
      //           $('#form').submit(function() {
      //               postToGoogle();
      //               return false;
      //           });
      //       });

jQuery(document).ready(function($) {
  "use strict";
$(function() {
     
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
     
    sync1.owlCarousel({
      singleItem : true,
      slideSpeed : 1000,
      navigation: false,
      pagination:false,
      mouseDrag: false,
      touchDrag: false,
      afterAction : syncPosition,
      responsiveRefreshRate : 200,
      transitionStyle : "goDown"
    });
     
    sync2.owlCarousel({
      items : 9,
      itemsDesktop : [1000,5], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0
      itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
      pagination:false,
      
      afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
      }
    });
     
    function syncPosition(el){
      var current = this.currentItem;
      $("#sync2")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
      if($("#sync2").data("owlCarousel") !== undefined){
      center(current)
      }
    }
     
    $("#sync2").on("click", ".owl-item", function(e){
      e.preventDefault();
      var number = $(this).data("owlItem");
      sync1.trigger("owl.goTo",number);
    });
     
    function center(number){
      var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
      var num = number;
      var found = false;
      for(var i in sync2visible){
      if(num === sync2visible[i]){
        var found = true;
      }
      }
       
      if(found===false){
      if(num>sync2visible[sync2visible.length-1]){
      sync2.trigger("owl.goTo", num - sync2visible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        sync2.trigger("owl.goTo", num);
      }
      } else if(num === sync2visible[sync2visible.length-1]){
        sync2.trigger("owl.goTo", sync2visible[1])
      } else if(num === sync2visible[0]){
        sync2.trigger("owl.goTo", num-1)
      }
    }
    });
});