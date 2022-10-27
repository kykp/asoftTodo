import mongoose, {Schema, Document} from "mongoose";

export interface IProject extends Document {
    project: string,
    id: string,
    archive: boolean,
    deleted: boolean,
    weight: number,
}

const ProjetSchema = new Schema({
    project: {type:String},
    id: {type: String, require: true, unique: true},
    archive: {type: Boolean},
    deleted: {type: Boolean},
    weight:{type: Number},
});

export default mongoose.model<IProject>("Project", ProjetSchema);

  
 