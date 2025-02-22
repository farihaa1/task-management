require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://building-management-7130f.web.app",
    "https://task-management-2222.netlify.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const { MongoClient, ServerApiVersion, ObjectId, Code } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cd15p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const userCollection = client.db("taskManagementDb").collection("users");
    const tasksCollection = client.db("taskManagementDb").collection("tasks");

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });


    app.get("/user/:email", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // tasks api
    app.post("/tasks", async(req, res)=>{
      const {title, description, category,date, email} = req.body;
      const index = await tasksCollection.countDocuments({category});
      const totalIndex =await tasksCollection.countDocuments();
      const tasks = {
        title: title,
        description: description,
        category: category,
        date: date,
        email: email,
        index: index+1,
        totalIndex: totalIndex+1
      }
      console.log(tasks)

      const result = await tasksCollection.insertOne(tasks) 
      res.send(result)
    })

    app.get('/tasks/:email', async(req, res)=>{
      const email = req.params.email;
      const query = {email: email};
    
      const result = await tasksCollection.find(query).toArray()
      res.send(result)
    })
    app.patch("/tasks/:id", async (req, res) => {
      const { column } = req.body;
      console.log(column);
      console.log(req.params.id)
      // Use $set operator to update the column
      const updatedTask = await tasksCollection.findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },  // Use ObjectId to match the task
        { $set: { category: column } },    // Use $set to update the category (column)
        { returnDocument: "after" }        // Return the updated document
      );
    
      res.json(updatedTask);  // Send the updated task as the response
    });
    

    // app.put('/tasks/:id', async (req, res) => {
    //   const { id } = req.params;
    //   const { category } = req.body;
    
    //   try {
    //     const result = await tasksCollection.updateOne(
    //       { _id: ObjectId(id) },
    //       { $set: { category } }
    //     );
    //     if (result.matchedCount === 0) {
    //       return res.status(404).send('Task not found');
    //     }
    //     res.send('Task updated successfully');
    //   } catch (error) {
    //     console.error('Error updating task:', error);
    //     res.status(500).send('Error updating task');
    //   }
    // });
    
   
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`app is running `);
});
app.listen(port, () => {
  console.log(`Task management system is running in ${port}`);
});
