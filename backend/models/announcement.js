import mongoose from "mongoose";

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    content: { type: mongoose.Types.ObjectId, required: true, ref: 'Content' },    title: { type: String, required: true },
    body: { type: String, required: true }
})

export default mongoose.model('Announcement', announcementSchema);