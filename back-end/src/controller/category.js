const Category = require('../models/category')
const slugify = require('slugify');


//function for add category
exports.addCategory = (req,res) => {

    const categoryObj = {
        name:req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
     const cat = new Category(categoryObj);
     cat .save((error,category) => {
         if(error){
             return res.status(400).json({ error});
         }
         if(category) {
             return res.status(200).json({ category,msg:"category saved successfully"});
         }
     })
}

//function for fetch category
exports.getCategory = (req,res) => {

      Category.find({})
      .exec((error,categories) => {
          if(error){
              return res.status(400).json({error})
          }
          if(categories){
              const categoryList = createCategory(categories)  // call createcategory function and pass cattegories in it

              return res.status(200).json({categoryList})
                //  return res.status(200).json(categories)
          }
      })
}
//it is recuresive function to fetch subcategory or nested category in well manner or using filter method
function createCategory(categories,parentId = null){

    const categoryList = [];
    let newcategory;
    if(parentId == null) {
        newcategory=categories.filter( cat => cat.parentId == undefined);//define below brifly
    } else {
        newcategory= categories.filter( cat => cat.parentId == parentId);
    }


    for(let cate of newcategory){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug:cate.slug,
            children: createCategory(categories,cate._id)
        })
    }

    return categoryList;
}

//javascript w3school filter method expample
// const ages = [32, 33, 16, 40];
// document.getElementById("demo").innerHTML = ages.filter(checkAdult);
// function checkAdult(age) {
//   return age >= 18;

// use of filter method is our project 
// categories.filter(cat)
// function cat(parentId)
//  {
//      return parentId == undefined;
//  }