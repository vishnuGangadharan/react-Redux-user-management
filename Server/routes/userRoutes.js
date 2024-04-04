import express from 'express'
import { deleteProfile, test } from '../Controllers/userController.js';
import { updateProfile } from '../Controllers/authController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/',test)
router.post('/update/:id', verifyToken ,updateProfile)
router.delete('/delete/:id', verifyToken ,deleteProfile)
export default router