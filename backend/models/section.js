import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    courseName: { type: String, required: true },
    courseSection: { type: String, required: true },
    timeOfSession: { type: String, required: true},
    buildingRoomNumber: { type: String, required: true},
    students: [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}],
    mentor: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    content: [{type: mongoose.Types.ObjectId, required: true, ref: 'Content'}]
})

export default mongoose.model('Section', sectionSchema);