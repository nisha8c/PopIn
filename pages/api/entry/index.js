import mongoose from 'mongoose'
import { ObjectId } from 'mongodb';

const { Schema, model } = mongoose;
const entrySchema = new Schema({
  id: ObjectId,
  date: Date,
});

const Entry = model('Entry', entrySchema);

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  
  switch(req.method) {
    case 'POST':
      const newEntry = JSON.parse(req.body)
      const entry = await Entry.create({
        id: newEntry.userId,
        date: newEntry.punchIn,
      })
      console.log(entry)
      return res.status(200).json({entry: entry});
      break;
    case 'GET':
      return res.status(200).json({entries, user: req.session, 'test': '1'});
      break;
  }
}