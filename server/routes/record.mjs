import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import CheckAuth from "../check-auth.mjs";
const router = express.Router();

// This section will get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will get a single record by id
router.get("/:id", async (req, res) => {
  const checkAuth = new CheckAuth(req, res, () =>{
  let collection =  db.collection("records");
  let query = {_id: new ObjectId(req.params.id)};
  let result =  collection.findOne(query);

  if (!result) res.send("Not found :(").status(404);
  else res.send(result).status(200);
});

checkAuth,checkToken();

});


// This section will create a new record.
router.post("/", async (req, res) => {
  const checkAuth = new CheckAuth(req, res, () => {
  let newDocument = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  let collection =  db.collection("records");
  let result =  collection.insertOne(newDocument);
  res.send(result).status(204);
});

checkAuth.checkToken();

});

// This section will update a record by id.
router.patch("/:id", async (req, res) => {
  const checkAuth = new CheckAuth(req, res, () =>{
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection =  db.collection("records");
  let result =  collection.updateOne(query, updates);

  res.send(result).status(200);
});

checkAuth.checkToken();

});

// This section will delete a record
router.delete("/:id", async (req, res) => {
  const checkAuth = new CheckAuth(req, res, () =>{
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("records");
  let result =  collection.deleteOne(query);

  res.status(200).json({ message: "SUCCESSFULLY DELETED RECORD :)" });
});

checkAuth.checkToken(); 

});



router.post('/create', async (req, res) => {
  const checkAuth = new CheckAuth(req, res, async () => {
  
      const newDocument = {
        name: req.body.name
      };
      const collection = db.collection("records");
      const result = await collection.insertOne(newDocument);

      res.status(200).json({ message: "SUCCESSFULLY ADDED THE RECORD :)" });
  });

  checkAuth.checkToken();
});



export default router;