const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase.config');
const serviceAccount= require('./drive-cc043-firebase-adminsdk-fbsvc-61199a8917.json');

const storage = firebaseStorage({
    credentials:firebase.credential.cert(serviceAccount),
    bucketName: 'drive-cc043.firebasestorage.app',
    unique: true,
});


const upload= multer({ storage: storage,

 });


 module.exports = upload;