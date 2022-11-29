import mongoose from 'mongoose'
import Entry from '../../../api/entry';

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

        return respond(res, createEntry.entries[0], createEntry._id)
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
        
        return respond(res, updatedEntry.entries[updatedEntry.entries.length-1], existingEntry._id,)
      }
      break;
    case 'PATCH':
        return res
          .status(204)
          .json({message: 'you have reached PATCH endpoint' })
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