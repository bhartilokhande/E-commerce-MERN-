const Cart = require('../models/cart')





exports.addItemToCart = (req,res) => {
    // res.status(200).json({
    //     msg:"welcome to add to cart page"
    // })

   Cart.findOne({user:req.user._id})
   .exec((error,cart) => {
       if(error){
           res.status(400).json({
                  error:error
           })
       }
       if(cart){
            //if cart  already exists then update cart by quantity
             const isItemsAdded = cart.cartItems.find(c => c.product == req.body.cartItems.product);
             if(isItemsAdded){

             }else{
                 
             }
             Cart.findOneAndUpdate({user:req.user._id},{
                 "$push":{
                     "cartItems":req.body.cartItems
                 }
             })
             .exec((error,_cart) => {
                 if(error){
                     res.status(400).json({
                         error
                     })
                 }
                 if(_cart){
                     res.status(200).json({
                        msg:"item added", 
                        _cart
                     })
                 } 

             })

            // res.status(200).json({
            //       msg:"Item already exist"
            // })
            
       }else{
           //if cart not exists then create a new cart
        const cart = new Cart ({
            user:req.user._id,
            cartItems:[req.body.cartItems]
        });
    
        cart.save((error,cart) => {
            if(error) {
                return res.status(400).json({
                    error:error 
                })
            }
            if(cart) {
                return res.status(200).json({
                    msg:"items added to cart",
                    cart
                })
            }
        });
           
       }
   })

    
}