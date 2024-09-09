import express from 'express';
import userRoutes from './users.js';
import clothingRoutes from './clothing.js';


const router = express.Router();

router.use('/users', userRoutes);
router.use('/clothing', clothingRoutes);


export default router;
