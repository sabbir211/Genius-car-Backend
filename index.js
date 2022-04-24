const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express()
const mongodb = require('mongodb');
const cors = require('cors');
const port=process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const dotenv = require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ppm6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
await client.connect()
const serviceCollection=client.db("genius-car-service").collection("services")

app.get("/services",async(req,res)=>{
    const query={}
const cursor=  serviceCollection.find(query)
const result=await cursor.toArray()

res.send(result)
})

app.post("/services",async(req,res)=>{
  const service=req.body
  const result= await serviceCollection.insertOne(service)
  res.send(result)
  console.log(
    `A document was inserted with the _id: ${result.insertedId}`,
 );
})

app.delete("/services/:id",async(req,res)=>{
    const doc=req.params.id
    console.log(doc);
    const query={_id:ObjectId(doc)}
    const result= await serviceCollection.deleteOne(query)
res.send(result)
})
    }
    finally{

    }
}
run().catch(console.dir)

app.get("/",(req,res)=>{
    res.send("i am running well form server")

})

app.listen(port,()=>{
    console.log("i am working fine");
})