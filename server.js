require('dotenv').config();
var express = require('express');
var multer = require('multer');
var request = require('request');
var fs = require('fs')
var tmp = require('tmp');
var tmpdir = tmp.dirSync();


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
app.listen(port, () => console.log(`working on ${port}`));

app.post(
    '/image-upload',
    upload.single('image'),
    (req, res) => {

        const formData = {
            image: fs.createReadStream(req.file.path)
        };
        const apiKey = process.env.API_KEY;
        const apiKeyName = process.env.API_KEY_NAME;

        console.log('making request');

        request({
            method: 'POST',
            url: process.env.API_URL,
            formData: formData,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'access_token': '123abc'
            },
        },
        function (err, response, body) {
            console.log(`${body}`)
            res.json(JSON.parse(body));
        })
});