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
                res.status(200).json('Complite Signup')
            } 
        }
    })
    
    
}

//User login
const userLogin = async(req,res)=>{
    let token = jwt.sign({id: req.user._id}, userSecret );
    res.status(200).json(token)
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
            res.json('complite signup')
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

//Admin login
/* 
const login = async(req,res)=>{
    const adminEmail = req.body.email;
    const adminPin = req.body.password;
    await Signup.findOne({email: adminEmail})
        .then((user)=>{
            
            if (user) {
                bcrypt.compare(adminPin,user.password, (error,result)=>{
                    if(error){
                     console.log(error)
                    }
                    if(result){
                        let token = jwt.sign({
                            id: user._id,
                            name: user.name
                        }, SecretKey , {expiresIn: '1h'});
                        res.json({
                            message: `${user.name}`,
                            token
                        })
                    }else{
                        res.status(401).json("password not matches")
                    }
                })
            }else{
                res.status(401).json('unknown data, please make signup')
            }
        }).catch((error)=>{
            res.status(500).send('Server problem')
        })
}  */


export {UserRegistration, userLogin,register,signedIn,deleteUser}