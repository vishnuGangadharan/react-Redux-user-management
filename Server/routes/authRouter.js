import express from 'express';
import { signup } from '../Controllers/authController.js';
const router = express();
router.post('/signup',signup)
export default router