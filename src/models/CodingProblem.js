import mongoose from "mongoose";

const codingProblemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    languageSupport: [
      {
        type: String,
        enum: ["c", "cpp", "java", "python", "javascript", "html", "css"]
      }
    ],
    sampleInput: { type: String, required: true },
    sampleOutput: { type: String, required: true },
    testCases: [
      {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true }
      }
    ],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    }
  },
  { timestamps: true }
);

export default mongoose.model("CodingProblem", codingProblemSchema);
