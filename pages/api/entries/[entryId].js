import mongoose from 'mongoose'
import Entry from '../../../api/entry';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  switch(req.method) {
    case 'GET' :  
      console.log(req.url);
      const userData = req.url.split('/')[3];
      const userEmail = userData.split('-')[1];
      const date = userData.split('-')[2];
      const formatData = (input) => {
        if (input > '9') {
          return input;
        } else return `0${input}`;
      };  
      const formatedDate = date.getFullYear() + '-' + formatData(date.getMonth()) + '-' + formatData(date.getDate());
      console.log('entryID GET - ', userEmail, ' - ', formatedDate)
      const allTimeEntries = await Entry.find({ $and:
        [{ email: userEmail },
         { timesheetDate : formatedDate }
        ]})

      console.log('allTimeEntries : ', allTimeEntries)  
      console.log('allTimeEntries.entries : ', allTimeEntries.entries)
      console.log('allTimeEntries.entries[0] : ', allTimeEntries.entries[0])

      return res
        .status(200)
        .json({allEntries: allTimeEntries.entries})
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

