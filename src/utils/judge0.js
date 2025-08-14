import axios from 'axios';

const JUDGE0_BASE_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY; // Set this in your .env

export const executeCode = async (language_id, source_code, stdin = '') => {
    try {
        // Create a new submission
        const { data: submission } = await axios.post(
            `${JUDGE0_BASE_URL}?base64_encoded=false&wait=true`,
            {
                language_id,
                source_code,
                stdin
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': JUDGE0_API_KEY,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            }
        );

        return submission;
    } catch (error) {
        console.error('Judge0 API error:', error.response?.data || error.message);
        throw new Error('Failed to execute code with Judge0 API');
    }
};
