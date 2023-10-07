const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Cognizant",{useNewUrlParser: true})

const SchemaItem = new mongoose.Schema({
  name:String,
  description:String

});

const Item = mongoose.model("Mean",SchemaItem);

app.get("/api/item", async(req,res)=>{
  const {name,description} = req.body;

  try{
    const item = await Item.find();
    res.json(item);

  }catch(error){
    res.status(500).json({message: error.message});
  }
});

app.post("/api/item", async(req,res)=>{
  const {name,description} = req.body;
  try{
    const createItem = new Item({name,description});
    await createItem.save();
    res.json(createItem);
  }catch(error){
    res.status(500).json({message:error.message});
  }
});

app.put("/api/item/:id",async (req,res)=>{
  const {id} = req.params;
  const {name,description} = req.body;
  try{
    const updateItem = await Item.findByIdAndUpdate(id, {name,description},{new:true});
    res.json(updateItem);

  }catch(error){
    res.status(505).json({message:Error.message});
  }
});

app.delete("/api/item/:id",async (req,res)=>{
  const {id} = req.params;
  try{
    const deleteItem = await Item.findByIdAndRemove(id);
    res.status(200).end();
  }
  catch(error){
    res.status(500).json({error:Error.message})
  }
})

app.listen(port,()=>{
  console.log(`This server is running on server ${port}`)
})