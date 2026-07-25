const express=require('express')
const cors=require('cors')
const app=express();
const jwt=require("jsonwebtoken")
app.use(cors())
app.use(express.json())
const mongoose=require('mongoose')
const User=require("./models/User")
const Note = require("./models/Note");
const url="mongodb+srv://madhavimeesala0101_db_user:r6MQkI5euxR4HMcF@cluster0.oo5jhge.mongodb.net/?appName=Cluster0";
mongoose.connect(url).then(()=>{
    console.log("connected successfully")
}).catch((error)=>{
    console.log(error);
})

port=3000;

app.get('/',(req,res)=>{
    res.send("welcome to home page")
})
app.post("/api/auth/register",async (req,res)=>{
console.log(req.body);
const{name,email,password}=req.body;
 const existingUser=await User.findOne({email})
 if(existingUser){
    return res.status(400).json({
        success:false,
        message:"Account already exists"
    });
 }
  const user=new User(req.body);
  await user.save();
 return res.status(201).json({success:true,
    message:"user registered"
 });
});
const secret_key="mysecretkeymysecretkeymysecretkey";
app.post("/api/auth/login",async (req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    const newUser= await User.findOne({email});
    if(!newUser){
         return res.status(404).json({
            success:false,
            message:"User not Found"});
        console.log("user not found")
    }
    if(password===newUser.password){
        // res.json({message:"Correct password"});
        console.log("correct password")
        const payload={
            name:newUser.name,
            email:newUser.email
        };
        const token=jwt.sign(payload,secret_key,{expiresIn:"1h"});
        return res.status(200).json({
            success:true,
            message:"login successful",
            token:token
        })
        
    }
    else{
       return res.status(401).json({success:false,
        message:"Incorrect Password"});
    }
})

function authenticated(req,res,next){
         const authHeader=req.headers.authorization;
          if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token not provided"
        });
    }
         const token=authHeader.split(" ")[1];
         try{
            const decoded=jwt.verify(token,secret_key);
            req.user=decoded;
            next();
         }
         catch(error){
            return res.status(401).json({
                success:false,
                message:"invalid token"
            })
         }
}  
app.get("/api/auth/dashboard", authenticated, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
}); 
app.post("/api/notes", authenticated, async (req, res) => {

    const { title, content, tags } = req.body;

    const note = new Note({
        title,
        content,
        tags,
        userEmail: req.user.email
    });

    await note.save();

    res.status(201).json({
        success: true,
        message: "saved successfully",
        note
    });
});
app.get("/api/notes", authenticated, async (req, res) => {
    try {
        const notes = await Note.find({
            userEmail: req.user.email
        });

        res.json({
            success: true,
            notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
app.delete("/api/notes/:id", authenticated, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userEmail: req.user.email
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.json({
            success: true,
            message: "Note deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
app.listen(port,()=>{
    console.log("app is runnig on port number 3000")
})