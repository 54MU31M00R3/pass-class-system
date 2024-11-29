import mongoose from "mongoose";

const Schema = mongoose.Schema;

// model schema for a worksheet
const worksheetSchema = new Schema({
    content: { type: mongoose.Types.ObjectId, required: true, ref: 'Content' },
    filePath: { type: String, required: true }
})

export default mongoose.model('Worksheet', worksheetSchema);