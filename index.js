const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require ('dotenv').config();
const app = express();
const port = process.env.PORT || 5000


// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d6oiejw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    

 const allArticleCollection = client.db('newsDB').collection('allArticles')
 const trNewsCollection = client.db('newsDB').collection('trNews')
  
  
 app.get('/allArticles', async (req, res)=>{

          const limit = parseInt(req.query?.limit) || 0;
          const result = await allArticleCollection.find().limit(limit).toArray()
          res.send(result)
           
       })

      //teNews

      app.get('/trNews', async (req, res)=>{

        const result = await  trNewsCollection.find().toArray()
        res.send(result)
         
     })

 // all service detail
 app.get('/allNews/:id', async (req, res)=>{
  const id = req.params.id;
  const query = { _id: new ObjectId(id)}
  //  const options = { 
  //  // Include only the `title` and `img` fields in each returned document
  //   projection: {  title: 1, _id: 1, Image: 1, service_name: 1, service_description: 1, provider_img: 1, provider_name: 1, Service_Area: 1  },
  //     };

  const result = await allArticleCollection.findOne(query)
  res.send(result)
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('newspaper making server running')
})

app.listen(port, ()=>{
    console.log(`newspaper server is running on port: ${port} `)
})
 
