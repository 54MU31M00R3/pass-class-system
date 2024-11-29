import mongoose from "mongoose";

const Schema = mongoose.Schema;

// model schema for an announcement
const announcementSchema = new Schema({
    content: { type: mongoose.Types.ObjectId, required: true, ref: 'Content' },
    body: { type: String, required: true }
})

export default mongoose.model('Announcement', announcementSchema);