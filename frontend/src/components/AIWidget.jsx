import React, { useState } from 'react';
import { summarizeTasks, queryTasks } from '../services/api';

export default function AIWidget({ tasks }) {
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSummarize = async () => {
    if (!tasks.length) return alert('No tasks');
    const data = await summarizeTasks(tasks);
    setSummary(data.summary);
  };

  const handleQuery = async () => {
    if (!question) return alert('Enter a question');
    const data = await queryTasks(question, tasks);
    setAnswer(data.answer);
  };

  return (
    <div>
      <h4>AI Assistant</h4>
      <button onClick={handleSummarize}>Summarize Tasks</button>
      <p>{summary}</p>
      <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask a question" />
      <button onClick={handleQuery}>Ask AI</button>
      <p>{answer}</p>
      <p style={{ fontSize:'0.8em' }}>Note: GEMINI_API_KEY required for AI</p>
    </div>
  );
}
