import mongoose from "mongoose";

const Schema = mongoose.Schema;

// model schema for content
const contentSchema = new Schema({
    section: { type: mongoose.Types.ObjectId, required: true, ref: 'Section' },
    contentType: { type: String, required: true, enum: ['announcement', 'worksheet'] },
    title: { type: String, required: true },
    datePosted: { type: Date, required: true },
    mentor: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

export default mongoose.model('Content', contentSchema);