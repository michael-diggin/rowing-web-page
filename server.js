require('dotenv').config();
var express = require('express');
var multer = require('multer');
var request = require('request');
var fs = require('fs')
var tmp = require('tmp');
var tmpdir = tmp.dirSync();
var parser = require('./parser.js')


const app = express();
app.use(express.static(__dirname + '/web/'));


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


const port = process.env.PORT || 8000;
const host = '0.0.0.0'
const api_url = process.env.API_URL || 'http://localhost/api/v1/predict';
const apiKey = process.env.API_KEY;

app.listen(port, host, () => console.log(`working on ${host}:${port}`));


app.get('/github-image', (req, res) => {
    res.sendFile('./GitHub-Mark-120px-plus.png', { root: __dirname });
});

app.post(
    '/image-upload',
    upload.single('image'),
    (req, res) => {

        const formData = {
            image: fs.createReadStream(req.file.path)
        };       

        console.log('making request');

        request({
            method: 'POST',
            url: api_url,
            formData: formData,
            headers: {
                'accept': 'application/json',
                'X-API-KEY': apiKey,
                'Content-Type': 'multipart/form-data',
            },
        },
        function (err, response, body) {
            if (err) {
                return res.send(`Error: ${err}, ${body}`);
            }
            else {
                var htmlResp = parser.parseFunction(response, body);
                res.json(htmlResp);
            }
        })
});
