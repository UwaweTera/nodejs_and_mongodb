import jwt  from "jsonwebtoken";
import {Signup} from "../model/registerMod";
import bcrypt from 'bcryptjs';
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJwt } from "passport-jwt";
import { regVal,UserRegVal } from "../validater/regValidate";
import { Strategy as LocalStrategy}  from "passport-local";

const SecretKey = process.env.JWT_SECRET;
const userSecret = process.env.USER_SECRET;

/* const verifyTokens = (req,res,next)=>{
    //Create authorization header
    const BearerHeader = req.headers['authorization'];
    if (typeof BearerHeader !== 'undefined') {
        //splite token
        const token = BearerHeader.split(' ')[1];
        //set token
        jwt.verify(token,SecretKey,(error, decodedToken)=>{
            if (error) {
                res.status(401);
                res.send('Login before. wrong token!');
            }else{
                next()
            }
        })
    }else{
        res.status(401);
        res.send('Login before, no token')
    }
} */

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        const user = await Signup.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password or email" });
        }
        return done(null, user);
    }
    )
  );
  
  passport.use(
      "jwt",
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: userSecret,
        },
        async (jwtPayload, done) => {
          const user = await Signup.findById(jwtPayload.id);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          return done(null, user);
        }
      )
    );


//admin validation
const adminVald =async(req,res,next)=>{
    const {error, value} = regVal.validate(req.body, {abortEarly: false});
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    // req.regVal = value;
    next();
}


//user signup validation
const UserVald =async(req,res,next)=>{
    const {error, value} = UserRegVal.validate(req.body, {abortEarly: false});
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    // req.regVal = value;
    next();
} 

export {/*verifyTokens , verifyUserTokens */UserVald,adminVald}