const IP = '127.0.0.1'
const api_url = 'http://'+IP+'/api/v1/predict'

$(function() {
  $('#upload-image-btn').click(function() {
      
      var form_data = new FormData($('#upload-image')[0]);
      $.ajax({
          type: 'POST',
          url: api_url,
          dataType: 'json',
          data: form_data,
          contentType: false,
          cache: false,
          processData: false,
          success: function(response) {
              $('#msg').html('');
              $('#msg').append(`Type : ${response.PredictedClass}<br/>`);
              $('#msg').append(`Prob : ${Math.round(response.PredictedProb*100)/100}%<br/>`);             
          },
          error: function(response) {
              $('#msg').html(response.message);
          }
      });
  });
});
