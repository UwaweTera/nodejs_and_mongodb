import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import router from './routes/articleRoutes';
import session from 'express-session';
import router2 from './routes/contactRoutes';
import router3 from './routes/regRoutes';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const dbURI = "mongodb://127.0.0.1:27017/myBland";
try{
    mongoose.set('strictQuery', true);
    mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{
        app.use("/",router);
        app.use('/',router2);
        app.use('/',router3);
        app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
        }))
        app.use(express.urlencoded({extended: false}));
        app.listen(port,()=>{
            console.log(`The server is running on: ${port}`);
        })
    }).catch((err)=>{
        console.log("This Error: ",err.message);
    })
    
}catch(error){
    console.log(error);
}
