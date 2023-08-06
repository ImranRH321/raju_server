const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

//
app.use(cors());
app.use(express.json());
//

const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://db_raju:aUAJDCeqUsltWHSt@cluster0.5tob0mc.mongodb.net/?retryWrites=true&w=majority";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5tob0mc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const addRecordCollection = client
      .db("doctor-raju")
      .collection("add-record");
    //add data
    app.post("/add-record", async (req, res) => {
      const body = req.body;
      const addDb = await addRecordCollection.insertOne(body);
      console.log("addDb ====>", addDb);
      res.send(addDb);
    });
    //
    //get data
    app.get("/my-record-file", async (req, res) => {
      const myData = await addRecordCollection.find().toArray();
      res.send(myData);
    });
    //

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running Raju Tech Doctor");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
