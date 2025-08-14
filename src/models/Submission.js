import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    section: {
      type: String,
      enum: ["aptitude", "logical", "programming-mcq", "coding"],
      required: true
    },
    questionId: { type: mongoose.Schema.Types.ObjectId },
    
    // For MCQ
    selectedOption: { type: String },

    // For coding problems
    code: { type: String },
    language: { type: String },
    result: {
      status: { type: String }, // e.g. "Accepted", "Wrong Answer"
      compile_output: { type: String },
      stdout: { type: String },
      stderr: { type: String }
    },

    score: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
