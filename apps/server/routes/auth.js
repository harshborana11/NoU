import express from 'express';
const router = express.Router();
import { oauth } from '../controllers/auth.js';

router.post('/oauth', oauth);
export default router;
