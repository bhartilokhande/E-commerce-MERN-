const express = require('express');
const router = express.Router();
const {requireSignin,adminMiddlerware} = require("../common-middleware/index")
const {createProduct} = require('../controller/product')
const multer = require('multer'); //for file uploading
const shortid = require('shortid');
const path = require('path');

//using multer for file uploading
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname) 
    }
  })

  const upload = multer({storage}); //folder where you want to upload files

router.post('/product/create',requireSignin,adminMiddlerware,upload.array('productPicture'),createProduct)



module.exports = router;



//router.post('/product/create',requireSignin,adminMiddlerware,upload.single('productPicture'),createProduct)
//upload.single('productPicture'): upload a single file to productPicture filed in mongoose
//path.dirname(__dirname) : gives you a current directory
