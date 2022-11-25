import mongoose from 'mongoose'
import Entry from '../../../api/entry';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  
  switch(req.method) {
    case 'GET':
      // console.log(req);
      // const allUsersEntries = await Entry.where('userId').equals()
      return res.status(200).json({allEntries: req.params});
      break;
    case 'POST':
      const newEntry = JSON.parse(req.body)
      //  TODO check if there is already an entry for that day. It true return response and not post anything to MongoDB
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