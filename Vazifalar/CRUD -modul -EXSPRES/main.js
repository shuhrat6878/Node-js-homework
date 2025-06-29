import express from 'express'; 
import { read,write } from './write-read.js';


const app = express();


app.use(express.json());
app.listen(3000, ()=> {
    console.log("server 3000 porta ishlayapti")})

app.get ('/', (req,res)=>{
    res.send("salom dunyo")
});