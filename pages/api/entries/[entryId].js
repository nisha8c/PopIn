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

    return res
        .status(200)
        .json({allEntries: allTimeEntries[0].entries})
      break;
    case 'PATCH':
      console.log('documentid for end time: ', req.body.documentid)
      console.log('entryid for end time: ', req.body.entryid)
      const entry = await Entry.findOneAndUpdate({ _id: req.body.documentid, 'entries._id': req.body.entryid },
       { 'entries.$.endTime': req.body.endTime });
      return res
        .status(201)
        .json({entry: entry})
      break;
  }
}

