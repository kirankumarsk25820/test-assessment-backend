import axios from "axios";

// Judge0 API endpoint (can use the free public API or your own hosted one)
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";

// You’ll need an API key if using RapidAPI
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const runCode = async (sourceCode, languageId, stdin = "") => {
  try {
    // Step 1: Create submission
    const submission = await axios.post(
      `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`,
      {
        source_code: sourceCode,
        language_id: languageId, // 50 = C, 54 = C++, 62 = Java, 71 = Python, 63 = JavaScript
        stdin
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      }
    );

    const token = submission.data.token;

    // Step 2: Poll for result until status is "Completed"
    let result;
    while (true) {
      const res = await axios.get(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`, {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      });

      if (res.data.status && res.data.status.id >= 3) {
        result = res.data;
        break;
      }
      await new Promise(r => setTimeout(r, 1000)); // wait 1 sec
    }

    return result;
  } catch (err) {
    console.error("Judge0 API Error:", err.response?.data || err.message);
    throw new Error("Code execution failed");
  }
};
