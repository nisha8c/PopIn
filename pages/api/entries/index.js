import mongoose from 'mongoose'
import Entry from '../../../api/entry';
const moment = require('moment');

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  
  switch(req.method) {
    case 'GET':
      const allUsers = await Entry.distinct('email');
      return res
        .status(200)
        .json({ allUsersList: allUsers })
      break;
    case 'POST':
      const newEntry = JSON.parse(req.body)

      const existingEntry = await Entry.findOne({ $and:
        [{ email: `${newEntry.email}`},
         { timesheetDate: `${newEntry.timesheetDate}`}
        ]})

      if ( existingEntry === null) {
        const createEntry = await Entry.create({
          email: newEntry.email,
          timesheetDate: newEntry.timesheetDate,
          totalTime: 0,
          entries: [{
            startTime: newEntry.startTime,
            endTime: 0,
            duration: 0,
          }]
        })
      } else {
        const updateEntry = await Entry.updateOne(
          { _id: existingEntry._id }, 
          { $push: {
             entries:{
              startTime: newEntry.startTime,
              endTime: 0,
              duration: 0,
             }
            }
          }
         )
      }
        
      return res
        .status(201)
        .json({ message: 'You have sucessfully Created Entry' })  
      break;
    case 'PATCH':
      const email = req.body.email
      const timesheetDate = req.body.timesheetDate
      const endTime = req.body.endTime
    
      const entryToOut = await Entry.findOne({ $and:
        [{ email: `${email}`},
         { timesheetDate: `${timesheetDate}`}
        ]})
          
      const documentId = entryToOut._id;
      const entryId = entryToOut.entries[entryToOut.entries.length-1]._id;
      
      await Entry.findOneAndUpdate(
        { _id: documentId, 'entries._id': entryId },
        { 'entries.$.endTime': endTime }
      );
    
      const updateEndTime = await Entry.findOne(
        { _id: documentId, 'entries._id': entryId }
      )

      const start_time = updateEndTime.entries[updateEndTime.entries.length-1].startTime
      const end_time = updateEndTime.entries[updateEndTime.entries.length-1].endTime
      let start_date = moment(start_time, 'HH:mm:ss');
      let end_date = moment(end_time, 'HH:mm:ss');
      let TimeDuration = moment.duration(end_date.diff(start_date));
      const duration = TimeDuration.asSeconds();

      const updateDuration = await Entry.findOneAndUpdate(
        { _id: documentId, 'entries._id': entryId },
        { 'entries.$.duration': duration }
      );

      const document = await Entry.findOneAndUpdate(
        { _id: documentId },
        [ { $set: { 'totalTime': { $sum: '$entries.duration' } } } ]
      );
      
      return res
          .status(201)
          .json({ message: 'You have sucessfully Updated Entry' })
      break;       
  }
}
