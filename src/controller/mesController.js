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
        const result = await insContact.save();
        res.status(200).json('message received');
} 

//get all message
const messages = async(req, res)=>{
        let getMessage = await Contact.find();
        res.status(200);
        res.json(getMessage)
   
}

//delete message
const deleteMsg = async(req,res)=>{
        try {
                const id = req.params.id;
                await Contact.deleteOne({_id: id});
                res.status(200).json("message deleted")
        } catch (error) {
                res.status(404).json('not found on delete')       
        }
} 

export {ContactContr,messages,deleteMsg}