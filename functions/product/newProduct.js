const Firestore = require('@google-cloud/firestore');
const admin = require('../config/firebaseConnection')
const firestore = new Firestore();
const DefaultStorage = admin.storage();
const formidable = require('formidable-serverless');
const fs = require('fs');

function uploadToStorage(file, fileBktUrl) {

    return new Promise((resolve, reject) => {

        let storageRef = DefaultStorage.bucket('now-test-76d4b.appspot.com');
        let fileStr = storageRef.file(fileBktUrl);

        fs.createReadStream(file.imgUrl.path)
            .pipe(fileStr.createWriteStream())
            .on('error', function (err) {
                console.error(err);
                reject()
            })
            .on('finish', function () {
                resolve()
            });
    })
}

module.exports = function (req, res) {

    try {

        const form = new formidable.IncomingForm({ keepExtensions: true });

        form.parse(req, async (err, fields, file) => {

            if (err) {
                console.log(err);
            }

            let data = {
                name: fields.name
            }

            let document = await firestore.collection('products').add(data);
            let fileBktUrl = `products/${document.id}/${file.imgUrl.name}`;

            let updtDoc = firestore.doc(`products/${document.id}`).update({ imgUrl: fileBktUrl });

            uploadToStorage(file, fileBktUrl);

            Promise.all([updtDoc, uploadToStorage(file, fileBktUrl)]).then((values) => {

                res.status(200).send({
                    err: false,
                    msg: "product saved"
                });

            }).catch((err) => {
                res.status(500).send('Could not save product');
            });

        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Could not save product');
    }

}