import mongoose from 'mongoose'
import Entry from '../../../api/entry';
const moment = require('moment');

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  switch(req.method) {
    case 'GET' :  
      const userData = req.url.split('/')[3];
      const userEmail = userData.split('%5E')[0];
      const date = userData.split('%5E')[1];
      
      const allTimeEntries = await Entry.findOne({ $and:
        [{ email: userEmail },
         { timesheetDate: date }]
      })

      // if ( allTimeEntries.length === 0) {
      //  return res
      //    .status(404)
      //    .json({message: 'No entries found for this date' })
      //} else {
          return res
            .status(200)
            .json({allEntries: allTimeEntries.entries, totalTime: allTimeEntries.totalTime})
      //}
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
     
         return respond(res, endTime._id, endTime.entries[endTime.entries.length-1] )
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