import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';
import router from './routes/routes';

const app = express();

const options = {
    swaggerDefinition:{    
        openapi: '3.0.0',
        info: {
            title: 'My brand api',
            version: '1.0.0',
            description: 'Simple express api'
        },
        servers: [{
            url : process.env.SWAGGERURL
        }],
        components: {
           securitySchemes:{
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            },
            security:[
                {
                    bearerAuth: [] 
                }   
            ]
                  
           }
            
        }  
    },
    apis: ['./src/routes/api/*.js']
}

const specs = swaggerJSDoc(options);

app.use('/api-docs',SwaggerUI.serve,SwaggerUI.setup(specs))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));
app.use("/",router);

const port = process.env.PORT;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.REMOTEDB,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`The server is running on: ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log(err)
})

export default app
