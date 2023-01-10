import authContact from "../routes/contactRoutes.js"
import {commentVal,blogValidation,blogUpdVal} from "../validater/articleVal.js";


//blog validation
const blogVal = async(req, res,next)=>{
    const {error, value} =  blogValidation.validate(req.body, {abortEarly : false});
    if(error){
        return res.send(error.details[0].message)
    }
    req.valData = value;
    next();
}
//update validation
const updateVal = async(req, res,next)=>{
    const {error, value} =  blogUpdVal.validate(req.body, {abortEarly : false});
    if(error){
        return res.send(error.details[0].message)
    }
    req.valData = value;
    next();
}
//comment validation
const commVal = async(req, res,next)=>{
    const {error, value} =  commentVal.validate(req.body, {abortEarly : false});
    if(error){
        return res.send(error.details[0].message)
    }
    req.valData = value;
    next();
}


export {blogVal,updateVal,commVal}