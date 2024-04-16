import express from 'express';
import { signin, signout, signup } from '../Controllers/authController.js';
const router = express();

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signout',signout)


export default router