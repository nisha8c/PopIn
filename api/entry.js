import mongoose from 'mongoose'
import { ObjectId } from 'mongodb';

const { Schema, model } = mongoose;
const entrySchema = new Schema({
  userId: ObjectId,
  startTime: String,
  endTime: String,
  finish: Boolean,
});

module.exports = mongoose.models.Entry || model('Entry', entrySchema);
