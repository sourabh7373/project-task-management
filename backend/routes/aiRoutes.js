import express from 'express';
import { summarizeTasks, queryTasks } from '../controllers/aiController.js';
const router = express.Router();
router.post('/summarize', summarizeTasks);
router.post('/query', queryTasks);
export default router;
