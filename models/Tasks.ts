import mongoose, {Schema, Document} from "mongoose";

export interface ITask extends Document {
    id: string,
    title: string,
    status: string,
    project: string,
    archive: boolean,
    deleted: boolean,  
}

const TaskSchema = new Schema({
    id: {type: String, require: true, unique: true},
    title: {type: String},
    status:{type: String},
    project: {type: String},
    archive: {type: Boolean},
    deleted: {type: Boolean},
});

export default mongoose.model<ITask>("Task", TaskSchema);

  
 