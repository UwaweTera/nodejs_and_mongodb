import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import router from './routes/articleRoutes';
import session from 'express-session';
import router2 from './routes/contactRoutes';
import router3 from './routes/regRoutes';


const app = express();
app.use("/",router);
        app.use('/',router2);
        app.use('/',router3);
        app.use(express.json());
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
        }))
app.use(express.urlencoded({extended: false}));
const port = process.env.PORT;
try{
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.REMOTEDB,{useNewUrlParser: true}).then(()=>{
        app.listen(port,()=>{
            console.log(`The server is running on: ${port}`);
        })
    }).catch((err)=>{
        console.log("This Error: ",err.message);
    })
    
}catch(error){
    console.log(error);
}
