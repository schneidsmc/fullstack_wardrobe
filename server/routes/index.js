import express from 'express';
import userRoutes from './users.js';
// import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.use('/users', userRoutes);
// router.use('/users', authenticateToken, userRoutes);

export default router;
