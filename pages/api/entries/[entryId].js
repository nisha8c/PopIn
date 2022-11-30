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
      const documentId = req.body.documentid
      const entryId = req.body.entryid

      const entry = await Entry.findOneAndUpdate(
        { _id: documentId, 'entries._id': entryId },
        { 'entries.$.endTime': req.body.endTime }
      );

      const endTime = await Entry.findOne(
        { _id: documentId, 'entries._id': entryId }
      )
      
      let start_date = moment(endTime.entries[endTime.entries.length-1].startTime, 'HH:mm:ss');
      let end_date = moment(endTime.entries[endTime.entries.length-1].endTime, 'HH:mm:ss');
      let TimeDuration = moment.duration(end_date.diff(start_date));
      const duration = TimeDuration.asSeconds();

      const updateDuration = await Entry.findOneAndUpdate(
        { _id: documentId, 'entries._id': entryId },
        { 'entries.$.duration': duration }
      );

      const document = await Entry.findOneAndUpdate(
        { _id: documentId },
        [ { $set: { 'totalTime': { $sum: '$entries.duration' } } } ],
        { returnNewDocument: true }
      );
     
         return respond(res, endTime._id, endTime.entries[endTime.entries.length-1] )
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

const respond = (res, entry, docID) => {
  res
    .status(201)
    .json({
      documentId: docID, 
      entryId: entry._id,
      entry
    })
}