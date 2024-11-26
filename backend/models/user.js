import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    role: { type: String, required: true, enum: ['student', 'pass leader', 'supervisor'] },
    yuId: { type: String, required: true, minlength: 9, unique: true},
    sections: [{type: mongoose.Types.ObjectId, required: true, ref: 'Section'}]
})

export default mongoose.model('User', userSchema);