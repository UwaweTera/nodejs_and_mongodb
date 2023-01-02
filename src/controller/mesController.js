import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import 'dotenv/config';
import UserReg from "../model/registerMod";
import Contact from "../model/messageMod";
import session from 'express-session';

//some global variable
const SecretKey = process.env.JWT_SECRET;
const userSecret = process.env.USER_SECRET;

//send message
const ContactContr = async (req,res)=>{
        const {name,email,message} = req.body   
        const insContact = new Contact({
            name,email,message
        })
        await insContact.save()
        res.status(200).send('Message sent');

} 

//get all message
const messages = async(req, res)=>{
        let getMessage = await Contact.find();
        res.status(200);
        res.send(getMessage)
   
}

//delete message
const deleteMsg = async(req,res)=>{
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json('Not found');
        await Contact.deleteOne({_id: id});
        res.status(200).json({message: "message deleted"})

} 


export {ContactContr,messages,deleteMsg}