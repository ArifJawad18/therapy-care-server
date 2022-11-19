const express = require( 'express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { response } = require('express');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}
@cluster0.y5mfc43.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('therapyCare').collection('services');
        const orderCollection = client.db('therapyCare').collection('orders');
       

        app.get('/services', async(req, res) =>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/services/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id) };
            const services = await serviceCollection.findOne(query);
            res.send(services)

        });
        // orders api //
        app.get('/orders', async(req, res) =>{
           let  query = {};
           if(req.query.email){
            query = {
                email:req.query.email
            }
           }
            const cursor = await cursor.toArray();
            res.send(orders);
        })
        app.post('/orders', async(req, res)=>{
            const orders = req.body;
            const result = await orderCollection.insertOne(orders)
            res.send(result);
        })

    }
    finally{

    }

}

run().catch(err => cons)

app.get ('/', (req, res) =>{
    res.send('therapy care server is running')
})

app.listen(port, () =>{
    console.log(`Therapy Care server running on ${port}`);
})