const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = express.Router();
const validateFirebaseIdToken = require("./middleware/auth");
const helmet = require("helmet");

app.use(helmet());
app.use(cors());

app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data

//import routes
const product = require("./product");

app.use(router);

app.use("/product", validateFirebaseIdToken, product);

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//