const admin = require('../config/firebaseConnection')
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();
const DefaultStorage = admin.storage();
const formidable = require('formidable-serverless');
const fs = require('fs');

module.exports = function (req, res) {

  try {

    //check if img of product is same from img received.
    const form = new formidable.IncomingForm({ keepExtensions: true })

    form.parse(req, async (err, fields, file) => {
      if (err) {
        console.error(err);
      }

      if (!fields.id) {
        return res.status(500).send('Undefined product Id.');
      }

      let data = {}
      let documentId = fields.id;

      if (fields.name) data.name = fields.name;
      if (fields.status) data.status = fields.status;

      if (!file.imgUrl) { //No image received. 
        //Update just the name/status of the product

        firestore.doc(`products/${documentId}`).update(data)
          .then(() => {
            res.status(200).send({
              err: false,
              msg: "product updated!"
            });
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Could not save product');
          })

      } else { //Image received. 
        //Update image in Cloud Storage

        let storageRef = DefaultStorage.bucket('now-test-76d4b.appspot.com');
        let [storageFiles] = await storageRef.getFiles({ prefix: `products/${documentId}` });

        storageFiles.forEach(tmpFile => {
          tmpFile.delete();
        })

        let fileBktUrl = `products/${documentId}/${file.imgUrl.name}`;

        let fileStr = storageRef.file(fileBktUrl);
        fs.createReadStream(file.imgUrl.path)
          .pipe(fileStr.createWriteStream({ public: true }))
          .on('error', function (err) {
            console.error(err);
            res.status(500).send('Could not save product');
          })
          .on('finish', async function () {
            let [metadata] = await storageRef.file(fileBktUrl).getMetadata();

            data.imgUrl = metadata.mediaLink;
            data.fileName = file.imgUrl.name;

            firestore.doc(`products/${documentId}`).update(data)
              .then(() => {
                res.status(200).send({
                  err: false,
                  msg: "product updated!"
                });
              });

          });

      }

    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Could not save product');
  }
}