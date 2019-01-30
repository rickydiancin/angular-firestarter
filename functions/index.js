const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const request = require('request');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest((req, res) => {
    const data = {
        template: { 'shortid': 'Y1MuXuB' },
        data: { fname: 'jayson', lname: 'delos reyes' },
        options: {
            preview: true
        }
    }
    const options = {
        uri: 'https://report-pdf.jsreportonline.net/api/report',
        method: 'POST',
        json: data
    }
    request(options).pipe(res);
});

// app.use(cors());

// app.get('/product/print', function (req, res) {
//     // res.json({ msg: 'This is CORS-enabled for all origins!' });
//     const data = {
//         template: { 'shortid': 'Y1MuXuB' },
//         data: { fname: 'jayson', lname: 'delos reyes' },
//         options: {
//             preview: true
//         }
//     }
//     const options = {
//         uri: 'https://report-pdf.jsreportonline.net/api/report',
//         method: 'POST',
//         json: data
//     }
//     request(options).pipe(res);
// })

// app.listen(80, function () {
//     console.log('CORS-enabled web server listening on port 80')
// })

// exports.api = functions.https.onRequest(app);