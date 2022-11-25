import mongoose from 'mongoose'
import Entry from '../../../api/entry';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  switch(req.method) {
    case 'GET' :
      const userId = req.url.split('/')[3];
      const allUsersEntries = await Entry.where('userId').equals(userId);
      return res.status(200).json({allUsersEntries: allUsersEntries})
      break;
    case 'PATCH':
      console.log(req.body);
      const entry = await Entry.findOneAndUpdate({ _id: req.body.entryid }, { endTime: req.body.endTime, finish: true});
      return res.status(201).json({entry: entry})
      break;
  }
}