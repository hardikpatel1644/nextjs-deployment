//api/new-meetup

import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://hackdev16:b4QppEe9zgrx9mf5@cluster0.6gj7l.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log("result", result);
    client.close();
    res.status(201).json({ message: "Meetup inserted !" });
  }
}

export default handler;
