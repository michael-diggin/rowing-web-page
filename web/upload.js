const node_url = '/image-upload'

$(function() {
  $('#upload-image-btn').click(function() {
      
      var form_data = new FormData($('#upload-image')[0]);
      console.log('making request')
      $.ajax({
          type: 'POST',
          url: node_url,
          dataType: 'json',
          data: form_data,
          contentType: false,
          cache: false,
          processData: false,
          success: function(response) {
              $('#msg').html('');
              $('#msg').append(`Type : ${response.PredictedClass}`);
              $('#msg').append(` (${Math.round(response.PredictedProb*100)/100}%)<br/>`);             
          },
          error: function(response) {
              console.log('error')
              $('#msg').html(response.message);
          }
      });
  });
});
