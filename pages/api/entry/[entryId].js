import mongoose from 'mongoose'
import Entry from '../../../api/entry';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  switch(req.method) {
    case 'PATCH':
      console.log(req.body);
      const entry = await Entry.findOneAndUpdate({ _id: req.body.entryid }, { endTime: req.body.endTime, finish: true});
      // TODO update in mongodb
      return res.status(201).json({entry: entry})
      break;
  }
}