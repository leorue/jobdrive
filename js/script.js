      var CLIENT_ID = '131442513880-eqarre8f58ubhsb4hhpc0kdc6p24e6sd.apps.googleusercontent.com';
      var SCOPES = 'https://www.googleapis.com/auth/drive';

      /**
       * Called when the client library is loaded to start the auth flow.
       */
      function handleClientLoad() {
        window.setTimeout(checkAuth, 1);
      }

      /**
       * Check if the current user has authorized the application.
       */
      function checkAuth() {
        gapi.auth.authorize(
            {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
            handleAuthResult);
      }

      /**
       * Called when authorization server replies.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authButton = document.getElementById('authorizeButton');
        var filePicker = document.getElementById('filePicker');
        authButton.style.display = 'none';
        filePicker.style.display = 'none';
        if (authResult && !authResult.error) {
          // Access token has been successfully retrieved, requests can be sent to the API.
          filePicker.style.display = 'block';
          filePicker.onchange = uploadFile;
        } else {
          // No access token could be retrieved, show the button to start the authorization flow.
          authButton.style.display = 'block';
          authButton.onclick = function() {
              gapi.auth.authorize(
                  {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
                  handleAuthResult);
          };
        }
      }

      /**
       * Start the file upload.
       *
       * @param {Object} evt Arguments from the file selector.
       */
      function uploadFile(evt) {
        gapi.client.load('drive', 'v2', function() {
          var file = evt.target.files[0];
          insertFile(file);
        });
      }

      /**
       * Insert new file.
       *
       * @param {File} fileData File object to read data from.
       * @param {Function} callback Function to call when the request is complete.
       */
      function insertFile(fileData, callback) {
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var reader = new FileReader();
        reader.readAsBinaryString(fileData);
        reader.onload = function(e) {
          var contentType = fileData.type || 'application/octet-stream';
          var metadata = {
            'title': fileData.name,
            'mimeType': contentType
          };

          var base64Data = btoa(reader.result);
          var multipartRequestBody =
              delimiter +
              'Content-Type: application/json\r\n\r\n' +
              JSON.stringify(metadata) +
              delimiter +
              'Content-Type: ' + contentType + '\r\n' +
              'Content-Transfer-Encoding: base64\r\n' +
              '\r\n' +
              base64Data +
              close_delim;

          var request = gapi.client.request({
              'path': '/upload/drive/v2/files',
              'method': 'POST',
              'params': {'uploadType': 'multipart'},
              'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
              },
              'body': multipartRequestBody});
          if (!callback) {
            callback = function(file) {
              console.log(file)
            };
          }
          request.execute(callback);
        }
      }

            function postToGoogle() {
                var field1 = $('#name').val();
                var field2 = $("input[type='radio'][name='gender']:checked").val();
                var field3 = $('#phone').val();
                var field4 = $('#email').val();
                var field5 = $('#gpa').val();
                var field6 = $('#major').val();
                var field7 = $('#class').val();
 
                $.ajax({
                    url: "https://docs.google.com/forms/d/1N8m37eeVjPYNH8NjcGgxN9xG-ZHvNCblVX2KrVBlZqQ/formResponse",
                    data: {"entry.1": field1, "entry.2": field2, "entry.3": field3, "entry.4": field4, "entry.5": field5, "entry.6": field6, "entry.7": field7},
                    type: "POST",
                    dataType: "xml",
                    statusCode: {
                        0: function() {
                            //Success message
                            window.location.replace("success.html");
                        },
                        200: function() {
                            //Success Message
                            window.location.replace("success.html");
                        }
                    }
                });
            }
             
            $(document).ready(function(){
                $('#form').submit(function() {
                    postToGoogle();
                    return false;
                });
            });