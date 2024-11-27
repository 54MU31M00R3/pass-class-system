import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    section: { type: mongoose.Types.ObjectId, required: true, ref: 'Section' },
    contentType: { type: String, required: true, enum: ['announcement', 'worksheet'] },
    title: { type: String, required: true },
    datePosted: { type: Date, required: true }
})

export default mongoose.model('Content', contentSchema);