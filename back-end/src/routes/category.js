const express = require('express');
const router = express.Router();
const {requireSignin,adminMiddlerware} = require("../common-middleware/index")
const {addCategory,getCategory} = require('../controller/category');



router.post('/category/create',requireSignin,adminMiddlerware, addCategory );
router.get('/category/getcategory',getCategory)




module.exports = router;