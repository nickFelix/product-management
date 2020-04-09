const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();

module.exports = function (req, res) {

  try {

    let result = [];

    let products = firestore.collection('products').get()
      .then(snapshot => {
        if (snapshot.empty) {

        }

        snapshot.forEach(doc => {
          result.push(doc.data())
        })

        res.status(200).send({
          err: false,
          result
        })

      })
      .catch(err => {
        res.status(500).send('Could not list products');
        throw err;
      })

  } catch (error) {
    res.status(500).send('Could not list products');
  }

}