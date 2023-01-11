import authContact from "../validater/messageVal";

//contact validation
const contVal = async(req, res,next)=>{
    const {error, value} =  authContact.validate(req.body, {abortEarly : false});
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    req.valData = value;
    next();
}

export default contVal