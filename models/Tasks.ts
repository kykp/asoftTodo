import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  id: string;
  title: string;
  project: string;
  archive: boolean;
  deleted: boolean;
  order: number;
}

const TaskSchema = new Schema({
  id: { type: String, require: true, unique: true },
  title: { type: String },
  project: { type: String },
  archive: { type: Boolean },
  deleted: { type: Boolean },
  order: { type: Number },
});

export default mongoose.model<ITask>("Task", TaskSchema);
