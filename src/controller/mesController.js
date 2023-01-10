import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Contact from "../model/messageMod.js";


//send message
const ContactContr = async (req,res)=>{
    const {name,email,message} = req.body   
    const insContact = new Contact({
        name,email,message
   })
   await insContact.save().then((result)=>{
    res.send(result);
   }).catch((error)=>{ res.send({message: 'fail to save blog'}); console.log(error)})
} 
//get all message
const messages = async(req, res)=>{
    jwt.verify(req.token, SecretKey, async(err,authoData)=>{
        if(err){
            res.send('Login before you view all messages')
        }else{
            await Contact.find()
            .then((result)=>{
                if(result === ""){
                    res.send({message: "empty"})
                }else{
                    res.send(result)
                }
                
            })
            .catch((error)=>{ console.log(error)})
        }
    })
   
}

//delete message
const deleteMsg = async(req,res)=>{
    
    try {
        jwt.verify(req.token, SecretKey, async(err,authoData)=>{
            if(err){
                res.send('Login first')
            }else{
                const id = req.params.id;
                await Contact.deleteOne({_id: id});
                res.status(200).json({message: "message deleted"})
            }
        })
      
    } catch(error){
        res.status(404).json({error: "That id doesn't exist"});
    }
} 


export {ContactContr,messages,deleteMsg}