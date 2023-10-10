import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


const cert = process.env.CERT;
const key = process.env.PRIVATE_KEY;
console.log(cert + "CERT AND KEY " + key)

const options = {
  key: fs.readFileSync(key),                  //Change Private Key Path here
  cert: fs.readFileSync(cert),            //Change Main Certificate Path here

  }

import records from "./routes/record.mjs";
import users from "./routes/user.mjs";

const PORT = process.env.PORT || 4040;
const app = express();

app.use(cors());
app.use(express.json());


app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
})

app.use("/record", records);
app.use("/user",users);



let server = https.createServer(options,app)

app.get('/record',(req,res)=>{
  res.send('HTTPS in ExpressJS')
})

// start the Express server
server.listen(PORT, () => {
  console.log(`Server is currently running on port: ${PORT}`);
});