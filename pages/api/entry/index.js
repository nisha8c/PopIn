import mongoose from 'mongoose'
import Entry from '../../../api/entry';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  
  switch(req.method) {
    case 'GET':
      return res.status(200).json({entries, user: req.session, 'test': '1'});
      break;
    case 'POST':
      const newEntry = JSON.parse(req.body)
      const entry = await Entry.create({
        userId: newEntry.userId,
        startTime: newEntry.startTime,
        endTime: null,
        finish: false,
      })
      console.log(entry)
      return res.status(200).json({entry: entry});
      break;
    case 'PATCH':
        return res.status(201).json({message: 'youve reached PATCH endpoint' })
        break;
  }
}