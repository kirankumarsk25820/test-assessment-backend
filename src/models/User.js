import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'candidate'], default: 'candidate' },
    testCode: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
