import mongoose from 'mongoose'
import Entry from '../../../api/entry';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  
  switch(req.method) {
    case 'GET':
      return res
        .status(201)
        .json({message: 'you have reached GET endpoint' })
      break;
    case 'POST':
      const newEntry = JSON.parse(req.body)

      const existingEntry = await Entry.findOne({ $and:
        [{ email: `${newEntry.email}`},
         { timesheetDate : `${newEntry.timesheetDate}`}
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

        return res
          .status(201)
          .json({ 
            documentId: createEntry._id, 
            entryId: createEntry.entries[0]._id
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

        const updatedEntry = await Entry.findOne({ $and:
          [{ email: `${newEntry.email}`},
           { timesheetDate : `${newEntry.timesheetDate}`}
          ]})
        
        return res
          .status(201)
          .json({
             documentId: existingEntry._id, 
             entryId: updatedEntry.entries[updatedEntry.entries.length-1]._id
            })
      }
      break;
    case 'PATCH':
        return res
          .status(201)
          .json({message: 'you have reached PATCH endpoint' })
        break;
  }
}