import mongoose from 'mongoose'
import { ObjectId } from 'mongodb';

const { Schema, model } = mongoose;
const entrySchema = new Schema({
   email: String,
   timesheetDate: String,
   totalTime: String,
   entries: [{ 
      startTime: String,
      endTime: String,
      duration: String,
   }]
});

module.exports = mongoose.models.Entry || model('Entry', entrySchema);
