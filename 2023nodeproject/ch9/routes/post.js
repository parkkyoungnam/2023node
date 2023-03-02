const express = require('express');
const router = express.Router();

const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const {afterUploadImage, uploadPost} = require('../controllers/post')

try {
    fs.readdirSync('uploads');
}
catch(error){
    console.log(error);
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/');
        },
        filename(req, file, cb){
            //console.log(file); -> 해당 과정으로 file 구조 파악
            const ext = path.extname(file.originalname); // 이미지.png --> 이미지 이름이 같아지기 때문에
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
        }
    }),
    limits : {fileSize : 100 * 1024 * 1024 },
});
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

module.exports = router;