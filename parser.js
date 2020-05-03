var parseResponse = function(response, body) {
    var json = JSON.parse(body);
    console.log(response.statusCode);
    if (response.statusCode == 200) {
        console.log(`${body}`);
        var resp = {
            statusCode: 200,
            html: `Type: ${json.PredictedClass} (${Math.round(json.PredictedProb*100)/100}%)`,        
        };
        return resp;
    }
    else {
        var resp = {
            statusCode: response.statusCode,
            html: `Error (${response.statusCode}): ${json.detail}`,        
        };
        return resp;
    }
};

module.exports.parseFunction = parseResponse;