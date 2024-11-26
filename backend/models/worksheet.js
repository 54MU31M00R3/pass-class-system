import mongoose from "mongoose";

const Schema = mongoose.Schema;

const worksheetSchema = new Schema({
    content: { type: mongoose.Types.ObjectId, required: true, ref: 'Content' },    title: { type: String, required: true },
    filePath: { type: String, required: true }
})

export default mongoose.model('Content', worksheetSchema);