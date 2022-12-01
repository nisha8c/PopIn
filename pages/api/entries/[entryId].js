import mongoose from 'mongoose'
import Entry from '../../../api/entry';
const moment = require('moment');

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  switch(req.method) {
    case 'GET':  
      return res
        .status(204)
        .json({message: 'you have reached GET endpoint'})
      break;
    case 'PATCH':
      return res
      .status(204)
      .json({message: 'you have reached PATCH endpoint' })
      break;
    case 'DELETE': 
        const deleteEntryId = req.url.split('/')[3];
        
        const getDocumentId = await Entry.findOne(
          { 'entries._id': deleteEntryId }
        ) 

        await Entry.findOneAndUpdate(
            { 'entries._id': deleteEntryId },
            { $pull: { entries: {'_id': deleteEntryId } } }
          ) 
        
        await Entry.findOneAndUpdate(
          { _id: getDocumentId._id },
          [ { $set: { 'totalTime': { $sum: '$entries.duration' } } } ],
          { returnNewDocument: true }
        );

        return res
          .status(204)
          .json({message: 'You have sucessfully deleted requested Entry' })
        break;
  }
}
