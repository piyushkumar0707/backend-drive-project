const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const fileModel = require('../models/files.models')
const authMiddleware = require('../middlewares/auth');
const firebase = require('../config/firebase.config');

router.get('/home',authMiddleware, async (req, res) => {
    const userFiles = await fileModel.find({ user: req.user.userId });
    res.render('home', { files: userFiles });
});


router.post('/upload',authMiddleware, upload.single('file'), async (req, res) => {
   const newFile = await fileModel.create({
    path:req.file.path,
    originalname:req.file.originalname,
    user: req.user.userId
   });
   res.json({message: 'File uploaded successfully', file: newFile   
   })

});


router.get('/download/:path', authMiddleware, async (req, res) => {

    const loggedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user: loggedInUserId,
        path: path

    });

    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }

    const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000 
    });
    res.redirect(signedUrl[0]);
});

module.exports = router;