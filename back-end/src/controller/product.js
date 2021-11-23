const Product = require('../models/product');
const shortid = require('shortid'); //for unique id of files
const slugify = require('slugify');

exports.createProduct = (req,res) => {

    
        // res.status(200).json({
            // file: req.files, //for single file mention req.*file only and for multiple mention *files
            // body: req.body
        // });
        const {
            name,price,decription,category,quantity
        } = req.body;   

        let productPictures = [];
        if(req.files.length > 0){
            productPictures = req.files.map(file => {
                return { img: file.filename}
            })
        }


        const product = new Product({
             name : name,
             slug:slugify(name),
             price,
             quantity,
             decription,
             productPictures,
             category,
             createdBy:req.user._id
        });

        product.save(((error,product) => {
            if(error){
                return res.status(400).json({
                    error:error
                })
            }
            if(product){
                return res.status(200).json({
                    msg:"product saved",
                    product:product
                })
            }
        }))
        
    }

