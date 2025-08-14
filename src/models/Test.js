import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Aptitude, Logical, Coding, etc.
  duration: { type: Number, required: true }, // in minutes
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  codingProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: "CodingProblem" }]
});

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    sections: [sectionSchema],
    testCode: { type: String, required: true, unique: true }, // Candidate uses this to join
    startTime: { type: Date },
    endTime: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
