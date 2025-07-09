import express from 'express';
const router = express.Router();
import { createSession, joinSession } from '../controllers/data.js';
import checkAuth from '../middleware/varifyJWT.js';

router.post('/createSession', checkAuth, createSession);
router.post('/joinSession', checkAuth, joinSession);
export default router;
