import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import {UserReg, Signup} from "../model/registerMod";


//some global variable
const SecretKey = process.env.JWT_SECRET;
const userSecret = process.env.USER_SECRET;

//User registration
const UserRegistration = (req,res)=>{
    const {name,email,password} = req.body;
     //hashing password
    bcrypt.hash(password,10, async(err, hashPin)=>{
        if(err){
            res.json(err)
        }else{
            const enterUser = new Signup({
                name,
                email,
                password: hashPin
            });

            const emailExist = await Signup.findOne({email: req.body.email});

            if(emailExist){
                res.status(400).json('already there')
            }else{
                await enterUser.save()
                res.status(200).json(enterUser)
            } 
        }
    })
    
    
}

//User login
const userLogin = async(req,res)=>{
    let token = jwt.sign({id: req.user._id}, userSecret );
    res.status(200).json({
        name: req.user.name,
        role: req.user.role,
        token
    })
}

//admin user registration
 const register = async(req,res)=>{
    bcrypt.hash(req.body.password, 10, async(error,hashedPass)=>{
        if (error) {
            res.json({
                error: "not hashed"
            })
        }
        const {name,email,password} = req.body;
        const enterUser = new Signup({
            name,
            email,
            role: 'admin',
            password: hashedPass
        });

        const emailExist = await Signup.findOne({email: req.body.email});

        if(emailExist){
            res.status(400).json('already there')
        }else{
            enterUser.save()
            res.json(enterUser)
        }

    })
    
}


//getting all admin signed in

const signedIn = async(req,res)=>{
    const result = await Signup.find({role: 'admin'})
    res.status(200).json(result);
}

//delete users
const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id;
        await Signup.deleteOne({_id: id});
        res.status(200).json({msg: 'user deleted'});  
    } catch (error) {
        res.status(404).json({error: "user not found"});
    }
}

export {UserRegistration, userLogin,register,signedIn,deleteUser}