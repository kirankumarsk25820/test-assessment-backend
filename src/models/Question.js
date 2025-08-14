import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ["aptitude", "logical", "mcq_programming"],
      required: true
    },
    questionText: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, default: false }
      }
    ],
    explanation: { type: String },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
