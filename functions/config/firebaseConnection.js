const admin = require("firebase-admin");

try {
    admin.initializeApp();
} catch (error) {
    console.error(error);
}

module.exports = admin;