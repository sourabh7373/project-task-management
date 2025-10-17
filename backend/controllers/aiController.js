// backend/controllers/aiController.js

import { queryGemini } from '../utils/geminiAPI.js';

/**
 * Summarize tasks with Gemini AI.
 * Falls back to mock summary if API fails.
 */
export const summarizeTasks = async (req, res) => {
  const { tasks } = req.body;

  try {
    const summary = await queryGemini(
      `Summarize these tasks: ${tasks.map(t => t.title + ': ' + t.description).join(', ')}`
    );
    res.json({ summary });
  } catch (err) {
    console.error('Gemini AI failed, using mock summary:', err.message);
    // MOCK summary fallback
    const summary = tasks.length
      ? tasks.map(t => t.title).join(', ')
      : 'No tasks yet';
    res.json({ summary });
  }
};

/**
 * Answer question about tasks with Gemini AI.
 * Falls back to mock answer if API fails.
 */
export const queryTasks = async (req, res) => {
  const { question, tasks } = req.body;

  try {
    const answer = await queryGemini(
      `Answer this question based on these tasks: ${tasks
        .map(t => t.title + ': ' + t.description)
        .join(', ')}. Question: ${question}`
    );
    res.json({ answer });
  } catch (err) {
    console.error('Gemini AI failed, using mock answer:', err.message);
    // MOCK answer fallback
    const answer = `Question: "${question}" answered based on ${tasks.length} tasks.`;
    res.json({ answer });
  }
};
