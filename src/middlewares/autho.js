import Jwt  from "jsonwebtoken";

const verifyTokens = (req,res,next)=>{
    //Create authorization header
    const BearerHeader = req.headers['authorization'];
    if (typeof BearerHeader !== 'undefined') {
        //splite token
        const bearerToken = BearerHeader.split(' ')[1];
        //set token
        req.token = bearerToken;
        next()
    }else{
        res.send('Login before ')
    }
}

const verifyUserTokens = (req,res,next)=>{
    //Create authorization header
    const BearerHeader = req.headers['authorization'];
    if (typeof BearerHeader !== 'undefined') {
        //splite token
        const bearerToken = BearerHeader.split(' ')[1];
        //set token
        req.token = bearerToken;
        next()
    }else{
        res.send('Login before ')
    }
}

// signup validation
const signupVald =async(req,res,next)=>{
    const {error, value} = regVal.validate(req.body, {abortEarly: false});
    if(error){
        return res.send(error.details[0].message)
    }
    req.regVal = value;
    next();
}

//login validation
const loginVald =async(req,res,next)=>{
    const {error, value} = regVal.validate(req.body, {abortEarly: false});
    if(error){
        return res.send(error.details[0].message)
    }
    req.regVal = value;
    next();
}


//user signup validation
const UserVald =async(req,res,next)=>{
    const {error, value} = UserRegVal.validate(req.body, {abortEarly: false});
    if(error){
        return res.send(error.details[0].message)
    }
    req.regVal = value;
    next();
} 

export {verifyTokens, verifyUserTokens,UserVald,loginVald,signupVald}