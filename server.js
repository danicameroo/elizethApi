
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require('cors');

const app = express();
app.use(cors());

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBconnnection succesfull!"))
    .catch((err)=>{
        console.log(err);
    });

app.use(express.json());

//CREATE
app.post("/api/inmuebles" ,async (req,res)=>{
  const newInmueble = new Inmueble(req.body)

  try{
      const savedInmueble = await newInmueble.save();
      res.status(200).json(savedInmueble)
  }catch(err){
      res.status(500).json(err)
  }
})

//UPDATE
app.put("/api/inmuebles/:id", async (req,res) =>{  
  try{
      const updatedInmueble = await Inmueble.findByIdAndUpdate(req.params.id, {
          $set: req.body
      },{new:true});
      res.status(200).json(updatedInmueble);
  }catch(err){
      res.status(500).json(err)
  }
});

//DELETE
app.delete("/api/inmuebles/:id", async (req,res)=>{
  try{
      await Inmueble.findByIdAndDelete(req.params.id);
      res.status(200).json("Inmueble has been deleted");
  }catch(err){ 
      res.status(500).json(err);
  }
});

//GET INMUEBLE
app.get("/api/inmuebles/find/:id", async (req,res)=>{
  try{
      const inmueble = await Inmueble.findById(req.params.id);
      res.status(200).json(inmueble);
  }catch(err){
      res.status(500).json(err);
  }
});

//GET ALL INMUEBLES
app.get("/api/inmuebles", async (req,res)=>{
  const qNew = req.query.new;
  try{
      let inmueble;
      if(qNew){
          inmueble = await Inmueble.find().sort({createdAt: -1}).limit(5)
      }else{
          inmueble = await Inmueble.find()
      }
      res.status(200).json(inmueble);
  }catch(err){
      res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server is running! ${PORT}`);
});