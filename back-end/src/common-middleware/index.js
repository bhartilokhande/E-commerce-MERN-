const jwt = require('jsonwebtoken');


//function for jwt token verification
exports.requireSignin = (req,res,next) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const user = jwt.verify(token,"thisjwtsecretkeyforsignin");
        req.user = user;
    }else{
        return res.status(400).json ({
            msg:"authorization required"
        });
    }
    next()


}

//function to check the role is user
exports.userMiddleware = (req,res,next) => {
    if(req.user.role !== "user"){
        return res.status(400).json({msg:"User access Denied"})
    }
    next();
}

//function to check the role is admin
exports.adminMiddlerware = (req,res,next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({msg:"Access Denied"})
    }
    next();
}