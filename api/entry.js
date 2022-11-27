import mongoose from 'mongoose'
import { ObjectId } from 'mongodb';

const { Schema, model } = mongoose;
const entrySchema = new Schema({
   email: String,
   timesheetDate: String,
   totalTime: String,
   entries: [{ 
      startTime: Date,
      endTime: Date,
      duration: Date,
   }]
});

module.exports = mongoose.models.Entry || model('Entry', entrySchema);
