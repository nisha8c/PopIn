const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGODB_URI;
const dataBaseName = 'PopIn';


export default async function handler(req, res) {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db(dataBaseName);
  const entriesCollection = db.collection('entries');

  switch(req.method) {
    case 'POST':
      const newEntry = req.body;
      const savedEntry = await entriesCollection.insertOne({
        timeIn: newEntry.timeIn,
        userId: ObjectId(newEntry.userId)
      });
      return res.status(200).json({entry: savedEntry});
      break;
    case 'GET':
      const entries = await entriesCollection.find({});
      console.log(req)
      return res.status(200).json({entries, user: req.session, 'test': '1'});
  }
}