const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert('./gentec-admin-firebase-adminsdk-cqmc9-3336ce1246.json'),
    databaseURL: "https://gentec-admin.firebaseio.com"
});

const os = require('os');
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/products/create', (req, res) => {
    let productCode = req.body.productCode
    // functions.firestore.document('products').onCreate((snap, context) => {
        const docRef = admin.firestore().collection('products');
    let s = docRef.get().then((querySnapshot) => {
        
        return querySnapshot;
        })
    res.json({ d: s })
    });
        // const storage = admin.storage();
        // let fileName = 'products.json';
        // let destination = 'products.json';
        // const tempFilePath = path.join(os.tmpdir(), fileName);
        // fs.writeFileSync(tempFilePath, "something!");
        // return storage
        //     .bucket()
        //     .upload(tempFilePath, { destination })
        //     .then(() => fs.unlinkSync(tempFilePath))
        //     .catch(err => console.error('ERROR inside upload: ', err));
    // });
// })

exports.api = functions.https.onRequest(app);

// exports.testItOut = functions.firestore
//     .document('blarg/{docId}')
//     .onUpdate((change, context) => {
//         console.log("Inside #testItOut");
//         const storage = admin.storage()
//         let fileName = 'temp.txt';
//         let destination = '/signatures/temp.txt';
//         const tempFilePath = path.join(os.tmpdir(), fileName);
//         console.log(`Writing out to ${tempFilePath}`);
//         fs.writeFileSync(tempFilePath, "something!");

//         return storage
//             .bucket()
//             .upload(tempFilePath, { destination })
//             .then(() => fs.unlinkSync(tempFilePath))
//             .catch(err => console.error('ERROR inside upload: ', err));
//     });
