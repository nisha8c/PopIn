import mongoose from 'mongoose'
import Entry from '../../../api/entry';
const moment = require('moment');

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  switch(req.method) {
    case 'GET' :  
      return res
        .status(200)
        .json({message: 'you have reached GET endpoint'})
      break;
    case 'PATCH':
      const entry = await Entry.findOneAndUpdate(
        { _id: req.body.documentid, 'entries._id': req.body.entryid },
        { 'entries.$.endTime': req.body.endTime }
      );

      const endTime = await Entry.findOne(
        { _id: req.body.documentid, 'entries._id': req.body.entryid }
      )
      
      let start_date = moment(endTime.entries[endTime.entries.length-1].startTime, 'HH:mm:ss');
      let end_date = moment(endTime.entries[endTime.entries.length-1].endTime, 'HH:mm:ss');
      let TimeDuration = moment.duration(end_date.diff(start_date));
      const duration = TimeDuration.asSeconds();

      const updateDuration = await Entry.findOneAndUpdate(
        { _id: req.body.documentid, 'entries._id': req.body.entryid },
        { 'entries.$.duration': duration }
      );

      const document = await Entry.findOneAndUpdate(
        { _id : req.body.documentid },
        [ { $set: { 'totalTime': { $sum: '$entries.duration' } } } ],
        { returnNewDocument: true }
      );
     
      return res
        .status(201)
        .json({
          documentId: endTime._id, 
          entryId: endTime.entries[endTime.entries.length-1]._id
         })
      break;
    case 'DELETE': 
        const entryid = req.url.split('/')[3];
        await Entry.findOneAndUpdate(
            { 'entries._id': entryid },
            { $pull: { entries: {'_id': entryid } } }
          ) 
          
        return res
          .status(202)
          .json({message: 'You have sucessfully deleted requested Entry' })
        break;
  }
}

