const Firebase= require('firebase-admin');

const serviceAccount = require('./drive-cc043-firebase-adminsdk-fbsvc-61199a8917.json');
const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-cc043.firebasestorage.app'
});

module.exports = Firebase;