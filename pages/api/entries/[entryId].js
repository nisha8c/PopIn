import mongoose from 'mongoose'
import Entry from '../../../api/entry';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  switch(req.method) {
    case 'GET' :  
      const userData = req.url.split('/')[3];
      const userEmail = userData.split('%5E')[0];
      const date = userData.split('%5E')[1];
      
      const allTimeEntries = await Entry.find({ $and:
        [{ email: userEmail },
         { timesheetDate: date }]
      })

      if ( allTimeEntries.length === 0) {
        return res
          .status(404)
          .json({message: 'No entries found for this date' })
      } else {
          return res
            .status(200)
            .json({allEntries: allTimeEntries[0].entries})
      }
      break;
    case 'PATCH':
      const entry = await Entry.findOneAndUpdate(
        { _id: req.body.documentid, 'entries._id': req.body.entryid },
        { 'entries.$.endTime': req.body.endTime,
          'entries.$.duration': { $subtract: [ `{entries.$.endTime}`, `{entries.$.startTime}` ] }
        }
      );
      console.log('after end time :',entry); 
      return res
        .status(201)
        .json({entry: entry})
      break;
  }
}

