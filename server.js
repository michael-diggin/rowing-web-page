require('dotenv').config();
var express = require('express');
var multer = require('multer');
var request = require('request');
var fs = require('fs')
var tmp = require('tmp');
var tmpdir = tmp.dirSync();
var parser = require('./parser.js')


const app = express();
app.use(express.static(__dirname + '/web'));


const localStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, tmpdir.name);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: localStorage
});


const port = process.env.PORT;
const host = '0.0.0.0'
app.listen(port, host, () => console.log(`working on ${host}:${port}`));


app.post(
    '/image-upload',
    upload.single('image'),
    (req, res) => {

        const formData = {
            image: fs.createReadStream(req.file.path)
        };
        const apiKey = process.env.API_KEY;

        console.log('making request');

        request({
            method: 'POST',
            url: process.env.API_URL,
            formData: formData,
            headers: {
                'accept': 'application/json',
                'X-API-KEY': apiKey,
                'Content-Type': 'multipart/form-data',
            },
        },
        function (err, response, body) {
            if (err) {
                return res.send(`Error: ${err}`);
            }
            else {
                var htmlResp = parser.parseFunction(response, body);
                res.json(htmlResp);
            }
        })
});

var parseResponse = function(response, body) {
    var json = JSON.parse(body);
    if (response.statusCode == 200) {
        var resp = {
            statusCode: 200,
            html: `Type: ${json.PredictedClass} (${Math.round(json.PredictedProb*100)/100}%)`,        
        };
        return resp;
    }
    else {
        var resp = {
            statusCode: response.statusCode,
            html: `Error: ${json.detail}`,        
        };
        return resp;
    }
};