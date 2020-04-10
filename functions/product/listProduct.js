const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();

module.exports = function (req, res) {

  try {

    let result = [];

    firestore.collection('products').get()
      .then(snapshot => {
        if (snapshot.empty) {

        }

        snapshot.forEach(doc => {

          let data = doc.data();
          data.id = doc.id;

          result.push(data);

        });

        res.status(200).send({
          err: false,
          result
        });

      })
      .catch(err => {
        res.status(500).send('Could not list products');
        throw err;
      })

  } catch (error) {
    res.status(500).send('Could not list products');
  }

}