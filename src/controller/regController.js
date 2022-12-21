import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import {UserReg, Signup} from "../model/registerMod";
import session from 'express-session';



//some global variable
const SecretKey = process.env.JWT_SECRET;
const userSecret = process.env.USER_SECRET;

//User registration
const UserRegistration = (req,res)=>{
    const {name,email,password} = req.body;
     //hashing password
    bcrypt.hash(password,10, async(err, hashPin)=>{
        if(err){
            res.json({
                err
            })
        }else{
            const enterUser = new UserReg({
                name,
                email,
                password: hashPin
            });
            await enterUser.save()
                .then((result)=>{
                    res.json({
                        message: "complite signup",
                        result
                    });
                }).catch((error)=>{
                    res.json({error})
                })
        }
    })
    
    
}

//User login
const userLogin = async(req,res)=>{
    const {email, password} = req.body;
    await UserReg.findOne({email})
        .then((user)=>{
            if (user) {
                bcrypt.compare(password,user.password, (error,result)=>{
                    if (error) {
                        console.log(error)
                    }
                    if(result){
                        let token = jwt.sign({user}, userSecret ,{expiresIn: '1h'});
                        if (token) {
                            session.userId = user.id;             
                            res.json({
                                message :  `${user.name}`,
                                token
                            })
                        }else{
                            session.userId = null;
                        }
                        
                    }else{
                        res.json({
                            message: "password not matches"
                        })
                    }
                })
            }else{
                res.json({
                    message: 'unknown data, please make signup'
                })
            }
        }).catch((error)=>{
            console.log(error);
            res.sendStatus(500).send('Server problem')
        })

}



//admin user registration
 const register = async(req,res)=>{
    bcrypt.hash(req.body.password, 10, (error,hashedPass)=>{
        if (error) {
            res.json({
                error: "not hashed"
            })
        }
        const {name,email,password} = req.body;
        const enterUser = new Signup({
            name,
            email,
            password: hashedPass
        });

        enterUser.save()
            .then((result)=>{
                res.json({
                    message: "complite signup"
                })
            }).catch((error)=>{
                res.json({error})
            })
    })
    
}


//getting all admin signed in

const signedIn = (req,res)=>{
    jwt.verify(req.token, SecretKey, async(err,authoData)=>{
        if(err){
            res.send('Login first')
        }else{
            await Signup.find()
            .then((result)=>{
                res.send(result)
            }).catch((err)=>{
                res.json({
                    error: err
                })
            })
        }
    })
    
}

//Admin login

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
                        let token = jwt.sign({name: user.name}, SecretKey , {expiresIn: '1h'});
                        res.json({
                            message: `${user.name}`,
                            token
                        })
                    }else{
                        res.json({
                            message: "password not matches"
                        })
                    }
                })
            }else{
                res.json({
                    message: 'unknown data, please make signup'
                })
            }
        }).catch((error)=>{
            console.log(error);
            res.sendStatus(500).send('Server problem')
        })
} 


export {UserRegistration, userLogin,register,signedIn, login}