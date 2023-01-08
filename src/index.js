import app from "./app";

const port = process.env.BACKPORT || 4000;
app.listen(port,()=>{
    console.log(`The server is running on: ${port}`);
})