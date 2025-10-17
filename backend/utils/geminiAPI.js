import axios from 'axios';

export const queryGemini = async (prompt) => {
  const response = await axios.post(
    'https://gemini.googleapis.com/v1/ai:generate',
    { prompt },
    { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
  );
  return response.data.output;
};
