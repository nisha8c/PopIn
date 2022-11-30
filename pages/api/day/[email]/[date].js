import mongoose from 'mongoose'
import Entry from '../../../../api/entry';

export default async function handler(req, res) {
  mongoose.connect(process.env.MONGODB_URI)
  switch(req.method) {
    case 'GET' :  
      const email = req.url.split('/')[3];
      const timesheetDate = req.url.split('/')[4];

      const allTimeEntries = await Entry.findOne({ $and:
        [{ email: email },
         { timesheetDate: timesheetDate }]
      })

      return respond(res, allTimeEntries?.entries, allTimeEntries? allTimeEntries.totalTime:0 )        
      break;
    case 'PATCH':
      return res
       .status(204)
       .json({message: 'you have reached PATCH endpoint'})  
      break;
    case 'DELETE':
        const userEmail = req.url.split('/')[3];
        const date = req.url.split('/')[4];
       
        await Entry.deleteOne({ $and:
         [{ email: `${userEmail}`},
          { timesheetDate: `${date}`}
         ]}
        )
             
        return res
          .status(204)
          .json({message: 'You have sucessfully deleted requested Document' })
        break;
    }
}

const respond = (res, entry, total) => {
  entry?
  res
    .status(200)
    .json({allEntries: entry, totalTime: total})
  :
  res
    .status(204)
    .json({message: 'Entries not found for this date' })  
}